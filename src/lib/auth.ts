import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// Custom adapter wired to intel_ prefixed tables
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const intelAdapter: any = {
  createUser:  (data: Record<string, unknown>) => prisma.intelUser.create({ data: data as Parameters<typeof prisma.intelUser.create>[0]["data"] }),
  getUser:     (id: string) => prisma.intelUser.findUnique({ where: { id } }),
  getUserByEmail: (email: string) => prisma.intelUser.findUnique({ where: { email } }),
  getUserByAccount: async ({ providerAccountId, provider }: { providerAccountId: string; provider: string }) => {
    const account = await prisma.intelAccount.findUnique({
      where: { provider_providerAccountId: { provider, providerAccountId } },
      include: { user: true },
    });
    return account?.user ?? null;
  },
  updateUser: ({ id, ...data }: { id: string }) => prisma.intelUser.update({ where: { id }, data }),
  deleteUser: (id: string) => prisma.intelUser.delete({ where: { id } }),
  linkAccount: (data: Record<string, unknown>) => prisma.intelAccount.create({ data: data as Parameters<typeof prisma.intelAccount.create>[0]["data"] }),
  unlinkAccount: ({ providerAccountId, provider }: { providerAccountId: string; provider: string }) =>
    prisma.intelAccount.delete({ where: { provider_providerAccountId: { provider, providerAccountId } } }),
  createSession: (data: { sessionToken: string; userId: string; expires: Date }) => prisma.intelSession.create({ data }),
  getSessionAndUser: async (sessionToken: string) => {
    const s = await prisma.intelSession.findUnique({ where: { sessionToken }, include: { user: true } });
    if (!s) return null;
    return { session: s, user: s.user };
  },
  updateSession: ({ sessionToken, ...data }: { sessionToken: string }) =>
    prisma.intelSession.update({ where: { sessionToken }, data }),
  deleteSession: (sessionToken: string) => prisma.intelSession.delete({ where: { sessionToken } }),
  createVerificationToken: (data: { identifier: string; token: string; expires: Date }) =>
    prisma.intelVerificationToken.create({ data }),
  useVerificationToken: ({ identifier, token }: { identifier: string; token: string }) =>
    prisma.intelVerificationToken.delete({ where: { identifier_token: { identifier, token } } }).catch(() => null),
};

const providers: NextAuthOptions["providers"] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LinkedInProvider({
      clientId:      process.env.LINKEDIN_CLIENT_ID,
      clientSecret:  process.env.LINKEDIN_CLIENT_SECRET,
      authorization: { params: { scope: "openid profile email" } },
      issuer:        "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile: Record<string, string>) {
        return { id: profile.sub, name: profile.name, email: profile.email, image: profile.picture };
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
  );
}

providers.push(
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email:    { label: "Email",    type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const user = await prisma.intelUser.findUnique({ where: { email: credentials.email } });
      if (!user || !user.password) return null;
      const valid = await bcrypt.compare(credentials.password, user.password);
      if (!valid) return null;
      return { id: user.id, name: user.name, email: user.email, image: user.image };
    },
  })
);

export const authOptions: NextAuthOptions = {
  adapter:  intelAdapter,
  providers,
  session:  { strategy: "jwt" },
  pages:    { signIn: "/" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

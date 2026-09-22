# Hosting & Infrastructure Notes

## 1. Connecting GoDaddy Domain to Vercel

**Recommended:** Keep Vercel as host, point GoDaddy domain to it.

### Steps
1. Vercel Dashboard → select `intel-ai` project → **Settings → Domains → Add**
2. Add DNS records in GoDaddy:

| Type  | Name  | Value                  |
|-------|-------|------------------------|
| A     | `@`   | `76.76.21.21`          |
| CNAME | `www` | `cname.vercel-dns.com` |

3. DNS propagation: 10 min – 48 hours (usually under 1 hour)
4. Vercel auto-provisions SSL once DNS resolves

### Backend subdomain (optional)
Add `api.yourdomain.com` in `intel-ai-api` Vercel project:

| Type  | Name  | Value                  |
|-------|-------|------------------------|
| CNAME | `api` | `cname.vercel-dns.com` |

Then update `NEXT_PUBLIC_API_URL` env var to `https://api.yourdomain.com`

---

## 2. Vercel Traffic Capacity

- **CDN (static/pages):** Handles millions of requests/day automatically from 100+ edge locations
- **Functions:** Auto-scales horizontally via Fluid Compute

### Plan limits

| Plan    | Cost     | Function invocations | Bandwidth |
|---------|----------|----------------------|-----------|
| Hobby   | Free     | 100k/month           | 100 GB    |
| Pro     | $20/mo   | 1M/month             | 1 TB      |
| Enterprise | Custom | Unlimited           | Unlimited |

### Real-world user estimates

| Traffic           | Plan needed       |
|-------------------|-------------------|
| Up to ~5k/day     | Hobby (free)      |
| 5k–50k/day        | Pro ($20/mo)      |
| 50k+/day          | Pro + monitor overage |
| 500k+/day         | Enterprise        |

### Actual bottlenecks (not Vercel)
- **Neon PostgreSQL** — free tier ~100 concurrent connections, will choke before Vercel
- **Judge0** — rate-limited by your Judge0 plan
- **DB queries under load** — watch Prisma connection pool

---

## 3. Neon PostgreSQL Free Tier

| Resource         | Free Tier                       |
|------------------|---------------------------------|
| Storage          | 0.5 GB                          |
| Projects         | 1                               |
| Branches         | 10                              |
| Compute          | 0.25 vCPU, 1 GB RAM             |
| Compute hours    | ~191 hrs/month                  |
| Auto-suspend     | After 5 min idle (~500ms cold start) |
| Max connections  | ~100                            |

### For Intel AI
- Storage fits ~5,000–10,000 active users depending on submission history stored
- Auto-suspend causes ~500ms delay after idle — noticeable for first request
- Use `?connection_limit=5` in `DATABASE_URL` to avoid connection exhaustion with Prisma

### When to upgrade
Neon Pro = **$19/mo** — unlimited storage (pay per GB), no auto-suspend, more compute.
Upgrade when you see storage warnings or cold-start complaints.

---

## 4. Cheapest PostgreSQL Hosting Options

### Best free tiers

| Provider               | Free Storage | Notes                                      |
|------------------------|--------------|--------------------------------------------|
| **CockroachDB Serverless** | **10 GB** | Best free tier; Postgres-compatible        |
| Supabase               | 500 MB       | Includes auth, storage, realtime           |
| Neon (current)         | 500 MB       | Serverless, native Vercel integration      |

### Cheapest paid options

| Provider          | Price      | Storage        | Notes                    |
|-------------------|------------|----------------|--------------------------|
| Fly.io Postgres   | ~$2–5/mo   | 1–10 GB        | Cheapest dedicated Postgres |
| Railway           | $5/mo      | Pay-per-use    | Simple, dev-friendly     |
| Render            | $7/mo      | 1 GB           | Easy setup               |
| Neon Pro          | $19/mo     | $0.18/GB       | Serverless scaling       |
| Supabase Pro      | $25/mo     | 8 GB included  | Full backend suite       |
| DigitalOcean      | $15/mo     | 10 GB          | Managed, reliable        |

### AWS / GCP (overkill for current stage)

| Provider           | Price       | Notes                               |
|--------------------|-------------|-------------------------------------|
| AWS RDS t4g.micro  | ~$13/mo     | 12 months free on new AWS accounts  |
| GCP Cloud SQL      | ~$8/mo      | Cheapest GCP option                 |

### Recommendation for Intel AI

| Stage                  | Action                                                                 |
|------------------------|------------------------------------------------------------------------|
| Now                    | Stay on Neon free — integrated, works, no limits hit yet               |
| Outgrow free           | Supabase Pro ($25/mo) — 8 GB, no cold starts, Prisma-compatible        |
| Cost is top priority   | Switch to CockroachDB Serverless — 10 GB free, works with Prisma       |

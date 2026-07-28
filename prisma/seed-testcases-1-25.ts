/**
 * Seed testCases + functionMeta for problems 1-25.
 * Run with: npx tsx prisma/seed-testcases-1-25.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type LangType = string;
type CompareMode = string;
interface FunctionParam { name: string; type: LangType; }
interface FunctionMeta {
  name: string;
  params: FunctionParam[];
  returnType: LangType;
  compare: CompareMode;
  inplaceParam?: string;
}
interface TestCase { input: Record<string, unknown>; expected: unknown; }
interface ProblemData { id: number; meta: FunctionMeta; cases: TestCase[]; }

const data: ProblemData[] = [

  // ── 1. Two Sum ───────────────────────────────────────────────────────────────
  {
    id: 1,
    meta: { name: "twoSum", params: [{ name: "nums", type: "int[]" }, { name: "target", type: "int" }], returnType: "int[]", compare: "sort" },
    cases: [
      { input: { nums: [2,7,11,15], target: 9 },    expected: [0,1] },
      { input: { nums: [3,2,4], target: 6 },         expected: [1,2] },
      { input: { nums: [3,3], target: 6 },            expected: [0,1] },
      { input: { nums: [1,2,3,4,5], target: 9 },     expected: [3,4] },
      { input: { nums: [0,4,3,0], target: 0 },        expected: [0,3] },
      { input: { nums: [-1,-2,-3,-4,-5], target: -8 }, expected: [2,4] },
      { input: { nums: [1,5,8,3], target: 11 },       expected: [1,2] },
      { input: { nums: [2,5,5,11], target: 10 },      expected: [1,2] },
    ],
  },

  // ── 2. Valid Parentheses ─────────────────────────────────────────────────────
  {
    id: 2,
    meta: { name: "isValid", params: [{ name: "s", type: "string" }], returnType: "boolean", compare: "exact" },
    cases: [
      { input: { s: "()" },       expected: true },
      { input: { s: "()[]{}" },   expected: true },
      { input: { s: "(]" },       expected: false },
      { input: { s: "([)]" },     expected: false },
      { input: { s: "{[]}" },     expected: true },
      { input: { s: "" },         expected: true },
      { input: { s: "[" },        expected: false },
      { input: { s: "(((" },      expected: false },
    ],
  },

  // ── 3. Climbing Stairs ───────────────────────────────────────────────────────
  {
    id: 3,
    meta: { name: "climbStairs", params: [{ name: "n", type: "int" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { n: 1 },  expected: 1 },
      { input: { n: 2 },  expected: 2 },
      { input: { n: 3 },  expected: 3 },
      { input: { n: 4 },  expected: 5 },
      { input: { n: 5 },  expected: 8 },
      { input: { n: 10 }, expected: 89 },
      { input: { n: 20 }, expected: 10946 },
      { input: { n: 45 }, expected: 1836311903 },
    ],
  },

  // ── 4. Best Time to Buy and Sell Stock ──────────────────────────────────────
  {
    id: 4,
    meta: { name: "maxProfit", params: [{ name: "prices", type: "int[]" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { prices: [7,1,5,3,6,4] }, expected: 5 },
      { input: { prices: [7,6,4,3,1] },   expected: 0 },
      { input: { prices: [1,2] },          expected: 1 },
      { input: { prices: [2,4,1] },        expected: 2 },
      { input: { prices: [1] },            expected: 0 },
      { input: { prices: [3,2,6,5,0,3] }, expected: 4 },
      { input: { prices: [1,4,2] },        expected: 3 },
      { input: { prices: [2,1,4] },        expected: 3 },
    ],
  },

  // ── 5. Binary Search ────────────────────────────────────────────────────────
  {
    id: 5,
    meta: { name: "search", params: [{ name: "nums", type: "int[]" }, { name: "target", type: "int" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { nums: [-1,0,3,5,9,12], target: 9 },  expected: 4 },
      { input: { nums: [-1,0,3,5,9,12], target: 2 },  expected: -1 },
      { input: { nums: [5], target: 5 },               expected: 0 },
      { input: { nums: [5], target: -5 },              expected: -1 },
      { input: { nums: [1,3,5,7,9,11], target: 1 },   expected: 0 },
      { input: { nums: [1,3,5,7,9,11], target: 11 },  expected: 5 },
      { input: { nums: [1,3,5,7,9,11], target: 6 },   expected: -1 },
      { input: { nums: [2,4,6,8,10], target: 8 },     expected: 3 },
    ],
  },

  // ── 6. Maximum Subarray ──────────────────────────────────────────────────────
  {
    id: 6,
    meta: { name: "maxSubArray", params: [{ name: "nums", type: "int[]" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { nums: [-2,1,-3,4,-1,2,1,-5,4] }, expected: 6 },
      { input: { nums: [1] },                       expected: 1 },
      { input: { nums: [5,4,-1,7,8] },              expected: 23 },
      { input: { nums: [-1,-2,-3] },                expected: -1 },
      { input: { nums: [-2,-1] },                   expected: -1 },
      { input: { nums: [1,-1,1,-1,1] },             expected: 1 },
      { input: { nums: [0] },                        expected: 0 },
      { input: { nums: [-100,50,-50,100,-10] },     expected: 100 },
    ],
  },

  // ── 7. Longest Substring Without Repeating Characters ───────────────────────
  {
    id: 7,
    meta: { name: "lengthOfLongestSubstring", params: [{ name: "s", type: "string" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { s: "abcabcbb" }, expected: 3 },
      { input: { s: "bbbbb" },    expected: 1 },
      { input: { s: "pwwkew" },   expected: 3 },
      { input: { s: "" },          expected: 0 },
      { input: { s: "a" },         expected: 1 },
      { input: { s: "au" },        expected: 2 },
      { input: { s: "dvdf" },      expected: 3 },
      { input: { s: "abcdefgh" }, expected: 8 },
    ],
  },

  // ── 8. Number of Islands ─────────────────────────────────────────────────────
  {
    id: 8,
    meta: { name: "numIslands", params: [{ name: "grid", type: "char[][]" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { grid: [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]] }, expected: 1 },
      { input: { grid: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] }, expected: 3 },
      { input: { grid: [["1"]] },                                                                                    expected: 1 },
      { input: { grid: [["0"]] },                                                                                    expected: 0 },
      { input: { grid: [["1","0"],["0","1"]] },                                                                      expected: 2 },
      { input: { grid: [["1","1"],["1","1"]] },                                                                      expected: 1 },
      { input: { grid: [["1","0","1","0"],["0","1","0","1"],["1","0","1","0"]] },                                    expected: 6 },
      { input: { grid: [["0","0","0"],["0","0","0"]] },                                                              expected: 0 },
    ],
  },

  // ── 9. Word Break ───────────────────────────────────────────────────────────
  {
    id: 9,
    meta: { name: "wordBreak", params: [{ name: "s", type: "string" }, { name: "wordDict", type: "string[]" }], returnType: "boolean", compare: "exact" },
    cases: [
      { input: { s: "leetcode", wordDict: ["leet","code"] },            expected: true },
      { input: { s: "applepenapple", wordDict: ["apple","pen"] },       expected: true },
      { input: { s: "catsandog", wordDict: ["cats","dog","sand","and","cat"] }, expected: false },
      { input: { s: "a", wordDict: ["a"] },                             expected: true },
      { input: { s: "ab", wordDict: ["a","b"] },                        expected: true },
      { input: { s: "cars", wordDict: ["car","ca","rs"] },              expected: true },
      { input: { s: "aaaa", wordDict: ["a","aa","aaa"] },               expected: true },
      { input: { s: "hello", wordDict: ["world"] },                     expected: false },
    ],
  },

  // ── 10. Combination Sum ──────────────────────────────────────────────────────
  {
    id: 10,
    meta: { name: "combinationSum", params: [{ name: "candidates", type: "int[]" }, { name: "target", type: "int" }], returnType: "int[][]list", compare: "set" },
    cases: [
      { input: { candidates: [2,3,6,7], target: 7 },  expected: [[2,2,3],[7]] },
      { input: { candidates: [2,3], target: 6 },       expected: [[2,2,2],[3,3]] },
      { input: { candidates: [2], target: 1 },          expected: [] },
      { input: { candidates: [1], target: 1 },          expected: [[1]] },
      { input: { candidates: [1,2], target: 3 },        expected: [[1,1,1],[1,2]] },
      { input: { candidates: [3,5,6,7], target: 7 },   expected: [[7]] },
      { input: { candidates: [5], target: 5 },          expected: [[5]] },
      { input: { candidates: [2,3,5], target: 8 },      expected: [[2,2,2,2],[2,3,3],[3,5]] },
    ],
  },

  // ── 11. 3Sum ────────────────────────────────────────────────────────────────
  {
    id: 11,
    meta: { name: "threeSum", params: [{ name: "nums", type: "int[]" }], returnType: "int[][]list", compare: "set" },
    cases: [
      { input: { nums: [-1,0,1,2,-1,-4] }, expected: [[-1,-1,2],[-1,0,1]] },
      { input: { nums: [0,1,1] },           expected: [] },
      { input: { nums: [0,0,0] },           expected: [[0,0,0]] },
      { input: { nums: [-2,0,0,2,2] },      expected: [[-2,0,2]] },
      { input: { nums: [-1,-1,0,1] },       expected: [[-1,0,1]] },
      { input: { nums: [1,2,-2,-1] },       expected: [[-2,1,1]] },
      { input: { nums: [-4,-1,-1,0,1,2] }, expected: [[-1,-1,2],[-1,0,1]] },
      { input: { nums: [0,0,0,0] },         expected: [[0,0,0]] },
    ],
  },

  // ── 12. Container With Most Water ────────────────────────────────────────────
  {
    id: 12,
    meta: { name: "maxArea", params: [{ name: "height", type: "int[]" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { height: [1,8,6,2,5,4,8,3,7] }, expected: 49 },
      { input: { height: [1,1] },                expected: 1 },
      { input: { height: [4,3,2,1,4] },          expected: 16 },
      { input: { height: [1,2,1] },              expected: 2 },
      { input: { height: [2,3,4,5,18,17,6] },   expected: 17 },
      { input: { height: [1,3,2,5,25,24,5] },   expected: 24 },
      { input: { height: [0,2] },                expected: 0 },
      { input: { height: [5,5,5,5] },            expected: 15 },
    ],
  },

  // ── 13. Invert Binary Tree ───────────────────────────────────────────────────
  {
    id: 13,
    meta: { name: "invertTree", params: [{ name: "root", type: "TreeNode" }], returnType: "TreeNode", compare: "exact" },
    cases: [
      { input: { root: [4,2,7,1,3,6,9] }, expected: [4,7,2,9,6,3,1] },
      { input: { root: [2,1,3] },          expected: [2,3,1] },
      { input: { root: [] },               expected: [] },
      { input: { root: [1] },              expected: [1] },
      { input: { root: [3,1,20] },         expected: [3,20,1] },
      { input: { root: [1,2,3,4,5,6,7] }, expected: [1,3,2,7,6,5,4] },
      { input: { root: [5,3,7,2,4,6,8] }, expected: [5,7,3,8,6,4,2] },
      { input: { root: [10,5,15] },        expected: [10,15,5] },
    ],
  },

  // ── 14. Maximum Depth of Binary Tree ────────────────────────────────────────
  {
    id: 14,
    meta: { name: "maxDepth", params: [{ name: "root", type: "TreeNode" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: 3 },
      { input: { root: [1,null,2] },               expected: 2 },
      { input: { root: [] },                        expected: 0 },
      { input: { root: [1] },                       expected: 1 },
      { input: { root: [1,2,3,4,5] },              expected: 3 },
      { input: { root: [1,2,3,4,5,6,7] },          expected: 3 },
      { input: { root: [1,2,null,3,null,4] },      expected: 4 },
      { input: { root: [1,2,3] },                  expected: 2 },
    ],
  },

  // ── 15. Min Stack ─── SKIP (class design, sequential ops) ───────────────────
  // (no entry — testCases stays null)

  // ── 16. Reverse Linked List ──────────────────────────────────────────────────
  {
    id: 16,
    meta: { name: "reverseList", params: [{ name: "head", type: "ListNode" }], returnType: "ListNode", compare: "exact" },
    cases: [
      { input: { head: [1,2,3,4,5] }, expected: [5,4,3,2,1] },
      { input: { head: [1,2] },        expected: [2,1] },
      { input: { head: [] },           expected: [] },
      { input: { head: [1] },          expected: [1] },
      { input: { head: [5,4,3,2,1] }, expected: [1,2,3,4,5] },
      { input: { head: [1,2,3] },      expected: [3,2,1] },
      { input: { head: [0,1,2,3] },    expected: [3,2,1,0] },
      { input: { head: [10,20,30] },   expected: [30,20,10] },
    ],
  },

  // ── 17. Binary Tree Level Order Traversal ───────────────────────────────────
  {
    id: 17,
    meta: { name: "levelOrder", params: [{ name: "root", type: "TreeNode" }], returnType: "int[][]list", compare: "exact" },
    cases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: [[3],[9,20],[15,7]] },
      { input: { root: [1] },                      expected: [[1]] },
      { input: { root: [] },                        expected: [] },
      { input: { root: [1,2,3] },                  expected: [[1],[2,3]] },
      { input: { root: [1,2,3,4,5] },              expected: [[1],[2,3],[4,5]] },
      { input: { root: [1,2,3,4,5,6,7] },          expected: [[1],[2,3],[4,5,6,7]] },
      { input: { root: [5,3,7] },                  expected: [[5],[3,7]] },
      { input: { root: [10,5,15,3,7] },            expected: [[10],[5,15],[3,7]] },
    ],
  },

  // ── 18. Product of Array Except Self ────────────────────────────────────────
  {
    id: 18,
    meta: { name: "productExceptSelf", params: [{ name: "nums", type: "int[]" }], returnType: "int[]", compare: "exact" },
    cases: [
      { input: { nums: [1,2,3,4] },       expected: [24,12,8,6] },
      { input: { nums: [-1,1,0,-3,3] },   expected: [0,0,9,0,0] },
      { input: { nums: [1,1] },            expected: [1,1] },
      { input: { nums: [2,3,4,5] },        expected: [60,40,30,24] },
      { input: { nums: [-1,-2,-3,-4] },    expected: [-24,-12,-8,-6] },
      { input: { nums: [0,0] },            expected: [0,0] },
      { input: { nums: [1,2,3] },          expected: [6,3,2] },
      { input: { nums: [5,2,10,1] },       expected: [20,50,10,100] },
    ],
  },

  // ── 19. Coin Change ──────────────────────────────────────────────────────────
  {
    id: 19,
    meta: { name: "coinChange", params: [{ name: "coins", type: "int[]" }, { name: "amount", type: "int" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { coins: [1,2,5], amount: 11 },   expected: 3 },
      { input: { coins: [2], amount: 3 },          expected: -1 },
      { input: { coins: [1], amount: 0 },          expected: 0 },
      { input: { coins: [1], amount: 1 },          expected: 1 },
      { input: { coins: [1], amount: 2 },          expected: 2 },
      { input: { coins: [186,419,83,408], amount: 6249 }, expected: 20 },
      { input: { coins: [2,5,10,1], amount: 27 }, expected: 4 },
      { input: { coins: [3,5], amount: 7 },        expected: -1 },
    ],
  },

  // ── 20. House Robber ─────────────────────────────────────────────────────────
  {
    id: 20,
    meta: { name: "rob", params: [{ name: "nums", type: "int[]" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { nums: [1,2,3,1] },       expected: 4 },
      { input: { nums: [2,7,9,3,1] },     expected: 12 },
      { input: { nums: [1] },              expected: 1 },
      { input: { nums: [1,2] },            expected: 2 },
      { input: { nums: [2,1] },            expected: 2 },
      { input: { nums: [5,3,4,11,2] },    expected: 16 },
      { input: { nums: [1,3,1,3,100] },   expected: 103 },
      { input: { nums: [2,10,3,6,8,1] }, expected: 18 },
    ],
  },

  // ── 21. Merge Intervals ──────────────────────────────────────────────────────
  {
    id: 21,
    meta: { name: "merge", params: [{ name: "intervals", type: "int[][]" }], returnType: "int[][]", compare: "exact" },
    cases: [
      { input: { intervals: [[1,3],[2,6],[8,10],[15,18]] }, expected: [[1,6],[8,10],[15,18]] },
      { input: { intervals: [[1,4],[4,5]] },                 expected: [[1,5]] },
      { input: { intervals: [[1,4],[2,3]] },                 expected: [[1,4]] },
      { input: { intervals: [[1,4],[0,4]] },                 expected: [[0,4]] },
      { input: { intervals: [[1,4],[0,0]] },                 expected: [[0,0],[1,4]] },
      { input: { intervals: [[1,4]] },                       expected: [[1,4]] },
      { input: { intervals: [[1,3],[4,6]] },                 expected: [[1,3],[4,6]] },
      { input: { intervals: [[1,3],[2,4],[5,7],[6,8]] },    expected: [[1,4],[5,8]] },
    ],
  },

  // ── 22. Jump Game ────────────────────────────────────────────────────────────
  {
    id: 22,
    meta: { name: "canJump", params: [{ name: "nums", type: "int[]" }], returnType: "boolean", compare: "exact" },
    cases: [
      { input: { nums: [2,3,1,1,4] },   expected: true },
      { input: { nums: [3,2,1,0,4] },   expected: false },
      { input: { nums: [0] },            expected: true },
      { input: { nums: [2,0,0] },        expected: true },
      { input: { nums: [1,0,0] },        expected: false },
      { input: { nums: [1,1,1,1,0] },   expected: true },
      { input: { nums: [3,0,0,0] },      expected: true },
      { input: { nums: [1,1,0,1] },      expected: false },
    ],
  },

  // ── 23. Subsets ──────────────────────────────────────────────────────────────
  {
    id: 23,
    meta: { name: "subsets", params: [{ name: "nums", type: "int[]" }], returnType: "int[][]list", compare: "set" },
    cases: [
      { input: { nums: [1,2,3] }, expected: [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]] },
      { input: { nums: [0] },     expected: [[],[0]] },
      { input: { nums: [1,2] },   expected: [[],[1],[2],[1,2]] },
      { input: { nums: [1] },     expected: [[],[1]] },
      { input: { nums: [1,2,3,4] }, expected: [[],[1],[2],[3],[4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[1,2,3],[1,2,4],[1,3,4],[2,3,4],[1,2,3,4]] },
      { input: { nums: [-1,0] },  expected: [[],[-1],[0],[-1,0]] },
      { input: { nums: [5,6] },   expected: [[],[5],[6],[5,6]] },
      { input: { nums: [2,3,5] }, expected: [[],[2],[3],[5],[2,3],[2,5],[3,5],[2,3,5]] },
    ],
  },

  // ── 24. Longest Palindromic Substring ────────────────────────────────────────
  // Only test cases with a unique longest palindrome to avoid multiple-valid-answer issues
  {
    id: 24,
    meta: { name: "longestPalindrome", params: [{ name: "s", type: "string" }], returnType: "string", compare: "exact" },
    cases: [
      { input: { s: "cbbd" },         expected: "bb" },
      { input: { s: "a" },             expected: "a" },
      { input: { s: "bb" },            expected: "bb" },
      { input: { s: "racecar" },       expected: "racecar" },
      { input: { s: "abba" },          expected: "abba" },
      { input: { s: "aaa" },           expected: "aaa" },
      { input: { s: "noon" },          expected: "noon" },
      { input: { s: "abcba" },         expected: "abcba" },
    ],
  },

  // ── 25. Trapping Rain Water ──────────────────────────────────────────────────
  {
    id: 25,
    meta: { name: "trap", params: [{ name: "height", type: "int[]" }], returnType: "int", compare: "exact" },
    cases: [
      { input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] }, expected: 6 },
      { input: { height: [4,2,0,3,2,5] },              expected: 9 },
      { input: { height: [1,0,1] },                     expected: 1 },
      { input: { height: [3,0,2,0,4] },                 expected: 7 },
      { input: { height: [0,0,0] },                     expected: 0 },
      { input: { height: [1,2,3,4,5] },                 expected: 0 },
      { input: { height: [5,4,3,2,1] },                 expected: 0 },
      { input: { height: [2,0,2] },                     expected: 2 },
    ],
  },

];

async function main() {
  console.log(`\nSeeding testCases + functionMeta for ${data.length} problems (1-25)...\n`);
  for (const { id, meta, cases } of data) {
    await prisma.intelProblem.update({
      where: { id },
      data: {
        testCases:    cases as object,
        functionMeta: meta  as object,
      },
    });
    console.log(`  ✓ #${id}`);
  }
  console.log("\n✅ Done — problems 1-25 (except 15) now have testCases + functionMeta.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });

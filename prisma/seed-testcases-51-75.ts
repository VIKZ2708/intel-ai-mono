import { PrismaClient } from "@prisma/client";
import type { FunctionMeta, TestCase } from "../src/lib/runner-types";

const prisma = new PrismaClient();

interface ProblemSeed {
  id: number;
  functionMeta: FunctionMeta;
  testCases: TestCase[];
}

const problems: ProblemSeed[] = [
  // 51 ─ Insert Interval
  {
    id: 51,
    functionMeta: {
      name: "insert",
      params: [
        { name: "intervals", type: "int[][]" },
        { name: "newInterval", type: "int[]" },
      ],
      returnType: "int[][]",
      compare: "exact",
    },
    testCases: [
      { input: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] }, expected: [[1, 5], [6, 9]] },
      {
        input: { intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval: [4, 8] },
        expected: [[1, 2], [3, 10], [12, 16]],
      },
      { input: { intervals: [], newInterval: [5, 7] }, expected: [[5, 7]] },
      { input: { intervals: [[1, 5]], newInterval: [2, 3] }, expected: [[1, 5]] },
    ],
  },

  // 52 ─ Non-overlapping Intervals
  {
    id: 52,
    functionMeta: {
      name: "eraseOverlapIntervals",
      params: [{ name: "intervals", type: "int[][]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] }, expected: 1 },
      { input: { intervals: [[1, 2], [1, 2], [1, 2]] }, expected: 2 },
      { input: { intervals: [[1, 2], [2, 3]] }, expected: 0 },
      { input: { intervals: [[1, 100], [11, 22], [1, 11], [2, 12]] }, expected: 2 },
    ],
  },

  // 53 ─ Gas Station
  {
    id: 53,
    functionMeta: {
      name: "canCompleteCircuit",
      params: [
        { name: "gas", type: "int[]" },
        { name: "cost", type: "int[]" },
      ],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] }, expected: 3 },
      { input: { gas: [2, 3, 4], cost: [3, 4, 3] }, expected: -1 },
      { input: { gas: [5, 1, 2, 3, 4], cost: [4, 4, 1, 5, 1] }, expected: 4 },
      { input: { gas: [3, 3, 4], cost: [3, 4, 4] }, expected: -1 },
    ],
  },

  // 54 ─ Partition Labels
  {
    id: 54,
    functionMeta: {
      name: "partitionLabels",
      params: [{ name: "s", type: "string" }],
      returnType: "int[]list",
      compare: "exact",
    },
    testCases: [
      { input: { s: "ababcbacadefegdehijhklij" }, expected: [9, 7, 8] },
      { input: { s: "eccbbbbdec" }, expected: [10] },
      { input: { s: "a" }, expected: [1] },
      { input: { s: "abcabc" }, expected: [6] },
    ],
  },

  // 55 ─ House Robber II
  {
    id: 55,
    functionMeta: {
      name: "rob",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [2, 3, 2] }, expected: 3 },
      { input: { nums: [1, 2, 3, 1] }, expected: 4 },
      { input: { nums: [1, 2, 3] }, expected: 3 },
      { input: { nums: [200, 3, 140, 20, 10] }, expected: 340 },
    ],
  },

  // 56 ─ Maximum Product Subarray
  {
    id: 56,
    functionMeta: {
      name: "maxProduct",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [2, 3, -2, 4] }, expected: 6 },
      { input: { nums: [-2, 0, -1] }, expected: 0 },
      { input: { nums: [-2, 3, -4] }, expected: 24 },
      { input: { nums: [2, -5, -2, -4, 3] }, expected: 24 },
    ],
  },

  // 57 ─ Decode Ways
  {
    id: 57,
    functionMeta: {
      name: "numDecodings",
      params: [{ name: "s", type: "string" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { s: "12" }, expected: 2 },
      { input: { s: "226" }, expected: 3 },
      { input: { s: "06" }, expected: 0 },
      { input: { s: "10" }, expected: 1 },
    ],
  },

  // 58 ─ Max Area of Island
  {
    id: 58,
    functionMeta: {
      name: "maxAreaOfIsland",
      params: [{ name: "grid", type: "int[][]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      {
        input: {
          grid: [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          ],
        },
        expected: 6,
      },
      { input: { grid: [[0, 0, 0, 0, 0, 0, 0, 0]] }, expected: 0 },
      {
        input: { grid: [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]] },
        expected: 4,
      },
      { input: { grid: [[1]] }, expected: 1 },
    ],
  },

  // 59 ─ Pacific Atlantic Water Flow: SKIP (coordinate pairs, set compare would sort inner arrays)

  // 60 ─ Remove Nth Node From End of List
  {
    id: 60,
    functionMeta: {
      name: "removeNthFromEnd",
      params: [
        { name: "head", type: "ListNode" },
        { name: "n", type: "int" },
      ],
      returnType: "ListNode",
      compare: "exact",
    },
    testCases: [
      { input: { head: [1, 2, 3, 4, 5], n: 2 }, expected: [1, 2, 3, 5] },
      { input: { head: [1], n: 1 }, expected: [] },
      { input: { head: [1, 2], n: 1 }, expected: [1] },
      { input: { head: [1, 2], n: 2 }, expected: [2] },
    ],
  },

  // 61 ─ Reorder List: SKIP (void inplace on ListNode)

  // 62 ─ Add Two Numbers
  {
    id: 62,
    functionMeta: {
      name: "addTwoNumbers",
      params: [
        { name: "l1", type: "ListNode" },
        { name: "l2", type: "ListNode" },
      ],
      returnType: "ListNode",
      compare: "exact",
    },
    testCases: [
      { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, expected: [7, 0, 8] },
      { input: { l1: [0], l2: [0] }, expected: [0] },
      { input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] }, expected: [8, 9, 9, 9, 0, 0, 0, 1] },
      { input: { l1: [2, 4, 9], l2: [5, 6, 4, 9] }, expected: [7, 0, 4, 0, 1] },
    ],
  },

  // 63 ─ Rotate Image (inplace int[][])
  {
    id: 63,
    functionMeta: {
      name: "rotate",
      params: [{ name: "matrix", type: "int[][]" }],
      returnType: "void",
      compare: "inplace",
      inplaceParam: "matrix",
    },
    testCases: [
      {
        input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
        expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
      },
      {
        input: { matrix: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]] },
        expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]],
      },
      { input: { matrix: [[1]] }, expected: [[1]] },
      { input: { matrix: [[1, 2], [3, 4]] }, expected: [[3, 1], [4, 2]] },
    ],
  },

  // 64 ─ Spiral Matrix
  {
    id: 64,
    functionMeta: {
      name: "spiralOrder",
      params: [{ name: "matrix", type: "int[][]" }],
      returnType: "int[]list",
      compare: "exact",
    },
    testCases: [
      { input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }, expected: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      {
        input: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] },
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
      },
      { input: { matrix: [[1]] }, expected: [1] },
      { input: { matrix: [[1, 2], [3, 4]] }, expected: [1, 2, 4, 3] },
    ],
  },

  // 65 ─ Set Matrix Zeroes (inplace int[][])
  {
    id: 65,
    functionMeta: {
      name: "setZeroes",
      params: [{ name: "matrix", type: "int[][]" }],
      returnType: "void",
      compare: "inplace",
      inplaceParam: "matrix",
    },
    testCases: [
      {
        input: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] },
        expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
      },
      {
        input: { matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]] },
        expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]],
      },
      {
        input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
        expected: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      },
      { input: { matrix: [[1], [0], [1]] }, expected: [[0], [0], [0]] },
    ],
  },

  // 66 ─ Happy Number
  {
    id: 66,
    functionMeta: {
      name: "isHappy",
      params: [{ name: "n", type: "int" }],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      { input: { n: 19 }, expected: true },
      { input: { n: 2 }, expected: false },
      { input: { n: 1 }, expected: true },
      { input: { n: 7 }, expected: true },
    ],
  },

  // 67 ─ Reverse Bits (using values that fit in signed int32 to avoid platform differences)
  {
    id: 67,
    functionMeta: {
      name: "reverseBits",
      params: [{ name: "n", type: "int" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { n: 43261596 }, expected: 964176192 },   // 0b00000010100101000001111010011100
      { input: { n: 964176192 }, expected: 43261596 },   // symmetric
      { input: { n: 0 }, expected: 0 },
      { input: { n: 6 }, expected: 1610612736 },          // 0b110 → bit 30+31 set
    ],
  },

  // 68 ─ Sum of Two Integers
  {
    id: 68,
    functionMeta: {
      name: "getSum",
      params: [
        { name: "a", type: "int" },
        { name: "b", type: "int" },
      ],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { a: 1, b: 2 }, expected: 3 },
      { input: { a: 2, b: 3 }, expected: 5 },
      { input: { a: -1, b: 1 }, expected: 0 },
      { input: { a: -2, b: -3 }, expected: -5 },
    ],
  },

  // 69 ─ Generate Parentheses: SKIP (string[] return; Java returns List<String>)

  // 70 ─ Daily Temperatures
  {
    id: 70,
    functionMeta: {
      name: "dailyTemperatures",
      params: [{ name: "temperatures", type: "int[]" }],
      returnType: "int[]",
      compare: "exact",
    },
    testCases: [
      { input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] }, expected: [1, 1, 4, 2, 1, 1, 0, 0] },
      { input: { temperatures: [30, 40, 50, 60] }, expected: [1, 1, 1, 0] },
      { input: { temperatures: [30, 60, 90] }, expected: [1, 1, 0] },
      {
        input: { temperatures: [89, 62, 70, 58, 47, 47, 46, 76, 100, 70] },
        expected: [8, 2, 1, 5, 4, 3, 2, 1, 0, 0],
      },
    ],
  },

  // 71 ─ Evaluate Reverse Polish Notation
  {
    id: 71,
    functionMeta: {
      name: "evalRPN",
      params: [{ name: "tokens", type: "string[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { tokens: ["2", "1", "+", "3", "*"] }, expected: 9 },
      { input: { tokens: ["4", "13", "5", "/", "+"] }, expected: 6 },
      {
        input: { tokens: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] },
        expected: 22,
      },
      { input: { tokens: ["3", "11", "5", "+", "-"] }, expected: -13 },
    ],
  },

  // 72 ─ Permutations
  {
    id: 72,
    functionMeta: {
      name: "permute",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int[][]list",
      compare: "rowset",
    },
    testCases: [
      {
        input: { nums: [1, 2, 3] },
        expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
      },
      { input: { nums: [0, 1] }, expected: [[0, 1], [1, 0]] },
      { input: { nums: [1] }, expected: [[1]] },
    ],
  },

  // 73 ─ Combination Sum II
  {
    id: 73,
    functionMeta: {
      name: "combinationSum2",
      params: [
        { name: "candidates", type: "int[]" },
        { name: "target", type: "int" },
      ],
      returnType: "int[][]list",
      compare: "set",
    },
    testCases: [
      { input: { candidates: [10, 1, 2, 7, 6, 1, 5], target: 8 }, expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
      { input: { candidates: [2, 5, 2, 1, 2], target: 5 }, expected: [[1, 2, 2], [5]] },
      { input: { candidates: [1, 1, 1, 1], target: 2 }, expected: [[1, 1]] },
    ],
  },

  // 74 ─ Word Search
  {
    id: 74,
    functionMeta: {
      name: "exist",
      params: [
        { name: "board", type: "char[][]" },
        { name: "word", type: "string" },
      ],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      {
        input: {
          board: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
          word: "ABCCED",
        },
        expected: true,
      },
      {
        input: {
          board: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
          word: "SEE",
        },
        expected: true,
      },
      {
        input: {
          board: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
          word: "ABCB",
        },
        expected: false,
      },
      {
        input: { board: [["a"]], word: "a" },
        expected: true,
      },
    ],
  },

  // 75 ─ Binary Tree Maximum Path Sum
  {
    id: 75,
    functionMeta: {
      name: "maxPathSum",
      params: [{ name: "root", type: "TreeNode" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { root: [1, 2, 3] }, expected: 6 },
      { input: { root: [-10, 9, 20, null, null, 15, 7] }, expected: 42 },
      { input: { root: [-3] }, expected: -3 },
      { input: { root: [2, -1] }, expected: 2 },
    ],
  },
];

async function seed() {
  console.log("Seeding testCases + functionMeta for problems 51-75 (skipping 59, 61, 69)...\n");

  for (const p of problems) {
    await prisma.intelProblem.update({
      where: { id: p.id },
      data: {
        testCases: p.testCases as object[],
        functionMeta: p.functionMeta as object,
      },
    });
    console.log(`  ✓ Problem ${p.id}`);
  }

  console.log("\n✅ Done — problems 51-75 (except 59, 61, 69) now have testCases + functionMeta.");
}

seed().catch(console.error).finally(() => prisma.$disconnect());

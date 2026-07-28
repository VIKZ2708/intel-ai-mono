import { PrismaClient } from "@prisma/client";
import type { FunctionMeta, TestCase } from "../src/lib/runner-types";

const prisma = new PrismaClient();

interface ProblemSeed {
  id: number;
  functionMeta: FunctionMeta;
  testCases: TestCase[];
}

const problems: ProblemSeed[] = [
  // 26 ─ Longest Increasing Subsequence
  {
    id: 26,
    functionMeta: {
      name: "lengthOfLIS",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expected: 4 },
      { input: { nums: [0, 1, 0, 3, 2, 3] }, expected: 4 },
      { input: { nums: [7, 7, 7, 7, 7] }, expected: 1 },
      { input: { nums: [1, 3, 6, 7, 9, 4, 10, 5, 6] }, expected: 6 },
    ],
  },

  // 27 ─ Find Minimum in Rotated Sorted Array
  {
    id: 27,
    functionMeta: {
      name: "findMin",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [3, 4, 5, 1, 2] }, expected: 1 },
      { input: { nums: [4, 5, 6, 7, 0, 1, 2] }, expected: 0 },
      { input: { nums: [11, 13, 15, 17] }, expected: 11 },
      { input: { nums: [2, 1] }, expected: 1 },
    ],
  },

  // 28 ─ Minimum Window Substring
  {
    id: 28,
    functionMeta: {
      name: "minWindow",
      params: [
        { name: "s", type: "string" },
        { name: "t", type: "string" },
      ],
      returnType: "string",
      compare: "exact",
    },
    testCases: [
      { input: { s: "ADOBECODEBANC", t: "ABC" }, expected: "BANC" },
      { input: { s: "a", t: "a" }, expected: "a" },
      { input: { s: "a", t: "aa" }, expected: "" },
      { input: { s: "aa", t: "aa" }, expected: "aa" },
    ],
  },

  // 29 ─ Course Schedule
  {
    id: 29,
    functionMeta: {
      name: "canFinish",
      params: [
        { name: "numCourses", type: "int" },
        { name: "prerequisites", type: "int[][]" },
      ],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      { input: { numCourses: 2, prerequisites: [[1, 0]] }, expected: true },
      { input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] }, expected: false },
      { input: { numCourses: 1, prerequisites: [] }, expected: true },
      { input: { numCourses: 3, prerequisites: [[1, 0], [2, 1], [0, 2]] }, expected: false },
    ],
  },

  // 30 ─ N-Queens: SKIP (string[][] return not supported)

  // 31 ─ Valid Palindrome
  {
    id: 31,
    functionMeta: {
      name: "isPalindrome",
      params: [{ name: "s", type: "string" }],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      { input: { s: "A man, a plan, a canal: Panama" }, expected: true },
      { input: { s: "race a car" }, expected: false },
      { input: { s: " " }, expected: true },
      { input: { s: "Was it a car or a cat I saw?" }, expected: true },
    ],
  },

  // 32 ─ Linked List Cycle: SKIP (can't represent cycles in JSON)

  // 33 ─ Merge Two Sorted Lists
  {
    id: 33,
    functionMeta: {
      name: "mergeTwoLists",
      params: [
        { name: "list1", type: "ListNode" },
        { name: "list2", type: "ListNode" },
      ],
      returnType: "ListNode",
      compare: "exact",
    },
    testCases: [
      { input: { list1: [1, 2, 4], list2: [1, 3, 4] }, expected: [1, 1, 2, 3, 4, 4] },
      { input: { list1: [], list2: [] }, expected: [] },
      { input: { list1: [], list2: [0] }, expected: [0] },
      { input: { list1: [1, 3, 5], list2: [2, 4, 6] }, expected: [1, 2, 3, 4, 5, 6] },
    ],
  },

  // 34 ─ Valid Anagram
  {
    id: 34,
    functionMeta: {
      name: "isAnagram",
      params: [
        { name: "s", type: "string" },
        { name: "t", type: "string" },
      ],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      { input: { s: "anagram", t: "nagaram" }, expected: true },
      { input: { s: "rat", t: "car" }, expected: false },
      { input: { s: "a", t: "ab" }, expected: false },
      { input: { s: "listen", t: "silent" }, expected: true },
    ],
  },

  // 35 ─ Single Number
  {
    id: 35,
    functionMeta: {
      name: "singleNumber",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [2, 2, 1] }, expected: 1 },
      { input: { nums: [4, 1, 2, 1, 2] }, expected: 4 },
      { input: { nums: [1] }, expected: 1 },
      { input: { nums: [0, 1, 0] }, expected: 1 },
    ],
  },

  // 36 ─ Missing Number
  {
    id: 36,
    functionMeta: {
      name: "missingNumber",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [3, 0, 1] }, expected: 2 },
      { input: { nums: [0, 1] }, expected: 2 },
      { input: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] }, expected: 8 },
      { input: { nums: [0] }, expected: 1 },
    ],
  },

  // 37 ─ Number of 1 Bits
  {
    id: 37,
    functionMeta: {
      name: "hammingWeight",
      params: [{ name: "n", type: "int" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { n: 11 }, expected: 3 },        // 0b1011
      { input: { n: 128 }, expected: 1 },        // 0b10000000
      { input: { n: 2147483645 }, expected: 30 }, // 0x7FFFFFFD
      { input: { n: 0 }, expected: 0 },
    ],
  },

  // 38 ─ Counting Bits
  {
    id: 38,
    functionMeta: {
      name: "countBits",
      params: [{ name: "n", type: "int" }],
      returnType: "int[]",
      compare: "exact",
    },
    testCases: [
      { input: { n: 2 }, expected: [0, 1, 1] },
      { input: { n: 5 }, expected: [0, 1, 1, 2, 1, 2] },
      { input: { n: 0 }, expected: [0] },
      { input: { n: 7 }, expected: [0, 1, 1, 2, 1, 2, 2, 3] },
    ],
  },

  // 39 ─ Same Tree
  {
    id: 39,
    functionMeta: {
      name: "isSameTree",
      params: [
        { name: "p", type: "TreeNode" },
        { name: "q", type: "TreeNode" },
      ],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      { input: { p: [1, 2, 3], q: [1, 2, 3] }, expected: true },
      { input: { p: [1, 2], q: [1, null, 2] }, expected: false },
      { input: { p: [1, 2, 1], q: [1, 1, 2] }, expected: false },
      { input: { p: [], q: [] }, expected: true },
    ],
  },

  // 40 ─ Symmetric Tree
  {
    id: 40,
    functionMeta: {
      name: "isSymmetric",
      params: [{ name: "root", type: "TreeNode" }],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      { input: { root: [1, 2, 2, 3, 4, 4, 3] }, expected: true },
      { input: { root: [1, 2, 2, null, 3, null, 3] }, expected: false },
      { input: { root: [1] }, expected: true },
      { input: { root: [1, 2, 2, 3, null, null, 3] }, expected: true },
    ],
  },

  // 41 ─ Validate Binary Search Tree
  {
    id: 41,
    functionMeta: {
      name: "isValidBST",
      params: [{ name: "root", type: "TreeNode" }],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      { input: { root: [2, 1, 3] }, expected: true },
      { input: { root: [5, 1, 4, null, null, 3, 6] }, expected: false },
      { input: { root: [5, 4, 6, null, null, 3, 7] }, expected: false },
      { input: { root: [2, 2, 2] }, expected: false },
    ],
  },

  // 42 ─ Lowest Common Ancestor of BST
  {
    id: 42,
    functionMeta: {
      name: "lowestCommonAncestor",
      params: [
        { name: "root", type: "TreeNode" },
        { name: "p", type: "TreeNodeRef" },
        { name: "q", type: "TreeNodeRef" },
      ],
      returnType: "TreeNodeVal",
      compare: "exact",
    },
    testCases: [
      {
        input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
        expected: 6,
      },
      {
        input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 },
        expected: 2,
      },
      { input: { root: [2, 1], p: 2, q: 1 }, expected: 2 },
      {
        input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 3, q: 5 },
        expected: 4,
      },
    ],
  },

  // 43 ─ Kth Smallest Element in a BST
  {
    id: 43,
    functionMeta: {
      name: "kthSmallest",
      params: [
        { name: "root", type: "TreeNode" },
        { name: "k", type: "int" },
      ],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { root: [3, 1, 4, null, 2], k: 1 }, expected: 1 },
      { input: { root: [5, 3, 6, 2, 4, null, null, 1], k: 3 }, expected: 3 },
      { input: { root: [1], k: 1 }, expected: 1 },
      { input: { root: [3, 1, 4, null, 2], k: 3 }, expected: 3 },
    ],
  },

  // 44 ─ Binary Tree Right Side View
  {
    id: 44,
    functionMeta: {
      name: "rightSideView",
      params: [{ name: "root", type: "TreeNode" }],
      returnType: "int[]list",
      compare: "exact",
    },
    testCases: [
      { input: { root: [1, 2, 3, null, 5, null, 4] }, expected: [1, 3, 4] },
      { input: { root: [1, null, 3] }, expected: [1, 3] },
      { input: { root: [] }, expected: [] },
      { input: { root: [1, 2, 3, 4, 5, 6, 7] }, expected: [1, 3, 7] },
    ],
  },

  // 45 ─ Group Anagrams: SKIP (string[][] return not supported)

  // 46 ─ Longest Consecutive Sequence
  {
    id: 46,
    functionMeta: {
      name: "longestConsecutive",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [100, 4, 200, 1, 3, 2] }, expected: 4 },
      { input: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }, expected: 9 },
      { input: { nums: [] }, expected: 0 },
      { input: { nums: [1, 2, 0, 1] }, expected: 3 },
    ],
  },

  // 47 ─ Search in Rotated Sorted Array
  {
    id: 47,
    functionMeta: {
      name: "search",
      params: [
        { name: "nums", type: "int[]" },
        { name: "target", type: "int" },
      ],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, expected: 4 },
      { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }, expected: -1 },
      { input: { nums: [1], target: 0 }, expected: -1 },
      { input: { nums: [1, 3], target: 3 }, expected: 1 },
    ],
  },

  // 48 ─ Search a 2D Matrix
  {
    id: 48,
    functionMeta: {
      name: "searchMatrix",
      params: [
        { name: "matrix", type: "int[][]" },
        { name: "target", type: "int" },
      ],
      returnType: "boolean",
      compare: "exact",
    },
    testCases: [
      {
        input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 },
        expected: true,
      },
      {
        input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13 },
        expected: false,
      },
      { input: { matrix: [[1]], target: 1 }, expected: true },
      {
        input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 60 },
        expected: true,
      },
    ],
  },

  // 49 ─ Top K Frequent Elements
  {
    id: 49,
    functionMeta: {
      name: "topKFrequent",
      params: [
        { name: "nums", type: "int[]" },
        { name: "k", type: "int" },
      ],
      returnType: "int[]",
      compare: "sort",
    },
    testCases: [
      { input: { nums: [1, 1, 1, 2, 2, 3], k: 2 }, expected: [1, 2] },
      { input: { nums: [1], k: 1 }, expected: [1] },
      { input: { nums: [1, 2], k: 2 }, expected: [1, 2] },
      { input: { nums: [4, 1, -1, 2, -1, 2, 3], k: 2 }, expected: [-1, 2] },
    ],
  },

  // 50 ─ Kth Largest Element in an Array
  {
    id: 50,
    functionMeta: {
      name: "findKthLargest",
      params: [
        { name: "nums", type: "int[]" },
        { name: "k", type: "int" },
      ],
      returnType: "int",
      compare: "exact",
    },
    testCases: [
      { input: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, expected: 5 },
      { input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, expected: 4 },
      { input: { nums: [1], k: 1 }, expected: 1 },
      { input: { nums: [2, 1], k: 2 }, expected: 1 },
    ],
  },
];

async function seed() {
  console.log("Seeding testCases + functionMeta for problems 26-50 (skipping 30, 32, 45)...\n");

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

  console.log("\n✅ Done — problems 26-50 (except 30, 32, 45) now have testCases + functionMeta.");
}

seed().catch(console.error).finally(() => prisma.$disconnect());

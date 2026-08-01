export type Difficulty = "Easy" | "Medium" | "Hard";
export type Category =
  | "Arrays"
  | "Stack"
  | "Linked List"
  | "Dynamic Programming"
  | "Greedy"
  | "Binary Search"
  | "Sliding Window"
  | "Graphs"
  | "Backtracking"
  | "Two Pointers"
  | "Trees"
  | "Heap"
  | "Bit Manipulation"
  | "Math"
  | "Intervals"
  | "Design";

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

import type { FunctionMeta, TestCase as RunnerTestCase } from "./runner-types";

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: Category;
  acceptance: string;
  description: string;
  examples: TestCase[];
  constraints: string[];
  hints: string[];
  starterCode: Record<string, string>;
  testCases?: RunnerTestCase[] | null;
  functionMeta?: FunctionMeta | null;
}

// ─── problems ────────────────────────────────────────────────────────────────

export const problems: Problem[] = [
  // ── 1. Two Sum ──────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: "49.2%",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to* \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, return [0,1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹", "Only one valid answer exists."],
    hints: ["A brute force O(n²) works but can we do better?", "Use a hash map: for each number check if (target - number) already exists in the map.", "Iterate once — store each number's index in the map as you go."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};`,
    },
  },

  // ── 2. Valid Parentheses ─────────────────────────────────────────────────────
  {
    id: 2,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "40.8%",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false", explanation: "Mismatched bracket types." },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
    hints: ["Use a stack to track opening brackets.", "When you see a closing bracket, check the top of the stack.", "At the end, the stack must be empty for a valid string."],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        return false;\n    }\n};`,
    },
  },

  // ── 3. Climbing Stairs ───────────────────────────────────────────────────────
  {
    id: 3,
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    acceptance: "51.9%",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "Two ways: (1+1) or (2)." },
      { input: "n = 3", output: "3", explanation: "Three ways: (1+1+1), (1+2), (2+1)." },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    hints: ["climbStairs(n) = climbStairs(n-1) + climbStairs(n-2).", "This is the Fibonacci sequence.", "Use bottom-up DP with two variables to avoid O(n) space."],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 4. Best Time to Buy and Sell Stock ──────────────────────────────────────
  {
    id: 4,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Greedy",
    acceptance: "54.1%",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn *the maximum profit you can achieve*. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profitable transaction possible." },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    hints: ["Track the minimum price seen so far.", "At each day compute profit = price - minSoFar.", "Track the maximum of those profits."],
    starterCode: {
      javascript: `/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 5. Binary Search ─────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    category: "Binary Search",
    acceptance: "55.3%",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.\n\nYou must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists at index 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique.", "nums is sorted in ascending order."],
    hints: ["Maintain left and right pointers.", "Compute mid = Math.floor((left + right) / 2).", "If nums[mid] equals target return mid; if smaller search right; if larger search left."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};`,
    },
  },

  // ── 6. Maximum Subarray ──────────────────────────────────────────────────────
  {
    id: 6,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "50.6%",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum and return *its sum*.\n\nA **subarray** is a contiguous non-empty part of an array.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    hints: ["Try Kadane's Algorithm.", "At each position: currentMax = max(nums[i], currentMax + nums[i]).", "Track the global maximum across all positions."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 7. Longest Substring Without Repeating Characters ───────────────────────
  {
    id: 7,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptance: "34.1%",
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: '"abc" has length 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: '"b" has length 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: '"wke" has length 3.' },
    ],
    constraints: ["0 ≤ s.length ≤ 5 × 10⁴", "s consists of English letters, digits, symbols, and spaces."],
    hints: ["Use a sliding window with left and right pointers.", "Use a Map to store the last seen index of each character.", "When a repeat is found, move left pointer past the previous occurrence."],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 8. Number of Islands ─────────────────────────────────────────────────────
  {
    id: 8,
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "57.8%",
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.\n\nAn **island** is surrounded by water and formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      {
        input: `grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`,
        output: "1",
      },
      {
        input: `grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`,
        output: "3",
      },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 300", "grid[i][j] is '0' or '1'."],
    hints: ["Use DFS: when you find a '1', flood-fill all connected '1's to '0'.", "Count how many times you start a new DFS.", "BFS works equally well — use a queue instead of recursion."],
    starterCode: {
      javascript: `/**\n * @param {character[][]} grid\n * @return {number}\n */\nfunction numIslands(grid) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 9. Word Break ────────────────────────────────────────────────────────────
  {
    id: 9,
    title: "Word Break",
    slug: "word-break",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "45.9%",
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote: the same word may be reused multiple times.`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true", explanation: '"leetcode" → "leet code".' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true" },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: "false" },
    ],
    constraints: ["1 ≤ s.length ≤ 300", "1 ≤ wordDict.length ≤ 1000"],
    hints: ["Use a boolean DP array where dp[i] = can s[0..i-1] be segmented.", "For each i, check all words: if dp[i-word.length] is true and s ends with word at i, set dp[i] = true.", "Initialize dp[0] = true (empty string is always valid)."],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nfunction wordBreak(s, wordDict) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> bool:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public boolean wordBreak(String s, java.util.List<String> wordDict) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        return false;\n    }\n};`,
    },
  },

  // ── 10. Combination Sum ──────────────────────────────────────────────────────
  {
    id: 10,
    title: "Combination Sum",
    slug: "combination-sum",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "69.2%",
    description: `Given an array of **distinct** integers \`candidates\` and a \`target\` integer, return *a list of all unique combinations of* \`candidates\` *where the chosen numbers sum to* \`target\`.\n\nThe **same** number may be chosen an **unlimited number of times**. Return combinations in any order.`,
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
      { input: "candidates = [2], target = 1", output: "[]" },
    ],
    constraints: ["1 ≤ candidates.length ≤ 30", "2 ≤ candidates[i] ≤ 40", "1 ≤ target ≤ 40"],
    hints: ["Sort candidates first.", "Use backtracking: at each step either pick the current candidate (staying at same index) or skip to the next.", "Prune: if current sum > target, backtrack immediately."],
    starterCode: {
      javascript: `/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nfunction combinationSum(candidates, target) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<Integer>> combinationSum(int[] candidates, int target) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        return {};\n    }\n};`,
    },
  },

  // ── 11. Valid Parentheses ────────────────────────────────────────────────────
  {
    id: 11,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "40.6%",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is **valid**.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: `s = "()"`, output: "true" },
      { input: `s = "()[]{}"`, output: "true" },
      { input: `s = "(]"`, output: "false", explanation: "Mismatched brackets." },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"],
    hints: ["Use a stack.", "Push opening brackets; on closing bracket, check if the top of the stack matches.", "At the end, the stack should be empty."],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        return false;\n    }\n};`,
    },
  },

  // ── 12. Maximum Subarray ─────────────────────────────────────────────────────
  {
    id: 12,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: "50.3%",
    description: `Given an integer array \`nums\`, find the **subarray** with the largest sum and return *its sum*.\n\nA **subarray** is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    hints: ["Try Kadane's algorithm.", "Keep a running sum; reset it to the current element when it goes below the current element.", "Track the global maximum as you iterate."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 13. Best Time to Buy and Sell Stock ──────────────────────────────────────
  {
    id: 13,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Greedy",
    acceptance: "54.2%",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 6-1 = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profitable transaction possible." },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    hints: ["Track the minimum price seen so far.", "For each price, compute profit as price - minPrice.", "Update your global maximum profit."],
    starterCode: {
      javascript: `/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 14. Binary Search ────────────────────────────────────────────────────────
  {
    id: 14,
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    category: "Binary Search",
    acceptance: "55.8%",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.\n\nYou must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists at index 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique.", "nums is sorted in ascending order."],
    hints: ["Use two pointers: left = 0, right = nums.length - 1.", "Compute mid = left + (right - left) / 2 to avoid overflow.", "If nums[mid] === target, return mid. If < target, move left up. Otherwise move right down."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};`,
    },
  },

  // ── 15. Min Stack ────────────────────────────────────────────────────────────
  {
    id: 15,
    title: "Min Stack",
    slug: "min-stack",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "53.7%",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the \`MinStack\` class:\n- \`MinStack()\` initializes the stack object.\n- \`void push(int val)\` pushes the element \`val\` onto the stack.\n- \`void pop()\` removes the element on the top of the stack.\n- \`int top()\` gets the top element of the stack.\n- \`int getMin()\` retrieves the minimum element in the stack.\n\nYou must implement a solution with **O(1) time complexity** for each function.`,
    examples: [
      { input: `["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]`, output: `[null,null,null,null,-3,null,0,-2]` },
    ],
    constraints: ["-2³¹ ≤ val ≤ 2³¹ - 1", "Methods pop, top and getMin are always called on non-empty stacks.", "At most 3 × 10⁴ calls will be made."],
    hints: ["Use two stacks: one for values, one tracking minimums.", "When pushing, push to min stack only if val ≤ current min.", "On pop, if the popped value equals the top of the min stack, pop the min stack too."],
    starterCode: {
      javascript: `class MinStack {\n  constructor() {\n    // Initialize your data structure\n  }\n\n  push(val) {\n    // Push element\n  }\n\n  pop() {\n    // Remove top\n  }\n\n  top() {\n    // Return top element\n  }\n\n  getMin() {\n    // Return minimum\n  }\n}`,
      python: `class MinStack:\n    def __init__(self):\n        # Initialize\n        pass\n\n    def push(self, val: int) -> None:\n        pass\n\n    def pop(self) -> None:\n        pass\n\n    def top(self) -> int:\n        pass\n\n    def getMin(self) -> int:\n        pass`,
      java: `class MinStack {\n    public MinStack() {}\n    public void push(int val) {}\n    public void pop() {}\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}`,
      cpp: `class MinStack {\npublic:\n    MinStack() {}\n    void push(int val) {}\n    void pop() {}\n    int top() { return 0; }\n    int getMin() { return 0; }\n};`,
    },
  },

  // ── 16. Reverse Linked List ──────────────────────────────────────────────────
  {
    id: 16,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "74.1%",
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.\n\nThe linked list is represented as an array of values for input/output purposes.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" },
    ],
    constraints: ["The number of nodes in the list is in range [0, 5000].", "-5000 ≤ Node.val ≤ 5000"],
    hints: ["Iterate with three pointers: prev, curr, next.", "On each step: save next, point curr.next to prev, advance prev and curr.", "Alternatively, use recursion."],
    starterCode: {
      javascript: `/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *   this.val = (val===undefined ? 0 : val)\n *   this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nfunction reverseList(head) {\n  // Write your solution here\n\n};`,
      python: `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head):\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 17. Number of Islands ────────────────────────────────────────────────────
  {
    id: 17,
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "57.4%",
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      { input: `grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`, output: "1" },
      { input: `grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`, output: "3" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 300", "grid[i][j] is '0' or '1'"],
    hints: ["Use BFS or DFS from each unvisited '1'.", "Mark visited cells by changing '1' to '0' (or use a visited array).", "Each DFS/BFS call counts as one island."],
    starterCode: {
      javascript: `/**\n * @param {character[][]} grid\n * @return {number}\n */\nfunction numIslands(grid) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 18. Product of Array Except Self ─────────────────────────────────────────
  {
    id: 18,
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    category: "Arrays",
    acceptance: "64.5%",
    description: `Given an integer array \`nums\`, return *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.\n\nThe product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in **O(n) time** and without using the division operation.`,
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30"],
    hints: ["Compute prefix products (left to right).", "Compute suffix products (right to left).", "answer[i] = prefix[i] × suffix[i]."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction productExceptSelf(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[0];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        return {};\n    }\n};`,
    },
  },

  // ── 19. Coin Change ──────────────────────────────────────────────────────────
  {
    id: 19,
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "43.2%",
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.\n\nReturn *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.\n\nYou may assume that you have an **infinite number** of each kind of coin.`,
    examples: [
      { input: "coins = [1,5,11], amount = 15", output: "3", explanation: "11 + 3×1 = 3 coins. Wait — 5+5+5 = 3 coins too. 15 = 11+3? No. 15 = 5+5+5 = 3 coins." },
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1 = 3 coins." },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2³¹ - 1", "0 ≤ amount ≤ 10⁴"],
    hints: ["Use bottom-up DP. Let dp[i] = minimum coins to make amount i.", "Initialize dp[0]=0, dp[1..amount]=Infinity.", "For each amount i, try every coin: dp[i] = min(dp[i], dp[i-coin]+1)."],
    starterCode: {
      javascript: `/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nfunction coinChange(coins, amount) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        return -1;\n    }\n};`,
    },
  },

  // ── 20. House Robber ─────────────────────────────────────────────────────────
  {
    id: 20,
    title: "House Robber",
    slug: "house-robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "50.1%",
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that **adjacent houses have security systems connected** and it will automatically contact the police if **two adjacent houses were broken into on the same night**.\n\nGiven an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money=1) then house 3 (money=3). 1+3=4." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1, 3, and 5. 2+9+1=12." },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 400"],
    hints: ["Define dp[i] as max money from first i houses.", "dp[i] = max(dp[i-1], dp[i-2] + nums[i]).", "You can optimise to O(1) space with two variables."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction rob(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def rob(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 21. Merge Intervals ──────────────────────────────────────────────────────
  {
    id: 21,
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    category: "Arrays",
    acceptance: "46.6%",
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.`,
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlap, merge them to [1,6]." },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "Intervals [1,4] and [4,5] are considered overlapping." },
    ],
    constraints: ["1 ≤ intervals.length ≤ 10⁴", "intervals[i].length == 2", "0 ≤ starti ≤ endi ≤ 10⁴"],
    hints: ["Sort intervals by start time.", "Iterate and merge: if current start ≤ last merged end, extend end.", "Otherwise start a new interval."],
    starterCode: {
      javascript: `/**\n * @param {number[][]} intervals\n * @return {number[][]}\n */\nfunction merge(intervals) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        return new int[0][];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        return {};\n    }\n};`,
    },
  },

  // ── 22. Jump Game ────────────────────────────────────────────────────────────
  {
    id: 22,
    title: "Jump Game",
    slug: "jump-game",
    difficulty: "Medium",
    category: "Greedy",
    acceptance: "38.5%",
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.\n\nReturn \`true\` *if you can reach the last index, or* \`false\` *otherwise*.`,
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to reach the last index." },
      { input: "nums = [3,2,1,0,4]", output: "false", explanation: "Always reach index 3 where jump is 0." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "0 ≤ nums[i] ≤ 10⁵"],
    hints: ["Track the maximum index you can reach so far.", "At each index i, if i > maxReach, you can't reach it — return false.", "Update maxReach = max(maxReach, i + nums[i])."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction canJump(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public boolean canJump(int[] nums) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        return false;\n    }\n};`,
    },
  },

  // ── 23. Subsets ──────────────────────────────────────────────────────────────
  {
    id: 23,
    title: "Subsets",
    slug: "subsets",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "75.3%",
    description: `Given an integer array \`nums\` of **unique** elements, return *all possible subsets (the power set)*.\n\nThe solution set **must not** contain duplicate subsets. Return the solution in **any order**.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10", "-10 ≤ nums[i] ≤ 10", "All the numbers of nums are unique."],
    hints: ["Use backtracking: at each position, either include or exclude the element.", "Alternatively, for each existing subset, add the new element to create a new subset.", "The total number of subsets is 2^n."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nfunction subsets(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<Integer>> subsets(int[] nums) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        return {};\n    }\n};`,
    },
  },

  // ── 24. Longest Palindromic Substring ────────────────────────────────────────
  {
    id: 24,
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "34.0%",
    description: `Given a string \`s\`, return *the longest palindromic substring in* \`s\`.`,
    examples: [
      { input: `s = "babad"`, output: `"bab"`, explanation: '"aba" is also a valid answer.' },
      { input: `s = "cbbd"`, output: `"bb"` },
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s consist of only digits and English letters."],
    hints: ["Expand around center: for each character (and each pair), expand outward while characters match.", "Track the longest palindrome found.", "O(n²) time is acceptable."],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {string}\n */\nfunction longestPalindrome(s) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public String longestPalindrome(String s) {\n        return "";\n    }\n}`,
      cpp: `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        return "";\n    }\n};`,
    },
  },

  // ── 25. Trapping Rain Water ──────────────────────────────────────────────────
  {
    id: 25,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    category: "Arrays",
    acceptance: "60.1%",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "The above elevation map traps 6 units of rain water." },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["n == height.length", "1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    hints: ["For each position, water held = min(maxLeft, maxRight) - height[i].", "Precompute prefix max (left) and suffix max (right) arrays.", "Or use two pointers to do it in O(1) space."],
    starterCode: {
      javascript: `/**\n * @param {number[]} height\n * @return {number}\n */\nfunction trap(height) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int trap(int[] height) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 26. Longest Increasing Subsequence ───────────────────────────────────────
  {
    id: 26,
    title: "Longest Increasing Subsequence",
    slug: "longest-increasing-subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "54.3%",
    description: `Given an integer array \`nums\`, return *the length of the longest **strictly increasing subsequence***.`,
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101] is the longest increasing subsequence, length 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
      { input: "nums = [7,7,7,7,7]", output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 2500", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    hints: ["dp[i] = length of LIS ending at index i.", "For each i, check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j]+1).", "O(n log n) is possible with patience sorting / binary search."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction lengthOfLIS(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 27. Find Minimum in Rotated Sorted Array ─────────────────────────────────
  {
    id: 27,
    title: "Find Minimum in Rotated Sorted Array",
    slug: "find-minimum-in-rotated-sorted-array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "48.7%",
    description: `Suppose an array of length \`n\` sorted in ascending order is **rotated** between \`1\` and \`n\` times. For example, the array \`nums = [0,1,2,4,5,6,7]\` might become \`[4,5,6,7,0,1,2]\`.\n\nGiven the sorted rotated array \`nums\` of **unique** elements, return *the minimum element of this array*.\n\nYou must write an algorithm that runs in **O(log n) time**.`,
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1", explanation: "Original: [1,2,3,4,5], rotated 3 times." },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
      { input: "nums = [11,13,15,17]", output: "11", explanation: "No rotation." },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 5000", "-5000 ≤ nums[i] ≤ 5000", "All integers are unique.", "nums is sorted and rotated between 1 and n times."],
    hints: ["Use binary search.", "If nums[mid] > nums[right], the minimum is in the right half.", "Otherwise it is in the left half (including mid)."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction findMin(nums) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def findMin(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 28. Minimum Window Substring ─────────────────────────────────────────────
  {
    id: 28,
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "Hard",
    category: "Sliding Window",
    acceptance: "41.4%",
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return *the **minimum window substring** of* \`s\` *such that every character in* \`t\` *(including duplicates) is included in the window*. If there is no such substring, return the empty string \`""\`.\n\nThe testcases will be generated such that the answer is **unique**.`,
    examples: [
      { input: `s = "ADOBECODEBANC", t = "ABC"`, output: `"BANC"`, explanation: "The minimum window substring BANC includes A, B, and C." },
      { input: `s = "a", t = "a"`, output: `"a"` },
      { input: `s = "a", t = "aa"`, output: `""`, explanation: "t has two a's but s has only one." },
    ],
    constraints: ["m == s.length", "n == t.length", "1 ≤ m, n ≤ 10⁵", "s and t consist of uppercase and lowercase English letters."],
    hints: ["Use a sliding window with two frequency maps.", "Expand right until all chars in t are covered, then shrink from left.", "Track the minimum window when all chars are covered."],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nfunction minWindow(s, t) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public String minWindow(String s, String t) {\n        return "";\n    }\n}`,
      cpp: `class Solution {\npublic:\n    string minWindow(string s, string t) {\n        return "";\n    }\n};`,
    },
  },

  // ── 29. Course Schedule ──────────────────────────────────────────────────────
  {
    id: 29,
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "45.9%",
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.\n\nReturn \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "Take course 0 first, then 1." },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "Circular dependency — impossible." },
    ],
    constraints: ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ 5000", "prerequisites[i].length == 2", "All pairs are unique."],
    hints: ["Model as a directed graph. This is a cycle detection problem.", "Use DFS with 3 states: unvisited (0), in-progress (1), done (2).", "If you reach an in-progress node during DFS, there's a cycle."],
    starterCode: {
      javascript: `/**\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nfunction canFinish(numCourses, prerequisites) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        return false;\n    }\n};`,
    },
  },

  // ── 30. N-Queens ─────────────────────────────────────────────────────────────
  {
    id: 30,
    title: "N-Queens",
    slug: "n-queens",
    difficulty: "Hard",
    category: "Backtracking",
    acceptance: "66.3%",
    description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n × n\` chessboard such that no two queens attack each other.\n\nGiven an integer \`n\`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` both indicate a queen and an empty space, respectively.`,
    examples: [
      { input: "n = 4", output: `[["..Q.","Q...","...Q",".Q.."],["..Q.",".Q..","...Q","Q..."]]`, explanation: "Two distinct solutions for 4-queens." },
      { input: "n = 1", output: `[["Q"]]` },
    ],
    constraints: ["1 ≤ n ≤ 9"],
    hints: ["Place one queen per row using backtracking.", "Track which columns and diagonals are occupied.", "For each row, try all columns that are not under attack."],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {string[][]}\n */\nfunction solveNQueens(n) {\n  // Write your solution here\n\n};`,
      python: `class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        # Write your solution here\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<String>> solveNQueens(int n) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        return {};\n    }\n};`,
    },
  },
];

export function getProblem(id: number) {
  return problems.find((p) => p.id === id);
}

import { PrismaClient } from "@prisma/client";
import { problems as fileProblems } from "../src/lib/problems";

const prisma = new PrismaClient();

function jsIIFE(body: string) {
  return `\n;(function(){\ntry{\n${body}\n}catch(e){console.log('Runtime Error:',e.message)}\n})();`;
}

// These IDs in problems.ts are duplicates — replaced below
const SKIP_IDS = new Set([11, 12, 13, 14, 17]);

// ── Tree helpers (inlined per runner) ────────────────────────────────────────
const JS_TREE = `
function TreeNode(val,left,right){this.val=(val===undefined?0:val);this.left=(left===undefined?null:left);this.right=(right===undefined?null:right);}
function buildTree(arr){if(!arr||arr.length===0)return null;const root=new TreeNode(arr[0]);const q=[root];let i=1;while(i<arr.length){const node=q.shift();if(arr[i]!=null){node.left=new TreeNode(arr[i]);q.push(node.left);}i++;if(i<arr.length&&arr[i]!=null){node.right=new TreeNode(arr[i]);q.push(node.right);}i++;}return root;}
function treeToArr(root){if(!root)return[];const res=[];const q=[root];while(q.length){const n=q.shift();if(n){res.push(n.val);q.push(n.left);q.push(n.right);}else res.push(null);}while(res[res.length-1]==null)res.pop();return res;}
`;

const PY_TREE = `
class TreeNode:
    def __init__(self,val=0,left=None,right=None):
        self.val=val;self.left=left;self.right=right
def build_tree(arr):
    if not arr:return None
    root=TreeNode(arr[0]);q=[root];i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None:node.left=TreeNode(arr[i]);q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None:node.right=TreeNode(arr[i]);q.append(node.right)
        i+=1
    return root
def tree_to_arr(root):
    if not root:return[]
    res=[];q=[root]
    while q:
        n=q.pop(0)
        if n:res.append(n.val);q.append(n.left);q.append(n.right)
        else:res.append(None)
    while res and res[-1] is None:res.pop()
    return res
`;

const JS_LIST = `
function ListNode(val,next){this.val=(val===undefined?0:val);this.next=(next===undefined?null:next);}
function toList(arr){let d=new ListNode(0),c=d;for(const v of arr){c.next=new ListNode(v);c=c.next;}return d.next;}
function toArr(h){const r=[];while(h){r.push(h.val);h=h.next;}return r;}
`;

const PY_LIST = `
class ListNode:
    def __init__(self,val=0,next=None):
        self.val=val;self.next=next
def to_list(arr):
    d=ListNode();c=d
    for v in arr:c.next=ListNode(v);c=c.next
    return d.next
def to_arr(h):
    r=[]
    while h:r.append(h.val);h=h.next
    return r
`;

// ── Replacement & new problems (IDs 11-14, 17, 31-75) ───────────────────────
const newProblems = [

  // ── 11. 3Sum ─────────────────────────────────────────────────────────────────
  {
    id: 11,
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "33.4%",
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.\n\nThe solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    hints: [
      "Sort the array first to enable the two-pointer technique.",
      "For each element at index i, use left = i+1 and right = n-1 pointers.",
      "Skip duplicate values for i, left, and right to avoid duplicate triplets.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nfunction threeSum(nums) {\n  \n};`,
      python: `class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<Integer>> threeSum(int[] nums) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        return {};\n    }\n};`,
    },
  },

  // ── 12. Container With Most Water ────────────────────────────────────────────
  {
    id: 12,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "54.4%",
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.\n\nFind two lines that together with the x-axis form a container such that it contains the most water.\n\nReturn *the maximum amount of water a container can store*.`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "Lines at index 1 and 8, water = min(8,7) × 7 = 49." },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    hints: [
      "Start with pointers at both ends of the array.",
      "The area is min(height[left], height[right]) × (right - left).",
      "Always move the pointer pointing to the shorter line inward.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} height\n * @return {number}\n */\nfunction maxArea(height) {\n  \n};`,
      python: `class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 13. Invert Binary Tree ────────────────────────────────────────────────────
  {
    id: 13,
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    acceptance: "76.3%",
    description: `Given the \`root\` of a binary tree, invert the tree and return *its root*.`,
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["The number of nodes in the tree is in range [0, 100].", "-100 ≤ Node.val ≤ 100"],
    hints: [
      "Recursively swap the left and right children of every node.",
      "Base case: if root is null, return null.",
      "BFS also works — process level by level swapping children.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nfunction invertTree(root) {\n  \n};`,
      python: `class Solution:\n    def invertTree(self, root):\n        pass`,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        return root;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        return root;\n    }\n};`,
    },
  },

  // ── 14. Maximum Depth of Binary Tree ─────────────────────────────────────────
  {
    id: 14,
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    acceptance: "74.2%",
    description: `Given the \`root\` of a binary tree, return *its maximum depth*.\n\nA binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["The number of nodes is in range [0, 10⁴].", "-100 ≤ Node.val ≤ 100"],
    hints: [
      "Use recursion: depth = 1 + max(depth(left), depth(right)).",
      "Base case: if root is null, return 0.",
      "BFS (level-order) also gives you the depth.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction maxDepth(root) {\n  \n};`,
      python: `class Solution:\n    def maxDepth(self, root) -> int:\n        pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 17. Binary Tree Level Order Traversal ────────────────────────────────────
  {
    id: 17,
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "66.7%",
    description: `Given the \`root\` of a binary tree, return *the level order traversal of its nodes' values* (i.e., from left to right, level by level).`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["The number of nodes in the tree is in range [0, 2000].", "-1000 ≤ Node.val ≤ 1000"],
    hints: [
      "Use BFS with a queue.",
      "At the start of each level, record the queue size — that is how many nodes are on this level.",
      "Process exactly that many nodes, collecting their values, then move on.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nfunction levelOrder(root) {\n  \n};`,
      python: `class Solution:\n    def levelOrder(self, root) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<Integer>> levelOrder(TreeNode root) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        return {};\n    }\n};`,
    },
  },

  // ── 31. Valid Palindrome ──────────────────────────────────────────────────────
  {
    id: 31,
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    acceptance: "46.3%",
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string \`s\`, return \`true\` *if it is a palindrome, or* \`false\` *otherwise*.`,
    examples: [
      { input: `s = "A man, a plan, a canal: Panama"`, output: "true", explanation: `"amanaplanacanalpanama" is a palindrome.` },
      { input: `s = "race a car"`, output: "false" },
      { input: `s = " "`, output: "true", explanation: "Empty string after filtering is a palindrome." },
    ],
    constraints: ["1 ≤ s.length ≤ 2 × 10⁵", "s consists only of printable ASCII characters."],
    hints: [
      "Filter the string to only alphanumeric characters and convert to lowercase.",
      "Use two pointers — one from each end — moving inward and comparing.",
    ],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isPalindrome(s) {\n  \n};`,
      python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        return false;\n    }\n};`,
    },
  },

  // ── 32. Linked List Cycle ─────────────────────────────────────────────────────
  {
    id: 32,
    title: "Linked List Cycle",
    slug: "linked-list-cycle",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "48.6%",
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.\n\nReturn \`true\` *if there is a cycle in the linked list*, otherwise return \`false\`.`,
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "Tail connects to node at index 1." },
      { input: "head = [1,2], pos = 0", output: "true" },
      { input: "head = [1], pos = -1", output: "false" },
    ],
    constraints: ["The number of nodes is in range [0, 10⁴].", "-10⁵ ≤ Node.val ≤ 10⁵", "pos is -1 or a valid index."],
    hints: [
      "Use Floyd's cycle detection: slow and fast pointers.",
      "Slow moves 1 step, fast moves 2 steps.",
      "If they meet, there is a cycle. If fast reaches null, there is no cycle.",
    ],
    starterCode: {
      javascript: `/**\n * @param {ListNode} head\n * @return {boolean}\n */\nfunction hasCycle(head) {\n  \n};`,
      python: `class Solution:\n    def hasCycle(self, head) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean hasCycle(ListNode head) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        return false;\n    }\n};`,
    },
  },

  // ── 33. Merge Two Sorted Lists ────────────────────────────────────────────────
  {
    id: 33,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "62.7%",
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn *the head of the merged linked list*.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["The number of nodes in both lists is in range [0, 50].", "-100 ≤ Node.val ≤ 100", "Both lists are sorted in non-decreasing order."],
    hints: [
      "Use a dummy head node to simplify edge cases.",
      "Compare the current nodes of both lists and append the smaller one.",
      "After one list is exhausted, append the remainder of the other.",
    ],
    starterCode: {
      javascript: `/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nfunction mergeTwoLists(list1, list2) {\n  \n};`,
      python: `class Solution:\n    def mergeTwoLists(self, list1, list2):\n        pass`,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 34. Valid Anagram ─────────────────────────────────────────────────────────
  {
    id: 34,
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: "63.2%",
    description: `Given two strings \`s\` and \`t\`, return \`true\` *if* \`t\` *is an anagram of* \`s\`*, and* \`false\` *otherwise*.\n\nAn **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: `s = "anagram", t = "nagaram"`, output: "true" },
      { input: `s = "rat", t = "car"`, output: "false" },
    ],
    constraints: ["1 ≤ s.length, t.length ≤ 5 × 10⁴", "s and t consist of lowercase English letters."],
    hints: [
      "If lengths differ, return false immediately.",
      "Count character frequencies in s, then subtract for t.",
      "Alternatively, sort both strings and compare.",
    ],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nfunction isAnagram(s, t) {\n  \n};`,
      python: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        return false;\n    }\n};`,
    },
  },

  // ── 35. Single Number ─────────────────────────────────────────────────────────
  {
    id: 35,
    title: "Single Number",
    slug: "single-number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "71.5%",
    description: `Given a **non-empty** array of integers \`nums\`, every element appears *twice* except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.`,
    examples: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 3 × 10⁴", "-3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴", "Each element appears exactly twice except for one."],
    hints: [
      "XOR of a number with itself is 0. XOR of a number with 0 is the number itself.",
      "XOR all elements together — duplicate pairs cancel out, leaving the single number.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction singleNumber(nums) {\n  \n};`,
      python: `class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 36. Missing Number ────────────────────────────────────────────────────────
  {
    id: 36,
    title: "Missing Number",
    slug: "missing-number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "64.1%",
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array*.`,
    examples: [
      { input: "nums = [3,0,1]", output: "2", explanation: "n = 3, range is [0,3]. Missing is 2." },
      { input: "nums = [0,1]", output: "2" },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 10⁴", "0 ≤ nums[i] ≤ n", "All numbers are unique."],
    hints: [
      "Expected sum of [0..n] = n*(n+1)/2. Subtract actual sum to find the missing number.",
      "XOR approach: XOR all indices 0..n with all values — the missing index remains.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction missingNumber(nums) {\n  \n};`,
      python: `class Solution:\n    def missingNumber(self, nums: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 37. Number of 1 Bits ──────────────────────────────────────────────────────
  {
    id: 37,
    title: "Number of 1 Bits",
    slug: "number-of-1-bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "69.4%",
    description: `Given a positive integer \`n\`, write a function that returns the number of **set bits** (1s) in its binary representation (also known as the **Hamming weight**).`,
    examples: [
      { input: "n = 11", output: "3", explanation: "11 = 1011 in binary has three 1 bits." },
      { input: "n = 128", output: "1", explanation: "128 = 10000000 has one 1 bit." },
      { input: "n = 2147483645", output: "30" },
    ],
    constraints: ["1 ≤ n ≤ 2³¹ - 1"],
    hints: [
      "n & 1 checks the last bit; n >>> 1 (or n >> 1) shifts right.",
      "Trick: n & (n-1) clears the lowest set bit. Count how many times until n is 0.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {number}\n */\nfunction hammingWeight(n) {\n  \n};`,
      python: `class Solution:\n    def hammingWeight(self, n: int) -> int:\n        pass`,
      java: `class Solution {\n    public int hammingWeight(int n) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int hammingWeight(int n) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 38. Counting Bits ─────────────────────────────────────────────────────────
  {
    id: 38,
    title: "Counting Bits",
    slug: "counting-bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "76.6%",
    description: `Given an integer \`n\`, return *an array* \`ans\` *of length* \`n + 1\` *such that for each* \`i\` \`(0 <= i <= n)\`*, \`ans[i]\` is the number of* \`1\`*'s in the binary representation of* \`i\`.`,
    examples: [
      { input: "n = 2", output: "[0,1,1]" },
      { input: "n = 5", output: "[0,1,1,2,1,2]" },
    ],
    constraints: ["0 ≤ n ≤ 10⁵"],
    hints: [
      "dp[i] = dp[i >> 1] + (i & 1). The count for i is the count of i shifted right plus its last bit.",
      "This builds the answer in O(n) without any built-in bit-count function.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {number[]}\n */\nfunction countBits(n) {\n  \n};`,
      python: `class Solution:\n    def countBits(self, n: int) -> list[int]:\n        pass`,
      java: `class Solution {\n    public int[] countBits(int n) {\n        return new int[0];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> countBits(int n) {\n        return {};\n    }\n};`,
    },
  },

  // ── 39. Same Tree ─────────────────────────────────────────────────────────────
  {
    id: 39,
    title: "Same Tree",
    slug: "same-tree",
    difficulty: "Easy",
    category: "Trees",
    acceptance: "59.7%",
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
      { input: "p = [1,2,1], q = [1,1,2]", output: "false" },
    ],
    constraints: ["The number of nodes in both trees is in range [0, 100].", "-10⁴ ≤ Node.val ≤ 10⁴"],
    hints: [
      "Recursively check: are both null? Same. One null? Different. Same value? Check children.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {boolean}\n */\nfunction isSameTree(p, q) {\n  \n};`,
      python: `class Solution:\n    def isSameTree(self, p, q) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        return false;\n    }\n};`,
    },
  },

  // ── 40. Symmetric Tree ────────────────────────────────────────────────────────
  {
    id: 40,
    title: "Symmetric Tree",
    slug: "symmetric-tree",
    difficulty: "Easy",
    category: "Trees",
    acceptance: "54.3%",
    description: `Given the \`root\` of a binary tree, *check whether it is a mirror of itself* (i.e., symmetric around its center).`,
    examples: [
      { input: "root = [1,2,2,3,4,4,3]", output: "true" },
      { input: "root = [1,2,2,null,3,null,3]", output: "false" },
    ],
    constraints: ["The number of nodes is in range [1, 1000].", "-100 ≤ Node.val ≤ 100"],
    hints: [
      "A tree is symmetric if the left subtree is a mirror of the right subtree.",
      "Write a helper isMirror(left, right) that checks recursively.",
      "Mirror condition: left.val == right.val AND isMirror(left.left, right.right) AND isMirror(left.right, right.left).",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {boolean}\n */\nfunction isSymmetric(root) {\n  \n};`,
      python: `class Solution:\n    def isSymmetric(self, root) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        return false;\n    }\n};`,
    },
  },

  // ── 41. Validate Binary Search Tree ──────────────────────────────────────────
  {
    id: 41,
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "32.5%",
    description: `Given the \`root\` of a binary tree, *determine if it is a valid binary search tree (BST)*.\n\nA **valid BST** is defined as:\n- The left subtree contains only nodes with keys **less than** the node's key.\n- The right subtree contains only nodes with keys **greater than** the node's key.\n- Both the left and right subtrees must also be valid BSTs.`,
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "Root is 5, but right child is 4 < 5." },
    ],
    constraints: ["The number of nodes is in range [1, 10⁴].", "-2³¹ ≤ Node.val ≤ 2³¹ - 1"],
    hints: [
      "Pass down min and max bounds during DFS — each node's value must be within (min, max).",
      "For left child: new max = current node's value.",
      "For right child: new min = current node's value.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {boolean}\n */\nfunction isValidBST(root) {\n  \n};`,
      python: `class Solution:\n    def isValidBST(self, root) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        return false;\n    }\n};`,
    },
  },

  // ── 42. Lowest Common Ancestor of BST ────────────────────────────────────────
  {
    id: 42,
    title: "Lowest Common Ancestor of a BST",
    slug: "lowest-common-ancestor-of-bst",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "65.1%",
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nThe LCA is defined as the lowest node that has both \`p\` and \`q\` as descendants (a node can be a descendant of itself).`,
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2" },
      { input: "root = [2,1], p = 2, q = 1", output: "2" },
    ],
    constraints: ["The number of nodes is in range [2, 10⁵].", "-10⁹ ≤ Node.val ≤ 10⁹", "All values are unique.", "p and q exist in the BST."],
    hints: [
      "Use the BST property: if both p and q are less than root, go left.",
      "If both are greater than root, go right.",
      "Otherwise, the current root is the LCA.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nfunction lowestCommonAncestor(root, p, q) {\n  \n};`,
      python: `class Solution:\n    def lowestCommonAncestor(self, root, p, q):\n        pass`,
      java: `class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 43. Kth Smallest Element in a BST ────────────────────────────────────────
  {
    id: 43,
    title: "Kth Smallest Element in a BST",
    slug: "kth-smallest-element-in-bst",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "72.1%",
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return *the* \`k\`*th smallest value (1-indexed) of all the values of the nodes in the tree*.`,
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" },
      { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" },
    ],
    constraints: ["The number of nodes is n.", "1 ≤ k ≤ n ≤ 10⁴", "0 ≤ Node.val ≤ 10⁴"],
    hints: [
      "In-order traversal of a BST gives nodes in ascending sorted order.",
      "Return the k-th value encountered during in-order traversal.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @param {number} k\n * @return {number}\n */\nfunction kthSmallest(root, k) {\n  \n};`,
      python: `class Solution:\n    def kthSmallest(self, root, k: int) -> int:\n        pass`,
      java: `class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 44. Binary Tree Right Side View ──────────────────────────────────────────
  {
    id: 44,
    title: "Binary Tree Right Side View",
    slug: "binary-tree-right-side-view",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "61.8%",
    description: `Given the \`root\` of a binary tree, imagine yourself standing on the **right side** of it, return *the values of the nodes you can see ordered from top to bottom*.`,
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
      { input: "root = [1,null,3]", output: "[1,3]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["The number of nodes is in range [0, 100].", "-100 ≤ Node.val ≤ 100"],
    hints: [
      "Use BFS level-order traversal.",
      "The last node processed at each level is the rightmost visible node.",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {number[]}\n */\nfunction rightSideView(root) {\n  \n};`,
      python: `class Solution:\n    def rightSideView(self, root) -> list[int]:\n        pass`,
      java: `class Solution {\n    public java.util.List<Integer> rightSideView(TreeNode root) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        return {};\n    }\n};`,
    },
  },

  // ── 45. Group Anagrams ────────────────────────────────────────────────────────
  {
    id: 45,
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "Medium",
    category: "Arrays",
    acceptance: "67.3%",
    description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.`,
    examples: [
      { input: `strs = ["eat","tea","tan","ate","nat","bat"]`, output: `[["bat"],["nat","tan"],["ate","eat","tea"]]` },
      { input: `strs = [""]`, output: `[[""]]` },
      { input: `strs = ["a"]`, output: `[["a"]]` },
    ],
    constraints: ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100", "strs[i] consists of lowercase English letters."],
    hints: [
      "Sort each string to create a canonical key — anagrams produce the same sorted string.",
      "Group strings by their sorted key using a hash map.",
    ],
    starterCode: {
      javascript: `/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nfunction groupAnagrams(strs) {\n  \n};`,
      python: `class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<String>> groupAnagrams(String[] strs) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        return {};\n    }\n};`,
    },
  },

  // ── 46. Longest Consecutive Sequence ─────────────────────────────────────────
  {
    id: 46,
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    difficulty: "Medium",
    category: "Arrays",
    acceptance: "46.8%",
    description: `Given an unsorted array of integers \`nums\`, return *the length of the longest consecutive elements sequence*.\n\nYou must write an algorithm that runs in **O(n)** time.`,
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "[1,2,3,4] is the longest consecutive sequence." },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    constraints: ["0 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    hints: [
      "Add all numbers to a hash set for O(1) lookups.",
      "Only start counting from a number n if n-1 is NOT in the set (this is the sequence start).",
      "Then count how long the consecutive run is from that starting point.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction longestConsecutive(nums) {\n  \n};`,
      python: `class Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int longestConsecutive(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 47. Search in Rotated Sorted Array ───────────────────────────────────────
  {
    id: 47,
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "39.4%",
    description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values). Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index.\n\nGiven the array \`nums\` and an integer \`target\`, return *the index of* \`target\` *if it is in* \`nums\`*, or* \`-1\` *if it is not in* \`nums\`.\n\nYou must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
      { input: "nums = [1], target = 0", output: "-1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 5000", "-10⁴ ≤ nums[i] ≤ 10⁴", "All values are unique.", "nums is an ascending array, possibly rotated."],
    hints: [
      "Use binary search. Determine which half is sorted by comparing nums[mid] with nums[left].",
      "If nums[left] ≤ nums[mid], the left half is sorted.",
      "Check if the target lies within the sorted half — if so, search there; otherwise search the other half.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  \n};`,
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};`,
    },
  },

  // ── 48. Search a 2D Matrix ────────────────────────────────────────────────────
  {
    id: 48,
    title: "Search a 2D Matrix",
    slug: "search-a-2d-matrix",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "50.1%",
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer \`target\`, return \`true\` *if* \`target\` *is in* \`matrix\` *or* \`false\` *otherwise*.`,
    examples: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false" },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 ≤ m, n ≤ 100", "-10⁴ ≤ matrix[i][j], target ≤ 10⁴"],
    hints: [
      "Treat the matrix as a flattened sorted array of length m×n.",
      "Binary search on index mid: row = Math.floor(mid / n), col = mid % n.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} matrix\n * @param {number} target\n * @return {boolean}\n */\nfunction searchMatrix(matrix, target) {\n  \n};`,
      python: `class Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        return false;\n    }\n};`,
    },
  },

  // ── 49. Top K Frequent Elements ───────────────────────────────────────────────
  {
    id: 49,
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "Medium",
    category: "Heap",
    acceptance: "64.8%",
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.`,
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "k is in range [1, number of unique elements].", "The answer is guaranteed to be unique."],
    hints: [
      "Count frequencies using a hash map.",
      "Use bucket sort: create an array of size n+1 where index = frequency.",
      "Or use a min-heap of size k to track the top k elements.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nfunction topKFrequent(nums, k) {\n  \n};`,
      python: `class Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        pass`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        return new int[0];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        return {};\n    }\n};`,
    },
  },

  // ── 50. Kth Largest Element in an Array ──────────────────────────────────────
  {
    id: 50,
    title: "Kth Largest Element in an Array",
    slug: "kth-largest-element-in-array",
    difficulty: "Medium",
    category: "Heap",
    acceptance: "65.7%",
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\`*th largest element in the array*.\n\nNote that it is the \`k\`th largest element in the sorted order, not the \`k\`th distinct element.\n\nCan you solve it without sorting?`,
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
    ],
    constraints: ["1 ≤ k ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    hints: [
      "Use a min-heap of size k. Iterate; if a number is larger than the heap's min, replace it.",
      "At the end, the heap's minimum is the kth largest.",
      "Quickselect (average O(n)) is the optimal approach.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nfunction findKthLargest(nums, k) {\n  \n};`,
      python: `class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        pass`,
      java: `class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 51. Insert Interval ──────────────────────────────────────────────────────
  {
    id: 51,
    title: "Insert Interval",
    slug: "insert-interval",
    difficulty: "Medium",
    category: "Intervals",
    acceptance: "40.3%",
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` represent the start and end of the \`i\`th interval and \`intervals\` is sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\`.\n\nInsert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted and non-overlapping (merge if necessary).\n\nReturn \`intervals\` *after the insertion*.`,
    examples: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" },
      { input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", output: "[[1,2],[3,10],[12,16]]" },
    ],
    constraints: ["0 ≤ intervals.length ≤ 10⁴", "intervals[i].length == 2", "0 ≤ starti ≤ endi ≤ 10⁵"],
    hints: [
      "Add all intervals that end before newInterval starts.",
      "Merge all overlapping intervals with newInterval.",
      "Add the remaining intervals after.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} intervals\n * @param {number[]} newInterval\n * @return {number[][]}\n */\nfunction insert(intervals, newInterval) {\n  \n};`,
      python: `class Solution:\n    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        return new int[0][];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        return {};\n    }\n};`,
    },
  },

  // ── 52. Non-overlapping Intervals ────────────────────────────────────────────
  {
    id: 52,
    title: "Non-overlapping Intervals",
    slug: "non-overlapping-intervals",
    difficulty: "Medium",
    category: "Intervals",
    acceptance: "53.6%",
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return *the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping*.`,
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "[1,3] can be removed and the rest are non-overlapping." },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2" },
      { input: "intervals = [[1,2],[2,3]]", output: "0" },
    ],
    constraints: ["1 ≤ intervals.length ≤ 10⁵", "intervals[i].length == 2", "-5 × 10⁴ ≤ starti < endi ≤ 5 × 10⁴"],
    hints: [
      "Sort by end time. Greedily keep intervals with the earliest end time.",
      "If the current interval's start < last kept end, it overlaps — remove it (count++).",
      "Otherwise update last kept end.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} intervals\n * @return {number}\n */\nfunction eraseOverlapIntervals(intervals) {\n  \n};`,
      python: `class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        pass`,
      java: `class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 53. Gas Station ──────────────────────────────────────────────────────────
  {
    id: 53,
    title: "Gas Station",
    slug: "gas-station",
    difficulty: "Medium",
    category: "Greedy",
    acceptance: "45.1%",
    description: `There are \`n\` gas stations along a circular route. You are given two integer arrays \`gas\` and \`cost\` where \`gas[i]\` is the amount of gas at the \`i\`th station and \`cost[i]\` is the cost to travel from the \`i\`th station to the next.\n\nReturn *the starting station's index* if you can travel around the circuit once, or \`-1\` if it is impossible. If a solution exists, it is guaranteed to be unique.`,
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" },
      { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1" },
    ],
    constraints: ["n == gas.length == cost.length", "1 ≤ n ≤ 10⁵", "0 ≤ gas[i], cost[i] ≤ 10⁴"],
    hints: [
      "If total gas < total cost, no solution exists.",
      "Greedily track current tank. If it drops below 0, the start must be after the current index.",
      "Reset tank to 0 and try starting from i+1.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} gas\n * @param {number[]} cost\n * @return {number}\n */\nfunction canCompleteCircuit(gas, cost) {\n  \n};`,
      python: `class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        return -1;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        return -1;\n    }\n};`,
    },
  },

  // ── 54. Partition Labels ──────────────────────────────────────────────────────
  {
    id: 54,
    title: "Partition Labels",
    slug: "partition-labels",
    difficulty: "Medium",
    category: "Greedy",
    acceptance: "79.4%",
    description: `You are given a string \`s\`. We want to partition this string into as many parts as possible so that each letter appears in at most one part.\n\nReturn *a list of integers representing the size of these parts*.`,
    examples: [
      { input: `s = "ababcbacadefegdehijhklij"`, output: "[9,7,8]", explanation: `Parts are "ababcbaca", "defegde", "hijhklij".` },
      { input: `s = "eccbbbbdec"`, output: "[10]" },
    ],
    constraints: ["1 ≤ s.length ≤ 500", "s consists of lowercase English letters."],
    hints: [
      "Record the last occurrence index of each character.",
      "Greedily extend the current partition end to the last occurrence of any character seen so far.",
      "When the current index equals the partition end, record this partition's size.",
    ],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {number[]}\n */\nfunction partitionLabels(s) {\n  \n};`,
      python: `class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        pass`,
      java: `class Solution {\n    public java.util.List<Integer> partitionLabels(String s) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        return {};\n    }\n};`,
    },
  },

  // ── 55. House Robber II ───────────────────────────────────────────────────────
  {
    id: 55,
    title: "House Robber II",
    slug: "house-robber-ii",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "41.0%",
    description: `You are a professional robber planning to rob houses along a street. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one.\n\nGiven an integer array \`nums\` representing the amount of money, return *the maximum amount of money you can rob without alerting the police*.`,
    examples: [
      { input: "nums = [2,3,2]", output: "3", explanation: "Can't rob house 0 and 2 (adjacent in circle)." },
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 0 (money=1) then house 2 (money=3). Total = 4." },
      { input: "nums = [1,2,3]", output: "3" },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 1000"],
    hints: [
      "Split into two House Robber I subproblems: nums[0..n-2] and nums[1..n-1].",
      "Return the max of the two.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction rob(nums) {\n  \n};`,
      python: `class Solution:\n    def rob(self, nums: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 56. Maximum Product Subarray ─────────────────────────────────────────────
  {
    id: 56,
    title: "Maximum Product Subarray",
    slug: "maximum-product-subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "34.6%",
    description: `Given an integer array \`nums\`, find a subarray that has the largest product, and return *the product*.\n\nThe test cases are generated so that the answer will fit in a **32-bit** integer.`,
    examples: [
      { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
      { input: "nums = [-2,0,-1]", output: "0", explanation: "The result cannot be 2 because [-2,-1] is not a subarray." },
    ],
    constraints: ["1 ≤ nums.length ≤ 2 × 10⁴", "-10 ≤ nums[i] ≤ 10", "The product of any subarray fits in a 32-bit integer."],
    hints: [
      "Track both the maximum and minimum product ending at each position.",
      "A negative × negative = positive, so the minimum can become the maximum.",
      "curMax = max(num, curMax*num, curMin*num); curMin = min(...).",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxProduct(nums) {\n  \n};`,
      python: `class Solution:\n    def maxProduct(self, nums: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int maxProduct(int[] nums) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 57. Decode Ways ───────────────────────────────────────────────────────────
  {
    id: 57,
    title: "Decode Ways",
    slug: "decode-ways",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "34.9%",
    description: `A message containing letters from \`A-Z\` can be **encoded** into numbers using the mapping: \`'A' → "1", 'B' → "2", ..., 'Z' → "26"\`.\n\nGiven a string \`s\` containing only digits, return *the number of ways to decode it*. If there are no valid ways, return \`0\`.`,
    examples: [
      { input: `s = "12"`, output: "2", explanation: `"12" → "AB" (1 2) or "L" (12).` },
      { input: `s = "226"`, output: "3", explanation: `"BZ" (2 26), "VF" (22 6), "BBF" (2 2 6).` },
      { input: `s = "06"`, output: "0", explanation: `"06" cannot be decoded.` },
    ],
    constraints: ["1 ≤ s.length ≤ 100", "s contains only digits and may contain leading zeros."],
    hints: [
      "dp[i] = number of ways to decode s[0..i-1].",
      "Single digit decode: if s[i-1] != '0', dp[i] += dp[i-1].",
      "Two digit decode: if s[i-2..i-1] is between 10-26, dp[i] += dp[i-2].",
    ],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {number}\n */\nfunction numDecodings(s) {\n  \n};`,
      python: `class Solution:\n    def numDecodings(self, s: str) -> int:\n        pass`,
      java: `class Solution {\n    public int numDecodings(String s) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numDecodings(string s) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 58. Max Area of Island ────────────────────────────────────────────────────
  {
    id: 58,
    title: "Max Area of Island",
    slug: "max-area-of-island",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "71.6%",
    description: `You are given an \`m x n\` binary matrix \`grid\`. An **island** is a group of \`1\`s (representing land) connected **4-directionally** (horizontal or vertical).\n\nReturn *the maximum area of an island in* \`grid\`. If there is no island, return \`0\`.`,
    examples: [
      { input: "grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]", output: "6" },
      { input: "grid = [[0,0,0,0,0,0,0,0]]", output: "0" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 50", "grid[i][j] is either 0 or 1."],
    hints: [
      "Use DFS from each unvisited 1, counting connected cells.",
      "Mark visited cells as 0 to avoid reprocessing.",
      "Track the max area across all DFS calls.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} grid\n * @return {number}\n */\nfunction maxAreaOfIsland(grid) {\n  \n};`,
      python: `class Solution:\n    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:\n        pass`,
      java: `class Solution {\n    public int maxAreaOfIsland(int[][] grid) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 59. Pacific Atlantic Water Flow ──────────────────────────────────────────
  {
    id: 59,
    title: "Pacific Atlantic Water Flow",
    slug: "pacific-atlantic-water-flow",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "54.2%",
    description: `There is an \`m x n\` rectangular island that borders both the **Pacific** and **Atlantic** oceans. The Pacific ocean touches the island's left and top edges, and the Atlantic ocean touches the right and bottom edges.\n\nWater can only flow in four directions (up, down, left, right) to an adjacent cell with height **less than or equal** to the current cell's height.\n\nReturn *a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans*.`,
    examples: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" },
      { input: "heights = [[1]]", output: "[[0,0]]" },
    ],
    constraints: ["m == heights.length", "n == heights[i].length", "1 ≤ m, n ≤ 200", "0 ≤ heights[i][j] ≤ 10⁵"],
    hints: [
      "Reverse the problem: do BFS/DFS from ocean borders inward (water flowing uphill from ocean).",
      "From Pacific borders (top row + left col), mark all reachable cells.",
      "From Atlantic borders (bottom row + right col), mark all reachable cells.",
      "Return cells reachable from both.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} heights\n * @return {number[][]}\n */\nfunction pacificAtlantic(heights) {\n  \n};`,
      python: `class Solution:\n    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<Integer>> pacificAtlantic(int[][] heights) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        return {};\n    }\n};`,
    },
  },

  // ── 60. Remove Nth Node From End of List ─────────────────────────────────────
  {
    id: 60,
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end-of-list",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "43.3%",
    description: `Given the \`head\` of a linked list, remove the \`n\`th node from the end of the list and return its head.`,
    examples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "head = [1], n = 1", output: "[]" },
      { input: "head = [1,2], n = 1", output: "[1]" },
    ],
    constraints: ["The number of nodes is sz.", "1 ≤ sz ≤ 30", "0 ≤ Node.val ≤ 100", "1 ≤ n ≤ sz"],
    hints: [
      "Use two pointers: advance fast by n steps first.",
      "Then move both slow and fast until fast reaches the end.",
      "slow.next is the node to remove.",
    ],
    starterCode: {
      javascript: `/**\n * @param {ListNode} head\n * @param {number} n\n * @return {ListNode}\n */\nfunction removeNthFromEnd(head, n) {\n  \n};`,
      python: `class Solution:\n    def removeNthFromEnd(self, head, n: int):\n        pass`,
      java: `class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 61. Reorder List ──────────────────────────────────────────────────────────
  {
    id: 61,
    title: "Reorder List",
    slug: "reorder-list",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "58.9%",
    description: `You are given the head of a singly linked-list: \`L0 → L1 → … → Ln-1 → Ln\`.\n\nReorder it to: \`L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …\`\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" },
    ],
    constraints: ["The number of nodes is in range [1, 5 × 10⁴].", "1 ≤ Node.val ≤ 1000"],
    hints: [
      "Find the middle of the list using slow/fast pointers.",
      "Reverse the second half of the list.",
      "Merge the two halves alternately.",
    ],
    starterCode: {
      javascript: `/**\n * @param {ListNode} head\n * @return {void}\n */\nfunction reorderList(head) {\n  \n};`,
      python: `class Solution:\n    def reorderList(self, head) -> None:\n        pass`,
      java: `class Solution {\n    public void reorderList(ListNode head) {}\n}`,
      cpp: `class Solution {\npublic:\n    void reorderList(ListNode* head) {}\n};`,
    },
  },

  // ── 62. Add Two Numbers ───────────────────────────────────────────────────────
  {
    id: 62,
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "43.3%",
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each node contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
      { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]" },
    ],
    constraints: ["The number of nodes in each list is in range [1, 100].", "0 ≤ Node.val ≤ 9", "No leading zeros except 0 itself."],
    hints: [
      "Iterate both lists simultaneously, summing digits plus a carry.",
      "carry = Math.floor(sum / 10); digit = sum % 10.",
      "After both lists are exhausted, append carry if nonzero.",
    ],
    starterCode: {
      javascript: `/**\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nfunction addTwoNumbers(l1, l2) {\n  \n};`,
      python: `class Solution:\n    def addTwoNumbers(self, l1, l2):\n        pass`,
      java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 63. Rotate Image ──────────────────────────────────────────────────────────
  {
    id: 63,
    title: "Rotate Image",
    slug: "rotate-image",
    difficulty: "Medium",
    category: "Arrays",
    acceptance: "74.2%",
    description: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90 degrees (clockwise)**.\n\nYou have to rotate the image **in-place**.`,
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
      { input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" },
    ],
    constraints: ["n == matrix.length == matrix[i].length", "1 ≤ n ≤ 20", "-1000 ≤ matrix[i][j] ≤ 1000"],
    hints: [
      "Transpose the matrix (swap matrix[i][j] with matrix[j][i]).",
      "Then reverse each row.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} matrix\n * @return {void}\n */\nfunction rotate(matrix) {\n  \n};`,
      python: `class Solution:\n    def rotate(self, matrix: list[list[int]]) -> None:\n        pass`,
      java: `class Solution {\n    public void rotate(int[][] matrix) {}\n}`,
      cpp: `class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {}\n};`,
    },
  },

  // ── 64. Spiral Matrix ─────────────────────────────────────────────────────────
  {
    id: 64,
    title: "Spiral Matrix",
    slug: "spiral-matrix",
    difficulty: "Medium",
    category: "Arrays",
    acceptance: "48.3%",
    description: `Given an \`m x n\` \`matrix\`, return *all elements of the* \`matrix\` *in spiral order*.`,
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]" },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 ≤ m, n ≤ 10", "-100 ≤ matrix[i][j] ≤ 100"],
    hints: [
      "Maintain four boundaries: top, bottom, left, right.",
      "Traverse right along top, down along right, left along bottom, up along left.",
      "Shrink the boundary after each traversal.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} matrix\n * @return {number[]}\n */\nfunction spiralOrder(matrix) {\n  \n};`,
      python: `class Solution:\n    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:\n        pass`,
      java: `class Solution {\n    public java.util.List<Integer> spiralOrder(int[][] matrix) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        return {};\n    }\n};`,
    },
  },

  // ── 65. Set Matrix Zeroes ─────────────────────────────────────────────────────
  {
    id: 65,
    title: "Set Matrix Zeroes",
    slug: "set-matrix-zeroes",
    difficulty: "Medium",
    category: "Arrays",
    acceptance: "55.8%",
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.\n\nYou must do it **in place**.`,
    examples: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
      { input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]" },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 ≤ m, n ≤ 200", "-2³¹ ≤ matrix[i][j] ≤ 2³¹ - 1"],
    hints: [
      "First pass: record which rows and columns contain a zero.",
      "Second pass: zero out those rows and columns.",
      "O(1) space: use the first row and column as markers.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[][]} matrix\n * @return {void}\n */\nfunction setZeroes(matrix) {\n  \n};`,
      python: `class Solution:\n    def setZeroes(self, matrix: list[list[int]]) -> None:\n        pass`,
      java: `class Solution {\n    public void setZeroes(int[][] matrix) {}\n}`,
      cpp: `class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {}\n};`,
    },
  },

  // ── 66. Happy Number ──────────────────────────────────────────────────────────
  {
    id: 66,
    title: "Happy Number",
    slug: "happy-number",
    difficulty: "Easy",
    category: "Math",
    acceptance: "55.2%",
    description: `Write an algorithm to determine if a number \`n\` is **happy**.\n\nA **happy number** is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it stays), or it **loops endlessly in a cycle** that does not include 1.\n\nReturn \`true\` *if* \`n\` *is a happy number, and* \`false\` *if not*.`,
    examples: [
      { input: "n = 19", output: "true", explanation: "1² + 9² = 82 → 8² + 2² = 68 → ... → 1." },
      { input: "n = 2", output: "false" },
    ],
    constraints: ["1 ≤ n ≤ 2³¹ - 1"],
    hints: [
      "Detect the cycle using a set (store seen sums) or Floyd's algorithm.",
      "If the sum becomes 1, return true. If a cycle is detected, return false.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {boolean}\n */\nfunction isHappy(n) {\n  \n};`,
      python: `class Solution:\n    def isHappy(self, n: int) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isHappy(int n) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isHappy(int n) {\n        return false;\n    }\n};`,
    },
  },

  // ── 67. Reverse Bits ──────────────────────────────────────────────────────────
  {
    id: 67,
    title: "Reverse Bits",
    slug: "reverse-bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "58.7%",
    description: `Reverse bits of a given 32 bits unsigned integer.`,
    examples: [
      { input: "n = 00000010100101000001111010011100", output: "964176192 (00111001011110000010100101000000)" },
      { input: "n = 11111111111111111111111111111101", output: "3221225471 (10111111111111111111111111111111)" },
    ],
    constraints: ["The input must be a binary string of length 32."],
    hints: [
      "Process bit by bit from LSB to MSB.",
      "result = (result << 1) | (n & 1); n >>>= 1; repeat 32 times.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number} n - a positive integer\n * @return {number} - a positive integer\n */\nfunction reverseBits(n) {\n  \n};`,
      python: `class Solution:\n    def reverseBits(self, n: int) -> int:\n        pass`,
      java: `public class Solution {\n    public int reverseBits(int n) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    uint32_t reverseBits(uint32_t n) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 68. Sum of Two Integers ───────────────────────────────────────────────────
  {
    id: 68,
    title: "Sum of Two Integers",
    slug: "sum-of-two-integers",
    difficulty: "Medium",
    category: "Bit Manipulation",
    acceptance: "50.6%",
    description: `Given two integers \`a\` and \`b\`, return *the sum of the two integers* **without using** the operators \`+\` and \`-\`.`,
    examples: [
      { input: "a = 1, b = 2", output: "3" },
      { input: "a = 2, b = 3", output: "5" },
    ],
    constraints: ["-1000 ≤ a, b ≤ 1000"],
    hints: [
      "Use XOR to add bits without carry: a ^ b.",
      "Use AND + left shift to compute the carry: (a & b) << 1.",
      "Repeat until carry is 0.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number} a\n * @param {number} b\n * @return {number}\n */\nfunction getSum(a, b) {\n  \n};`,
      python: `class Solution:\n    def getSum(self, a: int, b: int) -> int:\n        pass`,
      java: `class Solution {\n    public int getSum(int a, int b) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int getSum(int a, int b) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 69. Generate Parentheses ──────────────────────────────────────────────────
  {
    id: 69,
    title: "Generate Parentheses",
    slug: "generate-parentheses",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "73.8%",
    description: `Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.`,
    examples: [
      { input: "n = 3", output: `["((()))","(()())","(())()","()(())","()()()"]` },
      { input: "n = 1", output: `["()"]` },
    ],
    constraints: ["1 ≤ n ≤ 8"],
    hints: [
      "Use backtracking: track open and close counts.",
      "Add '(' if open < n; add ')' if close < open.",
      "When both equal n, add the result.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {string[]}\n */\nfunction generateParenthesis(n) {\n  \n};`,
      python: `class Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        pass`,
      java: `class Solution {\n    public java.util.List<String> generateParenthesis(int n) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        return {};\n    }\n};`,
    },
  },

  // ── 70. Daily Temperatures ────────────────────────────────────────────────────
  {
    id: 70,
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    difficulty: "Medium",
    category: "Stack",
    acceptance: "65.3%",
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return *an array* \`answer\` *such that* \`answer[i]\` *is the number of days you have to wait after the* \`i\`*th day to get a warmer temperature*. If there is no future day for which this is possible, keep \`answer[i] == 0\`.`,
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
      { input: "temperatures = [30,60,90]", output: "[1,1,0]" },
    ],
    constraints: ["1 ≤ temperatures.length ≤ 10⁵", "30 ≤ temperatures[i] ≤ 100"],
    hints: [
      "Use a monotonic decreasing stack storing indices.",
      "When current temperature > temperatures[stack top], pop and compute the difference in indices.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} temperatures\n * @return {number[]}\n */\nfunction dailyTemperatures(temperatures) {\n  \n};`,
      python: `class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        pass`,
      java: `class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        return new int[0];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        return {};\n    }\n};`,
    },
  },

  // ── 71. Evaluate Reverse Polish Notation ──────────────────────────────────────
  {
    id: 71,
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    difficulty: "Medium",
    category: "Stack",
    acceptance: "47.3%",
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in **Reverse Polish Notation**.\n\nEvaluate the expression. Return *an integer that represents the value of the expression*.\n\nNote: Division between two integers should truncate toward zero.`,
    examples: [
      { input: `tokens = ["2","1","+","3","*"]`, output: "9", explanation: "((2 + 1) * 3) = 9." },
      { input: `tokens = ["4","13","5","/","+"]`, output: "6", explanation: "(4 + (13 / 5)) = 6." },
      { input: `tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]`, output: "22" },
    ],
    constraints: ["1 ≤ tokens.length ≤ 10⁴", "tokens[i] is +, -, *, /, or an integer in range [-200, 200]."],
    hints: [
      "Use a stack. Push numbers; on an operator, pop two values, apply, and push result.",
      "For division, truncate toward zero: Math.trunc(a / b) in JS, int(a / b) in Python.",
    ],
    starterCode: {
      javascript: `/**\n * @param {string[]} tokens\n * @return {number}\n */\nfunction evalRPN(tokens) {\n  \n};`,
      python: `class Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        pass`,
      java: `class Solution {\n    public int evalRPN(String[] tokens) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 72. Permutations ──────────────────────────────────────────────────────────
  {
    id: 72,
    title: "Permutations",
    slug: "permutations",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "76.4%",
    description: `Given an array \`nums\` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
      { input: "nums = [1]", output: "[[1]]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 6", "-10 ≤ nums[i] ≤ 10", "All integers are unique."],
    hints: [
      "Use backtracking: for each position, try all remaining numbers.",
      "Use a visited set or swap elements to avoid reusing numbers.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nfunction permute(nums) {\n  \n};`,
      python: `class Solution:\n    def permute(self, nums: list[int]) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<Integer>> permute(int[] nums) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        return {};\n    }\n};`,
    },
  },

  // ── 73. Combination Sum II ────────────────────────────────────────────────────
  {
    id: 73,
    title: "Combination Sum II",
    slug: "combination-sum-ii",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "54.2%",
    description: `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.\n\nEach number in \`candidates\` may only be used **once** in the combination. The solution set must not contain duplicate combinations.`,
    examples: [
      { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" },
      { input: "candidates = [2,5,2,1,2], target = 5", output: "[[1,2,2],[5]]" },
    ],
    constraints: ["1 ≤ candidates.length ≤ 100", "1 ≤ candidates[i] ≤ 50", "1 ≤ target ≤ 30"],
    hints: [
      "Sort the candidates array first.",
      "Use backtracking, but skip duplicates at the same level of recursion.",
      "Each element can only be used once — advance the index after picking.",
    ],
    starterCode: {
      javascript: `/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nfunction combinationSum2(candidates, target) {\n  \n};`,
      python: `class Solution:\n    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public java.util.List<java.util.List<Integer>> combinationSum2(int[] candidates, int target) {\n        return new java.util.ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n        return {};\n    }\n};`,
    },
  },

  // ── 74. Word Search ───────────────────────────────────────────────────────────
  {
    id: 74,
    title: "Word Search",
    slug: "word-search",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "40.9%",
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` *if* \`word\` *exists in the grid*.\n\nThe word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). The same letter cell may not be used more than once.`,
    examples: [
      { input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"`, output: "true" },
      { input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"`, output: "true" },
      { input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"`, output: "false" },
    ],
    constraints: ["m == board.length", "n == board[i].length", "1 ≤ m, n ≤ 6", "1 ≤ word.length ≤ 15"],
    hints: [
      "Use DFS/backtracking from each cell that matches word[0].",
      "Mark visited cells temporarily (e.g., replace with '#') to avoid reuse.",
      "Restore the cell value after backtracking.",
    ],
    starterCode: {
      javascript: `/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nfunction exist(board, word) {\n  \n};`,
      python: `class Solution:\n    def exist(self, board: list[list[str]], word: str) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        return false;\n    }\n};`,
    },
  },

  // ── 75. Binary Tree Maximum Path Sum ─────────────────────────────────────────
  {
    id: 75,
    title: "Binary Tree Maximum Path Sum",
    slug: "binary-tree-maximum-path-sum",
    difficulty: "Hard",
    category: "Trees",
    acceptance: "39.5%",
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. The path does not need to pass through the root.\n\nThe **path sum** is the sum of the node's values in the path.\n\nGiven the \`root\` of a binary tree, return *the maximum path sum of any non-empty path*.`,
    examples: [
      { input: "root = [1,2,3]", output: "6", explanation: "Path: 2 → 1 → 3 = 6." },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "Path: 15 → 20 → 7 = 42." },
    ],
    constraints: ["The number of nodes is in range [1, 3 × 10⁴].", "-1000 ≤ Node.val ≤ 1000"],
    hints: [
      "At each node, compute the max contribution from left and right subtrees (ignore negatives).",
      "The path through this node = node.val + maxLeft + maxRight. Update the global max.",
      "Return node.val + max(maxLeft, maxRight) to the parent (only one side of the path).",
    ],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction maxPathSum(root) {\n  \n};`,
      python: `class Solution:\n    def maxPathSum(self, root) -> int:\n        pass`,
      java: `class Solution {\n    public int maxPathSum(TreeNode root) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxPathSum(TreeNode* root) {\n        return 0;\n    }\n};`,
    },
  },

];

// ── Playlist definitions ──────────────────────────────────────────────────────
const PLAYLISTS = [
  { slug: "blind-75",    name: "Blind 75",           icon: "🎯", tag: "Must Do",      order: 1, description: "The 75 most important coding interview problems curated by the tech community. Master these and you can crack any FAANG interview." },
  { slug: "top-75",      name: "Top 75",             icon: "⭐", tag: "Complete Set", order: 2, description: "Complete collection of 75 carefully selected problems covering every essential algorithmic pattern needed for top-tier interviews." },
  { slug: "arrays",      name: "Arrays",             icon: "📊", tag: "Topic",        order: 3, description: "Master array manipulation, searching, and traversal techniques essential for any coding interview." },
  { slug: "stack",       name: "Stack",              icon: "📚", tag: "Topic",        order: 4, description: "Learn monotonic stacks, bracket matching, and stack-based problem-solving patterns." },
  { slug: "linked-list", name: "Linked List",        icon: "🔗", tag: "Topic",        order: 5, description: "Traverse, reverse, and manipulate linked list structures with two-pointer and recursion techniques." },
  { slug: "trees",       name: "Trees",              icon: "🌲", tag: "Topic",        order: 6, description: "Binary trees, BSTs, DFS, BFS, and advanced tree traversal algorithms." },
  { slug: "dp",          name: "Dynamic Programming",icon: "💡", tag: "Topic",        order: 7, description: "Break hard problems into subproblems and build optimal solutions bottom-up or top-down." },
  { slug: "graphs",      name: "Graphs",             icon: "🗺️", tag: "Topic",        order: 8, description: "BFS, DFS, topological sort, and graph traversal techniques for complex connectivity problems." },
  { slug: "binary-search", name: "Binary Search",   icon: "🔍", tag: "Topic",        order: 9, description: "Efficient O(log n) searching in sorted arrays, matrices, and answer spaces." },
  { slug: "sliding-window", name: "Sliding Window", icon: "🪟", tag: "Topic",        order: 10, description: "Solve substring and subarray problems in linear time using the sliding window technique." },
  { slug: "two-pointers", name: "Two Pointers",     icon: "👆", tag: "Topic",        order: 11, description: "Use two pointers to solve array and string problems in O(n) time." },
  { slug: "backtracking", name: "Backtracking",     icon: "🔄", tag: "Topic",        order: 12, description: "Explore all possibilities through systematic trial and error to find all valid solutions." },
  { slug: "heap",        name: "Heap / Priority Queue", icon: "⛰️", tag: "Topic",    order: 13, description: "Efficiently find min/max elements and solve top-K and scheduling problems." },
  { slug: "intervals",   name: "Intervals",         icon: "📅", tag: "Topic",        order: 14, description: "Merge, insert, and schedule interval problems using sorting and greedy techniques." },
  { slug: "bit-manipulation", name: "Bit Manipulation", icon: "⚡", tag: "Topic",   order: 15, description: "Solve problems using XOR, AND, OR, and bitwise shift operations." },
  { slug: "greedy",      name: "Greedy",            icon: "🏆", tag: "Topic",        order: 16, description: "Make locally optimal choices at each step to achieve a globally optimal solution." },
  { slug: "math",        name: "Math",              icon: "🔢", tag: "Topic",        order: 17, description: "Number theory, modular arithmetic, and mathematical problem solving patterns." },
  { slug: "easy",        name: "Easy",              icon: "🟢", tag: "Difficulty",   order: 18, description: "Build your foundations with beginner-friendly problems across all topics." },
  { slug: "medium",      name: "Medium",            icon: "🟡", tag: "Difficulty",   order: 19, description: "Sharpen your skills with intermediate problems that require creative thinking." },
  { slug: "hard",        name: "Hard",              icon: "🔴", tag: "Difficulty",   order: 20, description: "Challenge yourself with the hardest algorithmic problems asked in top interviews." },
];

// Blind 75 — classic curated list mapped to our problem IDs
const BLIND75_IDS = [
  1,4,6,7,8,11,12,13,14,16,17,18,19,20,21,22,24,26,27,28,29,
  31,32,33,34,36,37,38,39,41,42,43,45,46,47,48,49,51,52,55,56,
  57,58,59,60,61,62,63,64,65,67,68,69,74,75,
];

// ── Main seeding function ─────────────────────────────────────────────────────
async function main() {
  const baseProblems = fileProblems.filter((p) => !SKIP_IDS.has(p.id));
  const allProblems  = [...baseProblems, ...newProblems];

  console.log(`\nSeeding ${allProblems.length} problems...\n`);
  for (const p of allProblems) {
    await prisma.intelProblem.upsert({
      where: { id: p.id },
      create: {
        id: p.id, title: p.title, slug: p.slug,
        difficulty: p.difficulty, category: p.category, acceptance: p.acceptance,
        description: p.description,
        examples: p.examples as object,
        constraints: p.constraints as object,
        hints: p.hints as object,
        starterCode: p.starterCode as object,
      },
      update: {
        title: p.title, slug: p.slug,
        difficulty: p.difficulty, category: p.category, acceptance: p.acceptance,
        description: p.description,
        examples: p.examples as object,
        constraints: p.constraints as object,
        hints: p.hints as object,
        starterCode: p.starterCode as object,
      },
    });
    console.log(`  ✓ ${String(p.id).padStart(2, "0")}. ${p.title}`);
  }

  // ── Playlists ───────────────────────────────────────────────────────────────
  console.log("\nCreating playlists...\n");
  for (const pl of PLAYLISTS) {
    await prisma.intelPlaylist.upsert({
      where: { slug: pl.slug },
      create: pl,
      update: pl,
    });
    console.log(`  ✓ ${pl.name}`);
  }

  // ── Link problems to playlists ──────────────────────────────────────────────
  console.log("\nLinking problems to playlists...\n");

  async function linkProblems(slug: string, ids: number[]) {
    const pl = await prisma.intelPlaylist.findUnique({ where: { slug } });
    if (!pl) return;
    for (let i = 0; i < ids.length; i++) {
      await prisma.intelPlaylistItem.upsert({
        where: { playlistId_problemId: { playlistId: pl.id, problemId: ids[i] } },
        create: { playlistId: pl.id, problemId: ids[i], order: i + 1 },
        update: { order: i + 1 },
      });
    }
    console.log(`  ✓ ${slug} — ${ids.length} problems`);
  }

  const meta = allProblems.map((p) => ({ id: p.id, cat: p.category, diff: p.difficulty }));
  const allIds = meta.map((p) => p.id).sort((a, b) => a - b);

  await linkProblems("blind-75",        BLIND75_IDS);
  await linkProblems("top-75",          allIds);
  await linkProblems("arrays",          meta.filter(p => p.cat === "Arrays").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("stack",           meta.filter(p => p.cat === "Stack").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("linked-list",     meta.filter(p => p.cat === "Linked List").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("trees",           meta.filter(p => p.cat === "Trees").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("dp",              meta.filter(p => p.cat === "Dynamic Programming").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("graphs",          meta.filter(p => p.cat === "Graphs").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("binary-search",   meta.filter(p => p.cat === "Binary Search").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("sliding-window",  meta.filter(p => p.cat === "Sliding Window").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("two-pointers",    meta.filter(p => p.cat === "Two Pointers").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("backtracking",    meta.filter(p => p.cat === "Backtracking").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("heap",            meta.filter(p => p.cat === "Heap").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("intervals",       meta.filter(p => p.cat === "Intervals").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("bit-manipulation",meta.filter(p => p.cat === "Bit Manipulation").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("greedy",          meta.filter(p => p.cat === "Greedy").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("math",            meta.filter(p => p.cat === "Math").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("easy",            meta.filter(p => p.diff === "Easy").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("medium",          meta.filter(p => p.diff === "Medium").map(p => p.id).sort((a,b)=>a-b));
  await linkProblems("hard",            meta.filter(p => p.diff === "Hard").map(p => p.id).sort((a,b)=>a-b));

  console.log("\n✅ Seed complete!");
  const total = await prisma.intelProblem.count();
  const pls   = await prisma.intelPlaylist.count();
  const items = await prisma.intelPlaylistItem.count();
  console.log(`   Problems: ${total} | Playlists: ${pls} | Playlist items: ${items}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });

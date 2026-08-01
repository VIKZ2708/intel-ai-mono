import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ── 22 new problems (IDs 76-97) ──────────────────────────────────────────────
const newProblems = [

  // ── 76. Unique Paths ─────────────────────────────────────────────────────────
  {
    id: 76, title: "Unique Paths", slug: "unique-paths",
    difficulty: "Medium", category: "Dynamic Programming", acceptance: "63.7%",
    description: `A robot is on an \`m x n\` grid and starts at the top-left corner. It can only move **right** or **down**. How many unique paths are there to reach the bottom-right corner?`,
    examples: [
      { input: "m = 3, n = 7", output: "28" },
      { input: "m = 3, n = 2", output: "3", explanation: "Right→Down→Down, Down→Down→Right, Down→Right→Down." },
    ],
    constraints: ["1 ≤ m, n ≤ 100"],
    hints: [
      "dp[i][j] = number of ways to reach cell (i,j).",
      "dp[i][j] = dp[i-1][j] + dp[i][j-1]. First row and column are all 1s.",
      "You can reduce space to O(n) by using a 1D DP array.",
    ],
    starterCode: {
      javascript: `function uniquePaths(m, n) {\n  \n}`,
      python: `class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        pass`,
      java: `class Solution {\n    public int uniquePaths(int m, int n) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 77. Minimum Path Sum ──────────────────────────────────────────────────────
  {
    id: 77, title: "Minimum Path Sum", slug: "minimum-path-sum",
    difficulty: "Medium", category: "Dynamic Programming", acceptance: "61.2%",
    description: `Given an \`m x n\` grid filled with non-negative numbers, find a path from the top-left to the bottom-right which **minimizes the sum** of all numbers along the path.\n\nYou can only move **right** or **down** at each step.`,
    examples: [
      { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "7", explanation: "Path 1→3→1→1→1 has sum 7." },
      { input: "grid = [[1,2,3],[4,5,6]]", output: "12" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 200", "0 ≤ grid[i][j] ≤ 200"],
    hints: [
      "dp[i][j] = minimum cost to reach (i,j).",
      "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).",
      "Initialize the first row and first column separately (only one direction to come from).",
    ],
    starterCode: {
      javascript: `function minPathSum(grid) {\n  \n}`,
      python: `class Solution:\n    def minPathSum(self, grid: list[list[int]]) -> int:\n        pass`,
      java: `class Solution {\n    public int minPathSum(int[][] grid) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 78. Clone Graph ───────────────────────────────────────────────────────────
  {
    id: 78, title: "Clone Graph", slug: "clone-graph",
    difficulty: "Medium", category: "Graphs", acceptance: "57.4%",
    description: `Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph.\n\nEach node contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.`,
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
      { input: "adjList = [[]]", output: "[[]]" },
    ],
    constraints: ["1 ≤ Number of nodes ≤ 100", "1 ≤ Node.val ≤ 100", "Node.val is unique for each node.", "No repeated edges, no self-loops."],
    hints: [
      "Use a hash map to map original nodes to their clones.",
      "BFS or DFS: when you visit a neighbor, check if it's already cloned.",
      "The hash map both tracks visited nodes and stores the clones.",
    ],
    starterCode: {
      javascript: `function cloneGraph(node) {\n  \n}`,
      python: `class Solution:\n    def cloneGraph(self, node):\n        pass`,
      java: `class Solution {\n    public Node cloneGraph(Node node) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 79. Merge K Sorted Lists ──────────────────────────────────────────────────
  {
    id: 79, title: "Merge K Sorted Lists", slug: "merge-k-sorted-lists",
    difficulty: "Hard", category: "Linked List", acceptance: "52.4%",
    description: `You are given an array of \`k\` linked lists, each sorted in ascending order.\n\nMerge all the linked lists into one sorted linked list and return it.`,
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
    ],
    constraints: ["k == lists.length", "0 ≤ k ≤ 10⁴", "0 ≤ lists[i].length ≤ 500", "-10⁴ ≤ lists[i][j] ≤ 10⁴"],
    hints: [
      "The brute force is to collect all values, sort, and rebuild — O(N log N).",
      "Optimal: use a min-heap of size k. Always extract the minimum node and push the next node from that list.",
      "Alternatively, divide and conquer: merge pairs of lists, then merge the results — O(N log k).",
    ],
    starterCode: {
      javascript: `function mergeKLists(lists) {\n  \n}`,
      python: `class Solution:\n    def mergeKLists(self, lists: list) -> list:\n        pass`,
      java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 80. Word Ladder ───────────────────────────────────────────────────────────
  {
    id: 80, title: "Word Ladder", slug: "word-ladder",
    difficulty: "Hard", category: "Graphs", acceptance: "38.1%",
    description: `A **transformation sequence** from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence \`beginWord → s₁ → s₂ → ... → endWord\` such that:\n- Every adjacent pair differs by exactly one letter.\n- Every \`sᵢ\` is in \`wordList\`.\n\nReturn the **number of words** in the shortest transformation sequence, or 0 if no such sequence exists.`,
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5", explanation: "hit → hot → dot → dog → cog" },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: "0" },
    ],
    constraints: ["1 ≤ beginWord.length ≤ 10", "endWord.length == beginWord.length", "1 ≤ wordList.length ≤ 5000"],
    hints: [
      "Model as an unweighted graph: each word is a node, connect words that differ by one letter.",
      "BFS from beginWord gives the shortest path.",
      "To generate neighbors efficiently, replace each character with a-z and check against the word set.",
    ],
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {\n  \n}`,
      python: `class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        pass`,
      java: `class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 81. Delete Node in a BST ─────────────────────────────────────────────────
  {
    id: 81, title: "Delete Node in a BST", slug: "delete-node-in-a-bst",
    difficulty: "Medium", category: "Trees", acceptance: "51.7%",
    description: `Given a root node of a **Binary Search Tree** and a key, delete the node with the given key in the BST. Return the **root node** of the modified BST.\n\nThe deletion can be divided into two stages:\n1. Search for the node to delete.\n2. If found, delete the node with the following cases:\n   - **Node has no children**: simply remove it.\n   - **Node has one child**: replace it with its child.\n   - **Node has two children**: find its **in-order successor** (smallest in right subtree), replace node's value with it, then delete the successor.`,
    examples: [
      { input: "root = [5,3,6,2,4,null,7], key = 3", output: "[5,4,6,2,null,null,7]", explanation: "Node 3 is replaced by its in-order successor 4." },
      { input: "root = [5,3,6,2,4,null,7], key = 0", output: "[5,3,6,2,4,null,7]", explanation: "Key 0 not found." },
    ],
    constraints: ["0 ≤ number of nodes ≤ 10⁴", "-10⁵ ≤ Node.val ≤ 10⁵", "Each node value is unique.", "-10⁵ ≤ key ≤ 10⁵"],
    hints: [
      "Recurse: if key < root.val go left, if key > root.val go right.",
      "If key == root.val, handle the three deletion cases.",
      "For two children: find the minimum value in the right subtree (leftmost node), replace root.val with it, then delete that minimum node from the right subtree.",
    ],
    starterCode: {
      javascript: `function deleteNode(root, key) {\n  \n}`,
      python: `class Solution:\n    def deleteNode(self, root, key: int):\n        pass`,
      java: `class Solution {\n    public TreeNode deleteNode(TreeNode root, int key) {\n        return root;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* deleteNode(TreeNode* root, int key) {\n        return root;\n    }\n};`,
    },
  },

  // ── 82. Flatten Binary Tree to Linked List ────────────────────────────────────
  {
    id: 82, title: "Flatten Binary Tree to Linked List", slug: "flatten-binary-tree-to-linked-list",
    difficulty: "Medium", category: "Trees", acceptance: "64.9%",
    description: `Given the \`root\` of a binary tree, flatten the tree into a **linked list in-place**.\n\nThe linked list should use the same \`TreeNode\` class where the \`right\` child pointer points to the next node in the list and the \`left\` child pointer is always \`null\`.\n\nThe linked list should be in the same order as a **pre-order traversal** of the binary tree.`,
    examples: [
      { input: "root = [1,2,5,3,4,null,6]", output: "[1,null,2,null,3,null,4,null,5,null,6]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 2000", "-100 ≤ Node.val ≤ 100"],
    hints: [
      "Pre-order traversal: root → left subtree → right subtree.",
      "For each node: find the rightmost node of the left subtree, connect it to root.right, then move left subtree to right.",
      "A Morris traversal-like approach can do this in O(1) extra space.",
    ],
    starterCode: {
      javascript: `function flatten(root) {\n  \n}`,
      python: `class Solution:\n    def flatten(self, root) -> None:\n        pass`,
      java: `class Solution {\n    public void flatten(TreeNode root) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void flatten(TreeNode* root) {\n        \n    }\n};`,
    },
  },

  // ── 83. Diameter of Binary Tree ───────────────────────────────────────────────
  {
    id: 83, title: "Diameter of Binary Tree", slug: "diameter-of-binary-tree",
    difficulty: "Easy", category: "Trees", acceptance: "58.2%",
    description: `Given the \`root\` of a binary tree, return the length of the **diameter** of the tree.\n\nThe **diameter** is the length of the longest path between any two nodes. This path may or may not pass through the \`root\`.\n\nThe length of a path is the **number of edges** between nodes.`,
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3", explanation: "The path [4,2,1,3] or [5,2,1,3] has length 3." },
      { input: "root = [1,2]", output: "1" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10⁴", "-100 ≤ Node.val ≤ 100"],
    hints: [
      "The diameter through a node = left height + right height.",
      "Use a DFS that returns the height of each subtree.",
      "Track the global maximum diameter as a variable updated during DFS.",
    ],
    starterCode: {
      javascript: `function diameterOfBinaryTree(root) {\n  \n}`,
      python: `class Solution:\n    def diameterOfBinaryTree(self, root) -> int:\n        pass`,
      java: `class Solution {\n    public int diameterOfBinaryTree(TreeNode root) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 84. Construct Binary Tree from Preorder and Inorder Traversal ─────────────
  {
    id: 84, title: "Construct Binary Tree from Preorder and Inorder Traversal",
    slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
    difficulty: "Medium", category: "Trees", acceptance: "60.7%",
    description: `Given two integer arrays \`preorder\` and \`inorder\` where:\n- \`preorder\` is the preorder traversal of a binary tree,\n- \`inorder\` is the inorder traversal of the same tree,\n\nconstruct and return the binary tree.`,
    examples: [
      { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" },
      { input: "preorder = [-1], inorder = [-1]", output: "[-1]" },
    ],
    constraints: ["1 ≤ preorder.length ≤ 3000", "inorder.length == preorder.length", "-3000 ≤ preorder[i], inorder[i] ≤ 3000", "All values are unique."],
    hints: [
      "The first element of preorder is always the root.",
      "Find the root's position in inorder — elements to the left are the left subtree, to the right are the right subtree.",
      "Use a hash map for O(1) inorder index lookup, then recurse with index bounds.",
    ],
    starterCode: {
      javascript: `function buildTree(preorder, inorder) {\n  \n}`,
      python: `class Solution:\n    def buildTree(self, preorder: list[int], inorder: list[int]):\n        pass`,
      java: `class Solution {\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 85. Path Sum II ───────────────────────────────────────────────────────────
  {
    id: 85, title: "Path Sum II", slug: "path-sum-ii",
    difficulty: "Medium", category: "Trees", acceptance: "59.3%",
    description: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return all **root-to-leaf paths** where the sum of node values equals \`targetSum\`. Each path should be returned as a list of node values.`,
    examples: [
      { input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22", output: "[[5,4,11,2],[5,8,4,5]]" },
      { input: "root = [1,2,3], targetSum = 5", output: "[]" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 5000", "-1000 ≤ Node.val ≤ 1000", "-1000 ≤ targetSum ≤ 1000"],
    hints: [
      "DFS with backtracking: add each node to the current path.",
      "At a leaf, check if the remaining sum equals the leaf value.",
      "Remove the node from the path when backtracking (pop after recursive calls).",
    ],
    starterCode: {
      javascript: `function pathSum(root, targetSum) {\n  \n}`,
      python: `class Solution:\n    def pathSum(self, root, targetSum: int) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n        return new ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {\n        return {};\n    }\n};`,
    },
  },

  // ── 86. LRU Cache ─────────────────────────────────────────────────────────────
  {
    id: 86, title: "LRU Cache", slug: "lru-cache",
    difficulty: "Medium", category: "Design", acceptance: "42.7%",
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the \`LRUCache\` class:\n- \`LRUCache(int capacity)\` — Initialize the cache with a positive size \`capacity\`.\n- \`int get(int key)\` — Return the value if the key exists, otherwise return \`-1\`.\n- \`void put(int key, int value)\` — Update or insert the key-value pair. When cache reaches capacity, evict the **least recently used** key.\n\nBoth operations must run in **O(1)** average time complexity.`,
    examples: [
      { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: "[null,null,null,1,null,-1,null,-1,3,4]" },
    ],
    constraints: ["1 ≤ capacity ≤ 3000", "0 ≤ key ≤ 10⁴", "0 ≤ value ≤ 10⁵", "At most 2 × 10⁵ calls to get and put."],
    hints: [
      "Use a doubly linked list to track usage order and a hash map for O(1) key lookup.",
      "Head of list = most recently used. Tail = least recently used.",
      "On get/put: move the accessed node to the head. On eviction: remove the tail node.",
    ],
    starterCode: {
      javascript: `class LRUCache {\n    constructor(capacity) {\n        \n    }\n    get(key) {\n        \n    }\n    put(key, value) {\n        \n    }\n}`,
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass`,
      java: `class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    public int get(int key) {\n        return -1;\n    }\n    public void put(int key, int value) {\n        \n    }\n}`,
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    int get(int key) {\n        return -1;\n    }\n    void put(int key, int value) {\n        \n    }\n};`,
    },
  },

  // ── 87. Letter Combinations of a Phone Number ────────────────────────────────
  {
    id: 87, title: "Letter Combinations of a Phone Number",
    slug: "letter-combinations-of-a-phone-number",
    difficulty: "Medium", category: "Backtracking", acceptance: "57.4%",
    description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.\n\nA mapping of digits to letters (like on a telephone keypad):\n\`2:abc, 3:def, 4:ghi, 5:jkl, 6:mno, 7:pqrs, 8:tuv, 9:wxyz\``,
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
      { input: 'digits = ""', output: "[]" },
      { input: 'digits = "2"', output: '["a","b","c"]' },
    ],
    constraints: ["0 ≤ digits.length ≤ 4", "digits[i] is a digit in the range ['2', '9']."],
    hints: [
      "Map each digit to its letters. Use backtracking to build combinations.",
      "At each recursion level, pick one letter for the current digit and recurse on the next digit.",
      "Base case: if current combination length equals digits length, add to results.",
    ],
    starterCode: {
      javascript: `function letterCombinations(digits) {\n  \n}`,
      python: `class Solution:\n    def letterCombinations(self, digits: str) -> list[str]:\n        pass`,
      java: `class Solution {\n    public List<String> letterCombinations(String digits) {\n        return new ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        return {};\n    }\n};`,
    },
  },

  // ── 88. Find All Anagrams in a String ────────────────────────────────────────
  {
    id: 88, title: "Find All Anagrams in a String", slug: "find-all-anagrams-in-a-string",
    difficulty: "Medium", category: "Sliding Window", acceptance: "50.1%",
    description: `Given two strings \`s\` and \`p\`, return an array of all the **start indices** of \`p\`'s anagrams in \`s\`. You may return the answer in any order.\n\nAn **anagram** is a word formed by rearranging the letters of another word using all the original letters exactly once.`,
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: "[0,6]", explanation: "s[0..2]='cba' and s[6..8]='bac' are anagrams of 'abc'." },
      { input: 's = "abab", p = "ab"', output: "[0,1,2]" },
    ],
    constraints: ["1 ≤ s.length, p.length ≤ 3 × 10⁴", "s and p consist of lowercase English letters."],
    hints: [
      "Use a fixed-size sliding window of length p.length.",
      "Maintain character frequency counts for the window and for p.",
      "Slide the window: add the right character, remove the leftmost. Compare counts — if equal, record the index.",
    ],
    starterCode: {
      javascript: `function findAnagrams(s, p) {\n  \n}`,
      python: `class Solution:\n    def findAnagrams(self, s: str, p: str) -> list[int]:\n        pass`,
      java: `class Solution {\n    public List<Integer> findAnagrams(String s, String p) {\n        return new ArrayList<>();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        return {};\n    }\n};`,
    },
  },

  // ── 89. Longest Common Subsequence ───────────────────────────────────────────
  {
    id: 89, title: "Longest Common Subsequence", slug: "longest-common-subsequence",
    difficulty: "Medium", category: "Dynamic Programming", acceptance: "57.0%",
    description: `Given two strings \`text1\` and \`text2\`, return the length of their **longest common subsequence**. If no common subsequence exists, return \`0\`.\n\nA **subsequence** is a sequence derived by deleting some (or no) characters without changing order.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: "LCS is 'ace', length 3." },
      { input: 'text1 = "abc", text2 = "abc"', output: "3" },
      { input: 'text1 = "abc", text2 = "def"', output: "0" },
    ],
    constraints: ["1 ≤ text1.length, text2.length ≤ 1000", "text1 and text2 consist only of lowercase English letters."],
    hints: [
      "dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1].",
      "If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1.",
      "Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
    ],
    starterCode: {
      javascript: `function longestCommonSubsequence(text1, text2) {\n  \n}`,
      python: `class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        pass`,
      java: `class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 90. Edit Distance ─────────────────────────────────────────────────────────
  {
    id: 90, title: "Edit Distance", slug: "edit-distance",
    difficulty: "Hard", category: "Dynamic Programming", acceptance: "55.8%",
    description: `Given two strings \`word1\` and \`word2\`, return the **minimum number of operations** required to convert \`word1\` to \`word2\`.\n\nAllowed operations: **Insert** a character, **Delete** a character, **Replace** a character.`,
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: "3", explanation: "horse→rorse (replace h→r) →rose (remove r) →ros (remove e)" },
      { input: 'word1 = "intention", word2 = "execution"', output: "5" },
    ],
    constraints: ["0 ≤ word1.length, word2.length ≤ 500", "word1 and word2 consist of lowercase English letters."],
    hints: [
      "dp[i][j] = edit distance between word1[0..i-1] and word2[0..j-1].",
      "If word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1].",
      "Else: dp[i][j] = 1 + min(dp[i-1][j-1] (replace), dp[i-1][j] (delete), dp[i][j-1] (insert)).",
    ],
    starterCode: {
      javascript: `function minDistance(word1, word2) {\n  \n}`,
      python: `class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        pass`,
      java: `class Solution {\n    public int minDistance(String word1, String word2) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        return 0;\n    }\n};`,
    },
  },

  // ── 91. Palindrome Linked List ───────────────────────────────────────────────
  {
    id: 91, title: "Palindrome Linked List", slug: "palindrome-linked-list",
    difficulty: "Easy", category: "Linked List", acceptance: "51.9%",
    description: `Given the \`head\` of a singly linked list, return \`true\` if it is a **palindrome** or \`false\` otherwise.`,
    examples: [
      { input: "head = [1,2,2,1]", output: "true" },
      { input: "head = [1,2]", output: "false" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10⁵", "0 ≤ Node.val ≤ 9"],
    hints: [
      "Copy values to an array and use two pointers to check palindrome — O(n) time, O(n) space.",
      "Optimal: find the midpoint with slow/fast pointers, reverse the second half, compare.",
      "After checking, reverse the second half back to restore the list (optional but clean).",
    ],
    starterCode: {
      javascript: `function isPalindrome(head) {\n  \n}`,
      python: `class Solution:\n    def isPalindrome(self, head) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isPalindrome(ListNode head) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        return false;\n    }\n};`,
    },
  },

  // ── 92. K Closest Points to Origin ───────────────────────────────────────────
  {
    id: 92, title: "K Closest Points to Origin", slug: "k-closest-points-to-origin",
    difficulty: "Medium", category: "Heap", acceptance: "65.4%",
    description: `Given an array of \`points\` where \`points[i] = [xᵢ, yᵢ]\` represents a point on the X-Y plane, and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.\n\nThe distance is the Euclidean distance: √(x² + y²). You may return the answer in any order.`,
    examples: [
      { input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]", explanation: "Distance of [1,3] is √10, distance of [-2,2] is √8." },
      { input: "points = [[3,3],[5,-1],[-2,4]], k = 2", output: "[[3,3],[-2,4]]" },
    ],
    constraints: ["1 ≤ k ≤ points.length ≤ 10⁴", "-10⁴ < xᵢ, yᵢ < 10⁴"],
    hints: [
      "Compute squared distance (no need for sqrt): x² + y².",
      "Sort by distance and take the first k — O(n log n).",
      "Optimal: use a max-heap of size k. If heap size exceeds k, remove the farthest point — O(n log k).",
    ],
    starterCode: {
      javascript: `function kClosest(points, k) {\n  \n}`,
      python: `class Solution:\n    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:\n        pass`,
      java: `class Solution {\n    public int[][] kClosest(int[][] points, int k) {\n        return new int[][]{};\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n        return {};\n    }\n};`,
    },
  },

  // ── 93. Partition Equal Subset Sum ───────────────────────────────────────────
  {
    id: 93, title: "Partition Equal Subset Sum", slug: "partition-equal-subset-sum",
    difficulty: "Medium", category: "Dynamic Programming", acceptance: "46.7%",
    description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the **sum of elements in both subsets is equal**, or \`false\` otherwise.`,
    examples: [
      { input: "nums = [1,5,11,5]", output: "true", explanation: "[1,5,5] and [11]" },
      { input: "nums = [1,2,3,5]", output: "false" },
    ],
    constraints: ["1 ≤ nums.length ≤ 200", "1 ≤ nums[i] ≤ 100"],
    hints: [
      "If total sum is odd, answer is always false.",
      "Target = total / 2. Find if any subset sums to target — classic 0/1 knapsack.",
      "dp[j] = true if subset summing to j is achievable. Iterate nums in reverse to avoid using an element twice.",
    ],
    starterCode: {
      javascript: `function canPartition(nums) {\n  \n}`,
      python: `class Solution:\n    def canPartition(self, nums: list[int]) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean canPartition(int[] nums) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        return false;\n    }\n};`,
    },
  },

  // ── 94. Copy List with Random Pointer ────────────────────────────────────────
  {
    id: 94, title: "Copy List with Random Pointer", slug: "copy-list-with-random-pointer",
    difficulty: "Medium", category: "Linked List", acceptance: "55.3%",
    description: `A linked list of length \`n\` is given such that each node contains an additional **random pointer**, which could point to any node in the list, or \`null\`.\n\nConstruct a **deep copy** of the list. The deep copy should consist of exactly \`n\` brand new nodes, where each new node has its value and both \`next\` and \`random\` pointers set correctly.`,
    examples: [
      { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" },
    ],
    constraints: ["0 ≤ n ≤ 1000", "-10⁴ ≤ Node.val ≤ 10⁴", "Node.random is null or points to some node in the list."],
    hints: [
      "Use a hash map: original node → cloned node. Two passes — first clone all nodes, second set next/random.",
      "O(1) space trick: interleave cloned nodes between originals (A→A'→B→B'→...), then set random pointers, then separate the two lists.",
    ],
    starterCode: {
      javascript: `function copyRandomList(head) {\n  \n}`,
      python: `class Solution:\n    def copyRandomList(self, head):\n        pass`,
      java: `class Solution {\n    public Node copyRandomList(Node head) {\n        return null;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    Node* copyRandomList(Node* head) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 95. Serialize and Deserialize Binary Tree ─────────────────────────────────
  {
    id: 95, title: "Serialize and Deserialize Binary Tree",
    slug: "serialize-and-deserialize-binary-tree",
    difficulty: "Hard", category: "Trees", acceptance: "56.7%",
    description: `Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.`,
    examples: [
      { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 10⁴", "-1000 ≤ Node.val ≤ 1000"],
    hints: [
      "BFS (level-order) serialization: use a queue, output 'null' for missing children.",
      "DFS (preorder) serialization: serialize root, then left, then right. Use 'null' for null nodes.",
      "Deserialization mirrors serialization: split by delimiter and rebuild the tree in the same order.",
    ],
    starterCode: {
      javascript: `function serialize(root) {\n  \n}\nfunction deserialize(data) {\n  \n}`,
      python: `class Codec:\n    def serialize(self, root) -> str:\n        pass\n    def deserialize(self, data: str):\n        pass`,
      java: `public class Codec {\n    public String serialize(TreeNode root) {\n        return "";\n    }\n    public TreeNode deserialize(String data) {\n        return null;\n    }\n}`,
      cpp: `class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        return "";\n    }\n    TreeNode* deserialize(string data) {\n        return nullptr;\n    }\n};`,
    },
  },

  // ── 96. Next Permutation ─────────────────────────────────────────────────────
  {
    id: 96, title: "Next Permutation", slug: "next-permutation",
    difficulty: "Medium", category: "Arrays", acceptance: "38.5%",
    description: `A **permutation** of an array is an arrangement of its members into a sequence.\n\nThe **next permutation** of an array is the next lexicographically greater permutation. If no such permutation exists (array is in descending order), rearrange to the **lowest possible order** (ascending).\n\nThe replacement must be done **in place** with only constant extra memory.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[1,3,2]" },
      { input: "nums = [3,2,1]", output: "[1,2,3]" },
      { input: "nums = [1,1,5]", output: "[1,5,1]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 100"],
    hints: [
      "Find the first index i from the right where nums[i] < nums[i+1] — this is the 'pivot'.",
      "Find the smallest number to the right of pivot that is greater than nums[pivot]. Swap them.",
      "Reverse the suffix starting at pivot+1 to get the next smallest permutation.",
    ],
    starterCode: {
      javascript: `function nextPermutation(nums) {\n  \n}`,
      python: `class Solution:\n    def nextPermutation(self, nums: list[int]) -> None:\n        pass`,
      java: `class Solution {\n    public void nextPermutation(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        \n    }\n};`,
    },
  },

  // ── 97. First Missing Positive ────────────────────────────────────────────────
  {
    id: 97, title: "First Missing Positive", slug: "first-missing-positive",
    difficulty: "Hard", category: "Arrays", acceptance: "37.9%",
    description: `Given an unsorted integer array \`nums\`, return the **smallest positive integer** that is **not present** in \`nums\`.\n\nYou must implement an algorithm that runs in **O(n) time** and uses **O(1) auxiliary space**.`,
    examples: [
      { input: "nums = [1,2,0]", output: "3" },
      { input: "nums = [3,4,-1,1]", output: "2" },
      { input: "nums = [7,8,9,11,12]", output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-2³¹ ≤ nums[i] ≤ 2³¹ - 1"],
    hints: [
      "The answer is always in [1, n+1] — use this to reduce the search space.",
      "Index as a hash: place each number x in position x-1 (if 1 ≤ x ≤ n).",
      "After rearranging, scan: the first index where nums[i] ≠ i+1 gives the answer.",
    ],
    starterCode: {
      javascript: `function firstMissingPositive(nums) {\n  \n}`,
      python: `class Solution:\n    def firstMissingPositive(self, nums: list[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int firstMissingPositive(int[] nums) {\n        return 1;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        return 1;\n    }\n};`,
    },
  },
];

// ── Company playlist mappings ─────────────────────────────────────────────────
const GOOGLE_IDS = [
  1, 7, 8, 9, 11, 12, 17, 18, 25, 29, 47, 49, 57, 59, 64, 65, 69, 74,
  76, 77, 78, 80, 81, 83, 84, 86, 87, 88, 89, 90, 92, 95, 96, 97,
];
const AMAZON_IDS = [
  1, 6, 7, 8, 9, 19, 21, 25, 29, 49, 50, 57, 61, 62, 64, 65,
  76, 77, 78, 79, 80, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 96,
];
const MICROSOFT_IDS = [
  1, 2, 14, 15, 16, 17, 20, 26, 33, 41, 42, 45, 60,
  76, 78, 82, 83, 84, 86, 87, 89, 91, 93, 94, 95,
];

async function main() {
  console.log("⏳ Seeding new problems (76–97)...");

  for (const p of newProblems) {
    await prisma.intelProblem.upsert({
      where: { id: p.id },
      update: {
        title: p.title, slug: p.slug, difficulty: p.difficulty,
        category: p.category, acceptance: p.acceptance,
        description: p.description,
        examples:    p.examples,
        constraints: p.constraints,
        hints:       p.hints,
        starterCode: p.starterCode,
      },
      create: {
        id: p.id, title: p.title, slug: p.slug, difficulty: p.difficulty,
        category: p.category, acceptance: p.acceptance,
        description: p.description,
        examples:    p.examples,
        constraints: p.constraints,
        hints:       p.hints,
        starterCode: p.starterCode,
      },
    });
    console.log(`  ✓ ${p.id}. ${p.title}`);
  }

  console.log("\n⏳ Creating company playlists...");

  const companies = [
    {
      name: "Google",
      slug: "google",
      description: "Problems frequently asked in Google technical interviews, covering arrays, graphs, DP, trees, and system design.",
      icon: "🔵",
      tag: "Company",
      ids: GOOGLE_IDS,
    },
    {
      name: "Amazon",
      slug: "amazon",
      description: "Problems frequently asked in Amazon SDE interviews, emphasizing leadership principles and scalable problem-solving.",
      icon: "🟠",
      tag: "Company",
      ids: AMAZON_IDS,
    },
    {
      name: "Microsoft",
      slug: "microsoft",
      description: "Problems commonly seen in Microsoft SDE interviews, focusing on data structures, trees, and dynamic programming.",
      icon: "🟦",
      tag: "Company",
      ids: MICROSOFT_IDS,
    },
  ];

  for (const co of companies) {
    const playlist = await prisma.intelPlaylist.upsert({
      where: { slug: co.slug },
      update: { name: co.name, description: co.description, icon: co.icon, tag: co.tag },
      create: { name: co.name, slug: co.slug, description: co.description, icon: co.icon, tag: co.tag },
    });

    // Delete old items first to re-seed cleanly
    await prisma.intelPlaylistItem.deleteMany({ where: { playlistId: playlist.id } });

    // Only link problems that exist in the DB
    const existing = await prisma.intelProblem.findMany({
      where: { id: { in: co.ids } },
      select: { id: true },
    });
    const existingIds = new Set(existing.map(p => p.id));

    for (let i = 0; i < co.ids.length; i++) {
      const pid = co.ids[i];
      if (!existingIds.has(pid)) continue;
      await prisma.intelPlaylistItem.create({
        data: { playlistId: playlist.id, problemId: pid, order: i },
      });
    }
    console.log(`  ✓ ${co.name} playlist — ${existingIds.size} problems`);
  }

  // Also update difficulty playlists to include new problems
  console.log("\n⏳ Updating difficulty playlists...");
  const easyNew  = [83, 91];
  const mediumNew = [76, 77, 78, 81, 82, 84, 85, 86, 87, 88, 89, 92, 93, 94, 96];
  const hardNew  = [79, 80, 90, 95, 97];

  for (const [slug, ids] of [["easy", easyNew], ["medium", mediumNew], ["hard", hardNew]] as [string, number[]][]) {
    const pl = await prisma.intelPlaylist.findUnique({ where: { slug } });
    if (!pl) continue;
    for (let i = 0; i < ids.length; i++) {
      await prisma.intelPlaylistItem.upsert({
        where: { playlistId_problemId: { playlistId: pl.id, problemId: ids[i] } },
        update: {},
        create: { playlistId: pl.id, problemId: ids[i], order: 1000 + i },
      });
    }
    console.log(`  ✓ ${slug} playlist updated (+${ids.length})`);
  }

  console.log("\n✅ Done! Problems 76-97 seeded, Google/Amazon/Microsoft playlists created.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

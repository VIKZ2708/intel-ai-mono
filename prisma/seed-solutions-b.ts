import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SolutionRow = {
  problemId: number;
  solutionType: string;
  language: string;
  approach: string;
  code: string;
  explanation: string;
  timeComplex: string;
  spaceComplex: string;
  username?: string;
  runtime?: number;
  memory?: number;
  beats?: number;
};

const solutions: SolutionRow[] = [

  // ─────────────────────────────────────────────────────────────
  // 26. Longest Increasing Subsequence
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 26, solutionType: "editorial", language: "javascript",
    approach: "Patience Sorting (Binary Search)",
    code: `function lengthOfLIS(nums) {
  const tails = [];
  for (const n of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = n;
  }
  return tails.length;
}`,
    explanation: "Maintain a 'tails' array where tails[i] is the smallest tail element of all increasing subsequences of length i+1. Binary search to find where to place each number. Length of tails array is the answer.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
  },
  {
    problemId: 26, solutionType: "editorial", language: "python",
    approach: "Patience Sorting (Binary Search)",
    code: `import bisect

def lengthOfLIS(nums: list[int]) -> int:
    tails = []
    for n in nums:
        pos = bisect.bisect_left(tails, n)
        if pos == len(tails):
            tails.append(n)
        else:
            tails[pos] = n
    return len(tails)`,
    explanation: "Use bisect_left to binary-search insertion point in tails array. Replace or extend in O(log n) per element.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
  },
  {
    problemId: 26, solutionType: "community", language: "python",
    approach: "DP O(n²)",
    code: `def lengthOfLIS(nums):
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
    explanation: "Classic O(n²) DP: dp[i] = longest subsequence ending at index i.",
    timeComplex: "O(n²)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 512, memory: 16.8, beats: 68,
  },
  {
    problemId: 26, solutionType: "community", language: "javascript",
    approach: "DP with backtracking for actual sequence",
    code: `function lengthOfLIS(nums) {
  const n = nums.length, dp = new Array(n).fill(1);
  let max = 1;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}`,
    explanation: "O(n²) DP — easier to understand and extend for reconstructing the actual subsequence.",
    timeComplex: "O(n²)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 80, memory: 49.2, beats: 70,
  },

  // ─────────────────────────────────────────────────────────────
  // 27. Find Minimum in Rotated Sorted Array
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 27, solutionType: "editorial", language: "javascript",
    approach: "Binary Search on pivot",
    code: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}`,
    explanation: "Compare mid with hi: if nums[mid] > nums[hi], the minimum lies in the right half; otherwise it's in the left half (including mid). Converge to the rotation point.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 27, solutionType: "editorial", language: "python",
    approach: "Binary Search on pivot",
    code: `def findMin(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]`,
    explanation: "Binary search: compare mid to hi to determine which half contains the minimum.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 27, solutionType: "community", language: "python",
    approach: "Early exit if not rotated",
    code: `def findMin(nums):
    if nums[0] <= nums[-1]:
        return nums[0]
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] >= nums[0]: lo = mid + 1
        else: hi = mid
    return nums[lo]`,
    explanation: "Quick exit when array is already sorted. Then binary search comparing to nums[0].",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 36, memory: 16.2, beats: 95,
  },
  {
    problemId: 27, solutionType: "community", language: "javascript",
    approach: "Compare lo and hi first",
    code: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  if (nums[lo] <= nums[hi]) return nums[lo];
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[lo]) lo = mid;
    else hi = mid;
  }
  return Math.min(nums[lo], nums[hi]);
}`,
    explanation: "Compare lo/hi first for already-sorted case, then binary search for pivot.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 42, memory: 48.5, beats: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // 28. Minimum Window Substring
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 28, solutionType: "editorial", language: "javascript",
    approach: "Sliding Window + Frequency Map",
    code: `function minWindow(s, t) {
  if (!t.length) return "";
  const need = new Map(), window = new Map();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let lo = 0, have = 0, required = need.size, res = "";
  for (let hi = 0; hi < s.length; hi++) {
    const c = s[hi];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      const sub = s.slice(lo, hi + 1);
      if (!res || sub.length < res.length) res = sub;
      const lc = s[lo];
      window.set(lc, window.get(lc) - 1);
      if (need.has(lc) && window.get(lc) < need.get(lc)) have--;
      lo++;
    }
  }
  return res;
}`,
    explanation: "Expand right to satisfy all required characters, then shrink from left while still valid. Track how many unique characters are fully satisfied with 'have' counter.",
    timeComplex: "O(|s| + |t|)", spaceComplex: "O(|s| + |t|)",
  },
  {
    problemId: 28, solutionType: "editorial", language: "python",
    approach: "Sliding Window + Frequency Map",
    code: `from collections import Counter

def minWindow(s: str, t: str) -> str:
    if not t: return ""
    need = Counter(t)
    window = {}
    have, required = 0, len(need)
    lo, res, res_len = 0, "", float('inf')
    for hi, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in need and window[c] == need[c]:
            have += 1
        while have == required:
            if hi - lo + 1 < res_len:
                res_len = hi - lo + 1
                res = s[lo:hi+1]
            window[s[lo]] -= 1
            if s[lo] in need and window[s[lo]] < need[s[lo]]:
                have -= 1
            lo += 1
    return res`,
    explanation: "Classic two-pointer sliding window. Expand until valid, shrink to minimise, record minimum window.",
    timeComplex: "O(|s| + |t|)", spaceComplex: "O(|s| + |t|)",
  },
  {
    problemId: 28, solutionType: "community", language: "python",
    approach: "Filtered indices optimisation",
    code: `from collections import Counter

def minWindow(s, t):
    need = Counter(t)
    missing = len(t)
    lo = res_lo = res_hi = 0
    for hi, c in enumerate(s, 1):
        if need[c] > 0: missing -= 1
        need[c] -= 1
        if missing == 0:
            while need[s[lo]] < 0: need[s[lo]] += 1; lo += 1
            if not res_hi or hi - lo < res_hi - res_lo:
                res_lo, res_hi = lo, hi
            need[s[lo]] += 1; missing += 1; lo += 1
    return s[res_lo:res_hi]`,
    explanation: "Track 'missing' total count instead of unique chars — more concise approach.",
    timeComplex: "O(|s| + |t|)", spaceComplex: "O(|t|)",
    username: "@priya_s", runtime: 68, memory: 16.5, beats: 90,
  },
  {
    problemId: 28, solutionType: "community", language: "javascript",
    approach: "Array freq counts",
    code: `function minWindow(s, t) {
  const freq = new Array(128).fill(0);
  for (const c of t) freq[c.charCodeAt(0)]++;
  let count = t.length, lo = 0, res = "", minLen = Infinity;
  for (let hi = 0; hi < s.length; hi++) {
    if (freq[s.charCodeAt(hi)]-- > 0) count--;
    while (count === 0) {
      if (hi - lo + 1 < minLen) { minLen = hi - lo + 1; res = s.slice(lo, hi + 1); }
      if (++freq[s.charCodeAt(lo++)] > 0) count++;
    }
  }
  return res;
}`,
    explanation: "Use char-code array instead of Map for O(1) fixed-size access — faster in practice.",
    timeComplex: "O(|s| + |t|)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 60, memory: 48.8, beats: 93,
  },

  // ─────────────────────────────────────────────────────────────
  // 29. Course Schedule
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 29, solutionType: "editorial", language: "javascript",
    approach: "DFS Cycle Detection",
    code: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a);
  // 0=unvisited, 1=visiting, 2=done
  const state = new Array(numCourses).fill(0);
  function dfs(node) {
    if (state[node] === 1) return false;
    if (state[node] === 2) return true;
    state[node] = 1;
    for (const nei of graph[node]) if (!dfs(nei)) return false;
    state[node] = 2;
    return true;
  }
  for (let i = 0; i < numCourses; i++) if (!dfs(i)) return false;
  return true;
}`,
    explanation: "Build adjacency list. DFS with three states: unvisited(0), in-current-path(1=cycle!), done(2). If we hit a node in state 1 we found a cycle.",
    timeComplex: "O(V+E)", spaceComplex: "O(V+E)",
  },
  {
    problemId: 29, solutionType: "editorial", language: "python",
    approach: "DFS Cycle Detection",
    code: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        graph[b].append(a)
    # 0=unvisited, 1=visiting, 2=done
    state = [0] * numCourses

    def dfs(node):
        if state[node] == 1: return False
        if state[node] == 2: return True
        state[node] = 1
        for nei in graph[node]:
            if not dfs(nei): return False
        state[node] = 2
        return True

    return all(dfs(i) for i in range(numCourses))`,
    explanation: "Three-color DFS cycle detection on directed graph. Grey=in-stack means cycle.",
    timeComplex: "O(V+E)", spaceComplex: "O(V+E)",
  },
  {
    problemId: 29, solutionType: "community", language: "python",
    approach: "Kahn's Algorithm (BFS Topological Sort)",
    code: `from collections import deque

def canFinish(numCourses, prerequisites):
    indegree = [0] * numCourses
    graph = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        graph[b].append(a); indegree[a] += 1
    q = deque(i for i in range(numCourses) if indegree[i] == 0)
    processed = 0
    while q:
        node = q.popleft(); processed += 1
        for nei in graph[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0: q.append(nei)
    return processed == numCourses`,
    explanation: "Kahn's algorithm: process nodes with in-degree 0. If all nodes processed, no cycle exists.",
    timeComplex: "O(V+E)", spaceComplex: "O(V+E)",
    username: "@priya_s", runtime: 88, memory: 18.2, beats: 88,
  },
  {
    problemId: 29, solutionType: "community", language: "javascript",
    approach: "Kahn's BFS Topological Sort",
    code: `function canFinish(numCourses, prerequisites) {
  const indegree = new Array(numCourses).fill(0);
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) { graph[b].push(a); indegree[a]++; }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (!indegree[i]) q.push(i);
  let done = 0;
  while (q.length) {
    const node = q.shift(); done++;
    for (const nei of graph[node]) if (--indegree[nei] === 0) q.push(nei);
  }
  return done === numCourses;
}`,
    explanation: "BFS topological sort — count processed nodes; if equals numCourses, no cycle.",
    timeComplex: "O(V+E)", spaceComplex: "O(V+E)",
    username: "@rahul_dev", runtime: 78, memory: 52.1, beats: 85,
  },

  // ─────────────────────────────────────────────────────────────
  // 30. N-Queens
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 30, solutionType: "editorial", language: "javascript",
    approach: "Backtracking with Diagonal Sets",
    code: `function solveNQueens(n) {
  const res = [], board = Array.from({ length: n }, () => Array(n).fill('.'));
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  function bt(row) {
    if (row === n) { res.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      board[row][col] = 'Q';
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      bt(row + 1);
      board[row][col] = '.';
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }
  bt(0);
  return res;
}`,
    explanation: "Backtrack row by row. Track attacked columns and both diagonals using sets for O(1) lookup. Place queen if safe, recurse, backtrack.",
    timeComplex: "O(n!)", spaceComplex: "O(n²)",
  },
  {
    problemId: 30, solutionType: "editorial", language: "python",
    approach: "Backtracking with Diagonal Sets",
    code: `def solveNQueens(n: int) -> list[list[str]]:
    res = []
    board = [['.'] * n for _ in range(n)]
    cols, diag1, diag2 = set(), set(), set()

    def bt(row):
        if row == n:
            res.append([''.join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue
            board[row][col] = 'Q'
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            bt(row + 1)
            board[row][col] = '.'
            cols.discard(col); diag1.discard(row-col); diag2.discard(row+col)

    bt(0)
    return res`,
    explanation: "Classic N-Queens backtracking. Row-by-row placement, three sets track attacked positions.",
    timeComplex: "O(n!)", spaceComplex: "O(n²)",
  },
  {
    problemId: 30, solutionType: "community", language: "python",
    approach: "Bitmask backtracking",
    code: `def solveNQueens(n):
    res = []
    def bt(row, cols, d1, d2, board):
        if row == n: res.append(board[:]); return
        avail = ((1 << n) - 1) & ~(cols | d1 | d2)
        while avail:
            bit = avail & (-avail)
            avail -= bit
            col = bit.bit_length() - 1
            board.append('.' * col + 'Q' + '.' * (n - col - 1))
            bt(row+1, cols|bit, (d1|bit)<<1, (d2|bit)>>1, board)
            board.pop()
    bt(0, 0, 0, 0, [])
    return res`,
    explanation: "Bitmask tracks attacked positions. Bit tricks isolate lowest set bit for column selection — fastest in practice.",
    timeComplex: "O(n!)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 40, memory: 16.5, beats: 92,
  },
  {
    problemId: 30, solutionType: "community", language: "javascript",
    approach: "Array-based position tracking",
    code: `function solveNQueens(n) {
  const res = [], queens = [];
  function isSafe(row, col) {
    for (let r = 0; r < row; r++) {
      if (queens[r] === col || Math.abs(queens[r] - col) === row - r) return false;
    }
    return true;
  }
  function bt(row) {
    if (row === n) {
      res.push(queens.map(c => '.'.repeat(c) + 'Q' + '.'.repeat(n-c-1)));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (isSafe(row, c)) { queens[row] = c; bt(row+1); }
    }
  }
  bt(0);
  return res;
}`,
    explanation: "Store queen column per row in array. isSafe checks previous rows for column or diagonal conflicts.",
    timeComplex: "O(n!)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 58, memory: 50.1, beats: 85,
  },

  // ─────────────────────────────────────────────────────────────
  // 31. Valid Palindrome
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 31, solutionType: "editorial", language: "javascript",
    approach: "Two Pointers — In Place",
    code: `function isPalindrome(s) {
  let lo = 0, hi = s.length - 1;
  while (lo < hi) {
    while (lo < hi && !isAlphanumeric(s[lo])) lo++;
    while (lo < hi && !isAlphanumeric(s[hi])) hi--;
    if (s[lo].toLowerCase() !== s[hi].toLowerCase()) return false;
    lo++; hi--;
  }
  return true;
}
function isAlphanumeric(c) { return /[a-zA-Z0-9]/.test(c); }`,
    explanation: "Two pointers from both ends. Skip non-alphanumeric characters. Compare case-insensitively. O(n) time, O(1) space — no extra string created.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 31, solutionType: "editorial", language: "python",
    approach: "Two Pointers — In Place",
    code: `def isPalindrome(s: str) -> bool:
    lo, hi = 0, len(s) - 1
    while lo < hi:
        while lo < hi and not s[lo].isalnum(): lo += 1
        while lo < hi and not s[hi].isalnum(): hi -= 1
        if s[lo].lower() != s[hi].lower(): return False
        lo += 1; hi -= 1
    return True`,
    explanation: "Two pointer approach skipping non-alphanumeric chars and comparing case-insensitively.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 31, solutionType: "community", language: "python",
    approach: "Filter and compare",
    code: `def isPalindrome(s):
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]`,
    explanation: "Clean the string into a list, compare with its reverse — concise but uses O(n) space.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 48, memory: 16.5, beats: 88,
  },
  {
    problemId: 31, solutionType: "community", language: "javascript",
    approach: "Regex clean + reverse compare",
    code: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}`,
    explanation: "Filter with regex, compare string to its reverse. Simple but O(n) extra space.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 60, memory: 49.3, beats: 82,
  },

  // ─────────────────────────────────────────────────────────────
  // 32. Linked List Cycle
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 32, solutionType: "editorial", language: "javascript",
    approach: "Floyd's Tortoise and Hare",
    code: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    explanation: "Slow pointer moves one step, fast moves two. If there's a cycle they must eventually meet. O(n) time, O(1) space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 32, solutionType: "editorial", language: "python",
    approach: "Floyd's Tortoise and Hare",
    code: `def hasCycle(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
    explanation: "Classic cycle detection: slow and fast pointers meet inside cycle if one exists.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 32, solutionType: "community", language: "python",
    approach: "Hash Set visited nodes",
    code: `def hasCycle(head):
    seen = set()
    while head:
        if id(head) in seen: return True
        seen.add(id(head))
        head = head.next
    return False`,
    explanation: "Store node identities in a set. If we see the same node twice, there's a cycle.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 52, memory: 19.8, beats: 75,
  },
  {
    problemId: 32, solutionType: "community", language: "javascript",
    approach: "Mark visited with sentinel",
    code: `function hasCycle(head) {
  const seen = new Set();
  while (head) {
    if (seen.has(head)) return true;
    seen.add(head);
    head = head.next;
  }
  return false;
}`,
    explanation: "Store node references in Set. Second visit = cycle. O(n) space but straightforward.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 58, memory: 50.5, beats: 72,
  },

  // ─────────────────────────────────────────────────────────────
  // 33. Merge Two Sorted Lists (duplicate of 24 but different DB id)
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 33, solutionType: "editorial", language: "javascript",
    approach: "Iterative — Dummy Head",
    code: `function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next;
  }
  cur.next = l1 ?? l2;
  return dummy.next;
}`,
    explanation: "Dummy head simplifies edge cases. Pick the smaller head each iteration and advance that pointer. Attach remainder at the end.",
    timeComplex: "O(m+n)", spaceComplex: "O(1)",
  },
  {
    problemId: 33, solutionType: "editorial", language: "python",
    approach: "Iterative — Dummy Head",
    code: `def mergeTwoLists(l1, l2):
    dummy = cur = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val:
            cur.next = l1; l1 = l1.next
        else:
            cur.next = l2; l2 = l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next`,
    explanation: "Dummy node pattern for clean iterative merge.",
    timeComplex: "O(m+n)", spaceComplex: "O(1)",
  },
  {
    problemId: 33, solutionType: "community", language: "python",
    approach: "Recursive",
    code: `def mergeTwoLists(l1, l2):
    if not l1: return l2
    if not l2: return l1
    if l1.val <= l2.val:
        l1.next = mergeTwoLists(l1.next, l2); return l1
    l2.next = mergeTwoLists(l1, l2.next); return l2`,
    explanation: "Recursive: pick smaller head, recurse on rest.",
    timeComplex: "O(m+n)", spaceComplex: "O(m+n)",
    username: "@priya_s", runtime: 28, memory: 17.6, beats: 91,
  },
  {
    problemId: 33, solutionType: "community", language: "javascript",
    approach: "Recursive one-liner style",
    code: `function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val <= l2.val) { l1.next = mergeTwoLists(l1.next, l2); return l1; }
  l2.next = mergeTwoLists(l1, l2.next); return l2;
}`,
    explanation: "Compact recursive merge — elegant but uses O(n) call stack.",
    timeComplex: "O(m+n)", spaceComplex: "O(m+n)",
    username: "@rahul_dev", runtime: 50, memory: 51.2, beats: 86,
  },

  // ─────────────────────────────────────────────────────────────
  // 34. Valid Anagram
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 34, solutionType: "editorial", language: "javascript",
    approach: "Character Frequency Array",
    code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`,
    explanation: "Increment count for chars in s, decrement for t. If all zeroes at the end, strings are anagrams. O(n) time, O(1) fixed-size space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 34, solutionType: "editorial", language: "python",
    approach: "Counter comparison",
    code: `from collections import Counter

def isAnagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)`,
    explanation: "Counter builds frequency map in O(n). Equality check is O(k) where k=alphabet size. Elegant and concise.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 34, solutionType: "community", language: "python",
    approach: "Sorted comparison",
    code: `def isAnagram(s, t):
    return sorted(s) == sorted(t)`,
    explanation: "Sort both strings — anagrams produce identical sorted outputs. Simple O(n log n).",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 52, memory: 17.0, beats: 78,
  },
  {
    problemId: 34, solutionType: "community", language: "javascript",
    approach: "Map frequency count",
    code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const map = new Map();
  for (const c of s) map.set(c, (map.get(c) ?? 0) + 1);
  for (const c of t) {
    if (!map.has(c) || map.get(c) === 0) return false;
    map.set(c, map.get(c) - 1);
  }
  return true;
}`,
    explanation: "Map-based frequency counter — works for unicode chars beyond 26 lowercase letters.",
    timeComplex: "O(n)", spaceComplex: "O(k)",
    username: "@rahul_dev", runtime: 62, memory: 49.7, beats: 84,
  },

  // ─────────────────────────────────────────────────────────────
  // 35. Single Number
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 35, solutionType: "editorial", language: "javascript",
    approach: "XOR Bit Trick",
    code: `function singleNumber(nums) {
  return nums.reduce((acc, n) => acc ^ n, 0);
}`,
    explanation: "XOR of same numbers cancels out (a ^ a = 0, a ^ 0 = a). XOR all numbers — pairs cancel, leaving the single number. O(n) time, O(1) space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 35, solutionType: "editorial", language: "python",
    approach: "XOR Bit Trick",
    code: `from functools import reduce
from operator import xor

def singleNumber(nums: list[int]) -> int:
    return reduce(xor, nums)`,
    explanation: "Fold XOR over the entire array. All duplicates cancel, single number remains.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 35, solutionType: "community", language: "python",
    approach: "Math trick: 2*sum(set) - sum",
    code: `def singleNumber(nums):
    return 2 * sum(set(nums)) - sum(nums)`,
    explanation: "Sum of unique elements × 2 minus total sum equals the element that appears once.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 88, memory: 17.6, beats: 81,
  },
  {
    problemId: 35, solutionType: "community", language: "javascript",
    approach: "Hash Set toggle",
    code: `function singleNumber(nums) {
  const s = new Set();
  for (const n of nums) s.has(n) ? s.delete(n) : s.add(n);
  return [...s][0];
}`,
    explanation: "Toggle: add if not in set, remove if already there. Single number remains.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 62, memory: 50.4, beats: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // 36. Missing Number
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 36, solutionType: "editorial", language: "javascript",
    approach: "Gauss Sum Formula",
    code: `function missingNumber(nums) {
  const n = nums.length;
  const expected = n * (n + 1) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}`,
    explanation: "Expected sum of 0..n is n*(n+1)/2. Actual sum subtracted gives the missing number. O(n) time, O(1) space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 36, solutionType: "editorial", language: "python",
    approach: "Gauss Sum Formula",
    code: `def missingNumber(nums: list[int]) -> int:
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
    explanation: "Expected total minus actual total equals missing number.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 36, solutionType: "community", language: "python",
    approach: "XOR trick",
    code: `def missingNumber(nums):
    xor = len(nums)
    for i, n in enumerate(nums):
        xor ^= i ^ n
    return xor`,
    explanation: "XOR indices 0..n with all elements. Matched pairs cancel, missing number remains.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 72, memory: 17.1, beats: 86,
  },
  {
    problemId: 36, solutionType: "community", language: "javascript",
    approach: "Set lookup",
    code: `function missingNumber(nums) {
  const s = new Set(nums);
  for (let i = 0; i <= nums.length; i++) if (!s.has(i)) return i;
  return -1;
}`,
    explanation: "O(n) space set then scan 0..n for first absent element — clear and simple.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 66, memory: 51.5, beats: 78,
  },

  // ─────────────────────────────────────────────────────────────
  // 37. Number of 1 Bits
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 37, solutionType: "editorial", language: "javascript",
    approach: "Brian Kernighan's Algorithm",
    code: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // clear lowest set bit
    count++;
  }
  return count;
}`,
    explanation: "n & (n-1) clears the lowest set bit. Count how many times we can do this until n=0. Only iterates once per set bit, not per total bit.",
    timeComplex: "O(k) k=popcount", spaceComplex: "O(1)",
  },
  {
    problemId: 37, solutionType: "editorial", language: "python",
    approach: "Built-in bin count",
    code: `def hammingWeight(n: int) -> int:
    return bin(n).count('1')`,
    explanation: "bin() converts to binary string; count '1' gives popcount. Pythonic and clean.",
    timeComplex: "O(log n)", spaceComplex: "O(log n)",
  },
  {
    problemId: 37, solutionType: "community", language: "python",
    approach: "Brian Kernighan manual",
    code: `def hammingWeight(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
    explanation: "Each n &= n-1 strips the lowest set bit — count iterations.",
    timeComplex: "O(k)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 28, memory: 16.1, beats: 92,
  },
  {
    problemId: 37, solutionType: "community", language: "javascript",
    approach: "Bit shift loop",
    code: `function hammingWeight(n) {
  let count = 0;
  while (n > 0) { count += n & 1; n >>>= 1; }
  return count;
}`,
    explanation: "Check LSB, unsigned right shift until zero. Works for 32-bit integers.",
    timeComplex: "O(32)=O(1)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 50, memory: 48.2, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 38. Counting Bits
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 38, solutionType: "editorial", language: "javascript",
    approach: "DP with Offset",
    code: `function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  let offset = 1;
  for (let i = 1; i <= n; i++) {
    if (offset * 2 === i) offset = i;
    dp[i] = 1 + dp[i - offset];
  }
  return dp;
}`,
    explanation: "offset is the highest power of 2 ≤ i. dp[i] = 1 + dp[i - offset] because i = offset + (i-offset), and i-offset < i already computed.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 38, solutionType: "editorial", language: "python",
    approach: "DP — Most Significant Bit",
    code: `def countBits(n: int) -> list[int]:
    dp = [0] * (n + 1)
    offset = 1
    for i in range(1, n + 1):
        if offset * 2 == i:
            offset = i
        dp[i] = 1 + dp[i - offset]
    return dp`,
    explanation: "DP recurrence: bit count of i = 1 + bit count of (i minus highest power of 2 ≤ i).",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 38, solutionType: "community", language: "python",
    approach: "LSB trick: dp[i] = dp[i>>1] + (i&1)",
    code: `def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
    explanation: "Shift right removes LSB. dp[i] = dp[i//2] + whether i is odd.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 62, memory: 21.4, beats: 91,
  },
  {
    problemId: 38, solutionType: "community", language: "javascript",
    approach: "LSB shift DP",
    code: `function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}`,
    explanation: "dp[i] = dp[i>>1] + lsb(i). Right-shift removes the last bit, add 1 if original was odd.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 56, memory: 53.1, beats: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // 39. Same Tree
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 39, solutionType: "editorial", language: "javascript",
    approach: "Recursive DFS",
    code: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    explanation: "Base cases: both null = same; one null or values differ = not same. Recurse on left and right subtrees.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 39, solutionType: "editorial", language: "python",
    approach: "Recursive DFS",
    code: `def isSameTree(p, q) -> bool:
    if not p and not q: return True
    if not p or not q or p.val != q.val: return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
    explanation: "Three-case recursive check: both None, structure mismatch, or value mismatch then recurse.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 39, solutionType: "community", language: "python",
    approach: "BFS queue comparison",
    code: `from collections import deque

def isSameTree(p, q):
    dq = deque([(p, q)])
    while dq:
        a, b = dq.popleft()
        if not a and not b: continue
        if not a or not b or a.val != b.val: return False
        dq.append((a.left, b.left))
        dq.append((a.right, b.right))
    return True`,
    explanation: "BFS traversal comparing node pairs level by level.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 28, memory: 16.5, beats: 88,
  },
  {
    problemId: 39, solutionType: "community", language: "javascript",
    approach: "Iterative stack DFS",
    code: `function isSameTree(p, q) {
  const stack = [[p, q]];
  while (stack.length) {
    const [a, b] = stack.pop();
    if (!a && !b) continue;
    if (!a || !b || a.val !== b.val) return false;
    stack.push([a.left, b.left], [a.right, b.right]);
  }
  return true;
}`,
    explanation: "Iterative DFS comparing node pairs on a stack.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
    username: "@rahul_dev", runtime: 45, memory: 49.0, beats: 84,
  },

  // ─────────────────────────────────────────────────────────────
  // 40. Symmetric Tree
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 40, solutionType: "editorial", language: "javascript",
    approach: "Recursive Mirror Check",
    code: `function isSymmetric(root) {
  function isMirror(l, r) {
    if (!l && !r) return true;
    if (!l || !r || l.val !== r.val) return false;
    return isMirror(l.left, r.right) && isMirror(l.right, r.left);
  }
  return isMirror(root.left, root.right);
}`,
    explanation: "A tree is symmetric if left subtree mirrors the right. Recursively check: outer nodes match and inner nodes match.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 40, solutionType: "editorial", language: "python",
    approach: "Recursive Mirror Check",
    code: `def isSymmetric(root) -> bool:
    def mirror(l, r):
        if not l and not r: return True
        if not l or not r or l.val != r.val: return False
        return mirror(l.left, r.right) and mirror(l.right, r.left)
    return mirror(root.left, root.right)`,
    explanation: "Mirror check: left-outer ↔ right-outer and left-inner ↔ right-inner.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 40, solutionType: "community", language: "python",
    approach: "BFS iterative",
    code: `from collections import deque

def isSymmetric(root):
    q = deque([root.left, root.right])
    while q:
        a, b = q.popleft(), q.popleft()
        if not a and not b: continue
        if not a or not b or a.val != b.val: return False
        q.extend([a.left, b.right, a.right, b.left])
    return True`,
    explanation: "BFS with pairs: always enqueue outer nodes then inner nodes together.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 32, memory: 17.0, beats: 86,
  },
  {
    problemId: 40, solutionType: "community", language: "javascript",
    approach: "Iterative queue",
    code: `function isSymmetric(root) {
  const q = [root.left, root.right];
  while (q.length) {
    const a = q.shift(), b = q.shift();
    if (!a && !b) continue;
    if (!a || !b || a.val !== b.val) return false;
    q.push(a.left, b.right, a.right, b.left);
  }
  return true;
}`,
    explanation: "Queue-based BFS iterative mirror check.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 48, memory: 48.6, beats: 84,
  },

  // ─────────────────────────────────────────────────────────────
  // 41. Validate Binary Search Tree
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 41, solutionType: "editorial", language: "javascript",
    approach: "DFS with min/max bounds",
    code: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}`,
    explanation: "Each node must lie strictly within (min, max) bounds. When going left, upper bound = current value. When going right, lower bound = current value.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 41, solutionType: "editorial", language: "python",
    approach: "DFS with min/max bounds",
    code: `def isValidBST(root) -> bool:
    def validate(node, lo, hi):
        if not node: return True
        if node.val <= lo or node.val >= hi: return False
        return validate(node.left, lo, node.val) and validate(node.right, node.val, hi)
    return validate(root, float('-inf'), float('inf'))`,
    explanation: "Pass valid range (lo, hi) down the recursion, tightening bounds at each node.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 41, solutionType: "community", language: "python",
    approach: "In-order traversal check",
    code: `def isValidBST(root):
    prev = [float('-inf')]
    def inorder(node):
        if not node: return True
        if not inorder(node.left): return False
        if node.val <= prev[0]: return False
        prev[0] = node.val
        return inorder(node.right)
    return inorder(root)`,
    explanation: "In-order traversal of a valid BST yields strictly increasing values. Check each value is greater than the previous.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
    username: "@priya_s", runtime: 34, memory: 18.8, beats: 90,
  },
  {
    problemId: 41, solutionType: "community", language: "javascript",
    approach: "Iterative in-order with stack",
    code: `function isValidBST(root) {
  const stack = [];
  let prev = -Infinity, cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    if (cur.val <= prev) return false;
    prev = cur.val;
    cur = cur.right;
  }
  return true;
}`,
    explanation: "Iterative in-order traversal using explicit stack. Track previous value for monotone check.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
    username: "@rahul_dev", runtime: 52, memory: 50.7, beats: 86,
  },

  // ─────────────────────────────────────────────────────────────
  // 42. Lowest Common Ancestor of a BST
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 42, solutionType: "editorial", language: "javascript",
    approach: "BST Property Navigation",
    code: `function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) root = root.left;
    else if (p.val > root.val && q.val > root.val) root = root.right;
    else return root;
  }
  return null;
}`,
    explanation: "If both nodes are left of root, go left. If both are right, go right. Otherwise root is the LCA (one node is in each subtree, or root equals one of them).",
    timeComplex: "O(h)", spaceComplex: "O(1)",
  },
  {
    problemId: 42, solutionType: "editorial", language: "python",
    approach: "BST Property Navigation",
    code: `def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root`,
    explanation: "Use BST ordering: navigate left or right until the split point, which is the LCA.",
    timeComplex: "O(h)", spaceComplex: "O(1)",
  },
  {
    problemId: 42, solutionType: "community", language: "python",
    approach: "Recursive BST navigation",
    code: `def lowestCommonAncestor(root, p, q):
    if p.val < root.val and q.val < root.val:
        return lowestCommonAncestor(root.left, p, q)
    if p.val > root.val and q.val > root.val:
        return lowestCommonAncestor(root.right, p, q)
    return root`,
    explanation: "Recursive version of the same BST-guided navigation.",
    timeComplex: "O(h)", spaceComplex: "O(h)",
    username: "@priya_s", runtime: 62, memory: 20.5, beats: 84,
  },
  {
    problemId: 42, solutionType: "community", language: "javascript",
    approach: "Recursive one-liner",
    code: `function lowestCommonAncestor(root, p, q) {
  if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);
  if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);
  return root;
}`,
    explanation: "Clean recursive BST LCA — leverages BST ordering property directly.",
    timeComplex: "O(h)", spaceComplex: "O(h)",
    username: "@rahul_dev", runtime: 58, memory: 54.1, beats: 82,
  },

  // ─────────────────────────────────────────────────────────────
  // 43. Kth Smallest Element in a BST
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 43, solutionType: "editorial", language: "javascript",
    approach: "Iterative In-Order Traversal",
    code: `function kthSmallest(root, k) {
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
  return -1;
}`,
    explanation: "In-order traversal of a BST visits nodes in ascending order. Stop and return the kth node visited. Iterative to avoid recursion overhead.",
    timeComplex: "O(h+k)", spaceComplex: "O(h)",
  },
  {
    problemId: 43, solutionType: "editorial", language: "python",
    approach: "Recursive In-Order",
    code: `def kthSmallest(root, k: int) -> int:
    res = []
    def inorder(node):
        if not node or len(res) == k: return
        inorder(node.left)
        res.append(node.val)
        inorder(node.right)
    inorder(root)
    return res[k-1]`,
    explanation: "Recursive in-order (left→node→right) collects sorted values. Return kth.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 43, solutionType: "community", language: "python",
    approach: "Generator-based lazy in-order",
    code: `def kthSmallest(root, k):
    def inorder(node):
        if node:
            yield from inorder(node.left)
            yield node.val
            yield from inorder(node.right)
    gen = inorder(root)
    for _ in range(k):
        res = next(gen)
    return res`,
    explanation: "Generator lazily yields in-order values — stops after k elements without traversing the rest.",
    timeComplex: "O(h+k)", spaceComplex: "O(h)",
    username: "@priya_s", runtime: 42, memory: 18.2, beats: 87,
  },
  {
    problemId: 43, solutionType: "community", language: "javascript",
    approach: "Recursive with early exit array",
    code: `function kthSmallest(root, k) {
  let count = 0, result = null;
  function inorder(node) {
    if (!node || result !== null) return;
    inorder(node.left);
    if (++count === k) { result = node.val; return; }
    inorder(node.right);
  }
  inorder(root);
  return result;
}`,
    explanation: "Early-exit recursive in-order: stop traversal once the kth node is found.",
    timeComplex: "O(h+k)", spaceComplex: "O(h)",
    username: "@rahul_dev", runtime: 56, memory: 52.3, beats: 85,
  },

  // ─────────────────────────────────────────────────────────────
  // 44. Binary Tree Right Side View
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 44, solutionType: "editorial", language: "javascript",
    approach: "BFS Level Order — Last Node Per Level",
    code: `function rightSideView(root) {
  if (!root) return [];
  const res = [], q = [root];
  while (q.length) {
    const len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      if (i === len - 1) res.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
}`,
    explanation: "BFS level by level. At each level the last node processed is the rightmost visible node. Push children left-to-right so last in queue per level = rightmost.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 44, solutionType: "editorial", language: "python",
    approach: "BFS Level Order — Last Node Per Level",
    code: `from collections import deque

def rightSideView(root) -> list[int]:
    if not root: return []
    res, q = [], deque([root])
    while q:
        level_len = len(q)
        for i in range(level_len):
            node = q.popleft()
            if i == level_len - 1: res.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
    return res`,
    explanation: "BFS: record last node value of each level — that's the rightmost visible node.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 44, solutionType: "community", language: "python",
    approach: "DFS right-first",
    code: `def rightSideView(root):
    res = []
    def dfs(node, depth):
        if not node: return
        if depth == len(res): res.append(node.val)
        dfs(node.right, depth + 1)
        dfs(node.left, depth + 1)
    dfs(root, 0)
    return res`,
    explanation: "DFS visiting right child first. First node seen at each depth = rightmost visible.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
    username: "@priya_s", runtime: 32, memory: 16.9, beats: 91,
  },
  {
    problemId: 44, solutionType: "community", language: "javascript",
    approach: "DFS right-first depth tracking",
    code: `function rightSideView(root) {
  const res = [];
  function dfs(node, d) {
    if (!node) return;
    if (d === res.length) res.push(node.val);
    dfs(node.right, d + 1);
    dfs(node.left, d + 1);
  }
  dfs(root, 0);
  return res;
}`,
    explanation: "Right-first DFS: first node at each depth goes into res — that's the rightmost node.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
    username: "@rahul_dev", runtime: 48, memory: 48.8, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 45. Group Anagrams
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 45, solutionType: "editorial", language: "javascript",
    approach: "Sorted Key Hash Map",
    code: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}`,
    explanation: "Sort each string to create a canonical key — anagrams share the same sorted form. Group by this key in a hash map.",
    timeComplex: "O(n·k log k)", spaceComplex: "O(n·k)",
  },
  {
    problemId: 45, solutionType: "editorial", language: "python",
    approach: "Sorted Key Hash Map",
    code: `from collections import defaultdict

def groupAnagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        groups[tuple(sorted(s))].append(s)
    return list(groups.values())`,
    explanation: "Sorted tuple as key groups all anagrams. defaultdict simplifies code.",
    timeComplex: "O(n·k log k)", spaceComplex: "O(n·k)",
  },
  {
    problemId: 45, solutionType: "community", language: "python",
    approach: "Char frequency tuple key",
    code: `from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s: key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())`,
    explanation: "O(n·k) key using character frequency counts — avoids sorting overhead.",
    timeComplex: "O(n·k)", spaceComplex: "O(n·k)",
    username: "@priya_s", runtime: 88, memory: 19.2, beats: 89,
  },
  {
    problemId: 45, solutionType: "community", language: "javascript",
    approach: "Char count string key",
    code: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const cnt = new Array(26).fill(0);
    for (const c of s) cnt[c.charCodeAt(0) - 97]++;
    const key = cnt.join('#');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}`,
    explanation: "Count char frequencies, join with '#' separator as a unique key — O(n·k) instead of O(n·k log k).",
    timeComplex: "O(n·k)", spaceComplex: "O(n·k)",
    username: "@rahul_dev", runtime: 80, memory: 56.0, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 46. Longest Consecutive Sequence
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 46, solutionType: "editorial", language: "javascript",
    approach: "Hash Set + Sequence Start Detection",
    code: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (!set.has(n - 1)) { // n is start of a sequence
      let len = 1;
      while (set.has(n + len)) len++;
      best = Math.max(best, len);
    }
  }
  return best;
}`,
    explanation: "Insert all numbers in a Set. Only start counting from sequence beginnings (n-1 not in set). Each number is visited at most twice overall — O(n).",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 46, solutionType: "editorial", language: "python",
    approach: "Hash Set + Sequence Start Detection",
    code: `def longestConsecutive(nums: list[int]) -> int:
    num_set = set(nums)
    best = 0
    for n in num_set:
        if n - 1 not in num_set:
            cur, length = n, 1
            while cur + 1 in num_set:
                cur += 1; length += 1
            best = max(best, length)
    return best`,
    explanation: "Only begin counting at sequence starts (no n-1 in set). Total work is O(n) across all sequences.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 46, solutionType: "community", language: "python",
    approach: "Sort and scan",
    code: `def longestConsecutive(nums):
    if not nums: return 0
    nums = sorted(set(nums))
    best, cur = 1, 1
    for i in range(1, len(nums)):
        if nums[i] == nums[i-1] + 1: cur += 1
        else: cur = 1
        best = max(best, cur)
    return best`,
    explanation: "Deduplicate and sort, then scan for consecutive pairs. O(n log n) but very readable.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 120, memory: 28.1, beats: 72,
  },
  {
    problemId: 46, solutionType: "community", language: "javascript",
    approach: "Union-Find",
    code: `function longestConsecutive(nums) {
  const parent = new Map(), rank = new Map();
  const find = (x) => {
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)));
    return parent.get(x);
  };
  const union = (a, b) => {
    const [ra, rb] = [find(a), find(b)];
    if (ra === rb) return;
    if ((rank.get(ra) ?? 0) < (rank.get(rb) ?? 0)) parent.set(ra, rb);
    else { parent.set(rb, ra); if (rank.get(ra) === rank.get(rb)) rank.set(ra, (rank.get(ra) ?? 0) + 1); }
  };
  for (const n of nums) { parent.set(n, n); }
  for (const n of nums) if (parent.has(n + 1)) union(n, n + 1);
  const sizes = new Map();
  for (const n of nums) { const r = find(n); sizes.set(r, (sizes.get(r) ?? 0) + 1); }
  return Math.max(...sizes.values(), 0);
}`,
    explanation: "Union-Find groups consecutive numbers into components. Max component size = answer.",
    timeComplex: "O(n α(n))", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 88, memory: 63.2, beats: 75,
  },

  // ─────────────────────────────────────────────────────────────
  // 47. Search in Rotated Sorted Array (duplicate of #8 with different DB id)
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 47, solutionType: "editorial", language: "javascript",
    approach: "Binary Search — Determine Sorted Half",
    code: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`,
    explanation: "One half is always sorted. Check if target falls in the sorted half; if yes search there, otherwise search the other half.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 47, solutionType: "editorial", language: "python",
    approach: "Binary Search — Determine Sorted Half",
    code: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target: return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]: hi = mid - 1
            else: lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]: lo = mid + 1
            else: hi = mid - 1
    return -1`,
    explanation: "Compare lo with mid to determine which half is sorted, then check if target is in that half.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 47, solutionType: "community", language: "python",
    approach: "Find pivot then binary search",
    code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]: lo = mid + 1
        else: hi = mid
    pivot = lo
    lo, hi = 0, len(nums) - 1
    if nums[pivot] <= target <= nums[hi]: lo, hi = pivot, len(nums) - 1
    else: hi = pivot - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
    explanation: "Two-phase: find pivot then standard binary search on correct half.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 36, memory: 16.4, beats: 94,
  },
  {
    problemId: 47, solutionType: "community", language: "javascript",
    approach: "Ternary condition style",
    code: `function search(nums, target) {
  let [lo, hi] = [0, nums.length - 1];
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    nums[lo] <= nums[mid]
      ? (target >= nums[lo] && target < nums[mid] ? hi = mid-1 : lo = mid+1)
      : (target > nums[mid] && target <= nums[hi] ? lo = mid+1 : hi = mid-1);
  }
  return -1;
}`,
    explanation: "Compact ternary form — same logic as editorial in fewer lines.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 44, memory: 48.9, beats: 92,
  },

  // ─────────────────────────────────────────────────────────────
  // 48. Search a 2D Matrix
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 48, solutionType: "editorial", language: "javascript",
    approach: "Treat Matrix as 1D Sorted Array",
    code: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,
    explanation: "The matrix is essentially a sorted 1D array if read left-to-right, top-to-bottom. Convert mid index to row/col and do standard binary search.",
    timeComplex: "O(log(m·n))", spaceComplex: "O(1)",
  },
  {
    problemId: 48, solutionType: "editorial", language: "python",
    approach: "Treat Matrix as 1D Sorted Array",
    code: `def searchMatrix(matrix: list[list[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    lo, hi = 0, m * n - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // n][mid % n]
        if val == target: return True
        elif val < target: lo = mid + 1
        else: hi = mid - 1
    return False`,
    explanation: "Index mapping: row = mid // n, col = mid % n. O(log mn) binary search.",
    timeComplex: "O(log(m·n))", spaceComplex: "O(1)",
  },
  {
    problemId: 48, solutionType: "community", language: "python",
    approach: "Search from top-right corner",
    code: `def searchMatrix(matrix, target):
    r, c = 0, len(matrix[0]) - 1
    while r < len(matrix) and c >= 0:
        if matrix[r][c] == target: return True
        elif matrix[r][c] > target: c -= 1
        else: r += 1
    return False`,
    explanation: "Start at top-right: go left if current > target, go down if current < target. O(m+n).",
    timeComplex: "O(m+n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 36, memory: 16.3, beats: 93,
  },
  {
    problemId: 48, solutionType: "community", language: "javascript",
    approach: "Row binary search then column binary search",
    code: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (target < matrix[mid][0]) hi = mid - 1;
    else if (target > matrix[mid][n-1]) lo = mid + 1;
    else {
      let l = 0, r = n - 1;
      while (l <= r) {
        const c = (l + r) >> 1;
        if (matrix[mid][c] === target) return true;
        if (matrix[mid][c] < target) l = c + 1; else r = c - 1;
      }
      return false;
    }
  }
  return false;
}`,
    explanation: "First binary search for the correct row, then binary search within that row.",
    timeComplex: "O(log m + log n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 50, memory: 50.2, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 49. Top K Frequent Elements
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 49, solutionType: "editorial", language: "javascript",
    approach: "Bucket Sort by Frequency",
    code: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, f] of freq) buckets[f].push(n);
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    res.push(...buckets[i]);
  }
  return res.slice(0, k);
}`,
    explanation: "Count frequencies, then bucket by frequency (index = frequency, value = list of numbers). Iterate buckets from high to low, collecting k elements.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 49, solutionType: "editorial", language: "python",
    approach: "Bucket Sort by Frequency",
    code: `from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    freq = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, cnt in freq.items():
        buckets[cnt].append(num)
    res = []
    for i in range(len(buckets) - 1, -1, -1):
        res.extend(buckets[i])
        if len(res) >= k: break
    return res[:k]`,
    explanation: "Bucket by frequency then scan high-to-low collecting elements until k reached.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 49, solutionType: "community", language: "python",
    approach: "Min-heap of size k",
    code: `from collections import Counter
import heapq

def topKFrequent(nums, k):
    return [x for x, _ in Counter(nums).most_common(k)]`,
    explanation: "Counter.most_common(k) uses a heap internally — O(n log k). Concise Python idiom.",
    timeComplex: "O(n log k)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 72, memory: 18.5, beats: 84,
  },
  {
    problemId: 49, solutionType: "community", language: "javascript",
    approach: "Sort by frequency descending",
    code: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(([n]) => n);
}`,
    explanation: "Build frequency map, sort entries by frequency desc, take top k. O(n log n) but simple.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 80, memory: 54.8, beats: 78,
  },

  // ─────────────────────────────────────────────────────────────
  // 50. Kth Largest Element in an Array
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 50, solutionType: "editorial", language: "javascript",
    approach: "QuickSelect",
    code: `function findKthLargest(nums, k) {
  k = nums.length - k; // convert to kth smallest index
  function quickselect(lo, hi) {
    const pivot = nums[hi];
    let p = lo;
    for (let i = lo; i < hi; i++) {
      if (nums[i] <= pivot) { [nums[i], nums[p]] = [nums[p], nums[i]]; p++; }
    }
    [nums[p], nums[hi]] = [nums[hi], nums[p]];
    if (p === k) return nums[p];
    return p < k ? quickselect(p + 1, hi) : quickselect(lo, p - 1);
  }
  return quickselect(0, nums.length - 1);
}`,
    explanation: "QuickSelect: partition array around pivot. If pivot index === k, return it. Otherwise recurse on the correct half. O(n) average, O(n²) worst.",
    timeComplex: "O(n) avg", spaceComplex: "O(log n) avg",
  },
  {
    problemId: 50, solutionType: "editorial", language: "python",
    approach: "Min-Heap of Size k",
    code: `import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    return heapq.nlargest(k, nums)[-1]`,
    explanation: "heapq.nlargest maintains a min-heap of size k. The smallest of the k largest is the answer. O(n log k).",
    timeComplex: "O(n log k)", spaceComplex: "O(k)",
  },
  {
    problemId: 50, solutionType: "community", language: "python",
    approach: "QuickSelect with random pivot",
    code: `import random

def findKthLargest(nums, k):
    def quickselect(lo, hi):
        pivot = nums[random.randint(lo, hi)]
        lo_wall = lo
        for i in range(lo, hi + 1):
            if nums[i] > pivot: nums[i], nums[lo_wall] = nums[lo_wall], nums[i]; lo_wall += 1
        if k <= lo_wall: return quickselect(lo, lo_wall - 1)
        if k > lo_wall + nums[lo_wall:hi+1].count(pivot): return quickselect(lo_wall + nums[lo_wall:hi+1].count(pivot), hi)
        return pivot
    random.shuffle(nums)
    return quickselect(0, len(nums) - 1)`,
    explanation: "Randomised QuickSelect to avoid worst-case behaviour on sorted input.",
    timeComplex: "O(n) expected", spaceComplex: "O(log n)",
    username: "@priya_s", runtime: 188, memory: 27.8, beats: 83,
  },
  {
    problemId: 50, solutionType: "community", language: "javascript",
    approach: "Min-heap of size k manually",
    code: `function findKthLargest(nums, k) {
  // maintain a min-heap of size k
  const heap = nums.slice(0, k).sort((a, b) => a - b);
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > heap[0]) {
      heap[0] = nums[i];
      // sift down
      let j = 0;
      while (true) {
        let smallest = j, l = 2*j+1, r = 2*j+2;
        if (l < k && heap[l] < heap[smallest]) smallest = l;
        if (r < k && heap[r] < heap[smallest]) smallest = r;
        if (smallest === j) break;
        [heap[j], heap[smallest]] = [heap[smallest], heap[j]]; j = smallest;
      }
    }
  }
  return heap[0];
}`,
    explanation: "Keep a min-heap of k elements. If current > heap min, replace and re-heapify. Final heap[0] is kth largest.",
    timeComplex: "O(n log k)", spaceComplex: "O(k)",
    username: "@rahul_dev", runtime: 76, memory: 53.5, beats: 82,
  },
];

async function main() {
  console.log(`Seeding ${solutions.length} solutions for problems 26-50...`);

  const problemIds = [...new Set(solutions.map((s) => s.problemId))];
  const deleted = await prisma.intelSolution.deleteMany({
    where: { problemId: { in: problemIds } },
  });
  console.log(`Deleted ${deleted.count} existing solutions for problems ${problemIds.join(", ")}`);

  await prisma.intelSolution.createMany({ data: solutions });
  console.log("Done seeding chunk B solutions.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

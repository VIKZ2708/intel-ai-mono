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
  // 51. Insert Interval
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 51, solutionType: "editorial", language: "javascript",
    approach: "Linear Scan — Three Phases",
    code: `function insert(intervals, newInterval) {
  const res = [];
  let i = 0, n = intervals.length;
  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < n) res.push(intervals[i++]);
  return res;
}`,
    explanation: "Three phases: (1) add all intervals ending before newInterval starts; (2) merge all overlapping intervals with newInterval; (3) add all remaining intervals. O(n) time.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 51, solutionType: "editorial", language: "python",
    approach: "Linear Scan — Three Phases",
    code: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    res, i, n = [], 0, len(intervals)
    while i < n and intervals[i][1] < newInterval[0]:
        res.append(intervals[i]); i += 1
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    res.append(newInterval)
    res.extend(intervals[i:])
    return res`,
    explanation: "Pass 1 collects non-overlapping left intervals. Pass 2 merges overlapping ones into newInterval. Pass 3 appends remaining.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 51, solutionType: "community", language: "python",
    approach: "Binary search insertion then merge",
    code: `import bisect

def insert(intervals, newInterval):
    intervals.append(newInterval)
    intervals.sort()
    res = [intervals[0]]
    for s, e in intervals[1:]:
        if s <= res[-1][1]:
            res[-1][1] = max(res[-1][1], e)
        else:
            res.append([s, e])
    return res`,
    explanation: "Append and sort, then merge overlaps in one pass — simple but O(n log n).",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 52, memory: 17.2, beats: 78,
  },
  {
    problemId: 51, solutionType: "community", language: "javascript",
    approach: "Reduce merge",
    code: `function insert(intervals, newInterval) {
  const all = [...intervals, newInterval].sort((a,b) => a[0]-b[0]);
  return all.reduce((acc, cur) => {
    const last = acc[acc.length - 1];
    if (last && cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
    else acc.push([...cur]);
    return acc;
  }, []);
}`,
    explanation: "Append newInterval, sort, then reduce to merge overlapping intervals.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 62, memory: 50.3, beats: 76,
  },

  // ─────────────────────────────────────────────────────────────
  // 52. Non-overlapping Intervals
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 52, solutionType: "editorial", language: "javascript",
    approach: "Greedy — Sort by End Time",
    code: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, prevEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= prevEnd) prevEnd = end;
    else count++;
  }
  return count;
}`,
    explanation: "Sort by end time. Greedily keep intervals with earliest end (so future intervals have the most room). Count overlaps where start < prevEnd.",
    timeComplex: "O(n log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 52, solutionType: "editorial", language: "python",
    approach: "Greedy — Sort by End Time",
    code: `def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[1])
    count, prev_end = 0, float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            count += 1
    return count`,
    explanation: "Sort by end. Keep greedy — if no overlap extend the boundary; otherwise remove current (count++).",
    timeComplex: "O(n log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 52, solutionType: "community", language: "python",
    approach: "Count max non-overlapping (LIS variant)",
    code: `def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x: x[1])
    keep, end = 0, float('-inf')
    for s, e in intervals:
        if s >= end:
            keep += 1; end = e
    return len(intervals) - keep`,
    explanation: "Count max non-overlapping intervals (greedy), answer = total - kept.",
    timeComplex: "O(n log n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 320, memory: 31.5, beats: 82,
  },
  {
    problemId: 52, solutionType: "community", language: "javascript",
    approach: "Sort by start, compare with last kept",
    code: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let remove = 0, prevEnd = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      remove++;
      prevEnd = Math.min(prevEnd, intervals[i][1]);
    } else {
      prevEnd = intervals[i][1];
    }
  }
  return remove;
}`,
    explanation: "Sort by start. When overlap found, keep the one with smaller end (greedy) and count removal.",
    timeComplex: "O(n log n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 80, memory: 55.2, beats: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // 53. Gas Station
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 53, solutionType: "editorial", language: "javascript",
    approach: "Greedy — One Pass",
    code: `function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) { start = i + 1; tank = 0; }
  }
  return total >= 0 ? start : -1;
}`,
    explanation: "If total gas >= total cost a solution exists (guaranteed unique). Greedily find the start: whenever the tank goes negative, the start must be after current index. Reset tank and try from i+1.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 53, solutionType: "editorial", language: "python",
    approach: "Greedy — One Pass",
    code: `def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:
    total = tank = start = 0
    for i, (g, c) in enumerate(zip(gas, cost)):
        diff = g - c
        total += diff
        tank += diff
        if tank < 0:
            start = i + 1
            tank = 0
    return start if total >= 0 else -1`,
    explanation: "Track total and running tank. Reset start whenever tank goes negative.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 53, solutionType: "community", language: "python",
    approach: "Brute force O(n²)",
    code: `def canCompleteCircuit(gas, cost):
    n = len(gas)
    for start in range(n):
        tank = 0
        for i in range(n):
            j = (start + i) % n
            tank += gas[j] - cost[j]
            if tank < 0: break
        else:
            return start
    return -1`,
    explanation: "Try every starting station. O(n²) — good for small inputs or understanding the problem.",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 280, memory: 16.8, beats: 62,
  },
  {
    problemId: 53, solutionType: "community", language: "javascript",
    approach: "Prefix sum analysis",
    code: `function canCompleteCircuit(gas, cost) {
  const diff = gas.map((g, i) => g - cost[i]);
  if (diff.reduce((a, b) => a + b) < 0) return -1;
  let min = 0, sum = 0, minIdx = 0;
  for (let i = 0; i < diff.length; i++) {
    sum += diff[i];
    if (sum < min) { min = sum; minIdx = i; }
  }
  return (minIdx + 1) % diff.length;
}`,
    explanation: "Find minimum prefix sum index — starting one past that guarantees enough gas to complete the circuit.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 60, memory: 52.0, beats: 86,
  },

  // ─────────────────────────────────────────────────────────────
  // 54. Partition Labels
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 54, solutionType: "editorial", language: "javascript",
    approach: "Last Occurrence + Greedy Expand",
    code: `function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const res = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) { res.push(end - start + 1); start = end + 1; }
  }
  return res;
}`,
    explanation: "Record last occurrence of each character. Scan left to right expanding the current partition end to include all occurrences of characters seen. When i reaches end, the partition is complete.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 54, solutionType: "editorial", language: "python",
    approach: "Last Occurrence + Greedy Expand",
    code: `def partitionLabels(s: str) -> list[int]:
    last = {c: i for i, c in enumerate(s)}
    res, start, end = [], 0, 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            res.append(end - start + 1)
            start = end + 1
    return res`,
    explanation: "Map each char to its last index. Expand partition end as we encounter chars. Partition closes when i == end.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 54, solutionType: "community", language: "python",
    approach: "Interval merge approach",
    code: `def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}
    intervals = [(i, last[c]) for i, c in enumerate(s)]
    intervals.sort()
    merged, res = [intervals[0]], []
    for s2, e2 in intervals[1:]:
        if s2 <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], e2))
        else:
            merged.append((s2, e2))
    return [e - s + 1 for s, e in merged]`,
    explanation: "Build intervals from each char's first to last occurrence, then merge overlapping intervals.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 36, memory: 16.7, beats: 86,
  },
  {
    problemId: 54, solutionType: "community", language: "javascript",
    approach: "Two pointer window",
    code: `function partitionLabels(s) {
  const last = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i)-97] = i;
  const res = []; let lo = 0, hi = 0;
  for (let i = 0; i < s.length; i++) {
    hi = Math.max(hi, last[s.charCodeAt(i)-97]);
    if (i === hi) { res.push(hi - lo + 1); lo = hi + 1; }
  }
  return res;
}`,
    explanation: "Use a 26-element array for O(1) last-occurrence lookup per char.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 52, memory: 48.5, beats: 91,
  },

  // ─────────────────────────────────────────────────────────────
  // 55. House Robber II
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 55, solutionType: "editorial", language: "javascript",
    approach: "Two Linear DP Subproblems",
    code: `function rob(nums) {
  if (nums.length === 1) return nums[0];
  function robLinear(arr) {
    let prev2 = 0, prev1 = 0;
    for (const n of arr) { const cur = Math.max(prev1, prev2 + n); prev2 = prev1; prev1 = cur; }
    return prev1;
  }
  return Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
}`,
    explanation: "Since houses form a circle, either include house 0 (exclude last) or exclude house 0 (include last). Run linear House Robber I on both sub-arrays and take the max.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 55, solutionType: "editorial", language: "python",
    approach: "Two Linear DP Subproblems",
    code: `def rob(nums: list[int]) -> int:
    if len(nums) == 1: return nums[0]
    def rob_linear(arr):
        prev2 = prev1 = 0
        for n in arr:
            prev2, prev1 = prev1, max(prev1, prev2 + n)
        return prev1
    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))`,
    explanation: "Split circular array into two linear sub-problems, solve each with O(1) space DP.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 55, solutionType: "community", language: "python",
    approach: "DP with explicit arrays",
    code: `def rob(nums):
    if len(nums) == 1: return nums[0]
    def dp(a):
        if not a: return 0
        if len(a) == 1: return a[0]
        t = [0] * len(a)
        t[0] = a[0]; t[1] = max(a[0], a[1])
        for i in range(2, len(a)):
            t[i] = max(t[i-1], t[i-2] + a[i])
        return t[-1]
    return max(dp(nums[:-1]), dp(nums[1:]))`,
    explanation: "Explicit DP table makes the recurrence visible for learning purposes.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 36, memory: 16.5, beats: 84,
  },
  {
    problemId: 55, solutionType: "community", language: "javascript",
    approach: "Reduce helper",
    code: `function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  const helper = (lo, hi) => nums.slice(lo, hi+1).reduce(
    ([p2, p1], x) => [p1, Math.max(p1, p2 + x)], [0, 0]
  )[1];
  return Math.max(helper(0, n-2), helper(1, n-1));
}`,
    explanation: "Functional reduce for the linear DP — compact and idiomatic JS.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 48, memory: 48.8, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 56. Maximum Product Subarray
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 56, solutionType: "editorial", language: "javascript",
    approach: "Track Min & Max Products",
    code: `function maxProduct(nums) {
  let res = nums[0], curMin = 1, curMax = 1;
  for (const n of nums) {
    if (n === 0) { curMin = curMax = 1; res = Math.max(res, 0); continue; }
    const tmp = curMax * n;
    curMax = Math.max(n, curMax * n, curMin * n);
    curMin = Math.min(n, tmp, curMin * n);
    res = Math.max(res, curMax);
  }
  return res;
}`,
    explanation: "Track both max and min product ending here — a negative can flip min to max. Reset both to 1 on zero.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 56, solutionType: "editorial", language: "python",
    approach: "Track Min & Max Products",
    code: `def maxProduct(nums: list[int]) -> int:
    res = cur_max = cur_min = nums[0]
    for n in nums[1:]:
        candidates = (n, cur_max * n, cur_min * n)
        cur_max, cur_min = max(candidates), min(candidates)
        res = max(res, cur_max)
    return res`,
    explanation: "Evaluate all three candidates each step: start fresh, extend max, extend min (negative flip).",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 56, solutionType: "community", language: "python",
    approach: "Forward and reverse scan",
    code: `def maxProduct(nums):
    res, prod = max(nums), 1
    for n in nums:
        prod = prod * n if prod else n
        res = max(res, prod)
        if prod == 0: prod = 1
    prod = 1
    for n in reversed(nums):
        prod = prod * n if prod else n
        res = max(res, prod)
        if prod == 0: prod = 1
    return res`,
    explanation: "Scan left-to-right and right-to-left resetting on zero — handles odd number of negatives.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 62, memory: 16.8, beats: 87,
  },
  {
    problemId: 56, solutionType: "community", language: "javascript",
    approach: "Prefix and suffix product scan",
    code: `function maxProduct(nums) {
  let res = -Infinity, pre = 1, suf = 1, n = nums.length;
  for (let i = 0; i < n; i++) {
    pre = (pre || 1) * nums[i];
    suf = (suf || 1) * nums[n - 1 - i];
    res = Math.max(res, pre, suf);
  }
  return res;
}`,
    explanation: "Simultaneously compute prefix and suffix products, resetting on zero. Max of both covers all cases.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 54, memory: 49.3, beats: 92,
  },

  // ─────────────────────────────────────────────────────────────
  // 57. Decode Ways
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 57, solutionType: "editorial", language: "javascript",
    approach: "Dynamic Programming",
    code: `function numDecodings(s) {
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] !== '0' ? 1 : 0;
  for (let i = 2; i <= n; i++) {
    const one = Number(s[i - 1]);
    const two = Number(s.slice(i - 2, i));
    if (one >= 1) dp[i] += dp[i - 1];
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }
  return dp[n];
}`,
    explanation: "dp[i] = ways to decode s[0..i-1]. Single digit contributes dp[i-1] if non-zero; two-digit contributes dp[i-2] if in range 10-26.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 57, solutionType: "editorial", language: "python",
    approach: "Dynamic Programming — Space Optimised",
    code: `def numDecodings(s: str) -> int:
    if s[0] == '0': return 0
    prev2, prev1 = 1, 1
    for i in range(1, len(s)):
        cur = 0
        if s[i] != '0': cur += prev1
        two = int(s[i-1:i+1])
        if 10 <= two <= 26: cur += prev2
        prev2, prev1 = prev1, cur
    return prev1`,
    explanation: "O(1) space DP: only keep last two values since dp[i] depends only on dp[i-1] and dp[i-2].",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 57, solutionType: "community", language: "python",
    approach: "Memoised recursion",
    code: `from functools import lru_cache

def numDecodings(s):
    @lru_cache(maxsize=None)
    def dp(i):
        if i == len(s): return 1
        if s[i] == '0': return 0
        res = dp(i + 1)
        if i + 1 < len(s) and int(s[i:i+2]) <= 26:
            res += dp(i + 2)
        return res
    return dp(0)`,
    explanation: "Top-down recursion with memoisation — intuitive and equivalent to bottom-up DP.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 36, memory: 16.8, beats: 88,
  },
  {
    problemId: 57, solutionType: "community", language: "javascript",
    approach: "O(1) space two-variable DP",
    code: `function numDecodings(s) {
  if (s[0] === '0') return 0;
  let [p2, p1] = [1, 1];
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== '0') cur += p1;
    const two = +s.slice(i-1, i+1);
    if (two >= 10 && two <= 26) cur += p2;
    [p2, p1] = [p1, cur];
  }
  return p1;
}`,
    explanation: "Rolling two variables instead of a full dp array — O(1) extra space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 50, memory: 48.5, beats: 91,
  },

  // ─────────────────────────────────────────────────────────────
  // 58. Max Area of Island
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 58, solutionType: "editorial", language: "javascript",
    approach: "DFS — Mark and Count",
    code: `function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length;
  let max = 0;
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || !grid[r][c]) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c]) max = Math.max(max, dfs(r, c));
  return max;
}`,
    explanation: "DFS from each unvisited land cell. Mark cell 0 to avoid revisiting. Return count of connected cells. Track global max.",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
  },
  {
    problemId: 58, solutionType: "editorial", language: "python",
    approach: "DFS — Mark and Count",
    code: `def maxAreaOfIsland(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or not grid[r][c]:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)
    return max(dfs(r, c) for r in range(m) for c in range(n) if grid[r][c]) or 0`,
    explanation: "DFS in-place marks visited cells. One-liner max using generator expression.",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
  },
  {
    problemId: 58, solutionType: "community", language: "python",
    approach: "BFS with queue",
    code: `from collections import deque

def maxAreaOfIsland(grid):
    m, n = len(grid), len(grid[0])
    res = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c]:
                area, q = 0, deque([(r, c)])
                grid[r][c] = 0
                while q:
                    x, y = q.popleft(); area += 1
                    for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                        nx, ny = x+dx, y+dy
                        if 0 <= nx < m and 0 <= ny < n and grid[nx][ny]:
                            grid[nx][ny] = 0; q.append((nx, ny))
                res = max(res, area)
    return res`,
    explanation: "BFS alternative: iterative queue-based island flood-fill.",
    timeComplex: "O(m·n)", spaceComplex: "O(min(m,n))",
    username: "@priya_s", runtime: 120, memory: 18.5, beats: 78,
  },
  {
    problemId: 58, solutionType: "community", language: "javascript",
    approach: "Union-Find",
    code: `function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length;
  const parent = Array.from({length: m*n}, (_, i) => i);
  const size = new Array(m*n).fill(1);
  const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (a, b) => {
    a = find(a); b = find(b);
    if (a === b) return;
    if (size[a] < size[b]) [a, b] = [b, a];
    parent[b] = a; size[a] += size[b];
  };
  let max = 0;
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c]) {
        if (r+1 < m && grid[r+1][c]) union(r*n+c, (r+1)*n+c);
        if (c+1 < n && grid[r][c+1]) union(r*n+c, r*n+c+1);
        max = Math.max(max, size[find(r*n+c)]);
      }
  return max;
}`,
    explanation: "Union-Find groups connected land cells. Max component size = max island area.",
    timeComplex: "O(m·n α(m·n))", spaceComplex: "O(m·n)",
    username: "@rahul_dev", runtime: 78, memory: 56.2, beats: 76,
  },

  // ─────────────────────────────────────────────────────────────
  // 59. Pacific Atlantic Water Flow
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 59, solutionType: "editorial", language: "javascript",
    approach: "Reverse BFS from Ocean Borders",
    code: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const bfs = (starts) => {
    const visited = Array.from({length: m}, () => new Array(n).fill(false));
    const q = [...starts];
    for (const [r, c] of starts) visited[r][c] = true;
    while (q.length) {
      const [r, c] = q.shift();
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r+dr, nc = c+dc;
        if (nr>=0 && nr<m && nc>=0 && nc<n && !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          visited[nr][nc] = true; q.push([nr, nc]);
        }
      }
    }
    return visited;
  };
  const pac = bfs([...Array.from({length:m},(_,r)=>[r,0]), ...Array.from({length:n},(_,c)=>[0,c])]);
  const atl = bfs([...Array.from({length:m},(_,r)=>[r,n-1]), ...Array.from({length:n},(_,c)=>[m-1,c])]);
  const res = [];
  for (let r=0;r<m;r++) for (let c=0;c<n;c++) if (pac[r][c] && atl[r][c]) res.push([r,c]);
  return res;
}`,
    explanation: "BFS backwards from ocean borders (water flows uphill in reverse). Any cell reachable from both Pacific and Atlantic seeds is an answer.",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
  },
  {
    problemId: 59, solutionType: "editorial", language: "python",
    approach: "DFS from Ocean Borders",
    code: `def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:
    m, n = len(heights), len(heights[0])
    pac, atl = set(), set()
    def dfs(r, c, visited, prev_h):
        if (r,c) in visited or r<0 or r>=m or c<0 or c>=n or heights[r][c] < prev_h:
            return
        visited.add((r,c))
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc, visited, heights[r][c])
    for r in range(m):
        dfs(r, 0, pac, heights[r][0]); dfs(r, n-1, atl, heights[r][n-1])
    for c in range(n):
        dfs(0, c, pac, heights[0][c]); dfs(m-1, c, atl, heights[m-1][c])
    return [[r,c] for r in range(m) for c in range(n) if (r,c) in pac and (r,c) in atl]`,
    explanation: "DFS in reverse from each ocean edge. Intersection of reachable sets = answer.",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
  },
  {
    problemId: 59, solutionType: "community", language: "python",
    approach: "BFS with deque",
    code: `from collections import deque

def pacificAtlantic(heights):
    m, n = len(heights), len(heights[0])
    def bfs(starts):
        q = deque(starts)
        vis = set(starts)
        while q:
            r, c = q.popleft()
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r+dr, c+dc
                if 0<=nr<m and 0<=nc<n and (nr,nc) not in vis and heights[nr][nc] >= heights[r][c]:
                    vis.add((nr,nc)); q.append((nr,nc))
        return vis
    pac = bfs([(r,0) for r in range(m)] + [(0,c) for c in range(n)])
    atl = bfs([(r,n-1) for r in range(m)] + [(m-1,c) for c in range(n)])
    return list(pac & atl)`,
    explanation: "BFS from border cells of each ocean. Return intersection.",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
    username: "@priya_s", runtime: 162, memory: 20.8, beats: 84,
  },
  {
    problemId: 59, solutionType: "community", language: "javascript",
    approach: "DFS with visited sets",
    code: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const pac = Array.from({length:m}, ()=>new Array(n).fill(false));
  const atl = Array.from({length:m}, ()=>new Array(n).fill(false));
  const dfs = (r, c, vis, prev) => {
    if (r<0||r>=m||c<0||c>=n||vis[r][c]||heights[r][c]<prev) return;
    vis[r][c]=true;
    for (const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]) dfs(r+dr,c+dc,vis,heights[r][c]);
  };
  for (let r=0;r<m;r++) { dfs(r,0,pac,heights[r][0]); dfs(r,n-1,atl,heights[r][n-1]); }
  for (let c=0;c<n;c++) { dfs(0,c,pac,heights[0][c]); dfs(m-1,c,atl,heights[m-1][c]); }
  const res=[];
  for (let r=0;r<m;r++) for (let c=0;c<n;c++) if (pac[r][c]&&atl[r][c]) res.push([r,c]);
  return res;
}`,
    explanation: "DFS from each ocean's border edges with height >= prev constraint (reverse flow).",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
    username: "@rahul_dev", runtime: 82, memory: 56.8, beats: 82,
  },

  // ─────────────────────────────────────────────────────────────
  // 60. Remove Nth Node From End of List
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 60, solutionType: "editorial", language: "javascript",
    approach: "Two Pointers — Gap of N",
    code: `function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = dummy, slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  return dummy.next;
}`,
    explanation: "Advance fast pointer n+1 steps ahead. Move both until fast is null. Slow is now at the node before the one to remove.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 60, solutionType: "editorial", language: "python",
    approach: "Two Pointers — Gap of N",
    code: `def removeNthFromEnd(head, n: int):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        fast = fast.next; slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
    explanation: "Move fast n+1 ahead, then advance both. Slow lands on predecessor of target node.",
    timeComplex: "O(L)", spaceComplex: "O(1)",
  },
  {
    problemId: 60, solutionType: "community", language: "python",
    approach: "Collect nodes then relink",
    code: `def removeNthFromEnd(head, n):
    nodes = []
    cur = head
    while cur:
        nodes.append(cur); cur = cur.next
    idx = len(nodes) - n
    if idx == 0: return head.next
    nodes[idx-1].next = nodes[idx].next
    return head`,
    explanation: "Collect all nodes into a list, then directly relink around the target index.",
    timeComplex: "O(L)", spaceComplex: "O(L)",
    username: "@priya_s", runtime: 30, memory: 17.5, beats: 86,
  },
  {
    problemId: 60, solutionType: "community", language: "javascript",
    approach: "Count length then splice",
    code: `function removeNthFromEnd(head, n) {
  let len = 0;
  for (let c = head; c; c = c.next) len++;
  const dummy = { next: head };
  let cur = dummy;
  for (let i = 0; i < len - n; i++) cur = cur.next;
  cur.next = cur.next.next;
  return dummy.next;
}`,
    explanation: "Two-pass: first count length, then walk to (len-n)-th node and unlink the next.",
    timeComplex: "O(L)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 46, memory: 49.2, beats: 85,
  },

  // ─────────────────────────────────────────────────────────────
  // 61. Reorder List
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 61, solutionType: "editorial", language: "javascript",
    approach: "Find Middle + Reverse + Merge",
    code: `function reorderList(head) {
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null, cur = slow.next; slow.next = null;
  while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt; }
  let l1 = head, l2 = prev;
  while (l2) { const n1=l1.next, n2=l2.next; l1.next=l2; l2.next=n1; l1=n1; l2=n2; }
}`,
    explanation: "Three steps: find middle with slow/fast pointers, reverse second half, interleave two halves. All O(n) time, O(1) space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 61, solutionType: "editorial", language: "python",
    approach: "Find Middle + Reverse + Merge",
    code: `def reorderList(head) -> None:
    slow, fast = head, head
    while fast.next and fast.next.next:
        slow = slow.next; fast = fast.next.next
    prev, cur = None, slow.next; slow.next = None
    while cur:
        nxt = cur.next; cur.next = prev; prev = cur; cur = nxt
    l1, l2 = head, prev
    while l2:
        n1, n2 = l1.next, l2.next
        l1.next = l2; l2.next = n1
        l1 = n1; l2 = n2`,
    explanation: "Classic in-place reorder: middle → reverse second half → interleave.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 61, solutionType: "community", language: "python",
    approach: "Deque two-pointer rebuild",
    code: `from collections import deque

def reorderList(head) -> None:
    dq = deque()
    cur = head
    while cur: dq.append(cur); cur = cur.next
    toggle = True; prev = None
    while dq:
        node = dq.popleft() if toggle else dq.pop()
        if prev: prev.next = node
        prev = node; toggle = not toggle
    if prev: prev.next = None`,
    explanation: "Deque alternately pops from left and right to rebuild interleaved list.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 64, memory: 26.0, beats: 80,
  },
  {
    problemId: 61, solutionType: "community", language: "javascript",
    approach: "Array index-based relinking",
    code: `function reorderList(head) {
  const nodes = [];
  for (let c=head; c; c=c.next) nodes.push(c);
  let lo=0, hi=nodes.length-1;
  while (lo < hi) {
    nodes[lo].next = nodes[hi]; lo++;
    if (lo===hi) break;
    nodes[hi].next = nodes[lo]; hi--;
  }
  nodes[lo].next = null;
}`,
    explanation: "Collect nodes into array then two-pointer relink — O(n) space but very clear.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 70, memory: 58.5, beats: 78,
  },

  // ─────────────────────────────────────────────────────────────
  // 62. Add Two Numbers
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 62, solutionType: "editorial", language: "javascript",
    approach: "Simulate Addition with Carry",
    code: `function addTwoNumbers(l1, l2) {
  const dummy = { next: null };
  let cur = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    cur.next = { val: sum % 10, next: null };
    cur = cur.next;
    l1 = l1?.next; l2 = l2?.next;
  }
  return dummy.next;
}`,
    explanation: "Simulate digit-by-digit addition with carry. Loop continues as long as either list has nodes or carry remains. Handles lists of different lengths.",
    timeComplex: "O(max(m,n))", spaceComplex: "O(max(m,n))",
  },
  {
    problemId: 62, solutionType: "editorial", language: "python",
    approach: "Simulate Addition with Carry",
    code: `def addTwoNumbers(l1, l2):
    dummy = cur = ListNode(0)
    carry = 0
    while l1 or l2 or carry:
        val = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry
        carry, digit = divmod(val, 10)
        cur.next = ListNode(digit); cur = cur.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`,
    explanation: "Elementary addition: sum digits + carry, propagate carry, advance pointers.",
    timeComplex: "O(max(m,n))", spaceComplex: "O(max(m,n))",
  },
  {
    problemId: 62, solutionType: "community", language: "python",
    approach: "Convert to int, add, convert back",
    code: `def addTwoNumbers(l1, l2):
    def to_int(node):
        num, mult = 0, 1
        while node: num += node.val * mult; mult *= 10; node = node.next
        return num
    total = to_int(l1) + to_int(l2)
    dummy = cur = ListNode(0)
    if total == 0: return ListNode(0)
    while total:
        cur.next = ListNode(total % 10); cur = cur.next; total //= 10
    return dummy.next`,
    explanation: "Extract numbers from reversed linked lists (LSB first), add, convert result back to list.",
    timeComplex: "O(max(m,n))", spaceComplex: "O(max(m,n))",
    username: "@priya_s", runtime: 52, memory: 18.2, beats: 82,
  },
  {
    problemId: 62, solutionType: "community", language: "javascript",
    approach: "BigInt for arbitrary precision",
    code: `function addTwoNumbers(l1, l2) {
  const toInt = (n) => { let s='', m=1n; while(n){s=BigInt(n.val)*m+BigInt(s||0); m*=10n; n=n.next;} return s||0n; };
  let sum = toInt(l1) + toInt(l2);
  if (!sum) return { val: 0, next: null };
  const dummy = { next: null }; let cur = dummy;
  while (sum) { cur.next={val:Number(sum%10n),next:null}; cur=cur.next; sum/=10n; }
  return dummy.next;
}`,
    explanation: "Use BigInt for precise arithmetic on very large numbers stored in linked lists.",
    timeComplex: "O(max(m,n))", spaceComplex: "O(max(m,n))",
    username: "@rahul_dev", runtime: 62, memory: 51.0, beats: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // 63. Rotate Image
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 63, solutionType: "editorial", language: "javascript",
    approach: "Transpose then Reverse Rows",
    code: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++)
    for (let j = i+1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  for (const row of matrix) row.reverse();
}`,
    explanation: "Rotate 90° clockwise = transpose (swap across main diagonal) + reverse each row. Both O(n²) in-place.",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
  },
  {
    problemId: 63, solutionType: "editorial", language: "python",
    approach: "Transpose then Reverse Rows",
    code: `def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()`,
    explanation: "In-place 90° CW rotation: transpose then reverse each row.",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
  },
  {
    problemId: 63, solutionType: "community", language: "python",
    approach: "Layer-by-layer four-way swap",
    code: `def rotate(matrix):
    n = len(matrix)
    for layer in range(n // 2):
        first, last = layer, n - 1 - layer
        for i in range(first, last):
            offset = i - first
            top = matrix[first][i]
            matrix[first][i] = matrix[last-offset][first]
            matrix[last-offset][first] = matrix[last][last-offset]
            matrix[last][last-offset] = matrix[i][last]
            matrix[i][last] = top`,
    explanation: "Four-way rotation by processing concentric layers, cycling four positions simultaneously.",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 34, memory: 16.5, beats: 88,
  },
  {
    problemId: 63, solutionType: "community", language: "javascript",
    approach: "Reverse diagonally then reverse columns",
    code: `function rotate(matrix) {
  const n = matrix.length;
  // reverse anti-diagonal (transpose along anti-diagonal)
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n - i - 1; j++) {
      const tmp = matrix[i][j];
      matrix[i][j] = matrix[n-1-j][n-1-i];
      matrix[n-1-j][n-1-i] = tmp;
    }
  // reverse each row
  for (let i = 0; i < n/2; i++) [matrix[i], matrix[n-1-i]] = [matrix[n-1-i], matrix[i]];
}`,
    explanation: "Anti-diagonal transpose + reverse rows = 90° CW rotation (alternative decomposition).",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 50, memory: 48.9, beats: 85,
  },

  // ─────────────────────────────────────────────────────────────
  // 64. Spiral Matrix
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 64, solutionType: "editorial", language: "javascript",
    approach: "Shrinking Boundaries",
    code: `function spiralOrder(matrix) {
  const res = [];
  let top=0, bottom=matrix.length-1, left=0, right=matrix[0].length-1;
  while (top <= bottom && left <= right) {
    for (let c=left; c<=right; c++) res.push(matrix[top][c]); top++;
    for (let r=top; r<=bottom; r++) res.push(matrix[r][right]); right--;
    if (top <= bottom) { for (let c=right; c>=left; c--) res.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r=bottom; r>=top; r--) res.push(matrix[r][left]); left++; }
  }
  return res;
}`,
    explanation: "Maintain four boundaries (top, bottom, left, right). Each pass collects one ring and shrinks the boundaries inward.",
    timeComplex: "O(m·n)", spaceComplex: "O(1)",
  },
  {
    problemId: 64, solutionType: "editorial", language: "python",
    approach: "Shrinking Boundaries",
    code: `def spiralOrder(matrix: list[list[int]]) -> list[int]:
    res = []
    top, bottom, left, right = 0, len(matrix)-1, 0, len(matrix[0])-1
    while top <= bottom and left <= right:
        for c in range(left, right+1): res.append(matrix[top][c]); top += 1
        for r in range(top, bottom+1): res.append(matrix[r][right]); right -= 1
        if top <= bottom:
            for c in range(right, left-1, -1): res.append(matrix[bottom][c]); bottom -= 1
        if left <= right:
            for r in range(bottom, top-1, -1): res.append(matrix[r][left]); left += 1
    return res`,
    explanation: "Four boundary pointers shrink as each layer is consumed.",
    timeComplex: "O(m·n)", spaceComplex: "O(1)",
  },
  {
    problemId: 64, solutionType: "community", language: "python",
    approach: "Direction rotation",
    code: `def spiralOrder(matrix):
    res, dirs = [], [(0,1),(1,0),(0,-1),(-1,0)]
    r, c, d = 0, 0, 0
    visited = [[False]*len(matrix[0]) for _ in matrix]
    for _ in range(len(matrix)*len(matrix[0])):
        res.append(matrix[r][c]); visited[r][c] = True
        nr, nc = r+dirs[d][0], c+dirs[d][1]
        if not (0<=nr<len(matrix) and 0<=nc<len(matrix[0]) and not visited[nr][nc]):
            d = (d+1) % 4; nr, nc = r+dirs[d][0], c+dirs[d][1]
        r, c = nr, nc
    return res`,
    explanation: "Simulate movement with direction rotation when hitting boundary or visited cell.",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
    username: "@priya_s", runtime: 30, memory: 16.8, beats: 87,
  },
  {
    problemId: 64, solutionType: "community", language: "javascript",
    approach: "Pop-layer approach",
    code: `function spiralOrder(matrix) {
  const res = [];
  while (matrix.length) {
    res.push(...matrix.shift());
    for (const row of matrix) { res.push(row.pop()); }
    if (matrix.length) res.push(...matrix.pop().reverse());
    for (const row of [...matrix].reverse()) { res.push(row.shift()); }
  }
  return res;
}`,
    explanation: "Destructively peel layers: shift top row, pop right col, pop+reverse bottom, shift left col.",
    timeComplex: "O(m·n)", spaceComplex: "O(m·n)",
    username: "@rahul_dev", runtime: 50, memory: 49.5, beats: 83,
  },

  // ─────────────────────────────────────────────────────────────
  // 65. Set Matrix Zeroes
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 65, solutionType: "editorial", language: "javascript",
    approach: "Use First Row/Col as Markers",
    code: `function setZeroes(matrix) {
  const m=matrix.length, n=matrix[0].length;
  let firstRow=false, firstCol=false;
  for (let c=0;c<n;c++) if (!matrix[0][c]) firstRow=true;
  for (let r=0;r<m;r++) if (!matrix[r][0]) firstCol=true;
  for (let r=1;r<m;r++) for (let c=1;c<n;c++) if (!matrix[r][c]) { matrix[r][0]=0; matrix[0][c]=0; }
  for (let r=1;r<m;r++) for (let c=1;c<n;c++) if (!matrix[r][0]||!matrix[0][c]) matrix[r][c]=0;
  if (firstRow) for (let c=0;c<n;c++) matrix[0][c]=0;
  if (firstCol) for (let r=0;r<m;r++) matrix[r][0]=0;
}`,
    explanation: "Use first row and column as O(1) space marker arrays. Save whether first row/col themselves originally had zeros before using them as markers.",
    timeComplex: "O(m·n)", spaceComplex: "O(1)",
  },
  {
    problemId: 65, solutionType: "editorial", language: "python",
    approach: "Use First Row/Col as Markers",
    code: `def setZeroes(matrix: list[list[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row = any(matrix[0][c] == 0 for c in range(n))
    first_col = any(matrix[r][0] == 0 for r in range(m))
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][c] == 0: matrix[r][0] = matrix[0][c] = 0
    for r in range(1, m):
        for c in range(1, n):
            if not matrix[r][0] or not matrix[0][c]: matrix[r][c] = 0
    if first_row:
        for c in range(n): matrix[0][c] = 0
    if first_col:
        for r in range(m): matrix[r][0] = 0`,
    explanation: "O(1) extra space by reusing first row/column as markers after saving their zero-state.",
    timeComplex: "O(m·n)", spaceComplex: "O(1)",
  },
  {
    problemId: 65, solutionType: "community", language: "python",
    approach: "Two-pass with row/col sets",
    code: `def setZeroes(matrix):
    rows, cols = set(), set()
    for r in range(len(matrix)):
        for c in range(len(matrix[0])):
            if matrix[r][c] == 0: rows.add(r); cols.add(c)
    for r in range(len(matrix)):
        for c in range(len(matrix[0])):
            if r in rows or c in cols: matrix[r][c] = 0`,
    explanation: "Collect zero positions first, then zero out entire rows/columns. O(m+n) space.",
    timeComplex: "O(m·n)", spaceComplex: "O(m+n)",
    username: "@priya_s", runtime: 88, memory: 17.5, beats: 84,
  },
  {
    problemId: 65, solutionType: "community", language: "javascript",
    approach: "Sets for zero rows/cols",
    code: `function setZeroes(matrix) {
  const rows = new Set(), cols = new Set();
  for (let r=0;r<matrix.length;r++) for (let c=0;c<matrix[0].length;c++) if (!matrix[r][c]) { rows.add(r); cols.add(c); }
  for (let r=0;r<matrix.length;r++) for (let c=0;c<matrix[0].length;c++) if (rows.has(r)||cols.has(c)) matrix[r][c]=0;
}`,
    explanation: "Readable two-pass approach: collect zero positions, then apply.",
    timeComplex: "O(m·n)", spaceComplex: "O(m+n)",
    username: "@rahul_dev", runtime: 74, memory: 52.8, beats: 82,
  },

  // ─────────────────────────────────────────────────────────────
  // 66. Happy Number
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 66, solutionType: "editorial", language: "javascript",
    approach: "Floyd's Cycle Detection",
    code: `function isHappy(n) {
  const sumSq = (x) => x.toString().split('').reduce((s,d) => s + d*d, 0);
  let slow = n, fast = sumSq(n);
  while (fast !== 1 && fast !== slow) { slow = sumSq(slow); fast = sumSq(sumSq(fast)); }
  return fast === 1;
}`,
    explanation: "Apply slow/fast pointer trick on the digit-sum-of-squares sequence. If it reaches 1, happy. If slow meets fast, there's a cycle — not happy.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 66, solutionType: "editorial", language: "python",
    approach: "Hash Set Cycle Detection",
    code: `def isHappy(n: int) -> bool:
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d)**2 for d in str(n))
    return n == 1`,
    explanation: "Track seen numbers in a set. If n=1 return True; if repeated, cycle detected — return False.",
    timeComplex: "O(log n)", spaceComplex: "O(log n)",
  },
  {
    problemId: 66, solutionType: "community", language: "python",
    approach: "Known cycle members",
    code: `def isHappy(n):
    CYCLE = {4, 16, 37, 58, 89, 145, 42, 20}
    while n not in CYCLE and n != 1:
        n = sum(int(d)**2 for d in str(n))
    return n == 1`,
    explanation: "All non-happy numbers eventually enter the cycle {4,16,37,58,89,145,42,20}. Hard-code the cycle for O(1) space.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 26, memory: 16.0, beats: 94,
  },
  {
    problemId: 66, solutionType: "community", language: "javascript",
    approach: "Set until 1 or revisit",
    code: `function isHappy(n) {
  const next = (x) => String(x).split('').reduce((s,d) => s+d*d, 0);
  const seen = new Set();
  while (n !== 1) { if (seen.has(n)) return false; seen.add(n); n = next(n); }
  return true;
}`,
    explanation: "Loop computing next digit-square-sum, return false on cycle.",
    timeComplex: "O(log n)", spaceComplex: "O(log n)",
    username: "@rahul_dev", runtime: 52, memory: 48.4, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 67. Reverse Bits
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 67, solutionType: "editorial", language: "javascript",
    approach: "Bit Shift Loop",
    code: `function reverseBits(n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res * 2 + (n & 1)) >>> 0;
    n >>>= 1;
  }
  return res >>> 0;
}`,
    explanation: "Shift result left and append LSB of n, then shift n right. Repeat 32 times. Use >>> 0 to keep it unsigned 32-bit.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
  },
  {
    problemId: 67, solutionType: "editorial", language: "python",
    approach: "Integer bit manipulation",
    code: `def reverseBits(n: int) -> int:
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res`,
    explanation: "Shift result left, OR in n's LSB, shift n right. 32 iterations gives reversed bits.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
  },
  {
    problemId: 67, solutionType: "community", language: "python",
    approach: "String reversal",
    code: `def reverseBits(n):
    return int(format(n, '032b')[::-1], 2)`,
    explanation: "Format as 32-bit binary string, reverse it, parse back to int. Pythonic one-liner.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 26, memory: 16.2, beats: 90,
  },
  {
    problemId: 67, solutionType: "community", language: "javascript",
    approach: "Divide and conquer bit reversal",
    code: `function reverseBits(n) {
  n = ((n & 0xFFFF0000) >>> 16) | ((n & 0x0000FFFF) << 16);
  n = ((n & 0xFF00FF00) >>> 8)  | ((n & 0x00FF00FF) << 8);
  n = ((n & 0xF0F0F0F0) >>> 4)  | ((n & 0x0F0F0F0F) << 4);
  n = ((n & 0xCCCCCCCC) >>> 2)  | ((n & 0x33333333) << 2);
  n = ((n & 0xAAAAAAAA) >>> 1)  | ((n & 0x55555555) << 1);
  return n >>> 0;
}`,
    explanation: "Divide and conquer: swap halves, bytes, nibbles, pairs, individual bits via masks.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 50, memory: 48.0, beats: 93,
  },

  // ─────────────────────────────────────────────────────────────
  // 68. Sum of Two Integers
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 68, solutionType: "editorial", language: "javascript",
    approach: "Bit Manipulation — XOR + AND carry",
    code: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
    explanation: "XOR gives sum bits without carry. AND + left shift gives carry. Repeat until no carry. No arithmetic operators needed.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
  },
  {
    problemId: 68, solutionType: "editorial", language: "python",
    approach: "Bit Manipulation — Handle 32-bit with mask",
    code: `def getSum(a: int, b: int) -> int:
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a if b == 0 else ~(a ^ mask)`,
    explanation: "Python integers are arbitrary precision so we mask to 32 bits and handle sign conversion at the end.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
  },
  {
    problemId: 68, solutionType: "community", language: "python",
    approach: "Recursive XOR carry",
    code: `def getSum(a, b):
    mask = 0xFFFFFFFF
    if b == 0: return a if a <= 0x7FFFFFFF else ~(a ^ mask)
    return getSum((a ^ b) & mask, ((a & b) << 1) & mask)`,
    explanation: "Recursive formulation: sum = XOR, carry = AND<<1, base case when carry=0.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 28, memory: 16.0, beats: 92,
  },
  {
    problemId: 68, solutionType: "community", language: "javascript",
    approach: "Iterative with 32-bit mask",
    code: `function getSum(a, b) {
  const MASK = 0xFFFFFFFF, MAX = 0x7FFFFFFF;
  while (b !== 0) {
    [a, b] = [(a ^ b) & MASK, ((a & b) << 1) & MASK];
  }
  return a > MAX ? ~(a ^ MASK) : a;
}`,
    explanation: "Iterative with explicit 32-bit masking and signed conversion at the end.",
    timeComplex: "O(1)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 46, memory: 48.2, beats: 91,
  },

  // ─────────────────────────────────────────────────────────────
  // 69. Generate Parentheses (duplicate of #19 at different DB id)
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 69, solutionType: "editorial", language: "javascript",
    approach: "Backtracking",
    code: `function generateParenthesis(n) {
  const res = [];
  function bt(cur, open, close) {
    if (cur.length === 2*n) { res.push(cur); return; }
    if (open < n) bt(cur+'(', open+1, close);
    if (close < open) bt(cur+')', open, close+1);
  }
  bt('', 0, 0);
  return res;
}`,
    explanation: "Track open and close counts. Add '(' if open < n; add ')' if close < open. All valid combinations are generated without extra checks.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(n)",
  },
  {
    problemId: 69, solutionType: "editorial", language: "python",
    approach: "Backtracking",
    code: `def generateParenthesis(n: int) -> list[str]:
    res = []
    def bt(cur, o, c):
        if len(cur) == 2 * n: res.append(cur); return
        if o < n: bt(cur+'(', o+1, c)
        if c < o: bt(cur+')', o, c+1)
    bt('', 0, 0)
    return res`,
    explanation: "Recursive backtracking: add '(' while open < n, add ')' while close < open.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(n)",
  },
  {
    problemId: 69, solutionType: "community", language: "python",
    approach: "DP build from smaller results",
    code: `def generateParenthesis(n):
    dp = [[] for _ in range(n+1)]
    dp[0] = ['']
    for i in range(1, n+1):
        for j in range(i):
            for left in dp[j]:
                for right in dp[i-1-j]:
                    dp[i].append(f'({left}){right}')
    return dp[n]`,
    explanation: "DP: every valid combination = '(' + dp[j] + ')' + dp[i-1-j] for all j. Build bottom-up.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(4ⁿ/√n)",
    username: "@priya_s", runtime: 32, memory: 17.0, beats: 86,
  },
  {
    problemId: 69, solutionType: "community", language: "javascript",
    approach: "Iterative BFS",
    code: `function generateParenthesis(n) {
  const q = [['', 0, 0]], res = [];
  while (q.length) {
    const [cur, o, c] = q.shift();
    if (cur.length === 2*n) { res.push(cur); continue; }
    if (o < n) q.push([cur+'(', o+1, c]);
    if (c < o) q.push([cur+')', o, c+1]);
  }
  return res;
}`,
    explanation: "BFS breadth-first build: same pruning conditions as DFS but uses a queue.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(4ⁿ/√n)",
    username: "@rahul_dev", runtime: 54, memory: 52.1, beats: 84,
  },

  // ─────────────────────────────────────────────────────────────
  // 70. Daily Temperatures (duplicate of #20)
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 70, solutionType: "editorial", language: "javascript",
    approach: "Monotonic Decreasing Stack",
    code: `function dailyTemperatures(temperatures) {
  const n = temperatures.length, res = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length-1]]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}`,
    explanation: "Monotonic stack of indices with decreasing temperatures. When warmer day arrives, pop and record wait days.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 70, solutionType: "editorial", language: "python",
    approach: "Monotonic Decreasing Stack",
    code: `def dailyTemperatures(temperatures: list[int]) -> list[int]:
    res, stack = [0] * len(temperatures), []
    for i, t in enumerate(temperatures):
        while stack and t > temperatures[stack[-1]]:
            j = stack.pop(); res[j] = i - j
        stack.append(i)
    return res`,
    explanation: "Stack stores indices. Pop when current temp is warmer, record i-j days elapsed.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 70, solutionType: "community", language: "python",
    approach: "Right-to-left jump scan",
    code: `def dailyTemperatures(temperatures):
    n = len(temperatures)
    res = [0] * n
    for i in range(n-2, -1, -1):
        j = i + 1
        while j < n and temperatures[j] <= temperatures[i]:
            if res[j] == 0: break
            j += res[j]
        if j < n and temperatures[j] > temperatures[i]:
            res[i] = j - i
    return res`,
    explanation: "Scan right-to-left. Jump forward using already-computed distances to skip cold sequences.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 512, memory: 27.2, beats: 78,
  },
  {
    problemId: 70, solutionType: "community", language: "javascript",
    approach: "Stack storing value+index pairs",
    code: `function dailyTemperatures(temperatures) {
  const res = new Array(temperatures.length).fill(0), st = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (st.length && st[st.length-1][0] < temperatures[i]) {
      const [,j] = st.pop(); res[j] = i - j;
    }
    st.push([temperatures[i], i]);
  }
  return res;
}`,
    explanation: "Store [temperature, index] pairs on stack for clearer access.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 100, memory: 60.5, beats: 84,
  },

  // ─────────────────────────────────────────────────────────────
  // 71. Evaluate Reverse Polish Notation (duplicate of #18)
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 71, solutionType: "editorial", language: "javascript",
    approach: "Stack",
    code: `function evalRPN(tokens) {
  const s = [];
  const ops = { '+': (a,b)=>a+b, '-': (a,b)=>a-b, '*': (a,b)=>a*b, '/': (a,b)=>Math.trunc(a/b) };
  for (const t of tokens) {
    if (ops[t]) { const b=s.pop(), a=s.pop(); s.push(ops[t](a,b)); }
    else s.push(+t);
  }
  return s[0];
}`,
    explanation: "Push numbers, pop two on operator, apply, push result. Division truncates toward zero.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 71, solutionType: "editorial", language: "python",
    approach: "Stack",
    code: `def evalRPN(tokens: list[str]) -> int:
    stack = []
    for t in tokens:
        if t in '+-*/':
            b, a = stack.pop(), stack.pop()
            if t=='+': stack.append(a+b)
            elif t=='-': stack.append(a-b)
            elif t=='*': stack.append(a*b)
            else: stack.append(int(a/b))
        else: stack.append(int(t))
    return stack[0]`,
    explanation: "Classic RPN stack evaluation. int(a/b) truncates toward zero in Python.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 71, solutionType: "community", language: "python",
    approach: "eval() with substitution",
    code: `def evalRPN(tokens):
    import operator
    ops = {'+': operator.add, '-': operator.sub, '*': operator.mul, '/': lambda a,b: int(a/b)}
    stack = []
    for t in tokens:
        if t in ops: b, a = stack.pop(), stack.pop(); stack.append(ops[t](a,b))
        else: stack.append(int(t))
    return stack[0]`,
    explanation: "Operator dispatch dict for cleaner code — same stack logic.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 50, memory: 17.2, beats: 89,
  },
  {
    problemId: 71, solutionType: "community", language: "javascript",
    approach: "Switch-case dispatch",
    code: `function evalRPN(tokens) {
  const s = [];
  for (const t of tokens) {
    if (isNaN(t)) {
      const [b, a] = [s.pop(), s.pop()];
      switch(t) {
        case '+': s.push(a+b); break; case '-': s.push(a-b); break;
        case '*': s.push(a*b); break; case '/': s.push(Math.trunc(a/b)); break;
      }
    } else s.push(Number(t));
  }
  return s[0];
}`,
    explanation: "isNaN check to distinguish operators from numbers; switch for dispatch.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 56, memory: 50.4, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 72. Permutations
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 72, solutionType: "editorial", language: "javascript",
    approach: "Backtracking with Used Array",
    code: `function permute(nums) {
  const res = [], used = new Array(nums.length).fill(false);
  function bt(path) {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      bt(path);
      used[i] = false; path.pop();
    }
  }
  bt([]);
  return res;
}`,
    explanation: "Backtrack building permutations. Mark numbers as used to avoid repetition. Unmark on backtrack.",
    timeComplex: "O(n·n!)", spaceComplex: "O(n)",
  },
  {
    problemId: 72, solutionType: "editorial", language: "python",
    approach: "Backtracking",
    code: `def permute(nums: list[int]) -> list[list[int]]:
    res = []
    def bt(path, remaining):
        if not remaining: res.append(path); return
        for i, n in enumerate(remaining):
            bt(path + [n], remaining[:i] + remaining[i+1:])
    bt([], nums)
    return res`,
    explanation: "Pass remaining unused elements each recursion. Slice out the chosen element.",
    timeComplex: "O(n·n!)", spaceComplex: "O(n²)",
  },
  {
    problemId: 72, solutionType: "community", language: "python",
    approach: "Heap's algorithm iterative",
    code: `def permute(nums):
    from itertools import permutations
    return [list(p) for p in permutations(nums)]`,
    explanation: "Use Python's built-in itertools.permutations — optimal implementation under the hood.",
    timeComplex: "O(n·n!)", spaceComplex: "O(n·n!)",
    username: "@priya_s", runtime: 40, memory: 17.8, beats: 88,
  },
  {
    problemId: 72, solutionType: "community", language: "javascript",
    approach: "Swap-based in-place backtracking",
    code: `function permute(nums) {
  const res = [];
  function bt(start) {
    if (start === nums.length) { res.push([...nums]); return; }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      bt(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }
  bt(0);
  return res;
}`,
    explanation: "Swap position start with each subsequent position, recurse, swap back. In-place O(1) extra space per level.",
    timeComplex: "O(n·n!)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 60, memory: 52.6, beats: 86,
  },

  // ─────────────────────────────────────────────────────────────
  // 73. Combination Sum II
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 73, solutionType: "editorial", language: "javascript",
    approach: "Backtracking with Dedup",
    code: `function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];
  function bt(start, remain, path) {
    if (remain === 0) { res.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remain) break;
      if (i > start && candidates[i] === candidates[i-1]) continue;
      path.push(candidates[i]);
      bt(i + 1, remain - candidates[i], path);
      path.pop();
    }
  }
  bt(0, target, []);
  return res;
}`,
    explanation: "Sort first. Skip duplicates at the same level (i>start && candidates[i]==candidates[i-1]). Use i+1 since each element can only be used once.",
    timeComplex: "O(2ⁿ)", spaceComplex: "O(n)",
  },
  {
    problemId: 73, solutionType: "editorial", language: "python",
    approach: "Backtracking with Dedup",
    code: `def combinationSum2(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    res = []
    def bt(start, remain, path):
        if remain == 0: res.append(path[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > remain: break
            if i > start and candidates[i] == candidates[i-1]: continue
            path.append(candidates[i])
            bt(i+1, remain - candidates[i], path)
            path.pop()
    bt(0, target, [])
    return res`,
    explanation: "Sort, then skip duplicate candidates at the same recursion level to avoid duplicate combinations.",
    timeComplex: "O(2ⁿ)", spaceComplex: "O(n)",
  },
  {
    problemId: 73, solutionType: "community", language: "python",
    approach: "Counter-based dedup",
    code: `from collections import Counter

def combinationSum2(candidates, target):
    count = sorted(Counter(candidates).items())
    res = []
    def bt(i, remain, path):
        if remain == 0: res.append(path[:]); return
        if i == len(count): return
        num, cnt = count[i]
        for k in range(min(cnt, remain // num) + 1):
            bt(i+1, remain - k*num, path + [num]*k)
    bt(0, target, [])
    return res`,
    explanation: "Group duplicates by count. Choose 0..min(cnt, remain//num) of each unique number.",
    timeComplex: "O(2ⁿ)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 52, memory: 17.2, beats: 84,
  },
  {
    problemId: 73, solutionType: "community", language: "javascript",
    approach: "Sorted + Set of stringified paths",
    code: `function combinationSum2(candidates, target) {
  candidates.sort((a,b) => a-b);
  const res = [], seen = new Set();
  function bt(i, rem, path) {
    if (rem === 0) { const key=path.join(','); if(!seen.has(key)){seen.add(key);res.push([...path]);} return; }
    for (let j=i; j<candidates.length; j++) {
      if (candidates[j] > rem) break;
      path.push(candidates[j]); bt(j+1, rem-candidates[j], path); path.pop();
    }
  }
  bt(0, target, []);
  return res;
}`,
    explanation: "Deduplicate by checking string keys of completed paths in a Set — simpler to implement but slightly more memory.",
    timeComplex: "O(2ⁿ)", spaceComplex: "O(2ⁿ)",
    username: "@rahul_dev", runtime: 68, memory: 53.2, beats: 78,
  },

  // ─────────────────────────────────────────────────────────────
  // 74. Word Search
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 74, solutionType: "editorial", language: "javascript",
    approach: "DFS Backtracking",
    code: `function exist(board, word) {
  const m = board.length, n = board[0].length;
  function dfs(r, c, i) {
    if (i === word.length) return true;
    if (r<0||r>=m||c<0||c>=n||board[r][c]!==word[i]) return false;
    const tmp = board[r][c]; board[r][c] = '#';
    const found = dfs(r+1,c,i+1)||dfs(r-1,c,i+1)||dfs(r,c+1,i+1)||dfs(r,c-1,i+1);
    board[r][c] = tmp;
    return found;
  }
  for (let r=0; r<m; r++) for (let c=0; c<n; c++) if (dfs(r,c,0)) return true;
  return false;
}`,
    explanation: "Try DFS from every starting cell. Mark cell with '#' to avoid revisiting in current path. Restore on backtrack.",
    timeComplex: "O(m·n·4^L)", spaceComplex: "O(L)",
  },
  {
    problemId: 74, solutionType: "editorial", language: "python",
    approach: "DFS Backtracking",
    code: `def exist(board: list[list[str]], word: str) -> bool:
    m, n = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if r<0 or r>=m or c<0 or c>=n or board[r][c] != word[i]: return False
        tmp, board[r][c] = board[r][c], '#'
        found = dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)
        board[r][c] = tmp
        return found
    return any(dfs(r,c,0) for r in range(m) for c in range(n))`,
    explanation: "DFS with in-place marking. Backtrack by restoring the cell character.",
    timeComplex: "O(m·n·4^L)", spaceComplex: "O(L)",
  },
  {
    problemId: 74, solutionType: "community", language: "python",
    approach: "DFS with visited set",
    code: `def exist(board, word):
    m, n = len(board), len(board[0])
    def dfs(r, c, i, visited):
        if i == len(word): return True
        if r<0 or r>=m or c<0 or c>=n or (r,c) in visited or board[r][c]!=word[i]: return False
        visited.add((r,c))
        res = any(dfs(r+dr,c+dc,i+1,visited) for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)])
        visited.discard((r,c))
        return res
    return any(dfs(r,c,0,set()) for r in range(m) for c in range(n))`,
    explanation: "Use a visited set instead of mutating the board — safer for concurrent scenarios.",
    timeComplex: "O(m·n·4^L)", spaceComplex: "O(L)",
    username: "@priya_s", runtime: 380, memory: 18.5, beats: 72,
  },
  {
    problemId: 74, solutionType: "community", language: "javascript",
    approach: "Optimised: check first/last char frequency",
    code: `function exist(board, word) {
  const m=board.length, n=board[0].length;
  const freq = {};
  for (const row of board) for (const c of row) freq[c]=(freq[c]||0)+1;
  // if last char less frequent than first, reverse word
  if ((freq[word[0]]||0) > (freq[word[word.length-1]]||0)) word=word.split('').reverse().join('');
  function dfs(r,c,i){
    if(i===word.length) return true;
    if(r<0||r>=m||c<0||c>=n||board[r][c]!==word[i]) return false;
    const t=board[r][c]; board[r][c]='#';
    const ok=dfs(r+1,c,i+1)||dfs(r-1,c,i+1)||dfs(r,c+1,i+1)||dfs(r,c-1,i+1);
    board[r][c]=t; return ok;
  }
  for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(dfs(r,c,0)) return true;
  return false;
}`,
    explanation: "Optimisation: start DFS from the less-frequent end of the word to prune search tree earlier.",
    timeComplex: "O(m·n·4^L)", spaceComplex: "O(L)",
    username: "@rahul_dev", runtime: 88, memory: 52.0, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 75. Binary Tree Maximum Path Sum
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 75, solutionType: "editorial", language: "javascript",
    approach: "DFS — Post-order with Global Max",
    code: `function maxPathSum(root) {
  let res = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left  = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    res = Math.max(res, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return res;
}`,
    explanation: "Post-order DFS: for each node compute left and right gains (clamped to 0). Update global max with path through this node. Return single-branch gain (val + max(left, right)) to parent.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 75, solutionType: "editorial", language: "python",
    approach: "DFS — Post-order with Global Max",
    code: `def maxPathSum(root) -> int:
    res = [float('-inf')]
    def dfs(node):
        if not node: return 0
        left  = max(0, dfs(node.left))
        right = max(0, dfs(node.right))
        res[0] = max(res[0], node.val + left + right)
        return node.val + max(left, right)
    dfs(root)
    return res[0]`,
    explanation: "Post-order: clamp child gains to 0 (don't take negative branch). Update global max through current node. Return best single-arm to parent.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
  },
  {
    problemId: 75, solutionType: "community", language: "python",
    approach: "Iterative post-order with stack",
    code: `def maxPathSum(root):
    gain = {}
    stack, res = [root], float('-inf')
    while stack:
        node = stack[-1]
        left_done = not node.left or node.left in gain
        right_done = not node.right or node.right in gain
        if left_done and right_done:
            stack.pop()
            l = max(0, gain.get(node.left, 0))
            r = max(0, gain.get(node.right, 0))
            res = max(res, node.val + l + r)
            gain[node] = node.val + max(l, r)
        else:
            if not left_done: stack.append(node.left)
            elif not right_done: stack.append(node.right)
    return res`,
    explanation: "Iterative post-order using a dict to memoize subtree gains — avoids recursion stack.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 52, memory: 21.5, beats: 82,
  },
  {
    problemId: 75, solutionType: "community", language: "javascript",
    approach: "DFS returning [maxSingleArm, maxPath]",
    code: `function maxPathSum(root) {
  let best = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const l = Math.max(0, dfs(node.left));
    const r = Math.max(0, dfs(node.right));
    best = Math.max(best, l + node.val + r);
    return node.val + Math.max(l, r);
  }
  dfs(root);
  return best;
}`,
    explanation: "Clean DFS: ignore negative child contributions. Path through node = l + val + r. Parent receives best single arm.",
    timeComplex: "O(n)", spaceComplex: "O(h)",
    username: "@rahul_dev", runtime: 54, memory: 56.8, beats: 86,
  },
];

async function main() {
  console.log(`Seeding ${solutions.length} solutions for problems 51-75...`);

  const problemIds = [...new Set(solutions.map((s) => s.problemId))];
  const deleted = await prisma.intelSolution.deleteMany({
    where: { problemId: { in: problemIds } },
  });
  console.log(`Deleted ${deleted.count} existing solutions for problems ${problemIds.join(", ")}`);

  await prisma.intelSolution.createMany({ data: solutions });
  console.log("Done seeding chunk C solutions.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

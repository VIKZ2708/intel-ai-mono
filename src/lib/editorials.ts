export interface CommunitySolution {
  user: string;
  language: "JavaScript" | "Python" | "Java" | "C++";
  runtime: number;
  memory: number;
  beats: number;
  approach: string;
  code: string;
}

export interface Editorial {
  intuition: string;
  approach: string[];
  timeComplexity: string;
  spaceComplexity: string;
  walkthrough: string;
  code: { javascript: string; python: string };
}

export interface ProblemMeta {
  editorial: Editorial;
  solutions: CommunitySolution[];
}

const editorials: Record<number, ProblemMeta> = {
  1: {
    editorial: {
      intuition: `For each number in the array, we need its "complement" — the value that, added to it, equals the target. The naive approach checks every pair in O(n²). The key insight is: instead of looking forward for the complement, we can look backward using a hash map that stores every number we've already seen.`,
      approach: [
        "Create an empty hash map (number → index).",
        "Iterate through the array. For each element nums[i], compute complement = target − nums[i].",
        "If complement exists in the map, we found our pair — return [map[complement], i].",
        "Otherwise, store nums[i] → i in the map and continue.",
        "Because we check before inserting, we never use the same index twice.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      walkthrough: `For nums=[2,7,11,15], target=9: i=0, num=2, complement=7, map is empty → store {2:0}. i=1, num=7, complement=2, map has 2 at index 0 → return [0,1]. Done in a single pass.`,
      code: {
        javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}`,
        python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i`,
      },
    },
    solutions: [
      {
        user: "rahul_sharma_dev", language: "JavaScript", runtime: 52, memory: 42.1, beats: 94,
        approach: "HashMap one-pass",
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
}`,
      },
      {
        user: "priya_nair_codes", language: "Python", runtime: 61, memory: 17.4, beats: 88,
        approach: "Dictionary lookup",
        code: `class Solution:
    def twoSum(self, nums, target):
        d = {}
        for i, v in enumerate(nums):
            if target - v in d:
                return [d[target - v], i]
            d[v] = i`,
      },
      {
        user: "amit_verma_99", language: "JavaScript", runtime: 78, memory: 43.8, beats: 72,
        approach: "Brute force O(n²)",
        code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      if (nums[i] + nums[j] === target) return [i, j];
}`,
      },
      {
        user: "sneha_gupta_dev", language: "Python", runtime: 55, memory: 16.9, beats: 92,
        approach: "Enumerate + dict",
        code: `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, n in enumerate(nums):
            if (c := target - n) in seen:
                return [seen[c], i]
            seen[n] = i`,
      },
      {
        user: "vikram_coder", language: "Java", runtime: 1, memory: 44.2, beats: 99,
        approach: "HashMap O(n)",
        code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp))
                return new int[]{map.get(comp), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      },
      {
        user: "neha_singh_tech", language: "C++", runtime: 3, memory: 10.8, beats: 97,
        approach: "unordered_map",
        code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> m;
        for (int i = 0; i < nums.size(); i++) {
            auto it = m.find(target - nums[i]);
            if (it != m.end()) return {it->second, i};
            m[nums[i]] = i;
        }
        return {};
    }
};`,
      },
      {
        user: "arjun_kapoor_01", language: "Python", runtime: 68, memory: 17.2, beats: 81,
        approach: "Two-pass HashMap",
        code: `class Solution:
    def twoSum(self, nums, target):
        idx = {v: i for i, v in enumerate(nums)}
        for i, v in enumerate(nums):
            j = idx.get(target - v)
            if j is not None and j != i:
                return [i, j]`,
      },
      {
        user: "pooja_mehta_dev", language: "JavaScript", runtime: 60, memory: 42.5, beats: 89,
        approach: "Object map",
        code: `function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const c = target - nums[i];
    if (c in seen) return [seen[c], i];
    seen[nums[i]] = i;
  }
}`,
      },
      {
        user: "rohit_jain_algo", language: "Python", runtime: 72, memory: 17.6, beats: 76,
        approach: "Walrus operator",
        code: `class Solution:
    def twoSum(self, nums, target):
        m = {}
        return next(
            [m[target - n], i]
            for i, n in enumerate(nums)
            if (found := target - n) in m
            or not m.update({n: i})
        )`,
      },
      {
        user: "divya_reddy_cs", language: "JavaScript", runtime: 55, memory: 42.0, beats: 93,
        approach: "Map with destructuring",
        code: `function twoSum(nums, target) {
  const m = new Map();
  for (const [i, n] of nums.entries()) {
    if (m.has(target - n)) return [m.get(target - n), i];
    m.set(n, i);
  }
}`,
      },
    ],
  },

  2: {
    editorial: {
      intuition: `A string of brackets is valid if every opening bracket has a matching closing bracket in the correct order. The last opened bracket must be the first to close — this "last in, first out" pattern is exactly what a stack provides.`,
      approach: [
        "Create a stack and a mapping from each closing bracket to its matching opening bracket.",
        "Iterate through each character in the string.",
        "If it's an opening bracket '(', '{', '[' — push it onto the stack.",
        "If it's a closing bracket — pop from the stack and check if it matches. If the stack is empty or the popped character doesn't match, return false.",
        "At the end, the stack must be empty (all opened brackets were closed).",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      walkthrough: `For s="({})": push '(', push '{'. See '}' → pop '{', matches → ok. See ')' → pop '(', matches → ok. Stack empty → return true. For s="(]": push '('. See ']' → pop '(', but map[']']= '[' ≠ '(' → return false.`,
      code: {
        javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if ('({['.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for c in s:
            if c in '({[':
                stack.append(c)
            elif not stack or stack.pop() != mapping[c]:
                return False
        return not stack`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 58, memory: 41.2, beats: 91, approach: "Stack + Map",
        code: `function isValid(s) {
  const stack = [], map = {')':'(','}':'{',']':'['};
  for (const c of s) {
    if ('({['.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return !stack.length;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 35, memory: 16.2, beats: 95, approach: "Stack",
        code: `class Solution:
    def isValid(self, s):
        st, m = [], {')':'(', '}':'{', ']':'['}
        for c in s:
            if c in m:
                if not st or st.pop() != m[c]: return False
            else: st.append(c)
        return not st` },
      { user: "amit_verma_99", language: "JavaScript", runtime: 72, memory: 41.8, beats: 79, approach: "Replace pairs",
        code: `function isValid(s) {
  while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
    s = s.replace('()', '').replace('[]', '').replace('{}', '');
  }
  return s === '';
}` },
      { user: "sneha_gupta_dev", language: "Python", runtime: 38, memory: 16.5, beats: 88, approach: "Stack + set check",
        code: `class Solution:
    def isValid(self, s):
        pairs = {')':'(', ']':'[', '}':'{'}
        stack = []
        for c in s:
            if c not in pairs: stack.append(c)
            elif not stack or stack[-1] != pairs[c]: return False
            else: stack.pop()
        return len(stack) == 0` },
      { user: "vikram_coder", language: "Java", runtime: 1, memory: 40.1, beats: 99, approach: "Stack",
        code: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c=='(' || c=='[' || c=='{') stack.push(c);
            else if (stack.isEmpty()) return false;
            else if (c==')' && stack.pop()!='(') return false;
            else if (c==']' && stack.pop()!='[') return false;
            else if (c=='}' && stack.pop()!='{') return false;
        }
        return stack.isEmpty();
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 0, memory: 8.2, beats: 100, approach: "Stack",
        code: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c=='(' || c=='[' || c=='{') st.push(c);
            else {
                if (st.empty()) return false;
                char t = st.top(); st.pop();
                if (c==')' && t!='(') return false;
                if (c==']' && t!='[') return false;
                if (c=='}' && t!='{') return false;
            }
        }
        return st.empty();
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 42, memory: 16.8, beats: 82, approach: "One-liner stack",
        code: `class Solution:
    def isValid(self, s):
        while any(p in s for p in ['()','[]','{}']):
            s = s.replace('()','').replace('[]','').replace('{}','')
        return s == ''` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 63, memory: 41.5, beats: 86, approach: "Stack switch",
        code: `function isValid(s) {
  const st = [];
  for (const c of s) {
    switch(c) {
      case '(': case '[': case '{': st.push(c); break;
      case ')': if (st.pop()!=='(') return false; break;
      case ']': if (st.pop()!=='[') return false; break;
      case '}': if (st.pop()!=='{') return false; break;
    }
  }
  return st.length === 0;
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 40, memory: 16.4, beats: 85, approach: "Stack reduce",
        code: `class Solution:
    def isValid(self, s):
        stack = []
        close = {')':'(', ']':'[', '}':'{'}
        for ch in s:
            if ch in close:
                if not stack or stack[-1] != close[ch]:
                    return False
                stack.pop()
            else:
                stack.append(ch)
        return not stack` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 55, memory: 41.0, beats: 93, approach: "Map push/pop",
        code: `function isValid(s) {
  const opens = new Set(['(','[','{']);
  const match = new Map([[')','('],[']','['],['}','{']]);
  const stack = [];
  for (const c of s) {
    if (opens.has(c)) stack.push(c);
    else if (stack.at(-1) !== match.get(c)) return false;
    else stack.pop();
  }
  return stack.length === 0;
}` },
    ],
  },

  3: {
    editorial: {
      intuition: `To reach step n, you came from either step n−1 (one step) or step n−2 (two steps). So the number of ways to reach n equals ways(n−1) + ways(n−2). This is the Fibonacci sequence! We don't need to store the whole array — just the last two values.`,
      approach: [
        "Base cases: 1 way to reach step 0 (do nothing), 1 way to reach step 1.",
        "For each step i from 2 to n: ways[i] = ways[i-1] + ways[i-2].",
        "Optimise space: only keep two variables (prev and curr) instead of an array.",
        "After n iterations, curr holds the answer.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      walkthrough: `n=5: [a=1, b=1] → b=2,a=1 → b=3,a=2 → b=5,a=3 → b=8,a=5. Return b=8. ✓`,
      code: {
        javascript: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
        python: `class Solution:
    def climbStairs(self, n: int) -> int:
        a, b = 1, 1
        for _ in range(n - 1):
            a, b = b, a + b
        return b`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 48, memory: 40.8, beats: 96, approach: "Two variables (O(1) space)",
        code: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 28, memory: 16.1, beats: 97, approach: "Fibonacci O(1)",
        code: `class Solution:
    def climbStairs(self, n):
        a, b = 1, 1
        for _ in range(n - 1):
            a, b = b, a + b
        return b` },
      { user: "amit_verma_99", language: "Python", runtime: 35, memory: 16.3, beats: 88, approach: "DP array",
        code: `class Solution:
    def climbStairs(self, n):
        dp = [0]*(n+1)
        dp[0] = dp[1] = 1
        for i in range(2, n+1):
            dp[i] = dp[i-1] + dp[i-2]
        return dp[n]` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 52, memory: 41.2, beats: 92, approach: "DP table",
        code: `function climbStairs(n) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}` },
      { user: "vikram_coder", language: "Java", runtime: 0, memory: 39.5, beats: 100, approach: "Two vars",
        code: `class Solution {
    public int climbStairs(int n) {
        int a = 1, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b; a = b; b = c;
        }
        return b;
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 0, memory: 7.9, beats: 100, approach: "Fibonacci",
        code: `class Solution {
public:
    int climbStairs(int n) {
        int a = 1, b = 1;
        for (int i = 2; i <= n; ++i) {
            int c = a + b; a = b; b = c;
        }
        return b;
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 32, memory: 16.2, beats: 93, approach: "Reduce",
        code: `from functools import reduce
class Solution:
    def climbStairs(self, n):
        return reduce(lambda a, _: (a[1], a[0]+a[1]), range(n-1), (1,1))[1]` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 55, memory: 41.5, beats: 89, approach: "Memoized recursion",
        code: `function climbStairs(n, memo = {}) {
  if (n <= 1) return 1;
  if (memo[n]) return memo[n];
  return memo[n] = climbStairs(n-1, memo) + climbStairs(n-2, memo);
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 30, memory: 16.0, beats: 95, approach: "Cache recursion",
        code: `from functools import lru_cache
class Solution:
    @lru_cache(None)
    def climbStairs(self, n):
        if n <= 1: return 1
        return self.climbStairs(n-1) + self.climbStairs(n-2)` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 50, memory: 41.0, beats: 94, approach: "Golden ratio",
        code: `function climbStairs(n) {
  const sq5 = Math.sqrt(5);
  return Math.round((Math.pow((1+sq5)/2, n+1)) / sq5);
}` },
    ],
  },

  4: {
    editorial: {
      intuition: `We must buy before we sell. For maximum profit we want to sell at the highest price after buying at the lowest possible price. Instead of checking every pair, we can track the minimum price seen so far as we scan left to right — at each day, the best profit is price[today] − minSoFar.`,
      approach: [
        "Initialise minPrice = prices[0] and maxProfit = 0.",
        "For each price in the array: update minPrice = min(minPrice, price).",
        "Compute today's profit = price − minPrice. Update maxProfit if it's larger.",
        "Return maxProfit at the end.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      walkthrough: `[7,1,5,3,6,4]: min=7,profit=0 → min=1,profit=0 → min=1,profit=4 → min=1,profit=4 → min=1,profit=5 → min=1,profit=5. Return 5.`,
      code: {
        javascript: `function maxProfit(prices) {
  let min = prices[0], profit = 0;
  for (const p of prices) {
    min = Math.min(min, p);
    profit = Math.max(profit, p - min);
  }
  return profit;
}`,
        python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for p in prices:
            min_price = min(min_price, p)
            max_profit = max(max_profit, p - min_price)
        return max_profit`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 60, memory: 52.1, beats: 93, approach: "One-pass greedy",
        code: `function maxProfit(prices) {
  let min = Infinity, res = 0;
  for (const p of prices) {
    min = Math.min(min, p);
    res = Math.max(res, p - min);
  }
  return res;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 55, memory: 27.2, beats: 91, approach: "Track min",
        code: `class Solution:
    def maxProfit(self, prices):
        mn, best = float('inf'), 0
        for p in prices:
            mn = min(mn, p)
            best = max(best, p - mn)
        return best` },
      { user: "amit_verma_99", language: "Python", runtime: 62, memory: 27.5, beats: 85, approach: "Kadane variant",
        code: `class Solution:
    def maxProfit(self, prices):
        profit = 0
        for i in range(1, len(prices)):
            if prices[i] > prices[i-1]:
                profit = max(profit, prices[i] - min(prices[:i]))
        return profit` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 65, memory: 52.4, beats: 88, approach: "Reduce",
        code: `function maxProfit(prices) {
  return prices.reduce(([min, profit], p) => [
    Math.min(min, p), Math.max(profit, p - min)
  ], [prices[0], 0])[1];
}` },
      { user: "vikram_coder", language: "Java", runtime: 1, memory: 57.2, beats: 99, approach: "Single pass",
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int min = Integer.MAX_VALUE, profit = 0;
        for (int p : prices) {
            min = Math.min(min, p);
            profit = Math.max(profit, p - min);
        }
        return profit;
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 4, memory: 27.0, beats: 98, approach: "STL",
        code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int mn = INT_MAX, res = 0;
        for (int p : prices) {
            mn = min(mn, p);
            res = max(res, p - mn);
        }
        return res;
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 58, memory: 27.3, beats: 88, approach: "Enumerate",
        code: `class Solution:
    def maxProfit(self, prices):
        ans = min_p = prices[0]
        ans = 0
        for p in prices[1:]:
            min_p = min(min_p, p)
            ans = max(ans, p - min_p)
        return ans` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 68, memory: 52.6, beats: 84, approach: "Two pointer style",
        code: `function maxProfit(prices) {
  let left = 0, right = 1, max = 0;
  while (right < prices.length) {
    if (prices[right] > prices[left])
      max = Math.max(max, prices[right] - prices[left]);
    else left = right;
    right++;
  }
  return max;
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 60, memory: 27.4, beats: 87, approach: "Two pointer",
        code: `class Solution:
    def maxProfit(self, prices):
        l, r, res = 0, 1, 0
        while r < len(prices):
            if prices[r] > prices[l]:
                res = max(res, prices[r] - prices[l])
            else:
                l = r
            r += 1
        return res` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 62, memory: 52.2, beats: 91, approach: "ForEach",
        code: `function maxProfit(prices) {
  let min = prices[0], profit = 0;
  prices.forEach(p => {
    if (p < min) min = p;
    else if (p - min > profit) profit = p - min;
  });
  return profit;
}` },
    ],
  },

  5: {
    editorial: {
      intuition: `Binary search works by repeatedly halving the search space. Since the array is sorted, we can compare the middle element with the target and eliminate the half where the target cannot exist.`,
      approach: [
        "Set left = 0, right = nums.length − 1.",
        "While left ≤ right: compute mid = Math.floor((left + right) / 2).",
        "If nums[mid] === target, return mid.",
        "If nums[mid] < target, target must be in the right half → left = mid + 1.",
        "If nums[mid] > target, target must be in the left half → right = mid − 1.",
        "If the loop exits without finding the target, return −1.",
      ],
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      walkthrough: `nums=[-1,0,3,5,9,12], target=9: l=0,r=5,mid=2 → nums[2]=3<9 → l=3. l=3,r=5,mid=4 → nums[4]=9===9 → return 4.`,
      code: {
        javascript: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    nums[mid] < target ? l = mid + 1 : r = mid - 1;
  }
  return -1;
}`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target: return mid
            elif nums[mid] < target: l = mid + 1
            else: r = mid - 1
        return -1`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 50, memory: 42.1, beats: 95, approach: "Iterative binary search",
        code: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] === target) return m;
    nums[m] < target ? l = m + 1 : r = m - 1;
  }
  return -1;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 32, memory: 16.5, beats: 96, approach: "bisect module",
        code: `import bisect
class Solution:
    def search(self, nums, target):
        i = bisect.bisect_left(nums, target)
        return i if i < len(nums) and nums[i] == target else -1` },
      { user: "amit_verma_99", language: "Python", runtime: 40, memory: 16.8, beats: 87, approach: "Recursive",
        code: `class Solution:
    def search(self, nums, target, l=0, r=None):
        if r is None: r = len(nums) - 1
        if l > r: return -1
        m = (l + r) // 2
        if nums[m] == target: return m
        if nums[m] < target: return self.search(nums, target, m+1, r)
        return self.search(nums, target, l, m-1)` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 55, memory: 42.5, beats: 91, approach: "Recursive",
        code: `function search(nums, target, l = 0, r = nums.length - 1) {
  if (l > r) return -1;
  const m = (l + r) >> 1;
  if (nums[m] === target) return m;
  return nums[m] < target ? search(nums, target, m+1, r) : search(nums, target, l, m-1);
}` },
      { user: "vikram_coder", language: "Java", runtime: 0, memory: 43.2, beats: 100, approach: "Iterative",
        code: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            else if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 0, memory: 27.3, beats: 100, approach: "STL lower_bound",
        code: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        auto it = lower_bound(nums.begin(), nums.end(), target);
        if (it == nums.end() || *it != target) return -1;
        return it - nums.begin();
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 36, memory: 16.6, beats: 92, approach: "While loop",
        code: `class Solution:
    def search(self, nums, target):
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) >> 1
            if nums[mid] == target: return mid
            lo, hi = (mid+1, hi) if nums[mid] < target else (lo, mid-1)
        return -1` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 58, memory: 42.3, beats: 89, approach: "index method fallback",
        code: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 38, memory: 16.7, beats: 90, approach: "Clean iterative",
        code: `class Solution:
    def search(self, nums, target):
        l, r = 0, len(nums) - 1
        while l <= r:
            m = (l + r) // 2
            if nums[m] < target: l = m + 1
            elif nums[m] > target: r = m - 1
            else: return m
        return -1` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 52, memory: 42.2, beats: 93, approach: "Bitwise mid",
        code: `function search(nums, target) {
  let [l, r] = [0, nums.length - 1];
  while (l <= r) {
    const m = (l + r) >>> 1;
    const v = nums[m];
    if (v === target) return m;
    v < target ? (l = m + 1) : (r = m - 1);
  }
  return -1;
}` },
    ],
  },

  6: {
    editorial: {
      intuition: `Kadane's algorithm: at each index, the best subarray ending here is either just nums[i] itself (start fresh) or the best subarray ending at i−1 extended by nums[i]. We take the max of both and track the global maximum.`,
      approach: [
        "Initialise currentSum = nums[0] and maxSum = nums[0].",
        "For each element from index 1 onwards: currentSum = max(nums[i], currentSum + nums[i]).",
        "This decides: should I start a new subarray here, or extend the existing one?",
        "Update maxSum = max(maxSum, currentSum) at each step.",
        "Return maxSum.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      walkthrough: `[-2,1,-3,4,-1,2,1,-5,4]: cur=-2,best=-2 → cur=1,best=1 → cur=-2,best=1 → cur=4,best=4 → cur=3,best=4 → cur=5,best=5 → cur=6,best=6 → cur=1,best=6 → cur=5,best=6. Return 6.`,
      code: {
        javascript: `function maxSubArray(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,
        python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        cur = best = nums[0]
        for n in nums[1:]:
            cur = max(n, cur + n)
            best = max(best, cur)
        return best`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 72, memory: 50.2, beats: 90, approach: "Kadane's",
        code: `function maxSubArray(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 55, memory: 28.2, beats: 94, approach: "Kadane's",
        code: `class Solution:
    def maxSubArray(self, nums):
        cur = best = nums[0]
        for n in nums[1:]:
            cur = max(n, cur + n)
            best = max(best, cur)
        return best` },
      { user: "amit_verma_99", language: "Python", runtime: 62, memory: 28.5, beats: 87, approach: "DP array",
        code: `class Solution:
    def maxSubArray(self, nums):
        dp = nums[:]
        for i in range(1, len(dp)):
            dp[i] = max(dp[i], dp[i-1] + dp[i])
        return max(dp)` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 78, memory: 50.5, beats: 83, approach: "Reduce",
        code: `function maxSubArray(nums) {
  return nums.reduce(([cur, best], n) => {
    const c = Math.max(n, cur + n);
    return [c, Math.max(best, c)];
  }, [nums[0], nums[0]])[1];
}` },
      { user: "vikram_coder", language: "Java", runtime: 1, memory: 55.1, beats: 99, approach: "Kadane's",
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int cur = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 3, memory: 20.4, beats: 98, approach: "Kadane's",
        code: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], best = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            cur = max(nums[i], cur + nums[i]);
            best = max(best, cur);
        }
        return best;
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 58, memory: 28.3, beats: 91, approach: "Inline accumulate",
        code: `from itertools import accumulate
class Solution:
    def maxSubArray(self, nums):
        return max(accumulate(nums, lambda a, b: max(b, a + b)))` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 75, memory: 50.3, beats: 86, approach: "ForEach Kadane",
        code: `function maxSubArray(nums) {
  let cur = best = nums[0];
  nums.slice(1).forEach(n => {
    cur = n > cur + n ? n : cur + n;
    if (cur > best) best = cur;
  });
  return best;
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 60, memory: 28.4, beats: 89, approach: "Two variable",
        code: `class Solution:
    def maxSubArray(self, nums):
        s = res = nums[0]
        for x in nums[1:]:
            s = x if x > s + x else s + x
            res = max(res, s)
        return res` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 70, memory: 50.1, beats: 92, approach: "Clean Kadane",
        code: `function maxSubArray(nums) {
  let [cur, max] = [nums[0], nums[0]];
  for (const n of nums.slice(1)) {
    cur = n + Math.max(cur, 0);
    max = Math.max(max, cur);
  }
  return max;
}` },
    ],
  },

  7: {
    editorial: {
      intuition: `Use a sliding window: two pointers left and right defining a window with no repeating characters. When we encounter a character already in the window, we shrink from the left until the duplicate is gone, then expand right. A hash map tracks the last seen index of each character for O(1) jumps.`,
      approach: [
        "Create a Map to store character → last seen index. Set left = 0, maxLen = 0.",
        "For each right pointer from 0 to s.length−1:",
        "  If s[right] is in the map and its last index ≥ left, move left = lastIndex + 1 (jump past duplicate).",
        "  Update map with s[right] → right.",
        "  Update maxLen = max(maxLen, right − left + 1).",
        "Return maxLen.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m, n)) where m is charset size",
      walkthrough: `"abcabcbb": right=0→3 window grows to 'abca', left jumps to 1. right=4→'abcb', left jumps to 2. Max window 'abc' length 3 found at right=2.`,
      code: {
        javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r])) left = Math.max(left, map.get(s[r]) + 1);
    map.set(s[r], r);
    max = Math.max(max, r - left + 1);
  }
  return max;
}`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        left = max_len = 0
        for right, c in enumerate(s):
            if c in char_index and char_index[c] >= left:
                left = char_index[c] + 1
            char_index[c] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 68, memory: 44.2, beats: 92, approach: "Sliding window + Map",
        code: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r])) l = Math.max(l, map.get(s[r]) + 1);
    map.set(s[r], r);
    max = Math.max(max, r - l + 1);
  }
  return max;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 48, memory: 17.8, beats: 93, approach: "Dict window",
        code: `class Solution:
    def lengthOfLongestSubstring(self, s):
        d, l, res = {}, 0, 0
        for r, c in enumerate(s):
            if c in d and d[c] >= l:
                l = d[c] + 1
            d[c] = r
            res = max(res, r - l + 1)
        return res` },
      { user: "amit_verma_99", language: "Python", runtime: 62, memory: 18.1, beats: 82, approach: "Set sliding window",
        code: `class Solution:
    def lengthOfLongestSubstring(self, s):
        seen = set()
        l = res = 0
        for r in range(len(s)):
            while s[r] in seen:
                seen.remove(s[l]); l += 1
            seen.add(s[r])
            res = max(res, r - l + 1)
        return res` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 74, memory: 44.8, beats: 87, approach: "Set window",
        code: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) { set.delete(s[l++]); }
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }
  return max;
}` },
      { user: "vikram_coder", language: "Java", runtime: 2, memory: 44.9, beats: 98, approach: "Array window (ASCII)",
        code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] idx = new int[128];
        int l = 0, max = 0;
        for (int r = 0; r < s.length(); r++) {
            l = Math.max(l, idx[s.charAt(r)]);
            max = Math.max(max, r - l + 1);
            idx[s.charAt(r)] = r + 1;
        }
        return max;
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 4, memory: 10.2, beats: 97, approach: "Array 128",
        code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int idx[128] = {}, l = 0, res = 0;
        for (int r = 0; r < s.size(); r++) {
            l = max(l, idx[s[r]]);
            res = max(res, r - l + 1);
            idx[s[r]] = r + 1;
        }
        return res;
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 52, memory: 17.9, beats: 90, approach: "Dict + max",
        code: `class Solution:
    def lengthOfLongestSubstring(self, s):
        pos = {}
        ans = start = 0
        for i, c in enumerate(s):
            start = max(start, pos.get(c, -1) + 1)
            pos[c] = i
            ans = max(ans, i - start + 1)
        return ans` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 72, memory: 44.5, beats: 89, approach: "Object map",
        code: `function lengthOfLongestSubstring(s) {
  const last = {};
  let start = 0, max = 0;
  for (let i = 0; i < s.length; i++) {
    if (last[s[i]] >= start) start = last[s[i]] + 1;
    last[s[i]] = i;
    max = Math.max(max, i - start + 1);
  }
  return max;
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 50, memory: 17.8, beats: 91, approach: "Counter window",
        code: `from collections import defaultdict
class Solution:
    def lengthOfLongestSubstring(self, s):
        count = defaultdict(int)
        l = res = 0
        for r, c in enumerate(s):
            count[c] += 1
            while count[c] > 1:
                count[s[l]] -= 1; l += 1
            res = max(res, r - l + 1)
        return res` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 70, memory: 44.3, beats: 91, approach: "Compact Map",
        code: `const lengthOfLongestSubstring = s => {
  const m = new Map(); let l = 0, r = 0;
  for (; r < s.length; r++) {
    if (m.has(s[r]) && m.get(s[r]) >= l) l = m.get(s[r]) + 1;
    m.set(s[r], r);
  }
  return r - l;
};` },
    ],
  },

  8: {
    editorial: {
      intuition: `Each island is a group of connected '1' cells. We need to count the groups. The classic approach: whenever we find an unvisited '1', we've found a new island — we then "flood fill" it, marking all connected '1's as '0' so they aren't counted again.`,
      approach: [
        "Iterate through every cell of the grid.",
        "When a '1' is found, increment the island count and call DFS/BFS from that cell.",
        "DFS: mark the current cell as '0', then recursively visit all 4 neighbours (up/down/left/right).",
        "Cells are only visited if they are within bounds and equal to '1'.",
        "DFS naturally stops when it hits water or the grid edge.",
      ],
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n) recursion stack in worst case",
      walkthrough: `Grid with one island: find '1' at (0,0), count=1, DFS floods all connected '1's → all become '0'. No more '1's found. Return 1.`,
      code: {
        javascript: `function numIslands(grid) {
  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] !== '1') return;
    grid[i][j] = '0';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  };
  let count = 0;
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (grid[i][j] === '1') { dfs(i, j); count++; }
  return count;
}`,
        python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        def dfs(i, j):
            if not (0 <= i < len(grid) and 0 <= j < len(grid[0]) and grid[i][j] == '1'):
                return
            grid[i][j] = '0'
            dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '1':
                    dfs(i, j); count += 1
        return count`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 82, memory: 51.2, beats: 91, approach: "DFS flood fill",
        code: `function numIslands(grid) {
  const dfs = (i,j) => {
    if (i<0||j<0||i>=grid.length||j>=grid[0].length||grid[i][j]!=='1') return;
    grid[i][j]='0';
    dfs(i+1,j);dfs(i-1,j);dfs(i,j+1);dfs(i,j-1);
  };
  let c=0;
  for(let i=0;i<grid.length;i++) for(let j=0;j<grid[0].length;j++) if(grid[i][j]==='1'){dfs(i,j);c++;}
  return c;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 120, memory: 26.8, beats: 88, approach: "BFS",
        code: `from collections import deque
class Solution:
    def numIslands(self, grid):
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '1':
                    count += 1
                    q = deque([(i,j)])
                    grid[i][j] = '0'
                    while q:
                        r,c = q.popleft()
                        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                            nr,nc=r+dr,c+dc
                            if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and grid[nr][nc]=='1':
                                grid[nr][nc]='0'; q.append((nr,nc))
        return count` },
      { user: "amit_verma_99", language: "Python", runtime: 130, memory: 27.1, beats: 82, approach: "DFS iterative",
        code: `class Solution:
    def numIslands(self, grid):
        def dfs(i,j):
            st=[(i,j)]
            while st:
                r,c=st.pop()
                if 0<=r<len(grid) and 0<=c<len(grid[0]) and grid[r][c]=='1':
                    grid[r][c]='0'
                    st+=[(r+1,c),(r-1,c),(r,c+1),(r,c-1)]
        count=0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j]=='1': dfs(i,j); count+=1
        return count` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 88, memory: 51.8, beats: 85, approach: "BFS queue",
        code: `function numIslands(grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        const q = [[i,j]]; grid[i][j] = '0';
        while (q.length) {
          const [r,c] = q.shift();
          [[r+1,c],[r-1,c],[r,c+1],[r,c-1]].forEach(([nr,nc]) => {
            if (nr>=0&&nc>=0&&nr<grid.length&&nc<grid[0].length&&grid[nr][nc]==='1') {
              grid[nr][nc]='0'; q.push([nr,nc]);
            }
          });
        }
      }
    }
  }
  return count;
}` },
      { user: "vikram_coder", language: "Java", runtime: 2, memory: 48.2, beats: 99, approach: "DFS",
        code: `class Solution {
    public int numIslands(char[][] g) {
        int c=0;
        for(int i=0;i<g.length;i++) for(int j=0;j<g[0].length;j++) if(g[i][j]=='1'){dfs(g,i,j);c++;}
        return c;
    }
    void dfs(char[][] g,int i,int j){
        if(i<0||j<0||i>=g.length||j>=g[0].length||g[i][j]!='1')return;
        g[i][j]='0'; dfs(g,i+1,j);dfs(g,i-1,j);dfs(g,i,j+1);dfs(g,i,j-1);
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 8, memory: 14.2, beats: 96, approach: "DFS",
        code: `class Solution {
    void dfs(vector<vector<char>>& g, int i, int j) {
        if (i<0||j<0||i>=(int)g.size()||j>=(int)g[0].size()||g[i][j]!='1') return;
        g[i][j]='0'; dfs(g,i+1,j);dfs(g,i-1,j);dfs(g,i,j+1);dfs(g,i,j-1);
    }
public:
    int numIslands(vector<vector<char>>& g) {
        int c=0;
        for(int i=0;i<g.size();i++) for(int j=0;j<g[0].size();j++) if(g[i][j]=='1'){dfs(g,i,j);c++;}
        return c;
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 115, memory: 26.6, beats: 91, approach: "Recursive DFS",
        code: `class Solution:
    def numIslands(self, grid):
        def sink(i,j):
            if 0<=i<len(grid) and 0<=j<len(grid[0]) and grid[i][j]=='1':
                grid[i][j]='0'
                [sink(i+di,j+dj) for di,dj in ((1,0),(-1,0),(0,1),(0,-1))]
        return sum(sink(i,j) or 1 for i in range(len(grid)) for j in range(len(grid[0])) if grid[i][j]=='1')` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 90, memory: 52.0, beats: 83, approach: "DFS arrows",
        code: `function numIslands(grid) {
  const dfs = (i,j) => {
    if (i<0||j<0||i>=grid.length||j>=grid[0].length||grid[i][j]!=='1') return;
    grid[i][j]='2';
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(([di,dj]) => dfs(i+di,j+dj));
  };
  let n=0;
  grid.forEach((row,i) => row.forEach((c,j) => { if(c==='1'){dfs(i,j);n++;} }));
  return n;
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 125, memory: 27.0, beats: 85, approach: "Union-Find",
        code: `class Solution:
    def numIslands(self, grid):
        parent = {}
        def find(x):
            parent.setdefault(x, x)
            if parent[x]!=x: parent[x]=find(parent[x])
            return parent[x]
        def union(a,b):
            ra,rb=find(a),find(b)
            if ra!=rb: parent[ra]=rb; return True
            return False
        count=0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j]=='1':
                    parent[(i,j)]=(i,j); count+=1
                    for di,dj in [(-1,0),(0,-1)]:
                        ni,nj=i+di,j+dj
                        if 0<=ni<len(grid) and 0<=nj<len(grid[0]) and grid[ni][nj]=='1':
                            if union((i,j),(ni,nj)): count-=1
        return count` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 84, memory: 51.5, beats: 88, approach: "DFS clean",
        code: `function numIslands(grid) {
  const m=grid.length, n=grid[0].length;
  const fill=(i,j)=>{
    if(i<0||i>=m||j<0||j>=n||grid[i][j]!=='1')return;
    grid[i][j]='0';
    fill(i-1,j);fill(i+1,j);fill(i,j-1);fill(i,j+1);
  };
  let ans=0;
  for(let i=0;i<m;i++)for(let j=0;j<n;j++)if(grid[i][j]==='1'){fill(i,j);ans++;}
  return ans;
}` },
    ],
  },

  9: {
    editorial: {
      intuition: `Can we segment s? Define dp[i] = true if s[0..i−1] can be segmented using wordDict. For each position i, check every word w: if dp[i−w.length] is true and s ends with w at position i, then dp[i] = true.`,
      approach: [
        "Create a boolean array dp of length s.length+1, initialised to false. Set dp[0] = true (empty string).",
        "Convert wordDict to a Set for O(1) lookups.",
        "For each i from 1 to s.length: iterate j from 0 to i. If dp[j] is true and wordDict has s.slice(j,i), set dp[i] = true and break.",
        "Return dp[s.length].",
      ],
      timeComplexity: "O(n² × m) where m is average word length",
      spaceComplexity: "O(n + w) for DP array and word set",
      walkthrough: `s="leetcode", words=["leet","code"]: dp[0]=T. i=4: j=0, dp[0]=T, s[0..4]="leet" ∈ dict → dp[4]=T. i=8: j=4, dp[4]=T, s[4..8]="code" ∈ dict → dp[8]=T. Return true.`,
      code: {
        javascript: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }
  return dp[s.length];
}`,
        python: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        words = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[len(s)]`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 48, memory: 42.2, beats: 95, approach: "DP + Set",
        code: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = Array(s.length+1).fill(false);
  dp[0] = true;
  for (let i=1;i<=s.length;i++)
    for (let j=0;j<i;j++)
      if(dp[j]&&set.has(s.slice(j,i))){dp[i]=true;break;}
  return dp[s.length];
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 32, memory: 16.4, beats: 96, approach: "BFS",
        code: `from collections import deque
class Solution:
    def wordBreak(self, s, wordDict):
        ws = set(wordDict)
        q, seen = deque([0]), set()
        while q:
            i = q.popleft()
            if i in seen: continue
            seen.add(i)
            for j in range(i+1, len(s)+1):
                if s[i:j] in ws:
                    if j==len(s): return True
                    q.append(j)
        return False` },
      { user: "amit_verma_99", language: "Python", runtime: 42, memory: 16.7, beats: 88, approach: "Memoized recursion",
        code: `from functools import lru_cache
class Solution:
    def wordBreak(self, s, wordDict):
        ws = frozenset(wordDict)
        @lru_cache(None)
        def dp(i):
            if i==len(s): return True
            return any(s[i:j] in ws and dp(j) for j in range(i+1,len(s)+1))
        return dp(0)` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 55, memory: 42.8, beats: 90, approach: "BFS",
        code: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const q = [0], seen = new Set();
  while (q.length) {
    const i = q.shift();
    if (seen.has(i)) continue; seen.add(i);
    for (let j=i+1;j<=s.length;j++)
      if(set.has(s.slice(i,j))) { if(j===s.length) return true; q.push(j); }
  }
  return false;
}` },
      { user: "vikram_coder", language: "Java", runtime: 1, memory: 41.2, beats: 99, approach: "DP",
        code: `class Solution {
    public boolean wordBreak(String s, java.util.List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length()+1];
        dp[0]=true;
        for(int i=1;i<=s.length();i++)
            for(int j=0;j<i;j++)
                if(dp[j]&&set.contains(s.substring(j,i))){dp[i]=true;break;}
        return dp[s.length()];
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 0, memory: 8.4, beats: 100, approach: "DP",
        code: `class Solution {
public:
    bool wordBreak(string s, vector<string>& d) {
        unordered_set<string> ws(d.begin(),d.end());
        vector<bool> dp(s.size()+1,false); dp[0]=true;
        for(int i=1;i<=s.size();i++)
            for(int j=0;j<i;j++)
                if(dp[j]&&ws.count(s.substr(j,i-j))){dp[i]=true;break;}
        return dp[s.size()];
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 38, memory: 16.5, beats: 91, approach: "Trie DP",
        code: `class Solution:
    def wordBreak(self, s, wordDict):
        n, ws = len(s), set(wordDict)
        dp = [False]*(n+1); dp[0]=True
        mxl = max(len(w) for w in wordDict)
        for i in range(1,n+1):
            for l in range(1,min(i,mxl)+1):
                if dp[i-l] and s[i-l:i] in ws:
                    dp[i]=True; break
        return dp[n]` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 52, memory: 42.5, beats: 92, approach: "Memo recursive",
        code: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict), memo = {};
  const dfs = i => {
    if (i === s.length) return true;
    if (i in memo) return memo[i];
    for (let j=i+1;j<=s.length;j++)
      if(set.has(s.slice(i,j))&&dfs(j)) return memo[i]=true;
    return memo[i]=false;
  };
  return dfs(0);
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 36, memory: 16.4, beats: 93, approach: "DP forward",
        code: `class Solution:
    def wordBreak(self, s, wordDict):
        dp = {0}
        for i in range(1, len(s)+1):
            dp.add(i) if any(s[j:i] in wordDict and j in dp for j in range(i)) else None
        return len(s) in dp` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 50, memory: 42.3, beats: 93, approach: "Clean DP",
        code: `function wordBreak(s, w) {
  const ws = new Set(w), n = s.length;
  const dp = [true, ...Array(n).fill(false)];
  for (let i = 1; i <= n; i++)
    for (const word of ws)
      if (i >= word.length && dp[i - word.length] && s.slice(i - word.length, i) === word)
        dp[i] = true;
  return dp[n];
}` },
    ],
  },

  10: {
    editorial: {
      intuition: `We need all combinations that sum to target, with unlimited reuse. Backtracking explores all possibilities but prunes early: sort candidates so once a candidate exceeds the remaining target, all later candidates (larger) can be skipped.`,
      approach: [
        "Sort candidates in ascending order.",
        "Define a recursive function bt(start, current, remaining).",
        "If remaining === 0, add a copy of current to results.",
        "For each index i from start: if candidates[i] > remaining, break (pruning).",
        "Otherwise, push candidates[i], recurse with bt(i, current, remaining − candidates[i]), then pop (backtrack).",
        "Passing i (not i+1) allows reusing the same element.",
      ],
      timeComplexity: "O(N^(T/M + 1)) where T=target, M=smallest candidate",
      spaceComplexity: "O(T/M) for recursion depth",
      walkthrough: `candidates=[2,3,6,7], target=7: path=[2], rem=5 → path=[2,2], rem=3 → path=[2,2,2], rem=1 → [2,2,3] found (rem=0). Backtrack, try [2,3,3]? rem=2→[2,3]→rem<0 prune. [7] found directly.`,
      code: {
        javascript: `function combinationSum(candidates, target) {
  const res = [];
  candidates.sort((a, b) => a - b);
  const bt = (start, curr, rem) => {
    if (rem === 0) { res.push([...curr]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > rem) break;
      curr.push(candidates[i]);
      bt(i, curr, rem - candidates[i]);
      curr.pop();
    }
  };
  bt(0, [], target);
  return res;
}`,
        python: `class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        candidates.sort()
        res = []
        def bt(start, path, rem):
            if rem == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > rem:
                    break
                path.append(candidates[i])
                bt(i, path, rem - candidates[i])
                path.pop()
        bt(0, [], target)
        return res`,
      },
    },
    solutions: [
      { user: "rahul_sharma_dev", language: "JavaScript", runtime: 62, memory: 44.8, beats: 93, approach: "Backtracking + pruning",
        code: `function combinationSum(candidates, target) {
  candidates.sort((a,b)=>a-b);
  const res=[];
  const bt=(s,cur,rem)=>{
    if(!rem){res.push([...cur]);return;}
    for(let i=s;i<candidates.length;i++){
      if(candidates[i]>rem)break;
      cur.push(candidates[i]); bt(i,cur,rem-candidates[i]); cur.pop();
    }
  };
  bt(0,[],target); return res;
}` },
      { user: "priya_nair_codes", language: "Python", runtime: 48, memory: 17.6, beats: 91, approach: "Backtracking",
        code: `class Solution:
    def combinationSum(self, candidates, target):
        candidates.sort()
        res=[]
        def bt(s,path,rem):
            if rem==0: res.append(path[:]); return
            for i in range(s,len(candidates)):
                if candidates[i]>rem: break
                bt(i,path+[candidates[i]],rem-candidates[i])
        bt(0,[],target); return res` },
      { user: "amit_verma_99", language: "Python", runtime: 58, memory: 17.9, beats: 85, approach: "DP bottom-up",
        code: `class Solution:
    def combinationSum(self, candidates, target):
        dp=[[] for _ in range(target+1)]; dp[0][[]]
        dp[0]=[[]];
        for c in candidates:
            for t in range(c, target+1):
                dp[t]+=[combo+[c] for combo in dp[t-c]]
        return dp[target]` },
      { user: "sneha_gupta_dev", language: "JavaScript", runtime: 70, memory: 45.2, beats: 88, approach: "DFS with spread",
        code: `function combinationSum(candidates, target) {
  const res=[], c=candidates.sort((a,b)=>a-b);
  const dfs=(i,curr,rem)=>{
    if(rem===0){res.push(curr);return;}
    if(i===c.length||c[i]>rem)return;
    dfs(i+1,curr,rem);
    dfs(i,[...curr,c[i]],rem-c[i]);
  };
  dfs(0,[],target); return res;
}` },
      { user: "vikram_coder", language: "Java", runtime: 1, memory: 43.1, beats: 99, approach: "Backtracking",
        code: `class Solution {
    List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> combinationSum(int[] c, int t) {
        Arrays.sort(c); bt(c,t,0,new ArrayList<>()); return res;
    }
    void bt(int[] c,int rem,int s,List<Integer> cur){
        if(rem==0){res.add(new ArrayList<>(cur));return;}
        for(int i=s;i<c.length;i++){
            if(c[i]>rem)break;
            cur.add(c[i]); bt(c,rem-c[i],i,cur); cur.remove(cur.size()-1);
        }
    }
}` },
      { user: "neha_singh_tech", language: "C++", runtime: 0, memory: 13.4, beats: 100, approach: "Backtracking",
        code: `class Solution {
    void bt(vector<int>& c,int rem,int s,vector<int>& cur,vector<vector<int>>& res){
        if(!rem){res.push_back(cur);return;}
        for(int i=s;i<c.size()&&c[i]<=rem;i++){
            cur.push_back(c[i]); bt(c,rem-c[i],i,cur,res); cur.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& c,int t){
        sort(c.begin(),c.end()); vector<vector<int>> res; vector<int> cur;
        bt(c,t,0,cur,res); return res;
    }
};` },
      { user: "arjun_kapoor_01", language: "Python", runtime: 52, memory: 17.7, beats: 89, approach: "Recursive clean",
        code: `class Solution:
    def combinationSum(self, candidates, target):
        def dfs(remain, combo, start):
            if remain==0: return [combo]
            if remain<0: return []
            return [c for i in range(start,len(candidates))
                      for c in dfs(remain-candidates[i], combo+[candidates[i]], i)]
        return dfs(target,[],0)` },
      { user: "pooja_mehta_dev", language: "JavaScript", runtime: 66, memory: 45.0, beats: 90, approach: "Generator",
        code: `function combinationSum(candidates, target) {
  candidates.sort((a,b)=>a-b);
  const res=[];
  function* gen(s,cur,rem){
    if(!rem){yield cur;return;}
    for(let i=s;i<candidates.length&&candidates[i]<=rem;i++)
      yield* gen(i,[...cur,candidates[i]],rem-candidates[i]);
  }
  for(const c of gen(0,[],target)) res.push(c);
  return res;
}` },
      { user: "rohit_jain_algo", language: "Python", runtime: 50, memory: 17.5, beats: 90, approach: "Iterative stack",
        code: `class Solution:
    def combinationSum(self, candidates, target):
        candidates.sort()
        res, stack = [], [(0,[],target)]
        while stack:
            s,path,rem = stack.pop()
            if rem==0: res.append(path); continue
            for i in range(s,len(candidates)):
                if candidates[i]>rem: break
                stack.append((i,path+[candidates[i]],rem-candidates[i]))
        return res` },
      { user: "divya_reddy_cs", language: "JavaScript", runtime: 64, memory: 44.9, beats: 91, approach: "Slice recursion",
        code: `function combinationSum(candidates, target) {
  candidates.sort((a,b)=>a-b);
  const res=[];
  const bt=(arr,cur,rem)=>{
    if(!rem){res.push(cur);return;}
    arr.forEach((c,i)=>{
      if(c<=rem) bt(arr.slice(i),cur.concat(c),rem-c);
    });
  };
  bt(candidates,[],target); return res;
}` },
    ],
  },
};

export function getProblemMeta(id: number): ProblemMeta | undefined {
  return editorials[id];
}

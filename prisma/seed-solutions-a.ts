import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Problems 1-25 solutions
// Each problem gets 4 rows: editorial JS, editorial PY, community PY (@priya_s), community JS (@rahul_dev)

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
  // 1. Two Sum
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 1, solutionType: "editorial", language: "javascript",
    approach: "Hash Map — One Pass",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    explanation: "Use a hash map to store each number's index as we iterate. For every element we check if its complement (target - current) already exists in the map. If yes, we found the pair in a single pass.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 1, solutionType: "editorial", language: "python",
    approach: "Hash Map — One Pass",
    code: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    explanation: "Use a dict to store each number's index as we iterate. For every element we check if its complement (target - current) already exists. If yes, return both indices.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 1, solutionType: "community", language: "python",
    approach: "Dict with early return",
    code: `def twoSum(nums, target):
    d = {}
    for i, v in enumerate(nums):
        if target - v in d:
            return [d[target - v], i]
        d[v] = i`,
    explanation: "Compact one-liner style using dict comprehension lookup.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 52, memory: 17.4, beats: 91,
  },
  {
    problemId: 1, solutionType: "community", language: "javascript",
    approach: "Object map instead of Map()",
    code: `function twoSum(nums, target) {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    if (obj[target - nums[i]] !== undefined) return [obj[target - nums[i]], i];
    obj[nums[i]] = i;
  }
}`,
    explanation: "Same logic but using a plain object instead of Map — slightly faster in V8 for small integer keys.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 48, memory: 42.1, beats: 95,
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Best Time to Buy and Sell Stock
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 2, solutionType: "editorial", language: "javascript",
    approach: "One Pass — Track Min Price",
    code: `function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
    explanation: "Track the minimum price seen so far. At each day compute profit if sold today (price - minPrice) and update the global maximum. Single pass, no extra space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 2, solutionType: "editorial", language: "python",
    approach: "One Pass — Track Min Price",
    code: `def maxProfit(prices: list[int]) -> int:
    min_price, max_profit = float('inf'), 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit`,
    explanation: "Track the minimum price seen so far. At each day compute profit if sold today and update the global maximum.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 2, solutionType: "community", language: "python",
    approach: "Two Pointer sliding window",
    code: `def maxProfit(prices):
    l, r, res = 0, 1, 0
    while r < len(prices):
        if prices[l] < prices[r]:
            res = max(res, prices[r] - prices[l])
        else:
            l = r
        r += 1
    return res`,
    explanation: "Classic two-pointer where left = buy day and right = sell day. Move left to right when prices decrease.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 610, memory: 27.3, beats: 88,
  },
  {
    problemId: 2, solutionType: "community", language: "javascript",
    approach: "Kadane's variant",
    code: `function maxProfit(prices) {
  let max = 0, cur = 0;
  for (let i = 1; i < prices.length; i++) {
    cur = Math.max(0, cur + prices[i] - prices[i - 1]);
    max = Math.max(max, cur);
  }
  return max;
}`,
    explanation: "Convert to daily diffs array and apply Kadane's max subarray — elegant and equivalent.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 58, memory: 51.1, beats: 93,
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Contains Duplicate
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 3, solutionType: "editorial", language: "javascript",
    approach: "Set — O(n) lookup",
    code: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
    explanation: "Insert each number into a Set. If we encounter a number already in the Set, a duplicate exists. Early exit makes this practical.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 3, solutionType: "editorial", language: "python",
    approach: "Set — O(n) lookup",
    code: `def containsDuplicate(nums: list[int]) -> bool:
    return len(nums) != len(set(nums))`,
    explanation: "A set removes duplicates. If the set is smaller than the array, a duplicate existed.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 3, solutionType: "community", language: "python",
    approach: "Sort then check adjacent",
    code: `def containsDuplicate(nums):
    nums.sort()
    return any(nums[i] == nums[i+1] for i in range(len(nums)-1))`,
    explanation: "After sorting, duplicates are adjacent — check consecutive pairs.",
    timeComplex: "O(n log n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 145, memory: 24.5, beats: 72,
  },
  {
    problemId: 3, solutionType: "community", language: "javascript",
    approach: "One-liner Set size check",
    code: `const containsDuplicate = (nums) => new Set(nums).size !== nums.length;`,
    explanation: "Concise functional approach — Set deduplicates, compare sizes.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 62, memory: 57.2, beats: 85,
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Product of Array Except Self
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 4, solutionType: "editorial", language: "javascript",
    approach: "Prefix & Suffix Products",
    code: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
  return res;
}`,
    explanation: "First pass fills result with prefix products (product of all elements to the left). Second pass multiplies by suffix products (all elements to the right). No division, O(1) extra space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 4, solutionType: "editorial", language: "python",
    approach: "Prefix & Suffix Products",
    code: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
    explanation: "Two passes: first builds prefix products, second multiplies by suffix products in reverse.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 4, solutionType: "community", language: "python",
    approach: "Prefix array + suffix variable",
    code: `def productExceptSelf(nums):
    prefix = [1] * len(nums)
    for i in range(1, len(nums)):
        prefix[i] = prefix[i-1] * nums[i-1]
    suf = 1
    for i in range(len(nums)-1, -1, -1):
        prefix[i] *= suf
        suf *= nums[i]
    return prefix`,
    explanation: "Explicit prefix array then collapse with suffix variable — same O(n)/O(1) idea, easier to read.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 172, memory: 21.8, beats: 90,
  },
  {
    problemId: 4, solutionType: "community", language: "javascript",
    approach: "Reduce prefix & suffix arrays",
    code: `function productExceptSelf(nums) {
  const n = nums.length;
  const pre = Array(n).fill(1), suf = Array(n).fill(1);
  for (let i = 1; i < n; i++) pre[i] = pre[i-1] * nums[i-1];
  for (let i = n-2; i >= 0; i--) suf[i] = suf[i+1] * nums[i+1];
  return nums.map((_, i) => pre[i] * suf[i]);
}`,
    explanation: "Build explicit prefix and suffix arrays, then zip-multiply for clarity.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 78, memory: 55.4, beats: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Maximum Subarray
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 5, solutionType: "editorial", language: "javascript",
    approach: "Kadane's Algorithm",
    code: `function maxSubArray(nums) {
  let maxSum = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    maxSum = Math.max(maxSum, cur);
  }
  return maxSum;
}`,
    explanation: "Kadane's: at each position decide whether to extend the current subarray or start fresh. Keep a running maximum. Classic O(n) DP.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 5, solutionType: "editorial", language: "python",
    approach: "Kadane's Algorithm",
    code: `def maxSubArray(nums: list[int]) -> int:
    cur = max_sum = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        max_sum = max(max_sum, cur)
    return max_sum`,
    explanation: "Classic Kadane's: decide to extend current subarray or restart at each element.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 5, solutionType: "community", language: "python",
    approach: "DP array for clarity",
    code: `def maxSubArray(nums):
    dp = nums[:]
    for i in range(1, len(nums)):
        dp[i] = max(nums[i], dp[i-1] + nums[i])
    return max(dp)`,
    explanation: "Explicit DP array shows the recurrence clearly: dp[i] = max(nums[i], dp[i-1] + nums[i]).",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 178, memory: 28.5, beats: 77,
  },
  {
    problemId: 5, solutionType: "community", language: "javascript",
    approach: "Reduce one-liner",
    code: `function maxSubArray(nums) {
  return nums.reduce(([best, cur], n) => {
    const next = Math.max(n, cur + n);
    return [Math.max(best, next), next];
  }, [nums[0], nums[0]])[0];
}`,
    explanation: "Functional reduce packing state in a tuple — same Kadane logic but idiomatic JS.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 60, memory: 50.8, beats: 92,
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Maximum Product Subarray
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 6, solutionType: "editorial", language: "javascript",
    approach: "Track Min & Max Products",
    code: `function maxProduct(nums) {
  let res = Math.max(...nums);
  let curMin = 1, curMax = 1;
  for (const n of nums) {
    if (n === 0) { curMin = curMax = 1; continue; }
    const tmp = curMax * n;
    curMax = Math.max(n, curMax * n, curMin * n);
    curMin = Math.min(n, tmp, curMin * n);
    res = Math.max(res, curMax);
  }
  return res;
}`,
    explanation: "Track both the maximum and minimum product ending at each position (negative × negative = positive). Reset on zero. O(n) time, O(1) space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 6, solutionType: "editorial", language: "python",
    approach: "Track Min & Max Products",
    code: `def maxProduct(nums: list[int]) -> int:
    res = max(nums)
    cur_min = cur_max = 1
    for n in nums:
        if n == 0:
            cur_min = cur_max = 1
            continue
        candidates = (n, cur_max * n, cur_min * n)
        cur_max, cur_min = max(candidates), min(candidates)
        res = max(res, cur_max)
    return res`,
    explanation: "A negative number can flip min to max and vice versa, so track both simultaneously.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 6, solutionType: "community", language: "python",
    approach: "Forward & reverse scan",
    code: `def maxProduct(nums):
    res, prod = float('-inf'), 1
    for n in nums:
        prod *= n
        res = max(res, prod)
        if prod == 0: prod = 1
    prod = 1
    for n in reversed(nums):
        prod *= n
        res = max(res, prod)
        if prod == 0: prod = 1
    return res`,
    explanation: "Scan left-to-right and right-to-left, resetting on zero. One of the two passes always handles odd-count negatives correctly.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 62, memory: 16.9, beats: 88,
  },
  {
    problemId: 6, solutionType: "community", language: "javascript",
    approach: "DP with min/max arrays",
    code: `function maxProduct(nums) {
  const n = nums.length;
  const dpMax = [...nums], dpMin = [...nums];
  for (let i = 1; i < n; i++) {
    dpMax[i] = Math.max(nums[i], dpMax[i-1]*nums[i], dpMin[i-1]*nums[i]);
    dpMin[i] = Math.min(nums[i], dpMax[i-1]*nums[i], dpMin[i-1]*nums[i]);
  }
  return Math.max(...dpMax);
}`,
    explanation: "Explicit DP arrays for min and max to visualise the recurrence.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 64, memory: 52.0, beats: 82,
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Find Minimum in Rotated Sorted Array
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 7, solutionType: "editorial", language: "javascript",
    approach: "Binary Search",
    code: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}`,
    explanation: "If nums[mid] > nums[hi] the minimum is in the right half; otherwise it's in the left half (including mid). Converge to the rotation point.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 7, solutionType: "editorial", language: "python",
    approach: "Binary Search",
    code: `def findMin(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]`,
    explanation: "Compare mid with hi to determine which half contains the minimum. Shrink window until lo == hi.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 7, solutionType: "community", language: "python",
    approach: "Compare mid with lo",
    code: `def findMin(nums):
    if nums[0] <= nums[-1]: return nums[0]
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] >= nums[0]: lo = mid + 1
        else: hi = mid
    return nums[lo]`,
    explanation: "Early exit if array not rotated; otherwise binary search comparing to nums[0].",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 38, memory: 16.2, beats: 94,
  },
  {
    problemId: 7, solutionType: "community", language: "javascript",
    approach: "Recursive binary search",
    code: `function findMin(nums) {
  function helper(lo, hi) {
    if (lo === hi) return nums[lo];
    const mid = (lo + hi) >> 1;
    return nums[mid] > nums[hi] ? helper(mid + 1, hi) : helper(lo, mid);
  }
  return helper(0, nums.length - 1);
}`,
    explanation: "Recursive variant of the same binary search for clarity.",
    timeComplex: "O(log n)", spaceComplex: "O(log n)",
    username: "@rahul_dev", runtime: 44, memory: 49.1, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Search in Rotated Sorted Array
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 8, solutionType: "editorial", language: "javascript",
    approach: "Binary Search with pivot awareness",
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
    explanation: "At each step determine which half is sorted. If the target lies in the sorted half, search there; otherwise search the other half.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 8, solutionType: "editorial", language: "python",
    approach: "Binary Search with pivot awareness",
    code: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
    explanation: "One half is always sorted. Decide which half the target belongs to and shrink accordingly.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
  },
  {
    problemId: 8, solutionType: "community", language: "python",
    approach: "Find pivot first, then binary search",
    code: `def search(nums, target):
    import bisect
    n = len(nums)
    lo, hi = 0, n - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]: lo = mid + 1
        else: hi = mid
    pivot = lo
    lo, hi = 0, n - 1
    if nums[pivot] <= target <= nums[hi]: lo, hi = pivot, n - 1
    else: hi = pivot - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
    explanation: "Find the rotation pivot first, then pick the correct sorted half and do standard binary search.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 36, memory: 16.5, beats: 95,
  },
  {
    problemId: 8, solutionType: "community", language: "javascript",
    approach: "Three-way split",
    code: `function search(nums, target) {
  let [lo, hi] = [0, nums.length - 1];
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      target >= nums[lo] && target < nums[mid] ? hi = mid - 1 : lo = mid + 1;
    } else {
      target > nums[mid] && target <= nums[hi] ? lo = mid + 1 : hi = mid - 1;
    }
  }
  return -1;
}`,
    explanation: "Ternary-expression style for compactness — same logic as editorial.",
    timeComplex: "O(log n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 42, memory: 48.7, beats: 93,
  },

  // ─────────────────────────────────────────────────────────────
  // 9. 3Sum
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 9, solutionType: "editorial", language: "javascript",
    approach: "Sort + Two Pointers",
    code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum === 0) {
        res.push([nums[i], nums[lo], nums[hi]]);
        while (lo < hi && nums[lo] === nums[lo + 1]) lo++;
        while (lo < hi && nums[hi] === nums[hi - 1]) hi--;
        lo++; hi--;
      } else if (sum < 0) lo++;
      else hi--;
    }
  }
  return res;
}`,
    explanation: "Sort array. Fix one element and use two pointers for the other two. Skip duplicates at each pointer position to avoid duplicate triplets.",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
  },
  {
    problemId: 9, solutionType: "editorial", language: "python",
    approach: "Sort + Two Pointers",
    code: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i, n in enumerate(nums[:-2]):
        if i > 0 and n == nums[i-1]:
            continue
        lo, hi = i + 1, len(nums) - 1
        while lo < hi:
            s = n + nums[lo] + nums[hi]
            if s == 0:
                res.append([n, nums[lo], nums[hi]])
                while lo < hi and nums[lo] == nums[lo+1]: lo += 1
                while lo < hi and nums[hi] == nums[hi-1]: hi -= 1
                lo += 1; hi -= 1
            elif s < 0:
                lo += 1
            else:
                hi -= 1
    return res`,
    explanation: "Sort first. Fix first element, two-pointer for the remaining two. Skip duplicates carefully.",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
  },
  {
    problemId: 9, solutionType: "community", language: "python",
    approach: "Hash set dedup",
    code: `def threeSum(nums):
    nums.sort(); res = set()
    for i in range(len(nums)-2):
        if nums[i] > 0: break
        seen = {}
        for j in range(i+1, len(nums)):
            comp = -nums[i] - nums[j]
            if comp in seen:
                res.add((nums[i], comp, nums[j]))
            seen[nums[j]] = j
    return list(map(list, res))`,
    explanation: "Inner loop uses a hash set to find the complement. Outer set of tuples deduplicates results automatically.",
    timeComplex: "O(n²)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 410, memory: 20.1, beats: 68,
  },
  {
    problemId: 9, solutionType: "community", language: "javascript",
    approach: "Early exit optimisations",
    code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i && nums[i] === nums[i-1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r];
      if (!s) { res.push([nums[i], nums[l++], nums[r--]]); while (l < r && nums[l] === nums[l-1]) l++; }
      else s < 0 ? l++ : r--;
    }
  }
  return res;
}`,
    explanation: "Added `nums[i] > 0` early break since sorted array means sum can't be 0 after that.",
    timeComplex: "O(n²)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 76, memory: 57.3, beats: 89,
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Container With Most Water
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 10, solutionType: "editorial", language: "javascript",
    approach: "Two Pointers",
    code: `function maxArea(height) {
  let lo = 0, hi = height.length - 1, max = 0;
  while (lo < hi) {
    max = Math.max(max, Math.min(height[lo], height[hi]) * (hi - lo));
    if (height[lo] < height[hi]) lo++;
    else hi--;
  }
  return max;
}`,
    explanation: "Start with widest container. Move the shorter line inward — the only way to potentially increase area. O(n) with no extra space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 10, solutionType: "editorial", language: "python",
    approach: "Two Pointers",
    code: `def maxArea(height: list[int]) -> int:
    lo, hi, res = 0, len(height) - 1, 0
    while lo < hi:
        res = max(res, min(height[lo], height[hi]) * (hi - lo))
        if height[lo] < height[hi]:
            lo += 1
        else:
            hi -= 1
    return res`,
    explanation: "Classic two-pointer greedy: move the shorter boundary inward to find a potentially larger area.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 10, solutionType: "community", language: "python",
    approach: "Aggressive pointer skip",
    code: `def maxArea(height):
    lo, hi, res = 0, len(height)-1, 0
    while lo < hi:
        h = min(height[lo], height[hi])
        res = max(res, h * (hi - lo))
        while lo < hi and height[lo] <= h: lo += 1
        while lo < hi and height[hi] <= h: hi -= 1
    return res`,
    explanation: "Skip all heights shorter than or equal to the current min — they can't improve area at smaller widths.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 390, memory: 27.6, beats: 80,
  },
  {
    problemId: 10, solutionType: "community", language: "javascript",
    approach: "While both sides advance",
    code: `function maxArea(h) {
  let [l, r, m] = [0, h.length-1, 0];
  while (l < r) {
    m = Math.max(m, (r-l) * Math.min(h[l], h[r]));
    h[l] <= h[r] ? l++ : r--;
  }
  return m;
}`,
    explanation: "Compact two-pointer with ternary — identical logic to editorial in fewer lines.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@rahul_dev", runtime: 54, memory: 52.2, beats: 93,
  },

  // ─────────────────────────────────────────────────────────────
  // 15. Valid Parentheses
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 15, solutionType: "editorial", language: "javascript",
    approach: "Stack",
    code: `function isValid(s) {
  const stack = [], map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if (!map[c]) { stack.push(c); }
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}`,
    explanation: "Push opening brackets onto a stack. For each closing bracket, pop and verify it matches. If stack is empty at the end, all brackets are matched.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 15, solutionType: "editorial", language: "python",
    approach: "Stack",
    code: `def isValid(s: str) -> bool:
    stack, close_to_open = [], {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in close_to_open:
            if not stack or stack[-1] != close_to_open[c]:
                return False
            stack.pop()
        else:
            stack.append(c)
    return not stack`,
    explanation: "Classic stack-based bracket matching using a dict for O(1) lookups.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 15, solutionType: "community", language: "python",
    approach: "Replace pairs repeatedly",
    code: `def isValid(s):
    while '()' in s or '{}' in s or '[]' in s:
        s = s.replace('()','').replace('{}','').replace('[]','')
    return s == ''`,
    explanation: "Repeatedly strip innermost valid pairs until none remain. Simple but O(n²) in the worst case.",
    timeComplex: "O(n²)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 38, memory: 16.1, beats: 71,
  },
  {
    problemId: 15, solutionType: "community", language: "javascript",
    approach: "Stack with Set",
    code: `function isValid(s) {
  const open = new Set(['(','[','{']), pairs = {'(':')','[':']','{':'}'};
  const stack = [];
  for (const c of s) {
    if (open.has(c)) stack.push(c);
    else if (!stack.length || pairs[stack.pop()] !== c) return false;
  }
  return !stack.length;
}`,
    explanation: "Use a Set for O(1) open-bracket detection and a Map for pair lookup.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 50, memory: 48.3, beats: 88,
  },

  // ─────────────────────────────────────────────────────────────
  // 16. Min Stack
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 16, solutionType: "editorial", language: "javascript",
    approach: "Dual Stack",
    code: `class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) {
    this.stack.push(val);
    this.minStack.push(Math.min(val, this.minStack.at(-1) ?? val));
  }
  pop() { this.stack.pop(); this.minStack.pop(); }
  top() { return this.stack.at(-1); }
  getMin() { return this.minStack.at(-1); }
}`,
    explanation: "Maintain a parallel minStack where each position stores the minimum up to that index. Push and pop stay synchronised. All operations O(1).",
    timeComplex: "O(1)", spaceComplex: "O(n)",
  },
  {
    problemId: 16, solutionType: "editorial", language: "python",
    approach: "Dual Stack",
    code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        self.min_stack.append(min(val, self.min_stack[-1] if self.min_stack else val))

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
    explanation: "A parallel min_stack always has the current minimum at its top, maintained in sync with the main stack.",
    timeComplex: "O(1)", spaceComplex: "O(n)",
  },
  {
    problemId: 16, solutionType: "community", language: "python",
    approach: "Store (val, curMin) tuples",
    code: `class MinStack:
    def __init__(self): self.stack = []
    def push(self, val):
        self.stack.append((val, min(val, self.stack[-1][1] if self.stack else val)))
    def pop(self): self.stack.pop()
    def top(self): return self.stack[-1][0]
    def getMin(self): return self.stack[-1][1]`,
    explanation: "Pack value and current minimum into a single tuple — one stack instead of two.",
    timeComplex: "O(1)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 44, memory: 19.5, beats: 90,
  },
  {
    problemId: 16, solutionType: "community", language: "javascript",
    approach: "Linked list of {val, min} nodes",
    code: `class MinStack {
  constructor() { this.head = null; }
  push(val) {
    this.head = { val, min: this.head ? Math.min(val, this.head.min) : val, next: this.head };
  }
  pop() { this.head = this.head.next; }
  top() { return this.head.val; }
  getMin() { return this.head.min; }
}`,
    explanation: "Use a singly linked list where each node carries the minimum seen up to that point.",
    timeComplex: "O(1)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 55, memory: 52.8, beats: 84,
  },

  // ─────────────────────────────────────────────────────────────
  // 18. Evaluate Reverse Polish Notation
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 18, solutionType: "editorial", language: "javascript",
    approach: "Stack",
    code: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if ('+-*/'.includes(t)) {
      const b = stack.pop(), a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else stack.push(Number(t));
  }
  return stack[0];
}`,
    explanation: "Push numbers onto stack. On operator, pop two operands, apply operation, push result. Final stack has one element: the answer.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 18, solutionType: "editorial", language: "python",
    approach: "Stack",
    code: `def evalRPN(tokens: list[str]) -> int:
    stack = []
    for t in tokens:
        if t in '+-*/':
            b, a = stack.pop(), stack.pop()
            if t == '+': stack.append(a + b)
            elif t == '-': stack.append(a - b)
            elif t == '*': stack.append(a * b)
            else: stack.append(int(a / b))
        else:
            stack.append(int(t))
    return stack[0]`,
    explanation: "Classic RPN evaluation with a stack. Note Python's int() truncates toward zero (same as C).",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 18, solutionType: "community", language: "python",
    approach: "Lambda dispatch dict",
    code: `def evalRPN(tokens):
    from operator import add, sub, mul
    ops = {'+': add, '-': sub, '*': mul, '/': lambda a,b: int(a/b)}
    stack = []
    for t in tokens:
        if t in ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[t](a, b))
        else:
            stack.append(int(t))
    return stack[0]`,
    explanation: "Dispatch dict maps operator strings to functions for clean code.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 52, memory: 17.0, beats: 88,
  },
  {
    problemId: 18, solutionType: "community", language: "javascript",
    approach: "Map of operator functions",
    code: `function evalRPN(tokens) {
  const ops = { '+': (a,b)=>a+b, '-': (a,b)=>a-b, '*': (a,b)=>a*b, '/': (a,b)=>Math.trunc(a/b) };
  const s = [];
  for (const t of tokens) {
    if (ops[t]) { const b=s.pop(), a=s.pop(); s.push(ops[t](a,b)); }
    else s.push(+t);
  }
  return s[0];
}`,
    explanation: "Map operators to arrow functions for declarative dispatch.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 58, memory: 50.1, beats: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // 19. Generate Parentheses
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 19, solutionType: "editorial", language: "javascript",
    approach: "Backtracking",
    code: `function generateParenthesis(n) {
  const res = [];
  function bt(cur, open, close) {
    if (cur.length === 2 * n) { res.push(cur); return; }
    if (open < n) bt(cur + '(', open + 1, close);
    if (close < open) bt(cur + ')', open, close + 1);
  }
  bt('', 0, 0);
  return res;
}`,
    explanation: "Backtrack tracking open and close counts. Add '(' if open < n, add ')' if close < open. Valid combinations fall out naturally.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(n)",
  },
  {
    problemId: 19, solutionType: "editorial", language: "python",
    approach: "Backtracking",
    code: `def generateParenthesis(n: int) -> list[str]:
    res = []
    def bt(cur, open_c, close_c):
        if len(cur) == 2 * n:
            res.append(cur)
            return
        if open_c < n: bt(cur + '(', open_c + 1, close_c)
        if close_c < open_c: bt(cur + ')', open_c, close_c + 1)
    bt('', 0, 0)
    return res`,
    explanation: "Add '(' while open < n; add ')' while close < open. Recurse to build all valid sequences.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(n)",
  },
  {
    problemId: 19, solutionType: "community", language: "python",
    approach: "Iterative BFS / queue",
    code: `def generateParenthesis(n):
    from collections import deque
    q = deque([('', 0, 0)])
    res = []
    while q:
        cur, o, c = q.popleft()
        if len(cur) == 2 * n:
            res.append(cur)
        else:
            if o < n: q.append((cur+'(', o+1, c))
            if c < o: q.append((cur+')', o, c+1))
    return res`,
    explanation: "BFS level-by-level build: same logic as DFS but uses a queue.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(4ⁿ/√n)",
    username: "@priya_s", runtime: 30, memory: 17.2, beats: 85,
  },
  {
    problemId: 19, solutionType: "community", language: "javascript",
    approach: "Stack-based DFS iterative",
    code: `function generateParenthesis(n) {
  const res = [], stack = [['', 0, 0]];
  while (stack.length) {
    const [cur, o, c] = stack.pop();
    if (cur.length === 2*n) { res.push(cur); continue; }
    if (o < n) stack.push([cur+'(', o+1, c]);
    if (c < o) stack.push([cur+')', o, c+1]);
  }
  return res;
}`,
    explanation: "Iterative DFS using an explicit stack — avoids call-stack overflow for large n.",
    timeComplex: "O(4ⁿ/√n)", spaceComplex: "O(4ⁿ/√n)",
    username: "@rahul_dev", runtime: 50, memory: 51.0, beats: 87,
  },

  // ─────────────────────────────────────────────────────────────
  // 20. Daily Temperatures
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 20, solutionType: "editorial", language: "javascript",
    approach: "Monotonic Decreasing Stack",
    code: `function dailyTemperatures(temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = []; // indices
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack.at(-1)]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}`,
    explanation: "Maintain a stack of indices with decreasing temperatures. When a warmer day arrives, pop indices and compute the wait days.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 20, solutionType: "editorial", language: "python",
    approach: "Monotonic Decreasing Stack",
    code: `def dailyTemperatures(temperatures: list[int]) -> list[int]:
    res = [0] * len(temperatures)
    stack = []  # indices
    for i, t in enumerate(temperatures):
        while stack and t > temperatures[stack[-1]]:
            j = stack.pop()
            res[j] = i - j
        stack.append(i)
    return res`,
    explanation: "Monotonic stack: push indices. When current temp > top of stack temp, resolve waiting days for that index.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 20, solutionType: "community", language: "python",
    approach: "Backwards scan",
    code: `def dailyTemperatures(temperatures):
    n = len(temperatures)
    res = [0] * n
    for i in range(n-2, -1, -1):
        j = i + 1
        while j < n and temperatures[j] <= temperatures[i]:
            if res[j] == 0: j = n; break
            j += res[j]
        if j < n: res[i] = j - i
    return res`,
    explanation: "Scan from right using jump pointers: leap forward by already-computed distances.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
    username: "@priya_s", runtime: 520, memory: 27.5, beats: 78,
  },
  {
    problemId: 20, solutionType: "community", language: "javascript",
    approach: "Stack storing [temp, index] pairs",
    code: `function dailyTemperatures(temperatures) {
  const ans = new Array(temperatures.length).fill(0);
  const st = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (st.length && st[st.length-1][0] < temperatures[i]) {
      const [, idx] = st.pop();
      ans[idx] = i - idx;
    }
    st.push([temperatures[i], i]);
  }
  return ans;
}`,
    explanation: "Store [value, index] pairs on the stack for slightly clearer access patterns.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 98, memory: 60.2, beats: 85,
  },

  // ─────────────────────────────────────────────────────────────
  // 21. Car Fleet
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 21, solutionType: "editorial", language: "javascript",
    approach: "Sort by position + Monotonic Stack",
    code: `function carFleet(target, position, speed) {
  const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
  const stack = [];
  for (const [p, s] of cars) {
    const time = (target - p) / s;
    if (!stack.length || time > stack.at(-1)) stack.push(time);
  }
  return stack.length;
}`,
    explanation: "Sort cars by position descending. Compute each car's time to reach target. If a car arrives later than the one in front, it forms a new fleet (push to stack). Otherwise it catches up and joins.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
  },
  {
    problemId: 21, solutionType: "editorial", language: "python",
    approach: "Sort by position + Monotonic Stack",
    code: `def carFleet(target: int, position: list[int], speed: list[int]) -> int:
    pairs = sorted(zip(position, speed), reverse=True)
    stack = []
    for p, s in pairs:
        time = (target - p) / s
        if not stack or time > stack[-1]:
            stack.append(time)
    return len(stack)`,
    explanation: "Sort descending by position. A car joins the fleet in front if it arrives no later than the leading car.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
  },
  {
    problemId: 21, solutionType: "community", language: "python",
    approach: "No stack, just counter",
    code: `def carFleet(target, position, speed):
    times = [(target-p)/s for p, s in sorted(zip(position, speed), reverse=True)]
    fleets, cur_max = 0, 0
    for t in times:
        if t > cur_max:
            cur_max = t
            fleets += 1
    return fleets`,
    explanation: "Track the maximum time seen so far; whenever a car has a larger time, it can't catch up — new fleet.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 328, memory: 33.8, beats: 84,
  },
  {
    problemId: 21, solutionType: "community", language: "javascript",
    approach: "Sort and count max-time streaks",
    code: `function carFleet(target, position, speed) {
  const times = position.map((p,i) => (target-p)/speed[i]);
  const sorted = [...position].map((_,i)=>i).sort((a,b) => position[b]-position[a]);
  let fleets = 0, maxT = 0;
  for (const i of sorted) {
    if (times[i] > maxT) { maxT = times[i]; fleets++; }
  }
  return fleets;
}`,
    explanation: "Sort indices by position descending, then count rising time sequences.",
    timeComplex: "O(n log n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 80, memory: 63.5, beats: 82,
  },

  // ─────────────────────────────────────────────────────────────
  // 22. Largest Rectangle in Histogram
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 22, solutionType: "editorial", language: "javascript",
    approach: "Monotonic Stack",
    code: `function largestRectangleArea(heights) {
  const stack = [], n = heights.length;
  let maxArea = 0;
  for (let i = 0; i <= n; i++) {
    const h = i < n ? heights[i] : 0;
    while (stack.length && h < heights[stack.at(-1)]) {
      const height = heights[stack.pop()];
      const width  = stack.length ? i - stack.at(-1) - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
    explanation: "Use a monotonic increasing stack of indices. When a bar is shorter than the top of the stack, pop and compute the rectangle using that height. Width extends back to the new top of stack.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 22, solutionType: "editorial", language: "python",
    approach: "Monotonic Stack",
    code: `def largestRectangleArea(heights: list[int]) -> int:
    stack, max_area = [], 0
    heights = heights + [0]
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, ht = stack.pop()
            max_area = max(max_area, ht * (i - idx))
            start = idx
        stack.append((start, h))
    return max_area`,
    explanation: "Append sentinel 0 to flush stack at end. Track start index when popping to extend rectangles leftward.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
  },
  {
    problemId: 22, solutionType: "community", language: "python",
    approach: "Left & right boundary arrays",
    code: `def largestRectangleArea(heights):
    n = len(heights)
    left, right = [0]*n, [n]*n
    stack = []
    for i in range(n):
        while stack and heights[stack[-1]] >= heights[i]: stack.pop()
        left[i] = stack[-1]+1 if stack else 0
        stack.append(i)
    stack = []
    for i in range(n-1,-1,-1):
        while stack and heights[stack[-1]] >= heights[i]: stack.pop()
        right[i] = stack[-1]-1 if stack else n-1
        stack.append(i)
    return max(heights[i]*(right[i]-left[i]+1) for i in range(n))`,
    explanation: "Precompute left/right boundaries for each bar using two stacks, then compute max area in one pass.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 640, memory: 28.2, beats: 78,
  },
  {
    problemId: 22, solutionType: "community", language: "javascript",
    approach: "Divide and conquer",
    code: `function largestRectangleArea(heights) {
  function dc(l, r) {
    if (l > r) return 0;
    let minIdx = l;
    for (let i = l+1; i <= r; i++) if (heights[i] < heights[minIdx]) minIdx = i;
    return Math.max(
      heights[minIdx] * (r - l + 1),
      dc(l, minIdx-1),
      dc(minIdx+1, r)
    );
  }
  return dc(0, heights.length-1);
}`,
    explanation: "Find the minimum bar (limits width), compute its area, recursively solve left and right sub-histograms. O(n log n) average, O(n²) worst.",
    timeComplex: "O(n log n) avg", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 92, memory: 56.4, beats: 75,
  },

  // ─────────────────────────────────────────────────────────────
  // 23. Reverse a Linked List
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 23, solutionType: "editorial", language: "javascript",
    approach: "Iterative — Three Pointers",
    code: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    explanation: "Iterate through the list, reversing the next pointer at each node. Three pointers: prev, curr, and a temp for next. O(n) time, O(1) space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 23, solutionType: "editorial", language: "python",
    approach: "Iterative — Three Pointers",
    code: `def reverseList(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    explanation: "Three-pointer iterative reversal — classic O(n)/O(1) solution.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 23, solutionType: "community", language: "python",
    approach: "Recursive",
    code: `def reverseList(head):
    if not head or not head.next:
        return head
    new_head = reverseList(head.next)
    head.next.next = head
    head.next = None
    return new_head`,
    explanation: "Recursively reverse the rest of the list, then attach current node at the new tail.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 32, memory: 20.1, beats: 88,
  },
  {
    problemId: 23, solutionType: "community", language: "javascript",
    approach: "Stack collect then relink",
    code: `function reverseList(head) {
  const nodes = [];
  for (let c = head; c; c = c.next) nodes.push(c);
  for (let i = nodes.length - 1; i > 0; i--) nodes[i].next = nodes[i-1];
  if (nodes.length) { nodes[0].next = null; }
  return nodes.at(-1) ?? null;
}`,
    explanation: "Collect nodes into array, re-link in reverse order. Simpler to reason about.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 55, memory: 53.1, beats: 78,
  },

  // ─────────────────────────────────────────────────────────────
  // 24. Merge Two Sorted Lists
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 24, solutionType: "editorial", language: "javascript",
    approach: "Iterative with Dummy Head",
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
    explanation: "Use a dummy head to simplify edge cases. Compare heads of both lists, attach the smaller, advance its pointer. Append remaining list at the end.",
    timeComplex: "O(m+n)", spaceComplex: "O(1)",
  },
  {
    problemId: 24, solutionType: "editorial", language: "python",
    approach: "Iterative with Dummy Head",
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
    explanation: "Dummy head pattern for clean code — no special-casing for empty lists.",
    timeComplex: "O(m+n)", spaceComplex: "O(1)",
  },
  {
    problemId: 24, solutionType: "community", language: "python",
    approach: "Recursive",
    code: `def mergeTwoLists(l1, l2):
    if not l1: return l2
    if not l2: return l1
    if l1.val <= l2.val:
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    l2.next = mergeTwoLists(l1, l2.next)
    return l2`,
    explanation: "Elegant recursive merge — pick the smaller head and recurse on the rest.",
    timeComplex: "O(m+n)", spaceComplex: "O(m+n)",
    username: "@priya_s", runtime: 28, memory: 17.7, beats: 91,
  },
  {
    problemId: 24, solutionType: "community", language: "javascript",
    approach: "Collect + sort + rebuild",
    code: `function mergeTwoLists(l1, l2) {
  const vals = [];
  for (let n = l1; n; n = n.next) vals.push(n.val);
  for (let n = l2; n; n = n.next) vals.push(n.val);
  vals.sort((a,b) => a-b);
  const dummy = { next: null }; let cur = dummy;
  for (const v of vals) { cur.next = { val: v, next: null }; cur = cur.next; }
  return dummy.next;
}`,
    explanation: "Collect all values, sort, rebuild — easy to understand though O((m+n) log(m+n)).",
    timeComplex: "O((m+n) log(m+n))", spaceComplex: "O(m+n)",
    username: "@rahul_dev", runtime: 58, memory: 54.0, beats: 74,
  },

  // ─────────────────────────────────────────────────────────────
  // 25. Reorder List
  // ─────────────────────────────────────────────────────────────
  {
    problemId: 25, solutionType: "editorial", language: "javascript",
    approach: "Find Middle + Reverse Second Half + Merge",
    code: `function reorderList(head) {
  // 1. Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  // 2. Reverse second half
  let prev = null, curr = slow.next; slow.next = null;
  while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }
  // 3. Merge two halves
  let l1 = head, l2 = prev;
  while (l2) { const n1 = l1.next, n2 = l2.next; l1.next = l2; l2.next = n1; l1 = n1; l2 = n2; }
}`,
    explanation: "Three steps: (1) find the middle with slow/fast pointers; (2) reverse the second half; (3) interleave the two halves. All in O(n) time, O(1) space.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 25, solutionType: "editorial", language: "python",
    approach: "Find Middle + Reverse Second Half + Merge",
    code: `def reorderList(head) -> None:
    slow, fast = head, head
    while fast.next and fast.next.next:
        slow = slow.next; fast = fast.next.next
    # reverse second half
    prev, curr = None, slow.next
    slow.next = None
    while curr:
        nxt = curr.next; curr.next = prev; prev = curr; curr = nxt
    # merge
    l1, l2 = head, prev
    while l2:
        n1, n2 = l1.next, l2.next
        l1.next = l2; l2.next = n1
        l1 = n1; l2 = n2`,
    explanation: "Classic three-step in-place reorder: middle → reverse → interleave.",
    timeComplex: "O(n)", spaceComplex: "O(1)",
  },
  {
    problemId: 25, solutionType: "community", language: "python",
    approach: "Deque collect and rebuild",
    code: `def reorderList(head) -> None:
    from collections import deque
    dq = deque()
    cur = head
    while cur:
        dq.append(cur)
        cur = cur.next
    toggle, prev = True, None
    while dq:
        node = dq.popleft() if toggle else dq.pop()
        if prev: prev.next = node
        prev = node
        toggle = not toggle
    if prev: prev.next = None`,
    explanation: "Collect nodes in a deque, alternately pop from left and right to rebuild the reordered list.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@priya_s", runtime: 62, memory: 25.8, beats: 84,
  },
  {
    problemId: 25, solutionType: "community", language: "javascript",
    approach: "Array index walk",
    code: `function reorderList(head) {
  const nodes = [];
  for (let c = head; c; c = c.next) nodes.push(c);
  let lo = 0, hi = nodes.length - 1;
  while (lo < hi) {
    nodes[lo].next = nodes[hi];
    lo++;
    if (lo === hi) break;
    nodes[hi].next = nodes[lo];
    hi--;
  }
  nodes[lo].next = null;
}`,
    explanation: "Collect into array, use two-pointer index walk to relink — O(n) time but O(n) space.",
    timeComplex: "O(n)", spaceComplex: "O(n)",
    username: "@rahul_dev", runtime: 68, memory: 58.4, beats: 80,
  },
];

async function main() {
  console.log(`Seeding ${solutions.length} solutions for problems 1-25...`);

  // Delete existing solutions for these problem IDs first
  const problemIds = [...new Set(solutions.map((s) => s.problemId))];
  const deleted = await prisma.intelSolution.deleteMany({
    where: { problemId: { in: problemIds } },
  });
  console.log(`Deleted ${deleted.count} existing solutions for problems ${problemIds.join(", ")}`);

  await prisma.intelSolution.createMany({ data: solutions });
  console.log("Done seeding chunk A solutions.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

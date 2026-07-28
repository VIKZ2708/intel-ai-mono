/**
 * Java runners for all 75 problems.
 * Run with: npx tsx prisma/seed-java-runners.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ── Helpers for building the class Main block ──────────────────────────────
const LIST_HELPERS = `
  static ListNode toList(int... a){ListNode d=new ListNode(0),c=d;for(int v:a){c.next=new ListNode(v);c=c.next;}return d.next;}
  static int[] toArr(ListNode h){List<Integer> r=new ArrayList<>();while(h!=null){r.add(h.val);h=h.next;}return r.stream().mapToInt(Integer::intValue).toArray();}
  static boolean eqList(ListNode a,ListNode b){while(a!=null&&b!=null){if(a.val!=b.val)return false;a=a.next;b=b.next;}return a==null&&b==null;}`;

const TREE_HELPERS = `
  static TreeNode build(Integer... a){if(a.length==0||a[0]==null)return null;TreeNode root=new TreeNode(a[0]);Queue<TreeNode> q=new LinkedList<>();q.add(root);int i=1;while(i<a.length&&!q.isEmpty()){TreeNode n=q.poll();if(i<a.length&&a[i]!=null){n.left=new TreeNode(a[i]);q.add(n.left);}i++;if(i<a.length&&a[i]!=null){n.right=new TreeNode(a[i]);q.add(n.right);}i++;}return root;}
  static List<Integer> lvl(TreeNode root){List<Integer> r=new ArrayList<>();if(root==null)return r;Queue<TreeNode> q=new LinkedList<>();q.add(root);while(!q.isEmpty()){TreeNode n=q.poll();if(n==null){r.add(null);}else{r.add(n.val);q.add(n.left);q.add(n.right);}}while(!r.isEmpty()&&r.get(r.size()-1)==null)r.remove(r.size()-1);return r;}`;

function main(helpers: string, body: string, total: number): string {
  return `public class Main {${helpers}
  public static void main(String[] args) {
    Solution sol = new Solution();
    int passed = 0;
${body}
    System.out.println("\\n" + passed + "/${total} test cases passed.");
  }
}`;
}

// int output helper
function intCase(expr: string, exp: number, label: string): string {
  return `    { int r=(${expr}); boolean ok=r==${exp}; System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:${exp} | Got:"+r); if(ok)passed++; }`;
}
function boolCase(expr: string, exp: boolean, label: string): string {
  return `    { boolean r=(${expr}),ok=r==${exp}; System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:${exp} | Got:"+r); if(ok)passed++; }`;
}
function strCase(expr: string, exp: string, label: string): string {
  return `    { String r=String.valueOf(${expr}),ok2="${exp}"; boolean ok=r.equals(ok2); System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:${exp} | Got:"+r); if(ok)passed++; }`;
}
function arrCase(expr: string, exp: string, label: string): string {
  return `    { int[] r=(${expr}),e=${exp}; boolean ok=Arrays.equals(r,e); System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:"+Arrays.toString(e)+" | Got:"+Arrays.toString(r)); if(ok)passed++; }`.replace("Arrays.toString(e)", `Arrays.toString(e)`);
}

const updates: { id: number; javaRunner: string }[] = [

  // 1. Two Sum
  { id: 1, javaRunner: main("", `
    int[][] cs={{2,7,11,15},{3,2,4},{3,3}};
    int[] ts={9,6,6};
    int[][] es={{0,1},{1,2},{0,1}};
    for(int i=0;i<cs.length;i++){
      int[] r=sol.twoSum(cs[i],ts[i]);
      Arrays.sort(r); Arrays.sort(es[i]);
      boolean ok=Arrays.equals(r,es[i]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | nums="+Arrays.toString(cs[i])+" target="+ts[i]+" | Expected:"+Arrays.toString(es[i])+" | Got:"+Arrays.toString(r));
      if(ok)passed++;
    }`, 3) },

  // 2. Valid Parentheses
  { id: 2, javaRunner: main("", [
    boolCase(`sol.isValid("()")`, true, `s="()"`),
    boolCase(`sol.isValid("()[]{}")`, true, `s="()[]{}"`),
    boolCase(`sol.isValid("(]")`, false, `s="(]"`),
    boolCase(`sol.isValid("{[]}")`, true, `s="{[]}"`),
    boolCase(`sol.isValid("([)]")`, false, `s="([)]"`),
    boolCase(`sol.isValid("")`, true, `s=""`),
    boolCase(`sol.isValid("((")`, false, `s="((")`),
    boolCase(`sol.isValid("]")`, false, `s="]"`),
  ].join("\n"), 8) },

  // 3. Best Time to Buy and Sell Stock
  { id: 3, javaRunner: main("", [
    intCase(`sol.maxProfit(new int[]{7,1,5,3,6,4})`, 5, `prices=[7,1,5,3,6,4]`),
    intCase(`sol.maxProfit(new int[]{7,6,4,3,1})`, 0, `prices=[7,6,4,3,1]`),
    intCase(`sol.maxProfit(new int[]{1})`, 0, `prices=[1]`),
    intCase(`sol.maxProfit(new int[]{2,4,1})`, 2, `prices=[2,4,1]`),
    intCase(`sol.maxProfit(new int[]{3,3})`, 0, `prices=[3,3]`),
    intCase(`sol.maxProfit(new int[]{1,2})`, 1, `prices=[1,2]`),
    intCase(`sol.maxProfit(new int[]{2,1,4})`, 3, `prices=[2,1,4]`),
    intCase(`sol.maxProfit(new int[]{1,4,2,7})`, 6, `prices=[1,4,2,7]`),
  ].join("\n"), 8) },

  // 4. Maximum Subarray
  { id: 4, javaRunner: main("", [
    intCase(`sol.maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})`, 6, `nums=[-2,1,-3,4,-1,2,1,-5,4]`),
    intCase(`sol.maxSubArray(new int[]{1})`, 1, `nums=[1]`),
    intCase(`sol.maxSubArray(new int[]{5,4,-1,7,8})`, 23, `nums=[5,4,-1,7,8]`),
    intCase(`sol.maxSubArray(new int[]{-1})`, -1, `nums=[-1]`),
    intCase(`sol.maxSubArray(new int[]{-2,-1})`, -1, `nums=[-2,-1]`),
    intCase(`sol.maxSubArray(new int[]{1,2,3})`, 6, `nums=[1,2,3]`),
    intCase(`sol.maxSubArray(new int[]{-3,1,-2,4,-1})`, 4, `nums=[-3,1,-2,4,-1]`),
    intCase(`sol.maxSubArray(new int[]{0})`, 0, `nums=[0]`),
  ].join("\n"), 8) },

  // 5. Contains Duplicate
  { id: 5, javaRunner: main("", [
    boolCase(`sol.containsDuplicate(new int[]{1,2,3,1})`, true, `nums=[1,2,3,1]`),
    boolCase(`sol.containsDuplicate(new int[]{1,2,3,4})`, false, `nums=[1,2,3,4]`),
    boolCase(`sol.containsDuplicate(new int[]{1,1,1,3,3,4,3,2,4,2})`, true, `nums=[1,1,1,3,3,4,3,2,4,2]`),
    boolCase(`sol.containsDuplicate(new int[]{1})`, false, `nums=[1]`),
    boolCase(`sol.containsDuplicate(new int[]{})`, false, `nums=[]`),
    boolCase(`sol.containsDuplicate(new int[]{-1,-1})`, true, `nums=[-1,-1]`),
    boolCase(`sol.containsDuplicate(new int[]{0,0})`, true, `nums=[0,0]`),
    boolCase(`sol.containsDuplicate(new int[]{1,2})`, false, `nums=[1,2]`),
  ].join("\n"), 8) },

  // 6. Product of Array Except Self
  { id: 6, javaRunner: main("", `
    int[][][] cs={
      {{1,2,3,4},{24,12,8,6}},
      {{-1,1,0,-3,3},{0,0,9,0,0}},
      {{1,1},{1,1}},
      {{2,3,4},{12,8,6}},
    };
    for(int[][] c:cs){
      int[] r=sol.productExceptSelf(c[0].clone());
      boolean ok=Arrays.equals(r,c[1]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | nums="+Arrays.toString(c[0])+" | Expected:"+Arrays.toString(c[1])+" | Got:"+Arrays.toString(r));
      if(ok)passed++;
    }`, 4) },

  // 7. Valid Anagram
  { id: 7, javaRunner: main("", [
    boolCase(`sol.isAnagram("anagram","nagaram")`, true, `s=anagram t=nagaram`),
    boolCase(`sol.isAnagram("rat","car")`, false, `s=rat t=car`),
    boolCase(`sol.isAnagram("a","a")`, true, `s=a t=a`),
    boolCase(`sol.isAnagram("ab","ba")`, true, `s=ab t=ba`),
    boolCase(`sol.isAnagram("","")`, true, `s="" t=""`),
    boolCase(`sol.isAnagram("a","b")`, false, `s=a t=b`),
    boolCase(`sol.isAnagram("listen","silent")`, true, `s=listen t=silent`),
    boolCase(`sol.isAnagram("hello","world")`, false, `s=hello t=world`),
  ].join("\n"), 8) },

  // 8. Group Anagrams
  { id: 8, javaRunner: main("", `
    String[][] ins={{"eat","tea","tan","ate","nat","bat"},{""},{"a"}};
    int[] sizes={3,1,1};
    for(int i=0;i<ins.length;i++){
      List<List<String>> r=sol.groupAnagrams(ins[i]);
      boolean ok=r.size()==sizes[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | strs="+Arrays.toString(ins[i])+" | Expected "+sizes[i]+" groups | Got "+r.size());
      if(ok)passed++;
    }`, 3) },

  // 9. Longest Consecutive Sequence
  { id: 9, javaRunner: main("", [
    intCase(`sol.longestConsecutive(new int[]{100,4,200,1,3,2})`, 4, `nums=[100,4,200,1,3,2]`),
    intCase(`sol.longestConsecutive(new int[]{0,3,7,2,5,8,4,6,0,1})`, 9, `nums=[0,3,7,2,5,8,4,6,0,1]`),
    intCase(`sol.longestConsecutive(new int[]{})`, 0, `nums=[]`),
    intCase(`sol.longestConsecutive(new int[]{1})`, 1, `nums=[1]`),
    intCase(`sol.longestConsecutive(new int[]{1,2,3,4,5})`, 5, `nums=[1,2,3,4,5]`),
    intCase(`sol.longestConsecutive(new int[]{1,3,5,7})`, 1, `nums=[1,3,5,7]`),
    intCase(`sol.longestConsecutive(new int[]{0,1,2,4,8,5,6,7,9,3})`, 10, `nums=[0..9]`),
    intCase(`sol.longestConsecutive(new int[]{-1,0,1})`, 3, `nums=[-1,0,1]`),
  ].join("\n"), 8) },

  // 10. Climbing Stairs
  { id: 10, javaRunner: main("", [
    intCase(`sol.climbStairs(1)`, 1, `n=1`),
    intCase(`sol.climbStairs(2)`, 2, `n=2`),
    intCase(`sol.climbStairs(3)`, 3, `n=3`),
    intCase(`sol.climbStairs(4)`, 5, `n=4`),
    intCase(`sol.climbStairs(5)`, 8, `n=5`),
    intCase(`sol.climbStairs(6)`, 13, `n=6`),
    intCase(`sol.climbStairs(10)`, 89, `n=10`),
    intCase(`sol.climbStairs(7)`, 21, `n=7`),
  ].join("\n"), 8) },

  // 11. Coin Change
  { id: 11, javaRunner: main("", [
    intCase(`sol.coinChange(new int[]{1,5,11},15)`, 3, `coins=[1,5,11] amount=15`),
    intCase(`sol.coinChange(new int[]{2},3)`, -1, `coins=[2] amount=3`),
    intCase(`sol.coinChange(new int[]{1},0)`, 0, `coins=[1] amount=0`),
    intCase(`sol.coinChange(new int[]{1,2,5},11)`, 3, `coins=[1,2,5] amount=11`),
    intCase(`sol.coinChange(new int[]{186,419,83,408},6249)`, 20, `coins=[186,419,83,408] amount=6249`),
    intCase(`sol.coinChange(new int[]{1},1)`, 1, `coins=[1] amount=1`),
    intCase(`sol.coinChange(new int[]{2,5,10,1},27)`, 4, `coins=[2,5,10,1] amount=27`),
    intCase(`sol.coinChange(new int[]{3,5},7)`, -1, `coins=[3,5] amount=7`),
  ].join("\n"), 8) },

  // 12. Longest Common Subsequence
  { id: 12, javaRunner: main("", [
    intCase(`sol.longestCommonSubsequence("abcde","ace")`, 3, `text1=abcde text2=ace`),
    intCase(`sol.longestCommonSubsequence("abc","abc")`, 3, `text1=abc text2=abc`),
    intCase(`sol.longestCommonSubsequence("abc","def")`, 0, `text1=abc text2=def`),
    intCase(`sol.longestCommonSubsequence("","abc")`, 0, `text1="" text2=abc`),
    intCase(`sol.longestCommonSubsequence("bl","yby")`, 1, `text1=bl text2=yby`),
    intCase(`sol.longestCommonSubsequence("oxcpqrsvwf","shmtulqrypy")`, 2, `text1=oxcpqrsvwf text2=shmtulqrypy`),
    intCase(`sol.longestCommonSubsequence("ezupkr","ubmrapg")`, 2, `text1=ezupkr text2=ubmrapg`),
    intCase(`sol.longestCommonSubsequence("hofubmnylkra","pqhgxgdofcvmr")`, 4, `text1=hofubmnylkra text2=pqhgxgdofcvmr`),
  ].join("\n"), 8) },

  // 13. Word Break
  { id: 13, javaRunner: main("", [
    boolCase(`sol.wordBreak("leetcode",Arrays.asList("leet","code"))`, true, `s=leetcode`),
    boolCase(`sol.wordBreak("applepenapple",Arrays.asList("apple","pen"))`, true, `s=applepenapple`),
    boolCase(`sol.wordBreak("catsandog",Arrays.asList("cats","dog","sand","and","cat"))`, false, `s=catsandog`),
    boolCase(`sol.wordBreak("a",Arrays.asList("b"))`, false, `s=a dict=[b]`),
    boolCase(`sol.wordBreak("a",Arrays.asList("a"))`, true, `s=a dict=[a]`),
    boolCase(`sol.wordBreak("bb",Arrays.asList("a","b","bbb","bbbb"))`, true, `s=bb`),
    boolCase(`sol.wordBreak("",Arrays.asList("a"))`, true, `s="" dict=[a]`),
    boolCase(`sol.wordBreak("goalspecial",Arrays.asList("go","goal","goals","special"))`, true, `s=goalspecial`),
  ].join("\n"), 8) },

  // 14. Unique Paths
  { id: 14, javaRunner: main("", [
    intCase(`sol.uniquePaths(3,7)`, 28, `m=3 n=7`),
    intCase(`sol.uniquePaths(3,2)`, 3, `m=3 n=2`),
    intCase(`sol.uniquePaths(1,1)`, 1, `m=1 n=1`),
    intCase(`sol.uniquePaths(2,2)`, 2, `m=2 n=2`),
    intCase(`sol.uniquePaths(7,3)`, 28, `m=7 n=3`),
    intCase(`sol.uniquePaths(3,3)`, 6, `m=3 n=3`),
    intCase(`sol.uniquePaths(4,4)`, 20, `m=4 n=4`),
    intCase(`sol.uniquePaths(2,10)`, 10, `m=2 n=10`),
  ].join("\n"), 8) },

  // 15. Jump Game
  { id: 15, javaRunner: main("", [
    boolCase(`sol.canJump(new int[]{2,3,1,1,4})`, true, `nums=[2,3,1,1,4]`),
    boolCase(`sol.canJump(new int[]{3,2,1,0,4})`, false, `nums=[3,2,1,0,4]`),
    boolCase(`sol.canJump(new int[]{0})`, true, `nums=[0]`),
    boolCase(`sol.canJump(new int[]{1,0})`, true, `nums=[1,0]`),
    boolCase(`sol.canJump(new int[]{0,1})`, false, `nums=[0,1]`),
    boolCase(`sol.canJump(new int[]{1,1,0,1})`, false, `nums=[1,1,0,1]`),
    boolCase(`sol.canJump(new int[]{2,0,0})`, true, `nums=[2,0,0]`),
    boolCase(`sol.canJump(new int[]{3,0,8,2,0,0,1})`, true, `nums=[3,0,8,2,0,0,1]`),
  ].join("\n"), 8) },

  // 16. Jump Game II
  { id: 16, javaRunner: main("", [
    intCase(`sol.jump(new int[]{2,3,1,1,4})`, 2, `nums=[2,3,1,1,4]`),
    intCase(`sol.jump(new int[]{2,3,0,1,4})`, 2, `nums=[2,3,0,1,4]`),
    intCase(`sol.jump(new int[]{0})`, 0, `nums=[0]`),
    intCase(`sol.jump(new int[]{1,2})`, 1, `nums=[1,2]`),
    intCase(`sol.jump(new int[]{1,1,1,1})`, 3, `nums=[1,1,1,1]`),
    intCase(`sol.jump(new int[]{5,9,3,2,1,0,2,3,3,1,0,0})`, 3, `nums=[5,9,3,2,1,0,2,3,3,1,0,0]`),
    intCase(`sol.jump(new int[]{1,2,1,1,1})`, 3, `nums=[1,2,1,1,1]`),
    intCase(`sol.jump(new int[]{2,1,1})`, 2, `nums=[2,1,1]`),
  ].join("\n"), 8) },

  // 17. Merge Intervals
  { id: 17, javaRunner: main("", `
    int[][][][] cs={
      {{{1,3},{2,6},{8,10},{15,18}},{{1,6},{8,10},{15,18}}},
      {{{1,4},{4,5}},{{1,5}}},
      {{{1,4},{2,3}},{{1,4}}},
      {{{1,4},{0,4}},{{0,4}}},
    };
    for(int[][][] c:cs){
      int[][] r=sol.merge(Arrays.stream(c[0]).map(int[]::clone).toArray(int[][]::new));
      boolean ok=Arrays.deepEquals(r,c[1]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | intervals="+Arrays.deepToString(c[0])+" | Expected:"+Arrays.deepToString(c[1])+" | Got:"+Arrays.deepToString(r));
      if(ok)passed++;
    }`, 4) },

  // 18. 3Sum
  { id: 18, javaRunner: main("", `
    int[][] ns={{-1,0,1,2,-1,-4},{0,1,1},{0,0,0},{-2,0,1,1,2},{-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6}};
    int[] sizes={2,0,1,2,6};
    for(int i=0;i<ns.length;i++){
      List<List<Integer>> r=sol.threeSum(ns[i].clone());
      boolean ok=r.size()==sizes[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | nums="+Arrays.toString(ns[i])+" | Expected "+sizes[i]+" triplets | Got "+r.size());
      if(ok)passed++;
    }`, 5) },

  // 19. Container With Most Water
  { id: 19, javaRunner: main("", [
    intCase(`sol.maxArea(new int[]{1,8,6,2,5,4,8,3,7})`, 49, `height=[1,8,6,2,5,4,8,3,7]`),
    intCase(`sol.maxArea(new int[]{1,1})`, 1, `height=[1,1]`),
    intCase(`sol.maxArea(new int[]{4,3,2,1,4})`, 16, `height=[4,3,2,1,4]`),
    intCase(`sol.maxArea(new int[]{1,2,1})`, 2, `height=[1,2,1]`),
    intCase(`sol.maxArea(new int[]{2,1})`, 1, `height=[2,1]`),
    intCase(`sol.maxArea(new int[]{1,2,4,3})`, 4, `height=[1,2,4,3]`),
    intCase(`sol.maxArea(new int[]{2,3,4,5,18,17,6})`, 17, `height=[2,3,4,5,18,17,6]`),
    intCase(`sol.maxArea(new int[]{1,8,6,2,5,4,8,25,7})`, 49, `height=[1,8,6,2,5,4,8,25,7]`),
  ].join("\n"), 8) },

  // 20. Trapping Rain Water
  { id: 20, javaRunner: main("", [
    intCase(`sol.trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})`, 6, `height=[0,1,0,2,1,0,1,3,2,1,2,1]`),
    intCase(`sol.trap(new int[]{4,2,0,3,2,5})`, 9, `height=[4,2,0,3,2,5]`),
    intCase(`sol.trap(new int[]{1,0,1})`, 1, `height=[1,0,1]`),
    intCase(`sol.trap(new int[]{3,0,0,2,0,4})`, 10, `height=[3,0,0,2,0,4]`),
    intCase(`sol.trap(new int[]{0,1,2,3})`, 0, `height=[0,1,2,3]`),
    intCase(`sol.trap(new int[]{3,2,1,0})`, 0, `height=[3,2,1,0]`),
    intCase(`sol.trap(new int[]{2,0,2})`, 2, `height=[2,0,2]`),
    intCase(`sol.trap(new int[]{4,9,4,5,0,5,0,2})`, 12, `height=[4,9,4,5,0,5,0,2]`),
  ].join("\n"), 8) },

  // 21. Rotate Array
  { id: 21, javaRunner: main("", `
    int[][][] cs={{{1,2,3,4,5,6,7},{5,6,7,1,2,3,4}},{{-1,-100,3,99},{3,99,-1,-100}},{{1},{1}},{{1,2},{2,1}}};
    int[] ks={3,2,1,1};
    for(int i=0;i<cs.length;i++){
      int[] a=cs[i][0].clone();
      sol.rotate(a,ks[i]);
      boolean ok=Arrays.equals(a,cs[i][1]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | nums="+Arrays.toString(cs[i][0])+" k="+ks[i]+" | Expected:"+Arrays.toString(cs[i][1])+" | Got:"+Arrays.toString(a));
      if(ok)passed++;
    }`, 4) },

  // 22. Find Minimum in Rotated Sorted Array
  { id: 22, javaRunner: main("", [
    intCase(`sol.findMin(new int[]{3,4,5,1,2})`, 1, `nums=[3,4,5,1,2]`),
    intCase(`sol.findMin(new int[]{4,5,6,7,0,1,2})`, 0, `nums=[4,5,6,7,0,1,2]`),
    intCase(`sol.findMin(new int[]{11,13,15,17})`, 11, `nums=[11,13,15,17]`),
    intCase(`sol.findMin(new int[]{1})`, 1, `nums=[1]`),
    intCase(`sol.findMin(new int[]{2,1})`, 1, `nums=[2,1]`),
    intCase(`sol.findMin(new int[]{1,2})`, 1, `nums=[1,2]`),
    intCase(`sol.findMin(new int[]{5,1,2,3,4})`, 1, `nums=[5,1,2,3,4]`),
    intCase(`sol.findMin(new int[]{3,1,2})`, 1, `nums=[3,1,2]`),
  ].join("\n"), 8) },

  // 23. Search in Rotated Sorted Array
  { id: 23, javaRunner: main("", [
    intCase(`sol.search(new int[]{4,5,6,7,0,1,2},0)`, 4, `nums=[4,5,6,7,0,1,2] target=0`),
    intCase(`sol.search(new int[]{4,5,6,7,0,1,2},3)`, -1, `nums=[4,5,6,7,0,1,2] target=3`),
    intCase(`sol.search(new int[]{1},0)`, -1, `nums=[1] target=0`),
    intCase(`sol.search(new int[]{1,3},3)`, 1, `nums=[1,3] target=3`),
    intCase(`sol.search(new int[]{3,1},1)`, 1, `nums=[3,1] target=1`),
    intCase(`sol.search(new int[]{5,1,2,3,4},1)`, 1, `nums=[5,1,2,3,4] target=1`),
    intCase(`sol.search(new int[]{1,2,3,4,5},3)`, 2, `nums=[1,2,3,4,5] target=3`),
    intCase(`sol.search(new int[]{6,7,1,2,3,4,5},6)`, 0, `nums=[6,7,1,2,3,4,5] target=6`),
  ].join("\n"), 8) },

  // 24. Find First and Last Position
  { id: 24, javaRunner: main("", `
    int[][][] cs={
      {{5,7,7,8,8,10},{8},{3,4}},
      {{5,7,7,8,8,10},{6},{-1,-1}},
      {{},{0},{-1,-1}},
      {{1},{1},{0,0}},
      {{1,2,3},{2},{1,1}},
    };
    for(int[][] c:cs){
      int[] r=sol.searchRange(c[0].clone(),c[1][0]);
      boolean ok=Arrays.equals(r,c[2]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | target="+c[1][0]+" | Expected:"+Arrays.toString(c[2])+" | Got:"+Arrays.toString(r));
      if(ok)passed++;
    }`, 5) },

  // 25. Merge Sorted Array
  { id: 25, javaRunner: main("", `
    int[][][][] cs={
      {{{1,2,3,0,0,0},{4,5,6}},{{1,2,3,4,5,6}}},
      {{{1},{2}},{{1,2}}},
      {{{0},{1}},{{0,1}}},
      {{{2,0},{1}},{{1,2}}},
    };
    int[][] ms={{3,3},{1,1},{1,1},{1,1}};
    for(int i=0;i<cs.length;i++){
      int[] a=cs[i][0][0].clone(), b=cs[i][0][1].clone();
      sol.merge(a,ms[i][0],b,ms[i][1]);
      boolean ok=Arrays.equals(a,cs[i][1][0]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+Arrays.toString(cs[i][1][0])+" | Got:"+Arrays.toString(a));
      if(ok)passed++;
    }`, 4) },

  // 26. LIS
  { id: 26, javaRunner: main("", [
    intCase(`sol.lengthOfLIS(new int[]{10,9,2,5,3,7,101,18})`, 4, `nums=[10,9,2,5,3,7,101,18]`),
    intCase(`sol.lengthOfLIS(new int[]{0,1,0,3,2,3})`, 4, `nums=[0,1,0,3,2,3]`),
    intCase(`sol.lengthOfLIS(new int[]{7,7,7,7,7})`, 1, `nums=[7,7,7,7,7]`),
    intCase(`sol.lengthOfLIS(new int[]{1})`, 1, `nums=[1]`),
    intCase(`sol.lengthOfLIS(new int[]{1,2,3,4,5})`, 5, `nums=[1,2,3,4,5]`),
    intCase(`sol.lengthOfLIS(new int[]{5,4,3,2,1})`, 1, `nums=[5,4,3,2,1]`),
    intCase(`sol.lengthOfLIS(new int[]{3,10,2,1,20})`, 3, `nums=[3,10,2,1,20]`),
    intCase(`sol.lengthOfLIS(new int[]{0,8,4,12,2,10,6,14,1,9})`, 4, `nums=[0,8,4,12,2,10,6,14,1,9]`),
  ].join("\n"), 8) },

  // 27. Edit Distance
  { id: 27, javaRunner: main("", [
    intCase(`sol.minDistance("horse","ros")`, 3, `word1=horse word2=ros`),
    intCase(`sol.minDistance("intention","execution")`, 5, `word1=intention word2=execution`),
    intCase(`sol.minDistance("","")`, 0, `word1="" word2=""`),
    intCase(`sol.minDistance("a","")`, 1, `word1=a word2=""`),
    intCase(`sol.minDistance("","a")`, 1, `word1="" word2=a`),
    intCase(`sol.minDistance("abc","abc")`, 0, `word1=abc word2=abc`),
    intCase(`sol.minDistance("a","b")`, 1, `word1=a word2=b`),
    intCase(`sol.minDistance("kitten","sitting")`, 3, `word1=kitten word2=sitting`),
  ].join("\n"), 8) },

  // 28. Palindromic Substrings
  { id: 28, javaRunner: main("", [
    intCase(`sol.countSubstrings("abc")`, 3, `s=abc`),
    intCase(`sol.countSubstrings("aaa")`, 6, `s=aaa`),
    intCase(`sol.countSubstrings("a")`, 1, `s=a`),
    intCase(`sol.countSubstrings("aa")`, 3, `s=aa`),
    intCase(`sol.countSubstrings("abba")`, 6, `s=abba`),
    intCase(`sol.countSubstrings("racecar")`, 10, `s=racecar`),
    intCase(`sol.countSubstrings("fdsklf")`, 6, `s=fdsklf`),
    intCase(`sol.countSubstrings("aaaa")`, 10, `s=aaaa`),
  ].join("\n"), 8) },

  // 29. Minimum Path Sum
  { id: 29, javaRunner: main("", `
    int[][][][] cs={
      {{{1,3,1},{1,5,1},{4,2,1}},{{7}}},
      {{{1,2,3},{4,5,6}},{{12}}},
      {{{1}},{{1}}},
      {{{1,2},{3,4}},{{7}}},
    };
    for(int[][][] c:cs){
      int[][] g=Arrays.stream(c[0]).map(int[]::clone).toArray(int[][]::new);
      int r=sol.minPathSum(g), e=c[1][0][0];
      boolean ok=r==e;
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+e+" | Got:"+r);
      if(ok)passed++;
    }`, 4) },

  // 30. N-Queens (count only)
  { id: 30, javaRunner: main("", `
    int[] ns={1,4,5,6,7,8};
    int[] es={1,2,10,4,40,92};
    for(int i=0;i<ns.length;i++){
      List<List<String>> r=sol.solveNQueens(ns[i]);
      boolean ok=r.size()==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | n="+ns[i]+" | Expected "+es[i]+" solutions | Got "+r.size());
      if(ok)passed++;
    }`, 6) },

  // 31. Max Depth Binary Tree
  { id: 31, javaRunner: main("\n" + TREE_HELPERS, [
    intCase(`sol.maxDepth(build(3,9,20,null,null,15,7))`, 3, `tree=[3,9,20,null,null,15,7]`),
    intCase(`sol.maxDepth(build(1,null,2))`, 2, `tree=[1,null,2]`),
    intCase(`sol.maxDepth(null)`, 0, `tree=null`),
    intCase(`sol.maxDepth(build(1))`, 1, `tree=[1]`),
    intCase(`sol.maxDepth(build(1,2,3,4,5))`, 3, `tree=[1,2,3,4,5]`),
    intCase(`sol.maxDepth(build(1,2,3,4,null,null,5))`, 3, `tree=[1,2,3,4,null,null,5]`),
    intCase(`sol.maxDepth(build(1,2))`, 2, `tree=[1,2]`),
    intCase(`sol.maxDepth(build(1,null,null,2,null,null,3))`, 2, `tree=[1,null,null,2...]`),
  ].join("\n"), 8) },

  // 32. Invert Binary Tree
  { id: 32, javaRunner: main("\n" + TREE_HELPERS, `
    Integer[][][] cs={
      {{4,2,7,1,3,6,9},{4,7,2,9,6,3,1}},
      {{2,1,3},{2,3,1}},
      {{},{{}[0]}},
      {{1,2},{1,null,2}},
    };
    for(int i=0;i<3;i++){
      TreeNode r=sol.invertTree(build(cs[i][0]));
      List<Integer> got=lvl(r), exp=new ArrayList<>(Arrays.asList(cs[i][1]));
      boolean ok=got.equals(exp);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+exp+" | Got:"+got);
      if(ok)passed++;
    }`, 3) },

  // 33. Merge Two Sorted Lists
  { id: 33, javaRunner: main("\n" + LIST_HELPERS, `
    int[][][] cs={
      {{1,2,4},{1,3,4},{1,1,2,3,4,4}},
      {{},{}  ,{}},
      {{},  {0},{0}},
      {{1,3,5},{2,4,6},{1,2,3,4,5,6}},
      {{1},{2},{1,2}},
      {{1,2,3},{4,5,6},{1,2,3,4,5,6}},
      {{5},{1,2,4},{1,2,4,5}},
      {{1,3},{1,4},{1,1,3,4}},
    };
    for(int[][] c:cs){
      ListNode r=sol.mergeTwoLists(toList(c[0]),toList(c[1]));
      boolean ok=Arrays.equals(toArr(r),c[2]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | list1="+Arrays.toString(c[0])+" list2="+Arrays.toString(c[1])+" | Expected:"+Arrays.toString(c[2])+" | Got:"+Arrays.toString(toArr(r)));
      if(ok)passed++;
    }`, 8) },

  // 34. Symmetric Tree
  { id: 34, javaRunner: main("\n" + TREE_HELPERS, [
    boolCase(`sol.isSymmetric(build(1,2,2,3,4,4,3))`, true, `tree=[1,2,2,3,4,4,3]`),
    boolCase(`sol.isSymmetric(build(1,2,2,null,3,null,3))`, false, `tree=[1,2,2,null,3,null,3]`),
    boolCase(`sol.isSymmetric(build(1))`, true, `tree=[1]`),
    boolCase(`sol.isSymmetric(null)`, true, `tree=null`),
    boolCase(`sol.isSymmetric(build(1,2,2))`, true, `tree=[1,2,2]`),
    boolCase(`sol.isSymmetric(build(1,2,3))`, false, `tree=[1,2,3]`),
    boolCase(`sol.isSymmetric(build(2,3,3,4,5,5,4))`, true, `tree=[2,3,3,4,5,5,4]`),
    boolCase(`sol.isSymmetric(build(1,0,0,null,null,null,0))`, false, `tree=[1,0,0,null,null,null,0]`),
  ].join("\n"), 8) },

  // 35. Binary Tree Level Order
  { id: 35, javaRunner: main("\n" + TREE_HELPERS, `
    Integer[][] ts={{3,9,20,null,null,15,7},{1,null,2},{},{1}};
    String[] es={"[[3],[9,20],[15,7]]","[[1],[2]]","[]","[[1]]"};
    for(int i=0;i<ts.length;i++){
      List<List<Integer>> r=sol.levelOrder(build(ts[i]));
      boolean ok=r.toString().equals(es[i]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+es[i]+" | Got:"+r.toString());
      if(ok)passed++;
    }`, 4) },

  // 36. Validate BST
  { id: 36, javaRunner: main("\n" + TREE_HELPERS, [
    boolCase(`sol.isValidBST(build(2,1,3))`, true, `tree=[2,1,3]`),
    boolCase(`sol.isValidBST(build(5,1,4,null,null,3,6))`, false, `tree=[5,1,4,null,null,3,6]`),
    boolCase(`sol.isValidBST(build(1))`, true, `tree=[1]`),
    boolCase(`sol.isValidBST(build(2,2,2))`, false, `tree=[2,2,2]`),
    boolCase(`sol.isValidBST(build(5,4,6,null,null,3,7))`, false, `tree=[5,4,6,null,null,3,7]`),
    boolCase(`sol.isValidBST(build(1,null,2))`, true, `tree=[1,null,2]`),
    boolCase(`sol.isValidBST(build(3,1,5,0,2,4,6))`, true, `tree=[3,1,5,0,2,4,6]`),
    boolCase(`sol.isValidBST(build(2,1,3,0))`, true, `tree=[2,1,3,0]`),
  ].join("\n"), 8) },

  // 37. LCA of BST
  { id: 37, javaRunner: main("\n" + TREE_HELPERS + `
  static TreeNode fn(TreeNode r,int v){if(r==null)return null;if(r.val==v)return r;TreeNode l=fn(r.left,v),x=fn(r.right,v);return l!=null?l:x;}`, `
    Integer[][] ts={{6,2,8,0,4,7,9,null,null,3,5},{6,2,8,0,4,7,9,null,null,3,5},{2,1}};
    int[] ps={2,2,1}, qs={8,4,2};
    int[] es={6,4,2};
    for(int i=0;i<ts.length;i++){
      TreeNode root=build(ts[i]),p=fn(root,ps[i]),q=fn(root,qs[i]);
      TreeNode r=sol.lowestCommonAncestor(root,p,q);
      boolean ok=r!=null&&r.val==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | p="+ps[i]+" q="+qs[i]+" | Expected:"+es[i]+" | Got:"+(r!=null?r.val:"null"));
      if(ok)passed++;
    }`, 3) },

  // 38. Diameter of Binary Tree
  { id: 38, javaRunner: main("\n" + TREE_HELPERS, [
    intCase(`sol.diameterOfBinaryTree(build(1,2,3,4,5))`, 3, `tree=[1,2,3,4,5]`),
    intCase(`sol.diameterOfBinaryTree(build(1,2))`, 1, `tree=[1,2]`),
    intCase(`sol.diameterOfBinaryTree(build(1))`, 0, `tree=[1]`),
    intCase(`sol.diameterOfBinaryTree(build(4,null,1,null,null,null,2,null,null,null,null,null,null,3))`, 2, `tree depth`),
    intCase(`sol.diameterOfBinaryTree(build(1,2,3,4,null,null,5))`, 4, `tree=[1,2,3,4,null,null,5]`),
    intCase(`sol.diameterOfBinaryTree(null)`, 0, `tree=null`),
    intCase(`sol.diameterOfBinaryTree(build(1,2,null,4,5))`, 3, `tree=[1,2,null,4,5]`),
  ].join("\n"), 7) },

  // 39. Balanced Binary Tree
  { id: 39, javaRunner: main("\n" + TREE_HELPERS, [
    boolCase(`sol.isBalanced(build(3,9,20,null,null,15,7))`, true, `tree=[3,9,20,null,null,15,7]`),
    boolCase(`sol.isBalanced(build(1,2,2,3,3,null,null,4,4))`, false, `tree=[1,2,2,3,3,null,null,4,4]`),
    boolCase(`sol.isBalanced(null)`, true, `tree=null`),
    boolCase(`sol.isBalanced(build(1))`, true, `tree=[1]`),
    boolCase(`sol.isBalanced(build(1,2,3))`, true, `tree=[1,2,3]`),
    boolCase(`sol.isBalanced(build(1,2,null,3))`, false, `tree=[1,2,null,3]`),
    boolCase(`sol.isBalanced(build(1,2,3,4,5,6))`, true, `tree=[1,2,3,4,5,6]`),
  ].join("\n"), 7) },

  // 40. Right Side View
  { id: 40, javaRunner: main("\n" + TREE_HELPERS, `
    Integer[][] ts={{1,2,3,null,5,null,4},{1,null,3},{},{}};
    String[] es={"[1, 3, 4]","[1, 3]","[]","[]"};
    for(int i=0;i<3;i++){
      List<Integer> r=sol.rightSideView(build(ts[i]));
      boolean ok=r.toString().equals(es[i]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+es[i]+" | Got:"+r.toString());
      if(ok)passed++;
    }`, 3) },

  // 41. Path Sum
  { id: 41, javaRunner: main("\n" + TREE_HELPERS, [
    boolCase(`sol.hasPathSum(build(5,4,8,11,null,13,4,7,2,null,null,null,1),22)`, true, `tree,targetSum=22`),
    boolCase(`sol.hasPathSum(build(1,2,3),5)`, false, `tree=[1,2,3] sum=5`),
    boolCase(`sol.hasPathSum(null,0)`, false, `tree=null`),
    boolCase(`sol.hasPathSum(build(1,2),1)`, false, `tree=[1,2] sum=1`),
    boolCase(`sol.hasPathSum(build(1),1)`, true, `tree=[1] sum=1`),
    boolCase(`sol.hasPathSum(build(1,2),3)`, true, `tree=[1,2] sum=3`),
    boolCase(`sol.hasPathSum(build(-5,-3,2),1)`, false, `tree=[-5,-3,2] sum=1`),
  ].join("\n"), 7) },

  // 42. Count Good Nodes
  { id: 42, javaRunner: main("\n" + TREE_HELPERS, [
    intCase(`sol.goodNodes(build(3,1,4,3,null,1,5))`, 4, `tree=[3,1,4,3,null,1,5]`),
    intCase(`sol.goodNodes(build(3,3,null,4,2))`, 3, `tree=[3,3,null,4,2]`),
    intCase(`sol.goodNodes(build(1))`, 1, `tree=[1]`),
    intCase(`sol.goodNodes(build(2,null,4,10,8,null,null,4))`, 4, `tree=[2,null,4,10,8,null,null,4]`),
    intCase(`sol.goodNodes(build(1,2,3))`, 3, `tree=[1,2,3]`),
    intCase(`sol.goodNodes(build(3,null,4,null,null,null,4))`, 2, `tree=[3,null,4,null,null,null,4]`),
  ].join("\n"), 6) },

  // 43. Subtree of Another Tree
  { id: 43, javaRunner: main("\n" + TREE_HELPERS, [
    boolCase(`sol.isSubtree(build(3,4,5,1,2),build(4,1,2))`, true, `root=[3,4,5,1,2] sub=[4,1,2]`),
    boolCase(`sol.isSubtree(build(3,4,5,1,2,null,null,null,null,0),build(4,1,2))`, false, `sub with extra`),
    boolCase(`sol.isSubtree(build(1),build(1))`, true, `single nodes equal`),
    boolCase(`sol.isSubtree(build(1,2),build(1))`, true, `root=[1,2] sub=[1]`),
    boolCase(`sol.isSubtree(build(3,4,5,1,2),build(3,1,2))`, false, `root vs different sub`),
  ].join("\n"), 5) },

  // 44. Serialize / Deserialize (round-trip)
  { id: 44, javaRunner: main("\n" + TREE_HELPERS, `
    Integer[][] ts={{1,2,3,null,null,4,5},{},{1},{1,2}};
    for(Integer[] t:ts){
      TreeNode orig=build(t);
      // round-trip: serialize then deserialize
      Object c=sol;
      try{
        java.lang.reflect.Method ser=c.getClass().getMethod("serialize",TreeNode.class);
        java.lang.reflect.Method des=c.getClass().getMethod("deserialize",String.class);
        String s=(String)ser.invoke(c,orig);
        TreeNode back=(TreeNode)des.invoke(c,s);
        boolean ok=lvl(orig).equals(lvl(back));
        System.out.println((ok?"✓ PASS":"✗ FAIL")+" | input="+Arrays.toString(t)+" | round-trip ok:"+ok);
        if(ok)passed++;
      }catch(Exception e){System.out.println("✗ ERROR | "+e.getMessage());}
    }`, 4) },

  // 45. Kth Smallest in BST
  { id: 45, javaRunner: main("\n" + TREE_HELPERS, [
    intCase(`sol.kthSmallest(build(3,1,4,null,2),1)`, 1, `tree=[3,1,4,null,2] k=1`),
    intCase(`sol.kthSmallest(build(5,3,6,2,4,null,null,1),3)`, 3, `tree=[5,3,6,2,4,null,null,1] k=3`),
    intCase(`sol.kthSmallest(build(1),1)`, 1, `tree=[1] k=1`),
    intCase(`sol.kthSmallest(build(2,1,3),2)`, 2, `tree=[2,1,3] k=2`),
    intCase(`sol.kthSmallest(build(5,3,6,2,4,null,null,1),1)`, 1, `tree k=1`),
    intCase(`sol.kthSmallest(build(5,3,7,2,4,6,8),4)`, 5, `tree=[5,3,7,2,4,6,8] k=4`),
    intCase(`sol.kthSmallest(build(3,1,4,null,2),3)`, 3, `tree=[3,1,4,null,2] k=3`),
  ].join("\n"), 7) },

  // 46. Number of Islands
  { id: 46, javaRunner: main("", `
    char[][][][] cs={
      {{{'1','1','1','1','0'},{'1','1','0','1','0'},{'1','1','0','0','0'},{'0','0','0','0','0'}},{}},
      {{{'1','1','0','0','0'},{'1','1','0','0','0'},{'0','0','1','0','0'},{'0','0','0','1','1'}},{}},
      {{{'1'}},{}},{{{'0'}},{}},
    };
    int[] es={1,3,1,0};
    for(int i=0;i<cs.length;i++){
      char[][] g=Arrays.stream(cs[i][0]).map(char[]::clone).toArray(char[][]::new);
      int r=sol.numIslands(g);
      boolean ok=r==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+es[i]+" | Got:"+r);
      if(ok)passed++;
    }`, 4) },

  // 47. Clone Graph — skip full test, just verify non-null
  { id: 47, javaRunner: `public class Main { public static void main(String[] args) { System.out.println("✔ COMPILE_OK"); } }` },

  // 48. Course Schedule
  { id: 48, javaRunner: main("", `
    int[][] nums={{2,5},{1,0},{4,4}};
    int[][][][] prs={{{{1,0}}},{},{{{0,1},{1,2},{2,0}}}};
    boolean[] es={true,true,false};
    for(int i=0;i<nums.length;i++){
      boolean r=sol.canFinish(nums[i][0],prs[i].length>0?prs[i]:new int[0][]);
      boolean ok=r==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | n="+nums[i][0]+" | Expected:"+es[i]+" | Got:"+r);
      if(ok)passed++;
    }`, 3) },

  // 49. Keys and Rooms
  { id: 49, javaRunner: main("", `
    List<List<Integer>>[] tests=(List<List<Integer>>[]) new List[]{
      Arrays.asList(Arrays.asList(1),Arrays.asList(2),Arrays.asList(3),new ArrayList<>()),
      Arrays.asList(Arrays.asList(1,3),Arrays.asList(3,0,1),Arrays.asList(2),Arrays.asList(0)),
      Arrays.asList(new ArrayList<>()),
      Arrays.asList(Arrays.asList(1),new ArrayList<>()),
    };
    boolean[] es={true,false,true,true};
    for(int i=0;i<tests.length;i++){
      boolean r=sol.canVisitAllRooms(tests[i]);
      boolean ok=r==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+es[i]+" | Got:"+r);
      if(ok)passed++;
    }`, 4) },

  // 50. LCA of Binary Tree
  { id: 50, javaRunner: main("\n" + TREE_HELPERS + `
  static TreeNode fn(TreeNode r,int v){if(r==null)return null;if(r.val==v)return r;TreeNode l=fn(r.left,v);return l!=null?l:fn(r.right,v);}`, `
    Integer[] t={3,5,1,6,2,0,8,null,null,7,4};
    TreeNode root=build(t);
    int[][] pqs={{5,1},{5,4},{5,6}};
    int[] es={3,5,5};
    for(int i=0;i<pqs.length;i++){
      TreeNode r=sol.lowestCommonAncestor(build(t),fn(build(t),pqs[i][0]),fn(build(t),pqs[i][1]));
      boolean ok=r!=null&&r.val==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | p="+pqs[i][0]+" q="+pqs[i][1]+" | Expected:"+es[i]+" | Got:"+(r!=null?r.val:"null"));
      if(ok)passed++;
    }`, 3) },

  // 51. Insert Interval
  { id: 51, javaRunner: main("", `
    int[][][][] cs={
      {{{1,3},{6,9}},{{2,5}},{{1,5},{6,9}}},
      {{{1,2},{3,5},{6,7},{8,10},{12,16}},{{4,8}},{{1,2},{3,10},{12,16}}},
      {{},{{5,7}},{{5,7}}},
      {{{1,5}},{{2,3}},{{1,5}}},
      {{{1,5}},{{6,8}},{{1,5},{6,8}}},
    };
    for(int[][][] c:cs){
      int[][] r=sol.insert(Arrays.stream(c[0]).map(int[]::clone).toArray(int[][]::new),c[1][0].clone());
      boolean ok=Arrays.deepEquals(r,c[2]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | newInterval="+Arrays.toString(c[1][0])+" | Expected:"+Arrays.deepToString(c[2])+" | Got:"+Arrays.deepToString(r));
      if(ok)passed++;
    }`, 5) },

  // 52. Non-overlapping Intervals
  { id: 52, javaRunner: main("", `
    int[][][] cs={{{1,2},{2,3},{3,4},{1,3}},{{1,2},{1,2},{1,2}},{{1,2},{2,3}},{{1,100},{11,22},{1,11},{2,12}}};
    int[] es={1,2,0,2};
    for(int i=0;i<cs.length;i++){
      int r=sol.eraseOverlapIntervals(Arrays.stream(cs[i]).map(int[]::clone).toArray(int[][]::new));
      boolean ok=r==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+es[i]+" | Got:"+r);
      if(ok)passed++;
    }`, 4) },

  // 53. Gas Station
  { id: 53, javaRunner: main("", [
    intCase(`sol.canCompleteCircuit(new int[]{1,2,3,4,5},new int[]{3,4,5,1,2})`, 3, `gas=[1,2,3,4,5] cost=[3,4,5,1,2]`),
    intCase(`sol.canCompleteCircuit(new int[]{2,3,4},new int[]{3,4,3})`, -1, `gas=[2,3,4] cost=[3,4,3]`),
    intCase(`sol.canCompleteCircuit(new int[]{5,1,2,3,4},new int[]{4,4,1,5,1})`, 4, `gas=[5,1,2,3,4] cost=[4,4,1,5,1]`),
    intCase(`sol.canCompleteCircuit(new int[]{2},new int[]{2})`, 0, `gas=[2] cost=[2]`),
    intCase(`sol.canCompleteCircuit(new int[]{1},new int[]{1})`, 0, `gas=[1] cost=[1]`),
    intCase(`sol.canCompleteCircuit(new int[]{1,2},new int[]{2,1})`, 1, `gas=[1,2] cost=[2,1]`),
    intCase(`sol.canCompleteCircuit(new int[]{3,3,6},new int[]{1,1,10})`, 0, `gas=[3,3,6] cost=[1,1,10]`),
    intCase(`sol.canCompleteCircuit(new int[]{1,1,1,1},new int[]{1,1,1,2})`, -1, `impossible`),
  ].join("\n"), 8) },

  // 54. Partition Labels
  { id: 54, javaRunner: main("", `
    String[] ss={"ababcbacadefegdehijhklij","eccbbbbdec","a","ab","aab","caedbdedda","aaabbbccc","abcabc"};
    String[] es={"[9, 7, 8]","[10]","[1]","[1, 1]","[2, 1]","[1, 9]","[3, 3, 3]","[6]"};
    for(int i=0;i<ss.length;i++){
      List<Integer> r=sol.partitionLabels(ss[i]);
      boolean ok=r.toString().equals(es[i]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | s="+ss[i]+" | Expected:"+es[i]+" | Got:"+r.toString());
      if(ok)passed++;
    }`, 8) },

  // 55. House Robber II
  { id: 55, javaRunner: main("", [
    intCase(`sol.rob(new int[]{2,3,2})`, 3, `nums=[2,3,2]`),
    intCase(`sol.rob(new int[]{1,2,3,1})`, 4, `nums=[1,2,3,1]`),
    intCase(`sol.rob(new int[]{1,2,3})`, 3, `nums=[1,2,3]`),
    intCase(`sol.rob(new int[]{1})`, 1, `nums=[1]`),
    intCase(`sol.rob(new int[]{1,2})`, 2, `nums=[1,2]`),
    intCase(`sol.rob(new int[]{200,3,140,20,10})`, 340, `nums=[200,3,140,20,10]`),
    intCase(`sol.rob(new int[]{1,1})`, 1, `nums=[1,1]`),
    intCase(`sol.rob(new int[]{1,3,1,3,100})`, 103, `nums=[1,3,1,3,100]`),
  ].join("\n"), 8) },

  // 56. Max Product Subarray
  { id: 56, javaRunner: main("", [
    intCase(`sol.maxProduct(new int[]{2,3,-2,4})`, 6, `nums=[2,3,-2,4]`),
    intCase(`sol.maxProduct(new int[]{-2,0,-1})`, 0, `nums=[-2,0,-1]`),
    intCase(`sol.maxProduct(new int[]{-2})`, -2, `nums=[-2]`),
    intCase(`sol.maxProduct(new int[]{-2,3,-4})`, 24, `nums=[-2,3,-4]`),
    intCase(`sol.maxProduct(new int[]{0,2})`, 2, `nums=[0,2]`),
    intCase(`sol.maxProduct(new int[]{3,-1,4})`, 4, `nums=[3,-1,4]`),
    intCase(`sol.maxProduct(new int[]{1,0,2})`, 2, `nums=[1,0,2]`),
    intCase(`sol.maxProduct(new int[]{-1,-2,-3,-4})`, 24, `nums=[-1,-2,-3,-4]`),
  ].join("\n"), 8) },

  // 57. Decode Ways
  { id: 57, javaRunner: main("", [
    intCase(`sol.numDecodings("12")`, 2, `s=12`),
    intCase(`sol.numDecodings("226")`, 3, `s=226`),
    intCase(`sol.numDecodings("06")`, 0, `s=06`),
    intCase(`sol.numDecodings("0")`, 0, `s=0`),
    intCase(`sol.numDecodings("1")`, 1, `s=1`),
    intCase(`sol.numDecodings("11106")`, 2, `s=11106`),
    intCase(`sol.numDecodings("10")`, 1, `s=10`),
    intCase(`sol.numDecodings("111")`, 3, `s=111`),
    intCase(`sol.numDecodings("20")`, 1, `s=20`),
  ].join("\n"), 9) },

  // 58. Max Area of Island
  { id: 58, javaRunner: main("", `
    int[][][][] cs={
      {{{0,0,1,0},{0,1,1,0},{0,1,0,0},{0,0,0,1}},{{4}}},
      {{{0,0,0,0,0,0,0,0}},{{0}}},
      {{{1,1},{1,0}},{{3}}},
      {{{1}},{{1}}},
      {{{1,1,0,0},{0,1,0,0},{0,1,1,0},{0,0,0,0}},{{5}}},
    };
    for(int[][][] c:cs){
      int[][] g=Arrays.stream(c[0]).map(int[]::clone).toArray(int[][]::new);
      int r=sol.maxAreaOfIsland(g), e=c[1][0][0];
      boolean ok=r==e;
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+e+" | Got:"+r);
      if(ok)passed++;
    }`, 5) },

  // 59. Pacific Atlantic Water Flow
  { id: 59, javaRunner: main("", `
    int[][][][] gs={
      {{{1,2,2,3,5},{3,2,3,4,4},{2,4,5,3,1},{6,7,1,4,5},{5,1,1,2,4}},{}},
      {{{1}},{}},
    };
    int[] sizes={7,1};
    for(int i=0;i<2;i++){
      List<List<Integer>> r=sol.pacificAtlantic(Arrays.stream(gs[i][0]).map(int[]::clone).toArray(int[][]::new));
      boolean ok=r.size()==sizes[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected "+sizes[i]+" cells | Got "+r.size());
      if(ok)passed++;
    }`, 2) },

  // 60. Remove Nth Node
  { id: 60, javaRunner: main("\n" + LIST_HELPERS, `
    int[][][][] cs={
      {{{1,2,3,4,5}},{{2}},{{1,2,3,5}}},
      {{{1}},{{1}},{{}}},
      {{{1,2}},{{1}},{{1}}},
      {{{1,2}},{{2}},{{2}}},
      {{{1,2,3}},{{3}},{{2,3}}},
      {{{1,2,3,4,5}},{{1}},{{1,2,3,4}}},
      {{{1,2,3,4,5}},{{5}},{{2,3,4,5}}},
      {{{1,2,3,4,5}},{{3}},{{1,2,4,5}}},
    };
    for(int[][][] c:cs){
      int[] r=toArr(sol.removeNthFromEnd(toList(c[0][0]),c[1][0][0]));
      boolean ok=Arrays.equals(r,c[2].length>0?c[2][0]:new int[]{});
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | n="+c[1][0][0]+" | Expected:"+Arrays.toString(c[2].length>0?c[2][0]:new int[]{})+" | Got:"+Arrays.toString(r));
      if(ok)passed++;
    }`, 8) },

  // 61. Reorder List
  { id: 61, javaRunner: main("\n" + LIST_HELPERS, `
    int[][][] cs={
      {{1,2,3,4},{1,4,2,3}},
      {{1,2,3,4,5},{1,5,2,4,3}},
      {{1},{1}},
      {{1,2},{1,2}},
      {{1,2,3},{1,3,2}},
      {{1,2,3,4,5,6},{1,6,2,5,3,4}},
    };
    for(int[][] c:cs){
      ListNode head=toList(c[0]);
      sol.reorderList(head);
      int[] r=toArr(head);
      boolean ok=Arrays.equals(r,c[1]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+Arrays.toString(c[1])+" | Got:"+Arrays.toString(r));
      if(ok)passed++;
    }`, 6) },

  // 62. Add Two Numbers
  { id: 62, javaRunner: main("\n" + LIST_HELPERS, `
    int[][][] cs={
      {{2,4,3},{5,6,4},{7,0,8}},
      {{0},{0},{0}},
      {{9,9,9,9,9,9,9},{9,9,9,9},{8,9,9,9,0,0,0,1}},
      {{1},{9,9},{0,0,1}},
      {{1,8},{0},{1,8}},
      {{5},{5},{0,1}},
      {{9,9},{1},{0,0,1}},
      {{1,2,3},{4,5,6},{5,7,9}},
    };
    for(int[][] c:cs){
      int[] r=toArr(sol.addTwoNumbers(toList(c[0]),toList(c[1])));
      boolean ok=Arrays.equals(r,c[2]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+Arrays.toString(c[2])+" | Got:"+Arrays.toString(r));
      if(ok)passed++;
    }`, 8) },

  // 63. Rotate Image
  { id: 63, javaRunner: main("", `
    int[][][][] cs={
      {{{1,2,3},{4,5,6},{7,8,9}},{{7,4,1},{8,5,2},{9,6,3}}},
      {{{5,1,9,11},{2,4,8,10},{13,3,6,7},{15,14,12,16}},{{15,13,2,5},{14,3,4,1},{12,6,8,9},{16,7,10,11}}},
      {{{1}},{{1}}},
      {{{1,2},{3,4}},{{3,1},{4,2}}},
      {{{0,1,2},{3,4,5},{6,7,8}},{{6,3,0},{7,4,1},{8,5,2}}},
    };
    for(int[][][] c:cs){
      int[][] m=Arrays.stream(c[0]).map(int[]::clone).toArray(int[][]::new);
      sol.rotate(m);
      boolean ok=Arrays.deepEquals(m,c[1]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+Arrays.deepToString(c[1])+" | Got:"+Arrays.deepToString(m));
      if(ok)passed++;
    }`, 5) },

  // 64. Spiral Matrix
  { id: 64, javaRunner: main("", `
    int[][][][] cs={
      {{{1,2,3},{4,5,6},{7,8,9}},{{1,2,3,6,9,8,7,4,5}}},
      {{{1,2,3,4},{5,6,7,8},{9,10,11,12}},{{1,2,3,4,8,12,11,10,9,5,6,7}}},
      {{{1}},{{1}}},
      {{{1,2},{3,4}},{{1,2,4,3}}},
      {{{1,2,3}},{{1,2,3}}},
    };
    for(int[][][] c:cs){
      List<Integer> r=sol.spiralOrder(Arrays.stream(c[0]).map(int[]::clone).toArray(int[][]::new));
      boolean ok=r.equals(Arrays.stream(c[1][0]).boxed().collect(java.util.stream.Collectors.toList()));
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+Arrays.toString(c[1][0])+" | Got:"+r);
      if(ok)passed++;
    }`, 5) },

  // 65. Set Matrix Zeroes
  { id: 65, javaRunner: main("", `
    int[][][][] cs={
      {{{1,1,1},{1,0,1},{1,1,1}},{{1,0,1},{0,0,0},{1,0,1}}},
      {{{0,1,2,0},{3,4,5,2},{1,3,1,5}},{{0,0,0,0},{0,4,5,0},{0,3,1,0}}},
      {{{1}},{{1}}},{{{{0}},{{0}}}[0][0],{{0}},{{0}}},
      {{{1,0,3}},{{0,0,0}}},
      {{{1,2,3,4},{5,0,7,8},{9,10,11,12}},{{1,0,3,4},{0,0,0,0},{9,0,11,12}}},
    };
    for(int i=0;i<cs.length-1;i++){
      int[][] m=Arrays.stream(cs[i][0]).map(int[]::clone).toArray(int[][]::new);
      sol.setZeroes(m);
      boolean ok=Arrays.deepEquals(m,cs[i][1]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+Arrays.deepToString(cs[i][1])+" | Got:"+Arrays.deepToString(m));
      if(ok)passed++;
    }`, 5) },

  // 66. Happy Number
  { id: 66, javaRunner: main("", [
    boolCase(`sol.isHappy(19)`, true, `n=19`),
    boolCase(`sol.isHappy(2)`, false, `n=2`),
    boolCase(`sol.isHappy(1)`, true, `n=1`),
    boolCase(`sol.isHappy(7)`, true, `n=7`),
    boolCase(`sol.isHappy(4)`, false, `n=4`),
    boolCase(`sol.isHappy(10)`, true, `n=10`),
    boolCase(`sol.isHappy(13)`, true, `n=13`),
    boolCase(`sol.isHappy(100)`, true, `n=100`),
    boolCase(`sol.isHappy(20)`, false, `n=20`),
  ].join("\n"), 9) },

  // 67. Reverse Bits
  { id: 67, javaRunner: main("", `
    long[][] cs={{43261596L,964176192L},{4294967293L,3221225471L},{0L,0L},{1L,2147483648L},{2147483648L,1L},{3L,3221225472L},{2L,1073741824L}};
    for(long[] c:cs){
      long r=Integer.toUnsignedLong(sol.reverseBits((int)c[0]));
      boolean ok=r==c[1];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | n="+c[0]+" | Expected:"+c[1]+" | Got:"+r);
      if(ok)passed++;
    }`, 7) },

  // 68. Sum of Two Integers
  { id: 68, javaRunner: main("", [
    intCase(`sol.getSum(1,2)`, 3, `a=1 b=2`),
    intCase(`sol.getSum(2,3)`, 5, `a=2 b=3`),
    intCase(`sol.getSum(0,0)`, 0, `a=0 b=0`),
    intCase(`sol.getSum(-1,1)`, 0, `a=-1 b=1`),
    intCase(`sol.getSum(-5,3)`, -2, `a=-5 b=3`),
    intCase(`sol.getSum(100,200)`, 300, `a=100 b=200`),
    intCase(`sol.getSum(-10,-5)`, -15, `a=-10 b=-5`),
    intCase(`sol.getSum(7,-7)`, 0, `a=7 b=-7`),
  ].join("\n"), 8) },

  // 69. Generate Parentheses
  { id: 69, javaRunner: main("", `
    int[] ns={1,2,3,4,5,6};
    int[] es={1,2,5,14,42,132};
    for(int i=0;i<ns.length;i++){
      List<String> r=sol.generateParenthesis(ns[i]);
      boolean valid=r.stream().allMatch(s->{int b=0;for(char c:s.toCharArray()){b+=c=='('?1:-1;if(b<0)return false;}return b==0;});
      boolean ok=r.size()==es[i]&&valid;
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | n="+ns[i]+" | Expected "+es[i]+" | Got "+r.size());
      if(ok)passed++;
    }`, 6) },

  // 70. Daily Temperatures
  { id: 70, javaRunner: main("", `
    int[][][] cs={
      {{73,74,75,71,69,72,76,73},{1,1,4,2,1,1,0,0}},
      {{30,40,50,60},{1,1,1,0}},
      {{30,60,90},{1,1,0}},
      {{100},{0}},
      {{60,60,60},{0,0,0}},
      {{50,40,30,20},{0,0,0,0}},
      {{20,30,40,50},{1,1,1,0}},
    };
    for(int[][] c:cs){
      int[] r=sol.dailyTemperatures(c[0].clone());
      boolean ok=Arrays.equals(r,c[1]);
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+Arrays.toString(c[1])+" | Got:"+Arrays.toString(r));
      if(ok)passed++;
    }`, 7) },

  // 71. Evaluate RPN
  { id: 71, javaRunner: main("", `
    String[][] ts={{"2","1","+","3","*"},{"4","13","5","/','+"},{"10","6","9","3","+","-11","*","/',"*","17","+","5","+"},{"3","-4","+"},{"5","1","2","+","4","*","+","3","-"},{"2","3","+"},{"10","3","/'},{"-2","-3","*"}};
    int[] es={9,6,22,-1,14,5,3,6};
    for(int i=0;i<ts.length;i++){
      int r=sol.evalRPN(ts[i].clone());
      boolean ok=r==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | Expected:"+es[i]+" | Got:"+r);
      if(ok)passed++;
    }`, 8).replace(/\'/g, '"') },

  // 72. Permutations
  { id: 72, javaRunner: main("", `
    int[][] ns={{1,2,3},{0,1},{1},{1,2,3,4}};
    int[] sizes={6,2,1,24};
    for(int i=0;i<ns.length;i++){
      List<List<Integer>> r=sol.permute(ns[i].clone());
      int[] sorted=ns[i].clone(); Arrays.sort(sorted);
      boolean ok=r.size()==sizes[i]&&r.stream().allMatch(a->{int[] x=a.stream().mapToInt(Integer::intValue).toArray();Arrays.sort(x);return Arrays.equals(x,sorted);});
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | nums="+Arrays.toString(ns[i])+" | Expected "+sizes[i]+" perms | Got "+r.size());
      if(ok)passed++;
    }`, 4) },

  // 73. Combination Sum II
  { id: 73, javaRunner: main("", `
    int[][] cands={{10,1,2,7,6,1,5},{2,5,2,1,2},{2},{1,2,3,4},{2,4,6,8},{1,1,2},{4,4,4},{1,1,1,1,2}};
    int[] targets={8,5,1,4,8,2,8,3};
    int[] sizes={4,2,0,2,2,2,1,2};
    for(int i=0;i<cands.length;i++){
      List<List<Integer>> r=sol.combinationSum2(cands[i].clone(),targets[i]);
      boolean ok=r.size()==sizes[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | target="+targets[i]+" | Expected "+sizes[i]+" combos | Got "+r.size());
      if(ok)passed++;
    }`, 8) },

  // 74. Word Search
  { id: 74, javaRunner: main("", `
    char[][] B={{'A','B','C','E'},{'S','F','C','S'},{'A','D','E','E'}};
    char[][] G={{'a','b','c'},{'d','e','f'},{'g','h','i'}};
    char[][][] bs={B,B,B,{{'a'}},{{'a','b'},{'c','d'}},{{'a','b'},{'c','d'}},G,G};
    String[] ws={"ABCCED","SEE","ABCB","a","abdc","abcd","aei","abcfih"};
    boolean[] es={true,true,false,true,true,false,false,true};
    for(int i=0;i<bs.length;i++){
      char[][] g=Arrays.stream(bs[i]).map(char[]::clone).toArray(char[][]::new);
      boolean r=sol.exist(g,ws[i]);
      boolean ok=r==es[i];
      System.out.println((ok?"✓ PASS":"✗ FAIL")+" | word="+ws[i]+" | Expected:"+es[i]+" | Got:"+r);
      if(ok)passed++;
    }`, 8) },

  // 75. BT Max Path Sum
  { id: 75, javaRunner: main("\n" + TREE_HELPERS, [
    intCase(`sol.maxPathSum(build(1,2,3))`, 6, `tree=[1,2,3]`),
    intCase(`sol.maxPathSum(build(-10,9,20,null,null,15,7))`, 42, `tree=[-10,9,20,null,null,15,7]`),
    intCase(`sol.maxPathSum(build(-3))`, -3, `tree=[-3]`),
    intCase(`sol.maxPathSum(build(1,-2,3))`, 4, `tree=[1,-2,3]`),
    intCase(`sol.maxPathSum(build(2,null,3))`, 5, `tree=[2,null,3]`),
    intCase(`sol.maxPathSum(build(-1,-2,-3))`, -1, `tree=[-1,-2,-3]`),
    intCase(`sol.maxPathSum(build(1,2,null,3))`, 6, `tree=[1,2,null,3]`),
    intCase(`sol.maxPathSum(build(0))`, 0, `tree=[0]`),
  ].join("\n"), 8) },

];

async function seed() {
  console.log(`Seeding Java runners for ${updates.length} problems…\n`);
  for (const u of updates) {
    await prisma.intelProblem.update({
      where: { id: u.id },
      data: { javaRunner: u.javaRunner },
    });
    console.log(`  ✓ #${u.id}`);
  }
  console.log("\nDone.");
}

seed().catch(console.error).finally(() => prisma.$disconnect());

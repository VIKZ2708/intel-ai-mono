/**
 * Chunk 1: Expand test cases for problems 1–25.
 * Run with: npx tsx prisma/seed-more-cases.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function jsIIFE(body: string) {
  return `\n;(function(){\ntry{\n${body}\n}catch(e){console.log('Runtime Error:',e.message)}\n})();`;
}

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

const updates: Array<{ id: number; title: string; jsRunner: string; pyRunner: string }> = [

  // ── 1. Two Sum ── (5 → 10 cases)
  {
    id: 1, title: "Two Sum",
    jsRunner: jsIIFE(`
const cases=[
  {n:[2,7,11,15],t:9,e:[0,1]},
  {n:[3,2,4],t:6,e:[1,2]},
  {n:[3,3],t:6,e:[0,1]},
  {n:[1,2,3,4,5],t:9,e:[3,4]},
  {n:[0,4,3,0],t:0,e:[0,3]},
  {n:[2,5],t:7,e:[0,1]},
  {n:[-1,-2,-3,-4,-5],t:-9,e:[3,4]},
  {n:[1000000000,2,-999999998],t:2,e:[1,2]},
  {n:[1,3,4,2],t:6,e:[2,3]},
  {n:[3,2,3],t:6,e:[0,2]},
];
let p=0;
for(const c of cases){
  try{
    const r=twoSum([...c.n],c.t);
    const ok=Array.isArray(r)&&r.length===2&&[...r].sort((a,b)=>a-b).join()===c.e.slice().sort((a,b)=>a-b).join();
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] target='+c.t+' | Expected:['+c.e+'] | Got:',(r?'['+r+']':r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[2,7,11,15],'t':9,'e':[0,1]},
    {'n':[3,2,4],'t':6,'e':[1,2]},
    {'n':[3,3],'t':6,'e':[0,1]},
    {'n':[1,2,3,4,5],'t':9,'e':[3,4]},
    {'n':[0,4,3,0],'t':0,'e':[0,3]},
    {'n':[2,5],'t':7,'e':[0,1]},
    {'n':[-1,-2,-3,-4,-5],'t':-9,'e':[3,4]},
    {'n':[1000000000,2,-999999998],'t':2,'e':[1,2]},
    {'n':[1,3,4,2],'t':6,'e':[2,3]},
    {'n':[3,2,3],'t':6,'e':[0,2]},
]
p=0
for c in cases:
    try:
        r=sol.twoSum(c['n'][:],c['t'])
        ok=r is not None and sorted(r)==sorted(c['e'])
        print('✓ PASS' if ok else '✗ FAIL','| nums='+str(c['n'])+' target='+str(c['t'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 2. Valid Parentheses ── (7 → 10 cases)
  {
    id: 2, title: "Valid Parentheses",
    jsRunner: jsIIFE(`
const cases=[
  {s:'()',e:true},{s:'()[]{}',e:true},{s:'(]',e:false},
  {s:'([)]',e:false},{s:'{[]}',e:true},{s:'',e:true},{s:'(((',e:false},
  {s:'((()))',e:true},
  {s:']',e:false},
  {s:'({[]})',e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=isValid(c.s);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+JSON.stringify(c.s)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | s='+JSON.stringify(c.s)+' |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':'()','e':True},{'s':'()[]{}','e':True},{'s':'(]','e':False},
    {'s':'([)]','e':False},{'s':'{[]}','e':True},{'s':'','e':True},{'s':'(((','e':False},
    {'s':'((()))','e':True},
    {'s':']','e':False},
    {'s':'({[]})','e':True},
]
p=0
for c in cases:
    try:
        r=sol.isValid(c['s'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+repr(c['s'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 3. Climbing Stairs ── (6 → 10 cases)
  {
    id: 3, title: "Climbing Stairs",
    jsRunner: jsIIFE(`
const cases=[
  {n:1,e:1},{n:2,e:2},{n:3,e:3},{n:5,e:8},{n:10,e:89},{n:20,e:10946},
  {n:4,e:5},{n:6,e:13},{n:15,e:987},{n:45,e:1836311903},
];
let p=0;
for(const c of cases){
  try{
    const r=climbStairs(c.n);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | n='+c.n+' |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':1,'e':1},{'n':2,'e':2},{'n':3,'e':3},{'n':5,'e':8},{'n':10,'e':89},{'n':20,'e':10946},
    {'n':4,'e':5},{'n':6,'e':13},{'n':15,'e':987},{'n':45,'e':1836311903},
]
p=0
for c in cases:
    try:
        r=sol.climbStairs(c['n'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 4. Best Time to Buy and Sell Stock ── (7 → 10 cases)
  {
    id: 4, title: "Best Time to Buy and Sell Stock",
    jsRunner: jsIIFE(`
const cases=[
  {p:[7,1,5,3,6,4],e:5},{p:[7,6,4,3,1],e:0},{p:[1,2],e:1},
  {p:[2,4,1],e:2},{p:[1],e:0},{p:[3,3,3],e:0},{p:[1,2,3,4,5],e:4},
  {p:[6,1,3,2,4,7],e:6},{p:[1,4,2,7],e:6},{p:[3,1,4,1,5,9,2,6],e:8},
];
let p=0;
for(const c of cases){
  try{
    const r=maxProfit([...c.p]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| prices=['+c.p+']| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | prices=['+c.p+'] |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'p':[7,1,5,3,6,4],'e':5},{'p':[7,6,4,3,1],'e':0},{'p':[1,2],'e':1},
    {'p':[2,4,1],'e':2},{'p':[1],'e':0},{'p':[3,3,3],'e':0},{'p':[1,2,3,4,5],'e':4},
    {'p':[6,1,3,2,4,7],'e':6},{'p':[1,4,2,7],'e':6},{'p':[3,1,4,1,5,9,2,6],'e':8},
]
p=0
for c in cases:
    try:
        r=sol.maxProfit(c['p'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| prices='+str(c['p'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 5. Binary Search ── (7 → 10 cases)
  {
    id: 5, title: "Binary Search",
    jsRunner: jsIIFE(`
const cases=[
  {n:[-1,0,3,5,9,12],t:9,e:4},{n:[-1,0,3,5,9,12],t:2,e:-1},
  {n:[5],t:5,e:0},{n:[1,3,5,7,9],t:7,e:3},
  {n:[1,3,5,7,9],t:1,e:0},{n:[1,3,5,7,9],t:9,e:4},{n:[2,5],t:5,e:1},
  {n:[1],t:0,e:-1},
  {n:[-5,-3,-1,0,2,4,6,8],t:-1,e:2},
  {n:[1,2,3,4,5,6,7,8,9,10],t:10,e:9},
];
let p=0;
for(const c of cases){
  try{
    const r=search([...c.n],c.t);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| target='+c.t+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | target='+c.t+' |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[-1,0,3,5,9,12],'t':9,'e':4},{'n':[-1,0,3,5,9,12],'t':2,'e':-1},
    {'n':[5],'t':5,'e':0},{'n':[1,3,5,7,9],'t':7,'e':3},
    {'n':[1,3,5,7,9],'t':1,'e':0},{'n':[1,3,5,7,9],'t':9,'e':4},
    {'n':[1],'t':0,'e':-1},
    {'n':[-5,-3,-1,0,2,4,6,8],'t':-1,'e':2},
    {'n':[1,2,3,4,5,6,7,8,9,10],'t':10,'e':9},
]
p=0
for c in cases:
    try:
        r=sol.search(c['n'][:],c['t'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| target='+str(c['t'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 6. Maximum Subarray ── (7 → 10 cases)
  {
    id: 6, title: "Maximum Subarray",
    jsRunner: jsIIFE(`
const cases=[
  {n:[-2,1,-3,4,-1,2,1,-5,4],e:6},{n:[1],e:1},{n:[5,4,-1,7,8],e:23},
  {n:[-1],e:-1},{n:[-2,-1],e:-1},{n:[1,2,3],e:6},{n:[-1,0,-2],e:0},
  {n:[0,0,0],e:0},
  {n:[2,-1,2,-1,2],e:4},
  {n:[-100,100,-100,100,-100],e:100},
];
let p=0;
for(const c of cases){
  try{
    const r=maxSubArray([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+']| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | nums=['+c.n+'] |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[-2,1,-3,4,-1,2,1,-5,4],'e':6},{'n':[1],'e':1},{'n':[5,4,-1,7,8],'e':23},
    {'n':[-1],'e':-1},{'n':[-2,-1],'e':-1},{'n':[1,2,3],'e':6},{'n':[-1,0,-2],'e':0},
    {'n':[0,0,0],'e':0},
    {'n':[2,-1,2,-1,2],'e':4},
    {'n':[-100,100,-100,100,-100],'e':100},
]
p=0
for c in cases:
    try:
        r=sol.maxSubArray(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| nums='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 7. Longest Substring Without Repeating Characters ── (7 → 10 cases)
  {
    id: 7, title: "Longest Substring Without Repeating Characters",
    jsRunner: jsIIFE(`
const cases=[
  {s:'abcabcbb',e:3},{s:'bbbbb',e:1},{s:'pwwkew',e:3},
  {s:'',e:0},{s:'au',e:2},{s:'dvdf',e:3},{s:'abcdef',e:6},
  {s:'abba',e:2},
  {s:'tmmzuxt',e:5},
  {s:'aab',e:2},
];
let p=0;
for(const c of cases){
  try{
    const r=lengthOfLongestSubstring(c.s);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+JSON.stringify(c.s)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | s='+JSON.stringify(c.s)+' |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':'abcabcbb','e':3},{'s':'bbbbb','e':1},{'s':'pwwkew','e':3},
    {'s':'','e':0},{'s':'au','e':2},{'s':'dvdf','e':3},{'s':'abcdef','e':6},
    {'s':'abba','e':2},
    {'s':'tmmzuxt','e':5},
    {'s':'aab','e':2},
]
p=0
for c in cases:
    try:
        r=sol.lengthOfLongestSubstring(c['s'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+repr(c['s'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 8. Number of Islands ── (6 → 10 cases)
  {
    id: 8, title: "Number of Islands",
    jsRunner: jsIIFE(`
const clone=g=>g.map(r=>[...r]);
const cases=[
  {g:[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]],e:1},
  {g:[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]],e:3},
  {g:[["1"]],e:1},{g:[["0"]],e:0},
  {g:[["1","0"],["0","1"]],e:2},
  {g:[["1","1"],["1","1"]],e:1},
  {g:[["1","0","0"],["0","0","0"],["0","0","1"]],e:2},
  {g:[["1","1","0"],["0","1","0"],["0","0","1"]],e:2},
  {g:[["0","0","0"],["0","0","0"],["0","0","0"]],e:0},
  {g:[["1","0","1","0","1"]],e:3},
];
let p=0;
for(const c of cases){
  try{
    const r=numIslands(clone(c.g));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
import copy
sol=Solution()
cases=[
    {'g':[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]],'e':1},
    {'g':[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]],'e':3},
    {'g':[["1"]],'e':1},{'g':[["0"]],'e':0},
    {'g':[["1","0"],["0","1"]],'e':2},{'g':[["1","1"],["1","1"]],'e':1},
    {'g':[["1","0","0"],["0","0","0"],["0","0","1"]],'e':2},
    {'g':[["1","1","0"],["0","1","0"],["0","0","1"]],'e':2},
    {'g':[["0","0","0"],["0","0","0"],["0","0","0"]],'e':0},
    {'g':[["1","0","1","0","1"]],'e':3},
]
p=0
for c in cases:
    try:
        r=sol.numIslands(copy.deepcopy(c['g']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 9. Word Break ── (6 → 10 cases)
  {
    id: 9, title: "Word Break",
    jsRunner: jsIIFE(`
const cases=[
  {s:'leetcode',w:['leet','code'],e:true},
  {s:'applepenapple',w:['apple','pen'],e:true},
  {s:'catsandog',w:['cats','dog','sand','and','cat'],e:false},
  {s:'a',w:['a'],e:true},
  {s:'cars',w:['car','ca','rs'],e:true},
  {s:'aaaaaaa',w:['aaaa','aaa'],e:true},
  {s:'bb',w:['a','b','bbb','bbbb'],e:true},
  {s:'abcd',w:['a','abc','b','cd'],e:true},
  {s:'cc',w:['c'],e:true},
  {s:'abcdef',w:['ab','abc','cd','def','abcd'],e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=wordBreak(c.s,[...c.w]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+JSON.stringify(c.s)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | s='+JSON.stringify(c.s)+' |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':'leetcode','w':['leet','code'],'e':True},
    {'s':'applepenapple','w':['apple','pen'],'e':True},
    {'s':'catsandog','w':['cats','dog','sand','and','cat'],'e':False},
    {'s':'a','w':['a'],'e':True},
    {'s':'cars','w':['car','ca','rs'],'e':True},
    {'s':'aaaaaaa','w':['aaaa','aaa'],'e':True},
    {'s':'bb','w':['a','b','bbb','bbbb'],'e':True},
    {'s':'abcd','w':['a','abc','b','cd'],'e':True},
    {'s':'cc','w':['c'],'e':True},
    {'s':'abcdef','w':['ab','abc','cd','def','abcd'],'e':True},
]
p=0
for c in cases:
    try:
        r=sol.wordBreak(c['s'],c['w'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+repr(c['s'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 10. Combination Sum ── (5 → 10 cases)
  {
    id: 10, title: "Combination Sum",
    jsRunner: jsIIFE(`
const norm=arr=>(arr||[]).map(a=>[...a].sort((x,y)=>x-y)).sort((a,b)=>a.join()>b.join()?1:-1).map(a=>a.join()).join('|');
const cases=[
  {c:[2,3,6,7],t:7,e:[[2,2,3],[7]]},
  {c:[2,3,5],t:8,e:[[2,2,2,2],[2,3,3],[3,5]]},
  {c:[2],t:1,e:[]},
  {c:[1],t:1,e:[[1]]},
  {c:[1],t:2,e:[[1,1]]},
  {c:[2,3,5],t:5,e:[[2,3],[5]]},
  {c:[3,7],t:6,e:[[3,3]]},
  {c:[1,2,3],t:4,e:[[1,1,1,1],[1,1,2],[1,3],[2,2]]},
  {c:[2],t:4,e:[[2,2]]},
  {c:[5,10,15],t:15,e:[[5,5,5],[5,10],[15]]},
];
let p=0;
for(const c of cases){
  try{
    const r=combinationSum([...c.c],c.t);
    const ok=norm(r)===norm(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| target='+c.t+'| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | target='+c.t+' |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
def norm(arr): return '|'.join(sorted([','.join(map(str,sorted(a))) for a in (arr or [])]))
cases=[
    {'c':[2,3,6,7],'t':7,'e':[[2,2,3],[7]]},
    {'c':[2,3,5],'t':8,'e':[[2,2,2,2],[2,3,3],[3,5]]},
    {'c':[2],'t':1,'e':[]},
    {'c':[1],'t':1,'e':[[1]]},
    {'c':[2,3,5],'t':5,'e':[[2,3],[5]]},
    {'c':[3,7],'t':6,'e':[[3,3]]},
    {'c':[1,2,3],'t':4,'e':[[1,1,1,1],[1,1,2],[1,3],[2,2]]},
    {'c':[2],'t':4,'e':[[2,2]]},
    {'c':[5,10,15],'t':15,'e':[[5,5,5],[5,10],[15]]},
]
p=0
for c in cases:
    try:
        r=sol.combinationSum(c['c'][:],c['t'])
        ok=norm(r)==norm(c['e'])
        print('✓ PASS' if ok else '✗ FAIL','| target='+str(c['t'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 11. 3Sum ── (4 → 10 cases)
  {
    id: 11, title: "3Sum",
    jsRunner: jsIIFE(`
const norm=arr=>(arr||[]).map(a=>[...a].sort((x,y)=>x-y)).sort((a,b)=>a.join()>b.join()?1:a.join()<b.join()?-1:0).map(a=>a.join()).join('|');
const cases=[
  {n:[-1,0,1,2,-1,-4],e:[[-1,-1,2],[-1,0,1]]},
  {n:[0,1,1],e:[]},
  {n:[0,0,0],e:[[0,0,0]]},
  {n:[-2,0,1,1,2],e:[[-2,0,2],[-2,1,1]]},
  {n:[0,0,0,0],e:[[0,0,0]]},
  {n:[-4,-1,-1,0,1,2],e:[[-1,-1,2],[-1,0,1]]},
  {n:[1,2,3],e:[]},
  {n:[-1,0,1],e:[[-1,0,1]]},
  {n:[-2,-1,0,1,2],e:[[-2,0,2],[-1,0,1]]},
  {n:[-5,0,5,-5,0,5],e:[[-5,0,5]]},
];
let p=0;
for(const c of cases){
  try{
    const r=threeSum([...c.n]);
    const ok=norm(r)===norm(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
def norm(arr): return '|'.join(sorted([','.join(map(str,sorted(a))) for a in (arr or [])]))
cases=[
    {'n':[-1,0,1,2,-1,-4],'e':[[-1,-1,2],[-1,0,1]]},
    {'n':[0,1,1],'e':[]},
    {'n':[0,0,0],'e':[[0,0,0]]},
    {'n':[-2,0,1,1,2],'e':[[-2,0,2],[-2,1,1]]},
    {'n':[0,0,0,0],'e':[[0,0,0]]},
    {'n':[-4,-1,-1,0,1,2],'e':[[-1,-1,2],[-1,0,1]]},
    {'n':[1,2,3],'e':[]},
    {'n':[-1,0,1],'e':[[-1,0,1]]},
    {'n':[-2,-1,0,1,2],'e':[[-2,0,2],[-1,0,1]]},
    {'n':[-5,0,5,-5,0,5],'e':[[-5,0,5]]},
]
p=0
for c in cases:
    try:
        r=sol.threeSum(c['n'][:])
        ok=norm(r)==norm(c['e'])
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 12. Container With Most Water ── (5 → 10 cases)
  {
    id: 12, title: "Container With Most Water",
    jsRunner: jsIIFE(`
const cases=[
  {h:[1,8,6,2,5,4,8,3,7],e:49},{h:[1,1],e:1},
  {h:[4,3,2,1,4],e:16},{h:[1,2,1],e:2},{h:[2,3,4,5,18,17,6],e:17},
  {h:[1,3,2,5,25,24,5],e:24},
  {h:[3,2,1,3],e:9},
  {h:[2,3,10,5,7,8,9],e:36},
  {h:[1,2,4,3],e:4},
  {h:[5,5],e:5},
];
let p=0;
for(const c of cases){
  try{
    const r=maxArea([...c.h]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'h':[1,8,6,2,5,4,8,3,7],'e':49},{'h':[1,1],'e':1},
    {'h':[4,3,2,1,4],'e':16},{'h':[1,2,1],'e':2},
    {'h':[1,3,2,5,25,24,5],'e':24},
    {'h':[3,2,1,3],'e':9},
    {'h':[2,3,10,5,7,8,9],'e':36},
    {'h':[1,2,4,3],'e':4},
    {'h':[5,5],'e':5},
]
p=0
for c in cases:
    try:
        r=sol.maxArea(c['h'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 13. Invert Binary Tree ── (4 → 8 cases)
  {
    id: 13, title: "Invert Binary Tree",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[4,2,7,1,3,6,9],e:[4,7,2,9,6,3,1]},
  {t:[2,1,3],e:[2,3,1]},
  {t:[],e:[]},
  {t:[1],e:[1]},
  {t:[1,2,3,4,5,6,7],e:[1,3,2,7,6,5,4]},
  {t:[1,2],e:[1,null,2]},
  {t:[3,1,2],e:[3,2,1]},
  {t:[1,2,3,null,4,5,null],e:[1,3,2,null,5,4]},
];
let p=0;
for(const c of cases){
  try{
    const r=treeToArr(invertTree(buildTree([...c.t])));
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_TREE}
sol=Solution()
cases=[
    {'t':[4,2,7,1,3,6,9],'e':[4,7,2,9,6,3,1]},
    {'t':[2,1,3],'e':[2,3,1]},
    {'t':[],'e':[]},
    {'t':[1],'e':[1]},
    {'t':[1,2,3,4,5,6,7],'e':[1,3,2,7,6,5,4]},
    {'t':[1,2],'e':[1,None,2]},
    {'t':[3,1,2],'e':[3,2,1]},
    {'t':[1,2,3,None,4,5,None],'e':[1,3,2,None,5,4]},
]
p=0
for c in cases:
    try:
        r=tree_to_arr(sol.invertTree(build_tree(c['t'])))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 14. Maximum Depth of Binary Tree ── (5 → 10 cases)
  {
    id: 14, title: "Maximum Depth of Binary Tree",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[3,9,20,null,null,15,7],e:3},{t:[1,null,2],e:2},
  {t:[],e:0},{t:[1],e:1},{t:[1,2,3,4,5],e:3},
  {t:[1,2,3,4,5,6,7],e:3},
  {t:[1,2,null,3],e:3},
  {t:[1,null,2,null,null,null,3],e:3},
  {t:[1,2,3,4,5,null,null,8],e:4},
  {t:[1,2,null,3,null,null,null,4],e:4},
];
let p=0;
for(const c of cases){
  try{
    const r=maxDepth(buildTree([...c.t]));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_TREE}
sol=Solution()
cases=[
    {'t':[3,9,20,None,None,15,7],'e':3},{'t':[1,None,2],'e':2},
    {'t':[],'e':0},{'t':[1],'e':1},{'t':[1,2,3,4,5],'e':3},
    {'t':[1,2,3,4,5,6,7],'e':3},
    {'t':[1,2,None,3],'e':3},
    {'t':[1,2,None,3,None,None,None,4],'e':4},
]
p=0
for c in cases:
    try:
        r=sol.maxDepth(build_tree(c['t']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 15. Min Stack ── (6 → 9 ops-sequences)
  {
    id: 15, title: "Min Stack",
    jsRunner: jsIIFE(`
let p=0,total=0;
function test(label,got,exp){
  total++;
  const ok=got===exp;
  console.log(ok?'✓ PASS':'✗ FAIL','|',label,'| Expected:'+exp,'| Got:'+got);
  if(ok)p++;
}
try{
  const s1=new MinStack();
  s1.push(-2);s1.push(0);s1.push(-3);
  test('getMin after push -2,0,-3',s1.getMin(),-3);
  s1.pop();
  test('top after pop',s1.top(),0);
  test('getMin after pop',s1.getMin(),-2);
  const s2=new MinStack();
  s2.push(5);s2.push(3);s2.push(7);
  test('getMin 3',s2.getMin(),3);
  s2.pop();
  test('getMin still 3',s2.getMin(),3);
  s2.pop();
  test('getMin now 5',s2.getMin(),5);
  const s3=new MinStack();
  s3.push(0);s3.push(1);s3.push(0);
  test('getMin with duplicate 0',s3.getMin(),0);
  s3.pop();
  test('getMin after pop still 0',s3.getMin(),0);
  test('top is 1',s3.top(),1);
}catch(e){console.log('✗ ERROR |',e.message);total++;}
console.log('\\n'+p+'/'+total+' test cases passed.');`),
    pyRunner: `
p=0;total=0
def test(label,got,exp):
    global p,total
    total+=1
    ok=got==exp
    print('✓ PASS' if ok else '✗ FAIL','|',label,'| Expected:'+str(exp)+'| Got:'+str(got))
    if ok: p+=1
try:
    s1=MinStack()
    s1.push(-2);s1.push(0);s1.push(-3)
    test('getMin after push -2,0,-3',s1.getMin(),-3)
    s1.pop()
    test('top after pop',s1.top(),0)
    test('getMin after pop',s1.getMin(),-2)
    s2=MinStack()
    s2.push(5);s2.push(3);s2.push(7)
    test('getMin 3',s2.getMin(),3)
    s2.pop()
    test('getMin still 3',s2.getMin(),3)
    s2.pop()
    test('getMin now 5',s2.getMin(),5)
    s3=MinStack()
    s3.push(0);s3.push(1);s3.push(0)
    test('getMin with duplicate 0',s3.getMin(),0)
    s3.pop()
    test('getMin after pop still 0',s3.getMin(),0)
    test('top is 1',s3.top(),1)
except Exception as ex:
    print('✗ ERROR |',str(ex));total+=1
print(f'\\n{p}/{total} test cases passed.')`,
  },

  // ── 16. Reverse Linked List ── (4 → 8 cases)
  {
    id: 16, title: "Reverse Linked List",
    jsRunner: jsIIFE(`
${JS_LIST}
const cases=[
  {a:[1,2,3,4,5],e:[5,4,3,2,1]},
  {a:[1,2],e:[2,1]},
  {a:[],e:[]},
  {a:[1],e:[1]},
  {a:[1,2,3],e:[3,2,1]},
  {a:[5,4,3,2,1],e:[1,2,3,4,5]},
  {a:[1,1,1],e:[1,1,1]},
  {a:[1,2,3,4,5,6,7,8,9,10],e:[10,9,8,7,6,5,4,3,2,1]},
];
let p=0;
for(const c of cases){
  try{
    const r=toArr(reverseList(toList(c.a)));
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_LIST}
sol=Solution()
cases=[
    {'a':[1,2,3,4,5],'e':[5,4,3,2,1]},
    {'a':[1,2],'e':[2,1]},
    {'a':[],'e':[]},
    {'a':[1],'e':[1]},
    {'a':[1,2,3],'e':[3,2,1]},
    {'a':[5,4,3,2,1],'e':[1,2,3,4,5]},
    {'a':[1,1,1],'e':[1,1,1]},
    {'a':[1,2,3,4,5,6,7,8,9,10],'e':[10,9,8,7,6,5,4,3,2,1]},
]
p=0
for c in cases:
    try:
        r=to_arr(sol.reverseList(to_list(c['a'])))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 17. Binary Tree Level Order Traversal ── (4 → 8 cases)
  {
    id: 17, title: "Binary Tree Level Order Traversal",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[3,9,20,null,null,15,7],e:[[3],[9,20],[15,7]]},
  {t:[1],e:[[1]]},{t:[],e:[]},{t:[1,2,3,4,5],e:[[1],[2,3],[4,5]]},
  {t:[1,2,3,4,5,6,7],e:[[1],[2,3],[4,5,6,7]]},
  {t:[1,null,2,null,3],e:[[1],[2],[3]]},
  {t:[1,2,null,3],e:[[1],[2],[3]]},
  {t:[5,1,4,null,null,3,6],e:[[5],[1,4],[3,6]]},
];
let p=0;
for(const c of cases){
  try{
    const r=levelOrder(buildTree([...c.t]));
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_TREE}
sol=Solution()
cases=[
    {'t':[3,9,20,None,None,15,7],'e':[[3],[9,20],[15,7]]},
    {'t':[1],'e':[[1]]},{'t':[],'e':[]},{'t':[1,2,3,4,5],'e':[[1],[2,3],[4,5]]},
    {'t':[1,2,3,4,5,6,7],'e':[[1],[2,3],[4,5,6,7]]},
    {'t':[1,None,2,None,3],'e':[[1],[2],[3]]},
    {'t':[1,2,None,3],'e':[[1],[2],[3]]},
    {'t':[5,1,4,None,None,3,6],'e':[[5],[1,4],[3,6]]},
]
p=0
for c in cases:
    try:
        r=sol.levelOrder(build_tree(c['t']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 18. Product of Array Except Self ── (4 → 8 cases)
  {
    id: 18, title: "Product of Array Except Self",
    jsRunner: jsIIFE(`
const cases=[
  {n:[1,2,3,4],e:[24,12,8,6]},
  {n:[-1,1,0,-3,3],e:[0,0,9,0,0]},
  {n:[2,3],e:[3,2]},
  {n:[1,0],e:[0,1]},
  {n:[1,1,1,1],e:[1,1,1,1]},
  {n:[-1,-1,-1,-1],e:[-1,-1,-1,-1]},
  {n:[0,0],e:[0,0]},
  {n:[2,3,4,5],e:[60,40,30,24]},
];
let p=0;
for(const c of cases){
  try{
    const r=productExceptSelf([...c.n]);
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[1,2,3,4],'e':[24,12,8,6]},
    {'n':[-1,1,0,-3,3],'e':[0,0,9,0,0]},
    {'n':[2,3],'e':[3,2]},
    {'n':[1,0],'e':[0,1]},
    {'n':[1,1,1,1],'e':[1,1,1,1]},
    {'n':[-1,-1,-1,-1],'e':[-1,-1,-1,-1]},
    {'n':[0,0],'e':[0,0]},
    {'n':[2,3,4,5],'e':[60,40,30,24]},
]
p=0
for c in cases:
    try:
        r=sol.productExceptSelf(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 19. Coin Change ── (5 → 10 cases)
  {
    id: 19, title: "Coin Change",
    jsRunner: jsIIFE(`
const cases=[
  {c:[1,2,5],a:11,e:3},
  {c:[2],a:3,e:-1},
  {c:[1],a:0,e:0},
  {c:[1],a:2,e:2},
  {c:[186,419,83,408],a:6249,e:20},
  {c:[1,5,10,25],a:36,e:3},
  {c:[2,5,10],a:3,e:-1},
  {c:[1],a:1,e:1},
  {c:[2,3,5],a:10,e:2},
  {c:[3,5],a:7,e:-1},
];
let p=0;
for(const c of cases){
  try{
    const r=coinChange([...c.c],c.a);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| amount='+c.a+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'c':[1,2,5],'a':11,'e':3},
    {'c':[2],'a':3,'e':-1},
    {'c':[1],'a':0,'e':0},
    {'c':[1],'a':2,'e':2},
    {'c':[186,419,83,408],'a':6249,'e':20},
    {'c':[1,5,10,25],'a':36,'e':3},
    {'c':[2,5,10],'a':3,'e':-1},
    {'c':[1],'a':1,'e':1},
    {'c':[2,3,5],'a':10,'e':2},
    {'c':[3,5],'a':7,'e':-1},
]
p=0
for c in cases:
    try:
        r=sol.coinChange(c['c'][:],c['a'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| amount='+str(c['a'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 20. House Robber ── (6 → 10 cases)
  {
    id: 20, title: "House Robber",
    jsRunner: jsIIFE(`
const cases=[
  {n:[1,2,3,1],e:4},
  {n:[2,7,9,3,1],e:12},
  {n:[1],e:1},
  {n:[2,1],e:2},
  {n:[0,0,0],e:0},
  {n:[5,1,1,5],e:10},
  {n:[2,3,2],e:3},
  {n:[1,2,3,4,5,6,7,8,9,10],e:30},
  {n:[100,1,1,100],e:200},
  {n:[4,1,2,7,5,3,1],e:14},
];
let p=0;
for(const c of cases){
  try{
    const r=rob([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums='+JSON.stringify(c.n)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[1,2,3,1],'e':4},
    {'n':[2,7,9,3,1],'e':12},
    {'n':[1],'e':1},
    {'n':[2,1],'e':2},
    {'n':[0,0,0],'e':0},
    {'n':[5,1,1,5],'e':10},
    {'n':[2,3,2],'e':3},
    {'n':[1,2,3,4,5,6,7,8,9,10],'e':30},
    {'n':[100,1,1,100],'e':200},
    {'n':[4,1,2,7,5,3,1],'e':14},
]
p=0
for c in cases:
    try:
        r=sol.rob(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 21. Merge Intervals ── (5 → 10 cases)
  {
    id: 21, title: "Merge Intervals",
    jsRunner: jsIIFE(`
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const cases=[
  {i:[[1,3],[2,6],[8,10],[15,18]],e:[[1,6],[8,10],[15,18]]},
  {i:[[1,4],[4,5]],e:[[1,5]]},
  {i:[[1,4]],e:[[1,4]]},
  {i:[[1,4],[2,3]],e:[[1,4]]},
  {i:[[1,2],[3,4],[5,6]],e:[[1,2],[3,4],[5,6]]},
  {i:[[1,3],[2,4],[3,5]],e:[[1,5]]},
  {i:[[0,0]],e:[[0,0]]},
  {i:[[1,4],[0,4]],e:[[0,4]]},
  {i:[[2,3],[4,5],[6,7],[8,9],[1,10]],e:[[1,10]]},
  {i:[[1,2],[2,3],[3,4],[4,5]],e:[[1,5]]},
];
let p=0;
for(const c of cases){
  try{
    const r=merge(c.i.map(x=>[...x]));
    const ok=eq(r,c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'i':[[1,3],[2,6],[8,10],[15,18]],'e':[[1,6],[8,10],[15,18]]},
    {'i':[[1,4],[4,5]],'e':[[1,5]]},
    {'i':[[1,4]],'e':[[1,4]]},
    {'i':[[1,4],[2,3]],'e':[[1,4]]},
    {'i':[[1,2],[3,4],[5,6]],'e':[[1,2],[3,4],[5,6]]},
    {'i':[[1,3],[2,4],[3,5]],'e':[[1,5]]},
    {'i':[[0,0]],'e':[[0,0]]},
    {'i':[[1,4],[0,4]],'e':[[0,4]]},
    {'i':[[2,3],[4,5],[6,7],[8,9],[1,10]],'e':[[1,10]]},
    {'i':[[1,2],[2,3],[3,4],[4,5]],'e':[[1,5]]},
]
p=0
for c in cases:
    try:
        r=sol.merge([x[:] for x in c['i']])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 22. Jump Game ── (6 → 10 cases)
  {
    id: 22, title: "Jump Game",
    jsRunner: jsIIFE(`
const cases=[
  {n:[2,3,1,1,4],e:true},
  {n:[3,2,1,0,4],e:false},
  {n:[0],e:true},
  {n:[1,0],e:true},
  {n:[0,1],e:false},
  {n:[1,1,0,1],e:false},
  {n:[2,0,0],e:true},
  {n:[1,2,3],e:true},
  {n:[3,0,8,2,0,0,1],e:true},
  {n:[2,0,0,0],e:false},
];
let p=0;
for(const c of cases){
  try{
    const r=canJump([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums='+JSON.stringify(c.n)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[2,3,1,1,4],'e':True},
    {'n':[3,2,1,0,4],'e':False},
    {'n':[0],'e':True},
    {'n':[1,0],'e':True},
    {'n':[0,1],'e':False},
    {'n':[1,1,0,1],'e':False},
    {'n':[2,0,0],'e':True},
    {'n':[1,2,3],'e':True},
    {'n':[3,0,8,2,0,0,1],'e':True},
    {'n':[2,0,0,0],'e':False},
]
p=0
for c in cases:
    try:
        r=sol.canJump(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 23. Subsets ── (2 → 5 cases)
  {
    id: 23, title: "Subsets",
    jsRunner: jsIIFE(`
const norm=arr=>[...arr].map(a=>[...a].sort((x,y)=>x-y)).sort((a,b)=>a.join(',')>b.join(',')?1:-1).map(a=>a.join(',')).join('|');
const cases=[
  {n:[1,2,3],e:[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]},
  {n:[0],e:[[],[0]]},
  {n:[1,2],e:[[],[1],[2],[1,2]]},
  {n:[4],e:[[],[4]]},
  {n:[1,2,3,4],cnt:16},
];
let p=0;
for(const c of cases){
  try{
    const r=subsets([...c.n]);
    const expected=c.cnt??c.e.length;
    const ok=c.e?norm(r)===norm(c.e)&&r.length===expected:r.length===expected;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected '+expected+' subsets | Got '+r.length);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
def norm(arr): return '|'.join(sorted([','.join(map(str,sorted(a))) for a in arr]))
cases=[
    {'n':[1,2,3],'e':[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]},
    {'n':[0],'e':[[],[0]]},
    {'n':[1,2],'e':[[],[1],[2],[1,2]]},
    {'n':[4],'e':[[],[4]]},
    {'n':[1,2,3,4],'cnt':16},
]
p=0
for c in cases:
    try:
        r=sol.subsets(c['n'][:])
        expected=c.get('cnt',len(c.get('e',[])))
        ok=(norm(r)==norm(c['e']) and len(r)==expected) if 'e' in c else len(r)==expected
        print('✓ PASS' if ok else '✗ FAIL','| Expected',expected,'subsets | Got',len(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 24. Longest Palindromic Substring ── (5 → 10 cases)
  {
    id: 24, title: "Longest Palindromic Substring",
    jsRunner: jsIIFE(`
function isPalin(s){return s===s.split('').reverse().join('');}
const cases=[
  {s:'babad',minLen:3},
  {s:'cbbd',e:'bb'},
  {s:'a',e:'a'},
  {s:'ac',minLen:1},
  {s:'racecar',e:'racecar'},
  {s:'abacaba',e:'abacaba'},
  {s:'aaa',e:'aaa'},
  {s:'aaaa',e:'aaaa'},
  {s:'abcba',e:'abcba'},
  {s:'abcde',minLen:1},
];
let p=0;
for(const c of cases){
  try{
    const r=longestPalindrome(c.s);
    const ok=isPalin(r)&&(c.e?r===c.e:r.length>=c.minLen)&&c.s.includes(r);
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+JSON.stringify(c.s)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
def is_palin(s): return s==s[::-1]
cases=[
    {'s':'babad','min_len':3},
    {'s':'cbbd','e':'bb'},
    {'s':'a','e':'a'},
    {'s':'ac','min_len':1},
    {'s':'racecar','e':'racecar'},
    {'s':'abacaba','e':'abacaba'},
    {'s':'aaa','e':'aaa'},
    {'s':'aaaa','e':'aaaa'},
    {'s':'abcba','e':'abcba'},
    {'s':'abcde','min_len':1},
]
p=0
for c in cases:
    try:
        r=sol.longestPalindrome(c['s'])
        ok=is_palin(r) and c['s'].find(r)>=0 and ('e' not in c or r==c['e']) and len(r)>=(c.get('min_len',len(r)))
        print('✓ PASS' if ok else '✗ FAIL','| s='+repr(c['s'])+'| Got:'+repr(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 25. Trapping Rain Water ── (6 → 10 cases)
  {
    id: 25, title: "Trapping Rain Water",
    jsRunner: jsIIFE(`
const cases=[
  {h:[0,1,0,2,1,0,1,3,2,1,2,1],e:6},
  {h:[4,2,0,3,2,5],e:9},
  {h:[1,0,1],e:1},
  {h:[3,0,2,0,4],e:7},
  {h:[1,2,3,4,5],e:0},
  {h:[5,4,3,2,1],e:0},
  {h:[0,0,0],e:0},
  {h:[2,0,2],e:2},
  {h:[0,3,0,2,0,4],e:7},
  {h:[3,1,2,4,0,1,3,2],e:8},
];
let p=0;
for(const c of cases){
  try{
    const r=trap([...c.h]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'h':[0,1,0,2,1,0,1,3,2,1,2,1],'e':6},
    {'h':[4,2,0,3,2,5],'e':9},
    {'h':[1,0,1],'e':1},
    {'h':[3,0,2,0,4],'e':7},
    {'h':[1,2,3,4,5],'e':0},
    {'h':[5,4,3,2,1],'e':0},
    {'h':[0,0,0],'e':0},
    {'h':[2,0,2],'e':2},
    {'h':[0,3,0,2,0,4],'e':7},
    {'h':[3,1,2,4,0,1,3,2],'e':8},
]
p=0
for c in cases:
    try:
        r=sol.trap(c['h'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },
];

async function main() {
  console.log(`\nExpanding test cases for ${updates.length} problems (Chunk 1: 1–25)...\n`);
  for (const u of updates) {
    await prisma.intelProblem.update({
      where: { id: u.id },
      data: { jsRunner: u.jsRunner, pyRunner: u.pyRunner },
    });
    console.log(`  ✓ ${String(u.id).padStart(2, "0")}. ${u.title}`);
  }
  console.log("\n✅ Chunk 1 complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });

/**
 * Chunk 3: Expand test cases for problems 51–75.
 * Run with: npx tsx prisma/seed-more-cases-chunk3.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function jsIIFE(body: string) {
  return `\n;(function(){\ntry{\n${body}\n}catch(e){console.log('Runtime Error:',e.message)}\n})();`;
}

const JS_LIST = `
function ListNode(val,next){this.val=(val===undefined?0:val);this.next=(next===undefined?null:next);}
function toList(arr){let d=new ListNode(0),c=d;for(const v of arr){c.next=new ListNode(v);c=c.next;}return d.next;}
function toArr(h){const r=[];let lim=1000;while(h&&lim-->0){r.push(h.val);h=h.next;}return r;}
`;
const PY_LIST = `
class ListNode:
    def __init__(self,val=0,next=None):
        self.val=val;self.next=next
def to_list(arr):
    d=ListNode();c=d
    for v in arr:c.next=ListNode(v);c=c.next
    return d.next
def to_arr(h,lim=1000):
    r=[]
    while h and lim>0:r.append(h.val);h=h.next;lim-=1
    return r
`;
const JS_TREE = `
function TreeNode(val,left,right){this.val=(val===undefined?0:val);this.left=(left===undefined?null:left);this.right=(right===undefined?null:right);}
function buildTree(arr){if(!arr||arr.length===0)return null;const root=new TreeNode(arr[0]);const q=[root];let i=1;while(i<arr.length){const node=q.shift();if(arr[i]!=null){node.left=new TreeNode(arr[i]);q.push(node.left);}i++;if(i<arr.length&&arr[i]!=null){node.right=new TreeNode(arr[i]);q.push(node.right);}i++;}return root;}
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
`;

const updates = [

  // ── 51. Insert Interval ── (5 → 8)
  { id: 51, title: "Insert Interval",
    jsRunner: jsIIFE(`
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const cases=[
  {i:[[1,3],[6,9]],n:[2,5],e:[[1,5],[6,9]]},
  {i:[[1,2],[3,5],[6,7],[8,10],[12,16]],n:[4,8],e:[[1,2],[3,10],[12,16]]},
  {i:[],n:[5,7],e:[[5,7]]},
  {i:[[1,5]],n:[2,3],e:[[1,5]]},
  {i:[[1,5]],n:[6,8],e:[[1,5],[6,8]]},
  {i:[[1,5]],n:[0,0],e:[[0,0],[1,5]]},
  {i:[[1,3],[6,9]],n:[10,12],e:[[1,3],[6,9],[10,12]]},
  {i:[[2,3],[5,6]],n:[1,4],e:[[1,4],[5,6]]},
];
let p=0;
for(const c of cases){
  try{
    const r=insert(c.i.map(x=>[...x]),[...c.n]);
    const ok=eq(r,c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| newInterval=['+c.n+'] | Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'i':[[1,3],[6,9]],'n':[2,5],'e':[[1,5],[6,9]]},
    {'i':[[1,2],[3,5],[6,7],[8,10],[12,16]],'n':[4,8],'e':[[1,2],[3,10],[12,16]]},
    {'i':[],'n':[5,7],'e':[[5,7]]},
    {'i':[[1,5]],'n':[2,3],'e':[[1,5]]},
    {'i':[[1,5]],'n':[6,8],'e':[[1,5],[6,8]]},
    {'i':[[1,5]],'n':[0,0],'e':[[0,0],[1,5]]},
    {'i':[[1,3],[6,9]],'n':[10,12],'e':[[1,3],[6,9],[10,12]]},
    {'i':[[2,3],[5,6]],'n':[1,4],'e':[[1,4],[5,6]]},
]
p=0
for c in cases:
    try:
        r=sol.insert([list(x) for x in c['i']],list(c['n']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| newInterval='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 52. Non-overlapping Intervals ── (4 → 8)
  { id: 52, title: "Non-overlapping Intervals",
    jsRunner: jsIIFE(`
const cases=[
  {i:[[1,2],[2,3],[3,4],[1,3]],e:1},
  {i:[[1,2],[1,2],[1,2]],e:2},
  {i:[[1,2],[2,3]],e:0},
  {i:[[1,100],[11,22],[1,11],[2,12]],e:2},
  {i:[[1,2]],e:0},
  {i:[[1,3],[2,4],[3,5]],e:1},
  {i:[[0,2],[1,3],[2,4],[3,5]],e:2},
  {i:[[1,2],[1,3],[1,4]],e:2},
];
let p=0;
for(const c of cases){
  try{
    const r=eraseOverlapIntervals(c.i.map(x=>[...x]));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'i':[[1,2],[2,3],[3,4],[1,3]],'e':1},
    {'i':[[1,2],[1,2],[1,2]],'e':2},
    {'i':[[1,2],[2,3]],'e':0},
    {'i':[[1,100],[11,22],[1,11],[2,12]],'e':2},
    {'i':[[1,2]],'e':0},
    {'i':[[1,3],[2,4],[3,5]],'e':1},
    {'i':[[0,2],[1,3],[2,4],[3,5]],'e':2},
    {'i':[[1,2],[1,3],[1,4]],'e':2},
]
p=0
for c in cases:
    try:
        r=sol.eraseOverlapIntervals([list(x) for x in c['i']])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 53. Gas Station ── (4 → 8)
  { id: 53, title: "Gas Station",
    jsRunner: jsIIFE(`
const cases=[
  {g:[1,2,3,4,5],c:[3,4,5,1,2],e:3},
  {g:[2,3,4],c:[3,4,3],e:-1},
  {g:[5,1,2,3,4],c:[4,4,1,5,1],e:4},
  {g:[2],c:[2],e:0},
  {g:[1],c:[1],e:0},
  {g:[1,2],c:[2,1],e:1},
  {g:[3,3,6],c:[1,1,10],e:0},
  {g:[1,1,1,1],c:[1,1,1,2],e:-1},
];
let p=0;
for(const c of cases){
  try{
    const r=canCompleteCircuit([...c.g],[...c.c]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'g':[1,2,3,4,5],'c':[3,4,5,1,2],'e':3},
    {'g':[2,3,4],'c':[3,4,3],'e':-1},
    {'g':[5,1,2,3,4],'c':[4,4,1,5,1],'e':4},
    {'g':[2],'c':[2],'e':0},
    {'g':[1],'c':[1],'e':0},
    {'g':[1,2],'c':[2,1],'e':1},
    {'g':[3,3,6],'c':[1,1,10],'e':0},
    {'g':[1,1,1,1],'c':[1,1,1,2],'e':-1},
]
p=0
for c in cases:
    try:
        r=sol.canCompleteCircuit(c['g'][:],c['c'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 54. Partition Labels ── (4 → 8)
  { id: 54, title: "Partition Labels",
    jsRunner: jsIIFE(`
const cases=[
  {s:'ababcbacadefegdehijhklij',e:[9,7,8]},
  {s:'eccbbbbdec',e:[10]},
  {s:'a',e:[1]},
  {s:'ab',e:[1,1]},
  {s:'aab',e:[2,1]},
  {s:'caedbdedda',e:[1,9]},
  {s:'aaabbbccc',e:[3,3,3]},
  {s:'abcabc',e:[6]},
];
let p=0;
for(const c of cases){
  try{
    const r=partitionLabels(c.s);
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+c.s+'| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':'ababcbacadefegdehijhklij','e':[9,7,8]},
    {'s':'eccbbbbdec','e':[10]},
    {'s':'a','e':[1]},
    {'s':'ab','e':[1,1]},
    {'s':'aab','e':[2,1]},
    {'s':'caedbdedda','e':[1,9]},
    {'s':'aaabbbccc','e':[3,3,3]},
    {'s':'abcabc','e':[6]},
]
p=0
for c in cases:
    try:
        r=sol.partitionLabels(c['s'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+c['s']+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 55. House Robber II ── (6 → 8)
  { id: 55, title: "House Robber II",
    jsRunner: jsIIFE(`
const cases=[
  {n:[2,3,2],e:3},{n:[1,2,3,1],e:4},{n:[1,2,3],e:3},
  {n:[1],e:1},{n:[1,2],e:2},{n:[200,3,140,20,10],e:340},
  {n:[1,1],e:1},
  {n:[1,3,1,3,100],e:103},
];
let p=0;
for(const c of cases){
  try{
    const r=rob([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[2,3,2],'e':3},{'n':[1,2,3,1],'e':4},{'n':[1,2,3],'e':3},
    {'n':[1],'e':1},{'n':[1,2],'e':2},{'n':[200,3,140,20,10],'e':340},
    {'n':[1,1],'e':1},
    {'n':[1,3,1,3,100],'e':103},
]
p=0
for c in cases:
    try:
        r=sol.rob(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| nums='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 56. Maximum Product Subarray ── (6 → 8)
  { id: 56, title: "Maximum Product Subarray",
    jsRunner: jsIIFE(`
const cases=[
  {n:[2,3,-2,4],e:6},{n:[-2,0,-1],e:0},{n:[-2],e:-2},
  {n:[-2,3,-4],e:24},{n:[0,2],e:2},{n:[3,-1,4],e:4},
  {n:[1,0,2],e:2},
  {n:[-1,-2,-3,-4],e:24},
];
let p=0;
for(const c of cases){
  try{
    const r=maxProduct([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[2,3,-2,4],'e':6},{'n':[-2,0,-1],'e':0},{'n':[-2],'e':-2},
    {'n':[-2,3,-4],'e':24},{'n':[0,2],'e':2},{'n':[3,-1,4],'e':4},
    {'n':[1,0,2],'e':2},
    {'n':[-1,-2,-3,-4],'e':24},
]
p=0
for c in cases:
    try:
        r=sol.maxProduct(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| nums='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 57. Decode Ways ── (7 → 9)
  { id: 57, title: "Decode Ways",
    jsRunner: jsIIFE(`
const cases=[
  {s:'12',e:2},{s:'226',e:3},{s:'06',e:0},
  {s:'0',e:0},{s:'1',e:1},{s:'11106',e:2},{s:'10',e:1},
  {s:'111',e:3},
  {s:'20',e:1},
];
let p=0;
for(const c of cases){
  try{
    const r=numDecodings(c.s);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+c.s+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':'12','e':2},{'s':'226','e':3},{'s':'06','e':0},
    {'s':'0','e':0},{'s':'1','e':1},{'s':'11106','e':2},{'s':'10','e':1},
    {'s':'111','e':3},
    {'s':'20','e':1},
]
p=0
for c in cases:
    try:
        r=sol.numDecodings(c['s'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+c['s']+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 58. Max Area of Island ── (4 → 8)
  { id: 58, title: "Max Area of Island",
    jsRunner: jsIIFE(`
const clone=g=>g.map(r=>[...r]);
const cases=[
  {g:[[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,1]],e:4},
  {g:[[0,0,0,0,0,0,0,0]],e:0},
  {g:[[1,1],[1,0]],e:3},
  {g:[[1]],e:1},
  {g:[[1,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],e:5},
  {g:[[0,1,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],e:5},
  {g:[[1,0],[0,1]],e:1},
  {g:[[1,1],[1,1]],e:4},
];
let p=0;
for(const c of cases){
  try{
    const r=maxAreaOfIsland(clone(c.g));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'g':[[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,1]],'e':4},
    {'g':[[0,0,0,0,0,0,0,0]],'e':0},
    {'g':[[1,1],[1,0]],'e':3},
    {'g':[[1]],'e':1},
    {'g':[[1,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],'e':5},
    {'g':[[0,1,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],'e':5},
    {'g':[[1,0],[0,1]],'e':1},
    {'g':[[1,1],[1,1]],'e':4},
]
p=0
for c in cases:
    try:
        r=sol.maxAreaOfIsland([row[:] for row in c['g']])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 59. Pacific Atlantic Water Flow ── (3 → 8)
  { id: 59, title: "Pacific Atlantic Water Flow",
    jsRunner: jsIIFE(`
const cases=[
  {h:[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]],e:[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]},
  {h:[[1]],e:[[0,0]]},
  {h:[[1,2],[2,1]],e:[[0,1],[1,0]]},
  {h:[[1,1],[1,1]],e:[[0,0],[0,1],[1,0],[1,1]]},
  {h:[[2,1],[1,2]],e:[[0,0],[0,1],[1,0],[1,1]]},
  {h:[[10,10,10],[10,1,10],[10,10,10]],e:[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]},
  {h:[[1,2,3],[8,9,4],[7,6,5]],e:[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]},
  {h:[[5,5,5],[4,4,4],[3,3,3]],e:[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]},
];
let p=0;
for(const c of cases){
  try{
    const r=pacificAtlantic(c.h.map(row=>[...row]));
    const norm=a=>a.map(x=>x.join()).sort().join('|');
    const ok=norm(r)===norm(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected '+c.e.length+' cells | Got '+r.length);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'h':[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]],'e':[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]},
    {'h':[[1]],'e':[[0,0]]},
    {'h':[[1,2],[2,1]],'e':[[0,1],[1,0]]},
    {'h':[[1,1],[1,1]],'e':[[0,0],[0,1],[1,0],[1,1]]},
    {'h':[[2,1],[1,2]],'e':[[0,0],[0,1],[1,0],[1,1]]},
    {'h':[[10,10,10],[10,1,10],[10,10,10]],'e':[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]},
    {'h':[[1,2,3],[8,9,4],[7,6,5]],'e':[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]},
    {'h':[[5,5,5],[4,4,4],[3,3,3]],'e':[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]},
]
p=0
for c in cases:
    try:
        r=sol.pacificAtlantic([row[:] for row in c['h']])
        norm=lambda a:sorted(tuple(x) for x in a)
        ok=norm(r)==norm(c['e'])
        print('✓ PASS' if ok else '✗ FAIL','| Expected '+str(len(c['e']))+' cells | Got '+str(len(r)))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 60. Remove Nth Node From End of List ── (5 → 8)
  { id: 60, title: "Remove Nth Node From End of List",
    jsRunner: jsIIFE(`
${JS_LIST}
const cases=[
  {a:[1,2,3,4,5],n:2,e:[1,2,3,5]},{a:[1],n:1,e:[]},
  {a:[1,2],n:1,e:[1]},{a:[1,2],n:2,e:[2]},{a:[1,2,3],n:3,e:[2,3]},
  {a:[1,2,3,4,5],n:1,e:[1,2,3,4]},
  {a:[1,2,3,4,5],n:5,e:[2,3,4,5]},
  {a:[1,2,3,4,5],n:3,e:[1,2,4,5]},
];
let p=0;
for(const c of cases){
  try{
    const r=toArr(removeNthFromEnd(toList(c.a),c.n));
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_LIST}
sol=Solution()
cases=[
    {'a':[1,2,3,4,5],'n':2,'e':[1,2,3,5]},{'a':[1],'n':1,'e':[]},
    {'a':[1,2],'n':1,'e':[1]},{'a':[1,2],'n':2,'e':[2]},{'a':[1,2,3],'n':3,'e':[2,3]},
    {'a':[1,2,3,4,5],'n':1,'e':[1,2,3,4]},
    {'a':[1,2,3,4,5],'n':5,'e':[2,3,4,5]},
    {'a':[1,2,3,4,5],'n':3,'e':[1,2,4,5]},
]
p=0
for c in cases:
    try:
        r=to_arr(sol.removeNthFromEnd(to_list(c['a']),c['n']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 61. Reorder List ── (4 → 8)
  { id: 61, title: "Reorder List",
    jsRunner: jsIIFE(`
${JS_LIST}
const cases=[
  {a:[1,2,3,4],e:[1,4,2,3]},{a:[1,2,3,4,5],e:[1,5,2,4,3]},
  {a:[1],e:[1]},{a:[1,2],e:[1,2]},
  {a:[1,2,3],e:[1,3,2]},
  {a:[1,2,3,4,5,6],e:[1,6,2,5,3,4]},
  {a:[1,2,3,4,5,6,7],e:[1,7,2,6,3,5,4]},
  {a:[1,2,3,4,5,6,7,8],e:[1,8,2,7,3,6,4,5]},
];
let p=0;
for(const c of cases){
  try{
    const head=toList(c.a);
    reorderList(head);
    const r=toArr(head);
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
    {'a':[1,2,3,4],'e':[1,4,2,3]},{'a':[1,2,3,4,5],'e':[1,5,2,4,3]},
    {'a':[1],'e':[1]},{'a':[1,2],'e':[1,2]},
    {'a':[1,2,3],'e':[1,3,2]},
    {'a':[1,2,3,4,5,6],'e':[1,6,2,5,3,4]},
    {'a':[1,2,3,4,5,6,7],'e':[1,7,2,6,3,5,4]},
    {'a':[1,2,3,4,5,6,7,8],'e':[1,8,2,7,3,6,4,5]},
]
p=0
for c in cases:
    try:
        head=to_list(c['a'])
        sol.reorderList(head)
        r=to_arr(head)
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 62. Add Two Numbers ── (4 → 8)
  { id: 62, title: "Add Two Numbers",
    jsRunner: jsIIFE(`
${JS_LIST}
const cases=[
  {a:[2,4,3],b:[5,6,4],e:[7,0,8]},
  {a:[0],b:[0],e:[0]},
  {a:[9,9,9,9,9,9,9],b:[9,9,9,9],e:[8,9,9,9,0,0,0,1]},
  {a:[1],b:[9,9],e:[0,0,1]},
  {a:[1,8],b:[0],e:[1,8]},
  {a:[5],b:[5],e:[0,1]},
  {a:[9,9],b:[1],e:[0,0,1]},
  {a:[1,2,3],b:[4,5,6],e:[5,7,9]},
];
let p=0;
for(const c of cases){
  try{
    const r=toArr(addTwoNumbers(toList(c.a),toList(c.b)));
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
    {'a':[2,4,3],'b':[5,6,4],'e':[7,0,8]},
    {'a':[0],'b':[0],'e':[0]},
    {'a':[9,9,9,9,9,9,9],'b':[9,9,9,9],'e':[8,9,9,9,0,0,0,1]},
    {'a':[1],'b':[9,9],'e':[0,0,1]},
    {'a':[1,8],'b':[0],'e':[1,8]},
    {'a':[5],'b':[5],'e':[0,1]},
    {'a':[9,9],'b':[1],'e':[0,0,1]},
    {'a':[1,2,3],'b':[4,5,6],'e':[5,7,9]},
]
p=0
for c in cases:
    try:
        r=to_arr(sol.addTwoNumbers(to_list(c['a']),to_list(c['b'])))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 63. Rotate Image ── (3 → 8)
  { id: 63, title: "Rotate Image",
    jsRunner: jsIIFE(`
const cases=[
  {m:[[1,2,3],[4,5,6],[7,8,9]],e:[[7,4,1],[8,5,2],[9,6,3]]},
  {m:[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]],e:[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]},
  {m:[[1]],e:[[1]]},
  {m:[[1,2],[3,4]],e:[[3,1],[4,2]]},
  {m:[[5,1],[2,3]],e:[[2,5],[3,1]]},
  {m:[[1,0],[0,1]],e:[[0,1],[1,0]]},
  {m:[[0,1,2],[3,4,5],[6,7,8]],e:[[6,3,0],[7,4,1],[8,5,2]]},
  {m:[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],e:[[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]},
];
let p=0;
for(const c of cases){
  try{
    const m=c.m.map(r=>[...r]);
    rotate(m);
    const ok=JSON.stringify(m)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(m));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'m':[[1,2,3],[4,5,6],[7,8,9]],'e':[[7,4,1],[8,5,2],[9,6,3]]},
    {'m':[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]],'e':[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]},
    {'m':[[1]],'e':[[1]]},
    {'m':[[1,2],[3,4]],'e':[[3,1],[4,2]]},
    {'m':[[5,1],[2,3]],'e':[[2,5],[3,1]]},
    {'m':[[1,0],[0,1]],'e':[[0,1],[1,0]]},
    {'m':[[0,1,2],[3,4,5],[6,7,8]],'e':[[6,3,0],[7,4,1],[8,5,2]]},
    {'m':[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],'e':[[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]},
]
p=0
for c in cases:
    try:
        m=[row[:] for row in c['m']]
        sol.rotate(m)
        ok=m==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(m))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 64. Spiral Matrix ── (4 → 8)
  { id: 64, title: "Spiral Matrix",
    jsRunner: jsIIFE(`
const cases=[
  {m:[[1,2,3],[4,5,6],[7,8,9]],e:[1,2,3,6,9,8,7,4,5]},
  {m:[[1,2,3,4],[5,6,7,8],[9,10,11,12]],e:[1,2,3,4,8,12,11,10,9,5,6,7]},
  {m:[[1]],e:[1]},{m:[[1,2],[3,4]],e:[1,2,4,3]},
  {m:[[1,2,3]],e:[1,2,3]},
  {m:[[1],[2],[3]],e:[1,2,3]},
  {m:[[1,2,3,4],[5,6,7,8]],e:[1,2,3,4,8,7,6,5]},
  {m:[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],e:[1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]},
];
let p=0;
for(const c of cases){
  try{
    const r=spiralOrder(c.m.map(r=>[...r]));
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'m':[[1,2,3],[4,5,6],[7,8,9]],'e':[1,2,3,6,9,8,7,4,5]},
    {'m':[[1,2,3,4],[5,6,7,8],[9,10,11,12]],'e':[1,2,3,4,8,12,11,10,9,5,6,7]},
    {'m':[[1]],'e':[1]},{'m':[[1,2],[3,4]],'e':[1,2,4,3]},
    {'m':[[1,2,3]],'e':[1,2,3]},
    {'m':[[1],[2],[3]],'e':[1,2,3]},
    {'m':[[1,2,3,4],[5,6,7,8]],'e':[1,2,3,4,8,7,6,5]},
    {'m':[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],'e':[1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]},
]
p=0
for c in cases:
    try:
        r=sol.spiralOrder([row[:] for row in c['m']])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 65. Set Matrix Zeroes ── (4 → 8)
  { id: 65, title: "Set Matrix Zeroes",
    jsRunner: jsIIFE(`
const cases=[
  {m:[[1,1,1],[1,0,1],[1,1,1]],e:[[1,0,1],[0,0,0],[1,0,1]]},
  {m:[[0,1,2,0],[3,4,5,2],[1,3,1,5]],e:[[0,0,0,0],[0,4,5,0],[0,3,1,0]]},
  {m:[[1]],e:[[1]]},{m:[[0]],e:[[0]]},
  {m:[[1,0,3]],e:[[0,0,0]]},
  {m:[[1],[0],[3]],e:[[0],[0],[0]]},
  {m:[[1,1],[1,1]],e:[[1,1],[1,1]]},
  {m:[[1,2,3,4],[5,0,7,8],[9,10,11,12]],e:[[1,0,3,4],[0,0,0,0],[9,0,11,12]]},
];
let p=0;
for(const c of cases){
  try{
    const m=c.m.map(r=>[...r]);
    setZeroes(m);
    const ok=JSON.stringify(m)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(m));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'m':[[1,1,1],[1,0,1],[1,1,1]],'e':[[1,0,1],[0,0,0],[1,0,1]]},
    {'m':[[0,1,2,0],[3,4,5,2],[1,3,1,5]],'e':[[0,0,0,0],[0,4,5,0],[0,3,1,0]]},
    {'m':[[1]],'e':[[1]]},{'m':[[0]],'e':[[0]]},
    {'m':[[1,0,3]],'e':[[0,0,0]]},
    {'m':[[1],[0],[3]],'e':[[0],[0],[0]]},
    {'m':[[1,1],[1,1]],'e':[[1,1],[1,1]]},
    {'m':[[1,2,3,4],[5,0,7,8],[9,10,11,12]],'e':[[1,0,3,4],[0,0,0,0],[9,0,11,12]]},
]
p=0
for c in cases:
    try:
        m=[row[:] for row in c['m']]
        sol.setZeroes(m)
        ok=m==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(m))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 66. Happy Number ── (5 → 9)
  { id: 66, title: "Happy Number",
    jsRunner: jsIIFE(`
const cases=[
  {n:19,e:true},{n:2,e:false},{n:1,e:true},{n:7,e:true},{n:4,e:false},
  {n:10,e:true},{n:13,e:true},{n:100,e:true},{n:20,e:false},
];
let p=0;
for(const c of cases){
  try{
    const r=isHappy(c.n);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':19,'e':True},{'n':2,'e':False},{'n':1,'e':True},{'n':7,'e':True},{'n':4,'e':False},
    {'n':10,'e':True},{'n':13,'e':True},{'n':100,'e':True},{'n':20,'e':False},
]
p=0
for c in cases:
    try:
        r=sol.isHappy(c['n'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 67. Reverse Bits ── (4 → 8)
  { id: 67, title: "Reverse Bits",
    jsRunner: jsIIFE(`
const cases=[
  {n:43261596,e:964176192},{n:4294967293,e:3221225471},
  {n:0,e:0},{n:1,e:2147483648},
  {n:2147483648,e:1},
  {n:3,e:3221225472},
  {n:255,e:4278190080},
  {n:2,e:1073741824},
];
let p=0;
for(const c of cases){
  try{
    const r=reverseBits(c.n)>>>0;
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':43261596,'e':964176192},{'n':4294967293,'e':3221225471},
    {'n':0,'e':0},{'n':1,'e':2147483648},
    {'n':2147483648,'e':1},
    {'n':3,'e':3221225472},
    {'n':255,'e':4278190080},
    {'n':2,'e':1073741824},
]
p=0
for c in cases:
    try:
        r=sol.reverseBits(c['n'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 68. Sum of Two Integers ── (6 → 8)
  { id: 68, title: "Sum of Two Integers",
    jsRunner: jsIIFE(`
const cases=[
  {a:1,b:2,e:3},{a:2,b:3,e:5},{a:0,b:0,e:0},
  {a:-1,b:1,e:0},{a:-5,b:3,e:-2},{a:100,b:200,e:300},
  {a:-10,b:-5,e:-15},
  {a:7,b:-7,e:0},
];
let p=0;
for(const c of cases){
  try{
    const r=getSum(c.a,c.b);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| a='+c.a+' b='+c.b+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'a':1,'b':2,'e':3},{'a':2,'b':3,'e':5},{'a':0,'b':0,'e':0},
    {'a':-1,'b':1,'e':0},{'a':-5,'b':3,'e':-2},{'a':100,'b':200,'e':300},
    {'a':-10,'b':-5,'e':-15},
    {'a':7,'b':-7,'e':0},
]
p=0
for c in cases:
    try:
        r=sol.getSum(c['a'],c['b'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| a='+str(c['a'])+' b='+str(c['b'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 69. Generate Parentheses ── (4 → 8)
  { id: 69, title: "Generate Parentheses",
    jsRunner: jsIIFE(`
const cases=[
  {n:1,e:1},{n:2,e:2},{n:3,e:5},{n:4,e:14},
  {n:5,e:42},{n:6,e:132},{n:7,e:429},{n:8,e:1430},
];
let p=0;
for(const c of cases){
  try{
    const r=generateParenthesis(c.n);
    const valid=r.every(s=>{let b=0;for(const ch of s){b+=ch==='('?1:-1;if(b<0)return false;}return b===0;});
    const ok=r.length===c.e&&valid;
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected '+c.e+' valid strings | Got '+r.length);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':1,'e':1},{'n':2,'e':2},{'n':3,'e':5},{'n':4,'e':14},
    {'n':5,'e':42},{'n':6,'e':132},{'n':7,'e':429},{'n':8,'e':1430},
]
p=0
for c in cases:
    try:
        r=sol.generateParenthesis(c['n'])
        def valid(s):
            b=0
            for ch in s:
                b+=1 if ch=='(' else -1
                if b<0:return False
            return b==0
        ok=len(r)==c['e'] and all(valid(s) for s in r)
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected '+str(c['e'])+' valid strings | Got '+str(len(r)))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 70. Daily Temperatures ── (4 → 8)
  { id: 70, title: "Daily Temperatures",
    jsRunner: jsIIFE(`
const cases=[
  {t:[73,74,75,71,69,72,76,73],e:[1,1,4,2,1,1,0,0]},
  {t:[30,40,50,60],e:[1,1,1,0]},{t:[30,60,90],e:[1,1,0]},
  {t:[89,62,70,58,47,47,46,76,100,70],e:[8,1,5,4,3,2,1,1,0,0]},
  {t:[100],e:[0]},
  {t:[60,60,60],e:[0,0,0]},
  {t:[50,40,30,20],e:[0,0,0,0]},
  {t:[20,30,40,50],e:[1,1,1,0]},
];
let p=0;
for(const c of cases){
  try{
    const r=dailyTemperatures([...c.t]);
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'t':[73,74,75,71,69,72,76,73],'e':[1,1,4,2,1,1,0,0]},
    {'t':[30,40,50,60],'e':[1,1,1,0]},{'t':[30,60,90],'e':[1,1,0]},
    {'t':[89,62,70,58,47,47,46,76,100,70],'e':[8,1,5,4,3,2,1,1,0,0]},
    {'t':[100],'e':[0]},
    {'t':[60,60,60],'e':[0,0,0]},
    {'t':[50,40,30,20],'e':[0,0,0,0]},
    {'t':[20,30,40,50],'e':[1,1,1,0]},
]
p=0
for c in cases:
    try:
        r=sol.dailyTemperatures(c['t'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 71. Evaluate Reverse Polish Notation ── (4 → 8)
  { id: 71, title: "Evaluate Reverse Polish Notation",
    jsRunner: jsIIFE(`
const cases=[
  {t:['2','1','+','3','*'],e:9},
  {t:['4','13','5','/','+'],e:6},
  {t:['10','6','9','3','+','-11','*','/','*','17','+','5','+'],e:22},
  {t:['3','-4','+'],e:-1},
  {t:['5','1','2','+','4','*','+','3','-'],e:14},
  {t:['2','3','+'],e:5},
  {t:['10','3','/'],e:3},
  {t:['-2','-3','*'],e:6},
];
let p=0;
for(const c of cases){
  try{
    const r=evalRPN([...c.t]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'t':['2','1','+','3','*'],'e':9},
    {'t':['4','13','5','/','+'],'e':6},
    {'t':['10','6','9','3','+','-11','*','/','*','17','+','5','+'],'e':22},
    {'t':['3','-4','+'],'e':-1},
    {'t':['5','1','2','+','4','*','+','3','-'],'e':14},
    {'t':['2','3','+'],'e':5},
    {'t':['10','3','/'],'e':3},
    {'t':['-2','-3','*'],'e':6},
]
p=0
for c in cases:
    try:
        r=sol.evalRPN(c['t'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 72. Permutations ── (4 → 8)
  { id: 72, title: "Permutations",
    jsRunner: jsIIFE(`
const cases=[
  {n:[1,2,3],size:6},{n:[0,1],size:2},{n:[1],size:1},{n:[1,2,3,4],size:24},
  {n:[1,2,3,4,5],size:120},
  {n:[-1,0,1],size:6},
  {n:[2,3,4],size:6},
  {n:[10],size:1},
];
let p=0;
for(const c of cases){
  try{
    const r=permute([...c.n]);
    const sorted=JSON.stringify([...c.n].sort((a,b)=>a-b));
    const ok=r.length===c.size&&r.every(a=>JSON.stringify([...a].sort((x,y)=>x-y))===sorted);
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Expected '+c.size+' perms | Got '+r.length);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[1,2,3],'size':6},{'n':[0,1],'size':2},{'n':[1],'size':1},{'n':[1,2,3,4],'size':24},
    {'n':[1,2,3,4,5],'size':120},
    {'n':[-1,0,1],'size':6},
    {'n':[2,3,4],'size':6},
    {'n':[10],'size':1},
]
p=0
for c in cases:
    try:
        r=sol.permute(c['n'][:])
        s=sorted(c['n'])
        ok=len(r)==c['size'] and all(sorted(a)==s for a in r)
        print('✓ PASS' if ok else '✗ FAIL','| nums='+str(c['n'])+'| Expected '+str(c['size'])+' perms | Got '+str(len(r)))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 73. Combination Sum II ── (3 → 9)
  { id: 73, title: "Combination Sum II",
    jsRunner: jsIIFE(`
const norm=arr=>(arr||[]).map(a=>[...a].sort((x,y)=>x-y)).sort((a,b)=>a.join()>b.join()?1:-1).map(a=>a.join()).join('|');
const cases=[
  {c:[10,1,2,7,6,1,5],t:8,e:[[1,1,6],[1,2,5],[1,7],[2,6]]},
  {c:[2,5,2,1,2],t:5,e:[[1,2,2],[5]]},
  {c:[2],t:1,e:[]},
  {c:[1,2,3,4],t:4,e:[[1,3],[4]]},
  {c:[2,4,6,8],t:8,e:[[2,6],[8]]},
  {c:[1,1,2],t:2,e:[[1,1],[2]]},
  {c:[4,4,4],t:8,e:[[4,4]]},
  {c:[1,1,1,1,2],t:3,e:[[1,1,1],[1,2]]},
  {c:[3],t:5,e:[]},
];
let p=0;
for(const c of cases){
  try{
    const r=combinationSum2([...c.c],c.t);
    const ok=norm(r)===norm(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| target='+c.t+'| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
def norm(arr):
    return '|'.join(','.join(map(str,sorted(a))) for a in sorted([sorted(a) for a in (arr or [])]))
cases=[
    {'c':[10,1,2,7,6,1,5],'t':8,'e':[[1,1,6],[1,2,5],[1,7],[2,6]]},
    {'c':[2,5,2,1,2],'t':5,'e':[[1,2,2],[5]]},
    {'c':[2],'t':1,'e':[]},
    {'c':[1,2,3,4],'t':4,'e':[[1,3],[4]]},
    {'c':[2,4,6,8],'t':8,'e':[[2,6],[8]]},
    {'c':[1,1,2],'t':2,'e':[[1,1],[2]]},
    {'c':[4,4,4],'t':8,'e':[[4,4]]},
    {'c':[1,1,1,1,2],'t':3,'e':[[1,1,1],[1,2]]},
    {'c':[3],'t':5,'e':[]},
]
p=0
for c in cases:
    try:
        r=sol.combinationSum2(c['c'][:],c['t'])
        ok=norm(r)==norm(c['e'])
        print('✓ PASS' if ok else '✗ FAIL','| target='+str(c['t'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 74. Word Search ── (5 → 9)
  { id: 74, title: "Word Search",
    jsRunner: jsIIFE(`
const B=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const G=[["a","b","c"],["d","e","f"],["g","h","i"]];
const cases=[
  {b:B,w:'ABCCED',e:true},{b:B,w:'SEE',e:true},
  {b:B,w:'ABCB',e:false},{b:[["a"]],w:'a',e:true},
  {b:[["a","b"],["c","d"]],w:'abdc',e:true},
  {b:[["a","b"],["c","d"]],w:'abcd',e:false},
  {b:[["a","a","a","a"],["a","a","a","a"],["a","a","a","a"]],w:'aaaa',e:true},
  {b:G,w:'aei',e:false},
  {b:G,w:'abcfih',e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=exist(c.b.map(r=>[...r]),c.w);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| word='+c.w+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
B=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
G=[["a","b","c"],["d","e","f"],["g","h","i"]]
cases=[
    {'b':B,'w':'ABCCED','e':True},{'b':B,'w':'SEE','e':True},
    {'b':B,'w':'ABCB','e':False},{'b':[["a"]],'w':'a','e':True},
    {'b':[["a","b"],["c","d"]],'w':'abdc','e':True},
    {'b':[["a","b"],["c","d"]],'w':'abcd','e':False},
    {'b':[["a","a","a","a"],["a","a","a","a"],["a","a","a","a"]],'w':'aaaa','e':True},
    {'b':G,'w':'aei','e':False},
    {'b':G,'w':'abcfih','e':True},
]
p=0
for c in cases:
    try:
        r=sol.exist([row[:] for row in c['b']],c['w'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| word='+c['w']+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

  // ── 75. Binary Tree Maximum Path Sum ── (5 → 9)
  { id: 75, title: "Binary Tree Maximum Path Sum",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[1,2,3],e:6},{t:[-10,9,20,null,null,15,7],e:42},
  {t:[-3],e:-3},{t:[1,-2,3],e:4},{t:[5,4,8,11,null,13,4,7,2,null,null,null,1],e:48},
  {t:[2,null,3],e:5},
  {t:[-1,-2,-3],e:-1},
  {t:[1,2,null,3],e:6},
  {t:[0],e:0},
];
let p=0;
for(const c of cases){
  try{
    const r=maxPathSum(buildTree([...c.t]));
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
    {'t':[1,2,3],'e':6},{'t':[-10,9,20,None,None,15,7],'e':42},
    {'t':[-3],'e':-3},{'t':[1,-2,3],'e':4},{'t':[5,4,8,11,None,13,4,7,2,None,None,None,1],'e':48},
    {'t':[2,None,3],'e':5},
    {'t':[-1,-2,-3],'e':-1},
    {'t':[1,2,None,3],'e':6},
    {'t':[0],'e':0},
]
p=0
for c in cases:
    try:
        r=sol.maxPathSum(build_tree(c['t']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok:p+=1
    except Exception as e:print('✗ ERROR |',str(e))
print('\\n'+str(p)+'/'+str(len(cases))+' test cases passed.')
`,
  },

];

async function main() {
  console.log(`Seeding chunk 3: ${updates.length} problems (51–75)…\n`);
  for (const u of updates) {
    await prisma.intelProblem.update({
      where: { id: u.id },
      data: { jsRunner: u.jsRunner, pyRunner: u.pyRunner },
    });
    console.log(`  ✓ #${u.id} ${u.title}`);
  }
  console.log("\nDone.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

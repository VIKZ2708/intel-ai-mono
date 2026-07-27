/**
 * Chunk 2: Expand test cases for problems 26–50.
 * Run with: npx tsx prisma/seed-more-cases-chunk2.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function jsIIFE(body: string) {
  return `\n;(function(){\ntry{\n${body}\n}catch(e){console.log('Runtime Error:',e.message)}\n})();`;
}

const JS_TREE = `
function TreeNode(val,left,right){this.val=(val===undefined?0:val);this.left=(left===undefined?null:left);this.right=(right===undefined?null:right);}
function buildTree(arr){if(!arr||arr.length===0)return null;const root=new TreeNode(arr[0]);const q=[root];let i=1;while(i<arr.length){const node=q.shift();if(arr[i]!=null){node.left=new TreeNode(arr[i]);q.push(node.left);}i++;if(i<arr.length&&arr[i]!=null){node.right=new TreeNode(arr[i]);q.push(node.right);}i++;}return root;}
function findNode(root,val){if(!root)return null;if(root.val===val)return root;return findNode(root.left,val)||findNode(root.right,val);}
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
def find_node(root,val):
    if not root:return None
    if root.val==val:return root
    return find_node(root.left,val) or find_node(root.right,val)
`;
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

const updates = [

  // ── 26. Longest Increasing Subsequence ── (6 → 10 cases)
  { id: 26, title: "Longest Increasing Subsequence",
    jsRunner: jsIIFE(`
const cases=[
  {n:[10,9,2,5,3,7,101,18],e:4},
  {n:[0,1,0,3,2,3],e:4},
  {n:[7,7,7,7,7],e:1},
  {n:[1],e:1},
  {n:[1,2,3,4,5],e:5},
  {n:[5,4,3,2,1],e:1},
  {n:[2,2,2,2],e:1},
  {n:[3,10,2,1,20],e:3},
  {n:[4,3,2,1,2,3,4],e:4},
  {n:[0,8,4,12,2,10,6,14,1,9],e:4},
];
let p=0;
for(const c of cases){
  try{
    const r=lengthOfLIS([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[10,9,2,5,3,7,101,18],'e':4},
    {'n':[0,1,0,3,2,3],'e':4},
    {'n':[7,7,7,7,7],'e':1},
    {'n':[1],'e':1},
    {'n':[1,2,3,4,5],'e':5},
    {'n':[5,4,3,2,1],'e':1},
    {'n':[2,2,2,2],'e':1},
    {'n':[3,10,2,1,20],'e':3},
    {'n':[4,3,2,1,2,3,4],'e':4},
    {'n':[0,8,4,12,2,10,6,14,1,9],'e':4},
]
p=0
for c in cases:
    try:
        r=sol.lengthOfLIS(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 27. Find Minimum in Rotated Sorted Array ── (6 → 10 cases)
  { id: 27, title: "Find Minimum in Rotated Sorted Array",
    jsRunner: jsIIFE(`
const cases=[
  {n:[3,4,5,1,2],e:1},
  {n:[4,5,6,7,0,1,2],e:0},
  {n:[11,13,15,17],e:11},
  {n:[1],e:1},
  {n:[2,1],e:1},
  {n:[5,1,2,3,4],e:1},
  {n:[3,1],e:1},
  {n:[4,5,6,7,8,1,2,3],e:1},
  {n:[6,7,1,2,3,4,5],e:1},
  {n:[10,20,30,40,5],e:5},
];
let p=0;
for(const c of cases){
  try{
    const r=findMin([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[3,4,5,1,2],'e':1},
    {'n':[4,5,6,7,0,1,2],'e':0},
    {'n':[11,13,15,17],'e':11},
    {'n':[1],'e':1},
    {'n':[2,1],'e':1},
    {'n':[5,1,2,3,4],'e':1},
    {'n':[3,1],'e':1},
    {'n':[4,5,6,7,8,1,2,3],'e':1},
    {'n':[6,7,1,2,3,4,5],'e':1},
    {'n':[10,20,30,40,5],'e':5},
]
p=0
for c in cases:
    try:
        r=sol.findMin(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 28. Minimum Window Substring ── (5 → 10 cases)
  { id: 28, title: "Minimum Window Substring",
    jsRunner: jsIIFE(`
const cases=[
  {s:'ADOBECODEBANC',t:'ABC',e:'BANC'},
  {s:'a',t:'a',e:'a'},
  {s:'a',t:'aa',e:''},
  {s:'aa',t:'aa',e:'aa'},
  {s:'ab',t:'b',e:'b'},
  {s:'abc',t:'abc',e:'abc'},
  {s:'ab',t:'a',e:'a'},
  {s:'bdab',t:'ab',e:'ab'},
  {s:'xyz',t:'xyz',e:'xyz'},
  {s:'aabc',t:'abc',e:'abc'},
];
let p=0;
for(const c of cases){
  try{
    const r=minWindow(c.s,c.t);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+JSON.stringify(c.s)+'| t='+JSON.stringify(c.t)+'| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':'ADOBECODEBANC','t':'ABC','e':'BANC'},
    {'s':'a','t':'a','e':'a'},
    {'s':'a','t':'aa','e':''},
    {'s':'aa','t':'aa','e':'aa'},
    {'s':'ab','t':'b','e':'b'},
    {'s':'abc','t':'abc','e':'abc'},
    {'s':'ab','t':'a','e':'a'},
    {'s':'bdab','t':'ab','e':'ab'},
    {'s':'xyz','t':'xyz','e':'xyz'},
    {'s':'aabc','t':'abc','e':'abc'},
]
p=0
for c in cases:
    try:
        r=sol.minWindow(c['s'],c['t'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+repr(c['s'])+'| t='+repr(c['t'])+'| Expected:'+repr(c['e'])+'| Got:'+repr(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 29. Course Schedule ── (5 → 10 cases)
  { id: 29, title: "Course Schedule",
    jsRunner: jsIIFE(`
const cases=[
  {n:2,p:[[1,0]],e:true},
  {n:2,p:[[1,0],[0,1]],e:false},
  {n:1,p:[],e:true},
  {n:3,p:[[1,0],[2,1]],e:true},
  {n:3,p:[[1,0],[2,1],[0,2]],e:false},
  {n:4,p:[[1,0],[2,0],[3,1],[3,2]],e:true},
  {n:2,p:[],e:true},
  {n:5,p:[[0,1],[0,2],[1,3],[1,4],[3,4]],e:true},
  {n:4,p:[[1,0],[2,1],[3,2],[0,3]],e:false},
  {n:6,p:[[1,0],[2,1],[3,2],[4,3],[5,4]],e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=canFinish(c.n,c.p.map(x=>[...x]));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':2,'p':[[1,0]],'e':True},
    {'n':2,'p':[[1,0],[0,1]],'e':False},
    {'n':1,'p':[],'e':True},
    {'n':3,'p':[[1,0],[2,1]],'e':True},
    {'n':3,'p':[[1,0],[2,1],[0,2]],'e':False},
    {'n':4,'p':[[1,0],[2,0],[3,1],[3,2]],'e':True},
    {'n':2,'p':[],'e':True},
    {'n':5,'p':[[0,1],[0,2],[1,3],[1,4],[3,4]],'e':True},
    {'n':4,'p':[[1,0],[2,1],[3,2],[0,3]],'e':False},
    {'n':6,'p':[[1,0],[2,1],[3,2],[4,3],[5,4]],'e':True},
]
p=0
for c in cases:
    try:
        r=sol.canFinish(c['n'],[x[:] for x in c['p']])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 30. N-Queens ── (4 → 8 cases, count + board-validity check)
  { id: 30, title: "N-Queens",
    jsRunner: jsIIFE(`
const expected={1:1,2:0,3:0,4:2,5:10,6:4,7:40,8:92};
function validBoard(board){
  const n=board.length;
  for(let r=0;r<n;r++){
    const c=board[r].indexOf('Q');
    if(c===-1)return false;
    for(let r2=r+1;r2<n;r2++){
      const c2=board[r2].indexOf('Q');
      if(c2===c||Math.abs(c2-c)===r2-r)return false;
    }
  }
  return true;
}
const cases=[1,2,3,4,5,6,7,8];
let p=0;
for(const n of cases){
  try{
    const r=solveNQueens(n);
    const exp=expected[n];
    const countOk=r.length===exp;
    const boardsOk=r.every(b=>b.length===n&&validBoard(b));
    const ok=countOk&&boardsOk;
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+n+'| Expected '+exp+' solutions | Got '+r.length+(boardsOk?'':' (invalid boards)'));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR | n='+n+' |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
expected={1:1,2:0,3:0,4:2,5:10,6:4,7:40,8:92}
def valid_board(board):
    n=len(board)
    for r in range(n):
        c=board[r].index('Q') if 'Q' in board[r] else -1
        if c==-1:return False
        for r2 in range(r+1,n):
            c2=board[r2].index('Q') if 'Q' in board[r2] else -1
            if c2==c or abs(c2-c)==r2-r:return False
    return True
cases=[1,2,3,4,5,6,7,8]
p=0
for n in cases:
    try:
        r=sol.solveNQueens(n)
        exp=expected[n]
        count_ok=len(r)==exp
        boards_ok=all(len(b)==n and valid_board(b) for b in r)
        ok=count_ok and boards_ok
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(n)+'| Expected '+str(exp)+' solutions | Got '+str(len(r)))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR | n='+str(n)+' |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 31. Valid Palindrome ── (5 → 10 cases)
  { id: 31, title: "Valid Palindrome",
    jsRunner: jsIIFE(`
const cases=[
  {s:"A man, a plan, a canal: Panama",e:true},
  {s:"race a car",e:false},
  {s:" ",e:true},
  {s:"0P",e:false},
  {s:"Was it a car or a cat I saw?",e:true},
  {s:"No lemon, no melon",e:true},
  {s:"ab",e:false},
  {s:"a",e:true},
  {s:".,",e:true},
  {s:"Madam I'm Adam",e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=isPalindrome(c.s);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+JSON.stringify(c.s)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':"A man, a plan, a canal: Panama",'e':True},
    {'s':"race a car",'e':False},
    {'s':" ",'e':True},
    {'s':"0P",'e':False},
    {'s':"Was it a car or a cat I saw?",'e':True},
    {'s':"No lemon, no melon",'e':True},
    {'s':"ab",'e':False},
    {'s':"a",'e':True},
    {'s':".,",'e':True},
    {'s':"Madam I'm Adam",'e':True},
]
p=0
for c in cases:
    try:
        r=sol.isPalindrome(c['s'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+repr(c['s'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 32. Linked List Cycle ── (4 → 8 cases)
  { id: 32, title: "Linked List Cycle",
    jsRunner: jsIIFE(`
${JS_LIST}
function makeCycle(arr,pos){
  if(!arr.length)return null;
  const head=toList(arr);
  if(pos<0)return head;
  let nodes=[],cur=head;
  while(cur){nodes.push(cur);cur=cur.next;}
  nodes[nodes.length-1].next=nodes[pos];
  return head;
}
const cases=[
  {a:[3,2,0,-4],pos:1,e:true},
  {a:[1,2],pos:0,e:true},
  {a:[1],pos:-1,e:false},
  {a:[],pos:-1,e:false},
  {a:[1,2,3,4,5],pos:2,e:true},
  {a:[1,2,3],pos:-1,e:false},
  {a:[1,2,3,4],pos:0,e:true},
  {a:[1],pos:0,e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=hasCycle(makeCycle([...c.a],c.pos));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| arr=['+c.a+'] pos='+c.pos+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_LIST}
def make_cycle(arr,pos):
    if not arr:return None
    head=to_list(arr)
    if pos<0:return head
    nodes=[];cur=head
    while cur:nodes.append(cur);cur=cur.next
    nodes[-1].next=nodes[pos]
    return head
sol=Solution()
cases=[
    {'a':[3,2,0,-4],'pos':1,'e':True},
    {'a':[1,2],'pos':0,'e':True},
    {'a':[1],'pos':-1,'e':False},
    {'a':[],'pos':-1,'e':False},
    {'a':[1,2,3,4,5],'pos':2,'e':True},
    {'a':[1,2,3],'pos':-1,'e':False},
    {'a':[1,2,3,4],'pos':0,'e':True},
    {'a':[1],'pos':0,'e':True},
]
p=0
for c in cases:
    try:
        r=sol.hasCycle(make_cycle(c['a'][:],c['pos']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| pos='+str(c['pos'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 33. Merge Two Sorted Lists ── (5 → 10 cases)
  { id: 33, title: "Merge Two Sorted Lists",
    jsRunner: jsIIFE(`
${JS_LIST}
const cases=[
  {a:[1,2,4],b:[1,3,4],e:[1,1,2,3,4,4]},
  {a:[],b:[],e:[]},
  {a:[],b:[0],e:[0]},
  {a:[1,3,5],b:[2,4,6],e:[1,2,3,4,5,6]},
  {a:[5],b:[1,2,3],e:[1,2,3,5]},
  {a:[1],b:[2],e:[1,2]},
  {a:[2],b:[1],e:[1,2]},
  {a:[-1,0,3],b:[-2,1,4],e:[-2,-1,0,1,3,4]},
  {a:[1,1,1],b:[1,1,1],e:[1,1,1,1,1,1]},
  {a:[1,2,3,4,5],b:[],e:[1,2,3,4,5]},
];
let p=0;
for(const c of cases){
  try{
    const r=toArr(mergeTwoLists(toList(c.a),toList(c.b)));
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| a=['+c.a+'] b=['+c.b+']| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_LIST}
sol=Solution()
cases=[
    {'a':[1,2,4],'b':[1,3,4],'e':[1,1,2,3,4,4]},
    {'a':[],'b':[],'e':[]},
    {'a':[],'b':[0],'e':[0]},
    {'a':[1,3,5],'b':[2,4,6],'e':[1,2,3,4,5,6]},
    {'a':[5],'b':[1,2,3],'e':[1,2,3,5]},
    {'a':[1],'b':[2],'e':[1,2]},
    {'a':[2],'b':[1],'e':[1,2]},
    {'a':[-1,0,3],'b':[-2,1,4],'e':[-2,-1,0,1,3,4]},
    {'a':[1,1,1],'b':[1,1,1],'e':[1,1,1,1,1,1]},
    {'a':[1,2,3,4,5],'b':[],'e':[1,2,3,4,5]},
]
p=0
for c in cases:
    try:
        r=to_arr(sol.mergeTwoLists(to_list(c['a']),to_list(c['b'])))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 34. Valid Anagram ── (6 → 10 cases)
  { id: 34, title: "Valid Anagram",
    jsRunner: jsIIFE(`
const cases=[
  {s:'anagram',t:'nagaram',e:true},
  {s:'rat',t:'car',e:false},
  {s:'a',t:'a',e:true},
  {s:'ab',t:'a',e:false},
  {s:'listen',t:'silent',e:true},
  {s:'hello',t:'world',e:false},
  {s:'aab',t:'baa',e:true},
  {s:'',t:'',e:true},
  {s:'abc',t:'cba',e:true},
  {s:'aacc',t:'ccab',e:false},
];
let p=0;
for(const c of cases){
  try{
    const r=isAnagram(c.s,c.t);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| s='+c.s+' t='+c.t+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'s':'anagram','t':'nagaram','e':True},
    {'s':'rat','t':'car','e':False},
    {'s':'a','t':'a','e':True},
    {'s':'ab','t':'a','e':False},
    {'s':'listen','t':'silent','e':True},
    {'s':'hello','t':'world','e':False},
    {'s':'aab','t':'baa','e':True},
    {'s':'','t':'','e':True},
    {'s':'abc','t':'cba','e':True},
    {'s':'aacc','t':'ccab','e':False},
]
p=0
for c in cases:
    try:
        r=sol.isAnagram(c['s'],c['t'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| s='+c['s']+' t='+c['t']+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 35. Single Number ── (5 → 10 cases)
  { id: 35, title: "Single Number",
    jsRunner: jsIIFE(`
const cases=[
  {n:[2,2,1],e:1},
  {n:[4,1,2,1,2],e:4},
  {n:[1],e:1},
  {n:[0,1,0],e:1},
  {n:[17],e:17},
  {n:[5,3,3],e:5},
  {n:[1,2,1,3,2],e:3},
  {n:[10,10,5,3,3],e:5},
  {n:[-1,1,-1],e:1},
  {n:[100],e:100},
];
let p=0;
for(const c of cases){
  try{
    const r=singleNumber([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[2,2,1],'e':1},
    {'n':[4,1,2,1,2],'e':4},
    {'n':[1],'e':1},
    {'n':[0,1,0],'e':1},
    {'n':[17],'e':17},
    {'n':[5,3,3],'e':5},
    {'n':[1,2,1,3,2],'e':3},
    {'n':[10,10,5,3,3],'e':5},
    {'n':[-1,1,-1],'e':1},
    {'n':[100],'e':100},
]
p=0
for c in cases:
    try:
        r=sol.singleNumber(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 36. Missing Number ── (5 → 10 cases)
  { id: 36, title: "Missing Number",
    jsRunner: jsIIFE(`
const cases=[
  {n:[3,0,1],e:2},
  {n:[0,1],e:2},
  {n:[9,6,4,2,3,5,7,0,1],e:8},
  {n:[0],e:1},
  {n:[1],e:0},
  {n:[2,0],e:1},
  {n:[5,0,1,2,3,4],e:6},
  {n:[1,2,3,4],e:0},
  {n:[0,1,2,4],e:3},
  {n:[0,2],e:1},
];
let p=0;
for(const c of cases){
  try{
    const r=missingNumber([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| nums=['+c.n+'] | Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[3,0,1],'e':2},
    {'n':[0,1],'e':2},
    {'n':[9,6,4,2,3,5,7,0,1],'e':8},
    {'n':[0],'e':1},
    {'n':[1],'e':0},
    {'n':[2,0],'e':1},
    {'n':[5,0,1,2,3,4],'e':6},
    {'n':[1,2,3,4],'e':0},
    {'n':[0,1,2,4],'e':3},
    {'n':[0,2],'e':1},
]
p=0
for c in cases:
    try:
        r=sol.missingNumber(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 37. Number of 1 Bits ── (5 → 10 cases)
  { id: 37, title: "Number of 1 Bits",
    jsRunner: jsIIFE(`
const cases=[
  {n:11,e:3},
  {n:128,e:1},
  {n:2147483645,e:30},
  {n:1,e:1},
  {n:4294967293,e:31},
  {n:0,e:0},
  {n:255,e:8},
  {n:16,e:1},
  {n:7,e:3},
  {n:4294967295,e:32},
];
let p=0;
for(const c of cases){
  try{
    const r=hammingWeight(c.n);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':11,'e':3},
    {'n':128,'e':1},
    {'n':2147483645,'e':30},
    {'n':1,'e':1},
    {'n':4294967293,'e':31},
    {'n':0,'e':0},
    {'n':255,'e':8},
    {'n':16,'e':1},
    {'n':7,'e':3},
    {'n':4294967295,'e':32},
]
p=0
for c in cases:
    try:
        r=sol.hammingWeight(c['n'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 38. Counting Bits ── (4 → 8 cases)
  { id: 38, title: "Counting Bits",
    jsRunner: jsIIFE(`
const cases=[
  {n:2,e:[0,1,1]},
  {n:5,e:[0,1,1,2,1,2]},
  {n:0,e:[0]},
  {n:1,e:[0,1]},
  {n:3,e:[0,1,1,2]},
  {n:4,e:[0,1,1,2,1]},
  {n:7,e:[0,1,1,2,1,2,2,3]},
  {n:8,e:[0,1,1,2,1,2,2,3,1]},
];
let p=0;
for(const c of cases){
  try{
    const r=countBits(c.n);
    const ok=JSON.stringify(r)===JSON.stringify(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| n='+c.n+'| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':2,'e':[0,1,1]},
    {'n':5,'e':[0,1,1,2,1,2]},
    {'n':0,'e':[0]},
    {'n':1,'e':[0,1]},
    {'n':3,'e':[0,1,1,2]},
    {'n':4,'e':[0,1,1,2,1]},
    {'n':7,'e':[0,1,1,2,1,2,2,3]},
    {'n':8,'e':[0,1,1,2,1,2,2,3,1]},
]
p=0
for c in cases:
    try:
        r=sol.countBits(c['n'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| n='+str(c['n'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 39. Same Tree ── (5 → 10 cases)
  { id: 39, title: "Same Tree",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {p:[1,2,3],q:[1,2,3],e:true},
  {p:[1,2],q:[1,null,2],e:false},
  {p:[1,2,1],q:[1,1,2],e:false},
  {p:[],q:[],e:true},
  {p:[1],q:[1],e:true},
  {p:[1,2,3,4],q:[1,2,3,null,4],e:false},
  {p:[1,2,3,4,5],q:[1,2,3,4,5],e:true},
  {p:[1,2,3],q:[1,2,4],e:false},
  {p:[1,null,2],q:[1,null,2],e:true},
  {p:[1,null,2],q:[1,2],e:false},
];
let p=0;
for(const c of cases){
  try{
    const r=isSameTree(buildTree([...c.p]),buildTree([...c.q]));
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
    {'p':[1,2,3],'q':[1,2,3],'e':True},
    {'p':[1,2],'q':[1,None,2],'e':False},
    {'p':[1,2,1],'q':[1,1,2],'e':False},
    {'p':[],'q':[],'e':True},
    {'p':[1],'q':[1],'e':True},
    {'p':[1,2,3,4],'q':[1,2,3,None,4],'e':False},
    {'p':[1,2,3,4,5],'q':[1,2,3,4,5],'e':True},
    {'p':[1,2,3],'q':[1,2,4],'e':False},
    {'p':[1,None,2],'q':[1,None,2],'e':True},
    {'p':[1,None,2],'q':[1,2],'e':False},
]
p=0
for c in cases:
    try:
        r=sol.isSameTree(build_tree(c['p']),build_tree(c['q']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 40. Symmetric Tree ── (5 → 10 cases)
  { id: 40, title: "Symmetric Tree",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[1,2,2,3,4,4,3],e:true},
  {t:[1,2,2,null,3,null,3],e:false},
  {t:[1],e:true},
  {t:[1,2,2,3,null,null,3],e:true},
  {t:[1,2,2,null,3,3,null],e:true},
  {t:[2,3,3,4,5,5,4],e:true},
  {t:[1,2,2,2,null,2],e:false},
  {t:[1,2,2,3,4,3,4],e:false},
  {t:[],e:true},
  {t:[1,2,3],e:false},
];
let p=0;
for(const c of cases){
  try{
    const r=isSymmetric(buildTree([...c.t]));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| tree='+JSON.stringify(c.t)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_TREE}
sol=Solution()
cases=[
    {'t':[1,2,2,3,4,4,3],'e':True},
    {'t':[1,2,2,None,3,None,3],'e':False},
    {'t':[1],'e':True},
    {'t':[1,2,2,3,None,None,3],'e':True},
    {'t':[1,2,2,None,3,3,None],'e':True},
    {'t':[2,3,3,4,5,5,4],'e':True},
    {'t':[1,2,2,2,None,2],'e':False},
    {'t':[1,2,2,3,4,3,4],'e':False},
    {'t':[],'e':True},
    {'t':[1,2,3],'e':False},
]
p=0
for c in cases:
    try:
        r=sol.isSymmetric(build_tree(c['t']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 41. Validate Binary Search Tree ── (5 → 10 cases)
  { id: 41, title: "Validate Binary Search Tree",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[2,1,3],e:true},
  {t:[5,1,4,null,null,3,6],e:false},
  {t:[1],e:true},
  {t:[5,4,6,null,null,3,7],e:false},
  {t:[3,1,5,0,2,4,6],e:true},
  {t:[1,null,1],e:false},
  {t:[10,5,15,null,null,6,20],e:false},
  {t:[5,3,7,1,4,6,8],e:true},
  {t:[2,1,3,null,null,null,4],e:true},
  {t:[3,2,4,1],e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=isValidBST(buildTree([...c.t]));
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| tree='+JSON.stringify(c.t)+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_TREE}
sol=Solution()
cases=[
    {'t':[2,1,3],'e':True},
    {'t':[5,1,4,None,None,3,6],'e':False},
    {'t':[1],'e':True},
    {'t':[5,4,6,None,None,3,7],'e':False},
    {'t':[3,1,5,0,2,4,6],'e':True},
    {'t':[1,None,1],'e':False},
    {'t':[10,5,15,None,None,6,20],'e':False},
    {'t':[5,3,7,1,4,6,8],'e':True},
    {'t':[2,1,3,None,None,None,4],'e':True},
    {'t':[3,2,4,1],'e':True},
]
p=0
for c in cases:
    try:
        r=sol.isValidBST(build_tree(c['t']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 42. LCA of BST ── (3 → 8 cases)
  { id: 42, title: "Lowest Common Ancestor of a BST",
    jsRunner: jsIIFE(`
${JS_TREE}
const BST=[6,2,8,0,4,7,9,null,null,3,5];
const cases=[
  {t:BST,p:2,q:8,e:6},
  {t:BST,p:2,q:4,e:2},
  {t:BST,p:3,q:5,e:4},
  {t:BST,p:7,q:9,e:8},
  {t:[2,1,3],p:1,q:3,e:2},
  {t:[2,1,3],p:1,q:2,e:2},
  {t:[6,2,8,0,4,7,9,null,null,3,5],p:0,q:5,e:2},
  {t:[4,2,6,1,3,5,7],p:1,q:3,e:2},
];
let p=0;
for(const c of cases){
  try{
    const root=buildTree([...c.t]);
    const pNode=findNode(root,c.p),qNode=findNode(root,c.q);
    const r=lowestCommonAncestor(root,pNode,qNode);
    const ok=r&&r.val===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| p='+c.p+' q='+c.q+'| Expected LCA='+c.e+'| Got LCA='+(r?r.val:null));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_TREE}
sol=Solution()
BST=[6,2,8,0,4,7,9,None,None,3,5]
cases=[
    {'t':BST,'p':2,'q':8,'e':6},
    {'t':BST,'p':2,'q':4,'e':2},
    {'t':BST,'p':3,'q':5,'e':4},
    {'t':BST,'p':7,'q':9,'e':8},
    {'t':[2,1,3],'p':1,'q':3,'e':2},
    {'t':[2,1,3],'p':1,'q':2,'e':2},
    {'t':[6,2,8,0,4,7,9,None,None,3,5],'p':0,'q':5,'e':2},
    {'t':[4,2,6,1,3,5,7],'p':1,'q':3,'e':2},
]
p=0
for c in cases:
    try:
        root=build_tree(c['t'])
        pn=find_node(root,c['p']);qn=find_node(root,c['q'])
        r=sol.lowestCommonAncestor(root,pn,qn)
        ok=r is not None and r.val==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| p='+str(c['p'])+' q='+str(c['q'])+'| Expected LCA='+str(c['e'])+'| Got LCA='+(str(r.val) if r else 'None'))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 43. Kth Smallest Element in a BST ── (4 → 8 cases)
  { id: 43, title: "Kth Smallest Element in a BST",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[3,1,4,null,2],k:1,e:1},
  {t:[5,3,6,2,4,null,null,1],k:3,e:3},
  {t:[1],k:1,e:1},
  {t:[2,1,3],k:2,e:2},
  {t:[3,1,4,null,2],k:3,e:3},
  {t:[5,3,6,2,4,null,null,1],k:1,e:1},
  {t:[4,2,6,1,3,5,7],k:4,e:4},
  {t:[4,2,6,1,3,5,7],k:7,e:7},
];
let p=0;
for(const c of cases){
  try{
    const r=kthSmallest(buildTree([...c.t]),c.k);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| k='+c.k+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
${PY_TREE}
sol=Solution()
cases=[
    {'t':[3,1,4,None,2],'k':1,'e':1},
    {'t':[5,3,6,2,4,None,None,1],'k':3,'e':3},
    {'t':[1],'k':1,'e':1},
    {'t':[2,1,3],'k':2,'e':2},
    {'t':[3,1,4,None,2],'k':3,'e':3},
    {'t':[5,3,6,2,4,None,None,1],'k':1,'e':1},
    {'t':[4,2,6,1,3,5,7],'k':4,'e':4},
    {'t':[4,2,6,1,3,5,7],'k':7,'e':7},
]
p=0
for c in cases:
    try:
        r=sol.kthSmallest(build_tree(c['t']),c['k'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| k='+str(c['k'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 44. Binary Tree Right Side View ── (4 → 8 cases)
  { id: 44, title: "Binary Tree Right Side View",
    jsRunner: jsIIFE(`
${JS_TREE}
const cases=[
  {t:[1,2,3,null,5,null,4],e:[1,3,4]},
  {t:[1,null,3],e:[1,3]},
  {t:[],e:[]},
  {t:[1],e:[1]},
  {t:[1,2,3,4,5,6,7],e:[1,3,7]},
  {t:[1,2,null,3],e:[1,2,3]},
  {t:[1,2,3,4,null,null,5],e:[1,3,5]},
  {t:[3,9,20,null,null,15,7],e:[3,20,7]},
];
let p=0;
for(const c of cases){
  try{
    const r=rightSideView(buildTree([...c.t]));
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
    {'t':[1,2,3,None,5,None,4],'e':[1,3,4]},
    {'t':[1,None,3],'e':[1,3]},
    {'t':[],'e':[]},
    {'t':[1],'e':[1]},
    {'t':[1,2,3,4,5,6,7],'e':[1,3,7]},
    {'t':[1,2,None,3],'e':[1,2,3]},
    {'t':[1,2,3,4,None,None,5],'e':[1,3,5]},
    {'t':[3,9,20,None,None,15,7],'e':[3,20,7]},
]
p=0
for c in cases:
    try:
        r=sol.rightSideView(build_tree(c['t']))
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 45. Group Anagrams ── (3 → 8 cases)
  { id: 45, title: "Group Anagrams",
    jsRunner: jsIIFE(`
const norm=arr=>arr.map(g=>[...g].sort().join()).sort().join('|');
const cases=[
  {s:['eat','tea','tan','ate','nat','bat'],e:[['bat'],['nat','tan'],['ate','eat','tea']]},
  {s:[''],e:[['']]},
  {s:['a'],e:[['a']]},
  {s:['abc','bca','cab'],e:[['abc','bca','cab']]},
  {s:['a','b','c'],e:[['a'],['b'],['c']]},
  {s:['ab','ba','cd','dc'],e:[['ab','ba'],['cd','dc']]},
  {s:['listen','silent','hello','world','enlist'],e:[['enlist','listen','silent'],['hello'],['world']]},
  {s:[''],e:[['']]},
];
let p=0;
for(const c of cases){
  try{
    const r=groupAnagrams([...c.s]);
    const ok=norm(r)===norm(c.e);
    console.log(ok?'✓ PASS':'✗ FAIL','| strs='+JSON.stringify(c.s)+'| Expected '+c.e.length+' groups | Got '+r.length);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
def norm(arr): return '|'.join(sorted([''.join(sorted(g)) for g in arr]))
cases=[
    {'s':['eat','tea','tan','ate','nat','bat'],'e':[['bat'],['nat','tan'],['ate','eat','tea']]},
    {'s':[''],'e':[['']]},
    {'s':['a'],'e':[['a']]},
    {'s':['abc','bca','cab'],'e':[['abc','bca','cab']]},
    {'s':['a','b','c'],'e':[['a'],['b'],['c']]},
    {'s':['ab','ba','cd','dc'],'e':[['ab','ba'],['cd','dc']]},
    {'s':['listen','silent','hello','world','enlist'],'e':[['enlist','listen','silent'],['hello'],['world']]},
]
p=0
for c in cases:
    try:
        r=sol.groupAnagrams(c['s'][:])
        ok=norm(r)==norm(c['e'])
        print('✓ PASS' if ok else '✗ FAIL','| Expected '+str(len(c['e']))+' groups | Got '+str(len(r)))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 46. Longest Consecutive Sequence ── (5 → 10 cases)
  { id: 46, title: "Longest Consecutive Sequence",
    jsRunner: jsIIFE(`
const cases=[
  {n:[100,4,200,1,3,2],e:4},
  {n:[0,3,7,2,5,8,4,6,0,1],e:9},
  {n:[],e:0},
  {n:[1],e:1},
  {n:[1,2,0,1],e:3},
  {n:[1,2,3,4,5],e:5},
  {n:[5,4,3,2,1],e:5},
  {n:[0],e:1},
  {n:[-1,0,1,2],e:4},
  {n:[10,5,6,7,8,9,1,2,3,4],e:10},
];
let p=0;
for(const c of cases){
  try{
    const r=longestConsecutive([...c.n]);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[100,4,200,1,3,2],'e':4},
    {'n':[0,3,7,2,5,8,4,6,0,1],'e':9},
    {'n':[],'e':0},
    {'n':[1],'e':1},
    {'n':[1,2,0,1],'e':3},
    {'n':[1,2,3,4,5],'e':5},
    {'n':[5,4,3,2,1],'e':5},
    {'n':[0],'e':1},
    {'n':[-1,0,1,2],'e':4},
    {'n':[10,5,6,7,8,9,1,2,3,4],'e':10},
]
p=0
for c in cases:
    try:
        r=sol.longestConsecutive(c['n'][:])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 47. Search in Rotated Sorted Array ── (6 → 10 cases)
  { id: 47, title: "Search in Rotated Sorted Array",
    jsRunner: jsIIFE(`
const cases=[
  {n:[4,5,6,7,0,1,2],t:0,e:4},
  {n:[4,5,6,7,0,1,2],t:3,e:-1},
  {n:[1],t:0,e:-1},
  {n:[1],t:1,e:0},
  {n:[3,1],t:1,e:1},
  {n:[5,1,3],t:3,e:2},
  {n:[6,7,1,2,3,4,5],t:7,e:1},
  {n:[6,7,1,2,3,4,5],t:5,e:6},
  {n:[1,3,5],t:5,e:2},
  {n:[2,3,4,5,6,7,0,1],t:0,e:6},
];
let p=0;
for(const c of cases){
  try{
    const r=search([...c.n],c.t);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| target='+c.t+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[4,5,6,7,0,1,2],'t':0,'e':4},
    {'n':[4,5,6,7,0,1,2],'t':3,'e':-1},
    {'n':[1],'t':0,'e':-1},
    {'n':[1],'t':1,'e':0},
    {'n':[3,1],'t':1,'e':1},
    {'n':[5,1,3],'t':3,'e':2},
    {'n':[6,7,1,2,3,4,5],'t':7,'e':1},
    {'n':[6,7,1,2,3,4,5],'t':5,'e':6},
    {'n':[1,3,5],'t':5,'e':2},
    {'n':[2,3,4,5,6,7,0,1],'t':0,'e':6},
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

  // ── 48. Search a 2D Matrix ── (5 → 10 cases)
  { id: 48, title: "Search a 2D Matrix",
    jsRunner: jsIIFE(`
const cases=[
  {m:[[1,3,5,7],[10,11,16,20],[23,30,34,60]],t:3,e:true},
  {m:[[1,3,5,7],[10,11,16,20],[23,30,34,60]],t:13,e:false},
  {m:[[1]],t:0,e:false},
  {m:[[1]],t:1,e:true},
  {m:[[1,3],[2,6]],t:2,e:false},
  {m:[[1,3,5,7],[10,11,16,20],[23,30,34,60]],t:60,e:true},
  {m:[[1,3,5,7],[10,11,16,20],[23,30,34,60]],t:1,e:true},
  {m:[[1,3,5,7],[10,11,16,20],[23,30,34,60]],t:23,e:true},
  {m:[[1,3,5]],t:3,e:true},
  {m:[[1],[3],[5]],t:3,e:true},
];
let p=0;
for(const c of cases){
  try{
    const r=searchMatrix(c.m.map(row=>[...row]),c.t);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| target='+c.t+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'m':[[1,3,5,7],[10,11,16,20],[23,30,34,60]],'t':3,'e':True},
    {'m':[[1,3,5,7],[10,11,16,20],[23,30,34,60]],'t':13,'e':False},
    {'m':[[1]],'t':0,'e':False},
    {'m':[[1]],'t':1,'e':True},
    {'m':[[1,3],[2,6]],'t':2,'e':False},
    {'m':[[1,3,5,7],[10,11,16,20],[23,30,34,60]],'t':60,'e':True},
    {'m':[[1,3,5,7],[10,11,16,20],[23,30,34,60]],'t':1,'e':True},
    {'m':[[1,3,5,7],[10,11,16,20],[23,30,34,60]],'t':23,'e':True},
    {'m':[[1,3,5]],'t':3,'e':True},
    {'m':[[1],[3],[5]],'t':3,'e':True},
]
p=0
for c in cases:
    try:
        r=sol.searchMatrix([row[:] for row in c['m']],c['t'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| target='+str(c['t'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 49. Top K Frequent Elements ── (4 → 8 cases)
  { id: 49, title: "Top K Frequent Elements",
    jsRunner: jsIIFE(`
const cases=[
  {n:[1,1,1,2,2,3],k:2,e:[1,2]},
  {n:[1],k:1,e:[1]},
  {n:[1,2],k:2,e:[1,2]},
  {n:[4,1,1,1,2,2,3],k:2,e:[1,2]},
  {n:[5,5,5,4,4,3],k:1,e:[5]},
  {n:[1,2,3,4,5,6,7,8,9,10],k:3,e:[1,2,3]},
  {n:[3,3,2,2,1],k:2,e:[2,3]},
  {n:[1,1,2,2,3,3],k:3,e:[1,2,3]},
];
let p=0;
for(const c of cases){
  try{
    const r=topKFrequent([...c.n],c.k);
    const ok=Array.isArray(r)&&r.length===c.k&&[...r].sort((a,b)=>a-b).join()===c.e.slice().sort((a,b)=>a-b).join();
    console.log(ok?'✓ PASS':'✗ FAIL','| k='+c.k+'| Expected:'+JSON.stringify(c.e)+'| Got:'+JSON.stringify(r));
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[1,1,1,2,2,3],'k':2,'e':[1,2]},
    {'n':[1],'k':1,'e':[1]},
    {'n':[1,2],'k':2,'e':[1,2]},
    {'n':[4,1,1,1,2,2,3],'k':2,'e':[1,2]},
    {'n':[5,5,5,4,4,3],'k':1,'e':[5]},
    {'n':[3,3,2,2,1],'k':2,'e':[2,3]},
    {'n':[1,1,2,2,3,3],'k':3,'e':[1,2,3]},
]
p=0
for c in cases:
    try:
        r=sol.topKFrequent(c['n'][:],c['k'])
        ok=sorted(r)==sorted(c['e'])
        print('✓ PASS' if ok else '✗ FAIL','| k='+str(c['k'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },

  // ── 50. Kth Largest Element in an Array ── (5 → 10 cases)
  { id: 50, title: "Kth Largest Element in an Array",
    jsRunner: jsIIFE(`
const cases=[
  {n:[3,2,1,5,6,4],k:2,e:5},
  {n:[3,2,3,1,2,4,5,5,6],k:4,e:4},
  {n:[1],k:1,e:1},
  {n:[2,1],k:2,e:1},
  {n:[7,6,5,4,3,2,1],k:5,e:3},
  {n:[1,2,3,4,5],k:1,e:5},
  {n:[5,4,3,2,1],k:3,e:3},
  {n:[3,2,1,5,6,4],k:1,e:6},
  {n:[99,98,97],k:3,e:97},
  {n:[1,1,1,1,1],k:1,e:1},
];
let p=0;
for(const c of cases){
  try{
    const r=findKthLargest([...c.n],c.k);
    const ok=r===c.e;
    console.log(ok?'✓ PASS':'✗ FAIL','| k='+c.k+'| Expected:'+c.e+'| Got:'+r);
    if(ok)p++;
  }catch(e){console.log('✗ ERROR |',e.message);}
}
console.log('\\n'+p+'/'+cases.length+' test cases passed.');`),
    pyRunner: `
sol=Solution()
cases=[
    {'n':[3,2,1,5,6,4],'k':2,'e':5},
    {'n':[3,2,3,1,2,4,5,5,6],'k':4,'e':4},
    {'n':[1],'k':1,'e':1},
    {'n':[2,1],'k':2,'e':1},
    {'n':[7,6,5,4,3,2,1],'k':5,'e':3},
    {'n':[1,2,3,4,5],'k':1,'e':5},
    {'n':[5,4,3,2,1],'k':3,'e':3},
    {'n':[3,2,1,5,6,4],'k':1,'e':6},
    {'n':[99,98,97],'k':3,'e':97},
    {'n':[1,1,1,1,1],'k':1,'e':1},
]
p=0
for c in cases:
    try:
        r=sol.findKthLargest(c['n'][:],c['k'])
        ok=r==c['e']
        print('✓ PASS' if ok else '✗ FAIL','| k='+str(c['k'])+'| Expected:'+str(c['e'])+'| Got:'+str(r))
        if ok: p+=1
    except Exception as ex:
        print('✗ ERROR |',str(ex))
print(f'\\n{p}/{len(cases)} test cases passed.')`,
  },
];

async function main() {
  console.log(`\nExpanding test cases for ${updates.length} problems (Chunk 2: 26–50)...\n`);
  for (const u of updates) {
    await prisma.intelProblem.update({
      where: { id: u.id },
      data: { jsRunner: u.jsRunner, pyRunner: u.pyRunner },
    });
    console.log(`  ✓ ${String(u.id).padStart(2, "0")}. ${u.title}`);
  }
  console.log("\n✅ Chunk 2 complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });

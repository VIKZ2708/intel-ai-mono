import type { FunctionMeta, TestCase, LangType, CompareMode } from "./runner-types";

// ── Static helper snippets ──────────────────────────────────────────────────

const JS_LIST = `function ListNode(val,next){this.val=(val===undefined?0:val);this.next=(next===undefined?null:next);}
function toList(arr){let d=new ListNode(0),c=d;for(const v of (arr||[])){c.next=new ListNode(v);c=c.next;}return d.next;}
function toArr(h){const r=[];while(h){r.push(h.val);h=h.next;}return r;}
`;
const JS_TREE = `function TreeNode(val,left,right){this.val=(val===undefined?0:val);this.left=(left===undefined?null:left);this.right=(right===undefined?null:right);}
function buildTree(arr){if(!arr||arr.length===0)return null;const root=new TreeNode(arr[0]);const q=[root];let i=1;while(i<arr.length){const node=q.shift();if(arr[i]!=null){node.left=new TreeNode(arr[i]);q.push(node.left);}i++;if(i<arr.length&&arr[i]!=null){node.right=new TreeNode(arr[i]);q.push(node.right);}i++;}return root;}
function treeToArr(root){if(!root)return[];const res=[];const q=[root];while(q.length){const n=q.shift();if(n){res.push(n.val);q.push(n.left);q.push(n.right);}else res.push(null);}while(res[res.length-1]==null)res.pop();return res;}
function findNode(root,val){if(!root)return null;if(root.val===val)return root;return findNode(root.left,val)||findNode(root.right,val);}
`;

const PY_LIST = `class ListNode:
    def __init__(self,val=0,next=None):
        self.val=val;self.next=next
def to_list(arr):
    d=ListNode();c=d
    for v in (arr or []):c.next=ListNode(v);c=c.next
    return d.next
def to_arr(h):
    r=[]
    while h:r.append(h.val);h=h.next
    return r
`;
const PY_TREE = `class TreeNode:
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
def find_node(root,val):
    if not root:return None
    if root.val==val:return root
    return find_node(root.left,val) or find_node(root.right,val)
`;

const JAVA_LIST_H = `
  static ListNode toList(int...a){ListNode d=new ListNode(0),c=d;for(int v:a){c.next=new ListNode(v);c=c.next;}return d.next;}
  static int[] toArr(ListNode h){java.util.List<Integer>r=new java.util.ArrayList<>();while(h!=null){r.add(h.val);h=h.next;}return r.stream().mapToInt(Integer::intValue).toArray();}`;
const JAVA_TREE_H = `
  static TreeNode build(Integer...a){if(a.length==0||a[0]==null)return null;TreeNode root=new TreeNode(a[0]);java.util.Queue<TreeNode>q=new java.util.LinkedList<>();q.add(root);int i=1;while(i<a.length&&!q.isEmpty()){TreeNode n=q.poll();if(i<a.length&&a[i]!=null){n.left=new TreeNode(a[i]);q.add(n.left);}i++;if(i<a.length&&a[i]!=null){n.right=new TreeNode(a[i]);q.add(n.right);}i++;}return root;}
  static java.util.List<Integer>lvl(TreeNode r){java.util.List<Integer>res=new java.util.ArrayList<>();if(r==null)return res;java.util.Queue<TreeNode>q=new java.util.LinkedList<>();q.add(r);while(!q.isEmpty()){TreeNode n=q.poll();if(n==null)res.add(null);else{res.add(n.val);q.add(n.left);q.add(n.right);}}while(!res.isEmpty()&&res.get(res.size()-1)==null)res.remove(res.size()-1);return res;}
  static TreeNode fn(TreeNode r,int v){if(r==null)return null;if(r.val==v)return r;TreeNode l=fn(r.left,v);return l!=null?l:fn(r.right,v);}`;

const CPP_VS  = `string vs(vector<int>v){string s="[";for(int i=0;i<(int)v.size();i++){if(i)s+=",";s+=to_string(v[i]);}return s+"]";}\n`;
const CPP_VS2 = `string vs2(vector<vector<int>>v){string s="[";for(int i=0;i<(int)v.size();i++){if(i)s+=",";s+=vs(v[i]);}return s+"]";}\n`;
const CPP_LIST_H = `ListNode*mk(vector<int>a){ListNode*d=new ListNode(0),*c=d;for(int x:a){c->next=new ListNode(x);c=c->next;}return d->next;}
vector<int>la(ListNode*h){vector<int>r;while(h){r.push_back(h->val);h=h->next;}return r;}
`;
const CPP_TREE_H = `TreeNode*bld(vector<int>a){if(a.empty()||a[0]==-10001)return nullptr;TreeNode*root=new TreeNode(a[0]);queue<TreeNode*>q;q.push(root);int i=1;while(i<(int)a.size()&&!q.empty()){TreeNode*n=q.front();q.pop();if(i<(int)a.size()&&a[i]!=-10001){n->left=new TreeNode(a[i]);q.push(n->left);}i++;if(i<(int)a.size()&&a[i]!=-10001){n->right=new TreeNode(a[i]);q.push(n->right);}i++;}return root;}
vector<int>lvl(TreeNode*r){vector<int>res;if(!r)return res;queue<TreeNode*>q;q.push(r);while(!q.empty()){TreeNode*n=q.front();q.pop();if(!n){res.push_back(-10001);}else{res.push_back(n->val);q.push(n->left);q.push(n->right);}}while(!res.empty()&&res.back()==-10001)res.pop_back();return res;}
TreeNode*fn(TreeNode*r,int v){if(!r)return nullptr;if(r->val==v)return r;auto l=fn(r->left,v);return l?l:fn(r->right,v);}
`;

// ── Type detection helpers ──────────────────────────────────────────────────

function uses(meta: FunctionMeta, t: LangType): boolean {
  return meta.params.some(p => p.type === t) || meta.returnType === t;
}
function usesList(meta: FunctionMeta) { return uses(meta, "ListNode"); }
function usesTree(meta: FunctionMeta) {
  return uses(meta, "TreeNode") || uses(meta, "TreeNodeRef") || uses(meta, "TreeNodeVal");
}

// ── Label builder ───────────────────────────────────────────────────────────

function makeLabel(params: FunctionMeta["params"], input: Record<string, unknown>): string {
  return params.map(p => {
    const v = input[p.name];
    if (p.type === "TreeNodeRef") return `${p.name}=${v}`;
    return `${p.name}=${JSON.stringify(v)}`;
  }).join(" ");
}

// ═══════════════════════════════════════════════════════════════════════════
// JAVASCRIPT generator
// ═══════════════════════════════════════════════════════════════════════════

function genJS(meta: FunctionMeta, cases: TestCase[]): string {
  const needsList   = usesList(meta);
  const needsTree   = usesTree(meta);
  const needsNorm   = meta.compare === "set";
  const needsRootVar = meta.params.some(p => p.type === "TreeNodeRef");
  const rootParam    = meta.params.find(p => p.type === "TreeNode");

  let prefix = "";
  if (needsList) prefix += JS_LIST;
  if (needsTree) prefix += JS_TREE;
  if (needsNorm)
    prefix += `const _norm=a=>(a||[]).map(r=>[...r].sort((x,y)=>x-y)).sort((a,b)=>a.join()>b.join()?1:a.join()<b.join()?-1:0).map(r=>r.join()).join('|');\n`;

  const total = cases.length;

  const caseBlocks = cases.map((c, i) => {
    const label = makeLabel(meta.params, c.input);

    const args = meta.params.map(p => {
      const v = `c.input[${JSON.stringify(p.name)}]`;
      switch (p.type) {
        case "int[]":
        case "int[]list":
        case "string[]": return `[...${v}]`;
        case "int[][]":
        case "int[][]list":
        case "char[][]": return `${v}.map(r=>[...r])`;
        case "ListNode": return `toList(${v})`;
        case "TreeNode":
          return needsRootVar && p === rootParam ? `_root` : `buildTree(${v})`;
        case "TreeNodeRef": return `findNode(_root,${v})`;
        default: return v;
      }
    });

    let callPre = "";
    if (needsRootVar && rootParam)
      callPre = `const _root=buildTree(c.input[${JSON.stringify(rootParam.name)}]);`;

    const callExpr = `${meta.name}(${args.join(",")})`;

    let comparison: string;
    let gotStr: string;
    const expStr = JSON.stringify(c.expected);

    switch (meta.compare) {
      case "sort":
        comparison = `Array.isArray(r)&&[...r].sort((a,b)=>a-b).join(',')===c.expected.slice().sort((a,b)=>a-b).join(',')`;
        gotStr = `JSON.stringify(r)`;
        break;
      case "set":
        comparison = `_norm(r)===_norm(c.expected)`;
        gotStr = `JSON.stringify(r)`;
        break;
      case "rowset":
        comparison = `(r||[]).map(a=>a.join(",")).sort().join("|")===(c.expected||[]).map(a=>a.join(",")).sort().join("|")`;
        gotStr = `JSON.stringify(r)`;
        break;
      case "size":
        comparison = `(r||[]).length===c.expected`;
        gotStr = `(r||[]).length`;
        break;
      case "inplace": {
        comparison = `JSON.stringify(_ip)===JSON.stringify(c.expected)`;
        gotStr = `JSON.stringify(_ip)`;
        break;
      }
      case "roundtrip":
        comparison = `JSON.stringify(treeToArr(${meta.name.replace("serialize","deserialize")}(r)))===JSON.stringify(treeToArr(buildTree(c.input.root)))`;
        gotStr = `"(roundtrip)"`;
        break;
      default: // exact
        if (meta.returnType === "ListNode")
          { comparison = `JSON.stringify(toArr(r))===JSON.stringify(c.expected)`; gotStr = `JSON.stringify(toArr(r))`; }
        else if (meta.returnType === "TreeNodeVal")
          { comparison = `r!=null&&r.val===c.expected`; gotStr = `r?String(r.val):"null"`; }
        else if (meta.returnType === "TreeNode")
          { comparison = `JSON.stringify(treeToArr(r))===JSON.stringify(c.expected)`; gotStr = `JSON.stringify(treeToArr(r))`; }
        else if (typeof c.expected === "object")
          { comparison = `JSON.stringify(r)===JSON.stringify(c.expected)`; gotStr = `JSON.stringify(r)`; }
        else
          { comparison = `r===c.expected`; gotStr = `JSON.stringify(r)`; }
    }

    if (meta.compare === "inplace") {
      const ip = meta.inplaceParam!;
      const ipParam = meta.params.find(p => p.name === ip)!;
      const ipType = ipParam.type;
      const ipCopy = ipType === "int[][]" ? `c.input[${JSON.stringify(ip)}].map(r=>[...r])` : `[...c.input[${JSON.stringify(ip)}]]`;
      return `try{const c=_cases[${i}];${callPre}const _ip=${ipCopy};${meta.name}(_ip${meta.params.filter(p=>p.name!==ip).map(p=>`,c.input[${JSON.stringify(p.name)}]`).join("")});const ok=${comparison};console.log(ok?'✓ PASS':'✗ FAIL','| ${label} | Expected:'+JSON.stringify(c.expected)+' | Got:'+${gotStr});if(ok)p++;}catch(e){console.log('✗ ERROR |',e.message);}`;
    }

    return `try{const c=_cases[${i}];${callPre}const r=${callExpr};const ok=${comparison};console.log(ok?'✓ PASS':'✗ FAIL','| ${label} | Expected:'+JSON.stringify(${expStr})+' | Got:'+${gotStr});if(ok)p++;}catch(e){console.log('✗ ERROR |',e.message);}`;
  }).join("\n");

  return `\n;(function(){\ntry{\n${prefix}const _cases=${JSON.stringify(cases)};
let p=0;
${caseBlocks}
console.log('\\n'+p+'/${total} test cases passed.');
}catch(e){console.log('Runtime Error:',e.message)}
})();`;
}

// ═══════════════════════════════════════════════════════════════════════════
// PYTHON generator
// ═══════════════════════════════════════════════════════════════════════════

function genPY(meta: FunctionMeta, cases: TestCase[]): string {
  const needsList   = usesList(meta);
  const needsTree   = usesTree(meta);
  const needsRootVar = meta.params.some(p => p.type === "TreeNodeRef");
  const rootParam    = meta.params.find(p => p.type === "TreeNode");

  let prefix = "sol=Solution()\n";
  if (needsList) prefix = PY_LIST + prefix;
  if (needsTree) prefix = PY_TREE + prefix;

  const total = cases.length;

  const caseBlocks = cases.map((c, i) => {
    const label = makeLabel(meta.params, c.input);

    const args = meta.params.map(p => {
      const v = `c['input'][${JSON.stringify(p.name)}]`;
      switch (p.type) {
        case "int[]":
        case "int[]list":
        case "string[]": return `list(${v})`;
        case "int[][]":
        case "int[][]list":
        case "char[][]": return `[list(r) for r in ${v}]`;
        case "ListNode": return `to_list(${v})`;
        case "TreeNode":
          return needsRootVar && p === rootParam ? `_root` : `build_tree(${v})`;
        case "TreeNodeRef": return `find_node(_root,${v})`;
        default: return v;
      }
    });

    let callPre = "";
    if (needsRootVar && rootParam)
      callPre = `    _root=build_tree(c['input'][${JSON.stringify(rootParam.name)}])\n`;

    const callExpr = `sol.${meta.name}(${args.join(",")})`;

    let comparison: string;
    let gotPrint: string;

    switch (meta.compare) {
      case "sort":
        comparison = `r is not None and sorted(r)==sorted(c['expected'])`;
        gotPrint = `str(r)`;
        break;
      case "set":
        comparison = `sorted([','.join(map(str,sorted(a))) for a in (r or [])])==sorted([','.join(map(str,sorted(a))) for a in (c['expected'] or [])])`;
        gotPrint = `str(r)`;
        break;
      case "rowset":
        comparison = `sorted([','.join(map(str,a)) for a in (r or [])])==sorted([','.join(map(str,a)) for a in (c['expected'] or [])])`;
        gotPrint = `str(r)`;
        break;
      case "size":
        comparison = `len(r or[])==c['expected']`;
        gotPrint = `len(r or[])`;
        break;
      case "inplace": {
        comparison = `_ip==c['expected']`;
        gotPrint = `str(_ip)`;
        break;
      }
      case "roundtrip":
        comparison = `tree_to_arr(sol.deserialize(r))==tree_to_arr(build_tree(c['input']['root']))`;
        gotPrint = `'(roundtrip)'`;
        break;
      default:
        if (meta.returnType === "ListNode")
          { comparison = `to_arr(r)==c['expected']`; gotPrint = `str(to_arr(r))`; }
        else if (meta.returnType === "TreeNodeVal")
          { comparison = `r is not None and r.val==c['expected']`; gotPrint = `str(r.val) if r else 'null'`; }
        else if (meta.returnType === "TreeNode")
          { comparison = `tree_to_arr(r)==c['expected']`; gotPrint = `str(tree_to_arr(r))`; }
        else
          { comparison = `r==c['expected']`; gotPrint = `str(r)`; }
    }

    if (meta.compare === "inplace") {
      const ip = meta.inplaceParam!;
      const ipParam = meta.params.find(p => p.name === ip)!;
      const ipCopy = ipParam.type === "int[][]"
        ? `[list(r) for r in c['input'][${JSON.stringify(ip)}]]`
        : `list(c['input'][${JSON.stringify(ip)}])`;
      const otherArgs = meta.params.filter(p => p.name !== ip).map(p => `c['input'][${JSON.stringify(p.name)}]`).join(",");
      return `c=_cases[${i}]\ntry:\n${callPre}    _ip=${ipCopy}\n    sol.${meta.name}(_ip${otherArgs ? "," + otherArgs : ""})\n    ok=${comparison}\n    print('✓ PASS' if ok else '✗ FAIL','| ${label} | Expected:'+str(c['expected'])+'| Got:'+${gotPrint})\n    if ok:p+=1\nexcept Exception as ex:\n    print('✗ ERROR |',str(ex))`;
    }

    return `c=_cases[${i}]\ntry:\n${callPre}    r=${callExpr}\n    ok=${comparison}\n    print('✓ PASS' if ok else '✗ FAIL','| ${label} | Expected:'+str(c['expected'])+'| Got:'+${gotPrint})\n    if ok:p+=1\nexcept Exception as ex:\n    print('✗ ERROR |',str(ex))`;
  }).join("\n");

  const pyJSON = JSON.stringify(cases)
    .replace(/\bnull\b/g, 'None')
    .replace(/\btrue\b/g, 'True')
    .replace(/\bfalse\b/g, 'False');
  return `${prefix}_cases=${pyJSON}
p=0
${caseBlocks}
print(f'\\n{p}/${total} test cases passed.')`;
}

// ═══════════════════════════════════════════════════════════════════════════
// JAVA generator
// ═══════════════════════════════════════════════════════════════════════════

function javaLit(val: unknown, type: LangType): string {
  if (val === null || val === undefined) {
    if (type === "TreeNode") return "null";
    if (type === "ListNode") return "null";
    return "null";
  }
  switch (type) {
    case "int":
    case "long":    return String(val);
    case "boolean": return String(val);
    case "string":  return `"${String(val).replace(/"/g, '\\"')}"`;
    case "int[]":   return `new int[]{${(val as number[]).join(",")}}`;
    case "int[][]": {
      const arr2 = val as number[][];
      return arr2.length === 0 ? "new int[][]{}" : `new int[][]{{${arr2.map(r => r.join(",")).join("},{")}}}`;
    }
    case "string[]":return `new String[]{${(val as string[]).map(s => `"${s}"`).join(",")}}`;
    case "char[][]":return `new char[][]{{${(val as string[][]).map(r => r.map(c => `'${c}'`).join(",")).join("},{")}}}`;
    case "ListNode": {
      const arr = val as number[];
      return arr.length === 0 ? "null" : `toList(new int[]{${arr.join(",")}})`;
    }
    case "TreeNode": {
      const arr = val as (number | null)[];
      return arr.length === 0 ? "null" : `build(new Integer[]{${arr.map(v => v === null ? "null" : String(v)).join(",")}})`;
    }
    case "TreeNodeRef": return String(val); // int value, used with fn()
    default: return String(val);
  }
}

function javaDisplay(returnType: LangType): string {
  switch (returnType) {
    case "int[]":        return `java.util.Arrays.toString(r)`;
    case "int[][]":      return `java.util.Arrays.deepToString(r)`;
    case "int[]list":    return `r.toString()`;
    case "int[][]list":  return `r.toString()`;
    case "boolean":      return `""+r`;
    case "string":       return `r`;
    case "ListNode":     return `java.util.Arrays.toString(toArr(r))`;
    case "TreeNode":     return `lvl(r).toString()`;
    case "TreeNodeVal":  return `""+r.val`;
    default:             return `""+r`;
  }
}

function javaCompare(returnType: LangType, compare: CompareMode, exp: unknown): string {
  switch (compare) {
    case "sort":
      if (returnType === "int[]list")
        return `{List<Integer>_s=new ArrayList<>(r);Collections.sort(_s);List<Integer>_e=Arrays.asList(${(exp as number[]).join(",")});Collections.sort(_e);ok=_s.equals(_e);}`;
      return `{java.util.Arrays.sort(r);int[]_e=${javaLit(exp,"int[]")};java.util.Arrays.sort(_e);ok=java.util.Arrays.equals(r,_e);}`;
    case "set":
      if (returnType === "int[][]list")
        return `{ok=r.stream().map(a->{List<Integer>tmp=new ArrayList<>(a);Collections.sort(tmp);return tmp.toString();}).sorted().collect(Collectors.joining("|")).equals(Arrays.asList(${(exp as number[][]).map(row=>`Arrays.asList(${row.map(String).join(",")})`).join(",")}).stream().map(a->{List<Integer>tmp=new ArrayList<>(a);Collections.sort(tmp);return tmp.toString();}).sorted().collect(Collectors.joining("|")));}`;
      return `{ok=Arrays.stream(${javaLit(exp,"int[][]")}).map(a->{int[]t=a.clone();Arrays.sort(t);return Arrays.toString(t);}).sorted().collect(Collectors.joining("|")).equals(Arrays.stream(r).map(a->{int[]t=a.clone();Arrays.sort(t);return Arrays.toString(t);}).sorted().collect(Collectors.joining("|")));}`;
    case "rowset":
      if (returnType === "int[][]list")
        return `{ok=r.stream().map(a->a.stream().map(String::valueOf).collect(Collectors.joining(","))).sorted().collect(Collectors.joining("|")).equals(Arrays.asList(${(exp as number[][]).map(row=>`Arrays.asList(${row.map(String).join(",")})`).join(",")}).stream().map(a->a.stream().map(String::valueOf).collect(Collectors.joining(","))).sorted().collect(Collectors.joining("|")));}`;
      return `{ok=Arrays.stream(r).map(a->Arrays.stream(a).mapToObj(String::valueOf).collect(Collectors.joining(","))).sorted().collect(Collectors.joining("|")).equals(Arrays.stream(${javaLit(exp,"int[][]")}).map(a->Arrays.stream(a).mapToObj(String::valueOf).collect(Collectors.joining(","))).sorted().collect(Collectors.joining("|")));}`;
    case "size":
      return `{ok=(r==null?0:r.size())==${exp};}`;
    case "exact":
    default:
      if (returnType === "int[]")
        return `{ok=Arrays.equals(r,${javaLit(exp,"int[]")});}`;
      if (returnType === "int[][]")
        return `{ok=Arrays.deepEquals(r,${javaLit(exp,"int[][]")});}`;
      if (returnType === "int[]list") {
        const elems = (exp as number[]).join(",");
        return `{ok=r.equals(Arrays.asList(${elems}));}`;
      }
      if (returnType === "int[][]list") {
        const rows = (exp as number[][]).map(row => `Arrays.asList(${row.map(String).join(",")})`).join(",");
        return `{ok=r.equals(Arrays.asList(${rows}));}`;
      }
      if (returnType === "ListNode")
        return `{ok=Arrays.equals(toArr(r),${javaLit(exp,"int[]")});}`;
      if (returnType === "TreeNode")
        return `{ok=lvl(r).equals(Arrays.asList(${(exp as (number|null)[]).map(v=>v===null?"null":String(v)).join(",")}));}`;
      if (returnType === "TreeNodeVal")
        return `{ok=r!=null&&r.val==${exp};}`;
      if (returnType === "boolean")
        return `{ok=r==${exp};}`;
      return `{ok=r==${exp};}`;
  }
}

function genJava(meta: FunctionMeta, cases: TestCase[]): string {
  const needsList = usesList(meta);
  const needsTree = usesTree(meta);
  const needsFind = meta.params.some(p => p.type === "TreeNodeRef");
  const needsNorm  = meta.compare === "set";
  const needsRoot  = meta.params.some(p => p.type === "TreeNodeRef");
  const rootParam  = meta.params.find(p => p.type === "TreeNode");

  let helpers = "";
  if (needsList) helpers += JAVA_LIST_H;
  if (needsTree) helpers += JAVA_TREE_H;
  if (!needsTree && needsFind) helpers += `\n  static TreeNode fn(TreeNode r,int v){if(r==null)return null;if(r.val==v)return r;TreeNode l=fn(r.left,v);return l!=null?l:fn(r.right,v);}`;

  const total = cases.length;

  const blocks = cases.map(c => {
    const label = makeLabel(meta.params, c.input);

    const args = meta.params.map(p => {
      if (p.type === "TreeNodeRef") return `fn(_root,${c.input[p.name]})`;
      if (p.type === "TreeNode" && needsRoot && p === rootParam) return `_root`;
      return javaLit(c.input[p.name], p.type);
    });

    let pre = "";
    if (needsRoot && rootParam)
      pre = `TreeNode _root=${javaLit(c.input[rootParam.name], "TreeNode")};`;

    const cmpBlock = javaCompare(meta.returnType, meta.compare, c.expected);
    const dispR = javaDisplay(meta.returnType);

    let dispE: string;
    if (meta.returnType === "int[][]list" && Array.isArray(c.expected))
      dispE = `Arrays.asList(${(c.expected as number[][]).map(r=>`Arrays.asList(${r.map(String).join(",")})`).join(",")})`;
    else if (meta.returnType === "int[]list" && Array.isArray(c.expected))
      dispE = `Arrays.asList(${(c.expected as number[]).join(",")})`;
    else if (Array.isArray(c.expected) && !Array.isArray((c.expected as unknown[])[0]))
      dispE = `Arrays.toString(new int[]{${(c.expected as number[]).join(",")}})`;
    else
      dispE = JSON.stringify(c.expected);

    if (meta.compare === "inplace") {
      const ip = meta.inplaceParam!;
      const ipParam = meta.params.find(p => p.name === ip)!;
      const otherArgs = meta.params.filter(p => p.name !== ip)
        .map(p => javaLit(c.input[p.name], p.type)).join(",");
      if (ipParam.type === "int[][]") {
        const matLit = javaLit(c.input[ip], "int[][]");
        const expLit = javaLit(c.expected, "int[][]");
        return `    {${pre}int[][]_ip=Arrays.stream(${matLit}).map(int[]::clone).toArray(int[][]::new);sol.${meta.name}(_ip${otherArgs ? ","+otherArgs : ""});boolean ok=Arrays.deepEquals(_ip,${expLit});System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:"+Arrays.deepToString(${expLit})+" | Got:"+Arrays.deepToString(_ip));if(ok)passed++;}`;
      }
      const ipCopy = `${javaLit(c.input[ip], "int[]")}.clone()`;
      return `    {${pre}int[]_ip=${ipCopy};sol.${meta.name}(_ip${otherArgs ? ","+otherArgs : ""});boolean ok=java.util.Arrays.equals(_ip,${javaLit(c.expected,"int[]")});System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:"+java.util.Arrays.toString(${javaLit(c.expected,"int[]")})+" | Got:"+java.util.Arrays.toString(_ip));if(ok)passed++;}`;
    }

    if (meta.compare === "roundtrip") {
      return `    {${pre}TreeNode _orig=${javaLit(c.input.root,"TreeNode")};String r=sol.serialize(_orig);TreeNode _back=sol.deserialize(r);boolean ok=lvl(_orig).equals(lvl(_back));System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:ok | Got:"+(ok?"ok":"fail"));if(ok)passed++;}`;
    }

    const retDecl =
      meta.returnType === "int"        ? "int"     :
      meta.returnType === "boolean"    ? "boolean"  :
      meta.returnType === "string"     ? "String"   :
      meta.returnType === "int[]"      ? "int[]"    :
      meta.returnType === "int[][]"    ? "int[][]"  :
      meta.returnType === "int[]list"  ? "var"      :
      meta.returnType === "int[][]list"? "var"      :
      meta.returnType === "string[]"   ? "String[]" :
      meta.returnType === "ListNode"   ? "ListNode" :
      (meta.returnType === "TreeNode" || meta.returnType === "TreeNodeVal") ? "TreeNode" :
      "var";

    return `    {${pre}${retDecl} r=sol.${meta.name}(${args.join(",")});boolean ok=false;${cmpBlock}System.out.println((ok?"✓ PASS":"✗ FAIL")+" | ${label} | Expected:${dispE} | Got:"+${dispR});if(ok)passed++;}`;
  }).join("\n");

  const imports = `import java.util.*;\nimport java.util.stream.*;\n`;

  return `${imports}public class Main {${helpers}
  public static void main(String[] args) {
    Solution sol = new Solution();
    int passed = 0;
${blocks}
    System.out.println("\\n" + passed + "/${total} test cases passed.");
  }
}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// C++ generator
// ═══════════════════════════════════════════════════════════════════════════

function cppLit(val: unknown, type: LangType): string {
  if (val === null || val === undefined) {
    if (type === "TreeNode") return "nullptr";
    if (type === "ListNode") return "nullptr";
    return "0";
  }
  switch (type) {
    case "int":
    case "long":    return String(val);
    case "boolean": return val ? "true" : "false";
    case "string":  return `"${String(val).replace(/"/g, '\\"')}"`;
    case "int[]":   return `{${(val as number[]).join(",")}}`;
    case "int[][]": {
      const arr2c = val as number[][];
      return arr2c.length === 0 ? "{}" : `{{${arr2c.map(r => r.join(",")).join("},{")}}}`;
    }
    case "string[]":return `{"${(val as string[]).join('","')}"}`;
    case "char[][]":return `{${(val as string[][]).map(r => `{${r.map(c => `'${c}'`).join(",")}}`).join(",")}}`;
    case "ListNode": {
      const arr = val as number[];
      return arr.length === 0 ? "nullptr" : `mk({${arr.join(",")}})`;
    }
    case "TreeNode": {
      const arr = val as (number | null)[];
      return arr.length === 0 ? "nullptr" : `bld({${arr.map(v => v === null ? "-10001" : String(v)).join(",")}})`;
    }
    case "TreeNodeRef": return String(val);
    default: return String(val);
  }
}

function cppDisplay(returnType: LangType, expr: string): string {
  switch (returnType) {
    case "int[]":
    case "int[]list":     return `vs(${expr})`;
    case "int[][]":
    case "int[][]list":   return `vs2(${expr})`;
    case "boolean":       return `(${expr}?"true":"false")`;
    case "ListNode":      return `vs(la(${expr}))`;
    case "TreeNode":      return `vs(lvl(${expr}))`;
    case "TreeNodeVal":   return `(${expr}?to_string(${expr}->val):string("null"))`;
    default:              return expr;
  }
}

function cppExpectedDisplay(val: unknown, returnType: LangType): string {
  if (returnType === "int[]" || returnType === "int[]list" || returnType === "ListNode")
    return `vs(vector<int>{${(val as number[]).join(",")}})`;
  if (returnType === "int[][]" || returnType === "int[][]list" || returnType === "TreeNode")
    return `vs2(vector<vector<int>>{{${(val as number[][]).map(r => r.join(",")).join("},{")}}})`;
  return JSON.stringify(val);
}

function cppCompare(returnType: LangType, compare: CompareMode, exp: unknown): string {
  switch (compare) {
    case "sort":
      return `sort(r.begin(),r.end());vector<int>_e=${cppLit(exp,"int[]")};sort(_e.begin(),_e.end());bool ok=r==_e;`;
    case "set":
      return `bool ok=false;{auto _norm=[](vector<vector<int>>v){for(auto&a:v)sort(a.begin(),a.end());sort(v.begin(),v.end());return v;};ok=_norm(r)==_norm(vector<vector<int>>${cppLit(exp,"int[][]")});}`;
    case "rowset":
      return `bool ok=false;{auto _rs=[](vector<vector<int>>v){vector<string>s;for(auto&a:v){string t;for(int i=0;i<(int)a.size();i++){if(i)t+=",";t+=to_string(a[i]);}s.push_back(t);}sort(s.begin(),s.end());return s;};ok=_rs(r)==_rs(vector<vector<int>>${cppLit(exp,"int[][]")});}`;
    case "size":
      return `bool ok=(int)r.size()==${exp};`;
    case "exact":
    default:
      if (returnType === "int[]" || returnType === "int[]list")
        return `bool ok=r==vector<int>${cppLit(exp,"int[]")};`;
      if (returnType === "int[][]" || returnType === "int[][]list")
        return `bool ok=r==vector<vector<int>>${cppLit(exp,"int[][]")};`;
      if (returnType === "boolean")
        return `bool ok=r==${exp};`;
      if (returnType === "ListNode")
        return `bool ok=la(r)==vector<int>${cppLit(exp,"int[]")};`;
      if (returnType === "TreeNode") {
        const expArr = (exp as (number|null)[]).map(v => v === null ? -10001 : v);
        return `bool ok=lvl(r)==vector<int>{${expArr.join(",")}};`;
      }
      if (returnType === "TreeNodeVal")
        return `bool ok=r&&r->val==${exp};`;
      return `bool ok=r==${exp};`;
  }
}

function genCPP(meta: FunctionMeta, cases: TestCase[]): string {
  const needsList = usesList(meta);
  const needsTree = usesTree(meta);
  const needsVS   = true;
  const inplaceParam2D = meta.compare === "inplace" && meta.params.find(p => p.name === meta.inplaceParam)?.type === "int[][]";
  const needsVS2  = meta.returnType === "int[][]" || meta.returnType === "int[][]list" || meta.compare === "set" || meta.compare === "rowset" || inplaceParam2D;
  const needsFind = meta.params.some(p => p.type === "TreeNodeRef");
  const needsRoot  = meta.params.some(p => p.type === "TreeNodeRef");
  const rootParam  = meta.params.find(p => p.type === "TreeNode");

  let helpers = "";
  if (needsVS)   helpers += CPP_VS;
  if (needsVS2)  helpers += CPP_VS2;
  if (needsList) helpers += CPP_LIST_H;
  if (needsTree) helpers += CPP_TREE_H;
  if (!needsTree && needsFind) helpers += `TreeNode*fn(TreeNode*r,int v){if(!r)return nullptr;if(r->val==v)return r;auto l=fn(r->left,v);return l?l:fn(r->right,v);}\n`;

  const total = cases.length;

  const blocks = cases.map(c => {
    const label = makeLabel(meta.params, c.input);

    let pre = "";
    if (needsRoot && rootParam)
      pre = `auto _root=${cppLit(c.input[rootParam.name],"TreeNode")};`;

    const args = meta.params.map(p => {
      if (p.type === "TreeNodeRef") return `fn(_root,${c.input[p.name]})`;
      if (p.type === "TreeNode" && needsRoot && p === rootParam) return `_root`;
      if (p.type === "int[]" || p.type === "int[]list") {
        const v = c.input[p.name] as number[];
        return `*(new vector<int>${cppLit(v,"int[]")})`;
      }
      if (p.type === "int[][]" || p.type === "int[][]list") {
        const v = c.input[p.name] as number[][];
        return `*(new vector<vector<int>>${cppLit(v,"int[][]")})`;
      }
      if (p.type === "string[]") {
        const v = c.input[p.name] as string[];
        return `*(new vector<string>${cppLit(v,"string[]")})`;
      }
      if (p.type === "char[][]") {
        const v = c.input[p.name] as string[][];
        return `*(new vector<vector<char>>${cppLit(v,"char[][]")})`;
      }
      return cppLit(c.input[p.name], p.type);
    });

    if (meta.compare === "inplace") {
      const ip = meta.inplaceParam!;
      const ipParam = meta.params.find(p => p.name === ip)!;
      const otherArgs = meta.params.filter(p => p.name !== ip)
        .map(p => cppLit(c.input[p.name], p.type)).join(",");
      if (ipParam.type === "int[][]") {
        const matLit = `vector<vector<int>>${cppLit(c.input[ip],"int[][]")}`;
        const expLit = `vector<vector<int>>${cppLit(c.expected,"int[][]")}`;
        return `  {${pre}vector<vector<int>>_ip=${matLit};sol.${meta.name}(_ip${otherArgs ? ","+otherArgs : ""});bool ok=_ip==${expLit};cout<<(ok?"✓ PASS":"✗ FAIL")<<" | ${label} | Expected:"<<vs2(${expLit})<<" | Got:"<<vs2(_ip)<<"\\n";if(ok)passed++;}`;
      }
      const v = c.input[ip] as number[];
      const ipLit = `vector<int>${cppLit(v,"int[]")}`;
      const expLit = `vector<int>${cppLit(c.expected,"int[]")}`;
      return `  {${pre}vector<int>_ip=${ipLit};sol.${meta.name}(_ip${otherArgs ? ","+otherArgs : ""});bool ok=_ip==${expLit};cout<<(ok?"✓ PASS":"✗ FAIL")<<" | ${label} | Expected:"<<vs(${expLit})<<" | Got:"<<vs(_ip)<<"\\n";if(ok)passed++;}`;
    }

    if (meta.compare === "roundtrip") {
      return `  {${pre}auto _orig=${cppLit(c.input.root,"TreeNode")};string r=sol.serialize(_orig);auto _back=sol.deserialize(r);bool ok=lvl(_orig)==lvl(_back);cout<<(ok?"✓ PASS":"✗ FAIL")<<" | ${label} | Expected:ok | Got:"<<(ok?"ok":"fail")<<"\\n";if(ok)passed++;}`;
    }

    const cmpCode = cppCompare(meta.returnType, meta.compare, c.expected);
    const dispR   = cppDisplay(meta.returnType, "r");

    const retType =
      meta.returnType === "int"        ? "int"                    :
      meta.returnType === "boolean"    ? "bool"                   :
      meta.returnType === "string"     ? "string"                 :
      meta.returnType === "int[]"      ? "vector<int>"            :
      meta.returnType === "int[]list"  ? "vector<int>"            :
      meta.returnType === "int[][]" || meta.returnType === "int[][]list" ? "vector<vector<int>>" :
      meta.returnType === "string[]"   ? "vector<string>"         :
      meta.returnType === "ListNode"   ? "auto"                   :
      (meta.returnType === "TreeNode" || meta.returnType === "TreeNodeVal") ? "auto" :
      "auto";

    let expDisplay: string;
    if (meta.returnType === "int[]" || meta.returnType === "int[]list" || meta.returnType === "ListNode")
      expDisplay = `vs(vector<int>${cppLit(c.expected,"int[]")})`;
    else if (meta.returnType === "int[][]" || meta.returnType === "int[][]list")
      expDisplay = `vs2(vector<vector<int>>${cppLit(c.expected,"int[][]")})`;
    else if (meta.returnType === "TreeNode")
      expDisplay = `vs(vector<int>${cppLit(c.expected,"int[]")})`;
    else
      expDisplay = JSON.stringify(c.expected);

    return `  {${pre}${retType} r=sol.${meta.name}(${args.join(",")});${cmpCode}cout<<(ok?"✓ PASS":"✗ FAIL")<<" | ${label} | Expected:"<<${expDisplay}<<" | Got:"<<${dispR}<<"\\n";if(ok)passed++;}`;
  }).join("\n");

  return `${helpers}int main(){\n  Solution sol;\n  int passed=0;\n${blocks}\n  cout<<"\\n"<<passed<<"/${total} test cases passed."<<endl;\n  return 0;\n}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════════════════════

export function generateRunner(
  lang: "javascript" | "python" | "java" | "cpp",
  meta: FunctionMeta,
  cases: TestCase[]
): string {
  if (lang === "javascript") return genJS(meta, cases);
  if (lang === "python")     return genPY(meta, cases);
  if (lang === "java")       return genJava(meta, cases);
  return genCPP(meta, cases);
}

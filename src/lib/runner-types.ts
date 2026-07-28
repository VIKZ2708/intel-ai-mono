export type LangType =
  | "int" | "long" | "boolean" | "string"
  | "int[]" | "int[][]" | "string[]" | "char[][]"
  | "int[]list"    // Java returns List<Integer>; C++/JS/Python same as int[]
  | "int[][]list"  // Java returns List<List<Integer>>; C++/JS/Python same as int[][]
  | "ListNode" | "TreeNode"
  | "TreeNodeRef"  // int param that gets looked up as a node in the root tree
  | "TreeNodeVal"  // TreeNode return, compare by .val (int)
  | "void";

export type CompareMode =
  | "exact"      // strict equality
  | "sort"       // sort int[] before comparing
  | "set"        // normalize int[][] (sort inner + outer)
  | "rowset"     // normalize int[][] (sort outer only; inner order preserved) — for permutations
  | "size"       // only check count; expected is a number
  | "inplace"    // void fn modifies a param; compare that param to expected
  | "roundtrip"; // serialize → deserialize → compare level-order

export interface FunctionParam {
  name: string;
  type: LangType;
}

export interface FunctionMeta {
  name: string;
  params: FunctionParam[];
  returnType: LangType;
  compare: CompareMode;
  inplaceParam?: string; // required when compare = "inplace"
}

export interface TestCase {
  input: Record<string, unknown>;
  expected: unknown;
}

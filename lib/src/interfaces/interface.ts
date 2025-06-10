import { Method } from "axios";

export type AssertionOperators =
  | "==="
  | "!=="
  | "=="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<=";

export interface Assertion {
  path: string;
  operator: AssertionOperators;
  value: string | number | boolean | null | undefined;
}

export interface Step {
  id: string;
  name: string;
  method: Method;
  url: string;
  headers: Record<string, any>;
  body: Record<string, any>;
  asserts: Assertion[];
}

export interface TestFile {
  name: string;
  description: string;
  baseUrl: string;
  steps: Step[];
}

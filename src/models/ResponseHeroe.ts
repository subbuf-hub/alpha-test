import { Result } from "./Result";

export interface ResponseHeroe {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Result[];
}

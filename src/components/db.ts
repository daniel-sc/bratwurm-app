import { shallowRef } from "vue";

export class Probs {
  fw: string;
  exact: string[];
  sum: string[];

  constructor(fw: string, exact: string[], sum: string[]) {
    this.fw = fw;
    this.exact = exact;
    this.sum = sum;
  }
}
async function loadProbs() {
  const r = await fetch("/probs.txt");
  const body = await r.text();
  const result = new Map<string, Probs>();
  body
    .trim()
    .split("\n")
    .forEach((line) => {
      const [key, fw, exact, sum] = line.trim().split(":");
      result.set(key, new Probs(fw, exact.split(","), sum.split(",")));
    });
  return result;
}

export const probs = shallowRef(new Map<string, Probs>());

loadProbs().then((p) => (probs.value = p));

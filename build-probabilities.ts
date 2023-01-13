import {
  computeProbs,
  probabilityOfFehlwurf,
} from "bratwurm-probabilities/bratwurm/bratwurmFunctions";
// @ts-ignore
import * as file from "fs";
import { number } from "mathjs";

console.debug = () => {};

function* zip<T>(
  a: IterableIterator<T>,
  b: IterableIterator<T>
): IterableIterator<[T, T]> {
  while (true) {
    const aNext = a.next();
    const bNext = b.next();
    if (aNext.done || bNext.done) {
      break;
    }
    yield [aNext.value, bNext.value];
  }
}

let content = "";

function formatProb(prob: number): string {
  if (prob === 0) {
    return "0";
  }
  if (prob === 1) {
    return "1";
  }
  return prob.toFixed(3).substring(2);
}

for (const [exact, sum] of zip(computeProbs(false), computeProbs(true))) {
  if (exact.diceCounts.join(",") !== sum.diceCounts.join(",")) {
    console.warn("incorrect matching!", exact, sum);
  }
  const fw = probabilityOfFehlwurf({
    thrown: { diceCount: exact.diceCounts, probability: 1 },
    fehlWurf: false,
  });
  content += `${exact.diceCounts.join("")}:${formatProb(
    number(fw)
  )}:${exact.probs.map(formatProb).join(",")}:${sum.probs
    .map(formatProb)
    .join(",")}\n`;
}

file.writeFileSync("src/assets/probs.txt", content);

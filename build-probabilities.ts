import {
  computeProbs,
  probabilityOfFehlwurf,
} from "bratwurm-probabilities/bratwurm/bratwurmFunctions";
// @ts-ignore
import * as file from "fs";
import { number } from "mathjs";
// @ts-ignore
import { TARGETS } from "./src/components/DiceType";

console.debug = () => {};

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

const exactProbsMap = new Map<string, number[]>(
  [...computeProbs(false)].map((p) => [p.diceCounts.join(""), p.probs])
);
const sumProbs = computeProbs(true);
for (const sum of sumProbs) {
  const exact =
    exactProbsMap.get(sum.diceCounts.join("")) ?? TARGETS.map(() => 0);
  const fw = probabilityOfFehlwurf({
    thrown: { diceCount: sum.diceCounts, probability: 1 },
    fehlWurf: false,
  });
  content +=
    `${sum.diceCounts.join("")}` +
    `:${formatProb(number(fw))}` +
    `:${exact.map(formatProb).join(",")}` +
    `:${sum.probs.map(formatProb).join(",")}\n`;
}

file.writeFileSync("src/assets/probs.txt", content);

const ALPHA = 0.5;

/**
 * Calculate the next recomandation score (Tn+1)
 * @param tn - Actual recomandation score (Tn)
 * @param Tn - Previous predicted recomandation score
 * @returns The predicted next recomandation score (Tn+1)
 */
function calculateNextRecomanadationScore(tn: number, Tn: number): number {
  return ALPHA * tn + (1 - ALPHA) * Tn;
}

const tn = 10;
const Tn = 8;
const TnPlus1 = calculateNextRecomanadationScore(tn, Tn);
console.log(`The predicted next recomandation score (Tn+1) is: ${TnPlus1}`);

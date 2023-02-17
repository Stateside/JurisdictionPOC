
let seed = 42023 // ensures repeatable sequence of numbers

/** 
 * a javascript linear congruential generator (LCG) to generate a pseudo random number
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
const random = (max:number) => {
  const A: number = 1664543;    // multiplier
  const C: number = 1013904223; // incrementer
  const M: number = 2**31-1;    // modulus
  seed = (A * seed + C) % M
  return seed % max
}

export default random
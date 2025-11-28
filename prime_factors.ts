/**
 * Berechnet alle Primzahlen bis zu einer gegebenen Zahl.
 */
export function getPrimesUpTo(n: number): number[] {
  const primes: number[] = [];
  for (let candidate = 2; candidate <= n / 2; candidate++) {
    let isPrime = true;
    for (let i = 2; i < candidate; i++) {
      if (candidate % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

/**
 * Zerlegt eine Zahl in ihre Primfaktoren.
 */
export function factorize(n: number): number[] {
  if (n < 1) {
    throw new Error("negative numbers are not supported");
  }

  const primes = getPrimesUpTo(n);
  const factors: number[] = [];

  if (primes.length === 0) {
    factors.push(n);
    return factors;
  }

  let remainder = n;
  for (let i = 0; i < primes.length && remainder > 1; ) {
    const prime = primes[i];
    if (remainder % prime === 0) {
      remainder /= prime;
      factors.push(prime);
    } else {
      i++;
    }
  }

  return factors;
}


export function formatFactors(n: number, factors: number[]): string {
  return `${n}: ${factors.join(", ")}`;
}

export function factor(numbers: Array<number>) {
  // first, compute all the prime numbers up to each number
  const primesUpToNumber: Map<number, Array<number>> = new Map();
  for (const number of numbers) {
    if (number < 1) {
      throw new Error("negative numbers are not supported");
    }
    primesUpToNumber.set(number, new Array<number>());
    for (let candidate = 2; candidate <= number / 2; candidate++) {
      let isPrime = true;
      for (let i = 2; i < candidate; i++) {
        if (candidate % i == 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        const old = primesUpToNumber.get(number) || [];
        old.push(candidate);
        primesUpToNumber.set(number, old);
      }
    }
  }

  // second, factorize each number using the prime numbers up to it
  for (const number of primesUpToNumber.keys()) {
    const primes = primesUpToNumber.get(number) || [];
    const factors = new Array<number>();
    if (primes.length == 0) {
      factors.push(number);
    } else {
      let remainder = number;
      for (let i = 0; i < primes.length && remainder > 0; ) {
        const prime = primes[i];
        if (remainder % prime == 0) {
          remainder /= primes[i];
          factors.push(prime);
        } else {
          i++;
        }
      }
    }
    console.log(`${number}: ${factors.join(", ")}`);
  }
}

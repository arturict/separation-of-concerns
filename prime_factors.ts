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

/**
 * Formatiert eine Zahl mit ihren Primfaktoren als String.
 */
export function formatFactors(n: number, factors: number[]): string {
  return `${n}: ${factors.join(", ")}`;
}

/**
 * Berechnet und gibt die Primfaktoren für mehrere Zahlen aus.
 */
export function factor(numbers: number[]): void {
  for (const n of numbers) {
    const factors = factorize(n);
    console.log(formatFactors(n, factors));
  }
}

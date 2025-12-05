/**
 * Berechnet alle Primzahlen bis zu einer gegebenen Zahl.
 * Verwendet das Sieb des Eratosthenes für bessere Performance.
 */
export function getPrimesUpTo(n: number): number[] {
  if (n < 2) return [];

  // Sieb des Eratosthenes: Array mit true = möglicherweise prim
  const sieve: boolean[] = new Array(n + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;

  // Markiere alle Vielfachen von Primzahlen als nicht-prim
  for (let i = 2; i * i <= n; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= n; j += i) {
        sieve[j] = false;
      }
    }
  }

  // Sammle alle Primzahlen
  const primes: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (sieve[i]) {
      primes.push(i);
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

  if (remainder > 1) {
    factors.push(remainder);
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

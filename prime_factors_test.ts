import { expect } from "@std/expect";
import { factorize, formatFactors, getPrimesUpTo } from "./prime_factors.ts";

Deno.test("factorize zerlegt 42 in Primfaktoren 2, 3, 7", () => {
  const result = factorize(42);
  expect(result).toEqual([2, 3, 7]);
});

Deno.test("formatFactors formatiert Zahl mit Faktoren korrekt", () => {
  const result = formatFactors(42, [2, 3, 7]);
  expect(result).toBe("42: 2, 3, 7");
});

Deno.test("factorize wirft Fehler bei negativen Zahlen", () => {
  expect(() => factorize(-5)).toThrow("negative numbers are not supported");
});

Deno.test("getPrimesUpTo findet alle Primzahlen bis 20", () => {
  const result = getPrimesUpTo(20);
  expect(result).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
});

Deno.test("factorize zerlegt Primzahl 13 in sich selbst", () => {
  const result = factorize(13);
  expect(result).toEqual([13]);
});

Deno.test("factorize zerlegt 1000 in 2, 2, 2, 5, 5, 5", () => {
  const result = factorize(1000);
  expect(result).toEqual([2, 2, 2, 5, 5, 5]);
});

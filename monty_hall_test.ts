import { expect } from "@std/expect";
import { playOnce, simulate, formatResults, SimulationResult } from "./monty_hall.ts";

// Test für playOnce mit kontrolliertem Zufall
Deno.test("playOnce: Spieler gewinnt beim Bleiben wenn er richtig wählt", () => {
  // Beide Zufallswerte 0 → winningDoor=1, playerGuess=1
  let callCount = 0;
  const result = playOnce(() => {
    callCount++;
    return 0; // Gibt immer 0 zurück → Tür 1
  });
  
  expect(result.winsIfSticking).toBe(true);
  expect(result.winsIfChanging).toBe(false);
});

Deno.test("playOnce: Spieler gewinnt beim Wechseln wenn er falsch wählt", () => {
  // winningDoor=1 (0*3+1), playerGuess=2 (0.5*3+1)
  let callCount = 0;
  const result = playOnce(() => {
    callCount++;
    return callCount === 1 ? 0 : 0.5; // Erste Tür 1, zweite Tür 2
  });
  
  expect(result.winsIfSticking).toBe(false);
  expect(result.winsIfChanging).toBe(true);
});

// Test für simulate
Deno.test("simulate: wirft Fehler bei negativer Anzahl", () => {
  expect(() => simulate(-1)).toThrow("cannot play a negative number of times");
});

Deno.test("simulate: zählt Gewinne korrekt", () => {
  // Immer gleiche Wahl → immer Bleiben gewinnt
  const result = simulate(10, () => 0);
  
  expect(result.times).toBe(10);
  expect(result.wonSticking).toBe(10);
  expect(result.wonChanging).toBe(0);
});

Deno.test("simulate: bei vielen Spielen gewinnt Wechseln ~66%", () => {
  const result = simulate(10000);
  
  // Wechseln sollte etwa doppelt so oft gewinnen wie Bleiben
  const changingRatio = result.wonChanging / result.times;
  expect(changingRatio).toBeGreaterThan(0.6);
  expect(changingRatio).toBeLessThan(0.72);
});

// Test für formatResults
Deno.test("formatResults: formatiert Ergebnisse korrekt", () => {
  const result: SimulationResult = {
    times: 100,
    wonSticking: 33,
    wonChanging: 67,
  };
  
  const lines = formatResults(result);
  
  expect(lines).toHaveLength(5);
  expect(lines[0]).toBe("played 100 times");
  expect(lines[1]).toBe("won 33 times by sticking to the initial choice");
  expect(lines[2]).toBe("won 67 times by changing the initial choice");
  expect(lines[3]).toBe("sticking wins 33% of games");
  expect(lines[4]).toBe("changing wins 67% of games");
});

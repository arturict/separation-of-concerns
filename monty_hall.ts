/**
 * Ergebnis eines einzelnen Monty-Hall-Spiels.
 */
export interface GameResult {
  winsIfSticking: boolean;
  winsIfChanging: boolean;
}

/**
 * Statistik über mehrere Spiele.
 */
export interface SimulationResult {
  times: number;
  wonSticking: number;
  wonChanging: number;
}

/**
 * Spielt ein einzelnes Monty-Hall-Spiel.
 * (Aspekt: Spiellogik)
 * 
 * @param randomFn - Optionale Zufallsfunktion für Testbarkeit (gibt 0-1 zurück)
 */
export function playOnce(randomFn: () => number = Math.random): GameResult {
  // Zufällige Tür mit Preis (1, 2 oder 3)
  const winningDoor = Math.floor(randomFn() * 3) + 1;
  
  // Spieler wählt zufällig eine Tür
  const playerGuess = Math.floor(randomFn() * 3) + 1;
  
  // Spieler gewinnt beim Bleiben, wenn er die richtige Tür gewählt hat
  // Spieler gewinnt beim Wechseln, wenn er die falsche Tür gewählt hat
  return {
    winsIfSticking: playerGuess === winningDoor,
    winsIfChanging: playerGuess !== winningDoor,
  };
}

/**
 * Führt eine Simulation mit mehreren Spielen durch.
 * (Aspekt: Simulation/Statistik)
 * 
 * @param times - Anzahl der Spiele
 * @param randomFn - Optionale Zufallsfunktion für Testbarkeit
 */
export function simulate(times: number, randomFn: () => number = Math.random): SimulationResult {
  if (times < 0) {
    throw new Error("cannot play a negative number of times");
  }

  let wonSticking = 0;
  let wonChanging = 0;

  for (let i = 0; i < times; i++) {
    const result = playOnce(randomFn);
    if (result.winsIfSticking) {
      wonSticking++;
    }
    if (result.winsIfChanging) {
      wonChanging++;
    }
  }

  return { times, wonSticking, wonChanging };
}

/**
 * Formatiert die Simulationsergebnisse als String-Array.
 * (Aspekt: Formatierung)
 */
export function formatResults(result: SimulationResult): string[] {
  const f = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  const stickingPercent = (result.wonSticking / result.times) * 100;
  const changingPercent = (result.wonChanging / result.times) * 100;

  return [
    `played ${result.times} times`,
    `won ${result.wonSticking} times by sticking to the initial choice`,
    `won ${result.wonChanging} times by changing the initial choice`,
    `sticking wins ${f.format(stickingPercent)}% of games`,
    `changing wins ${f.format(changingPercent)}% of games`,
  ];
}

/**
 * Spielt das Monty-Hall-Spiel und gibt die Ergebnisse aus.
 * (Aspekt: Ausgabe)
 */
export function play(times: number): void {
  const result = simulate(times);
  const lines = formatResults(result);
  lines.forEach((line) => console.log(line));
}

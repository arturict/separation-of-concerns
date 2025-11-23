export function printMultiplicationTable(numbers: Array<number>) {
  // first, let's figure out the biggest value
  const biggest = numbers.reduce((acc, n) => (n > acc ? n : acc));

  // then, find the biggest possible result to compute its magnitude
  let biggestResult = biggest * biggest;
  let magnitude = 0;
  while (biggestResult > 0) {
    magnitude++;
    biggestResult = Math.round(biggestResult / 10);
  }
  magnitude++; // add an additional space for the width

  // finally, calculate and output the nicely formatted multiplication table
  let titleRow = "*";
  while (titleRow.length < magnitude) {
    titleRow = " " + titleRow;
  }
  titleRow += " ||";
  for (const n of numbers) {
    let cell = `${n}`;
    while (cell.length < magnitude) {
      cell = " " + cell;
    }
    titleRow += `${cell} |`;
  }
  console.log(titleRow);
  let sep = "";
  for (let i = 0; i < titleRow.length; i++) {
    sep += "=";
  }
  console.log(sep);
  for (const n of numbers) {
    let row = `${n}`;
    while (row.length < magnitude) {
      row = ` ${row}`;
    }
    row = `${row} ||`;
    for (const m of numbers) {
      const product = n * m;
      let cell = `${product}`;
      while (cell.length < magnitude) {
        cell = ` ${cell}`;
      }
      cell += " |";
      row += cell;
    }
    console.log(row);
  }
}

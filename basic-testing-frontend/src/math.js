export function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += +number; //fuerzo la conversión a number para que pueda tomar strings de números y sumarlos
  }
  return sum;
}

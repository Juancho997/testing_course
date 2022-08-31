import { it, expect, describe } from 'vitest';
import { add } from './math.js';

// Keep it simple!

// Solo los datos necesarios para que el test funcione correctamente
// Agrega valor a mi test sumarle x dato?

// QUE testear?
// Una "cosa" : Una feature o un comportamiento POR test

// Patrón AAA (Arrange, Act, Assert)


// Code => Test => Rewrite Code => Rewrite Test =>  ...

// Testear es un proceso iterativo, podemos testear cuantas veces sea necesario para lograr el comportamiento esperado de nuestro código
// De esta forma, podemos reconocer mejoras en la lógica de nuestras funciones, modificándolas para acercanos cada vez más al comportamiento deseado.



// 1º arg : descripcion de lo que debería cumplir la funcion a testear
// 2º arg : fn anon con la lógica del test
describe('add', () => {

    it('should sumarize all number values in an array', () => {
        //Arrange
        const numbers = [1, 2];

        //Act
        const result = add(numbers);

        //Assert
        const expectedResult = numbers.reduce((prevValue, currValue) => prevValue + currValue, 0); //evitar hardcodear el resultado
        expect(result).toBe(expectedResult);

    });

    it('should yield a NaN if at least one invalid number its provided', () => {

        const inputs = ['invalid', 1];

        const result = add(inputs);

        expect(result).toBeNaN();


    });

    it('should yield a correct sum if an array of numeric values is provided', () => {
        const numbers = ['1', '2'];

        const result = add(numbers);

        const expectedResult = numbers.reduce((prevValue, currValue) => +prevValue + +currValue, 0); //evitar hardcodear el resultado

        expect(result).toBe(expectedResult)
    });

    it('should yield 0 if an empty array is provided', () => {
        const numbers = [];

        const result = add(numbers);

        expect(result).toBe(0);
    });


    it('should throw an error if an error if no value is passed into the function', () => {
        const resultFn = () => {
            add();
        };

        expect(resultFn).toThrow();
    });

    it('should throw an error if provided with multiple arguments instead of an array', () => {
        const num1 = 1;
        const num2 = 2;

        const resultFn = () => {
            add(num1, num2);
        };

        expect(resultFn).toThrow(/is not iterable/);
        // podemos especificar el mensaje de error.
        // OJO puede que la función misma arroje errores personalizados, y el test falle debido a que no se está buscando ese error.
    });

});
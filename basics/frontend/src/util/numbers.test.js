import { it, expect, describe } from 'vitest';
import { transformToNumber, cleanNumbers } from './numbers.js';


describe('transformToNumber()', () => {

    it('should return a number of type number from a number of type string', () => {

        const strNumber = "1";

        const result = transformToNumber(strNumber);

        expect(result).toBeTypeOf("number")
    });


    it('should return a number of type number from a number of type string', () => {

        const strNumber = "1";

        const result = transformToNumber(strNumber);

        expect(result).toBe(+strNumber); //cambio las expectativas para ampliar las posibilidades de retorno de la fn
    });

    it('should yield a NaN if no argument its provided', () => {

        const result = transformToNumber();

        expect(result).toBeNaN();

    });

    // cualquir valor no transformable
    // [] tranforma a 0 
    it('should yield a NaN if the argument its any symbol of type string', () => {

        const value1 = "q";
        const value2 = "@";
        const value3 = {};

        const result1 = transformToNumber(value1);
        const result2 = transformToNumber(value2);
        const result3 = transformToNumber(value3);

        expect(result1).toBeNaN();
        expect(result2).toBeNaN();
        expect(result3).toBeNaN();
    });


    it('should return a 0 if the argument its an empty string', () => {
        const value = "";

        const result = transformToNumber(value);

        expect(result).toBe(0);
    });

});


describe('cleanNumbers()', () => {

    // Integration Test => cleanNumbers() llama a transformToNumber() durante su ejecución
    it('should return an array of number values if an array of string numbers is provided', () => {

        const numberValues = ['1', '2'];

        const cleanedNumbers = cleanNumbers(numberValues);

        //! toBe() != toEqual()
        // expect(cleanedNumbers).toBe([1, 2]); => AssertionError: expected [ 1, 2 ] to be [ 1, 2 ] // Object.is equality //!no es el mismo objeto en memoria
        // expect(cleanedNumbers).toEqual([1, 2]); => Pasa el test. Se comparan los valores, no el objeto

        // expect(cleanedNumbers[0]).toBeTypeOf('number');
    });


    it('should throw an error if an array of at least one empty string its provided', () => {

        const values = ['', 1];

        const cleanValues = () => {
            cleanNumbers(values);
        };

        expect(cleanValues).toThrow();

    });
});
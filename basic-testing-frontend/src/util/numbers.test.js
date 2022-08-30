import { it, expect, describe } from 'vitest';
import { transformToNumber } from './numbers.js';


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
    // [] tranforma a 0  :'v?
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
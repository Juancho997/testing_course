import { it, expect, describe } from 'vitest';
import { validateStringNotEmpty, validateNumber } from './validation.js';


describe('validateStringNotEmpty()', () => {
    it('should throw a custom error when an empty string its provided', () => {

        const value = "";

        const result = () => {
            validateStringNotEmpty(value);
        };

        expect(result).toThrowError(/Invalid input - must not be empty/);

    });


    it('should throw an error when provided with a value that is not a string', () => {

        const value1 = [];
        const value2 = {};

        const result1 = () => {
            validateStringNotEmpty(value1);
        };

        const result2 = () => {
            validateStringNotEmpty(value2);
        };

        expect(result1).toThrow()
        expect(result2).toThrowError(/value.trim is not a function/)

    });

    it('should return nothing when a valid string its provided', () => {

        const value1 = " ";
        const value2 = "a";
        const value3 = "[]";

        const result1 = () => {
            validateStringNotEmpty(value1);
        };

        const result2 = () => {
            validateStringNotEmpty(value2);
        };

        const result3 = () => {
            validateStringNotEmpty(value3);
        };

        expect(result1).toBeDefined();
        expect(result2).toBeDefined();
        expect(result3).toBeDefined();
    });

});






describe('validateNumber()', () => {
    // quicknote : [] || "" || " " == 0 => validateNumber() ok!
    it('should return nothing when a string transformable to number its provided', () => {

        const value1 = "1";
        const value2 = "1.2";

        const result1 = () => {
            validateNumber(value1);
        };

        const result2 = () => {
            validateNumber(value2);
        };

        expect(result1).toBeDefined();
        expect(result2).toBeDefined();

    });



    it('should return nothing when a number its provided', () => {

        const value2 = 1;
        const value3 = 2.1;

        const result2 = () => {
            validateNumber(value2);
        };

        const result3 = () => {
            validateNumber(value3);
        };

        expect(result2).toBeDefined();
        expect(result3).toBeDefined();

    });

    it('should throw a custom error when provided with a string non-tranformable to number', () => {

        const value1 = "@";
        const value2 = "{}";

        const result1 = () => {
            validateNumber(value1);
        };

        const result2 = () => {
            validateNumber(value2);
        };

        expect(result1).toThrow()
        expect(result2).toThrow()
    });

});
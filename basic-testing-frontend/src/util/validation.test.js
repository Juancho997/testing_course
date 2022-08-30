import { it, expect } from 'vitest';
import { validateStringNotEmpty, validateNumber } from './validation.js';

// ----> validateStringNotEmpty

it('should throw an custom error when an empty string its provided', () => {

    const value = "";

    const result = () => {
        validateStringNotEmpty(value);
    };

    expect(result).toThrowError(/Invalid input - must not be empty/);

});

it('should return nothing when a valid string its provided', () => {

    const value1 = "";
    const value2 = "a";

    const result1 = () => {
        validateStringNotEmpty(value1);
    };

    const result2 = () => {
        validateStringNotEmpty(value2);
    };


    expect(result1).toBeDefined();
    expect(result2).toBeDefined();

});
import { describe, it, expect, vi } from "vitest";
import { validateNotEmpty } from './validation.js';
import { ValidationError } from './errors.js';


describe('validateNotEmpty()', () => {


    it('should throw an error when an empty string its provided', () => {
        const emptyString = '';

        const validationFn = () => validateNotEmpty(emptyString);

        expect(validationFn).toThrow();

    });

    it('should throw an error when a blank space string its provided', () => {
        const blankSpaceString = ' ';

        const validationFn = () => validateNotEmpty(blankSpaceString);

        expect(validationFn).toThrow();

    });

    it('should throw an error with the provided error message', () => {
        const emptyString = '';
        const errorMessage = 'Something went wrong :D';

        const validationFn = () => validateNotEmpty(emptyString, errorMessage);

        expect(validationFn).toThrow();

    });



});
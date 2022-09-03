import { it, expect, describe, beforeEach } from 'vitest';
import { HttpError, ValidationError } from './errors.js';

describe('class HttpError', () => {

    let httpError;
    let statusCode = 500;
    let message = 'Something went wrong';
    let data = 'dummy data :D';

    beforeEach(() => {
        httpError = new HttpError(statusCode, message, data);
    });

    it('should contain the property statusCode', () => {
        expect(httpError).toHaveProperty('statusCode');
    });

    it('should store the provided statusCode value', () => {
        expect(httpError.statusCode).toBe(statusCode);
    });

});


describe('class ValidationError', () => {

    let validationError;
    let message = 'validation message';

    beforeEach(() => {
        validationError = new ValidationError(message);
    });

    it('should contain the property message', () => {
        expect(validationError).toHaveProperty('message');
    });

    it('should store the provided message value', () => {
        expect(validationError.message).toBe(message);
    });
});
import { describe, it, expect, vi } from "vitest";
import { generateReportData } from './data.js';

//Spies

describe('generateReportData()', () => {

    it('should execute logFn if provided', () => {
        const loggerSpy = vi.fn();
        // crea una función vacía que trackea cualquier ejecución que se realice de ella
        // generateReportData recibe al cb logFn como parámetro

        // podemos especificar que el mock a utilizar lo sea solo por este test
        // loggerSpy.mockImplementationOnce(() => { });

        generateReportData(loggerSpy);
        expect(loggerSpy).toBeCalled();
    });


});

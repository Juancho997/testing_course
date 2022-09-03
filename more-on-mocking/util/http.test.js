import { it, expect, vi } from 'vitest';
import { HttpError } from './errors.js';
import { sendDataRequest } from './http.js';

// Para entender este test, leer 
// https://developer.mozilla.org/en-US/docs/Web/API/Response
// https://developer.mozilla.org/en-US/docs/Web/API/Response/json

// Estamos configurando el mock de fetch para que al llamarlo, nos responda correctamente 


const testResponseData = { testKey: 'testData' };

const testFetch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        if (typeof options.body !== 'string') {
            return reject('Not a string');
        }
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testResponseData);
                })
            }
        };
        resolve(testResponse);
    })
});

// este método nos ayuda a reemplazar objetos o funciones que estén disponibles globalmente
// primero pasamos el objeto, y luego el reemplazo su reemplazo,que será llamado cuando llamemos al primero
vi.stubGlobal('fetch', testFetch);



it('should return any available response data', () => {
    const testData = { key: 'test' };

    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
    // expect(sendDataRequest(testData)).toBeDefined(); //también funciona

});

it('should convert the provided data to JSON before sending it', async () => {
    const testData = { key: 'test' };
    let errorMessage;

    try {
        await sendDataRequest(testData);
    } catch (error) {
        errorMessage = error;
    }

    expect(errorMessage).not.toBe('Not a string');
});

it('should throw an HttpError in case of non-ok responses', () => {
    //implemento para este test, este mock de testFetch
    testFetch.mockImplementationOnce((url, options) => {
        return new Promise((resolve, reject) => {
            const testResponse = {
                ok: false, //para verificar si se arroja el tipo de error buscado
                json() {
                    return new Promise((resolve, reject) => {
                        resolve(testResponseData);
                    })
                }
            };
            resolve(testResponse);
        })
    });
    const testData = { key: 'test' };

    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
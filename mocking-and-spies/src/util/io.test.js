import { it, expect, vi } from 'vitest';

// 4. importo este módulo, lleno de funciones espías gracias a vi.mock() 
import { promises as fs } from 'fs';
import { path } from 'path';


import writeFile from './io.js';


vi.mock('fs');
// 1. le indicamos el nombre del módulo que queremos mockear
// 2. Si no le pasamos configuraciones, Vitest empleará su algoritmo de automocking para llenar de funciones espías el módulo provisto.
// 2.1 En caso de que sí, Vitest usará la custom mock function. 
// 2.2 Podemos encontrarla en la carpeta con el nombre especial ___mocks___, el archivo con el mismo nombre del módulo objetivo

// Custom Mock 
// Buscamos extraer el último argumento con el que fue llamada al función
vi.mock('path', () => {
    return {
        default: {
            join: (...args) => {
                return args[args.length - 1]
            }
        }
    };
});

// podemos dejarlo así para testear solo la ejecución
it('should execute the writeFile method', () => {

    const testData = 'test';
    const testFilename = 'test.txt';

    writeFile(testData, testFilename);

    expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});

// y utilizar esta forma para devolver promesas(ya que la fn originalmente lo hace)
it('should return a promise that resolves to no value if called correctly', () => {

    const testData = 'test';
    const testFilename = 'test.txt';

    writeFile(testData, testFilename);

    return expect(writeFile(testData, testFilename)).resolves.toBeUndefined();
});

// OG
it('should execute the writeFile method', () => {

    const testData = 'test';
    const testFilename = 'test.txt';

    //5. llamo a la función a testear
    writeFile(testData, testFilename);

    // return expect(writeFile(testData, testFilename)).resolves.toBeUndefined(); => 3. da error ya que no llamamos al módulo empleado en esta función, sino a 'fs' mockeado

    // 6. checkeo que la 'función espía' de fs fue llamada
    // expect(fs.writeFile).toBeCalled();

    // llamada del custom mock
    // testData fue pasado como 2º argumento
    expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});

// Mocks

// Cuando debemos llamar módulos, tanto propios como de 3º's, usamos mocks
// Evitamos efectos secundarios (en este caso, grabar archivos en el disco) no deseados.
// El mocking solo afecta a los tests, no al código.
// Los módulos mockeados están disponibles para todos los test. Por ello, Vitest escanea que test usan el módulo, sin llamar a vi.mock(), y los ejecuta primero para evitar errores.
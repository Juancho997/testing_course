// importamos fs y path para abrir el index.html y emularlo virtualmente con happy-dom
import fs from 'fs';
import path from 'path';

import { expect, it, vi, beforeEach } from 'vitest';
// importamos Window desde happy-dom para emular un obj window
import { Window } from 'happy-dom';

import { showError } from './dom.js';

// Localizamos el index.html
const htmlDocPath = path.join(process.cwd(), 'index.html');
// Lo leemos y convertimos en string para cargarlo al DOM emulado
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

// crea un browser emulado con una página cargada que podemos configurar
const window = new Window();
// y accedemos al document dentro de él
const document = window.document;
// ahora, pasamos los datos del index.html a nuestro document
// document.write(htmlDocumentContent);
// mockeamos el document con el document emulado
vi.stubGlobal('document', document);
// de esta manera, tenemos acceso al index.html renderizado en un document emulado, con todas sus propiedades y métodos, posible de ser testeado

beforeEach(() => {
    document.body.innerHTML = '';
    document.write(htmlDocumentContent);
    // lo escribo aquí para reiniciar el document, ya que el 1º test, al llamar a showError lo  estamos escribiendo y el document queda modificado en todos los casos
});

it('should add an error paragraph to the id="errors" element', () => {
    showError('test');

    // accedemos al
    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;

    expect(errorParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;

    expect(errorParagraph).toBeNull();

});

it('should output the provided message in the error paragraph', () => {
    const testErrorMessage = 'Test';

    showError(testErrorMessage);

    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;

    expect(errorParagraph.textContent).toBe(testErrorMessage);

});
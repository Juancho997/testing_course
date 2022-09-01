import { it, expect, beforeAll, beforeEach, afterAll, afterEach, describe } from 'vitest';

import { User } from './hooks';


// Al refactorizar el código original, y establecer variables globales, Vitest puede fallar debido a errores en el scope 
const testEmail = 'test@test.com';
let user;


// Los hooks nos permiten realizar acciones en momentos específicos de la ejecución del test 
// En este caso, jugamos con la (re)asignación de las variables según sea conveniente.


// Antes de correr todos los test podríamos inicializar una variable global previamente definida  
beforeAll(() => {
  user = new User(testEmail);
});


// Antes de cada test
beforeEach(() => {
  user = new User(testEmail);
});


// Después de cada test
afterEach(() => {
  user = new User(testEmail);
});


// Después de correr todos los test podríamos, por ejemplo, ejecutar una limpieza en el sistema de un archivo creado para testear cierta unit 
afterAll(() => {
  // limpieza final
})


// Podemos acelerar el proceso de testing añadiendo concurrent()
// en cada test ( it.concurrent(...)  )
// o luego de un describe() para aplicarlo a todo el suite
// Muy útil cuando tengamos muchos test

/**
 * Even when not adding the .concurrent property / annotation, tests that are stored in different files are executed concurrently (i.e., in parallel). This is done by both Vitest and Jest - ensuring that your tests run in a short amount of time.
  With .concurrent you can enforce this behavior also inside the individual files (i.e., tests that live in one and the same file are executed concurrently).
  Concurrent execution can reduce the amount of time your tests need to execute. A downside of concurrent execution is, that tests that perform clashing (global) state manipulations may interfere with each other.
 */

describe.concurrent('User()', () => {

  it('should update the email', () => {
    const newTestEmail = 'test2@test.com';
    user.updateEmail(newTestEmail);
    expect(user.email).toBe(newTestEmail);
  });

  it('should have an email property', () => {
    expect(user).toHaveProperty('email');
  });

  it('should store the provided email value', () => {
    expect(user.email).toBe(testEmail);
  });

  it('should clear the email', () => {
    user.clearEmail();
    expect(user.email).toBe('');
  });

  it('should still have an email property after clearing the email', () => {
    user.clearEmail();
    expect(user).toHaveProperty('email');
  });

});
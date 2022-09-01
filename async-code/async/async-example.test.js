import { describe, it, expect } from 'vitest';
import { generateToken, generateTokenPromise } from './async-example.js';

//* Testeando códido async

describe('generateToken()', () => {
    //* con callbacks 
    it('should generate a token value', (done) => {

        const testUserEmail = 'test@test.com';

        generateToken(testUserEmail, (err, token) => {

            try {

                expect(token).toBeDefined();
                done(); // => le decimos a Vitest que ejecute done() una vez que termine con la fn async jwt.sign
                // caso contrario, no esperará y siempre dará el test como pasado, ya que nunca esperó a que jwt.sign() termine de ejecutarse

            } catch (err) {
                done(error);
            }

        });
    });

    //*con Promesas
    it('should generate a token value', () => {
        const testUserEmail = 'test@test.com';

        return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
        // 'expect' puede manjear promesas
        // 'resolves' cuando espero que la promesa se cumpla 
        // 'rejects' caso contrario
    });

    //*con Async/Await
    it('should generate a token value', async () => {
        const testUserEmail = 'test@test.com';

        const token = await generateTokenPromise(testUserEmail)

        expect(token).toBeDefined();

    });

});
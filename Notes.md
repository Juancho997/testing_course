
# Qué testear?
- Una "cosa", una "unit" : Una feature o un comportamiento POR test.
- Por lo general, una función.
- Entra en juego la calidad de su lógica, qué y cuántos comportamientos tiene, si es modularizable, etc.
- Que esa "unit", sea TUYA : no testear lógica que no has escrito, o llamados a API´s de terceros.
- Se testea lo que se crea y utiliza, no lo que simplemente se utiliza. 


# Keep it simple!
- Solo los datos necesarios para que el test funcione correctamente
- Agrega valor a mi test sumarle x dato?

# Patrón AAA (Arrange, Act, Assert)
- Description : Que se espera del test? Tiene estricta relación con loa valores del Arrange.
- Arrange : enfocarse en la esencia del test (qué busco testear?). Valores base de arranque. Deben coincidir con el objetivo del test.
- Mantener el número de "expects" bajos (un test, un comportamiento)

```
    it('should sumarize all number values in an array', () => {
        => Arrange
        const numbers = [1, 2];

        => Act
        const result = add(numbers);

        => Assert
        const expectedResult = numbers.reduce((prevValue, currValue) => prevValue + currValue, 0); //evitar hardcodear el resultado
        expect(result).toBe(expectedResult);
    });

```
# Code => Test => Rewrite Code => Rewrite Test =>  ...

- Testear es un proceso iterativo, podemos testear cuantas veces sea necesario para lograr el comportamiento esperado de nuestro código
- De esta forma, podemos reconocer mejoras en la lógica de nuestras funciones, modificándolas para acercanos cada vez más al comportamiento deseado.
- Así, por ejemplo, podríamos simplificar una función al modularizar sus comportamientos en funciones e invocarlas dentro de la función principal.


# INTEGRATION TEST
- Testear unidades que llaman o funcionan con unidades externas (API's de terceros, integradas o funciones propias).
- La idea es verificar el correcto funcionamiento de unidades combinadas, ya que por si solas pueden pasar los test pero en conjunto no.


# Integration Test vs. Unit Test
- Debemos apuntar a escribir la mayor cantidad de funciones "unitarias" posibles, pero no que hagan el código y el flujo ilegibles. No modularizar por modularizar.
- Por supuesto, debemos testear estas funciones unitarias.
- Así también, en el caso de unidades combinadas, debemos testear para verificar el correcto funcionamiento de la lógica en conjunto.
- Por lo general, tendremos más test unitarios que integrados.
- Así también, se recomienda aplicar End-to-End test (E2E).

# toBe() != toEqual()
- toBe() verifica una igualdad absoluta, es decir, que el objeto que se pase como resultado sea IDENTICO al objeto esperado. 
- Compara que sean el mismo espacio en memoria.
- toEqual() verifica que los valores sean iguales, mas no el espacio de memoria
=> https://academind.com/tutorials/reference-vs-primitive-values


# Trabajando con código asíncrono
- Vitest soporta código asíncrono
- Para testearlo, podemos hacerlo de tres maneras


    
    ### //==> con callbacks 
    - Debemos indicarle a Vitest que "espere" la resolución del código asíncrono (jwt.sign()). 
    - Para ello, utilizamos done() luego de expect() para que dé por finalizado el test luego de la resolución asíncrona.
    - Caso contrario, no esperará y siempre dará el test como pasado (falso positivo), ya que nunca esperó a que jwt.sign() termine de ejecutarse.
    - Así también, podemos utilizar try/catch para capturar todos los errores que surjan y poder visualizarlos mejor.  
 
    ```
    it('should generate a token value', (done) => {

        const testUserEmail = 'test@test.com';

        generateToken(testUserEmail, (err, token) => {

            try {
                expect(token).toBeDefined();
                done(); 

            } catch (err) {
                done(error);
            }

        });
    });

    ```
    
    ### //==> con Promesas
    - 'expect' puede manjear promesas
    - 'resolves' cuando espero que la promesa se cumpla 
    - 'rejects' caso contrario


    ```
    it('should generate a token value', () => {

        const testUserEmail = 'test@test.com';

        return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();

    });
    
    ```

    ### //==>con Async/Await
    ```
    it('should generate a token value', async () => {
        
        const testUserEmail = 'test@test.com';

        const token = await generateTokenPromise(testUserEmail)

        expect(token).toBeDefined();

    });
    ```


# Manejando errores
- Cuando nuestro test busca que la unit arroje un error (como consecuencia de su propio funcionamiento) debemos envolver dicho código en una función, de otra forma el error no será capturado y la aserción fallará.
- Podemos utilizar toThrow() o métodos similares para atrapar errores en gral o algún error específico. toThrow() puede recibir un string o una expresión regular para buscar el mensaje de un error en particular.

```
    it('should throw an error when a blank space string its provided', () => {
        const emptyString = ' ';

        const validationFn = () => validateNotEmpty(emptyString);

        expect(validationFn).toThrow();

    });
```


# Mock & Spies
 - Guiarse con los ejemplos prácticos.

## Mocks
- Cuando debemos llamar módulos, tanto propios como de 3º's, usamos mocks
- Evitamos efectos secundarios no deseados durante la ejecución de los test.
- El mocking solo afecta a los tests, no al código.
- Los módulos mockeados están disponibles para todos los test. Por ello, Vitest escanea qué test usan el módulo, sin llamar a vi.mock(), y los ejecuta primero para evitar errores.
- Se puede utilizar el método vi.mockImplementationOnce(() => { }) para utilizar el mock solo en el test donde es llamado.
- Podemos implementar custom mocks tanto en el mismo archivo del test, como en la carpeta __mocks__ destinada a ese fin. Allí, creamos archivos .js con el nombre del módulo a mockear.

## Spies
- Funciones vacías que trackean cualquier ejecución que se realice de ella.
- Se suelen pasar como parámetro cuando la función recibe cb's para su funcionamiento.

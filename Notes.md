
# QUE testear?
- Una "cosa", una "unit" : Una feature o un comportamiento POR test
- Por lo general, una función
- Entra en juego la calidad de su lógica, qué y cuántos comportamientos tiene, si es modularizable, etc.

- Que esa "cosa", sea TUYA : no testear lógica que no has escrito, o llamados a API´s de terceros.
- Se testea lo que se crea y utiliza, no lo que simplemente se utiliza. 


# Keep it simple!
- Solo los datos necesarios para que el test funcione correctamente
- Agrega valor a mi test sumarle x dato?

# Patrón AAA (Arrange, Act, Assert)

    it('should sumarize all number values in an array', () => {
        => Arrange
        const numbers = [1, 2];

        => Act
        const result = add(numbers);

        => Assert
        const expectedResult = numbers.reduce((prevValue, currValue) => prevValue + currValue, 0); //evitar hardcodear el resultado
        expect(result).toBe(expectedResult);
    });


# Code => Test => Rewrite Code => Rewrite Test =>  ...

- Testear es un proceso iterativo, podemos testear cuantas veces sea necesario para lograr el comportamiento esperado de nuestro código
- De esta forma, podemos reconocer mejoras en la lógica de nuestras funciones, modificándolas para acercanos cada vez más al comportamiento deseado.
- Así, por ejemplo, podríamos simplificar una función al modularizar sus comportamientos en funciones e invocarlas dentro de la función principal.

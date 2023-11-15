import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Función para obtener una posición aleatoria en la pantalla
const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
});

// Función para obtener un color hexadecimal aleatorio
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

// Definición del componente principal ContadorResponsive
const ContadorResponsive = () => {
    // Estado para el contador
    const [contador, setContador] = useState(0);

    // Estado para almacenar las pelotas y sus propiedades (posición y color)
    const [pelotas, setPelotas] = useState([]);

    // Estado para controlar la visibilidad del mensaje inicial
    const [mostrarMensaje, setMostrarMensaje] = useState(true);

    // Función para incrementar el contador y agregar una nueva pelota
    const incrementar = () => {
        setContador(contador + 1);
        const nuevaPelota = {
            id: pelotas.length + 1,
            position: getRandomPosition(),
            color: getRandomColor(),
        };
        setPelotas([...pelotas, nuevaPelota]);
    };

    // Función para decrementar el contador y eliminar la última pelota
    const decrementar = () => {
        if (contador > 0) {
            setContador(contador - 1);
            setPelotas(pelotas.slice(0, -1));
        }
    };

    // Función para resetear el contador y eliminar todas las pelotas
    const reset = () => {
        setContador(0);
        setPelotas([]);
    };

    // Efecto de montaje para ocultar el mensaje después de 5 segundos
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMostrarMensaje(false);
        }, 5000);

        // Limpiar el temporizador cuando el componente se desmonta
        return () => clearTimeout(timeoutId);
    }, []);

    // Renderizado del componente
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            h="100vh"
            w="100vw"
            overflow="hidden"
        >
            <Flex direction="column" align="center" justify="center">
                {/* Mostrar el mensaje inicial si mostrarMensaje es true */}
                {mostrarMensaje && (
                    <Text mb="4">
                        Haz clic en las pelotitas
                    </Text>
                )}

                {/* Mostrar el contador */}
                <motion.div
                    initial={{ scale: 2 }}
                    style={{ zIndex: 2 }}
                >
                    Contador: {contador}
                </motion.div>

                {/* Mostrar las pelotas en posiciones aleatorias */}
                <Flex mt="4" mb="4" wrap="wrap">
                    {pelotas.map((pelota) => (
                        <motion.div
                            key={pelota.id}
                            whileTap={{ scale: 2 }}
                            style={{
                                position: 'absolute',
                                left: pelota.position.x,
                                top: pelota.position.y,
                                width: '20px',
                                height: '20px',
                                background: pelota.color,
                                borderRadius: '50%',
                                marginRight: '5px',
                            }}
                        />
                    ))}
                </Flex>

                {/* Botones para incrementar, resetear y decrementar el contador */}
                <Flex mt="4" wrap="wrap">
                    <Button
                        as={motion.button}
                        onClick={incrementar}
                        whileHover={{ scale: 1.1, backgroundColor: "#2ecc71", color: "#ffffff" }}
                        whileTap={{ scale: 0.9 }}
                        colorScheme="green"
                        mx="2"
                        px="10"
                    >
                        +
                    </Button>

                    <Button
                        as={motion.button}
                        onClick={reset}
                        whileHover={{ scale: 1.1, backgroundColor: "#999c9b", color: "#ffffff" }}
                        whileTap={{ scale: 0.9 }}
                        colorScheme="gray"
                        mx="2"
                        px="10"
                    >
                        Reset
                    </Button>

                    <Button
                        as={motion.button}
                        onClick={decrementar}
                        whileHover={{ scale: 1.1, backgroundColor: "#e74c3c", color: "#ffffff" }}
                        whileTap={{ scale: 0.9 }}
                        colorScheme="red"
                        mx="2"
                        px="10"
                        isDisabled={contador <= 0}
                    >
                        -
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};


export default ContadorResponsive;

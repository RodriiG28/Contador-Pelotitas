import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
});

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const ContadorResponsive = () => {
    const [contador, setContador] = useState(0);
    const [pelotas, setPelotas] = useState([]);
    const [mostrarMensaje, setMostrarMensaje] = useState(true);

    const incrementar = () => {
        setContador(contador + 1);
        const nuevaPelota = {
            id: pelotas.length + 1,
            position: getRandomPosition(),
            color: getRandomColor(),
        };
        setPelotas([...pelotas, nuevaPelota]);
    };

    const decrementar = () => {
        if (contador > 0) {
            setContador(contador - 1);
            setPelotas(pelotas.slice(0, -1));
        }
    };

    const reset = () => {
        setContador(0);
        setPelotas([]);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMostrarMensaje(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            height="100vh"
            width="100vw"
            overflow="hidden"
        >
            <Flex direction="column" align="center" justify="center">
                {mostrarMensaje && (
                    <Text mb="25">
                        Haz clic en las pelotitas
                    </Text>
                )}

                <motion.div
                    initial={{ scale: 2 }}
                    style={{ zIndex: 2 }}
                >
                    Contador: {contador}
                </motion.div>

                <Flex mt="4" mb="4">
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

                <Flex mt="4">
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

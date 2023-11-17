import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import popSound from '/assets/sounds/pop.mp3';

const ContadorResponsive = () => {
    // Estados para el contador, las pelotas, el mensaje inicial y la reproducción de sonido
    const [contador, setContador] = useState(0);
    const [pelotas, setPelotas] = useState([]);
    const [mostrarMensaje, setMostrarMensaje] = useState(true);
    const [playSound, setPlaySound] = useState(false);

    // Función para obtener una posición aleatoria en la pantalla
    const getRandomPosition = () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
    });

    // Función para obtener un color hexadecimal aleatorio
    const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Función para incrementar el contador y agregar una nueva pelota
    const incrementar = () => {
        setContador(contador + 1);
        const nuevaPelota = {
            id: pelotas.length + 1,
            position: getRandomPosition(),
            color: getRandomColor(),
            numero: pelotas.length + 1, // Número de pelota
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

    // Función para manejar el clic en una pelota
    const handleClick = (pelotaId) => {
        // Busca la pelota por su id
        const pelotaAEliminar = pelotas.find((pelota) => pelota.id === pelotaId);
    
        // Si la encuentra, realiza la resta y elimina la pelota
        if (pelotaAEliminar) {
            setContador(contador - 1);
            setPelotas(pelotas.filter((pelota) => pelota.id !== pelotaId));
        }
    
        // Activa la reproducción del sonido
        setPlaySound(true);
    };

    // Efecto para reproducir el sonido cuando playSound cambia a true
    useEffect(() => {
        if (playSound) {
            const audio = new Audio(popSound);
            audio.play();
            setPlaySound(false); // Reinicia el estado para la próxima reproducción
        }
    }, [playSound]);

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
                    <Text mb="4" fontSize="2xl">
                        Haz clic en las pelotitas
                    </Text>
                )}

                {/* Mostrar el contador */}
                <motion.div initial={{ scale: 2 }} style={{ zIndex: 2, fontSize: '2rem' }}>
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
                                width: '40px',
                                height: '40px',
                                background: pelota.color,
                                borderRadius: '50%',
                                marginRight: '10px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={() => handleClick(pelota.id)}
                        >
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                {pelota.numero}
                            </span>
                        </motion.div>
                    ))}
                </Flex>
            </Flex>

            {/* Botones para incrementar, resetear y decrementar el contador */}
            <Flex mt="4" wrap="wrap">
                <Flex mt="4" wrap="wrap">
                    <Button
                        as={motion.button}
                        onClick={decrementar}
                        whileHover={{ scale: 1.1, backgroundColor: '#e74c3c', color: '#ffffff' }}
                        whileTap={{ scale: 0.9 }}
                        colorScheme="red"
                        mx="2"
                        px={{ base: '10', md: '16' }}
                        fontSize={{ base: 'xl', md: '2xl' }}
                        isDisabled={contador <= 0}
                    >
                        -
                    </Button>

                    <Button
                        as={motion.button}
                        onClick={reset}
                        whileHover={{ scale: 1.1, backgroundColor: '#999c9b', color: '#ffffff' }}
                        whileTap={{ scale: 0.9 }}
                        colorScheme="gray"
                        mx="2"
                        px={{ base: '10', md: '16' }}
                        fontSize={{ base: 'xl', md: '2xl' }}
                    >
                        Reset
                    </Button>

                    <Button
                        as={motion.button}
                        onClick={incrementar}
                        whileHover={{ scale: 1.1, backgroundColor: '#2ecc71', color: '#ffffff' }}
                        whileTap={{ scale: 0.9 }}
                        colorScheme="green"
                        mx="2"
                        px={{ base: '10', md: '16' }}
                        fontSize={{ base: 'xl', md: '2xl' }}
                    >
                        +
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ContadorResponsive;

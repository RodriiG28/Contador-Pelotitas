import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import popSound from '/assets/sounds/pop.mp3';

const ContadorResponsive = () => {
    // Estados para el contador, las pelotas, el mensaje inicial y la reproducción de sonido
    const [contador, setContador] = useState(0);
    const [pelotas, setPelotas] = useState([]);
    const [mostrarMensaje, setMostrarMensaje] = useState(true);
    const [playSound, setPlaySound] = useState(false);

    // Función para obtener una posición aleatoria en el área visible de la pantalla
    const getRandomPosition = () => ({
        x: Math.random() * (window.innerWidth - 50),  // Evita que la pelota se salga del lado derecho
        y: Math.random() * (window.innerHeight - 50), // Evita que la pelota se salga del lado inferior
    });

    // Función para obtener un color hexadecimal aleatorio
    const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Animación para el contador
    const contadorAnimation = useAnimation();

    // Animación para el mensaje
    const mensajeAnimation = useAnimation();

    // Efecto para la animación del contador al incrementar
    useEffect(() => {
        contadorAnimation.start({
            scale: [3, 5],
            color: ['#3498db', '#e74c3c'],
            transition: { duration: 0.5 },
        });
    }, [contador, contadorAnimation]);

    // Efecto para la animación del mensaje al mostrarse
    useEffect(() => {
        mensajeAnimation.start({
            opacity: [0, 1],
            y: [0, -50],
            transition: { duration: 0.5 },
        });
    }, [mostrarMensaje, mensajeAnimation]);

    // Función para actualizar el estado de las pelotas
    const actualizarPelotas = (nuevaPelota) => {
        setPelotas((prevPelotas) => [...prevPelotas, nuevaPelota]);
    };

    // Función para incrementar el contador y agregar una nueva pelota
    const incrementar = () => {
        setContador((prevContador) => prevContador + 1);
        const nuevaPelota = {
            id: pelotas.length + 1,
            position: getRandomPosition(),
            color: getRandomColor(),
        };
        actualizarPelotas(nuevaPelota);
    };

    // Función para decrementar el contador y eliminar la última pelota
    const decrementar = () => {
        if (contador > 0) {
            setContador((prevContador) => prevContador - 1);
            setPelotas((prevPelotas) => prevPelotas.slice(0, -1));
        }
    };

    // Función para eliminar una pelota por su id
    const eliminarPelota = (pelotaId) => {
        setPelotas((prevPelotas) => {
            const pelotaAEliminar = prevPelotas.find((pelota) => pelota.id === pelotaId);

            if (pelotaAEliminar) {
                setContador((prevContador) => prevContador - 1);
                setPlaySound(true);
                return prevPelotas.filter((pelota) => pelota.id !== pelotaId);
            }

            return prevPelotas;
        });
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

    // Efecto para reproducir el sonido cuando playSound cambia a true
    useEffect(() => {
        if (playSound) {
            const audio = new Audio(popSound);
            audio.play();
            setPlaySound(false);
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
            fontFamily="Comic Sans MS"
        >
            <Flex direction="column" align="center" justify="center">
                {/* Mostrar el mensaje inicial si mostrarMensaje es true */}
                <motion.div animate={mensajeAnimation} mb="4" fontSize="2xl">
                    {mostrarMensaje && '¡Dale a las pelotitas un toque mágico con un clic!'}
                </motion.div>

                {/* Mostrar el contador */}
                <motion.div animate={contadorAnimation} fontSize="4rem">
                    {contador}
                </motion.div>

                {/* Mostrar las pelotas en posiciones aleatorias */}
                <Flex mt="4" mb="4" wrap="wrap">
                    {pelotas.map(({ id, position, color }) => (
                        <motion.div
                            key={id}
                            whileTap={{ scale: 2 }}
                            style={{
                                position: 'absolute',
                                left: Math.min(window.innerWidth - 40, Math.max(0, position.x)),
                                top: Math.min(window.innerHeight - 40, Math.max(0, position.y)),
                                width: '40px',
                                height: '40px',
                                background: color,
                                borderRadius: '50%',
                                marginRight: '10px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 3,
                            }}
                            // Manejar clic en la pelota para eliminarla
                            onClick={() => eliminarPelota(id)}
                        />
                    ))}
                </Flex>
            </Flex>

            {/* Botones para incrementar, resetear y decrementar el contador */}
            <Flex mt="4" wrap="wrap">
                <Flex mt="4" wrap="wrap">
                    {/* Botón para decrementar */}
                    <Button
                        as={motion.button}
                        onClick={decrementar}
                        whileHover={{ scale: 1.1, backgroundColor: '#e74c3c', color: '#ffffff' }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        colorScheme="red"
                        mx="2"
                        px={{ base: '10', md: '16' }}
                        fontSize={{ base: 'xl', md: '2xl' }}
                        isDisabled={contador <= 0}
                    >
                        -
                    </Button>

                    {/* Botón para resetear */}
                    <Button
                        as={motion.button}
                        onClick={reset}
                        whileHover={{ scale: 1.1, backgroundColor: '#999c9b', color: '#ffffff' }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        colorScheme="gray"
                        mx="2"
                        px={{ base: '10', md: '16' }}
                        fontSize={{ base: 'xl', md: '2xl' }}
                    >
                        Reset
                    </Button>

                    {/* Botón para incrementar */}
                    <Button
                        as={motion.button}
                        onClick={incrementar}
                        whileHover={{ scale: 1.1, backgroundColor: '#2ecc71', color: '#ffffff' }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
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

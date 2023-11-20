import React, { useState, useEffect } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import popSound from '/assets/sounds/pop.mp3';

const ContadorResponsive = () => {
  // Estados para el contador, las pelotas, el mensaje inicial y la reproducción de sonido
  const [contador, setContador] = useState(0);
  const [pelotas, setPelotas] = useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(true);
  const [playSound, setPlaySound] = useState(false);

  // Estado para almacenar el tamaño de la ventana
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Función para obtener una posición aleatoria en el área visible de la pantalla
  const getRandomPosition = () => ({
    x: Math.random() * (window.innerWidth - 50),
    y: Math.random() * (window.innerHeight - 50),
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

  // Función para manejar el cambio de tamaño de la ventana
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
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

  // Efecto para manejar el evento de cambio de tamaño de la ventana
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Número máximo de pelotas por fila
  const maxPelotasPerRow = 5;
    
return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      width="100%"
      overflow="hidden"
      fontFamily="Comic Sans MS"
    >
      <Flex direction="column" align="center" justify="center" width="100%">
        <motion.div animate={mensajeAnimation} mb="4" fontSize={{ base: 'xl', md: '2xl' }}>
          {mostrarMensaje && '¡Dale a las pelotitas un toque mágico con un clic!'}
        </motion.div>
  
        <motion.div animate={contadorAnimation} fontSize={{ base: '2rem', md: '4rem' }}>
          {contador}
        </motion.div>
  
        <Flex mt="4" mb="4" wrap="wrap" justifyContent="center">
          {pelotas.map(({ id, position, color }) => (
            <motion.div
              key={id}
              whileTap={{ scale: 2 }}
              style={{
                position: 'absolute',
                left: Math.min(windowSize.width - 40, Math.max(0, position.x)),
                top: Math.min(windowSize.height - 40, Math.max(0, position.y)),
                width: '40px',
                height: '40px',
                background: color,
                borderRadius: '50%',
                marginRight: '10px',
                marginBottom: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                border: '2px solid black',
              }}
              onClick={() => eliminarPelota(id)}
            />
          ))}
        </Flex>
      </Flex>
  
      <Flex mt="4" wrap="wrap" justifyContent="center">
        <Flex mt="4" wrap="wrap">
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
}

export default ContadorResponsive;

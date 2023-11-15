import { ChakraProvider } from '@chakra-ui/react'
import ContadorResponsive from './Components/ContadorResponsive'


const App = () => {
  return (
    <ChakraProvider>
      <ContadorResponsive />
    </ChakraProvider>
    
  )
}

export default App

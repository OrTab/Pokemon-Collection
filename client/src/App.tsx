import { Provider } from "react-redux";
import { store } from "./store";
import { Pokemons } from "./pages/Pokemons";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Message } from "./components/Message";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Provider store={store}>
        <Pokemons />
        <Message />
      </Provider>
    </ChakraProvider>
  );
}

export default App;

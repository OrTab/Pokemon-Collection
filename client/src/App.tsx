import { Provider } from "react-redux";
import { store } from "./store";
import { Pokemons } from "./pages/Pokemons";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Provider store={store}>
        <Pokemons />
      </Provider>
    </ChakraProvider>
  );
}

export default App;

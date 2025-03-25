import { Provider } from "react-redux";
import { store } from "./store";
import { Pokemons } from "./pages/Pokemons";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Message } from "./components/Message";
import { GlobalStyles } from "./globalStyles";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Provider store={store}>
        <GlobalStyles />
        <Pokemons />
        <Message />
      </Provider>
    </ChakraProvider>
  );
}

export default App;

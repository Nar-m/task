import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import ContextProvider from "./component/ContextProvider/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Header />
      <Home />
    </ContextProvider>
  )
}

export default App

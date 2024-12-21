import "./App.css";
import { Pickles } from "./components/pickles";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Pickles />
    </div>
  );
}

export default App;

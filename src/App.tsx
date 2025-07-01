import Router, { Route, Switch } from "crossroad";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";
import PokemonList from "./pages/PokemonList";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="w-full max-w-screen-xl mx-auto my-0 p-4">
        <Switch>
          <Route path="/" component={PokemonList} />
          <Route path="/?pokemon" component={PokemonList} />
          <Route path="/details/:pokemon" component={Details} />
          <Route>404</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

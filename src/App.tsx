import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import { Route, Switch } from "wouter";
import Details from "./pages/Details";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-screen-xl mx-auto my-0 p-4">
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/:pokemon" component={Main} />
          <Route path="/details/:pokemon" component={Details} />
          <Route>404</Route>
        </Switch>
      </div>
    </>
  );
}

export default App;

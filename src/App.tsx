import Navbar from "@/components/Navbar";
import Details from "@/pages/Details";
import HomePage from "@/pages/HomePage";
import Router, { Route, Switch } from "crossroad";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen text-primary-text">
        {/* Background blobs container - positioned behind content */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-[10%] w-[120%] h-96 rounded-full blur-[150px] bg-emerald-500/10" />
        </div>

        {/* Main content - positioned above background */}
        <div className="relative z-0">
          <Navbar />
          <div className="w-full max-w-screen-xl mx-auto my-0 p-4">
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/?pokemon" component={HomePage} />
              <Route path="/details/:pokemonName<string>" component={Details} />
              <Route>404</Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

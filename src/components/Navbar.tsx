import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="bg-secondary text-white w-full p-4 text-center shadow-lg">
      <Link to="/">
        <span className="text-6xl">Pokédex</span>
      </Link>
    </nav>
  );
}

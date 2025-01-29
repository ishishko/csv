import { Link } from "react-router-dom";
import './navbar.css';

const NavBar = () => {
  return (
    <nav id='navbar' className="flex items-center justify-between w-[98.5%] p-2 m-2 rounded-lg max-h-28">
      <div id="title" className="rounded-lg">
        <h1 className="text-4xl font-normal text-center">Papua New Guinea</h1>
        <h1 className="text-4xl font-bold text-center">Fishes</h1>
      </div>
      <div id="links" className="flex items-center justify-center w-3/4 text-gray-800">
        <Link to="/" className="p-2 px-8 m-2 text-xl font-bold text-center">Home</Link>
        <Link to="/fishes" className="p-2 m-2 text-xl font-bold text-center">Fishes</Link>
        <Link to="/galery" className="p-2 m-2 text-xl font-bold text-center">Galery</Link>
      </div>
    </nav>
  );
};

export default NavBar;
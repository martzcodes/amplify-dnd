import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header bg-white relative border-b-2 border-blue-700">
      <div>Amplify-DND</div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tile">Tile</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;

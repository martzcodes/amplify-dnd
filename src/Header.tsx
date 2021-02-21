import { AuthState } from "@aws-amplify/ui-components";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

function Header({ authState }: {authState: AuthState}) {
  return (
    <header className="header bg-white relative border-b-2 border-blue-700">
      <div>Amplify-DND</div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tile">Tile Set</Link>
          </li>
          { authState === AuthState.SignedIn ? <li><AmplifySignOut></AmplifySignOut></li> : <></> }
        </ul>
      </div>
    </header>
  );
}
export default Header;

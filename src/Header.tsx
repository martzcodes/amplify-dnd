import { AuthState } from "@aws-amplify/ui-components";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

function Header({ authState, email }: {authState: AuthState, email?: string}) {
  const active =
    "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
  const inactive =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center text-white text-bold">
              Amplify-DND
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className={inactive}>
                  Home
                </Link>
                <Link to="/public" className={inactive}>
                  Public Games
                </Link>
                <Link to="/games" className={inactive}>
                  My Games
                </Link>
                <Link to="/tile" className={inactive}>
                  Tile Set
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {email ? <div className={inactive}>Hello, {email}</div> : <></>}
            <AmplifySignOut></AmplifySignOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;

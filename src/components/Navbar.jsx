import { NavigationMenu } from "radix-ui";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { logout } from "../managers/authManager";

export const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <NavigationMenu.Root className="nav-bar-menu" orientation="horizontal">
      <NavigationMenu.List className="NavigationMenuList">
        <div className="navbar-left">
          <NavigationMenu.Item>
            <NavigationMenu.Link className="NavigationMenuLink" href="/">
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className="NavigationMenuLink">
              Watchlists
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </div>
        <div className="navbar-right">
          <NavigationMenu.Item className="NavigationMenuItem">
            <NavigationMenu.Link className="NavigationMenuLink">
              <button
                className="log-out-button"
                onClick={(e) => {
                  e.preventDefault();
                  logout().then(() => {
                    setLoggedInUser(null);
                  });
                }}
              >
                Log out
              </button>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

import { DropdownMenu, NavigationMenu } from "radix-ui";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { logout } from "../managers/authManager";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedOption("0");
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption("0");
    navigate(e.target.value);
  };

  return (
    <NavigationMenu.Root className="nav-bar-menu" orientation="horizontal">
      <NavigationMenu.List className="NavigationMenuList">
        <div className="navbar-left">
          <NavigationMenu.Item>
            <NavigationMenu.Link className="NavigationMenuLink" href="/">
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="NavigationMenuLink">
            <div className="custom-navbar-select">
              <select
                onChange={(event) => {
                  handleSelectChange(event);
                }}
                value={selectedOption}
              >
                <option value="0" className="hidden-option" selected disabled>
                  Movies
                </option>
                <option value="/all-movies">All movies</option>
                <option value="/new-movie">New Movie</option>
              </select>
            </div>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="NavigationMenuLink">
            <div className="custom-navbar-select">
              <select
                onChange={(event) => {
                  handleSelectChange(event);
                }}
                value={selectedOption}
              >
                <option value="0" className="hidden-option" selected disabled>
                  Watchlist
                </option>
                <option value="/watchlist/all">All Watchlists</option>
                <option value="/watchlist">My Watchlists</option>
                <option value="/watchlist/new">New Watchlists</option>
              </select>
            </div>
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

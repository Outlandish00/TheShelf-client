import { DropdownMenu, NavigationMenu } from "radix-ui";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { logout } from "../managers/authManager";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Navbar = ({
  loggedInUser,
  setLoggedInUser,
  setSearchedLetters,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [typedLetters, setTypedLetters] = useState("");
  useEffect(() => {
    // Function to handle mouse movement
    const handleMouseMove = (e) => {
      if (e.clientY <= 40) {
        setIsVisible(true); // Show navbar if mouse is near top
      }
    };

    // Add event listener for mouse move
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsVisible(true); // Show the navbar when hovering over the top
  };

  // Handle mouse leave when leaving the navbar.
  const handleMouseLeave = () => {
    setIsVisible(false); // Hide the navbar when mouse leaves the navbar
  };

  useEffect(() => {
    setSelectedOption("0");
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption("0");
    navigate(e.target.value);
  };

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List
        className="nav-bar-menu"
        style={{
          "--navbar-top": isVisible ? "0" : "-80px",
        }}
        onMouseEnter={() => setIsVisible(true)} // Keep navbar visible when hovered
        onMouseLeave={() => handleMouseLeave()}
      >
        <div className="nav-bar-content">
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
                  <option value="/movie/all">All movies</option>
                  <option value="/movie/new">New Movie</option>
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
            <NavigationMenu.Item className="NavigationMenuLink">
              <div className="searchbar">
                {location.pathname == "/movie/all" ? (
                  <div className="search-bar-container">
                    <FontAwesomeIcon
                      onClick={() => {
                        setSearchedLetters(typedLetters);
                      }}
                      icon={faMagnifyingGlass}
                    />
                    <input
                      type="text"
                      className="search-bar-input"
                      onChange={(event) => {
                        setTypedLetters(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setSearchedLetters(typedLetters);
                        }
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
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
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

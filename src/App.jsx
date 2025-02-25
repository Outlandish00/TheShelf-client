import { useEffect, useState } from "react";
import "./App.css";
import { tryGetLoggedInUser } from "./managers/authManager";

import ApplicationViews from "./components/ApplicationViews";
import { Navbar } from "./components/Navbar";
import { Progress } from "radix-ui";

function App() {
  const [progress, setProgress] = useState(50);
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <h2>Just a moment...</h2>;
  }

  return (
    <>
      {loggedInUser && (
        <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      )}
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  );
}

export default App;

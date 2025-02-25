import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";
import { Form } from "radix-ui";
import "./Login.css";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <div className="log-in-container">
      <div className="log-in-form">
        <div className="log-in-title">
          <h1>The Shelf</h1>
          <h3>Login</h3>
        </div>
        <Form.Root onSubmit={handleSubmit} className="login-form">
          <Form.Field>
            <div className="login-email-group">
              <Form.Label>Email:</Form.Label>
              <Form.Control asChild>
                <input
                  className="login-email-input"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setFailedLogin(false);
                    setEmail(e.target.value);
                  }}
                />
              </Form.Control>
            </div>
          </Form.Field>

          <Form.Field>
            <div className="login-password-group">
              <Form.Label>Password:</Form.Label>
              <Form.Control asChild>
                <input
                  className="login-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setFailedLogin(false);
                    setPassword(e.target.value);
                  }}
                />
              </Form.Control>
            </div>
          </Form.Field>
          <div className="log-in-button-container">
            <Form.Submit className="login-button">Log In</Form.Submit>
          </div>
        </Form.Root>

        {/* 
        <FormFeedback>Login failed.</FormFeedback>
      </FormGroup>
       */}
        <p className="register-text">
          Not signed up? Register{" "}
          <Link className="register-link" to="/register">
            here
          </Link>
        </p>
      </div>
      {failedLogin && <p>Log in Failed!</p>}
    </div>
  );
}

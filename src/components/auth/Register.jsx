import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "radix-ui";
import "./Register.css";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState();
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        password,
      };
      register(newUser).then((user) => {
        if (user) {
          console.log("new user");
          setLoggedInUser(user);
          navigate("/");
        } else {
          setRegistrationFailure(true);
        }
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="register-title">
          <h1>The Shelf</h1>
          <h3>Sign Up</h3>
        </div>
        <Form.Root onSubmit={handleSubmit} className="register-form-form">
          <Form.Field name="email">
            <div className="register-email-group">
              <Form.Label>Email:</Form.Label>
              <Form.Control asChild>
                <input
                  className="register-input"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Control>
            </div>
          </Form.Field>
          <Form.Field name="firstName">
            <div className="register-firstname-group">
              <Form.Label>First Name:</Form.Label>
              <Form.Control asChild>
                <input
                  className="register-input"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Control>
            </div>
          </Form.Field>
          <Form.Field name="lastName">
            <div className="register-lastname-group">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control asChild>
                <input
                  className="register-input"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Control>
            </div>
          </Form.Field>
          <Form.Field name="userName">
            <div className="register-username-group">
              <Form.Label>User Name:</Form.Label>
              <Form.Control asChild>
                <input
                  className="register-input"
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Form.Control>
            </div>
          </Form.Field>
          <Form.Field>
            <div className="register-password-group">
              <Form.Label>Password:</Form.Label>
              <Form.Control asChild>
                <input
                  className="register-input"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPasswordMismatch(false);
                    setPassword(e.target.value);
                  }}
                />
              </Form.Control>
            </div>
          </Form.Field>
          <Form.Field>
            <div className="register-confirm-group">
              <Form.Label>Confirm:</Form.Label>

              <Form.Control asChild>
                <input
                  className="register-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setPasswordMismatch(false);
                    setConfirmPassword(e.target.value);
                  }}
                />
              </Form.Control>
              {passwordMismatch && window.alert("Password don't match!")}
            </div>
          </Form.Field>

          <div className="register-button-container">
            <Form.Submit className="register-button" asChild>
              <button
                className="register-submit-button"
                disabled={passwordMismatch}
              >
                Register
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
        <p className="login-text">
          Already signed up? Log in{" "}
          <Link className="login-link" to="/login">
            here
          </Link>
        </p>
      </div>
      {registrationFailure && window.alert("Registration failed")}
    </div>
  );
}

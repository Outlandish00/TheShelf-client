import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "radix-ui";

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
    <div className="container" style={{ maxWidth: "500px" }}>
      <h3>Sign Up</h3>
      <Form.Root onSubmit={handleSubmit}>
        <Form.Field name="email">
          <Form.Label>Email</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPasswordMismatch(false);
                setPassword(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Confirm Password</Form.Label>

          <Form.Control asChild>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setPasswordMismatch(false);
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Control>
          {passwordMismatch && <p>Passwords don't match!</p>}
        </Form.Field>
        <p style={{ color: "red" }} hidden={!registrationFailure}>
          Registration Failure
        </p>
        <Form.Submit asChild>
          <button
            className="register-submit-button"
            disabled={passwordMismatch}
          >
            Register
          </button>
        </Form.Submit>
      </Form.Root>
      <p>
        Already signed up? Log in <Link to="/login">here</Link>
      </p>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";
import { Form } from "radix-ui";

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
    <div className="container" style={{ maxWidth: "500px" }}>
      <h3>Login</h3>
      <Form.Root onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label>Email</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setFailedLogin(false);
                setEmail(e.target.value);
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
                setFailedLogin(false);
                setPassword(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit>Log In</Form.Submit>
      </Form.Root>
      {failedLogin && <p>Log in Failed!</p>}
      {/* 
        <FormFeedback>Login failed.</FormFeedback>
      </FormGroup>
       */}
      <p>
        Not signed up? Register <Link to="/register">here</Link>
      </p>
    </div>
  );
}

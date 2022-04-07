import { Fragment, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    createAuthUserWithEmailAndPassword(email, password)
      .then(({ user }) => createUserDocumentFromAuth(user, { displayName }))
      .then(resetFormFields)
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
          alert("Cannot create user, email already in use");
        }
        console.error("user creation encountered an error", e);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Fragment>
      <h1>Sign Up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          required
          name="displayName"
          type="text"
          value={displayName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input required name="email" type="email" value={email} onChange={handleChange} />

        <label>Password</label>
        <input required name="password" type="password" value={password} onChange={handleChange} />

        <label>Confirm Password</label>
        <input
          required
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </Fragment>
  );
};

export default SignUpForm;

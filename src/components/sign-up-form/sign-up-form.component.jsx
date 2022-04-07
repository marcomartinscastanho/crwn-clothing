import { Fragment, useState } from "react";
import { FormInput } from "../form-input/form-input.component";
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
        <FormInput
          label="Display Name"
          required
          name="displayName"
          type="text"
          value={displayName}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          required
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          required
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
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

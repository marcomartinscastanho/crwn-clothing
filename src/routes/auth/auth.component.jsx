import { Fragment } from "react";

import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";
import { SignInForm } from "../../components/sign-in-form/sign-in-form.component";

export const Authentication = () => {
  return (
    <Fragment>
      <h1>Sign In Page</h1>
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      <SignInForm />
      <SignUpForm />
    </Fragment>
  );
};

export default Authentication;

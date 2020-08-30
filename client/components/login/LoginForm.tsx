import { useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LOGIN_MUTATION } from "../../apollo/mutations";
import { useRouter } from "next/router";
import {
  passwordInputElement,
  emailInputElement,
  errorMessageElement,
  submitButtonElement,
  loadingSignElement
} from "../../tests/components/login/constants";

export const success = "OK";

const LoginForm = () => {
  const router = useRouter();
  const [loginFunction, { called, loading, error, data }] = useMutation(
    LOGIN_MUTATION
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (called) {
      if (error) {
        setErrorMessage(error.message);
      } else if (data) {
        if (data.login === success) {
          router.push("/user/dashboard");
        }
      }
    }
  }, [called, error, data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginFunction({ variables: { email, password } });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label about="email">Email:</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleEmailChange}
        data-testid={emailInputElement}
      />
      <label about="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        data-testid={passwordInputElement}
      />
      <button data-testid={submitButtonElement}>Sign In</button>
      {loading && <p data-testid={loadingSignElement}>loading...</p>}
      {errorMessage && (
        <div data-testid={errorMessageElement}>{errorMessage}</div>
      )}
    </form>
  );
};

export default LoginForm;

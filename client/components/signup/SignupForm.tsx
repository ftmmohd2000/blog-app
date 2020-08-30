import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
import { SIGNUP_MUTATION, LOGIN_MUTATION } from "../../apollo/mutations";
import { success } from "../../redux/constants";

const SignupForm = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [signupFunction, { data, loading, called, error }] = useMutation(
    SIGNUP_MUTATION
  );
  const [loginFunction] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (called) {
      if (error) {
        setErrorMessage(error.message);
      } else if (data) {
        if (data.register === success) {
          loginFunction({ variables: { email, password } }).then(() => {
            router.push("/user/dashboard");
          });
        }
      }
    }
  }, [error, data, called]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signupFunction({
      variables: { firstName, lastName, email, password }
    });
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label about="firstName">First Name:</label>
      <input
        type="text"
        name="firstName"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <label about="lastName">Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <label about="email">Email:</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      <label about="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button>Sign Up</button>
      {loading && <p>loading...</p>}
      <div>{errorMessage}</div>
    </form>
  );
};

export default SignupForm;

import React, { useState,useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModel";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef=useRef();
  const ageInputRef= useRef();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
// useref help us to get th dom element
// ref value generated always have a current value which is always a object 
// we can use values returned by the ref only proplem is that they are generated when form is submitted 
// not like onchange props
// we have to propvide explicit value to the target dom element form where we want the input red(attribite)
// use can reset the values by changinf values of the ref we received when we submit the form
// rarely use ref to manipulate the dom
// ref is uncontrolled component
// what we do with useState are controlled state
  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameInputRef.current.value,ageInputRef.current.value)
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };
  // redefine error so that error model shall not rerender
  // htmlFor is used to tell user which label belong to which input

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

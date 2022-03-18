import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModel.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};
const ModelOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  // backdrop adds css property for background to be disabled for the users
  // every element in html gets its onclick attribute
  // reactdom has teo argument one the jsx code the other is the pointer to which we want it to get
  // teleported which is in the element div we define in the index.html file
  // very similar to that of the index,js file
  // we have portalled it parallel to the root element
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm}></Backdrop>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModelOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        ></ModelOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ErrorModal;

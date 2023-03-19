import { useReducer } from "react";

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "ENTER_TEXT": {
      return { text: action.text, isTouched: action.isTouched };
    }
    case "ON_BLUR": {
      return { text: state.text, isTouched: action.isTouched };
    }

    case "ON_SUBMIT": {
      if (state.text.trim() === "")
        return { text: state.text, isTouched: action.isTouched };
      return { text: "", isTouched: !action.isTouched };
    }
    default: {
      return { text: "", isTouched: false };
    }
  }
};

const useInput = (validateInput) => {
  //use hooks : states in use hooks are implicitly available for the components that calls them
  //i will try to use a reducer in to manage the states
  const [state, dispatch] = useReducer(reducerFunction, {
    text: "",
    isTouched: false,
  });

  const enteredValueIsValid = validateInput(state.text);

  const onEnteredValueHandler = (event) => {
    const readText = event.target.value;

    dispatch({ type: "ENTER_TEXT", text: readText, isTouched: true });
  };

  const valueInputBlurHandler = (event) => {
    dispatch({ type: "ON_BLUR", isTouched: true });
  };

  const submitHandler = () => {
    dispatch({ type: "ON_SUBMIT", isTouched: true });
    //  if(enteredTextIsValid)
    // {props.onForwardName(state.text);}
  };
  const cssClass =
    state.isTouched && !enteredValueIsValid ? "invalid" : "";

  return {
    state,
    enteredValueIsValid,
    onEnteredValueHandler,
    valueInputBlurHandler,
    submitHandler,
    cssClass,
  };
};

export default useInput;

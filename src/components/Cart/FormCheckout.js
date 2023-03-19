import useInput from "../../hooks/use-input";
import classes from "./FormCheckout.module.css";
const FormCheckout = (props) => {
  const inputValidator = (value) => {
    return value.trim() !== "";
  };
  const {
    state: name,

    enteredValueIsValid: enteredNameIsValid,
    onEnteredValueHandler: onEnteredNameHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    submitHandler: nameSubmitHandler,
    cssClass: nameCssClass,
  } = useInput(inputValidator);

  const {
    state: street,

    enteredValueIsValid: enteredStreetIsValid,
    onEnteredValueHandler: onEnteredStreetHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    submitHandler: streetSubmitHandler,
    cssClass: streetCssClass,
  } = useInput(inputValidator);

  const {
    state: address,

    enteredValueIsValid: enteredAddressIsValid,
    onEnteredValueHandler: onEnteredAddressHandler,
    valueInputBlurHandler: addressInputBlurHandler,
    submitHandler: addressSubmitHandler,
    cssClass: addressCssClass,
  } = useInput(inputValidator);


  const inputPostalValidator = (value) => {
    return value.trim().length === 5;
  };
  const {
    state: postal,

    enteredValueIsValid: enteredPostalIsValid,
    onEnteredValueHandler: onEnteredPostalHandler,
    valueInputBlurHandler: postalInputBlurHandler,
    submitHandler: postalSubmitHandler,
    cssClass: postalCssClass,
  } = useInput(inputPostalValidator);

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (enteredNameIsValid 
        && enteredAddressIsValid
         && enteredPostalIsValid 
         && enteredStreetIsValid) {
            postalSubmitHandler();
            streetSubmitHandler();
      addressSubmitHandler();
      nameSubmitHandler();
    }
  };

  const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredStreetIsValid && enteredPostalIsValid;

  return (
    <form onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <div className={classes[nameCssClass]}>
          <label htmlFor="name"> NAME </label>
          <input
            value={name.text}
            onChange={onEnteredNameHandler}
            onBlur={nameInputBlurHandler}
            type="text"
            id="name"
          />
        </div>
        <div className={classes[streetCssClass]}>
          <label htmlFor="Address"> STREET </label>
          <input
            value={street.text}
            onChange={onEnteredStreetHandler}
            onBlur={streetInputBlurHandler}
            type="text"
            id="street"    />
        </div>
        <div className={classes[postalCssClass]}>
          <label htmlFor="name"> Postal CODE </label>
          <input
            value={postal.text}
            onChange={onEnteredPostalHandler}
            onBlur={postalInputBlurHandler}
            type="text"
            id="postal"
            placeholder=" postal code Eg. 'MB234 ' "
          />
        </div>
        <div className={classes[addressCssClass]}>
          <label htmlFor="Address"> CITY </label>
          <input
            value={address.text}
            onChange={onEnteredAddressHandler}
            onBlur={addressInputBlurHandler}
            type="text"
            id="adress"
          />
        </div>
        <div>
          <button type="button" onClick={props.onCancel}>
            {" "}
            Cancel{" "}
          </button>
          <button disabled={!formIsValid}>Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default FormCheckout;

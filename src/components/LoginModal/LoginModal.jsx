import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const LoginModal = ({ isOpen, onSignin, handleCloseClick }) => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleSignin(evt) {
    evt.preventDefault();
    onSignin(values);
  }
  return (
    <ModalWithForm
      title="Log in"
      name="sign-in"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSignin}
      buttonText="Log in"
    >
      <label htmlFor="name" className="modal__form-label">
        Email{" "}
      </label>
      <input
        type="email"
        className="modal__form-input"
        id="email"
        name="email"
        placeholder="Email"
        required
        minLength="2"
        maxLength="30"
        value={values.email}
        onChange={handleChange}
      />
      <label htmlFor="password" className="modal__form-label">
        Password{" "}
      </label>
      <input
        type="password"
        className="modal__form-input"
        id="password"
        name="password"
        placeholder="Password"
        required
        minLength="2"
        maxLength="30"
        value={values.password}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default LoginModal;

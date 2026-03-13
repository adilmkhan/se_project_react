import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const RegisterModal = ({ isOpen, onSignup, handleCloseClick }) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatarLink: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleSignup(evt) {
    evt.preventDefault();
    onSignup(values);
  }
  return (
    <ModalWithForm
      title="Sign up"
      name="sign-up"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSignup}
      buttonText="Next"
    >
      <label htmlFor="email" className="modal__form-label">
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
      <label htmlFor="name" className="modal__form-label">
        Name{" "}
      </label>
      <input
        type="text"
        className="modal__form-input"
        id="name"
        name="name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />
      <label htmlFor="avatarURL" className="modal__form-label">
        Avatar Url{" "}
      </label>
      <input
        type="url"
        className="modal__form-input"
        id="avatarURL"
        name="avatarLink"
        placeholder="Avatar URL"
        required
        value={values.avatarLink}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;

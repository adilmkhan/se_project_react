import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const EditProfileModal = ({ isOpen, onEdit, handleCloseClick }) => {
  const defaultValues = {
    name: "",
    avatarLink: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleEdit(evt) {
    evt.preventDefault();
    onEdit(values);
  }
  return (
    <ModalWithForm
      title="Change profile data"
      name="edit"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleEdit}
      buttonText="Save changes"
    >
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

export default EditProfileModal;

import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalContainer({ id }) {
  const [modal, setModal] = useState(false);
  const [photo, setPhoto] = useState();
  const [error, setError] = useState("");

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    Modal.setAppElement("body");
    async function getPhoto() {
      await axios
        .get(
          `https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_client_id}`
        )
        .then((res) => {
          setPhoto(res.data);
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    }
    getPhoto();
  }, [id]);

  console.log(photo);
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="photo Modal"
      >
        <button onClick={closeModal}>close</button>
        <div className="modal">
          <div>
            <img src={photo.urls.small} alt="unsplash" />
          </div>
          <div>
            <h2>{photo.user.username}</h2>

            <div>I am a modal</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Modal.scss";

export default function ModalContainer({ id }) {
  const [modal, setModal] = useState(false);
  const [photo, setPhoto] = useState();
  const [error, setError] = useState("");
  let cancel = false;

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
      width: "80%",
    },
  };

  useEffect(() => {
    async function getPhoto() {
      await axios
        .get(
          `https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_client_id}`
        )
        .then((res) => {
          setPhoto(res.data);
        })
        .catch((err) => {
          setError(err.data);
          console.log({ err });
        });
    }

    getPhoto();
    Modal.setAppElement("body");
  }, [id]);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="photo Modal"
      >
        <p onClick={closeModal}>X</p>
        {photo ? (
          <div className="modal">
            <div>
              <img src={photo.urls.small} alt="unsplash" />
            </div>
            <div>
              <h2>Username: {photo.user.username}</h2>
              <p>IRL Name: {photo.user.name}</p>
              <p>{photo.user.bio}</p>
              <p>
                Likes:{" "}
                {photo.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <p>
                Views:{" "}
                {photo.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              {photo.user.portfolio_url ? (
                <p>
                  Like what you see?
                  <a href={photo.user.portfolio_url}> Check out My Portfolio</a>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          "Oops, Seems Like Something Went Wrong On Our End :(. Try again later!"
        )}
      </Modal>
    </div>
  );
}

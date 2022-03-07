import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Modal.scss";
import API from "../../config";
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
      width: "80%",
    },
  };

  useEffect(() => {
    async function getPhoto() {
      await axios
        .get(`${API}${id}`)
        .then((res) => {
          setPhoto(res.data);
        })
        .catch((err) => {
          setError(err.data);
        });
    }

    getPhoto();

    Modal.setAppElement("body");
  }, [id]);

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  return (
    <div>
      <span
        className={hover ? "visible" : "hover__text"}
        onClick={openModal}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        View More!
      </span>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="photo Modal"
      >
        <p className="modal__exitBtn" onClick={closeModal}>
          ❌
        </p>
        {!photo || error === undefined || error ? (
          "Sorry Something Went Wrong :( Please Refresh The Page Or Comeback Another Time!"
        ) : (
          <div className="modal">
            <div className="modal__container-left">
              <LazyLoadImage
                effect="blur"
                src={photo.imageSmall}
                alt="unsplash"
                className="modal__img"
              />
            </div>

            <div className="modal__container-right">
              <p>
                <span>Username:</span> {photo.username}
              </p>
              <p>
                <span>IRL Name:</span> {photo.name}
              </p>
              {photo.bio ? (
                <p>
                  <span>Bio: </span>
                  {photo.bio}
                </p>
              ) : (
                ""
              )}
              {photo.likes && (
                <p>
                  <span>Likes: </span>
                  {photo.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              )}
              {photo.views && (
                <p>
                  <span>Views: </span>
                  {photo.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              )}
              {photo.portfolioUrl ? (
                <p>
                  <span>Like what you see?</span>
                  <a href={photo.portfolioUrl}> Check out My Portfolio!</a>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

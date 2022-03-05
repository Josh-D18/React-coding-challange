import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Modal.scss";

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
        .get(
          `https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_client_id}`
        )
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

  console.log(modal);

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
        {photo ? (
          <div className="modal">
            <div className="modal__container-left">
              <LazyLoadImage
                effect="blur"
                src={photo.urls.small}
                alt="unsplash"
                className="modal__img"
              />
            </div>
            <div className="modal__container-right">
              <p>
                <span>Username:</span> {photo.user.username}
              </p>
              <p>
                <span>IRL Name:</span> {photo.user.name}
              </p>
              <p>
                <span>Bio: </span>
                {photo.user.bio}
              </p>
              <p>
                <span>Likes: </span>
                {photo.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <p>
                <span>Views: </span>
                {photo.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              {photo.user.portfolio_url ? (
                <p>
                  <span>Like what you see?</span>
                  <a href={photo.user.portfolio_url}>
                    {" "}
                    Check out My Portfolio!
                  </a>
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

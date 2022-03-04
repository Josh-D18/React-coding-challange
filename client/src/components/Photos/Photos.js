import axios from "axios";
import { useEffect, useState } from "react";
import "./Photos.scss";
import ModalContainer from "../Modal/Modal";
export default function Photos() {
  const [photos, setPhotos] = useState();
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState();
  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    async function getData() {
      await axios
        .get(
          `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_client_id}`
        )
        .then((res) => {
          setPhotos(res.data);
        })
        .catch((err) => {
          setError(err);
          console.log({ err });
        });
    }
    getData();
  }, []);

  //   const toggleHover = () => setHovered(!hovered);

  return (
    <>
      <h1>Photo Gallery</h1>
      <article className="photos">
        {photos &&
          photos.map((photo) => {
            return (
              <div key={photo.id} className="photos__container">
                <img
                  src={photo.urls.regular}
                  className="photos__img"
                  alt="unsplash"
                  //   onMouseEnter={toggleHover}
                  //   onMouseLeave={toggleHover}
                />
                <div
                  className={hovered ? "photos__text visible" : "photos__text"}
                >
                  <ModalContainer
                    id={photo.id}
                    loadModal={loadModal}
                    setLoadModal={setLoadModal}
                  />
                </div>
              </div>
            );
          })}
      </article>
    </>
  );
}

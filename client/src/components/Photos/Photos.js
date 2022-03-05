import axios from "axios";
import { useEffect, useState } from "react";
import "./Photos.scss";
import ModalContainer from "../Modal/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Photos() {
  const [photos, setPhotos] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      await axios
        .get(
          `https://api.unsplash.com/photos?per_page=31&client_id=${process.env.REACT_APP_client_id}`
        )
        .then((res) => {
          setPhotos(res.data);
        })
        .catch((err) => {
          setError(err.data);
          console.log({ err });
        });
    }
    getData();
  }, []);

  return (
    <>
      {error === undefined || error ? (
        <p className="photo__text">
          Sorry Something Went Wrong :( Please Refresh The Page Or Comeback
          Another Time!
        </p>
      ) : (
        <>
          <h1>Photo Gallery</h1>
          <p className="photo__text">
            Hover On The Image And Click On 'View More' For More Details!!
          </p>
        </>
      )}
      <article className="photos">
        {photos &&
          photos.map((photo) => {
            return (
              <div key={photo.id} className="photos__container">
                <LazyLoadImage
                  src={photo.urls.regular}
                  className="photos__img"
                  alt="unsplash"
                  effect="blur"
                />
                <div className={"photos__text"}>
                  <ModalContainer id={photo.id} />
                </div>
              </div>
            );
          })}
      </article>
    </>
  );
}

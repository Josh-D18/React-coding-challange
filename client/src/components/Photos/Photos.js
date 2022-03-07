import axios from "axios";
import { useEffect, useState } from "react";
import "./Photos.scss";
import ModalContainer from "../Modal/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import API from "../../config";

export default function Photos() {
  const [photos, setPhotos] = useState();
  const [error, setError] = useState("");
  const [clickPhoto, setClickPhoto] = useState(false);

  useEffect(() => {
    async function getData() {
      await axios
        .get(`${API}`)
        .then((res) => {
          setPhotos(res.data);
        })
        .catch((err) => {
          setError(err.data);
          console.log({ err });
          if (err.response.data === "Rate Limit Exceeded") {
            return "Sorry, We Have Reached The Max Number Of Requests You Can Make In An Hour. Please Come Back Later!";
          }

          if (!photos) {
            return <span className="photo__text">Loading...</span>;
          }
        });
    }
    getData();
  }, []);

  const getPhoto = () => {
    setClickPhoto(!clickPhoto);
  };

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
              <div key={photo._id} className="photos__container">
                <LazyLoadImage
                  src={photo.image}
                  className="photos__img"
                  alt="unsplash"
                  effect="blur"
                  onClick={getPhoto}
                />
                <div className={"photos__text"}>
                  <ModalContainer id={photo._id} clickPhoto={clickPhoto} />
                </div>
              </div>
            );
          })}
      </article>
    </>
  );
}

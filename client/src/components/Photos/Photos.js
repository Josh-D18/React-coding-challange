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

  useEffect(() => {
    async function getData() {
      await axios
        .get(`${API}?per_page=5&client_id=${process.env.REACT_APP_client_id}`)
        .then((res) => {
          setPhotos(res.data);
        })
        .catch((err) => {
          setError(err.data);

          if (err.response.data === "Rate Limit Exceeded") {
            return "Sorry, We Have Reached The Max Number Of Requests You Can Make In An Hour. Please Come Back Later!";
          }

          if (!photos) {
            return <span className="photo__text">Loading...</span>;
          }
        });
    }
    getData();
  }, [photos]);

  // if (!photos) {
  //   return <span className="photo__text">Loading...</span>;
  // }
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

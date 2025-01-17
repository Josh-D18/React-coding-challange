import axios from "axios";
import { useEffect, useState } from "react";
import "./Photos.scss";
import ModalContainer from "../Modal/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import URL from "../../config";

export default function Photos() {
  const [photos, setPhotos] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    function getData() {
      try {
        // Returning an axios call and setting state with the response data. The setPhotos function is storing the response data in photos
        return axios
          .get(`${URL}`)
          .then((res) => {
            setPhotos(res.data);
          })
          .catch((err) => {
            // Storing the error information in error and also checking if the hourly rate has been passed.
            setError(err.data);
            if (err.response.data === "Rate Limit Exceeded") {
              return "Sorry, We Have Reached The Max Number Of Requests You Can Make In An Hour. Please Come Back Later!";
            }
          });
      } catch (err) {
        console.error("API call error:", err.message);
      }
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
            Click In The Middle Of The Image For More Details!!
          </p>
          <p className="photo__text-small">
            Click In The Middle Of The Image For More Details!!
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
                />
                <div className={"photos__text"}>
                  <ModalContainer id={photo._id} />
                </div>
              </div>
            );
          })}
      </article>
    </>
  );
}

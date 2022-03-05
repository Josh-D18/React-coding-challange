import "./Home.scss";
import { useNavigate } from "react-router-dom";
export default function Home() {
  let navigate = useNavigate();
  return (
    <article className="home">
      <div>
        <h1 className="home__header">Photo Gallery</h1>
        <p className="home__text">Check Out Some Cool Images!!</p>
        <button className="home__btn" onClick={() => navigate("/photos")}>
          <span>Click To Enter!</span>
        </button>
      </div>
    </article>
  );
}

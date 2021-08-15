import "./App.css";
import { v4 as uuidv4 } from "uuid";
export default function Searchresult({ movie }) {
  console.log(movie);
  return (
    movie.Poster.match(/\.(jpeg|jpg|gif|png)$/) != null && (
      <div className="movieTile">
        <img
          className="movieTile__img"
          alt="img-not-fetched"
          src={movie.Poster}
        />
        <p className="movieTile__name" key={uuidv4()}>
          {movie.Title}
        </p>
      </div>
    )
  );
}

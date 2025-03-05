import { Form } from "radix-ui";
import { useState } from "react";
import { searchForMovieDataByTitle } from "../../managers/movieManager";
import { ExistingMovieCard } from "./ExistingMovieCard";
import "./NewMovie.css";

export const NewMovie = ({ loggedInUser }) => {
  const [newMovieTitle, setNewMovieTitle] = useState("");

  const [OmdbMovieObject, setOmbdMovieObject] = useState({});

  const [searched, setSearched] = useState(false);

  const searchForMovie = (title) => {
    searchForMovieDataByTitle(title)
      .then((res) => setOmbdMovieObject(res))
      .then(() => setSearched(true));
  };

  return (
    <div className="new-movie-container">
      <Form.Root className="newMovie-formRoot">
        <Form.Field className="newMovie-name">
          <Form.Label className="newMovie-title-label">
            {" "}
            Movie Title:{" "}
          </Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              className="newMovie-title-input"
              value={newMovieTitle}
              onChange={(event) => setNewMovieTitle(event.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <button
          className="title-search"
          onClick={(event) => {
            event.preventDefault();
            searchForMovie(newMovieTitle);
          }}
        >
          Search Title
        </button>
      </Form.Root>
      <div>
        {searched && (
          <ExistingMovieCard
            OmdbMovieObject={OmdbMovieObject}
            setSearched={setSearched}
            loggedInUser={loggedInUser}
            setNewMovieTitle={setNewMovieTitle}
            setOmbdMovieObject={setOmbdMovieObject}
          />
        )}
      </div>
    </div>
  );
};

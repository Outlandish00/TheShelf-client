import { Form, RadioGroup } from "radix-ui";
import { useState } from "react";
import "./NewWatchlistForm.css";
import {
  getWatchlistsByUserId,
  postNewWatchlist,
} from "../../managers/watchlistManager";
import { useNavigate } from "react-router-dom";

export const NewWatchlistForm = ({ loggedInUser, setUsersWatchlist }) => {
  const [watchlistTitle, setWatchlistTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    const newWatchlist = {
      title: watchlistTitle,
      userId: loggedInUser.id,
      isPrivate: isPrivate,
    };

    postNewWatchlist(newWatchlist).then(() => {
      getWatchlistsByUserId(loggedInUser.id).then((data) =>
        setUsersWatchlist(data)
      );
      navigate("/watchlist");
    });
  };

  return (
    <div className="new-watchlist-form-container">
      <Form.Root className="new-watchlist-form">
        <Form.Field className="new-watchlist-title" name="title">
          <Form.Label className="watchlist-title-label">Title: </Form.Label>
          <Form.Control asChild>
            <input
              className="watchlist-title-input"
              type="text"
              required
              onChange={(event) => setWatchlistTitle(event.target.value)}
              value={watchlistTitle}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label className="watchlist-private-label">
            Is this private?
          </Form.Label>
          <Form.Control asChild>
            <RadioGroup.Root className="radio-group-root">
              <RadioGroup.Item
                className="radio-group-item"
                onClick={() => setIsPrivate(true)}
              >
                <RadioGroup.Indicator className="radio-group-indicator" />
              </RadioGroup.Item>
              <label className="label" htmlFor="r1">
                Yes
              </label>
              <RadioGroup.Item
                className="radio-group-item"
                onClick={() => setIsPrivate(false)}
              >
                <RadioGroup.Indicator className="radio-group-indicator" />
              </RadioGroup.Item>
              <label htmlFor="r2">No</label>
            </RadioGroup.Root>
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button
            className="watchlist-button"
            onClick={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            Save Watchlist
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

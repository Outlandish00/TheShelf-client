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
  const [selectedValue, setSelectedValue] = useState("public");
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
      <div className="new-watchlist-title">Create a new Watchlist!</div>
      <Form.Root className="new-watchlist-form">
        <div className="watchlist-title-container">
          <div className="title-message">
            Insert a title for your watchlist.
          </div>
          <input
            className="watchlist-title-input"
            type="text"
            required
            onChange={(event) => setWatchlistTitle(event.target.value)}
            value={watchlistTitle}
          />
        </div>
        <Form.Field>
          <div className="privacy-selection">
            <div className="privacy-message">
              Do you want others to see this watchlist?
            </div>
            <RadioGroup.Root
              className="radio-group-root"
              value={isPrivate ? "private" : "public"}
              onValueChange={(value) => {
                setSelectedValue(value);
                setIsPrivate(value === "private");
              }}
            >
              <div className="radio-group">
                <div className="icon-and-word-group">
                  <RadioGroup.Item
                    className={`radio-group-item ${
                      selectedValue === "public"
                        ? "radio-group-item-selected"
                        : ""
                    }`}
                    value="public"
                  >
                    <RadioGroup.Indicator className="radio-group-indicator" />
                  </RadioGroup.Item>
                  <label htmlFor="r2" className="label">
                    Yes
                  </label>
                </div>
                <div className="icon-and-word-group">
                  <RadioGroup.Item
                    value="private"
                    className={`radio-group-item ${
                      selectedValue === "private"
                        ? "radio-group-item-selected"
                        : ""
                    }`}
                  >
                    <RadioGroup.Indicator className="radio-group-indicator" />
                  </RadioGroup.Item>

                  <label className="label" htmlFor="r1">
                    No
                  </label>
                </div>
              </div>
            </RadioGroup.Root>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <div className="watchlist-button-container">
            <button
              className="watchlist-button"
              onClick={(event) => {
                event.preventDefault();
                handleSave();
              }}
            >
              Save Watchlist
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

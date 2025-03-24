import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWatchlistById,
  updateAWatchlist,
} from "../../managers/watchlistManager";
import { Form, RadioGroup } from "radix-ui";
import "./EditWatchlistForm.css";

export const EditWatchlistForm = () => {
  const { id } = useParams();
  const [editingWatchlist, setEditingWatchlist] = useState({});
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrivate, setEditedPrivate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getWatchlistById(id).then((data) => {
      setEditingWatchlist(data);
      setEditedTitle(data.title);
      setEditedPrivate(data.isPrivate);
    });
  }, [id]);

  const handleSave = () => {
    const newWatchlist = {
      id: editingWatchlist.id,
      title: editedTitle,
      isPrivate: editedPrivate,
      userId: editingWatchlist.userId,
    };
    updateAWatchlist(newWatchlist).then(() => navigate("/watchlist"));
  };
  return (
    <div className="edit-watchlist-form-container">
      <div className="edit-watchlist-title">Edit a Watchlist!</div>
      <Form.Root className="edit-watchlist-form">
        <div className="edit-title-container">
          <div className="title-message">
            Change the title of your watchlist.
          </div>
          <input
            className="watchlist-title-input"
            type="text"
            required
            onChange={(event) => setEditedTitle(event.target.value)}
            value={editedTitle}
          />
        </div>

        <Form.Field>
          <div className="privacy-selection">
            <div className="privacy-message">
              Do you want this watchlist to be viewed by others?
            </div>
            <RadioGroup.Root className="radio-group-root">
              <div className="radio-group">
                <div className="icon-and-word-group">
                  <RadioGroup.Item
                    className={`radio-group-item ${
                      editedPrivate ? "" : "radio-group-item-selected"
                    }`}
                    onClick={() => setEditedPrivate(false)}
                  >
                    <RadioGroup.Indicator className="radio-group-indicator" />
                  </RadioGroup.Item>
                  <label className="label">Yes</label>
                </div>
                <div className="icon-and-word-group">
                  <RadioGroup.Item
                    className={`radio-group-item ${
                      editedPrivate ? "radio-group-item-selected" : ""
                    }`}
                    onClick={() => setEditedPrivate(true)}
                  >
                    <RadioGroup.Indicator className="radio-group-indicator" />
                  </RadioGroup.Item>
                  <label className="label">No</label>
                </div>
              </div>
            </RadioGroup.Root>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <div className="watchlist-button-container">
            <button
              className="edit-watchlist-button"
              onClick={(e) => {
                e.preventDefault();
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

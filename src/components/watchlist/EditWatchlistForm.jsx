import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWatchlistById,
  updateAWatchlist,
} from "../../managers/watchlistManager";
import { Form, RadioGroup } from "radix-ui";
import { Button } from "reactstrap";

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
      <Form.Root className="edit-watchlist-form">
        <Form.Field className="watchlist-title" name="title">
          <Form.Label className="watchlist-title-label">Title:</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              required
              onChange={(event) => setEditedTitle(event.target.value)}
              value={editedTitle}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="watchlist-private-radio">
          <Form.Label className="watchlist-private-label">
            Is Private?{" "}
          </Form.Label>
          <Form.Control asChild>
            <RadioGroup.Root className="radio-group-root">
              <RadioGroup.Item
                className="edit-radio-group-item"
                onClick={() => setEditedPrivate(true)}
              >
                <RadioGroup.Indicator className="edit-radio-group-indicator" />
              </RadioGroup.Item>
              <label className="label">Yes</label>
              <RadioGroup.Item
                className="edit-radio-group-indicator"
                onClick={() => setEditedPrivate(false)}
              >
                <RadioGroup.Indicator className="edit-radio-group-indicator" />
              </RadioGroup.Item>
              <label>No</label>
            </RadioGroup.Root>
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button
            className="edit-watchlist-button"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            Save Watchlist
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

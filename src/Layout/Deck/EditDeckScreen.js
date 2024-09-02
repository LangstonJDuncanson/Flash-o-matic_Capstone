import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeckCancelButton({ deckId }) {
  const navigate = useNavigate(); // Updated to useNavigate

  return (
    <button
      type="button"
      className="btn btn-dark mr-2"
      onClick={() => navigate(`/decks/${deckId}`)} // Updated to use navigate
    >
      Cancel
    </button>
  );
}

function EditDeckScreenBreadcrumbNavBar({ deckName, deckId }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  );
}

function EditDeckScreen() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const navigate = useNavigate(); // Updated to useNavigate
  const { deckId } = useParams();

  // Loading the specified deck from the API
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeckName(response.name);
      setDeckDescription(response.description);
    }
    loadDeck();
  }, [deckId]);

  // Handling changes to the deck name and deck description in the form
  const handleDeckNameChange = (event) => setDeckName(event.target.value);
  const handleDeckDescriptionChange = (event) =>
    setDeckDescription(event.target.value);

  // Updating the pre-existing deck with the changes to the deck name and description
  // Clicking submit will take the user to that deck's screen
  const handleEditDeckSubmit = (event) => {
    event.preventDefault();
    updateDeck({
      id: deckId,
      name: deckName,
      description: deckDescription,
    }).then((updatedDeck) => navigate(`/decks/${updatedDeck.id}`)); // Updated to use navigate
  };

  return (
    <div>
      <EditDeckScreenBreadcrumbNavBar deckName={deckName} deckId={deckId} />
      <h2>Edit Deck</h2>
      <form onSubmit={handleEditDeckSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            id="deckName"
            type="text"
            name="deckName"
            className="form-control"
            onChange={handleDeckNameChange}
            value={deckName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea
            id="deckDescription"
            name="deckDescription"
            className="form-control"
            rows="5"
            onChange={handleDeckDescriptionChange}
            value={deckDescription}
          />
        </div>
        <EditDeckCancelButton deckId={deckId} />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeckScreen;

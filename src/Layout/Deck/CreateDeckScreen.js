import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateDeckBreadcrumbNavBar() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
  );
}

function CreateDeckCancelButton() {
  const navigate = useNavigate(); // Updated to useNavigate

  return (
    <button
      type="button"
      className="btn btn-dark mr-2"
      onClick={() => navigate("/")} // Updated to use navigate
    >
      Cancel
    </button>
  );
}

function CreateDeckScreen() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate

  // Handling changes to the deck's name and description in the form
  const handleDeckNameChange = (event) => setDeckName(event.target.value);
  const handleDeckDescriptionChange = (event) =>
    setDeckDescription(event.target.value);

  // Adding new deck to the database. Saved deck will have an "id" property
  // Clicking submit will then take the user to that deck's screen
  const handleCreateDeckSubmit = (event) => {
    event.preventDefault();
    createDeck({
      name: deckName,
      description: deckDescription,
    }).then((newDeck) => navigate(`/decks/${newDeck.id}`)); // Updated to use navigate
  };

  return (
    <div>
      <CreateDeckBreadcrumbNavBar />
      <h2>Create Deck</h2>
      <form onSubmit={handleCreateDeckSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            id="deckName"
            type="text"
            name="deckName"
            className="form-control"
            placeholder="Deck Name"
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
            placeholder="Brief description of the deck"
            rows="5"
            onChange={handleDeckDescriptionChange}
            value={deckDescription}
          />
        </div>
        <CreateDeckCancelButton />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeckScreen;

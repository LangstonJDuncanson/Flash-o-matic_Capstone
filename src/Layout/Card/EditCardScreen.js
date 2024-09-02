import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";
import CardForm from "./CardForm";

function EditCardScreenBreadcrumbNavBar({ deckName, deckId, cardId }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home" />
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>Deck: {deckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Card {cardId}
        </li>
      </ol>
    </nav>
  );
}

function EditCardCancelButton({ deckId }) {
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

function EditCardScreen() {
  const [deck, setDeck] = useState({});
  const [preExistingCard, setPreExistingCard] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const { deckId, cardId } = useParams();
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    // function to load the deck from the API
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }

    // function to load the card from the API
    async function loadCard() {
      const response = await readCard(cardId);
      setPreExistingCard(response);
      setCardFront(response.front);
      setCardBack(response.back);
    }

    loadDeck();
    loadCard();
  }, [deckId, cardId]);

  // handling form changes
  const handleCardFrontChange = (event) => setCardFront(event.target.value);
  const handleCardBackChange = (event) => setCardBack(event.target.value);

  // Updating the card with the changes to the front and back of the card
  // Clicking submit will also then take the user back to that deck's screen
  const handleEditCardSubmit = (event) => {
    event.preventDefault();
    updateCard({ ...preExistingCard, front: cardFront, back: cardBack })
      .then((updatedCard) => navigate(`/decks/${updatedCard.deckId}`)); // Updated to use navigate
  };

  return (
    <div>
      <EditCardScreenBreadcrumbNavBar
        deckName={deck.name}
        deckId={deckId}
        cardId={cardId}
      />
      <h2>Edit Card</h2>
      <form onSubmit={handleEditCardSubmit}>
        <CardForm
          cardFront={cardFront}
          handleCardFrontChange={handleCardFrontChange}
          cardBack={cardBack}
          handleCardBackChange={handleCardBackChange}
        />
        <EditCardCancelButton deckId={deckId} />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCardScreen;

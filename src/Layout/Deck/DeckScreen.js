import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Routes, Route } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../../utils/api/index";

function DeckScreenDeleteDeckButton({ deckId }) {
  const navigate = useNavigate(); // Make sure navigate is defined here

  const handleTrashClick = () => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      deleteDeck(deckId).then(() => navigate("/"));
    }
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleTrashClick}>
      <span className="oi oi-trash" />
    </button>
  );
}

function DeckScreenCard({ cards, deckId }) {
  const navigate = useNavigate(); // Make sure navigate is defined here

  const handleDeleteCardClick = (card) => {
    if (window.confirm("Delete this card? You will not be able to recover it.")) {
      deleteCard(card.id);
    }
  };

  const cardDisplay = cards.map((card, index) => (
    <div className="deck-card card mt-2" key={index}>
      <div className="card-body row">
        <div className="col-md-5 pl-3">
          <p className="font-weight-bold">Front:</p>
          <p className="card-text ">{card.front}</p>
        </div>
        <div className="col-md-5 ml-auto">
          <p className="font-weight-bold">Back:</p>
          <p className="card-text">{card.back}</p>
        </div>
      </div>
      <hr />
      <div className="ml-auto mt-2">
        <button
          type="button"
          className="btn btn-dark mr-2"
          onClick={() => navigate(`/decks/${deckId}/cards/${card.id}/edit`)}
        >
          <span className="oi oi-pencil" /> Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDeleteCardClick(card)}
        >
          <a href="#" className="text-white">
            <span className="oi oi-trash" />
          </a>
        </button>
      </div>
    </div>
  ));

  return cards.length ? <div>{cardDisplay}</div> : "There are no cards in this deck yet!";
}

function DeckScreenBreadcrumbNavBar({ deckName }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home" /> Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {deckName}
        </li>
      </ol>
    </nav>
  );
}

function DeckInfo({ deckName, deckDescription, deckId, cards }) {
  const navigate = useNavigate(); // Make sure navigate is defined here

  return (
    <div>
      <h2>{deckName}</h2>
      <p>{deckDescription}</p>
      <div className="d-flex mb-4">
        <div className="mr-auto">
          <button
            type="button"
            className="btn btn-dark mr-2"
            onClick={() => navigate(`/decks/${deckId}/edit`)}
          >
            <span className="oi oi-pencil" /> Edit
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => navigate(`/decks/${deckId}/study`)}
          >
            <span className="oi oi-book" /> Study
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => navigate(`/decks/${deckId}/cards/new`)}
          >
            <span className="oi oi-plus" /> Add Cards
          </button>
        </div>
        <div>
          <DeckScreenDeleteDeckButton deckId={deckId} />
        </div>
      </div>
      <div>
        <h3>Cards</h3>
        <DeckScreenCard cards={cards} deckId={deckId} />
      </div>
    </div>
  );
}

function DeckScreen() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setCards(response.cards);
    }
    loadDeck();
  }, [deckId]);

  if (deck.name) {
    return (
      <div>
        <DeckScreenBreadcrumbNavBar deckName={deck.name} />
        <Routes>
          <Route 
            path="*" 
            element={
              <DeckInfo 
                deckName={deck.name} 
                deckDescription={deck.description} 
                deckId={deckId} 
                cards={cards} 
              />} 
          />
        </Routes>
      </div>
    );
  }
  return "Loading...";
}

export default DeckScreen;

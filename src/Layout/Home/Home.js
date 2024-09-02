import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../../utils/api/index";
import { useNavigate } from "react-router-dom";

function Home() {
    const [decks, setDecks] = useState([]);

    function ViewDeckButton({ deck }) {
        const navigate = useNavigate();
      
        return (
          <button
            type="button"
            className="btn btn-dark mr-2"
            onClick={() => navigate(`/decks/${deck.id}`)}
          >
            <span className="oi oi-eye" /> View
          </button>
        );
      }
    
    function StudyDeckButton({ deck }) {
        const navigate = useNavigate();

        return (
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => navigate(`/decks/${deck.id}/study`)}
          >
            <span className="oi oi-book" /> Study
          </button>
        );
    }
    
    function DeleteDeckButton({ deck }) {
        const handleTrashClick = () => {
          if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(deck.id);
          }
        };
      
        return (
          <button type="button" className="btn btn-danger" onClick={handleTrashClick}>
            <a href="/" className="text-white">
              <span className="oi oi-trash" />
            </a>
          </button>
        );
    }
    
    function CreateDeckButton() {
        const navigate = useNavigate();

        return (
          <button
            type="button"
            className="btn btn-success mb-3 btn-lg"
            onClick={() => navigate("/decks/new")}
          >
            <span className="oi oi-plus" /> Create Deck
          </button>
        );
    }

    useEffect(() => {
        async function loadDecks() {
            const response = listDecks();
            const decksFromAPI = await response;
            setDecks(decksFromAPI);
        }
        loadDecks();
    }, []);

    return (
        <div className="home">
            <CreateDeckButton />
            {decks.map((deck, index) => {
                return (
                    <div className="deck-card card mt-2" key={index}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title font-weight-bold">{deck.name}</h5>
                                <h6 className="card-subtitle text-muted">
                                    {deck.cards.length} cards
                                </h6>
                            </div>
                            <p className="card-text">{deck.description}</p>
                            <div className="d-flex">
                                <div className="mr-auto">
                                    <ViewDeckButton deck={deck} />
                                    <StudyDeckButton deck={deck} />
                                </div>
                                <div>
                                    <DeleteDeckButton deck={deck} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;

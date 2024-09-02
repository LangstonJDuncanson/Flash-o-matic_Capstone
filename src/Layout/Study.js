import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function FlipButton({ setIsFrontOfCard }) {
    const flipCardHandler = () => {
        setIsFrontOfCard((currentSide) => !currentSide);
    };

    return (
        <button type="button" className="btn btn-dark mr-2" onClick={flipCardHandler}>
            Flip
        </button>
    );
}

function NextButton({ NextCardHandler }) {
    return (
        <button type="button" className="btn btn-success" onClick={NextCardHandler}>
            Next
        </button>
    );
}

function AddCardsButton({ deckId }) {
    const navigate = useNavigate();
    return (
        <button
            type="button"
            className="btn btn-success"
            onClick={() => navigate(`/decks/${deckId}/cards/new`)}
        >
            <span className="oi oi-plus" /> Add Cards
        </button>
    );
}

function StudyScreenBreadcrumbNavBar({ deckId, deck }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/"><span className="oi oi-home"/> Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Study
                </li>
            </ol>
        </nav>
    );
}

function StudyCard({ cards, currentCard, setCurrentCard, deckId }) {
    const [cardCount, setCardCount] = useState(1);
    const [isFrontOfCard, setIsFrontOfCard] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    // Function to handle clicks of the Next button
    const NextCardHandler = () => {
        // Keeping track of which card in the deck the user is currently viewing
        if (cardCount < cards.length) {
            setIsFrontOfCard((currentSide) => !currentSide);
            setCurrentCard(cards[cardCount]);
            setCardCount((currentCount) => currentCount + 1);
        } else {
            // Once the user has reached the final card in the deck, they will be prompted to either restart
            // the deck of cards, or return to the home page
            if (
                window.confirm(
                    "Restart cards? Click 'cancel' to return to the home page."
                )
            ) {
                setIsFrontOfCard((currentSide) => !currentSide);
                setCurrentCard(cards[0]);
                setCardCount(1);
                navigate(pathname);
            } else {
                navigate("/");
            }
        }
    };

    // If there are less than 3 cards in a deck, the user will be prompted to add cards to the deck
    if (cards.length < 3) {
        return (
            <div>
                <h4 className="text-danger font-weight-bold">Not enough cards!</h4>
                <p>
                    You need at least 3 cards to study. There are {cards.length} cards in
                    this deck.
                </p>
                <AddCardsButton deckId={deckId} />
            </div>
        );
    }

    // Renders the front of the card and the "Flip" button if isFrontOfCard is true
    if (isFrontOfCard) {
        return (
            <div className="deck-card card">
                <div className="card-body">
                    <h5 className="card-title">
                        Card {cardCount} of {cards.length}
                    </h5>
                    <p className="font-weight-bold font-italic mb-0">Front:</p>
                    <p className="card-text">{currentCard.front}</p>
                    <FlipButton setIsFrontOfCard={setIsFrontOfCard} />
                </div>
            </div>
        );
    }
    // Renders the back of the card and the "Flip" and "Next" buttons if isFrontOfCard is false
    return (
        <div className="deck-card card">
            <div className="card-body">
                <h5 className="card-title">
                    Card {cardCount} of {cards.length}
                </h5>
                <p className="font-weight-bold font-italic mb-0">Back:</p>
                <p className="card-text">{currentCard.back}</p>
                <FlipButton setIsFrontOfCard={setIsFrontOfCard} />
                <NextButton NextCardHandler={NextCardHandler} />
            </div>
        </div>
    );
}

function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const deckId = useParams().deckId;

    // Loading the specified deck from the API
    useEffect(() => {
        async function loadDeck() {
            const response = readDeck(deckId);
            const deckFromAPI = await response;
            setDeck(deckFromAPI);
            setCards(deckFromAPI.cards);
            setCurrentCard(deckFromAPI.cards[0]);
        }
        loadDeck();
    }, [deckId]);

    return (
        <div>
            <StudyScreenBreadcrumbNavBar deckId={deckId} deck={deck} />
            <h2 className="mb-4">Study: {deck.name}</h2>
            <StudyCard cards={cards} currentCard={currentCard} setCurrentCard={setCurrentCard} deckId={deckId} />
        </div>
    );
}

export default Study;

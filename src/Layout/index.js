import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import { Route, Routes } from "react-router-dom";
import DeckScreen from "./Deck/DeckScreen";
import EditDeckScreen from "./Deck/EditDeckScreen";
import CreateDeckScreen from "./Deck/CreateDeckScreen"
import AddCardScreen from "./Card/AddCardScreen";
import EditCardScreen from "./Card/EditCardScreen";
import Study from "./Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container card">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/:deckId" element={<DeckScreen />} />
          <Route path="/decks/:deckId/edit" element={<EditDeckScreen />} />
          <Route path="/decks/new" element={<CreateDeckScreen />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCardScreen />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCardScreen />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;

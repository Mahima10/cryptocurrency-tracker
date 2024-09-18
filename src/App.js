import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import CoinsPage from "./Pages/CoinsPage";

import './App.css';

// const FavouriteContext = createContext({
//   favourites: [],
//   addFavourite: ()=> {}
// })

function App() {
  const [currency, setCurrency] = useState("usd")
  const favouriteCoins = localStorage.getItem("favourites")
  const [favourites, setFavourite] = useState(favouriteCoins ? JSON.parse(favouriteCoins) : [])

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites))
  }, [favourites])

  return (
    // <FavouriteContext.Provider value={{favourites, addFavourite}}>
    <BrowserRouter>
      <Header favourites={favourites} />
      <Routes>
        <Route path="/" element={<HomePage currency={currency} favourites={favourites} setFavourite={setFavourite} />} />
        <Route path="/coins/:id" element={<CoinsPage currency={currency} />} />
      </Routes>
    </BrowserRouter>
    // </FavouriteContext.Provider>
  );
}

export default App;
// export const useFavourite = () => useContext(FavouriteContext);

// import logo from './logo.svg';
import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import LogoutPage from "./Components/LogoutPage";
import UserLogin from "./Components/UserLogin";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RestaurantShow from "./Components/RestaurantShow";
import NotFound from "./Components/NotFound";
import CreateRestaurant from "./Components/CreateRestaurant";
import FavoritesContainer from "./Components/FavoritesContainer";


function App() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);


useEffect(() => {
  fetch("/me")
  .then((r) => r.json())
  .then((data) => setUser(data));
},[])

useEffect(() => {
  fetch("/restaurants")
  .then((r) => r.json())
  .then((data) => setRestaurants(data));
},[])

useEffect(() => {
  fetch("/posts")
  .then((r) => r.json())
  .then((data) => setPosts(data));
},[])
 
 console.log(restaurants)
 


  function handleDeleteRestaurant(id) {
    const updateRestaurantArray = restaurants.filter(
      (restaurant) => restaurant.id !== id
    );
    setRestaurants(updateRestaurantArray);
  }

  function handleDeleteFavorite(id) {
    const updateFavoriteArray = favorites.filter(
      (favorite) => favorite.id !== id
    );
    setFavorites(updateFavoriteArray);
  }
  

  

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              restaurants={restaurants}
              handleDeleteRestaurant={handleDeleteRestaurant}
              favorites={favorites}
              setFavorites={setFavorites}
              user={user}
            />
          }
        />
        <Route exact path="/signup" element={<SignUp onSignUp={setUser} />} />
        <Route
          exact
          path="/userlogin"
          element={<UserLogin onLogin={setUser} />}
        />
        <Route
          path="/myfavorites"
          element={
            <FavoritesContainer
              favorites={favorites}
              favoritesData={favorites}
              user={user}
              handleDeleteFavorite={handleDeleteFavorite}
              restaurants={restaurants}
            />
          }
        />
        <Route
          path="/create-restaurant"
          element={
            <CreateRestaurant
              restaurants={restaurants}
              setRestaurants={setRestaurants}
              user={user}
            />
          }
        />
        <Route
          path="/restaurants/:id"
          element={<RestaurantShow user={user} posts={posts}/>}
        />
        <Route
          path="/logout"
          element={<LogoutPage user={user} setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

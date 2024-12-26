import React from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Main } from "./components/Main/Main"
import { MoviePage } from "./components/MoviePage/MoviePage"
import { Profile } from "./components/Profile/Profile"
import { Genres } from "./components/Genres/Genres"
import { GenreFilmsList } from "./components/Genres/GenreFilmsList"
import "./App.css"

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="genres/:genre" element={<GenreFilmsList />} />
        <Route path="movie/:movieId" element={<MoviePage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App

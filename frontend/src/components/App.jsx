
// import './App.css';
import React from "react";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import ImagePopup from './ImagePopup.jsx';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { api } from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth.js';
import Login from './Login.jsx';
import Register from "./Register.jsx";
import InfoTooltip from "./InfoTooltip.jsx";

import successAuth from "../images/success-auth.svg";
import badAuth from "../images/bad-auth.svg";
import ProtectedRouteElement from "./ProtectedRoute.jsx";
import NotFound from "./NotFound.jsx";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [messageTooltip, setMessageTooltip] = useState({ imgIcon: "", text: "" });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => (
          setCurrentUser(res)
        ))
        .catch((err) => console.log(err))
    }
  }, [loggedIn])


  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((res) => (
          setCards(res.data)
        ))
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, name: card.name, link: card.link });
    document.addEventListener('keydown', handleEscClose);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ isOpen: false, name: '', link: '' });
    document.removeEventListener('keydown', handleEscClose);

  }


  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCardById(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(dataProfile) {
    api.updateUserProfileInfo(dataProfile)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.editAvatarUser(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setMessageTooltip({
          text: "Вы успешно зарегистрировались!",
          imgIcon: successAuth
        });
        navigate("/sign-in");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setMessageTooltip({
          text: "Что-то пошло не так! Попробуйте еще раз.",
          imgIcon: badAuth
        })
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((res) => {
        tokenCheck();
        localStorage.setItem('token', res);
        setLoggedIn(true);
        navigate("/", { replace: true })
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email)
          navigate('/', { replace: true })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleSignout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          onSignOut={handleSignout}
        />
        <Routes>

          <Route path='/' element={<ProtectedRouteElement
            element={Main}
            cards={cards}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          }>
          </Route>
          <Route path="/sign-in" element={
            <Login
              onLogin={handleLogin}
            />
          }>
          </Route>

          <Route path="/sign-up" element={
            <Register
              onRegister={handleRegister}
            />
          }>
          </Route>

          <Route path="*" element={
            <NotFound />
          }>
          </Route>

        </Routes>

        <Footer

        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />


        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}

        />


        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />


        <PopupWithForm
          name={'delete'}
          onClose={closeAllPopups}
          title={`Вы уверены?`}
          buttonText={`Да`}
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          title={messageTooltip.text}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          image={messageTooltip.imgIcon}
        />


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

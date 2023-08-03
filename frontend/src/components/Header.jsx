import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, email, onSignOut }) {

   const location = useLocation();
   const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
   const titlePath = location.pathname === "/sign-in" ? "Регистрация" : "Вход";

   return (
      <header className="header">
         
         <img className="header__logo" src={logo} alt="Логотип" />
            <div className='header__container'>
         {loggedIn ? (
            <> 
               <span className="header__email">{email}</span>
               <Link
                  className="header__link-signout"
                  to="/"
                  onClick = {onSignOut}
               >
                  Выйти
               </Link>
            </>
         ) : (
            <Link className="header__link-register" to={path}>
               {titlePath}
            </Link>
         )}
         </div>
      </header>

   )
}


export default Header;
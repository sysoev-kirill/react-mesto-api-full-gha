import Header from "./Header";
import notfound from '../images/notfound.svg';
function NotFound (){

return (
	<div className="notfound__page">
		 <div className="notfound">
			<img className="notfound__img" src={notfound} alt="404" />
			<p className="notfound__title" style = {{color: "white"}}>
			  404
			</p>
			<p className="notfound__text">
			  Страница не найдена
			</p>
		</div> 
	  </div>
	
	
	)
}

export default NotFound;


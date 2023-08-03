
function InfoTooltip({isOpen, onClose, title, image}) {

	return (
	
		<div className={`popup infotoolTip ${isOpen ? "popup_opened" : " "}`}>
         <div className="popup__container">
            <button type="button" className="popup__close-btn" onClick={onClose} ></button>
				<img className="popup__tooltip-img" alt="icon" src={image} />
				<p className="popup__tooltip-text">{title}</p>
		
         </div>
      </div>
	)
	}
	
	export default InfoTooltip;
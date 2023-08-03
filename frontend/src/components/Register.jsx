import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
	const [formValue, setFormValue] = useState({
		email: '',
		password: '',
	})


	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormValue({
			...formValue,
			[name]: value
		});
	}


	function handleSubmit(e) {
		e.preventDefault();
		const { email, password } = formValue;
		if (!formValue.email || !formValue.password) {
			return;
		}
		onRegister({ email, password });
	}

	return (

		<div className="auth__page">
			<h1 className="auth__title">Регистрация</h1>
			<form className="auth__form"
				onSubmit={handleSubmit}
			>

				<input
					className="auth__input"
					name="email"
					id="email"
					type="email"
					placeholder="Email"
					minLength="6"
					maxLength="40"
					required
					value={formValue.email || ""}
					onChange={handleChange}
					
				/>

			   <span className="popup__error" id="profile_about-error"></span> 

				<input
					className="auth__input"
					name="password"
					id="password"
					type="password"
					placeholder="Пароль"
					minLength="6"
					maxLength="40"
					required
					value={formValue.password}
					onChange={handleChange}

				/>

				<span className="popup__error" id="profile_about-error"></span> 

				<button className="auth__button" type="submit">Зарегистрироваться</button>
				
					<Link to="/sign-in" className="auth__signin-button">Уже зарегистрированы? Войти</Link>

			</form>
		</div>
	)

}

export default Register;
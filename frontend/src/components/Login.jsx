
import { useState } from "react";


function Login({ onLogin }) {
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


	function handleSubmitForm(e) {
		e.preventDefault();

		if (!formValue.email || !formValue.password) {

			return;
		}
		const { email, password } = formValue;
		onLogin({ email, password });
	}

	return (

		<div className="auth__page">
			<h1 className="auth__title">Вход</h1>
			<form className="auth__form"
				onSubmit={handleSubmitForm}
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

				{/* {errors?.email && <p className='errorMessage'> {errors?.email?.message}</p>} */}
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
				{/* {errors?.password && <p className='errorMessage'> {errors?.password?.message}</p>} */}

				<button className="auth__button" type="submit">Войти</button>



			</form>
		</div>
	)

}

export default Login;
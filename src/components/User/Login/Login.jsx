import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';

import storeContext from 'components/Store/Context';
import UIButton from 'components/UI/Button/Button';

import './Login.css';

function initalState() {
  return {
    user: '',
    password: ''
  }
}

const UserLogin = () => {

  const [values, setValues] = useState(initalState);
  const {setToken} = useContext(storeContext);
  const history = useHistory();

  function onChange(event) {
    const {value, name} = event.target;

    setValues({
      ...values,
      [name]: value
    })
  }

  function login({user, password}) {
    if(user === 'admin' && password === '123') {
      return {token: '123'}
    }

    return {error: 'user or password invalid'}
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token } = login(values);

    if(token) {
      setToken(token);
      return history.push('/');
    }

    setValues(initalState)
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="text" name="user" autoComplete="off" onChange={onChange} value={values.user} />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" name="password" onChange={onChange} value={values.password} />
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;

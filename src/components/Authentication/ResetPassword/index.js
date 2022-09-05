import React, { useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import AuthApi from "../../../utils/auth";
import { useAuth } from "../../../auth-context/auth.context";

const ResetPassword = () => {

    const history = useHistory();
    const { setUserSession } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const handleSetShowPassword = () => setShowPassword(!showPassword);

    const isValidEmail = () => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const login = (event) => {

        setError(undefined)
        
        if (event) {
          event.preventDefault();
        }

        if (email === "") {
            return setError("Veuillez entrer l'email");
        }

        if (!isValidEmail()) {
            return setError('Vérifier votre email si elle est bien valide');
        }

        if (password === "") {
            return setError("Veuillez entrer le mot de passe");
        }

        setLoading(true);
        AuthApi.Login({
            email,
            password,
        }).then((res)=>{
            console.log(res);
            let user = { ...res.data.user };
            user.token = res.data.token;
            user = JSON.stringify(user);
            setUserSession(user);
            localStorage.setItem("user", user);
            return history.push("/apps");
        }).catch((err)=>{
            if (err.response.data) {
                setError(err.response.data.message);
            } else setError("Erreur survenue au serveur \n Veuillez contacter l'administrateur.");
            setLoading(false);
        })
    }

    return(
        <Aux>
            <Breadcrumb/>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r"/>
                        <span className="r s"/>
                        <span className="r s"/>
                        <span className="r"/>
                    </div>
                    <form onSubmit={login}>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Authentification</h3>
                                <div className="input-group mb-3">
                                    {/* <span class="input-group-append bg-white border-right-0">
                                        <span class="input-group-text" style={{"background":"#f4f7fa","border-right":"0"}}>
                                            <i class="fa fa-user fa-2x"></i>
                                        </span>
                                    </span> */}
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        name="email" 
                                        placeholder="Email"
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setError(undefined);
                                        }}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <input 
                                        type = {showPassword ? "text" : "password"}
                                        className="form-control" 
                                        name="password"
                                        placeholder="password"
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                            setError(undefined);
                                        }}
                                    />
                                </div>
                                {error && (
                                    <p className="text-danger form-text mb-3">{error}</p>
                                )}
                                <div className="form-group-sm text-left mb-4">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1"/>
                                            <label htmlFor="checkbox-fill-a1" className="cr" onClick={handleSetShowPassword}> Voir le mot de passe </label>
                                    </div>
                                </div>
                                {loading ? (
                                    <button className="btn btn-primary mb-4" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        {' '} Connexion ...
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary shadow-2 mb-4">Se connecter</button>
                                )}

                                <p className="mb-2 text-muted">Mot de passe oublié ? <NavLink to="/reset-password">Réinitialiser</NavLink></p>
                                <p className="mb-0 text-muted">Avez vous déjà une compte ? <NavLink to="/sign-up">S'inscrire</NavLink></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Aux>
    );
}

export default ResetPassword;
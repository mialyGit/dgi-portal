import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import AuthApi from "../../../utils/auth";

const Activation = () => {

    const background = require('../../../assets/images/background.jpg')

    const [isContribuable, setIsContribuable] = useState(true);
    const [nif, setNif] = useState("");
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);
    const [loading, setLoading] = useState(false);

    // const styles = {
    //     paperContainer: {
    //         background: `no-repeat center center / cover`,
    //         backgroundImage: `url(${background})`
    //     }
    // };

    const login = (event) => {

        setError(undefined)
        setSuccess(undefined)
        if (event) {
          event.preventDefault();
        }

        if (nif === "") {
            return setError("Veuillez entrer le NIF ou le N° Matricule");
        }

        setLoading(true);
        AuthApi.Activate(isContribuable,{
            nif
        }).then((res)=>{
            console.log(res);
            setSuccess("Demande envoyé avec succès")
        }).catch((err)=>{
            if (err.response.data) {
                setError(err.response.data.message);
            } else setError("Erreur survenue au serveur \n Veuillez contacter l'administrateur.");
        }).finally(()=>{
            setLoading(false)
        })
    }

    return(
        <Aux>
            <Breadcrumb/>
                <div className="row">
                    <div className="col-md-6">
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
                                            <h3 className="mb-4">Demande une activation du compte</h3>
                                            <div className="row mb-4">
                                                <div className="form-check col">
                                                    <input name="is_contribuable" type="radio" id="is_contribuable_0" className="form-check-input" value={true} style={{"cursor":"pointer"}} checked={isContribuable}  onChange={()=>setIsContribuable(true)}/>
                                                    <label title="" htmlFor="is_contribuable_0" className="form-check-label" style={{"cursor":"pointer"}}>Contribuable</label>
                                                </div>
                                                <div className="form-check col">
                                                    <input name="is_contribuable" type="radio" id="is_contribuable_1" className="form-check-input" value={false} style={{"cursor":"pointer"}} checked={!isContribuable}  onChange={()=>setIsContribuable(false)}/>
                                                    <label title="" htmlFor="is_contribuable_1" className="form-check-label" style={{"cursor":"pointer"}}>Agent interne</label>
                                                </div>
                                            </div>
                                            <div className="input-group mb-3">
                                                {/* <span class="input-group-append bg-white border-right-0">
                                                    <span class="input-group-text" style={{"background":"#f4f7fa","border-right":"0"}}>
                                                        <i class="fa fa-user fa-2x"></i>
                                                    </span>
                                                </span> */}
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    name="nif" 
                                                    placeholder="NIF ou N° MATRICULE"
                                                    onChange={(event) => {
                                                        setNif(event.target.value);
                                                        setError(undefined);
                                                    }}
                                                />
                                            </div>
                                            
                                            {error && (
                                                <p className="text-danger form-text mb-3">{error}</p>
                                            )}

                                            {success && (
                                                <p className="text-success form-text mb-3">{success}</p>
                                            )}

                                            {loading ? (
                                                <button className="btn btn-primary mb-4" disabled>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    {' '} Connexion ...
                                                </button>
                                            ) : (
                                                <button type="submit" className="btn btn-primary shadow-2 mb-4">Envoyer</button>
                                            )}

                                            <p className="mb-2 text-muted">Connecter la portail <NavLink to="/">Se connecter</NavLink></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>                   
                    </div>
                    
                    <div className="col-md-6">
                    <div className="featured">
                        <h3 className="color-white">Portail</h3>
                        <h5>Accès des contribuables et des agents internes de la DGI.</h5>
                    </div>
                        <img src={background} alt="Logo DGI" style={{"width" : "100%", "height":"100%"}} />
                    </div>
                </div>
        </Aux>
    );
}

export default Activation;
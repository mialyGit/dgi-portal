import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import { useAuth } from "../../auth-context/auth.context";
import CompteForm from './EditComponents/compte-form';
import PersForm from './EditComponents/pers-form';
import CinForm from './EditComponents/cin-form';
import PersApi from 'utils/pers';
import { errorModal } from "../Common/SweetModal"

const Profile = () => {
    const { userSession, setUserSession } =  useAuth();
    const cinUserSession = JSON.parse(userSession.cin);
    const [loading, setLoading] = useState(false);
    const [uptadedUser, setUpdtatedUser] = useState({})
    const [uptadedCin, setUpdtatedCin] = useState(false)

    const initialUserState = {
        id : userSession.id,
        nom : userSession.nom,
        prenom :userSession.prenom,
        email : userSession.email,
        telephone : userSession.telephone,
        photo : userSession.photo,
        adresse : userSession.adresse,
        password : '',
        password_confirmation : '',
        file : '',
        created_at : userSession.created_at,
        type_user_id : userSession.type_user_id
    }

    const initialCinState = {
        numero : cinUserSession.numero,
        date_delivrance : cinUserSession.date_delivrance,
        date_naissance : cinUserSession.date_naissance,
        lieu_naissance : cinUserSession.lieu_naissance,
        date_duplicata : cinUserSession.date_duplicata,
        lieu_duplicata : cinUserSession.lieu_duplicata,
        pere : cinUserSession.pere,
        mere : cinUserSession.mere
    }

    const [user, setUser] = useState(initialUserState);
    const [cin, setCin] = useState(initialCinState);

    const handleInputChange = (e) => {
        const { name , value } = e.target
        setUser({ ...user, [name]: value });
        setUpdtatedUser({ ...uptadedUser, [name]: value });
    }

    const handleInputFileChange = (image) => {
        setUser({ ...user, file: image })
        setUpdtatedUser({ ...uptadedUser, file: image });
    }

    const handleCinChange = (e) => {
        const { name, value } = e.target;
        setCin({ ...cin, [name]: value });
        setUpdtatedCin(true)
    };

    const cancel = () => {
        setUser(initialUserState)
        setCin(initialCinState)
        setUpdtatedUser({})
        setUpdtatedCin(false)
    }

    const save = () => {
        if(Object.keys(uptadedUser).length > 0 || uptadedCin){
            setLoading(true)
            if(uptadedCin) setUpdtatedUser({...uptadedUser, cin : JSON.stringify(cin)})

            return PersApi.update(uptadedUser,user.id).then((res)=>{
                console.log(res);
                let newValue = { ...res.data.user };
                newValue = JSON.stringify(newValue);
                setUserSession(newValue);
                localStorage.setItem("user", newValue);
            }).catch((err)=>{
                errorModal(err)
                setLoading(false)
                cancel()
            })
        }
        return new Promise((resolve, reject) => resolve());
    }

    return (
        <Aux>
            <Row>
                { JSON.stringify(uptadedUser) }
            </Row>
            <Row>
                <Col>
                    <CompteForm user={user} handleChange={handleInputChange} save={save} cancel={cancel} loading={loading} />
                    <PersForm user={user} handleFileChange={handleInputFileChange} handleChange={handleInputChange} save={save} cancel={cancel} loading={loading} />
                    <CinForm cin={cin} handleChange={handleCinChange} save={save} cancel={cancel} loading={loading} />
                </Col>
            </Row>
        </Aux>
    );
}

export default Profile;

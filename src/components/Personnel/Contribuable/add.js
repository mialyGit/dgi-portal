import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import { faker } from '@faker-js/faker/locale/fr';
import PersForm from './AddComponents/pers-form';
import CinForm from './AddComponents/cin-form';
import CompteForm from './AddComponents/compte-form';
import ProForm from './AddComponents/pro-form';
import { errorModal } from "../../Common/SweetModal"
import { useAuth } from "auth-context/auth.context";
import { API_SERVER } from "config/constant";

import Aux from "hoc/_Aux";
import ContApi from 'utils/cont';

const AddUser = () => {
    const history = useHistory();
    const { userSession } =  useAuth();
    const path = API_SERVER + 'api/';

    // const today = new Date().toJSON().slice(0,10)
    const initialUserState = {
        id : "",
        nom : faker.name.firstName(),
        prenom : faker.name.lastName(),
        email : faker.internet.email().toLowerCase(),
        telephone : faker.phone.number('+261 34 ## ### ##'),
        photo : "",
        adresse : faker.address.country(),
        password : '',
        password_confirmation : '',
        file: faker.image.avatar(),
        nif : faker.phone.number('##########'),
        raison_sociale : faker.company.bsNoun(),
        type_user_id : 0,
        s_matrim : faker.datatype.number({'min': 0,'max': 3}),
        activite : faker.name.jobTitle(),
        type_contr : "0",
        localisation : JSON.stringify({ x : 1, y : 1})
    }
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const nextStep = () => {
        setStep(step+1)
    }

    const prevStep = () => {
        setStep(step-1)
    }
    
    const [cin, setCin] = useState({
        numero : faker.phone.number('201#########'),
        date_delivrance : faker.date.past(18).toJSON().slice(0,10),
        date_naissance : faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toJSON().slice(0,10),
        lieu_naissance : faker.address.country(),
        date_duplicata : faker.date.recent().toJSON().slice(0,10),
        lieu_duplicata : faker.address.country(),
        pere : faker.name.fullName({sex: 'male'}),
        mere : faker.name.fullName({sex: 'female'})
    });

    const [user, setUser] = useState(initialUserState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleInputFileChange = (image) => {
        setUser({ ...user, file: image })
    }

    const handleCinChange = (e) => {
        const { name, value } = e.target;
        setCin({ ...cin, [name]: value });
    };

    const save = (e) => {
        e.preventDefault();
        // let str_cin = new Blob([JSON.stringify({})], { type: 'application/json'})
        let data = {...user}
        data.cin = JSON.stringify(cin)
        data.maker_id = userSession.id
        ContApi.add(data).then((res)=>{
            console.log(res);
            localStorage.removeItem("contribuables")
            let newValue = res.data.user
            return history.push({pathname: '/contribuables', state : {newValue}});
        }).catch((err)=>{
            errorModal(err)
            setLoading(false)
        })

    }

    // const addComponents = () => {
    //     switch (step) {
    //         case 1: return <PersForm user={user} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep}/>
    //         case 2: return <CinForm cin={cin} handleInputChange={handleCinChange} nextStep={nextStep} prevStep={prevStep}/>
    //         case 3: return <CompteForm user={user} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep}/>
    //         default: return <PersForm user={user} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep}/>
    //     }
    // }

    return (
        <Aux>
            <Row>
                <Col>
                {(() => {
                    switch (step) {
                        case 1: return <PersForm user={user} handleFileChange={handleInputFileChange} handleInputChange={handleInputChange} nextStep={nextStep} />
                        case 2: return <CinForm cin={cin} handleInputChange={handleCinChange} nextStep={nextStep} prevStep={prevStep} path={path} />
                        case 3: return <ProForm user={user} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep} />
                        case 4: return <CompteForm user={user} handleInputChange={handleInputChange} save={save} prevStep={prevStep} setLoading={setLoading} loading={loading} path={path} />
                        default: return <PersForm user={user} handleFileChange={handleInputFileChange} handleInputChange={handleInputChange} nextStep={nextStep} />
                    }
                })()}
                </Col>
            </Row>
        </Aux>
    );
}

export default AddUser;

import React, { useState } from 'react';
import {Form, InputGroup, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import Aux from "hoc/_Aux";
import PrivilegeApi from 'utils/privilege';

const AddPrivilege = () => {
    const history = useHistory();
    const initialState = {
        user_id : 0,
        application_id : 0,
    }

    const [errors, setErrors] = useState({});
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [privileges, setPrivileges] = useState([])

    const loadUser = (input,cb) => {
        let json = JSON.parse(localStorage.getItem('users') || '[]')
        cb(json.map( row => ({
            label: `${row.nom} ${row.prenom}`, 
            value: row.id, 
            target : { name: 'user_id', value : row.id }
        })))
    }

    const loadApp = (input,cb) => {
        let json = JSON.parse(localStorage.getItem('apps') || '[]')
        cb(json.map( row => ({
            label: `${row.abrev_app} - ${row.nom_app}`, 
            value: row.id, 
            target : { name: 'application_id', value : row.id }
        })))
    }

    const loadPrivilege = (input,cb) => {
        let json = JSON.parse(localStorage.getItem('privileges') || '[]')
        /*if(json.length === 0){
            let response = await fetch('http://localhost:8000/api/privileges')
            json = await response.json()
            localStorage.setItem('privileges',JSON.stringify(json))
        }*/
        cb(json.map( row => ({
            label: `${row.nom_privilege}`, 
            value: row.id, 
            target : { name: 'privilege_id', value : row.id }
        })))
    }
    
    const filterOption = createFilter({ ignoreAccents: true })

    const customStyles  = (hasError) => ({
        container: base => ({
            ...base,
            flex: 1
        }),
        control: (styles) => ({
            ...styles,
            ...(errors[hasError] && { borderColor: 'red' }),
          }),
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    };

    const handleMultiInputChange = (values) => {
        setPrivileges(values)
        errors.privileges && setErrors({...errors, privileges:null})
    };
    
    const save = (e) => {
        e.preventDefault();
        setError(undefined);
        const formErrors = validateForm()
        // console.log(formErrors);
        setLoading(true);
        if(Object.keys(formErrors).length > 0){
            setLoading(false);
            setErrors(formErrors)
        } else {
            const privilege_id = privileges.map(el => el.value).join(',');
            const newData =  {...data}
            newData.privilege_id = privilege_id

            PrivilegeApi.add(newData).then((res)=>{
                let json = JSON.parse(localStorage.getItem('users') || '[]')
                console.log(json);
                if(json.length === 0) { return history.push({pathname: '/users'}); }
                else {
                    let item = json.find(obj => obj.id === newData.user_id);
                    console.log("ato");
                    return history.push({pathname: '/users/details', state:{item}});
                }
            }).catch((err)=>{
                console.log(err);
                if (err.response.data) {
                    setError(err.response.data.message);
                } else setError("Erreur survenue au serveur \n Veuillez contacter l'administrateur.");
                setLoading(false);
            })
        }
    }
    
    const validateForm = () => {
        const {application_id, user_id} = data;
        const priv = privileges
        const newErrors = {}
        if(!user_id || user_id === 0) newErrors.user_id = "Veuillez entrer l'utilisateur"
        if(!application_id || application_id === 0) newErrors.application_id = "Veuillez entrer l'application"
        if(priv.length === 0) newErrors.privileges = "Veuillez entrer les privilèges assignés"
        return newErrors
    }
    return (
        <Aux>
            <Row>
                <Col>
                    <Form onSubmit={save}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5"> Ajouter un privilege </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {/* { JSON.stringify(privileges) } */}
                                <Row>
                                    <Col md={6}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={4}>Selectionner l'utilisateur</Form.Label>
                                            <Col>
                                                <InputGroup size="sm">
                                                    <AsyncSelect filterOption={filterOption} loadOptions={loadUser} defaultOptions placeholder="Selectionner l'utilisateur"  styles={ customStyles('user_id') } onChange={handleInputChange} />
                                                </InputGroup>
                                                <small className="text-danger text-right">{errors.user_id}</small>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} >
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label className="text-right" column sm={4}>Selectionner l'application</Form.Label>
                                            <Col>
                                                <InputGroup size="sm">
                                                    <AsyncSelect filterOption={filterOption} loadOptions={loadApp} defaultOptions placeholder="Selectionner l'application"  styles={ customStyles('application_id') } onChange={handleInputChange} />
                                                </InputGroup>
                                                <small className="text-danger text-right">{errors.application_id}</small>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={2}>Assigner au privilège</Form.Label>
                                    <Col>
                                        <InputGroup size="sm">
                                            <AsyncSelect isMulti filterOption={filterOption} loadOptions={loadPrivilege} defaultOptions placeholder="Selectionner le privilège"  styles={ customStyles('privileges') } onChange={handleMultiInputChange} />
                                        </InputGroup>
                                        <small className="text-danger text-right">{errors.privileges}</small>
                                    </Col>
                                </Form.Group>
                                {error && (
                                <p className="text-danger form-text m-3">{error}</p>
                            )}

                            {(loading && (
                                <Button variant="primary" className="pull-right mt-2" disabled>
                                    <Spinner as="span" className="mr-2" size="sm" animation="border" role="status" aria-hidden="true" />
                                    Veuillez patientez ...
                                </Button>
                            )) || (
                                <div className="pull-right mt-2">
                                    <Link to="/apps">
                                        <Button variant="secondary" size="sm">
                                            <i className="feather icon-x-circle"></i>Annuler
                                        </Button>
                                    </Link>
                                    <Button type="submit" variant="primary" size="sm">
                                        <i className="feather icon-save"></i>Sauvegarder
                                    </Button>
                                </div>
                            )}
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Aux>
    );
}

export default AddPrivilege;
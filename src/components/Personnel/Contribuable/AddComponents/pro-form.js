import React, { useState } from 'react';
import { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Row, Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
//import MapContainer from './map-form';

const ProForm = ({user, handleInputChange, nextStep, prevStep}) => {

    const [errors, setErrors] = useState({});

    const loadGrade = (input,cb) => {
        let json = [
            {id : 0, nom: 'CELIBATAIRE'},
            {id : 1, nom: 'MARIE(E)'},
            {id : 2, nom: 'DIVORCE(E)'},
            {id : 3, nom: 'VEUF(VE)'},
        ]
        cb(json.map( row => ({
            label: row.nom, 
            value: row.id, 
            target : { name: 's_matrim', value : row.id }
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

    const handleChange = (e) => {
        const { name } = e.target
        handleInputChange(e)
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    }

    const exist_deja = (str) => {
        const data = JSON.parse(localStorage.getItem("contribuables") || '[]')
        return data.some(function(el) {
            // eslint-disable-next-line eqeqeq
            return el.contribuable.nif == str
        }); 
    }

    const validateForm = () => {
        const {nif, raison_sociale, activite } = user;
        const newErrors = {}
        if(!nif || nif.trim() === '') newErrors.nif = "Veuillez entrer le NIF"
        else if(nif.length < 6 ) newErrors.nif = "Le NIF doit comporter au moins 6 caractères"
        else if(exist_deja(nif)) newErrors.nif = "NIF existe déjà"
        if(!raison_sociale || raison_sociale.trim() === '') newErrors.raison_sociale = "Veuillez entrer le raison sociale"
        if(!activite || activite.trim() === '') newErrors.activite = "Veuillez entrer l'activité"
        return newErrors
    }

    const back = (e) => {
        e.preventDefault();
        prevStep();
    }

    const next = (e) => {
        e.preventDefault();
        const formErrors = validateForm()
        console.log(formErrors);
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        } else {
            nextStep();
        }
    }

    return (
        <Form onSubmit={next}>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Ajouter un utilisateur</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="bs-stepper">
                        <div className="bs-stepper-header" role="tablist">
                        <div className="step active">
                                <button type="button" className="step-trigger" role="tab" id="step-1">
                                    <span className="bs-stepper-circle">1</span>
                                    <span className="bs-stepper-label">Information personnelle</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="step active">
                                <button type="button" className="step-trigger" role="tab" id="step-2">
                                    <span className="bs-stepper-circle">2</span>
                                    <span className="bs-stepper-label">Information sur le CIN</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="step active">
                                <button type="button" className="step-trigger" role="tab" id="step-3">
                                    <span className="bs-stepper-circle">3</span>
                                    <span className="bs-stepper-label">Information professionelle</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="step">
                                <button type="button" className="step-trigger" role="tab"  id="step-4">
                                    <span className="bs-stepper-circle">4</span>
                                    <span className="bs-stepper-label">Information du compte</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <Row className="pt-4">
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={4}> NIF </Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-hash"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.nif && "is-invalid"} id="nif" name="nif" placeholder="Numéro Matricule" value={user.nif} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.nif}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={4}>Raison Sociale</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-hash"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.raison_sociale && "is-invalid"} id="raison_sociale" name="raison_sociale" placeholder="Raison Sociale" value={user.raison_sociale} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.raison_sociale}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={4}>Activité</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <Form.Control className={errors.activite && "is-invalid"} as="textarea" rows="5" id="activite" name="activite" value={user.activite} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.activite}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6} >
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={3}>Situation matrimoniale</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <AsyncSelect filterOption={filterOption} loadOptions={loadGrade} defaultOptions placeholder="Selectionner" name="s_matrim" styles={ customStyles('s_matrim') } onChange={handleChange} />
                                    </InputGroup>
                                    <small className="text-danger text-right">{errors.s_matrim}</small>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={3}>Type de contribuable</Form.Label>
                                <Col>
                                    <div className="form-check">
                                        <input name="type_contr" type="radio" id="type_contr_0" className="form-check-input" value={0} style={{"cursor":"pointer"}} checked={user.type_contr === "0"}  onChange={handleChange}/>
                                        <label title="" htmlFor="type_contr_0" className="form-check-label" style={{"cursor":"pointer"}}>Personne physique</label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-check">
                                        <input name="type_contr" type="radio" id="type_contr_1" className="form-check-input" value={1} style={{"cursor":"pointer"}} checked={user.type_contr === "1"}  onChange={handleChange}/>
                                        <label title="" htmlFor="type_contr_0" className="form-check-label" style={{"cursor":"pointer"}}>Personne morale</label>
                                    </div>
                                </Col> 
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <div style={{display:'flex', justifyContent:'right'}}>
                        <Button variant="secondary" size="sm" onClick={back}><i className="feather icon-chevrons-left"></i>Retour</Button>{' '}
                        <Button className="no-margin-btn" type="submit" variant="primary" size="sm" onClick={next}>Confirmer <i className="feather icon-chevrons-right"></i></Button>
                    </div>
                </Card.Footer>
            </Card>
            {/* <Card>
                <Card.Header>
                    <Card.Title as="h5">Localisation</Card.Title>
                </Card.Header>
                <Card.Body>
                    <InputGroup className="mb-3">
                        <Form.Control type='text' placeholder='Rechercher' />
                        <InputGroup.Append>
                            <Button type="submit">Rechercher</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <div style={{height: '240px', width: '100%'}}>
                        <MapContainer />
                    </div>
                </Card.Body>
                <Card.Footer>
                   
                </Card.Footer>
            </Card> */}
        </Form>
    );
}

export default ProForm;

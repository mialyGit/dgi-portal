import React, { useState } from 'react';
import { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Row, Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const ProForm = ({user, handleInputChange, nextStep, prevStep}) => {

    const [errors, setErrors] = useState({});
    const [service, setService] = useState(0);
    // let fonctions = JSON.parse(localStorage.getItem('fonctions') || '[]')
    // let services = JSON.parse(localStorage.getItem('services') || '[]')

    const loadType = (input,cb) => {
        let json =  JSON.parse(localStorage.getItem('type_users') || '[]')
        /*if(json.length === 0){
            let response = await fetch('http://localhost:8000/api/type_users')
            json = await response.json()
            localStorage.setItem('type_users',JSON.stringify(json))
        }*/
        cb(json.map( row => ({
            label: row.libelle_type, 
            value: row.id, 
            target : { name: 'type_user_id', value : row.id }
        })))
    }

    const loadGrade = (input,cb) => {
        let json = JSON.parse(localStorage.getItem('grades') || '[]')
        cb(json.map( row => ({
            label: row.nom_gr, 
            value: row.id, 
            target : { name: 'grade_id', value : row.id }
        })))
    }

    const loadService = (input,cb) => {
        let json = JSON.parse(localStorage.getItem('services') || '[]')
        cb(json.map( row => ({label: row.nom_sc, value: parseInt(row.id)})))
    }

    const loadFonction = (input,cb) => {
        let json = JSON.parse(localStorage.getItem('fonctions') || '[]')
        json = json.filter((el) => el.service_id === service)
        cb(json.map( row => ({
            label: row.nom_fn, 
            value: row.id, 
            target : { name: 'fonction_id', value : row.id }
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

    const handleService = (data) => {
        setService(data.value)
        errors.service_id && setErrors({...errors, service_id:null})
    }

    const handleChange = (e) => {
        const { name } = e.target
        handleInputChange(e)
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    }

    const validateForm = () => {
        const {num_matricule, fonction_id, grade_id, type_user_id } = user;
        const service_id = service
        const newErrors = {}
        if(!num_matricule || num_matricule.trim() === '') newErrors.num_matricule = "Veuillez entrer le numéro matricule"
        if(!service_id || service_id === 0) newErrors.service_id = "Veuillez entrer le service du personnel"
        if(!fonction_id || fonction_id === 0) newErrors.fonction_id = "Veuillez entrer la fonction du personnel"
        if(!grade_id || grade_id === 0) newErrors.grade_id = "Veuillez entrer le grade du personnel"
        if(!type_user_id || type_user_id === 0) newErrors.type_user_id = "Veuillez entrer le type de l'utilisateur"
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
                                <Form.Label className="text-right" column sm={4}>Numéro Matricule</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-hash"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.num_matricule && "is-invalid"} id="num_matricule" name="num_matricule" placeholder="Numéro Matricule" value={user.num_matricule} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.num_matricule}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={4}>Direction ou Service</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        {/* <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-hash"></i></InputGroup.Text>
                                        </InputGroup.Prepend> */}
                                        <AsyncSelect filterOption={filterOption} loadOptions={loadService} defaultOptions placeholder="Selectionner la direction ou service"  styles={ customStyles('service_id') } onChange={handleService} />
                                    </InputGroup>
                                    <small className="text-danger text-right">{errors.service_id}</small>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={4}>Type de l'utilisateur</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <AsyncSelect filterOption={filterOption} loadOptions={loadType} defaultOptions placeholder="Selectionner le type" name="type_user_id" styles={ customStyles('type_user_id') } onChange={handleChange} />
                                    </InputGroup>
                                    <small className="text-danger text-right">{errors.type_user_id}</small>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6} >
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={3}>Grade</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <AsyncSelect filterOption={filterOption} loadOptions={loadGrade} defaultOptions placeholder="Selectionner le grade" name="grade_id" styles={ customStyles('grade_id') } onChange={handleChange} />
                                    </InputGroup>
                                    <small className="text-danger text-right">{errors.grade_id}</small>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="text-right" column sm={3}>Fonction</Form.Label>
                                <Col>
                                    <InputGroup size="sm" >
                                        <AsyncSelect filterOption={filterOption} loadOptions={loadFonction} defaultOptions placeholder="Selectionner la fonction" name="fonction_id" styles={ customStyles('fonction_id') } onChange={handleChange} />
                                    </InputGroup>
                                    <small className="text-danger text-right">{errors.fonction_id}</small>
                                </Col>
                            </Form.Group>
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
        </Form>
    );
}

export default ProForm;

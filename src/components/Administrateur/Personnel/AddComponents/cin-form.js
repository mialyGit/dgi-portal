import React, { useState } from 'react';
import { Row, Col, Card, Form, Spinner, InputGroup, FormControl, Button } from 'react-bootstrap';

const CinForm = ({cin, handleInputChange, nextStep, prevStep, path}) => {

    const [load, setLoad] = useState(false);

    const [errors, setErrors] = useState({});
    const [hasDuplicata, setDuplicata] = useState(false);

    const handleSetDuplicata = () => setDuplicata(!hasDuplicata);

    const handleChange = (e) => {
        const { name } = e.target
        handleInputChange(e)
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    }

    const getAge = (now, DOB1, DOB2) => {
        var today = now ? new Date() : new Date(DOB1);
        var birthDate = new Date(DOB2);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }    
        return age;
    }

    const validateForm = () => {
        const {numero, date_delivrance, date_naissance, lieu_naissance } = cin;
        const newErrors = {}
        if(!numero || numero.trim() === '') newErrors.numero = "Veuillez entrer le numéro CIN"
        else if(numero.length !== 12 ) newErrors.numero = "Le numéro CIN doit comporter 12 caractères"
        if(!date_delivrance || date_delivrance.trim() === '') newErrors.date_delivrance = "Veuillez entrer la date de delivrance du cin"
        else if(getAge(false,date_delivrance,date_naissance) < 18) newErrors.date_delivrance = "La date de delivrance doit supérieur de 18 ans à la date de naissance"
        if(!date_naissance || date_naissance.trim() === '') newErrors.date_naissance = "Veuillez entrer la date de naissance"
        else if(getAge(true,"",date_naissance) < 18) newErrors.date_naissance = "Un employé doit être une personne majeur"
        if(!lieu_naissance || lieu_naissance.trim() === '') newErrors.lieu_naissance = "Veuillez entrer le lieu de naissance"
        return newErrors
    }

    const back = (e) => {
        e.preventDefault();
        prevStep();
    }

    const next = (e) => {
        e.preventDefault();
        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        } else {
            setLoad(true)
            fetch(`${path}users`).then((response) => response.json())
            .then((data) => {
            const exist = data.some(function(el) {
                // eslint-disable-next-line eqeqeq
                return JSON.parse(el.cin).numero == cin.numero
            });
            if(exist){
                const newErrors = {numero : "Numéro CIN existe déjà"}
                setErrors(newErrors)
                setLoad(false)
            } else {
                setLoad(false)
                nextStep();
            }

        }).catch(()=>setLoad(false))
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
                            <div className="step">
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
                                <Form.Label column sm={4}>Numéro CIN</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-hash"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.numero && "is-invalid"} id="numero" name="numero" placeholder="Numéro CIN" value={cin.numero} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.numero}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Date de délivrance</Form.Label>
                                <Col>
                                    <InputGroup size="sm" >
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-calendar"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type="date" className={errors.date_delivrance && "is-invalid"} id="date_delivrance" name="date_delivrance" value={cin.date_delivrance} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.date_delivrance}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6} >
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Date de naissance</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-calendar"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type="date" className={errors.date_naissance && "is-invalid"} id="date_naissance" name="date_naissance" value={cin.date_naissance} onChange={handleChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.date_naissance}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Lieu de naissance</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-map-pin"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.lieu_naissance && "is-invalid"} id="lieu_naissance" name="lieu_naissance" placeholder="Lieu de naissance" value={cin.lieu_naissance} onChange={handleChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.lieu_naissance}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Père</Form.Label>
                        <Col>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="feather icon-user"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="pere" name="pere" placeholder="Nom du père" value={cin.pere} onChange={handleChange} />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Mère</Form.Label>
                        <Col>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="feather icon-user"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="mere" name="mere" placeholder="Nom de la mère" value={cin.mere} onChange={handleChange} />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <hr />
                    <Form.Group className="mt-2">
                        <Form.Check style={{"cursor":"pointer"}} type="checkbox" label="CIN Duplicata" onClick={handleSetDuplicata}/>
                    </Form.Group>
                { hasDuplicata && (
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Date de duplicata</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-calendar"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type="date" className={errors.date_duplicata && "is-invalid"} id="date_duplicata" name="date_duplicata" value={cin.date_duplicata} onChange={handleChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.date_duplicata}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Lieu de duplicata</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-map-pin"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.lieu_duplicata && "is-invalid"} id="lieu_duplicata" name="lieu_duplicata" placeholder="Lieu de duplicata" value={cin.lieu_duplicata} onChange={handleChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.lieu_duplicata}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                )}
                </Card.Body>
                <Card.Footer>
                    <div style={{display:'flex', justifyContent:'right'}}>
                        <Button variant="secondary" size="sm" onClick={back}><i className="feather icon-chevrons-left"></i>Retour</Button>{' '}
                        {(load && (
                            <Button className="no-margin-btn" variant="primary" size="sm" disabled>
                                <Spinner as="span" className="mr-2" size="sm" animation="border" role="status" aria-hidden="true" />
                                Veuillez patientez ...
                            </Button>
                        )) || (
                            <Button className="no-margin-btn" variant="primary" size="sm" onClick={next}>
                                Confirmer <i className="feather icon-chevrons-right"></i>
                            </Button>
                        )}
                        
                    </div>
                </Card.Footer>
            </Card>
        </Form>
    );
}

export default CinForm;

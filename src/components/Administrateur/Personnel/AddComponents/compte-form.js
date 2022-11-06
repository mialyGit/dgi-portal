import React, { useState } from 'react';
import { Row, Col, Card, Form, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';

const CompteForm = ({user, handleInputChange, prevStep, save , loading}) => {
    
    const [errors, setErrors] = useState({});
    const [showPassword,setShowPassword] = useState(0);

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChange = (e) => {
        const { name } = e.target
        handleInputChange(e)
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    }

    const validateForm = () => {
        const {email, password, password_confirmation} = user;
        const newErrors = {}
        if(!email || email.trim() === '' ) newErrors.email = "Veuillez entrer l'email"
        if(!isValidEmail(email)) newErrors.email = "Veuillez entrer un email valide"
        if(!password || password.trim() === '') newErrors.password = "Veuillez entrer le mot de passe"
        else if(password.length < 8) newErrors.password = "Le mot de passe doit comporter au moins 8 caractères"
        if(!password_confirmation || password_confirmation.trim() === '') newErrors.password_confirmation = "Veuillez confirmer le mot de passe"
        if(password.trim() !== password_confirmation.trim()) newErrors.password_confirmation = "Confirmation de mot de passe incorrect"
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
            save(e);
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
                            <div className="step active">
                                <button type="button" className="step-trigger" role="tab"  id="step-4">
                                    <span className="bs-stepper-circle">4</span>
                                    <span className="bs-stepper-label">Information du compte</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <Row className="pt-4">
                        <Col>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Email</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-at-sign"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.email && "is-invalid"} id="email" name="email" placeholder="Email de confirmation" value={user.email} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.email}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Mot de passe</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-lock"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={showPassword !== 1 ? "password" : "text"} className={errors.password && "is-invalid"} id="password" name="password" placeholder="Mot de passe" value={user.password} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.password}</FormControl.Feedback>
                                        {!errors.password && (<InputGroup.Append>
                                            <InputGroup.Text style={{"cursor": "pointer"}} onClick={()=> showPassword === 1 ? setShowPassword(0) : setShowPassword(1)}>
                                                <i className={showPassword === 1 ? "feather icon-eye-off" : "feather icon-eye"}></i>
                                            </InputGroup.Text>
                                        </InputGroup.Append>)}
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} style={{display:'flex', justifyContent:'right'}}>Confirmation</Form.Label>
                                <Col>
                                    <InputGroup size="sm" >
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-lock"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={showPassword !== 2 ? "password" : "text"} className={errors.password_confirmation && "is-invalid"} id="password_confirmation" name="password_confirmation" placeholder="Confirmer votre mot de passe" value={user.password_confirmation} onChange={handleChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.password_confirmation}</FormControl.Feedback>
                                        {!errors.password_confirmation && (<InputGroup.Append>
                                            <InputGroup.Text style={{"cursor": "pointer"}} onClick={()=> showPassword === 2 ? setShowPassword(0) : setShowPassword(2)}>
                                                <i className={showPassword === 2 ? "feather icon-eye-off" : "feather icon-eye"}></i>
                                            </InputGroup.Text>
                                        </InputGroup.Append>)}
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <div style={{display:'flex', justifyContent:'right'}}>
                        <Button variant="secondary" size="sm" onClick={back}>
                        <i className="feather icon-chevrons-left"></i>Retour
                        </Button>{' '}
                        {(loading && (
                            <Button variant="primary" size="sm" disabled>
                                <Spinner as="span" className="mr-2" size="sm" animation="border" role="status" aria-hidden="true" />
                                Veuillez patientez ...
                            </Button>
                        )) || (
                            <Button variant="primary" size="sm" onClick={next}>
                                <i className="feather icon-check-square"></i>Sauvegarder
                            </Button>
                        )}
                    </div>
                </Card.Footer>
            </Card>
        </Form>
    );
}

export default CompteForm;

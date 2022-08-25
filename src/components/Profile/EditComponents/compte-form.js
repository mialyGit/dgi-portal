import React, { useState } from 'react';
import { Card, Row, Col, Form, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';

const CompteForm = ({ user , handleChange , save, cancel, loading }) => {
    
    const [errors, setErrors] = useState({});
    const [edit, setEdit] = useState(false);
    const [showPassword,setShowPassword] = useState(0);

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleInputChange = (e) => {
        const { name } = e.target
        handleChange(e)
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
        if(!password_confirmation || password_confirmation.trim() === '') newErrors.password_confirmation = "Veuillez confirmer le mot de passe"
        if(password.trim() !== password_confirmation.trim()) newErrors.password_confirmation = "Confirmation de mot de passe incorrect"
        return newErrors
    }

    const back = (e) => {
        e.preventDefault();
        setErrors({});
        setEdit(false);
        cancel(e);
    }

    const next = (e) => {
        e.preventDefault();
        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        } else {
            save()
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">COMPTE</Card.Title>
                { !edit && (<div className="card-header-right">
                    <Button variant="secondary" size="sm" onClick={()=>setEdit(true)}><i className="feather icon-edit"></i>Modifier le mot de passe</Button>
                </div>)}
            </Card.Header>
            <Card.Body>
                { (edit && (
                    <Form onSubmit={next}>
                    <Row>
                        <Col>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Email</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-at-sign"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.email && "is-invalid"} id="email" name="email" placeholder="Email de confirmation" value={user.email} onChange={handleInputChange} />
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
                                        <FormControl type={showPassword !== 1 ? "password" : "text"} className={errors.password && "is-invalid"} id="password" name="password" placeholder="Mot de passe" value={user.password} onChange={handleInputChange} />
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
                                        <FormControl type={showPassword !== 2 ? "password" : "text"} className={errors.password_confirmation && "is-invalid"} id="password_confirmation" name="password_confirmation" placeholder="Confirmer votre mot de passe" value={user.password_confirmation} onChange={handleInputChange} />
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
                    <hr/>
                    <div style={{display:'flex', justifyContent:'right'}}>
                        <Button variant="light" size="sm" onClick={back}>
                            <i className="feather icon-x-circle"></i>Annuler
                        </Button>{' '}
                        {(loading && (
                            <Button variant="success" size="sm" disabled>
                                <Spinner as="span" className="mr-2" size="sm" animation="border" role="status" aria-hidden="true" />
                                Veuillez patientez ...
                            </Button>
                        )) || (
                            <Button type="submit" variant="success" size="sm">
                                <i className="feather icon-check-square"></i>Sauvegarder
                            </Button>
                        )}
                    </div>
                </Form>
        
                )) || (
                    <Row>
                        <Col>
                            <label className="mr-4"> Email  : </label><b>{user.email}</b>
                        </Col>
                        <Col></Col>
                    </Row>
                ) }
            </Card.Body>
        </Card>
    );
}

export default CompteForm;

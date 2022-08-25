import React, { useState } from 'react';
import { Card, Row, Col, Form, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';

const CinForm = ({ cin, handleChange , save, cancel, loading }) => {

    const [errors, setErrors] = useState({});
    const [edit, setEdit] = useState(false);
    const [hasDuplicata, setDuplicata] = useState(false);

    const handleSetDuplicata = () => setDuplicata(!hasDuplicata);

    const handleInputChange = (e) => {
        const { name } = e.target
        handleChange(e)
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    }

    const validateForm = () => {
        const {numero, date_delivrance, date_naissance, lieu_naissance } = cin;
        const newErrors = {}
        if(!numero || numero.trim() === '') newErrors.numero = "Veuillez entrer le numéro cin"
        if(numero.length !== 12 ) newErrors.numero = "Le numéro CIN doit comporter 12 caractères"
        if(!date_delivrance || date_delivrance.trim() === '') newErrors.date_delivrance = "Veuillez entrer la date de delivrance du cin"
        if(!date_naissance || date_naissance.trim() === '') newErrors.date_naissance = "Veuillez entrer la date de naissance"
        if(!lieu_naissance || lieu_naissance.trim() === '') newErrors.lieu_naissance = "Veuillez entrer le lieu de naissance"
        return newErrors
    }

    const back = (e) => {
        e.preventDefault();
        setErrors({});
        setEdit(0);
        cancel();
    }

    const next = (e) => {
        e.preventDefault();
        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        } else {
            save().then(()=>{
                setEdit(false)
            })
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">CIN</Card.Title>
                { !edit && (<div className="card-header-right">
                    <Button variant="secondary" size="sm" onClick={()=>setEdit(true)}><i className="feather icon-edit"></i>Modifier</Button>
                </div>)}
            </Card.Header>
            <Card.Body>
            { ( edit && (
                <Form onSubmit={next}>
                    <Row className="pt-4">
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Numéro CIN</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-hash"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.numero && "is-invalid"} id="numero" name="numero" placeholder="Numéro CIN" value={cin.numero} onChange={handleInputChange} />
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
                                        <FormControl type="date" className={errors.date_delivrance && "is-invalid"} id="date_delivrance" name="date_delivrance" value={cin.date_delivrance} onChange={handleInputChange} />
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
                                        <FormControl type="date" className={errors.date_naissance && "is-invalid"} id="date_naissance" name="date_naissance" value={cin.date_naissance} onChange={handleInputChange}/>
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
                                        <FormControl className={errors.lieu_naissance && "is-invalid"} id="lieu_naissance" name="lieu_naissance" placeholder="Lieu de naissance" value={cin.lieu_naissance} onChange={handleInputChange}/>
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
                                <FormControl id="pere" name="pere" placeholder="Nom du père" value={cin.pere} onChange={handleInputChange} />
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
                                <FormControl id="mere" name="mere" placeholder="Nom de la mère" value={cin.mere} onChange={handleInputChange} />
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
                                        <FormControl type="date" className={errors.date_duplicata && "is-invalid"} id="date_duplicata" name="date_duplicata" value={cin.date_duplicata} onChange={handleInputChange}/>
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
                                        <FormControl className={errors.lieu_duplicata && "is-invalid"} id="lieu_duplicata" name="lieu_duplicata" placeholder="Lieu de duplicata" value={cin.lieu_duplicata} onChange={handleInputChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.lieu_duplicata}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    )}
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
                        <Button type="submit" variant="success" size="sm" onClick={next}>
                            <i className="feather icon-check-square"></i>Sauvegarder
                        </Button>
                    )}
                    </div>
                </Form>
            )) || (
                <>
                    <Row>
                        <Col>
                            <Row className="mb-2">
                                <Col><label className="mr-4"> Numéro CIN  : </label><b>{cin.numero}</b></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col><label className="mr-4"> Date de délivrance : </label><b>{cin.date_delivrance}</b></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="mb-2">
                                <Col><label className="mr-4"> Date de naissance : </label><b>{cin.date_naissance}</b></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col><label className="mr-4"> Lieu de naissance : </label><b>{cin.lieu_naissance}</b></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label className="mr-4"> Père : </label><b>{cin.pere}</b></Col>
                        <Col><label className="mr-4"> Date de duplicata : </label><b>{cin.date_duplicata}</b></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label className="mr-4"> Mère : </label><b>{cin.mere}</b></Col>
                        <Col><label className="mr-4"> Lieu de duplicata : </label><b>{cin.lieu_duplicata}</b></Col>
                    </Row>
                </>
            )}
            </Card.Body>
        </Card>
    );
}

export default CinForm;

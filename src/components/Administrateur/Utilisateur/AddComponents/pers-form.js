import { basename } from 'config/constant';
import React, { useRef, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, FormControl, Button, ProgressBar } from 'react-bootstrap';

const PersForm = ({user, handleFileChange,  handleInputChange, nextStep}) => {
    const fileRef = useRef();
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(user.file);
    const [progress, setProgress] = useState(0)
    const [uploadMessage, setUploadMessage] = useState({
        color : "text-muted",
        text : user.file ? user.file : "Veuillez importer une icône ici"
    });

    const handleChange = (e) => {
        const { name } = e.target
        handleInputChange(e)
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    }

    const defaultSrcImg = (e) => {
        e.target.src = basename + "/no-import.png"
    }

    const validateForm = () => {
        const {nom, adresse} = user;
        const newErrors = {}
        if(!nom || nom.trim() === '') newErrors.nom = "Veuillez entrer le nom de l'utilisateur"
        if(!adresse || adresse.trim() === '') newErrors.adresse = "Veuillez entrer l'adresse de l'utilisateur"
        return newErrors
    }


    const next = (e) => {
        e.preventDefault();
        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        } else {
            nextStep();
        }
    }

    function handleEvent(e) {
        setTimeout(() => {
            const value = parseInt( ((e.loaded / e.target.fileSize) * 100), 10 );
            setProgress(value)
            if (e.type === "loadend") {
                handleFileChange(e.target.result);
                setUploadMessage({color: "text-muted", text: e.target.fileName})
                setPreview(e.target.result);
                setTimeout(() => {
                    setProgress(0)
                }, 100); 
            }
        }, 500);
    }
    
    function addListeners(reader) {
        reader.addEventListener('loadstart', handleEvent);
        reader.addEventListener('load', handleEvent);
        reader.addEventListener('loadend', handleEvent);
        reader.addEventListener('progress', handleEvent);
        reader.addEventListener('error', handleEvent);
        reader.addEventListener('abort', handleEvent);
    }

    const handleInputFileChange = event => {
        const image = event.target.files[0]
        var ext = ["jpg","jpeg","png"]
        if(image){
            var fileExtension = image.name.split('.').pop().toLowerCase()
            if(ext.indexOf(fileExtension)>-1){
                const reader = new FileReader();
                reader.fileName = image.name;
                reader.fileSize = image.size;
                addListeners(reader);
                /*reader.onload = ({ target: { result } }) => {
                    setUploadMessage({color: "text-muted", text: image.name})
                    setPreview(result)
                    handleFileChange(result)
                };*/
                reader.readAsDataURL(image);
                
            } else{
                setUploadMessage({color: "text-danger", text: "Fichier invalide!"})
            }
        }
    }

    return (
        <Form onSubmit={next}>
            <Card>
                {/* --------------------------------------------- INFO PERS -----------------------------------------------------------------------*/}
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
                            <div className="step">
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
                    <Row  className="pt-4">
                        <Col md={2}>
                            <Card onClick={() => fileRef.current.click()}>
                                <Card.Img onError={defaultSrcImg} style={{ height : '100%' }} variant="top" src={ preview } alt="activity-user" />
                                <small className={`mt-3 text-center ${uploadMessage.color}`} >{uploadMessage.text}</small>
                                <FormControl type="file" id="photo" name="photo" accept="image/*" ref={fileRef} onChange={handleInputFileChange} hidden/>
                            </Card>
                            <ProgressBar className={(progress === 0 ) && "d-none"} animated now={progress} />
                        </Col>
                        <Col></Col>
                        <Col md={8} >
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Nom</Form.Label>
                                <Col>
                                    <InputGroup size="sm" id="nom">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-user"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.nom && "is-invalid"} id="nom" name="nom" placeholder="Veuillez entrer votre nom" value={user.nom} onChange={handleChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.nom}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Prénom</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-user"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl id="prenom" name="prenom" placeholder="Veuillez entrer votre prénom" value={user.prenom} onChange={handleChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Téléphone</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-phone"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl id="telephone" name="telephone" placeholder="Veuillez entrer votre numéro de téléphone"value={user.telephone} onChange={handleChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Adresse</Form.Label>
                                <Col>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="feather icon-map-pin"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className={errors.adresse && "is-invalid"} id="adresse" name="adresse" placeholder="Veuillez entrer votre adresse" value={user.adresse} onChange={handleChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.adresse}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <div style={{display:'flex', justifyContent:'right'}}>
                        <a href="/users" className="btn btn-secondary btn-sm"><i className="feather icon-x-circle"></i>Annuler</a>{' '}
                        <Button className="no-margin-btn" type="submit" variant="primary" size="sm">Confirmer <i className="feather icon-chevrons-right"></i></Button>
                    </div>
                </Card.Footer>
            </Card>
        </Form>
    );
}

export default PersForm;

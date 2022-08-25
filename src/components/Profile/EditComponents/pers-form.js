import React, { useRef, useState } from 'react';
import { API_SERVER } from "../../../config/constant";
import { Row, Col, Card, Form, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';

const PersForm = ({ user, handleChange , handleFileChange, save, cancel, loading }) => {
    const fileRef = useRef();
    const initialUploadMessage = {
        color : "text-muted",
        text : user.photo ? user.photo : "Veuillez importer une icône ici"
    }
    const path = API_SERVER + 'storage/';
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(path + user.photo);
    const [uploadMessage, setUploadMessage] = useState(initialUploadMessage);
    const [edit, setEdit] = useState(false);

    const defaultSrcImg = (e) => {
        const mode = e.target.id
        mode === "edit_mode" ? e.target.src = "/portals/no-import.png" :
        e.target.src = "/portals/user-icon-default.png";
    }

    const handleInputChange = (e) => {
        const { name } = e.target
        handleChange(e)
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    }

    const validateForm = () => {
        const {nom, adresse} = user;
        const newErrors = {}
        if(!nom || nom.trim() === '') newErrors.nom = "Veuillez entrer le nom de l'utilisateur"
        if(!adresse || adresse.trim() === '') newErrors.adresse = "Veuillez entrer l'adresse de l'utilisateur"
        return newErrors
    }

    const back = (e) => {
        e.preventDefault();
        setErrors({});
        setPreview(path+user.photo)
        setUploadMessage(initialUploadMessage)
        setEdit(false);
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

    const handleInputFileChange = event => {
        const image = event.target.files[0]
        var ext = ["jpg","jpeg","png"]
        if(image){
            var fileExtension = image.name.split('.').pop().toLowerCase()
            if(ext.indexOf(fileExtension)>-1){
                const reader = new FileReader();
                reader.onload = ({ target: { result } }) => {
                    setUploadMessage({color: "text-muted", text: image.name})
                    setPreview(result)
                    handleFileChange(result)
                };
                reader.readAsDataURL(image);
            } else{
                setUploadMessage({color: "text-danger", text: "Fichier invalide!"})
            }
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Information personnelle</Card.Title>
                { !edit &&(<div className="card-header-right">
                    <Button variant="secondary" size="sm" onClick={()=>setEdit(true)}><i className="feather icon-edit"></i>Modifier</Button>
                </div>)}
            </Card.Header>
            <Card.Body>
            { (edit && (
                <Form onSubmit={next}>
                    <Row>
                        <Col md={2}>
                            <Card onClick={() => fileRef.current.click()}>
                                <Card.Img id="edit_mode" onError={defaultSrcImg} style={{ height : '100%' }} variant="top" src={ preview } alt="activity-user" />
                                <small className={`mt-3 text-center ${uploadMessage.color}`} >{uploadMessage.text}</small>
                                <FormControl type="file" id="photo" name="photo" accept="image/*" ref={fileRef} onChange={handleInputFileChange} hidden/>
                            </Card>
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
                                        <FormControl className={errors.nom && "is-invalid"} id="nom" name="nom" placeholder="Veuillez entrer votre nom" value={user.nom} onChange={handleInputChange}/>
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
                                        <FormControl id="prenom" name="prenom" placeholder="Veuillez entrer votre prénom" value={user.prenom} onChange={handleInputChange} />
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
                                        <FormControl id="telephone" name="telephone" placeholder="Veuillez entrer votre numéro de téléphone"value={user.telephone} onChange={handleInputChange} />
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
                                        <FormControl className={errors.adresse && "is-invalid"} id="adresse" name="adresse" placeholder="Veuillez entrer votre adresse" value={user.adresse} onChange={handleInputChange}/>
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.adresse}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr />
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
                <Row>
                    <Col md={2}>
                        <Card>
                            <Card.Img id="show_mode" onError={defaultSrcImg} style={{ height : '100%' }} variant="top" src={ preview } alt="activity-user" />
                            <small className={`mt-3 text-center ${uploadMessage.color}`} >{uploadMessage.text}</small>
                        </Card>
                    </Col>
                    <Col></Col>
                    <Col md={8}>
                        <Row className="mb-3">
                            <Col><label className="mr-4"> Nom  : </label><b>{user.nom}</b></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><label className="mr-4"> Prénom  : </label><b>{user.prenom}</b></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><label className="mr-4"> Téléphone  : </label><b>{user.telephone}</b></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><label className="mr-4"> Adresse  : </label><b>{user.adresse}</b></Col>
                        </Row>
                    </Col>
                </Row>
                ) }
            </Card.Body>
        </Card>
    );
}

export default PersForm;

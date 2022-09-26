import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form, InputGroup, FormControl, Row, Col, Card, Button, Spinner, ProgressBar} from 'react-bootstrap';
import Aux from "hoc/_Aux";
import AppApi from 'utils/app';
import { basename } from 'config/constant';

const AddApp = () => {
    const fileRef = useRef();
    const history = useHistory();
    const initialStateApp = {
        code_app: '',
        nom_app: '',
        abrev_app: '',
        desc_app: '',
        lien_app: 'https://',
        type_app: 0,
        file: ''
    }
    const [app, setApp] = useState(initialStateApp)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(undefined);
    const [progress, setProgress] = useState(0)
    const [preview, setPreview] = useState(basename + "/no-import.png");
    const [uploadMessage, setUploadMessage] = useState({
        color : "text-muted",
        text : "Veuillez importer une icône ici"
    });
    const [example, setExample] = useState("https://www.impots.mg")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApp({ ...app, [name]: value });
        // console.log(app.type_app);
        if(!!errors[name]){
            setErrors({...errors, [name]:null})
        }
    };

    const handleCheckChange = (e) => {
        const value = parseInt(e.target.value)
        const link = e.target.getAttribute('data-link')
        const ex = e.target.getAttribute('data-example')
        setExample(ex)
        setApp({...app, type_app: value, lien_app:link})
    }

    function handleEvent(e) {
        setTimeout(() => {
            const value = parseInt( ((e.loaded / e.target.fileSize) * 100), 10 );
            setProgress(value)
            if (e.type === "loadend") {
                setUploadMessage({color: "text-muted", text: e.target.fileName})
                setPreview(e.target.result);
                setApp({ ...app, file: e.target.result });
                console.log(e.target.result);
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
                reader.readAsDataURL(image);
            } else{
                setUploadMessage({color: "text-danger", text: "Fichier invalide!"})
            }
        }
    }

    /*const url_exists = async(url) => {
        const result = await fetch(url, { method: 'HEAD' });
        return result.ok;
    }*/

    const validateForm = () => {
        const {code_app, nom_app, lien_app, type_app } = app;
        const newErrors = {}
        if(!code_app || code_app.trim() === '') newErrors.code_app = "Veuillez entrer le code de l'application"
        if(!nom_app || nom_app.trim() === '') newErrors.nom_app = "Veuillez entrer le nom de l'application"
        if(!lien_app || lien_app.trim() === '') newErrors.lien_app = "Veuillez entrer le lien vers l'application"
        else if(type_app === 0 && !lien_app.trim().startsWith('http://') && !lien_app.trim().startsWith('https://')) newErrors.lien_app = "Veuillez entrer une url valide"
        else if(type_app === 1 && !lien_app.trim().startsWith('/')) newErrors.lien_app = "Le lien vers l'application privilegiée doit commencer par '/'"
        return newErrors
    }

    const save = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(undefined);

        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0){
            setLoading(false);
            return setErrors(formErrors)
        }

        let data = {...app}
        if(data.type_app === 1) data.lien_app = `${basename}/_apps${data.lien_app}`

        console.log(data);
        AppApi.add(data).then((res)=>{
            console.log(res);
            localStorage.removeItem('apps');
            history.push('/apps');
        }).catch((err)=>{
            if (err.response.data) {
                setError(err.response.data.message);
            } else setError("Erreur survenue au serveur \n Veuillez contacter l'administrateur.");
            setLoading(false);
        })
    }


  return (
    <Aux>
        <Row>
            <Col>
                {/* --------------------------------------------- AJOUTER -----------------------------------------------------------------------*/}
                <Form onSubmit={save}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5"> Ajouter une nouvelle application </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={2}>
                                    <Card onClick={() => fileRef.current.click()}>
                                        <Card.Img style={{ height : '100%' }} variant="top" src={ preview } alt="activity-user" />
                                        <small className={`mt-3 text-center ${uploadMessage.color}`} >{uploadMessage.text}</small>
                                        <FormControl type="file" id="logo_app" name="logo_app" accept="image/*" ref={fileRef} onChange={handleInputFileChange} hidden />
                                    </Card>
                                    <ProgressBar className={(progress === 0 ) && "d-none"} animated now={progress} />
                                </Col>
                                <Col></Col>
                                <Col md={8} >
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Code Application </Form.Label>
                                        <Col>
                                            <InputGroup size="sm" id="inputGroup-nom">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><i className="feather icon-user"></i></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl className={errors.code_app && "is-invalid"} id="code_app" name="code_app" placeholder="Code Application" value={app.code_app} onChange={handleInputChange}/>
                                                <FormControl.Feedback type="invalid" className="text-right">{errors.code_app}</FormControl.Feedback>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Nom de l'application </Form.Label>
                                        <Col>
                                            <InputGroup size="sm">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><i className="feather icon-user"></i></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl className={errors.nom_app && "is-invalid"} id="nom_app" name="nom_app" placeholder="Nom de l'application" value={app.nom_app} onChange={handleInputChange} />
                                                <FormControl.Feedback type="invalid" className="text-right">{errors.nom_app}</FormControl.Feedback>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Abréviation </Form.Label>
                                        <Col>
                                            <InputGroup size="sm">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><i className="feather icon-user"></i></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl id="abrev_app" name="abrev_app" placeholder="Abréviation" value={app.abrev_app} onChange={handleInputChange} />
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}> Type d'application </Form.Label>
                                            <Col className="mt-2">
                                                <div className="form-check">
                                                    <input data-example="https://www.impots.mg" data-link="https://" name="type_app" type="radio" id="type_app_0" className="form-check-input" value="0" 
                                                           style={{"cursor":"pointer"}} checked={(app.type_app === 0)} onChange={handleCheckChange}/>
                                                    <label title="" htmlFor="type_app_0" className="form-check-label" style={{"cursor":"pointer"}}>Application par défaut</label>
                                                </div>
                                            </Col>
                                            <Col className="mt-2">
                                                <div className="form-check">
                                                    <input data-example="/ift-ifpb" data-link="/" name="type_app" type="radio" id="type_app_1" className="form-check-input" value="1" 
                                                           style={{"cursor":"pointer"}} checked={(app.type_app === 1)} onChange={handleCheckChange}/>
                                                    <label title="" htmlFor="type_app_1" className="form-check-label" style={{"cursor":"pointer"}}>Application privilegiée</label>
                                                </div>
                                                {/* <Form.Check style={{"cursor":"pointer"}} checked={(app.type_app === 1)} type="radio" id="type_app_1" name="type_app" label="Application privilegiée" value="1" onChange={()=>setApp({...app, type_app : 1})} /> */}
                                            </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description </Form.Label>
                                        <Form.Control as="textarea" rows="5" id="desc_app" name="desc_app" value={app.desc_app} onChange={handleInputChange} />
                                    </Form.Group> 
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Lien <small className="text-muted">(ex : {example}) </small> </Form.Label>
                                        <Form.Control className={errors.lien_app && "is-invalid"} as="textarea" rows="1" id="lien_app" name="lien_app" value={app.lien_app} onChange={handleInputChange} />
                                        <FormControl.Feedback type="invalid" className="text-right">{errors.lien_app}</FormControl.Feedback>
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

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            </Col>
        </Row>
    </Aux>
  )
}

export default AddApp;
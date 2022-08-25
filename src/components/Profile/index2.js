import React, {useRef, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, FormControl, Button, ProgressBar } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import { API_SERVER } from "../../config/constant";
import { useAuth } from "../../auth-context/auth.context";

const Profile = () => {
    const { user } =  useAuth();
    const fileRef = useRef();
    const path = API_SERVER + 'storage/';
    const cin = JSON.parse(user.cin);

    const [errors, setErrors] = useState({});
    const [showPassword,setShowPassword] = useState(0);
    const [preview, setPreview] = useState(path + user.photo);
    const [uploadMessage, setUploadMessage] = useState({
        color : "text-muted",
        text : user.file ? user.file : "Veuillez importer une icône ici"
    });

    const [hasDuplicata, setDuplicata] = useState(false);
    const handleSetDuplicata = () => setDuplicata(!hasDuplicata);
    
    const [currentCin, setCurrentCin] = useState({
        numero : cin.numero,
        date_delivrance : cin.date_delivrance,
        date_naissance : cin.date_naissance,
        lieu_naissance : cin.lieu_naissance,
        date_duplicata : cin.date_duplicata,
        lieu_duplicata : cin.lieu_duplicata,
        pere : cin.pere,
        mere : cin.mere
    });

    const [currentUser, setCurrentUser] = useState({
        id : user.id,
        nom : user.nom,
        prenom :user.prenom,
        email : user.email,
        telephone : user.telephone,
        photo : user.photo,
        adresse : user.adresse,
        password : '',
        password_confirmation : '',
        created_at : user.created_at,
        type_user_id : user.type_user_id
    });

    // const setDefaultValues = () => {
    //     let defaultValues = {
    //         id : user.id,
    //         nom : user.nom,
    //         prenom :user.prenom,
    //         cin : user.cin,
    //         telephone : user.telephone,
    //         photo : user.photo.split('/').slice(-1),
    //         adresse : user.adresse,
    //         created_at : user.created_at,
    //         type_user_id : user.type_user_id
    //     };
    //     setCurrentUser({...defaultValues});
    // }
    const defaultSrcImg = (e) => {
        e.target.src = "/portals/no-import.png"
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleCinChange = (e) => {
        const { name, value } = e.target;
        setCurrentCin({ ...currentCin, [name]: value });
    };

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
                    setCurrentUser({...currentUser, file: image})
                };
                reader.readAsDataURL(image);
            } else{
                setUploadMessage({color: "text-danger", text: "Fichier invalide!"})
            }
        }
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const validateForm = () => {
        const {email, password, password_confirmation} = currentUser;
        const newErrors = {}
        if(!email || email.trim() === '' ) newErrors.email = "Veuillez entrer l'email"
        if(!isValidEmail(email)) newErrors.email = "Veuillez entrer un email valide"
        if(!password || password.trim() === '') newErrors.password = "Veuillez entrer le mot de passe"
        if(!password_confirmation || password_confirmation.trim() === '') newErrors.password_confirmation = "Veuillez confirmer le mot de passe"
        if(password.trim() !== password_confirmation.trim()) newErrors.password_confirmation = "Confirmation de mot de passe incorrect"
        return newErrors
    }

    // useEffect(()=>{
    //     setDefaultValues()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

    return (
        <Aux>
            <Row>
                <Col>
                    {/* --------------------------------------------- COMPTE -----------------------------------------------------------------------*/}
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">COMPTE</Card.Title>
                            <div className="card-header-right">
                                <Button variant="primary" size="sm"><i className="feather icon-edit"></i>Modifier le mot de passe</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Email</Form.Label>
                                        <Col>
                                            <InputGroup size="sm">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><i className="feather icon-at-sign"></i></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl className={errors.email && "is-invalid"} id="email" name="email" placeholder="Email de confirmation" value={currentUser.email} onChange={handleInputChange} />
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
                                                <FormControl type={showPassword !== 1 ? "password" : "text"} className={errors.password && "is-invalid"} id="password" name="password" placeholder="Mot de passe" value={currentUser.password} onChange={handleInputChange} />
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
                                                <FormControl type={showPassword !== 2 ? "password" : "text"} className={errors.password_confirmation && "is-invalid"} id="password_confirmation" name="password_confirmation" placeholder="Confirmer votre mot de passe" value={currentUser.password_confirmation} onChange={handleInputChange} />
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
                    </Card>
                    {/* --------------------------------------------- INFO PERS -----------------------------------------------------------------------*/}
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Information personnelle</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row  className="pt-4">
                                <Col md={2}>
                                    <Card onClick={() => fileRef.current.click()}>
                                        <Card.Img onError={defaultSrcImg} style={{ height : '100%' }} variant="top" src={ preview } alt="activity-user" />
                                        <small className={`mt-3 text-center ${uploadMessage.color}`} >{uploadMessage.text}</small>
                                        <FormControl type="file" id="photo" name="photo" accept="image/*" ref={fileRef} onChange={handleInputFileChange} hidden/>
                                    </Card>
                                    <ProgressBar animated now={45} />
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
                                                <FormControl className={errors.nom && "is-invalid"} id="nom" name="nom" placeholder="Veuillez entrer votre nom" value={currentUser.nom} onChange={handleInputChange}/>
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
                                                <FormControl id="prenom" name="prenom" placeholder="Veuillez entrer votre prénom" value={currentUser.prenom} onChange={handleInputChange} />
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
                                                <FormControl id="telephone" name="telephone" placeholder="Veuillez entrer votre numéro de téléphone"value={currentUser.telephone} onChange={handleInputChange} />
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
                                                <FormControl className={errors.adresse && "is-invalid"} id="adresse" name="adresse" placeholder="Veuillez entrer votre adresse" value={currentUser.adresse} onChange={handleInputChange}/>
                                                <FormControl.Feedback type="invalid" className="text-right">{errors.adresse}</FormControl.Feedback>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

            {/* --------------------------------------------- CIN -----------------------------------------------------------------------*/}

                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">CIN</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <Row>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={4}>Numéro CIN</Form.Label>
                                        <Col>
                                            <InputGroup size="sm">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><i className="feather icon-hash"></i></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl className={errors.numero && "is-invalid"} id="numero" name="numero" placeholder="Numéro CIN" value={currentCin.numero} onChange={handleCinChange} />
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
                                                <FormControl type="date" className={errors.date_delivrance && "is-invalid"} id="date_delivrance" name="date_delivrance" value={currentCin.date_delivrance} onChange={handleCinChange} />
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
                                                <FormControl type="date" className={errors.date_naissance && "is-invalid"} id="date_naissance" name="date_naissance" value={currentCin.date_naissance} onChange={handleCinChange}/>
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
                                                <FormControl className={errors.lieu_naissance && "is-invalid"} id="lieu_naissance" name="lieu_naissance" placeholder="Lieu de naissance" value={currentCin.lieu_naissance} onChange={handleCinChange}/>
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
                                        <FormControl id="pere" name="pere" placeholder="Nom du père" value={currentCin.pere} onChange={handleCinChange} />
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
                                        <FormControl id="mere" name="mere" placeholder="Nom de la mère" value={currentCin.mere} onChange={handleCinChange} />
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
                                                <FormControl type="date" className={errors.date_duplicata && "is-invalid"} id="date_duplicata" name="date_duplicata" value={currentCin.date_duplicata} onChange={handleCinChange}/>
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
                                                <FormControl className={errors.lieu_duplicata && "is-invalid"} id="lieu_duplicata" name="lieu_duplicata" placeholder="Lieu de duplicata" value={currentCin.lieu_duplicata} onChange={handleCinChange}/>
                                                <FormControl.Feedback type="invalid" className="text-right">{errors.lieu_duplicata}</FormControl.Feedback>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default Profile;

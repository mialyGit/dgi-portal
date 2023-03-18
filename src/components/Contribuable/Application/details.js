import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useLocation} from 'react-router-dom'
import {Form, Row, Col, Card, Button} from 'react-bootstrap';
import { API_SERVER } from "config/constant";
import no_import from 'assets/images/no-import.png';
import Aux from "hoc/_Aux";

const Details = () => {
    const location = useLocation();
    const history = useHistory();
    const path = API_SERVER + 'storage/';
    const fileRef = useRef();

    const initialStateApp = {
        id: 0,
        code_app: '',
        nom_app: '',
        abrev_app: '',
        desc_app: '',
        lien_app: 'https://',
        type_app: 0,
        file: ''
    }

    const [app, setApp] = useState(initialStateApp)
    const [preview, setPreview] = useState(no_import);
    const [uploadMessage, setUploadMessage] = useState({
        color : "text-muted",
        text : "Veuillez importer une icône ici"
    });

    const setDefaultValues = () => {
        if(location.state && location.state.item){
            let item =  location.state.item;
            item.abrev_app = item.abrev_app || ''
            item.desc_app = item.desc_app || ''
            if(!item.logo_app.includes('default-logo')){
                setPreview(path + item.logo_app)
                setUploadMessage({...uploadMessage, text: item.logo_app.split('/')[1]})
            }
            setApp({...item});
        } else {
            history.push('/employes/apps')
        }
    }
    
    useEffect(() => {
        setDefaultValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
        <Aux>
            <Row>
                <Col>
                    {/* --------------------------------------------- AJOUTER -----------------------------------------------------------------------*/}
                    <Form>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5"> Information sur une application </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={2}>
                                        <Card onClick={() => fileRef.current.click()}>
                                            <Card.Img style={{ height : '100%' }} variant="top" src={ preview } alt="activity-user" />
                                            <small className={`mt-3 text-center ${uploadMessage.color}`} >{uploadMessage.text}</small>
                                        </Card>
                                    </Col>
                                    <Col></Col>
                                    <Col md={8} >
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Code Application </Form.Label>
                                            <Col><b>{app.code_app}</b></Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Nom de l'application </Form.Label>
                                            <Col><b>{app.nom_app}</b></Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Abréviation </Form.Label>
                                            <Col><b>{app.abrev_app}</b></Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}> Type d'application </Form.Label>
                                            <Col className="mt-2">
                                                <div className="form-check">
                                                    <input name="type_app" type="radio" id="type_app_0" className="form-check-input" 
                                                     style={{"cursor":"pointer"}} checked={(app.type_app === 0)} readOnly/>
                                                    <label title="" htmlFor="type_app_0" className="form-check-label" style={{"cursor":"pointer"}}>Application par défaut</label>
                                                </div>
                                            </Col>
                                            <Col className="mt-2">
                                                <div className="form-check">
                                                    <input name="type_app" type="radio" id="type_app_1" className="form-check-input" 
                                                           style={{"cursor":"pointer"}} checked={(app.type_app === 1)} readOnly/>
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
                                            <Form.Control as="textarea" rows="5" id="desc_app" name="desc_app" value={app.desc_app} readOnly/>
                                        </Form.Group> 
                                    </Col>
                                    <Col md={6}> 
                                        <>
                                            <div className="pull-right mt-2">
                                                <div className="row">
                                                <div className="col mt-2">Suivre le lien</div>
                                                <div className="col"><a className="btn btn-sm btn-link" href={app.lien_app}>
                                                    {app.lien_app}
                                                </a></div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col pt-4"></div>
                                                    <div className="col pt-4">
                                                        <Link to="/contribuables/apps">
                                                            <Button variant="secondary" size="sm">
                                                                <i className="feather icon-x-circle"></i>Retour
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
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

export default Details;
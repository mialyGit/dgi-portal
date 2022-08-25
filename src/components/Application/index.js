import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Spinner, Button} from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom'
import Aux from "../../hoc/_Aux";
import { API_SERVER } from "../../config/constant";
import { errorModal, Toast } from "../Common/SweetModal"

import AppApi from 'utils/app';

const Application = () =>  {

    const history = useHistory();
    const location = useLocation();

    const path = API_SERVER + 'storage/';
    
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultSrcImg = (e) => {
        e.target.src = "/portals/default-logo.png"
    }

    const getAll = () => {
        if(location.state && location.state.newValue){
            Toast().fire('Application ajouté avec succès','','success');
            console.log(location.state.newValue);
            history.replace()
        }
        const data = JSON.parse(localStorage.getItem("apps"))
        if(data){
            setLoading(false);
            return setRows(data)
        }
        AppApi.getAll().then((res)=> {
            const { data } = res;
            setRows(data);
            localStorage.setItem("apps", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("apps")
            errorModal(err)
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const edit = (item) => {
        history.push({pathname: '/apps/edit', state: {item}})
        console.log(item);
    }

    useEffect(() => {
      getAll()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <Aux>
            <Row>
                <Col>
                    {/* --------------------------------------------- APPLICATION PAR DEFAUT -----------------------------------------------------------------------*/}
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5"> Applications par défaut </Card.Title>
                            <div className="card-header-right">
                                <Link to="/apps/new">
                                    <Button variant="secondary" size="sm" ><i className="feather icon-file-plus"></i>AJOUTER</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {loading ? (
                                    <Col className="mt-4 text-center">
                                        <Spinner animation="border" role="status"></Spinner>
                                    </Col>
                                ) :
                                rows.length > 0 ?
                                    rows.map((item) => (
                                        <Col md={6} xl={4} key={item.id}>
                                            <Card className='card-social app-link'>
                                                <Card.Body className='border-bottom'>
                                                <a href={item.lien_app} target="_blank" rel="noopener noreferrer">
                                                    <div className="row align-items-center justify-content-center">
                                                        <div className="col-auto">
                                                            <img onError={defaultSrcImg} src={ path + item.logo_app } alt="" width={50}/>
                                                        </div>
                                                        <div className="col text-right">
                                                            <h4>{ item.nom_app }</h4>
                                                            <h6 className="text-c-green mb-0"><span className="text-muted">Code : { item.code_app }</span></h6>
                                                        </div>
                                                    </div>
                                                </a>
                                                </Card.Body>
                                                <Card.Body>
                                                    <div className="row align-items-center justify-content-center card-active">
                                                        <div className="col-6"><span onClick={()=>edit(item)} className="label bg-dark text-white f-12" style={{"cursor":"pointer"}}>Modifier</span></div>
                                                        <div className="col-6 text-right"><a href={item.lien_app} target="_blank" rel="noopener noreferrer" className="label theme-bg text-white f-12 r-0">Aller au site</a></div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )): (
                                        <Col className="mt-4 text-center"> Aucune résultat </Col>   
                                    )}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default Application;
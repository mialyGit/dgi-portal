import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Spinner} from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Aux from "hoc/_Aux";
import { API_SERVER, basename } from "config/constant";
import { errorModal } from "../../Common/SweetModal"
import AppApi from 'utils/app';

const Application = () =>  {

    const path = API_SERVER + 'storage/';
    
    const [rows, setRows] = useState([]);
    //const [rows2, setRows2] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultSrcImg = (e) => {
        e.target.src = basename + "/default-logo.png"
    }

    const getAll = () => {
        const data = JSON.parse(localStorage.getItem("apps"))
        if(data){
            //const data1 = data.filter(d => d.type_app === 0)
            //const data2 = data.filter(d => d.type_app !== 0)
            setLoading(false);
            //setRows2(data2);
            setRows(data);
            return;
        }
        AppApi.getAll().then((res)=> {
            const { data } = res;
            //const data1 = data.filter(d => d.type_app === 0)
            //const data2 = data.filter(d => d.type_app !== 0)
            //setRows2(data2);
            setRows(data) ;
            localStorage.setItem("apps", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("apps")
            errorModal(err)
        })
        .finally(() => {
            setLoading(false);
        });
    };

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
                                                            <LazyLoadImage onError={defaultSrcImg} src={ path + item.logo_app } alt="" width={50}/>
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
                                                        <div className="col text-center"><a href={item.lien_app} target="_blank" rel="noopener noreferrer" className="label theme-bg text-white f-12 r-0">Aller au site</a></div>
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
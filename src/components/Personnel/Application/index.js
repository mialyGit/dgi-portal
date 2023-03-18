import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Spinner, InputGroup, FormControl} from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Aux from "hoc/_Aux";
import { useHistory } from 'react-router-dom';
import { API_SERVER, basename } from "config/constant";
import { errorModal } from "../../Common/SweetModal"
import AppApi from 'utils/app';
import { useAuth } from "auth-context/auth.context";

const Application = () =>  {

    const path = API_SERVER + 'storage/';
    const { userSession } =  useAuth();

    const [rows, setRows] = useState([]);
    const history = useHistory();
    const [searchValue, setSearchValue] = useState('');
    const [rows2, setRows2] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultSrcImg = (e) => {
        e.target.src = basename + "/default-logo.png"
    }

    function search (searchTerm) {
        setSearchValue(searchTerm);
        const data = JSON.parse(localStorage.getItem("apps") || '[]')
        const filtered = data.filter(
            item =>
                JSON.stringify(item).indexOf(searchTerm) > -1
        );
        const data1 = filtered.filter(d => d.type_app === 0)
        const data2 = filtered.filter(d => d.type_app !== 0)
        setRows2(data2);
        setRows(data1);
    }

    const visit = (item) => {
        let data = {action : `Consulté l'application ${item.nom_app}`, user_id : userSession.id}
        return AppApi.addHistory(data).then((res)=>console.log('ok'))
    }

    const getAll = () => {
        const data = JSON.parse(localStorage.getItem("apps"))
        if(data){
            const data1 = data.filter(d => d.type_app === 0)
            const data2 = data.filter(d => d.type_app !== 0)
            setLoading(false);
            setRows2(data2);
            setRows(data1);
            return;
        }
        AppApi.getAll().then((res)=> {
            const { data } = res;
            const data1 = data.filter(d => d.type_app === 0)
            const data2 = data.filter(d => d.type_app !== 0)
            setRows2(data2);
            setRows(data1) ;
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
        history.push({pathname: '/employes/apps/details', state: {item}})
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
                            <Card.Title as="h5"> Liste des applications </Card.Title>
                            <div className="card-header-right">
                                <Row>
                                    <Col  className="mt-1">
                                        <InputGroup size="sm">
                                            <FormControl id="search_table" name="search_table" placeholder="Rechercher..." value={searchValue} onChange={e=> search(e.target.value)} />
                                            <InputGroup.Append>
                                                <InputGroup.Text><i className="feather icon-search"></i></InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title as="h5"> Applications par défaut </Card.Title>
                            {loading && (
                                <Row>
                                    <Col className="mt-4 text-center">
                                        <Spinner animation="border" role="status"></Spinner>
                                    </Col>
                                </Row>
                            )}
                            <hr/>
                            <Row>
                                {rows.length > 0 ?
                                    rows.map((item) => (
                                        <Col md={6} xl={4} key={item.id}>
                                            <Card className='card-social app-link'>
                                                <Card.Body className='border-bottom'>
                                                <a href={item.lien_app} target="_blank" rel="noopener noreferrer" onClick={() => visit(item)}>
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
                                                    <div className="col-6"><span onClick={()=>edit(item)} className="label bg-dark text-white f-12" style={{"cursor":"pointer"}}>Details</span></div>
                                                        <div className="col text-center"><a href={item.lien_app} target="_blank" rel="noopener noreferrer" className="label theme-bg text-white f-12 r-0" onClick={() => visit(item)}>Aller au site</a></div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )): (
                                        !loading && (<Col className="mt-4 text-center"> Aucune résultat </Col>)
                                )}
                            </Row>

                            <Card.Title as="h5"> Applications privilegiées </Card.Title>
                            {loading && (
                                <Row>
                                    <Col className="mt-4 text-center">
                                        <Spinner animation="border" role="status"></Spinner>
                                    </Col>
                                </Row>
                            )}
                            <hr/>
                            <Row>
                                {rows2.length > 0 ?
                                    rows2.map((item) => (
                                        <Col md={6} xl={4} key={item.id}>
                                            <Card className='card-social app-link'>
                                                <Card.Body className='border-bottom'>
                                                <a href={item.lien_app} target="_blank" rel="noopener noreferrer" onClick={() => visit(item)}>
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
                                                    <div className="col-6"><span onClick={()=>edit(item)} className="label bg-dark text-white f-12" style={{"cursor":"pointer"}}>Details</span></div>
                                                        <div className="col text-center"><a href={item.lien_app} target="_blank" rel="noopener noreferrer" className="label theme-bg text-white f-12 r-0" onClick={() => visit(item)}>Aller au site</a></div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )): (
                                        !loading && (<Col className="mt-4 text-center"> Aucune résultat </Col>)  
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
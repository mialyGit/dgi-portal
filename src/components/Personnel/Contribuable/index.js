import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Table, Spinner, Button } from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ContApi from "utils/cont";
import { API_SERVER } from "config/constant";
import { errorModal, deleteModal, Toast } from "../../Common/SweetModal"
import Aux from "hoc/_Aux";
import Avatar2 from "assets/images/user/avatar-2.jpg"

const Utilisateur = () => {
    const history = useHistory();
    const location = useLocation();

    const path = API_SERVER + 'storage/';
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)

    const defaultSrcImg = (e) => {
        e.target.src = Avatar2
    }

    const voir_details = (item) => {
        history.push({pathname: '/contribuables/details', state: {item}})
    }

    const remove = (id) => {
        deleteModal().fire({
            preConfirm: () => {
                deleteModal().getCancelButton().setAttribute("style","display:none")
                localStorage.removeItem("contribuables")
                return ContApi.delete(id)
                .then((res)=>{
                    Toast().fire(res.data.message,'','success');
                }).catch((err)=>{
                    deleteModal().close();
                    setTimeout(() => errorModal(err), 500);
                }).finally(()=> getAll())
            }
        })
    }

    const getAll = () => {
        if(location.state && location.state.newValue){
            Toast().fire('Utilisateur ajouté avec succès','','success');
            console.log(location.state.newValue);
            history.replace()
        }
        const data = JSON.parse(localStorage.getItem("contribuables"))
        if(data){
            setLoading(false);
            return setRows(data)
        }
        ContApi.getAll().then((res) => {
            const { data } = res;
            setRows(data);
            localStorage.setItem("contribuables", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("contribuables")
            errorModal(err)
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <Aux>
            <Row>
                <Col>
                    <Card className='Recent-Users'>
                        <Card.Header>
                            <Card.Title as='h5'>Liste des utilisateurs</Card.Title>
                            <div className="card-header-right">
                                <Link to="/contribuables/new">
                                    <Button variant="secondary" size="sm"><i className="feather icon-user-plus"></i>AJOUTER</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                                <tbody>
                                    <tr>
                                        <td>#</td>
                                        <td>Utilisateur</td>
                                        <td>Droit d'utilisation</td>
                                        <td>Date de création</td>
                                        <td>Options</td>
                                    </tr>
                                    {loading ? (
                                        <tr className="unread text-center">
                                            <td colSpan={4}><Spinner animation="border" role="status"></Spinner></td> 
                                        </tr>
                                    ) :
                                    rows.length > 0 ?
                                        rows.map((item) => (
                                            <tr className="unread" key={item.id} style={{"cursor":"pointer"}}>
                                                <td><LazyLoadImage onError={defaultSrcImg} className="rounded-circle" style={{width: '40px'}} src={ path + item.photo } alt="activity-user"/></td>
                                                <td>
                                                    <h6 className="mb-1">{item.nom} {item.prenom}</h6>
                                                    <small className="m-0">{item.email}</small>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{item.type_user_id === 1 ? 'Administrateur':'Utilisateur' }</h6>
                                                </td>
                                                <td>
                                                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{item.created_at }</h6>
                                                </td>
                                                <td><button className="theme-bg-btn red" onClick={() => remove(item.contribuable.id)}>Supprimer</button><button className="theme-bg-btn blue" onClick={() => voir_details(item)} >Détails</button></td>
                                            </tr>
                                        )) : (
                                            <tr className="unread text-center">
                                                <td colSpan={4}>Aucune résultat</td> 
                                            </tr>
                                        )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default Utilisateur;
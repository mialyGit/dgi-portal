import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Table, Spinner} from 'react-bootstrap';

import PersApi from "../../utils/pers";
import { API_SERVER } from "../../config/constant";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

function BootstrapTable() {

    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)

    const getAll = () => {
        PersApi.getAll().then((res) => {
            const { data } = res;
            setRows(data.slice(0, 8));
        }).finally((res) => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getAll();
    }, [])
    

    return (
        <Aux>
            <Row>
                <Col>
                    <Card className='Recent-Users'>
                        <Card.Header>
                            <Card.Title as='h5'>Liste des utilisateurs</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                                <tbody>
                                    {loading ? (
                                        <tr className="unread text-center">
                                            <Spinner animation="border" role="status"></Spinner>
                                        </tr>
                                    ) :
                                    rows.length > 0 ?
                                        rows.map((item) => (
                                            <tr className="unread" key={item.id}>
                                                <td><img className="rounded-circle" style={{width: '40px'}} src={ API_SERVER + item.photo } alt="activity-user"/></td>
                                                <td>
                                                    <h6 className="mb-1">{item.nom} {item.prenom}</h6>
                                                    <small className="m-0">{item.email}</small>
                                                </td>
                                                <td>
                                                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                                </td>
                                                <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                            </tr>
                                        )) : (
                                            <tr className="unread text-center">
                                                Aucune résultat
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

export default BootstrapTable;
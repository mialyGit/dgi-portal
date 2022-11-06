import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Button , InputGroup, FormControl } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom'

import DataTable from 'App/components/Datatable';
import AutreApi from "utils/autre";
import { errorModal, deleteModal, Toast, addService } from "../../Common/SweetModal"
import Aux from "hoc/_Aux";

const Service = () => {
    const history = useHistory();
    const location = useLocation();

    const [rows, setRows] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [loading, setLoading] = useState(true)


    function search (searchTerm) {
        setSearchValue(searchTerm);
        const data = JSON.parse(localStorage.getItem("services") || '[]')
        const filtered = data.filter(
            item =>
                JSON.stringify(item).toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
        );
        if(searchTerm) setResetPaginationToggle(true)
        setRows(filtered);
    }

    const columns = [
        {
            name: '#',
            selector : row => row.code_sc,
            width: '100px',
        },
        {
            name: 'Service',
            cell: row => 
            <>
                <h6 className="mb-1">{row.nom_sc}</h6>
                <small className="m-0" style={{'color' : 'rgba(0,0,0,.54)'}}>{row.mail_sc}</small>
            </>,
            style : {
                display: 'block'
            },
            sortable: true
        },
        {
            name: 'Lieu bureau',
            selector : row => row.lieu_bur_sc,
        },
        {
            name: 'Téléphone',
            selector : row => row.tel_sc ? row.tel_sc : 'Aucun contact',
        },
        {
            name: 'Options',
            cell: row => <><button className="theme-bg-btn blue" onClick={() => edit(row)}>Modifier</button> <button className="theme-bg-btn red" onClick={() => remove(row.id)}>Supprimer</button></>
        },
    ];
    

    const add = () => {
        let item = {
            code_sc : '', nom_sc : '', abrev_sc : '',cur_bur_sc : '', lieu_bur_sc : '', adresse_sc: '',
            mail_sc : '', tel_sc: '', tel_2_sc : '', direction_id : 1
        }
        const modal = addService('Ajouter un service', item)
        modal.fire({
            preConfirm: () => {
                item.code_sc = document.getElementById('code_sc').value
                item.nom_sc = document.getElementById('nom_sc').value
                item.abrev_sc = document.getElementById('abrev_sc').value
                item.cur_bur_sc = document.getElementById('cur_bur_sc').value
                item.lieu_bur_sc = document.getElementById('lieu_bur_sc').value
                item.adresse_sc = document.getElementById('adresse_sc').value
                item.mail_sc = document.getElementById('mail_sc').value
                item.tel_sc = document.getElementById('tel_sc').value
                item.tel_2_sc = document.getElementById('tel_2_sc').value

                if (item.nom_sc.trim() === '') {
                    return new Promise((resolve, reject) => { modal.showValidationMessage(`Veuiller entrer le nom du service`); resolve();});
                }
                modal.getCancelButton().setAttribute("style","display:none")
                localStorage.removeItem("services")
                return AutreApi.addService(item)
                .then((res)=>{
                    Toast().fire(res.data.message,'','success');
                }).catch((err)=>{
                    modal.close();
                    setTimeout(() => errorModal(err), 500);
                }).finally(()=> getAll())
            }
        })
    }

    const edit = (item) => {
        const modal = addService('Modifier un service', item)
        modal.fire({
            preConfirm: () => {
                modal.getCancelButton().setAttribute("style","display:none")
                item.nom_sc = document.getElementById('nom_sc').value
                item.code_sc = document.getElementById('code_sc').value
                item.nom_sc = document.getElementById('nom_sc').value
                item.abrev_sc = document.getElementById('abrev_sc').value
                item.cur_bur_sc = document.getElementById('cur_bur_sc').value
                item.lieu_bur_sc = document.getElementById('lieu_bur_sc').value
                item.adresse_sc = document.getElementById('adresse_sc').value
                item.mail_sc = document.getElementById('mail_sc').value
                item.tel_sc = document.getElementById('tel_sc').value
                item.tel_2_sc = document.getElementById('tel_2_sc').value
                
                localStorage.removeItem("services")
                return AutreApi.updateService(item, item.id)
                .then((res)=>{
                    Toast().fire(res.data.message,'','success');
                }).catch((err)=>{
                    modal.close();
                    setTimeout(() => errorModal(err), 500);
                }).finally(()=> getAll())
            }
        })
    }

    const remove = (id) => {
        deleteModal().fire({
            preConfirm: () => {
                deleteModal().getCancelButton().setAttribute("style","display:none")
                localStorage.removeItem("services")
                return AutreApi.deleteService(id)
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
            Toast().fire('Service ajouté avec succès','','success');
            console.log(location.state.newValue);
            history.replace()
        }
        const data = JSON.parse(localStorage.getItem("services"))
        if(data){
            setLoading(false);
            return setRows(data)
        }
        AutreApi.getServices().then((res) => {
            const { data } = res;
            setRows(data);
            localStorage.setItem("services", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("services")
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
                            <Card.Title as='h5'>Liste des services</Card.Title>
                            <div className="card-header-right">
                                <Row>
                                    <Col className="mt-1">
                                        <Button variant="secondary" size="sm" onClick={() => add()}>Ajouter un service</Button>
                                    </Col>
                                    <Col className="mt-1">
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
                        <Card.Body className='px-0 py-2'>
                            <DataTable
                                columns={columns}
                                data={rows}
                                pending={loading}
                                paginationResetDefaultPage={resetPaginationToggle}
                            />
                            {/* <Table responsive hover striped className="text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Service</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr className="unread text-center">
                                            <td colSpan={3}><Spinner animation="border" role="status"></Spinner></td> 
                                        </tr>
                                    ) :
                                    rows.length > 0 ?
                                        rows.map((item) => (
                                            <tr className="unread" key={item.id} style={{"cursor":"pointer"}}>
                                                <td>
                                                    <h6 className="mb-1">{item.id}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{item.nom_sc}</h6>
                                                </td>
                                                <td>
                                                <button className="theme-bg-btn blue" onClick={() => edit(item)}>Modifier</button> <button className="theme-bg-btn red" onClick={() => remove(item.id)}>Supprimer</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr className="unread text-center">
                                                <td colSpan={3}>Aucune résultat</td> 
                                            </tr>
                                        )}
                                </tbody>
                            </Table> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default Service;
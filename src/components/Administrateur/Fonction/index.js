import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Table, Spinner, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom'

import AutreApi from "utils/autre";
import { errorModal, deleteModal, Toast, addFonction } from "../../Common/SweetModal"
import Aux from "hoc/_Aux";

const Fonction = () => {
    const history = useHistory();
    const location = useLocation();

    const [rows, setRows] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true)

    function search (searchTerm) {
        setSearchValue(searchTerm);
        const data = JSON.parse(localStorage.getItem("fonctions") || '[]')
        const filtered = data.filter(
            item =>
                JSON.stringify(item).toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
        );
        setRows(filtered);
      }
    

    const add = () => {
        let item = {
            nom_fn : '',
            services : JSON.parse(localStorage.getItem("services") || '[]')
        }
        const modal = addFonction('Ajouter un fonction', item)
        modal.fire({
            preConfirm: () => {
                item.nom_fn = document.getElementById('nom_fn').value
                if (item.nom_fn.trim() === '') {
                    return new Promise((resolve, reject) => { modal.showValidationMessage(`Veuiller entrer le nom du fonction`); resolve();});
                }
                modal.getCancelButton().setAttribute("style","display:none")
                localStorage.removeItem("fonctions")
                return AutreApi.addFonction(item)
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
        item.services = JSON.parse(localStorage.getItem("services") || '[]')
        const modal = addFonction('Modifier un fonction', item)
        modal.fire({
            preConfirm: () => {
                modal.getCancelButton().setAttribute("style","display:none")
                item.nom_fn = document.getElementById('nom_fn').value
                localStorage.removeItem("fonctions")
                return AutreApi.updateFonction(item, item.id)
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
                localStorage.removeItem("fonctions")
                return AutreApi.deleteFonction(id)
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
            Toast().fire('Fonction ajouté avec succès','','success');
            console.log(location.state.newValue);
            history.replace()
        }
        const data = JSON.parse(localStorage.getItem("fonctions"))
        if(data){
            setLoading(false);
            return setRows(data)
        }
        AutreApi.getFonctions().then((res) => {
            const { data } = res;
            setRows(data);
            localStorage.setItem("fonctions", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("fonctions")
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
                            <Card.Title as='h5'>Liste des fonctions</Card.Title>
                            <div className="card-header-right">
                                <Row>
                                    <Col className="mt-1">
                                        <Button variant="secondary" size="sm" onClick={() => add()}>Ajouter un fonction</Button>
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
                            <Table responsive hover striped className="text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fonction</th>
                                        <th>Service</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr className="unread text-center">
                                            <td colSpan={4}><Spinner animation="border" role="status"></Spinner></td> 
                                        </tr>
                                    ) :
                                    rows.length > 0 ?
                                        rows.map((item) => (
                                            <tr className="unread" key={item.id} style={{"cursor":"pointer"}}>
                                                <td>
                                                    <h6 className="mb-1">{item.id}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{item.nom_fn}</h6>
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

export default Fonction;
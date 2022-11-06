import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Table, Spinner, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom'

import AutreApi from "utils/autre";
import { errorModal, deleteModal, Toast, addGrade } from "../../Common/SweetModal"
import Aux from "hoc/_Aux";

const Grade = () => {
    const history = useHistory();
    const location = useLocation();

    const [rows, setRows] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true)

    function search (searchTerm) {
        setSearchValue(searchTerm);
        const data = JSON.parse(localStorage.getItem("grades") || '[]')
        const filtered = data.filter(
            item =>
                JSON.stringify(item).toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
        );
        setRows(filtered);
      }
    

    const add = () => {
        let item = {
            nom_gr : ''
        }
        const modal = addGrade('Ajouter un grade', item)
        modal.fire({
            preConfirm: () => {
                item.nom_gr = document.getElementById('nom_gr').value
                if (item.nom_Grade.trim() === '') {
                    return new Promise((resolve, reject) => { modal.showValidationMessage(`Veuiller entrer le nom du grade`); resolve();});
                }
                modal.getCancelButton().setAttribute("style","display:none")
                localStorage.removeItem("grades")
                return AutreApi.addGrade(item)
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
        const modal = addGrade('Modifier un privilège', item)
        modal.fire({
            preConfirm: () => {
                modal.getCancelButton().setAttribute("style","display:none")
                item.nom_gr = document.getElementById('nom_gr').value
                localStorage.removeItem("grades")
                return AutreApi.updateGrade(item, item.id)
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
                localStorage.removeItem("grades")
                return AutreApi.deleteGrade(id)
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
            Toast().fire('Grade ajouté avec succès','','success');
            console.log(location.state.newValue);
            history.replace()
        }
        const data = JSON.parse(localStorage.getItem("grades"))
        if(data){
            setLoading(false);
            return setRows(data)
        }
        AutreApi.getGrades().then((res) => {
            const { data } = res;
            setRows(data);
            localStorage.setItem("grades", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("grades")
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
                            <Card.Title as='h5'>Liste des grades</Card.Title>
                            <div className="card-header-right">
                                <Row>
                                    <Col className="mt-1">
                                        <Button variant="secondary" size="sm" onClick={() => add()}>Ajouter un grade</Button>
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
                                        <th>Privilège</th>
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
                                                    <h6 className="mb-1">{item.nom_gr}</h6>
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
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default Grade;
import React, { useEffect, useState } from 'react';
import {Row, Col,InputGroup,FormControl, Card, Button } from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

import DataTable from 'App/components/Datatable';
import moment from 'moment';
import fr  from 'moment/locale/fr';

import PersApi from "utils/pers";
import { API_SERVER } from "config/constant";
import { errorModal, deleteModal, Toast } from "../../Common/SweetModal"
import Aux from "hoc/_Aux";
import Avatar2 from "assets/images/user/avatar-2.jpg"

const Utilisateur = () => {
    const history = useHistory();
    const location = useLocation();
    moment.updateLocale('fr', fr);
    const path = API_SERVER + 'storage/';
    const [rows, setRows] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true)

    function search (searchTerm) {
        setSearchValue(searchTerm);
        const data = JSON.parse(localStorage.getItem("personnels") || '[]')
        const filtered = data.filter(
            item =>
                JSON.stringify(item).indexOf(searchTerm) > -1
        );
        if(searchTerm) setResetPaginationToggle(true)
        setRows(filtered);
      }
    
      const columns = [
        {
            name: '#',
            cell: row => <LazyLoadImage onError={defaultSrcImg} className="rounded-circle" style={{width: '40px'}} src={ path + row.photo } alt="activity-user"/>,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
        {
            name: 'Numéro matricule',
            selector : row => row.personnel.num_matricule
        },
        {
            name: 'Utilisateur',
            cell: row => 
            <>
                <h6 className="mb-1">{row.nom} {row.prenom}</h6>
                <small className="m-0" style={{'color' : 'rgba(0,0,0,.54)'}}>{row.email}</small>
            </>,
            style : {
                display: 'block'
            },
            sortable: true
        },
        {
            name: 'Date de création',
            selector: row => moment(row.created_at).format('L'),
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Options',
            cell: row => <><button className="theme-bg-btn red" onClick={() => remove(row.personnel.id)}>Supprimer</button><button className="theme-bg-btn blue" onClick={() => voir_details(row)} >Détails</button></>
        },
    ];

    const defaultSrcImg = (e) => {
        e.target.src = Avatar2
    }

    const voir_details = (item) => {
        history.push({pathname: '/employes/details', state: {item}})
    }

    const remove = (id) => {
        deleteModal().fire({
            preConfirm: () => {
                deleteModal().getCancelButton().setAttribute("style","display:none")
                localStorage.removeItem("personnels")
                return PersApi.delete(id)
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
        const data = JSON.parse(localStorage.getItem("personnels"))
        if(data){
            setLoading(false);
            return setRows(data)
        }
        PersApi.getAll().then((res) => {
            const { data } = res;
            setRows(data);
            localStorage.setItem("personnels", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("personnels")
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
                            <Card.Title as='h5'>Liste des employés</Card.Title>
                            <div className="card-header-right">
                                <Row>
                                    <Col className="mt-1">
                                        <Link to="/employes/new">
                                            <Button variant="secondary" size="sm">Ajouter un(e) employé(e)</Button>
                                        </Link>
                                    </Col>
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
                        <Card.Body className='px-0 py-2'>
                            <DataTable
                                columns={columns}
                                data={rows}
                                pending={loading}
                                paginationResetDefaultPage={resetPaginationToggle}
                            />
                            {/* <Table responsive hover>
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
                                            <tr className="unread" key={item.id} style={{"cursor":"pointer"}} onClick={() => voir_details(item)}>
                                                <td><LazyLoadImage onError={defaultSrcImg} className="rounded-circle" style={{width: '40px'}} src={ path + item.photo } alt="activity-user"/></td>
                                                <td>
                                                    <h6 className="mb-1">{item.nom} {item.prenom}</h6>
                                                    <small className="m-0">{item.email}</small>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{item.type_user_id === 1 ? 'Administrateur':'Utilisateur' }</h6>
                                                </td>
                                                <td>
                                                    <h6 className="text-muted">{item.created_at}</h6>
                                                </td>
                                                <td><button className="theme-bg-btn red" onClick={() => remove(item.personnel.id)}>Supprimer</button><button className="theme-bg-btn blue" onClick={() => voir_details(item)} >Détails</button></td>
                                            </tr>
                                        )) : (
                                            <tr className="unread text-center">
                                                <td colSpan={4}>Aucune résultat</td> 
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

export default Utilisateur;
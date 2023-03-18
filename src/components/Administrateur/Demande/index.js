import React, { useEffect, useState } from 'react';
import {Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PersApi from "utils/pers";
import DataTable from 'App/components/Datatable';
import moment from 'moment';
import fr  from 'moment/locale/fr';

import { API_SERVER } from "config/constant";
import { errorModal } from "../../Common/SweetModal"
import Aux from "hoc/_Aux";
import Avatar2 from "assets/images/user/avatar-2.jpg"

const Demande = () => {

    const path = API_SERVER + 'storage/';
    moment.updateLocale('fr', fr);
    const [rows, setRows] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(-1);
    const [loading, setLoading] = useState(true)

    function search (searchTerm) {
        setSearchValue(searchTerm);
        const data = JSON.parse(localStorage.getItem("demandes") || '[]')
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
            cell: row => <LazyLoadImage onError={defaultSrcImg} className="rounded-circle" style={{width: '40px'}} src={ path + row.user.photo } alt="activity-user"/>,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
        {
            name: 'Utilisateur',
            cell: row => 
            <>
                <h6 className="mb-1">{row.user.nom} {row.user.prenom}</h6>
                <small className="m-0" style={{'color' : 'rgba(0,0,0,.54)'}}>{row.user.email}</small>
            </>,
            style : {
                display: 'block'
            },
            sortable: true
        },
        {
            id : "ddate",
            name: 'Date de demande',
            selector: row => moment(row.created_at).format('LL'),
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Status',
            cell: row => <><td>{(row.user.status !== 0 && (
                <h6 className="m-0 text-c-green"><i className="fa fa-circle text-c-green f-10 m-r-15"/> Activé </h6>
            ) ) || (
                <h6 className="m-0 text-c-red"><i className="fa fa-circle text-c-red f-10 m-r-15"/> Desactivé </h6>
            )}</td></>
        },
        {
            name: 'Options',
            cell: row => <>{(loadingStatus === row.id && (
                <button className="theme-bg-btn blue" disabled> En cours ... </button>
            )) || (
                (row.user.status === 0 && (<button className="theme-bg-btn blue" onClick={() => validate(row.user.status === 0,row.user.id)}>Valider</button>))
                ||
                (<button className="theme-bg-btn red" onClick={() => validate(row.user.status === 0,row.user.id)}>Désactiver</button>)
            )}</>
        },
    ];
    
    const defaultSrcImg = (e) => {
        e.target.src = Avatar2
    }

    const validate = (validate,id) => {
        setLoadingStatus(id);
        console.log(validate);
        return PersApi.validateStatus(validate, id)
        .then((res)=>{
            /*const data = JSON.parse(localStorage.getItem("demandes"))
            if(data && data.user){
                data.user.status = 1
                localStorage.setItem("demandes", JSON.stringify(data))
            }*/
            localStorage.removeItem("demandes")
        }).catch((err)=>{
            errorModal(err)
        }).finally(()=> {setLoadingStatus(-1);getAll();})
    }

    const getAll = () => {
        const data = JSON.parse(localStorage.getItem("demandes"))
        if(data){
            setLoading(false);
            return setRows(data)
        }
        PersApi.getAllDemandes().then((res) => {
            const { data } = res;
            setRows(data);
            localStorage.setItem("demandes", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("demandes")
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
                            <Card.Title as='h5'>Liste des demandes d'activation d'un compte</Card.Title>
                            <div className="card-header-right">
                                <InputGroup size="sm">
                                    <FormControl id="search_table" name="search_table" placeholder="Rechercher..." value={searchValue} onChange={e=> search(e.target.value)} />
                                    <InputGroup.Append>
                                        <InputGroup.Text><i className="feather icon-search"></i></InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
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
                                        <td>Date d'envoi</td>
                                        <td>Status</td>
                                        <td>Options</td>
                                    </tr>
                                    {loading ? (
                                        <tr className="unread text-center">
                                            <td colSpan={5}><Spinner animation="border" role="status"></Spinner></td> 
                                        </tr>
                                    ) :
                                    rows.length > 0 ?
                                        rows.map((item) => (
                                            <tr className="unread" key={item.id} style={{"cursor":"pointer"}}>
                                                <td><LazyLoadImage onError={defaultSrcImg} className="rounded-circle" style={{width: '40px'}} src={ path + item.user.photo } alt="activity-user"/></td>
                                                <td>
                                                    <h6 className="mb-1">{item.user.nom} {item.user.prenom}</h6>
                                                    <small className="m-0">{item.user.email}</small>
                                                </td>
                                                <td>
                                                    <h6 className="text-muted">{moment(item.created_at).format('L')}</h6>
                                                </td>
                                                <td>{(item.user.status !== 0 && (
                                                    <h6 className="m-0 text-c-green"><i className="fa fa-circle text-c-green f-10 m-r-15"/> Activé </h6>
                                                ) ) || (
                                                    <h6 className="m-0 text-c-red"><i className="fa fa-circle text-c-red f-10 m-r-15"/> Desactivé </h6>
                                                )}</td>
                                                <td>
                                                {(loadingStatus === item.id && (
                                                    <button className="theme-bg-btn blue" disabled> En cours ... </button>
                                                )) || (
                                                    (item.user.status === 0 && (<button className="theme-bg-btn blue" onClick={() => validate(item.user.status === 0,item.user.id)}>Valider</button>))
                                                    ||
                                                    (<button className="theme-bg-btn red" onClick={() => validate(item.user.status === 0,item.user.id)}>Désactiver</button>)
                                                )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr className="unread text-center">
                                                <td colSpan={5}>Aucune résultat</td> 
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

export default Demande;
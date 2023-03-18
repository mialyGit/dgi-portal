import React, { useEffect, useState } from 'react';
import {Row, Col, Card, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import DataTable from 'App/components/Datatable';
import moment from 'moment';
import fr  from 'moment/locale/fr';
import ContApi from "utils/cont";
import { API_SERVER } from "config/constant";
import { errorModal } from "../../Common/SweetModal"
import Aux from "hoc/_Aux";
import Avatar2 from "assets/images/user/avatar-2.jpg"

const Historique = () => {

    const path = API_SERVER + 'storage/';
    moment.updateLocale('fr', fr);
    const [rows, setRows] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true)
    const [loadingClear, setLoadingClear] = useState(false)

    function search (searchTerm) {
        setSearchValue(searchTerm);
        const data = JSON.parse(localStorage.getItem("hists") || '[]')
        const filtered = data.filter(
            item =>
                JSON.stringify(item).indexOf(searchTerm) > -1
        );
        if(searchTerm) setResetPaginationToggle(true)
        setRows(filtered);
      }

    
    const clear = () => {
        setLoadingClear(true);
        ContApi.clearHistory().then((res) => {
            console.log(res);
            setRows([])
        }).catch((err)=>{
            errorModal(err)
        }).finally(() => {
            localStorage.removeItem("hists")
            setLoadingClear(false);
        });
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
            grow : 2,
            sortable: true
        },
        {
            id : "ddate",
            name: 'Heure',
            selector: row => moment(row.created_at).fromNow(),
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Date',
            selector: row => moment(row.created_at).format('L'),
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Action',
            grow : 3,
            cell: row => 
            <h6 className="m-0">{row.action} </h6>
        },
    ];

    const defaultSrcImg = (e) => {
        e.target.src = Avatar2
    }

    const getAll = () => {
        const data = JSON.parse(localStorage.getItem("hists"))
        if(data){
                setLoading(false);
                return setRows(data);
        }
        ContApi.getAllHistoriques().then((res) => {
            const { data } = res;
            setRows(data);
            localStorage.setItem("hists", JSON.stringify(data))
        }).catch((err)=>{
            localStorage.removeItem("hists")
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
                            <Card.Title as='h5'>Activité des utilisateurs</Card.Title>
                            <div className="card-header-right">
                                <Row>
                                    <Col className="mt-1">
                                        {loadingClear ? 
                                        <Button variant="light" size="sm" disabled> <Spinner animation="border" size="sm" role="status"></Spinner> Traitement </Button>
                                    :   <Button variant="light" size="sm" onClick={clear}><i className="feather icon-trash"></i>Vider historiques </Button>}
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
                                        <td>Date</td>
                                        <td>Action</td>
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
                                                <td>
                                                    <h6 className="m-0 text-c-green"><i className="fa fa-circle text-c-green f-10 m-r-15"/> {item.action} </h6>
                                                </td>
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

export default Historique;
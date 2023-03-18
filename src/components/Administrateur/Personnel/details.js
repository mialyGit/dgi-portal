import React,{ useState, useEffect } from 'react'
import { useHistory, useLocation} from 'react-router-dom'
import {Table, Row, Col, Card, Spinner } from 'react-bootstrap';
import { errorModal, Toast } from "../../Common/SweetModal"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_SERVER, basename } from "config/constant";
import Aux from "hoc/_Aux";
import PrivilegeApi from 'utils/privilege';

const UserDetails = () => {
    const location = useLocation();
    const history = useHistory();
    const path = API_SERVER + 'storage/';
    const [preview, setPreview] = useState();
    const [uploadMessage, setUploadMessage] = useState({
        color : "text-muted",
        text : "Veuillez importer une icône ici"
    });

    const [user, setUser] = useState({})
    const [personnel, setPersonnel] = useState({})
    const [grade, setGrade] = useState({})
    const [fonction, setFonction] = useState({})
    const [service, setService] = useState({})
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const defaultSrcImg = (e) => {
        /*const mode = e.target.id
        mode === "edit_mode" ? e.target.src = basename + "/default-icon.png" :*/
        e.target.src = basename + "/user-icon-default.png";
    }

    const edit = (item) => {
        history.push({pathname: '/employes/privileges/edit', state: {item}})
    }

    const getAll = (id) => {
        if(location.state && location.state.newValue){
            Toast().fire('Privilège modifié avec succès','','success');
            console.log(location.state.newValue);
            history.replace()
        }

        /*const data = JSON.parse(localStorage.getItem("users_privileges"))
        if(data){
            setLoading(false);
            return setRows(data)
        }*/

        PrivilegeApi.get(id).then((res) => {
            const { data } = res;
            setRows(data);
            //localStorage.setItem("users_privileges", JSON.stringify(data))
        }).catch((err)=>{
            //localStorage.removeItem("users_privileges")
            errorModal(err)
        }).finally(() => {
            setLoading(false);
        });
    };

    const setDefaultValues = () => {
        if(location.state && location.state.item){
            let item =  location.state.item;
            if(!item.photo.includes('default-icon')){
                setPreview(path + item.photo)
                setUploadMessage({...uploadMessage, text: item.photo.split('/')[1]})
            }
            setPersonnel({...item.personnel})
            setFonction({...item.personnel.fonction})
            setService({...item.personnel.fonction.service})
            setGrade({...item.personnel.grade})
            setUser({...item});
            getAll(item.id)
        } else {
            history.push('/users')
        }
    }


    useEffect(() => {
        setDefaultValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5"> Information sur l'utilisateur </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={2}>
                                    <Card>
                                        <Card.Img id="show_mode" onError={defaultSrcImg} style={{ height : '100%' }} variant="top" src={ preview } alt="activity-user" />
                                        <small className={`mt-3 text-center ${uploadMessage.color}`} >{uploadMessage.text}</small>
                                    </Card>
                                </Col>
                                <Col></Col>
                                <Col md={4}>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Nom  : </label><b>{user.nom}</b></Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Prénom  : </label><b>{user.prenom}</b></Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Téléphone  : </label><b>{user.telephone}</b></Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Adresse  : </label><b>{user.adresse}</b></Col>
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Numéro matricule : </label><b>{personnel.num_matricule}</b></Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Fonction  : </label><b>{fonction.nom_fn}</b></Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Grade  : </label><b>{grade.nom_gr}</b></Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col><label className="mr-2"> Service  : </label><b>{service.nom_sc}</b></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Table responsive hover>
                                    <tbody>
                                        <tr>
                                            <td>#</td>
                                            <td>Application</td>
                                            <td>Details</td>
                                            <td>Options</td>
                                        </tr>
                                        {loading ? (
                                            <tr className="unread text-center">
                                                <td colSpan={4}><Spinner animation="border" role="status"></Spinner></td> 
                                            </tr>
                                        ) :
                                        rows.length > 0 ?
                                            rows.map((item) => (
                                                <tr className="unread" key={item.code_app}>
                                                    <td><LazyLoadImage onError={defaultSrcImg} className="rounded-circle" style={{width: '40px'}} src={ path + item.logo_app } alt="activity-user"/></td>
                                                    <td>
                                                        <h6 className="mb-1">{item.nom_app}</h6>
                                                        <small className="m-0">{item.nom_privilege}</small>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{item.desc_app}</h6>
                                                    </td>
                                                    <td>
                                                        <button className="theme-bg-btn blue" onClick={() => edit(item)} >Modifier</button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr className="unread text-center">
                                                    <td colSpan={4}>Aucun privilège aux applcations de DGI</td> 
                                                </tr>
                                            )}
                                    </tbody>
                                    </Table>
                                </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    )
    }

export default UserDetails;
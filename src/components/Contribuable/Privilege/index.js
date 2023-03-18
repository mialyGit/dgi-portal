import React,{ useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import {Table, Row, Col, Card, Spinner } from 'react-bootstrap';
import { errorModal } from "../../Common/SweetModal"
import { useAuth } from "auth-context/auth.context";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_SERVER, basename } from "config/constant";
import Aux from "hoc/_Aux";
import PrivilegeApi from 'utils/privilege';

const MesPrivilege = () => {
    const history = useHistory();
    const path = API_SERVER + 'storage/';

    const { userSession  } =  useAuth();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const defaultSrcImg = (e) => {
        /*const mode = e.target.id
        mode === "edit_mode" ? e.target.src = basename + "/default-icon.png" :*/
        e.target.src = basename + "/user-icon-default.png";
    }

    const getAll = (id) => {

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
        if(userSession){
            let item =  userSession;
            getAll(item.id)
        } else {
            history.push('/contribuables/apps')
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
                            <Card.Title as="h5"> Mes privilèges </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Table responsive hover>
                                    <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Application</th>
                                                <th>Details</th>
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
                                                <tr className="unread" key={item.code_app}>
                                                    <td><LazyLoadImage onError={defaultSrcImg} className="rounded-circle" style={{width: '40px'}} src={ path + item.logo_app } alt="activity-user"/></td>
                                                    <td>
                                                        <h6 className="mb-1">{item.nom_app}</h6>
                                                        <small className="m-0">{item.nom_privilege}</small>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{item.desc_app}</h6>
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

export default MesPrivilege;
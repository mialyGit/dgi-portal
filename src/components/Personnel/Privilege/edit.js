import React, { useState, useEffect } from 'react';
import {Form, InputGroup, Row, Col, Card, Button, Spinner} from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Select, { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import { API_SERVER } from "config/constant";
import Aux from "hoc/_Aux";
import PrivilegeApi from 'utils/privilege';
import { useAuth } from "auth-context/auth.context";

const EditPrivilege = () => {
    const location = useLocation();
    const history = useHistory();
    const path = API_SERVER + 'api/';
    const { userSession } =  useAuth();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [privileges, setPrivileges] = useState([])


    const loadPrivilege = (input,cb) => {
        fetch(`${path}privileges`).then((response) => response.json())
        .then((data) => {
          const options = []
          data.forEach((row) => {
            options.push({ label: `${row.nom_privilege}`, value: row.id, target : { name: 'privilege_id', value : row.id }})
          })
          cb(options);
        })
    }
    
    const filterOption = createFilter({ ignoreAccents: true })

    const customStyles  = (hasError) => ({
        container: base => ({
            ...base,
            flex: 1
        }),
        control: (styles) => ({
            ...styles
          }),
    })

    const handleMultiInputChange = (values) => {
        console.log(values);
        setPrivileges(values)
    };
    
    const save = (e) => {
        e.preventDefault();
        setError(undefined);
        // console.log(formErrors);
        setLoading(true);
        const privilege_id = privileges.map(el => el.value).join(',');
        const newData =  {...data}
        newData.privilege_id = privilege_id
        newData.maker_id = userSession.id
        console.log(newData);
        PrivilegeApi.update(newData).then((res)=>{
            console.log(res);
            let json = JSON.parse(localStorage.getItem('contribuables') || '[]')
            if(json.length === 0) { return history.push({pathname: '/contribuables'}); }
            else {
                let item = json.find(obj => obj.id === newData.user_id);
                return history.push({pathname: '/contribuables/details', state:{item}});
            }
        }).catch((err)=>{
            if (err.response.data) {
                setError(err.response.data.message);
            } else setError("Erreur survenue au serveur \n Veuillez contacter l'administrateur.");
            setLoading(false);
        })
        
    }

    const setDefaultValues = () => {
        if(location.state && location.state.item){
            let item =  location.state.item;
            setData({...item})
            fetch(`${path}privileges`).then((response) => response.json())
            .then((data) => {
                let options = []
                let privs = item.nom_privilege.split(',')
                let filtered = data.filter((el) => {
                    return privs.some((f) => {
                      // eslint-disable-next-line eqeqeq
                      return f.toUpperCase() == el.nom_privilege.toUpperCase();
                    });
                });

                filtered.forEach((row)=>{
                    options.push({ label: `${row.nom_privilege}`, value: row.id, target : { name: 'privilege_id', value : row.id }})
                })

                setPrivileges(options)
            })

        } else {
            history.push('/contribuables')
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
                    <Form onSubmit={save}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5"> Modifier des privilèges </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {/* { JSON.stringify(privileges) } */}
                                <Row>
                                    <Col md={6}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={4}>Utilisateur</Form.Label>
                                            <Col>
                                                <InputGroup size="sm">
                                                    <Select value={{ value: data.user_id, label: `${data.nom} ${data.prenom}` }} styles={ customStyles('user_id') } isDisabled/>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label className="text-right" column sm={4}>Application</Form.Label>
                                            <Col>
                                                <InputGroup size="sm">
                                                <Select value={{ value: data.application_id, label: `${data.nom_app}` }} styles={ customStyles('user_id') } isDisabled/>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={2}>Assigner au privilège</Form.Label>
                                    <Col>
                                        <InputGroup size="sm">
                                            <AsyncSelect value={privileges} isMulti cacheOptions filterOption={filterOption} loadOptions={loadPrivilege} defaultOptions placeholder="Selectionner le privilège"  styles={ customStyles('privileges') } onChange={handleMultiInputChange} />
                                        </InputGroup>
                                    </Col>
                                </Form.Group>
                                {error && (
                                <p className="text-danger form-text m-3">{error}</p>
                            )}

                            {(loading && (
                                <Button variant="primary" size="sm" className="pull-right mt-2" disabled>
                                    <Spinner as="span" className="mr-2" size="sm" animation="border" role="status" aria-hidden="true" />
                                    Veuillez patientez ...
                                </Button>
                            )) || (
                                <div className="pull-right mt-2">
                                    <Link to="/contribuables">
                                        <Button variant="secondary" size="sm">
                                            <i className="feather icon-x-circle"></i>Annuler
                                        </Button>
                                    </Link>
                                    <Button type="submit" variant="primary" size="sm">
                                        <i className="feather icon-save"></i>Sauvegarder
                                    </Button>
                                </div>
                            )}
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Aux>
    );
}

export default EditPrivilege;
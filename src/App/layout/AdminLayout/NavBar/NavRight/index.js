import React, { useState } from 'react';
import {Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import { useAuth } from "../../../../../auth-context/auth.context";
import { API_SERVER } from "../../../../../config/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';

const NavRight = (props) => {
    const [listOpen, setListOpen] = useState(false)
    const path = API_SERVER + 'storage/';
    const { userSession } = useAuth()

    const defaultSrcImg = (e) => {
        e.target.src = Avatar2
    }

    return (
        <Aux>
            <ul className="navbar-nav ml-auto">
                <li>
                    <Dropdown alignRight={!props.rtlLayout}>
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            <i className="icon feather icon-bell"/>
                        </Dropdown.Toggle>
                        <span className="badge badge-info badge-sm navbar-badge">1</span>
                        <Dropdown.Menu alignRight className="notification">
                            <div className="noti-head">
                                <h6 className="d-inline-block m-b-0">Notifications</h6>
                                <div className="float-right">
                                    <a href={DEMO.BLANK_LINK} className="m-r-10">Marquer comme lu</a>
                                    {/* <a href={DEMO.BLANK_LINK}>Effacer tout</a> */}
                                </div>
                            </div>
                            <ul className="noti-body">
                                <li className="n-title">
                                    <p className="m-b-0">NOUVEAU</p>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        <img className="img-radius" src={Avatar1} alt="Generic placeholder"/>
                                        <div className="media-body">
                                            <p><strong>{userSession.nom}</strong><span className="n-time text-muted"><i
                                                className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                            <p>Demande d'activation compte</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="n-title">
                                    <p className="m-b-0">ANCIEN</p>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        <img className="img-radius" src={Avatar2} alt="Generic placeholder"/>
                                        <div className="media-body">
                                            <p><strong>Joseph William</strong><span className="n-time text-muted"><i
                                                className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                            <p>Connexion au portail</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        <img className="img-radius" src={Avatar3} alt="Generic placeholder"/>
                                        <div className="media-body">
                                            <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i
                                                className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                            <p>Supprimer un personnel</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="noti-footer">
                                <a href={DEMO.BLANK_LINK}>Tout voir</a>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className={props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                    <a href={DEMO.BLANK_LINK} className="displayChatbox" onClick={() => setListOpen(true)}><i className="icon feather icon-mail"/></a>
                    <span className="badge badge-danger badge-sm navbar-badge">1</span>
                </li>
                <li className={props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                    <Link to="/profile">
                        <img onError={defaultSrcImg} src={path + userSession.photo} className="img-radius m-r-15" alt="Profile" width={30}/>
                        <span>{userSession.nom} {userSession.prenom}</span>
                    </Link>
                    {/* <div className="media userlist-box ripple">
                        <a className="media-left" href={DEMO.BLANK_LINK}>
                            <img className="media-object img-radius" src={Avatar1} alt="icon-user"/>
                        </a>
                        <div className="media-body">
                            <h6 className="chat-header"> Mialy <small class="d-block text-c-green">typing</small></h6>
                        </div>
                    </div> */}
                </li>
                {/* <li>
                    <Dropdown alignRight={!props.rtlLayout} className="drp-user">
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            <i className="icon feather icon-settings"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                                <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                <span>John Doe</span>
                                <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                    <i className="feather icon-log-out"/>
                                </a>
                            </div>
                            <ul className="pro-body">
                                <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings"/> Settings</a></li>
                                <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-user"/> Profile</a></li>
                                <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail"/> My Messages</a></li>
                                <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock"/> Lock Screen</a></li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </li> */}
            </ul>
            <ChatList userConnected={userSession} listOpen={listOpen} closed={() => setListOpen(false)} />
        </Aux>
    );
}

export default NavRight;

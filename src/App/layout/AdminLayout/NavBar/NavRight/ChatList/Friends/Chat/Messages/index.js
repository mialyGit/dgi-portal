import React from 'react';

import Aux from "../../../../../../../../../hoc/_Aux";
// const images = require.context('../../../../../../../../../assets/images/user', true);

const messages = (props) => {
    let image = '';
    
    let msgClass = ['media-body'];
    if(props.message.sender_id === props.user.id) {
        msgClass = [...msgClass, 'chat-menu-content'];
        image = (
            <a className="media-left photo-table" href={props.user.photo}>
                <img className="media-object img-radius img-radius m-t-5" src={props.user.photo} alt={props.user.name} />
            </a>
        );
    } else {
        msgClass = [...msgClass, 'chat-menu-reply'];
    }

    return (
        <Aux>
            <div className="media chat-messages">
                {image}
                <div className={msgClass.join(' ')}>
                    <div className="">
                        <p className="chat-cont">{props.message.content}</p>
                    </div>
                    <p className="chat-time">{props.message.created_at}</p>
                </div>
            </div>
        </Aux>
    );
};

export default messages;
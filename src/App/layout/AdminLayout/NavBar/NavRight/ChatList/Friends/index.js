import React, {Component} from 'react';

//import friend from './friends';
import Friend from './Friend';
import Chat from './Chat';
import { API_SERVER } from "config/constant";
import Aux from "../../../../../../../hoc/_Aux";

class Friends extends Component {
    state = {
        chatOpen: false,
        user: {},
        text: '',
        messages : [],
        friend: [],
    };

    sendMessage() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sender_id : this.props.userConnected.id,
                rec_id : this.state.user.id,
                content : this.state.text
            })
        };
        console.log(options);
        fetch(`${API_SERVER}api/messages`, options)
        .then((response) => response.json())
        .then(messages => {
            console.log(messages);
            this.getMessage(this.state.user.id);
            this.getFriendMessages();
        });
    }

    getMessage(rec_id) {
        let sender_id = this.props.userConnected.id
        fetch(`${API_SERVER}api/messages/${sender_id}/${rec_id}`)
        .then((response) => response.json())
        .then(messages => {
            this.setState({ messages })
        });
    }

    getFriendMessages () {
        let except_id = this.props.userConnected.id
        fetch(`${API_SERVER}api/friends/${except_id}`)
        .then((response) => response.json())
        .then(users => {
            let friendList = users.map(row => ({
                id: row.id,
                photo: `${API_SERVER}storage/${row.photo}`,
                name: `${row.prenom} ${row.nom}`,
                new: row.unread_message_count,
                status: row.unread_message_count,
                time: row.last_message ? row.last_message.content : ''
            }))
            this.setState({ friend: friendList });
        });
    }

    componentDidMount() {
        this.getFriendMessages()
    }

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.listOpen) {
            this.setState({chatOpen: false, user: {}, messages:[], text: ''});
        }
    };

    render() {
        const friendList = (this.state.friend).map(f => {
            return <Friend key={f.id} data={f} activeId={this.state.user.id} clicked={() => {this.setState({chatOpen: true, user: f}); this.getMessage(f.id)}} />;
        });
        return (
            <Aux>
                {friendList}
                <Chat 
                    user={this.state.user} 
                    messages={this.state.messages} 
                    text={this.state.text}
                    onChangeText={(e) => this.setState({text: e.target.value})}
                    sendMessage={() => this.sendMessage()} 
                    chatOpen={this.state.chatOpen} 
                    listOpen={this.props.listOpen} 
                    closed={() => this.setState({chatOpen: false, user: {}, messages: [], text: ''})}
                />
            </Aux>
        );
    }
}

export default Friends;

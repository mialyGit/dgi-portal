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
        lastOpen: false
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
        fetch(`${API_SERVER}api/messages`, options)
        .then((response) => response.json())
        .then(messages => {
            console.log(messages);
            this.setState({ text : '' })
            this.getMessage(this.state.user.id);
            this.getFriendMessages();
        });
    }

    getMessage(rec_id, rec_last = 0) {
        let sender_id = this.props.userConnected.id
        fetch(`${API_SERVER}api/messages/${sender_id}/${rec_id}`)
        .then((response) => response.json())
        .then(messages => {
            this.setState({ messages })
            if(sender_id === rec_last){
                fetch(`${API_SERVER}api/messages_seen/${rec_id}/${sender_id}`)
                .catch((error) => console.log(error))
            }
            
        });
    }

    getFriendMessages () {
        let except_id = this.props.userConnected.id
        fetch(`${API_SERVER}api/friends/${except_id}`)
        .then((response) => response.json())
        .then(users => {
            //console.log(users);
            users.sort((a,b) => {
                if(a.last_message && b.last_message){
                    if (a.last_message.created_at < b.last_message.created_at ){
                        return 1;
                    }
                    if (a.last_message.created_at > b.last_message.created_at ){
                        return -1;
                    }
                    return 0;
                } else return 1;
            })

            this.props.setUm(users.filter(function(item){
                if(item.last_message){
                    return !item.last_message.status
                }
                return false;
              }).length)

            let friendList = users.map(row => ({
                id: row.id,
                photo: `${API_SERVER}storage/${row.photo}`,
                name: `${row.prenom} ${row.nom}`,
                new: row.unread_message_count,
                status: row.unread_message_count,
                rec_id_last_message : row.last_message ? 
                    !row.last_message.status ? row.last_message.rec_id : 0 : 0,
                time: row.last_message ? row.last_message.content : ""
            }))

            this.setState({ friend: friendList });
        });
    }

    componentDidMount() {
        this.getFriendMessages()
    }

    static getDerivedStateFromProps(props) {
        if (!props.listOpen) {
          return {chatOpen: false, user: {}, messages:[], text: ''}
        }
    
        // Return null to indicate no change to state.
        return null;
      }

    /*componentWillReceiveProps = (nextProps) => {
        if (!nextProps.listOpen) {
            this.setState({chatOpen: false, user: {}, messages:[], text: ''});
        }
    };*/

    render() {
        const friendList = (this.state.friend).map(f => {
            return <Friend key={f.id} data={f} activeId={this.state.user.id} clicked={() => {
                this.setState({chatOpen: true, user: f}); 
                this.getMessage(f.id, f.rec_id_last_message)}
            } />;
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
                    closed={() => {this.setState({chatOpen: false, user: {}, messages: [], text: ''}); this.getFriendMessages();}}
                />
            </Aux>
        );
    }
}

export default Friends;

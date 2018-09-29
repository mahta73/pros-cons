import React, {Component} from 'react';

// import CSS file
import './listContainer.css';

//import react components 
import ModifiableList from '../modifiableList/modifiableList';

class ListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: '',
            userId: '',
            firstList: [],
            secondList: [],
        }
    }

    handleClick = (value) => {
        console.log(typeof value);
        fetch('https://avetiq-test.firebaseapp.com/proscons/group/g1538192803457/user/u1538192803457', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              title: 'testing',
              body: value
            }),
          })
    }
    

    render() {
        return (
            <div className = 'listsContainer'>
                <ModifiableList 
                    placeHolder = "Pro's"
                    title = "Pro's"
                    lists = {this.state.firstList}
                    handleClick = {this.handleClick}
                />
                <ModifiableList 
                    placeHolder = "Con's"
                    title = "Con's"
                    lists = {this.state.secondList} 
                    handleClick = {this.handleClick}
                />  
            </div>
        )
    }

    componentDidMount() {
        fetch('https://avetiq-test.firebaseapp.com/group/mahta_rezayazdi')
        .then(response => response.json())
        .then(data => { 
            this.setState({
                groupId: data.groupId
            });
            console.log(`group Id is ${this.state.groupId}`);
            return fetch('https://avetiq-test.firebaseapp.com/user/mahta_rezayazdi')
            }
        )
        .then(response => response.json())
        .then(data => {
            this.setState({
                userId: data.userId
            });
            console.log(`user Id is ${this.state.userId}`);
            return fetch(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`)
        })
        .then(response => response.json())
        .then(data => this.setState({
            firstList: data.pros,
            secondList: data.cons,
            }, () => console.log(this.state.firstList, this.state.secondList)
        ))
        .catch(err => console.log(err));
    }
}

export default ListContainer;
import React, {Component} from 'react';
import axios from 'axios';

// import CSS file
import './listContainer.css';

//import react components 
import ModifiableList from '../modifiableList/modifiableList';
import Edit from '../edit/edit';

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

    handleClick = (value, title) => {

        axios.get(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`)
        .then(res => {    
            if (title === "Con's") {
                res.data.cons.push(`${value}`);
            } else {
                res.data.pros.push(`${value}`);
            }
            
            this.setState({
                firstList: res.data.pros,
                secondList: res.data.cons
            });

            return axios.put(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`, 
            { 
                pros: res.data.pros,
                cons: res.data.cons,
            })
        })
    }
    
    handleDelete = (index, title) => {
        axios.get(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`)
        .then(res => {    
            if (title === "Con's") {
                res.data.cons.splice(index, 1);
            } else {
                res.data.pros.splice(index, 1);
            }
            
            this.setState({
                firstList: res.data.pros,
                secondList: res.data.cons
            });

            return axios.put(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`, 
            { 
                pros: res.data.pros,
                cons: res.data.cons,
            })
        })
    }

    editHandle = (element, index, title) => {
        this.setState(
            prevState => {
                if (title === "Pro's") {
                prevState.firstList.splice(index, 1, 
                    <Edit
                        value = {element}
                        onSave = {(event, value, title) => {
                            event.preventDefault();
                            axios.get(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`)
                                    .then(res => {
                                        res.data.pros.splice(index, 1, `${value}`);
                                        this.setState({firstList: res.data.pros});
            
                                        return axios.put(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`, 
                                        { 
                                            pros: res.data.pros,
                                            cons: res.data.cons,
                                        })
                                    })
                        }}
                    />
                );
                }else {
                    prevState.secondList.splice(index, 1, 
                        <Edit
                            value = {element}
                            onSave = {(event, value, title) => {
                                event.preventDefault();
                                axios.get(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`)
                                        .then(res => {
                                            res.data.cons.splice(index, 1, `${value}`);
                                            this.setState({secondList: res.data.cons});
                
                                            return axios.put(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`, 
                                            { 
                                                pros: res.data.pros,
                                                cons: res.data.cons,
                                            })
                                        })
                            }}
                        />
                    ); 
                }
                return {
                    firstList: prevState.firstList,
                    secondList: prevState.secondList
                }
            }
        )
    }

    render() {
        return (
            <div className = 'listsContainer'>
                <ModifiableList 
                    placeHolder = "Pro's"
                    title = "Pro's"
                    lists = {this.state.firstList}
                    handleClick = {this.handleClick}
                    handleDelete = {this.handleDelete}
                    editHandle = {this.editHandle}
                />
                <ModifiableList 
                    placeHolder = "Con's"
                    title = "Con's"
                    lists = {this.state.secondList} 
                    handleClick = {this.handleClick}
                    handleDelete = {this.handleDelete}
                    editHandle = {this.editHandle}
                />  
            </div>
        )
    }

    componentDidMount() {   
        axios.get('https://avetiq-test.firebaseapp.com/group/mahta_rezayazdi')
        .then(res => { 
            this.setState(
            { groupId: res.data.groupId }, () => console.log(this.state.groupId)
            );

            return axios.get('https://avetiq-test.firebaseapp.com/user/mahta_rezayazdi')
        })
        .then(res => {
           this.setState(
            { userId: res.data.userId }, () => console.log(this.state.userId)   
           ); 

           return axios.get(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`)
        })
        .then(res => {
            this.setState(
            { 
                firstList: res.data.pros,
                secondList: res.data.cons
            }, () => console.log(this.state.firstList, this.state.secondList)
            )
        })

        /*
            USING FETCH API

            fetch('https://avetiq-test.firebaseapp.com/group/mahta_rezayazdi')
            .then(response => response.json())
            .then(data => { 
                this.setState({
                    groupId: data.groupId
                });
                return fetch('https://avetiq-test.firebaseapp.com/user/mahta_rezayazdi')
                }
            )
            .then(response => response.json())
            .then(data => {
                this.setState({
                    userId: data.userId
                });
                return fetch(`https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`)
            })
            .then(response => response.json())
            .then(data => this.setState({
                firstList: data.pros,
                secondList: data.cons,
                }, () => console.log(this.state.firstList, this.state.secondList)
            ))
            .catch(err => console.log(err));
        */
    }
}

export default ListContainer;
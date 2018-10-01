import React, {Component} from 'react';
import axios from 'axios';

// import CSS file
import './listContainer.css';

//import react components 
import ModifiableList from '../modifiableList/modifiableList';
import Edit from '../edit/edit';

// urls
const groupID = 'https://avetiq-test.firebaseapp.com/group/mahta_rezayazdi';
const userID = 'https://avetiq-test.firebaseapp.com/user/mahta_rezayazdi';
let apiURL = '';

class ListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: '',
            userId: '',
            apiURL: '',
            firstList: [],
            secondList: [],
        }
    }

    
    // Everytime a todo is added, the whole list of Pro’s & Con’s should be submitted to the server 
    handleClick = (value, title) => {
        if (value !== '') {
            axios.get(apiURL)
            .then(res => {
                if (title === "Con's") {
                    if (res.data.cons === undefined ) {
                        return axios.put(apiURL, 
                            { 
                                pros: res.data.pros,
                                cons: [`${value}`],
                            })
                            .then(res => {
                                this.setState({
                                    secondList: res.data.cons,
                                });
                            })
                    } else {
                        res.data.cons.push(`${value}`);
                        return axios.put(apiURL, 
                            { 
                                pros: res.data.pros,
                                cons: res.data.cons,
                            })
                            .then(res => {
                                this.setState({
                                    secondList: res.data.cons,
                                });
                            })
                    }
                } else {
                    if (res.data.pros === undefined ) {
                        return axios.put(apiURL, 
                            { 
                                pros: [`${value}`],
                                cons: res.data.cons,
                            })
                            .then(res => {
                                this.setState({
                                    firstList: res.data.pros,
                                });
                            })
                    } else {
                        res.data.pros.push(`${value}`);
                        return axios.put(apiURL, 
                            { 
                                pros: res.data.pros,
                                cons: res.data.cons,
                            })
                            .then(res => {
                                this.setState({
                                    firstList: res.data.pros,
                                });
                            })
                    }
                }
            }).catch(err => console.log(err))
        } else {
           alert('Please fill out the field');
        }
    }
    
    // Everytime a todo is removed, the whole list of Pro’s & Con’s should be submitted to the server
    handleDelete = (index, title) => {
        axios.get(apiURL)
        .then(res => {    
            if (title === "Con's") {
            
                res.data.cons.splice(index, 1);
                
                this.setState({
                    secondList: res.data.cons 
                });
                console.log('cons lenght', res.data.cons.length);
            } else {
              
                res.data.pros.splice(index, 1);

                this.setState({
                    firstList: res.data.pros,
                });
                console.log('pros lenght', res.data.pros.length);
            }
            
            
            return axios.put(apiURL, 
                { 
                    pros: res.data.pros,
                    cons: res.data.cons,
                    empty: false
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
                            axios.get(apiURL)
                                .then(res => {
                                    if (res.data.pros[index]  !== value) {
                                        res.data.pros.splice(index, 1, `${value}`);
                                        this.setState({firstList: res.data.pros});
            
                                        return axios.put(apiURL, 
                                        { 
                                            pros: res.data.pros,
                                            cons: res.data.cons,
                                        })
                                    } else {
                                        this.setState({firstList: res.data.pros});
                                    }
                                })
                        }}
                    />
                );
                } else {
                    prevState.secondList.splice(index, 1, 
                        <Edit
                            value = {element}
                            onSave = {(event, value, title) => {
                                event.preventDefault();
                                axios.get(apiURL)
                                    .then(res => {
                                        res.data.cons.splice(index, 1, `${value}`);
                                        this.setState({secondList: res.data.cons});
                
                                        return axios.put(apiURL, 
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
            {/* hello I am just a comment*/}
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
        axios.get(groupID)
        .then(res => { 
            this.setState(
            { groupId: res.data.groupId }, () => console.log(this.state.groupId)
            );

            return axios.get(userID)
        })
        .then(res => {
           this.setState(
            { 
                userId: res.data.userId ,
            }, () => {
                apiURL = `https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${this.state.userId}`;
            }   
           ); 

           return axios.get(apiURL)
        })
        .then(res => {
            this.setState(
            { 
                firstList: res.data.pros,
                secondList: res.data.cons, 
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
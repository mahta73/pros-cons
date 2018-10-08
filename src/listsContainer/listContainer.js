import React, {Component} from 'react';
import axios from 'axios';

// import CSS file
import './listContainer.css';

// import the context provider and consumer
import { ContextProvider } from '../context/context';

//import react components 
import ModifiableList from '../modifiableList/modifiableList';

// urls
const groupID = 'https://avetiq-test.firebaseapp.com/group/mahta_rezayazdi';
const userID = 'https://avetiq-test.firebaseapp.com/user/mahta_rezayazdi';

class ListContainer extends Component {

    state = {
        groupId: '',
        userId: '',
        mainUrl: '',
        firstList: [],
        secondList: [],
        Edit: null,
    }
   
    // Everytime a todo is added, the whole list of Pro’s & Con’s should be submitted to the server 
    handleAdd = () => {
        
    }
    
    handleClick = (value, title) => {
        if (value !== '') {
            axios.get(this.state.mainUrl)
            .then(res => {
                if (title === "Con's") {
                    if (res.data.cons === undefined ) {
                        return axios.put(this.state.mainUrl, 
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
                        return axios.put(this.state.mainUrl, 
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
                        return axios.put(this.state.mainUrl, 
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
                        return axios.put(this.state.mainUrl, 
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
        axios.get(this.state.mainUrl)
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
            
            
            return axios.put(this.state.mainUrl, 
                { 
                    pros: res.data.pros,
                    cons: res.data.cons,
                    empty: false
                })
        })
    }

    handleSave = (mainArr, secondArr, index, value, title) => {
                mainArr.splice(index, 1, `${value}`);
                if (title === "Pro's") {
                
                    this.setState({firstList:mainArr});

                    return axios.put(this.state.mainUrl, 
                    { 
                        pros: mainArr,
                        cons: secondArr,
                    })
                
                } else {
                    
                    this.setState({secondList:mainArr});

                    return axios.put(this.state.mainUrl, 
                    { 
                        pros: secondArr,
                        cons: mainArr,
                    })
                }        
        }
  

    onSave = (value, title, index) => {
        axios.get(this.state.mainUrl)
        .then(res => {
            if (title === "Pro's") { 
                this.handleSave(res.data.pros, res.data.cons, index, value, title);
            } else {
                this.handleSave(res.data.cons, res.data.pros, index, value, title);
            }
        })   
    }

    editHandle = (element, index, title) => {
        import('../edit/edit')
        .then(mod => {
            this.setState( () => ({
                    Edit: mod.default
            }), () => {
                this.setState(
                    prevState => {
                        if (title === "Pro's") {
                            prevState.firstList.splice(index, 1, 
                                <this.state.Edit
                                    value = {element}
                                    index = {index}
                                    title = {title}
                                    onSave = {this.onSave}
                                />
                            );
                        } else {
                            prevState.secondList.splice(index, 1, 
                                <this.state.Edit
                                    value = {element}
                                    index = {index}
                                    title = {title}
                                    onSave = {this.onSave}
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
            )
        })
    }
    
    render() {

        const {
            firstList, 
            secondList
        } = this.state;

        return (
            <ContextProvider value = {{
                handleClick: this.handleClick,
                handleDelete: this.handleDelete,
                editHandle: this.editHandle
            }}>
                <div className = 'listsContainer'>
                    <ModifiableList 
                        title = "Pro's"
                        lists = {firstList}
                    />
                    <ModifiableList 
                        title = "Con's"
                        lists = {secondList} 
                    />  
                </div>
            </ContextProvider>
        )
    }

    componentDidMount() {   
        axios.get(groupID)
        .then(res => { 
            this.setState({ 
                groupId: res.data.groupId 
            });

            return axios.get(userID)
        })
        .then(res => {
           this.setState({ 
                userId: res.data.userId ,
                mainUrl: `https://avetiq-test.firebaseapp.com/proscons/group/${this.state.groupId}/user/${res.data.userId}`
            });

           return axios.get(this.state.mainUrl)
        })
        .then(res => {
            this.setState(
                { 
                    firstList: res.data.pros,
                    secondList: res.data.cons, 
                }
            )
        })
    }
}

export default ListContainer;
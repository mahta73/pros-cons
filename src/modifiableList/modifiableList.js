import React, {Component} from 'react';

// import react components
import Add from '../add/add';
import Edit from '../edit/edit';

// import CSS file
import './modifiableList.css';

class ModifiableList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    render() {
        const {
            title,
            placeHolder,
            lists,
            handleClick
        } = this.props;

        return (
            <div className = 'listContainer'>
               <h2>{title}</h2>

                <ul>
                    {
                    lists.map(
                        (element, index) =>                                 
                            <li 
                                key = {index}
                            >

                                <span
                                    onClick = { () => this.setState(
                                        prevState => {
                                            prevState.lists.splice(index, 1, 
                                                <Edit
                                                    value = {element}
                                                    onSave = {(value) => {
                                                        this.setState(
                                                            prevState => {
                                                                prevState.lists.splice(index, 1, `${value}`);
                                                                return {
                                                                    lists: prevState.lists
                                                                } 
                                                            }
                                                        );
                                                    }}
                                                />
                                            );
                                            return {
                                                lists: prevState.lists
                                            }
                                        }
                                    )}
                                >
                                    {element}
                                </span>

                                <div 
                                    className = 'deleteItem'
                                >
                                    Remove
                                </div>               
                            </li>
                        )
                    }
                </ul>

                <Add 
                    placeHolder = {placeHolder}
                    handleClick = {handleClick}
                />
            </div>
        )
    }
}

export default ModifiableList;
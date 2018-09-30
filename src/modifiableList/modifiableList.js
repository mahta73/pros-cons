import React, {Component} from 'react';

// import react components
import Add from '../add/add';

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
            handleClick,
            handleDelete,
            editHandle
        } = this.props;

        return (
            <div className = 'listContainer'>
               <h2>{title}</h2>

                <ul>
                    {
                        (lists === undefined ? 
                        null
                        :
                        lists.map(
                            (element, index) =>                             
                                <li 
                                    key = {index}
                                >
                                    <span
                                        className = 'editableItem'
                                        onClick = { () => editHandle(element, index, title) }
                                    >   
                                    {element}
                                    </span>
    
                                    <div 
                                        className = 'deleteItem'
                                        onClick = {() => handleDelete(index, title)}
                                    >
                                        Remove
                                    </div>               
                                </li>
                            )
                        )
                    
                    }
                </ul>

                <Add 
                    title = {title}
                    placeHolder = {placeHolder}
                    handleClick = {handleClick}
                />
            </div>
        )
    }
}

export default ModifiableList;
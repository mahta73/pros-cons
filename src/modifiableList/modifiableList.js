import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import react components
import Add from '../add/add';

// import CSS file
import './modifiableList.css';

class ModifiableList extends Component {

    state = {
        value: ''
    }

    render() {
        const {
            title,
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
                    handleClick = {handleClick}
                />
            </div>
        )
    }
}

ModifiableList.propTypes = {
    title: PropTypes.string,
    lists: PropTypes.array,
    handleClick: PropTypes.func,
    handleDelete: PropTypes.func,
    editHandle: PropTypes.func
}

export default ModifiableList;
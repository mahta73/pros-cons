import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import react components
import Add from './add';
import Remove from './remove';
import Element from './element';

// import CSS file
import './modifiableList.css';

class ModifiableList extends Component {

    render() {
        const {
            title,
            lists,
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
                                    <Element
                                        element = {element} 
                                        index = {index}
                                        title = {title}
                                    />
    
                                    <Remove 
                                        index = {index}
                                        title = {title}
                                    />  

                                </li>
                            )
                        )             
                    }
                </ul>
                
                <Add 
                    title = {title}
                />
            </div>
        )
    }
}

ModifiableList.propTypes = {
    title: PropTypes.string.isRequired,
    lists: PropTypes.array,
}

export default ModifiableList;
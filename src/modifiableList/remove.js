import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// import CSS file
import './modifiableList';

// import the context provider and consumer
import { ContextCunsomer } from '../context/context';

class Remove extends PureComponent {
    
    render() {
        
        return (
            <ContextCunsomer>
                {
                    (data) => 
                        <div 
                            className = 'deleteItem'
                            onClick = {() => data.handleDelete(this.props.index, this.props.title)}
                        >
                            Remove
                        </div> 
                    
                }
            
            </ContextCunsomer>
        )
    }
}

Remove.propTypes = {
    index: PropTypes.number,
    title: PropTypes.string
}

export default Remove;
import React, {Fragment} from 'react';

// import react components
import ListContainer from '../listsContainer/listContainer';

// import CSS file
import './shouldI.css';

// stateless component
const ShouldI = () => 
            <Fragment>
                <h1 className = 'shouldI'
                >
                    Should I ... ?
                </h1>
                <ListContainer />
            </Fragment>

export default ShouldI;
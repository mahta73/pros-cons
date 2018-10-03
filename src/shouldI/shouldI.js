import React, {PureComponent, Fragment} from 'react';

// import react components
import ListContainer from '../listsContainer/listContainer';

// import CSS file
import './shouldI.css';

// stateless component
class ShouldI extends PureComponent {
    render() {
        return (
            <Fragment>
                <h1 className = 'shouldI'
                >
                    Should I ... ?
                </h1>
                <ListContainer />
            </Fragment>
        )
    }
}

export default ShouldI;
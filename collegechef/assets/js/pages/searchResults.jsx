import React from 'react';
import { connect } from 'react-redux';
function SearchResults(props){
    console.log(props);
    return(
        <h1>This is search page</h1>
    );
}

function state2props(state) {
    return state.forms.search;
}


export default connect(state2props)(SearchResults);
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class Logout extends React.Component {
    
    render(){
        return(
            <Link  className="text-light mr-sm-4 nav-link" to="/" onClick={this.Logout}>Logout</Link>                  
        )};

        Logout(){      
            localStorage.clear();              
            this.props.history.push('/');       
        };
}
export default withRouter(Logout)
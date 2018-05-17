import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
    
    render(){
        return(
            
                <a className="text-light mr-sm-4 nav-link" onClick={this.Logout}>
                    Logout
                </a>
                      
        )};

        Logout(){
            localStorage.clear();
            window.location.reload();
            window.location.replace('http://localhost:9090');
        };



}
export default Logout
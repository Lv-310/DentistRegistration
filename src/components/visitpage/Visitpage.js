import React from 'react';
import ReactDOM from 'react-dom';
import VisitProfileCard from './VisitProfileCard'

class Visitpage extends React.Component{ 

    render(){
        return(
            <div className="row">
                <div className="col-md-4">
                    <VisitProfileCard idfromParent={this.props.match.params.userId}/>
                    </div>
                    <div className="col-md-8">
                   
                    </div>
            </div>  
        );
    }
}

export default Visitpage;
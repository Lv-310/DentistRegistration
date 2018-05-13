import * as React from 'react';
import NavBar from '../layoutElements/navbar/navbar';
import Footer from '../layoutElements/footer';
import Calendar from '../calendar/Calendar';

class UserHomePage extends React.Component{
    render() {
        return(
                <div>
                        <div className="h1">
                            Hello, user with ID {this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)}
                        </div>
                        <Calendar />
            </div>
        );
    }
}
export default UserHomePage;
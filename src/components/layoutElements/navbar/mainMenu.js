import *as React from 'react';

class MainMenu extends React.Component{
    render() {
        return(
            <ul className="nav navbar-nav">
                <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Link</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Service</a></li>
                <li className="nav-item"><a href="#" className="nav-link">More</a></li>
            </ul>
        );
    }
}
export default MainMenu;   
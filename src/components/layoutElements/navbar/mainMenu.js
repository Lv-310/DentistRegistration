import *as React from 'react';

class MainMenu extends React.Component{
    render() {
        return(
                <div className="ml-0">
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Link</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Service</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">More</a></li>
                    </ul>
                </div>
        );
    }
}
export default MainMenu;   
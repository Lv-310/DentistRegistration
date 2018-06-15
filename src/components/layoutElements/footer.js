import * as React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer bg-dark fixed-bottom">
                <div className="copyright container">
                    <div className="row spacer-25-vertical"/>
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto text-light align-self-center">
                            &copy;{(new Date()).getFullYear()} - Softserve IT Academy. Lv-310.Net  
                            </div>
                        </div> 
                    <div className="row spacer-25-vertical"/>
                </div>
            </footer>
        );
    }
}
export default Footer;
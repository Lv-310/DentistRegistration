import * as React from 'react';
import AdminServiceList from '../adminservicelist/AdminServiceList';

class AdminHomePage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminServiceList />
                    </div>
                </div>
            </div>
        );
    }
}
export default AdminHomePage;

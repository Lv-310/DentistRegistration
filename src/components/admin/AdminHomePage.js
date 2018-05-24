import * as React from 'react';
import AdminServiceList from '../adminservicelist/AdminServiceList';
import AdminAddNewService from '../adminservicelist/AdminAddNewService';

class AdminHomePage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminServiceList />
                    </div>
                    <div className="col-md-2">
                        <AdminAddNewService />
                        <button className="btn btn-secondary btn-block" data-toggle="modal" href=""
                            data-target="#addService">Add New Service
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}
export default AdminHomePage;

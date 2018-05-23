import * as React from 'react';
import AdminServiceList from '../adminservicelist/AdminServiceList';
import UserList from '../userList/UserList';
import InsertDoctor from '../doctors/InsertDoctor';
import DoctorListForAdminPage from '../doctors/DoctorListForAdminPage';

class AdminHomePage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminServiceList />
                    </div>
                    <div className="col-md-2">
                    <UserList />
                    </div>
                    <div> 
                     <DoctorListForAdminPage/>  <a className="text-red mr-sm-4 nav-link" data-toggle="modal" href="" data-target="#registerModalDoctor">Add new Doctor!</a>
                    </div>
                    <InsertDoctor/>
                </div>
            </div>
        );
    }
}
export default AdminHomePage;
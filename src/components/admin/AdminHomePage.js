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
                    <div className="col-md-2">
                         <a  className="text-red mb-1 ml-3 nav-link btn btn-secondary" data-toggle="modal" href="" data-target="#registerModalDoctor">Add new Doctor!</a>
                     <DoctorListForAdminPage/>  
                    </div>
                    <InsertDoctor/>
                </div>
            </div>
        );
    }
}
export default AdminHomePage;
import * as React from 'react';
import AdminServiceList from '../adminservicelist/AdminServiceList';
//import UserList from '../userList/UserList';
//import InsertDoctor from '../doctors/InsertDoctor';
//import DoctorListForAdminPage from '../doctors/DoctorListForAdminPage';
import AdminAddNewService from '../adminservicelist/AdminAddNewService';

class AdminHomePage extends React.Component {
    render() {
        return (
                <div id="exTab1" className="container-fluid margin-top-negative mx-0 px-0">
                <ul  className="nav nav-pills row mb-2 ml-3 mr-1">
			        <li className="nav-item col-md-4 text-center border border-primary mx-0 px-0">
                        <a className="nav-link active mx-0 px-0 rounded-0"  href="#1a" data-toggle="tab">Services</a>
			        </li>
			        <li className="nav-item col-md-4 text-center border border-primary xm-0 px-0">
                        <a className="nav-link mx-0 px-0 rounded-0" href="#2a" data-toggle="tab">Users</a>
			        </li>
			        <li className="nav-item col-md-4 text-center border border-primary mx-0 px-0">
                        <a className="nav-link mx-0 px-0 rounded-0" href="#3a" data-toggle="tab">Doctors</a>
			        </li>
		        </ul>
			    <div className="tab-content clearfix">
			        <div className="tab-pane active row justify-content-md-center" id="1a">
                        <div className="col-md-auto">
                            <a className="text-red mb-1 ml-3 nav-link btn btn-secondary" data-toggle="modal" href="" data-target="#addService">Add New Service </a>
                            <div className="ml-3">
                            <AdminServiceList/>
                            <AdminAddNewService />
                            </div>
                        </div>                          
				    </div>
				    <div className="tab-pane row justify-content-md-center ml-3 mr-1" id="2a">
                        {/*<UserList />*/}
				    </div>
                    <div className="tab-pane row justify-content-md-center" id="3a">
                        <div className="col-md-auto">
                            <a  className="text-red mb-1 ml-3 nav-link btn btn-secondary" data-toggle="modal" href="" data-target="#registerModalDoctor">Add new Doctor</a>
                            <div className="ml-3">
                            {/*<DoctorListForAdminPage />*/}
                            </div>
                        </div>
                        {/*<InsertDoctor />*/}
				    </div>
			    </div>
            </div>
        );
    }
}
export default AdminHomePage;
import React from 'react';
import ReactDOM from 'react-dom';
import './userList.css';
import baseURL from '../../helpers/url';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';
import Pagination from '../pagination/Pagination';

class UserList extends React.Component{
    constructor(){
        super();
       var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), FirstName: 'Item ' + (i+1) }));
        this.state = {
            'userList': [],
            pageOfItems: [],
           exampleItems: exampleItems
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
      this.setState({ pageOfItems: pageOfItems });
  }

    componentDidMount() {
        this.getUsers();
        this.changeCollapse();

    }
    getUsers() {
        fetchFrom('Users', 'get', null)
            .then(results => this.setState({ 'userList': results.data }));
    }

    changeCollapse() {
        if (isMobile)
          document.getElementById("demo").className = "collapse";
        else document.getElementById("demo").className = "collapse show";
      }

      render() {
        return (
          <div className="list-group">
            <a href="#" data-toggle="collapse" data-target="#demo" className="list-group-item active my-list-header btn-secondary dropdown-toggle-split" id="first">Users
          <i className="fas fa-sort-down" id="down-arrow"></i>
            </a>
    
            <div id="demo" className="collapse show">
              {this.state.pageOfItems.map((item, index) => {
                return <div key={index}>
                 <button type="button" key={index} className="list-group-item list-group-item-action">
                                {item.FirstName}
                </button>
                </div>
              }
              )}
              <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
            </div>
            <div>
      </div>
          </div>
        );
      }
}

export default UserList;
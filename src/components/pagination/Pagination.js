import React from 'react';
import { isMobile } from 'react-device-detect';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        let { items, pageSize } = this.props;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // get new page of items from items array
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }
    
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 7;
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;
        if (totalPages <= 6) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 4) {
                startPage = 1;
                endPage = 7;
            
            } else if (currentPage + 3 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
                
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 3;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages,
        };
    }
    
    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <nav>
            <ul className="pagination justify-content-center mt-1">
                <li className={pager.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>&laquo;</a>
                </li>
                <li className={pager.currentPage <5 ? 'd-none page-item' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(1)}>1</a>
                </li>
                <li className={pager.currentPage < 5 ? 'd-none page-item' : 'disabled page-item'}>
                    <a className="page-link">...</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page? 'active page-item' : 'page-item'}>
                    
                        <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                 <li className={pager.currentPage > pager.totalPages-3 ? 'd-none page-item' : 'disabled page-item'}>
                    <a className="page-link">...</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'active page-item' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.totalPages)}>{pager.totalPages}</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled page-item' : 'page-item'}>
                    <a  className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>&raquo;</a>
                </li>
                
            </ul>
            </nav>
        );
    }
}

export default Pagination;
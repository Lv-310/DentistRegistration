import * as React from 'react';

const MSG_TYPE_INFO = 1
const MSG_TYPE_WARNING = 2
const MSG_TYPE_ERROR = 3

function modalAlert(header, body, type)
{
    var typeClass = ""

    switch(type)
    {
        case MSG_TYPE_INFO:
            typeClass = "fa fa-info fa-3x text-info";
            break;
        case MSG_TYPE_WARNING:
            typeClass = "fa fa-warning fa-3x text-warning";
            break;
        case MSG_TYPE_ERROR:
            typeClass = "fa fa-times-circle-o fa-3x text-danger"
            break;
        default:
            typeClass = ""
    }
    document.getElementById("modal-alert-header").innerHTML = header;
    document.getElementById("modal-alert-body").innerHTML = body;
    document.getElementById("modal-alert-type").className = typeClass;
    document.getElementById("modal-alert-show").click();
}

function modalAlertClose()
{
    document.getElementById("modal-alert-close").click();
}

function renderAlertBody()
{
    return(
        <div>
            <button id="modal-alert-show" className="d-none" data-toggle="modal"  data-target="#modal-alert-main"></button>
            <div id="modal-alert-main" className="modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 id="modal-alert-header"></h4>
                            <button type="button" id="alert-modal-close" className="close" data-dismiss="modal"> &times;</button>
                        </div>
                        <div className="modal-body row">
                            <div className="col-sm-2 text-center" >
                                <i id="modal-alert-type"></i>
                            </div>
                            <div className="col-sm-10" id="modal-alert-body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export {MSG_TYPE_INFO, MSG_TYPE_WARNING, MSG_TYPE_ERROR, modalAlert, modalAlertClose, renderAlertBody}

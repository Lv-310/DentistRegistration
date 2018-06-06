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
    document.getElementById("modal-alert-buttons").hidden = true;
    document.getElementById("modal-alert-show").click();
}

function modalDialog(header, body, type, func, param)
{
    modalAlert(header,body,type);
    document.getElementById("modal-alert-buttons").hidden = false;
    document.getElementById("modal-alert-cancel").onclick = function(){modalAlertClose();};
    document.getElementById("modal-alert-ok").onclick = function()
    {
        func(param);
        modalAlertClose();
    };

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
                            <button type="button" id="modal-alert-close" className="close" data-dismiss="modal"> &times;</button>
                        </div>
                        <div className="modal-body container">
                            <div className="row">
                                <div className="col-sm-2 text-center" >
                                    <i id="modal-alert-type"></i>
                                </div>
                                <div className="col-sm-10" id="modal-alert-body"></div>
                            </div>
                            <div className="row mt-3" id="modal-alert-buttons">
                                <div className="col-md-6">
                                    <button id="modal-alert-cancel" className="btn btn-secondary btn-block">Cancel</button>
                                </div>
                                <div className="col-md-6" id="modal-alert-body">
                                    <button id="modal-alert-ok" className="btn btn-secondary btn-block">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export {MSG_TYPE_INFO, MSG_TYPE_WARNING, MSG_TYPE_ERROR, modalAlert,modalDialog, modalAlertClose, renderAlertBody}

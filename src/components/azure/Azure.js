import * as React from 'react';
import * as azure from 'azure-storage';
import {createBlockBlobFromBrowserFile} from 'azure-storage/lib/services/blob/blobservice.browser.js';
import {displayProcess} from './displayProcess';
import azureSasAndUrl from '../../helpers/azureurlandsas';
import './Azure.css';
import { modalAlert, MSG_TYPE_INFO } from '../../helpers/modalAlert';
import { fetchFrom } from '../../helpers/fetcher';

class Azure extends React.Component{
    constructor() {
        super();
        this.state = {
            selectedFileXRay: null
        }
    }

    fileSelectedHandlerXRay = event => {
        console.log(event.target.files[0])
            , this.setState(
                { selectedFileXRay: event.target.files[0] })
    }

    insertXRay(XRayParams) {
        return fetchFrom('XRay', 'post', XRayParams);
    }


    fileUploadHandlerXRay = () => {
        document.getElementById("progress").className = "progress col-lg px-0 mx-2 mt-2";
        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const XRayParams =
            {
                User_Id: this.props.idfromParent,
                Link: "/"+this.props.idfromParent+"/" + this.state.selectedFileXRay.name,
                Date: currentDate

            };

        var href = azureSasAndUrl.ShortUrl +"/client"+this.props.idfromParent +"/"+this.state.selectedFileXRay.name;
        displayProcess(0);
        const blobService = azure.createBlobServiceWithSas(azureSasAndUrl.ShortUrl, azureSasAndUrl.Sas);
        var customBlockSize = this.state.selectedFileXRay.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
        blobService.singleBlobPutThresholdInBytes = customBlockSize;
        var finishedOrError = false;
        blobService.createContainerIfNotExists("client".concat(this.props.idfromParent),{publicAccessLevel:"blob"},
            (error, response) => {
            
        })
        var speedSummary = blobService.createBlockBlobFromBrowserFile("client".concat(this.props.idfromParent), this.state.selectedFileXRay.name, this.state.selectedFileXRay, { blockSize: customBlockSize },
            (error, response) => {
                finishedOrError = true;
                if (error) {
                    // Handle blob error
                } else {
                    displayProcess(100);
                }
            });

        function refreshProgress() {
            setTimeout(function () {
                if (!finishedOrError) {
                    var process1 = speedSummary.getCompletePercent();
                    displayProcess(process1);
                    refreshProgress();
                }
                else {
                    modalAlert('Success', 'X-Ray Sent', MSG_TYPE_INFO);
                    var element = document.getElementById("href-XRay");
                    element.setAttribute("href", href)
                    document.getElementById("href-XRay").className = "visible col-lg my-0";
                    document.getElementById("row").className = "";
                    //alert(speedSummary.completeSize);

                }
            }, 200);
        }

        refreshProgress();
        this.setState({ selectedFileXRay: null });
        this.state.id = this.insertXRay(XRayParams);
        //this.props.callback(id);
    }

    defaultVisibility() {
        document.getElementById("progress").className = "invisible";
        document.getElementById("href").className = "invisible col-lg";
        document.getElementById("row").className = "d-none";
        document.getElementById("upload").className = "invisible col-md";
    }

    changeVisibility() {
        document.getElementById("upload").className = "btn btn-secondary my-1 col-md mx-2";
    }

    fileUploadHandler1 = () => {
        const blobService = azure.createBlobServiceWithSas('https://lv301storage.blob.core.windows.net', 'se=2018-06-30&sp=rwdlac&sv=2017-07-29&ss=b&srt=sco&sig=ClSfTtPzdu5u0%2BivPlPdoDy1dY1QUQvAeylYyZ2nC4Y%3D');
        blobService.listBlobsSegmented('images', null,
            (error, results) => {
                if (error) {
                    // Handle blob error
                }
                else {
                    results.entries.forEach(blob => {
                        console.log(blob.name);
                    })
                }
            })


    }




    fileUploadHandler2 = () => {
        const blobService = azure.createBlobServiceWithSas('https://lv301storage.blob.core.windows.net', 'se=2018-06-30&sp=rwdlac&sv=2017-07-29&ss=b&srt=sco&sig=ClSfTtPzdu5u0%2BivPlPdoDy1dY1QUQvAeylYyZ2nC4Y%3D');
        blobService.createContainerIfNotExists('images', '1.png', (error, results) => {
            if (error) {
                // Handle blob error
            }
            else { console.alert('delate') }
        })
    }
  render() {
    return (
        <div className="container">
            <div className="row">
                <label className="btn btn-secondary my-1 mx-2 col-md" for="avatar" onClick={this.changeVisibility}>Add XRay
                    <input type="file" id="avatar" onChange={this.fileSelectedHandlerXRay} hidden />
                </label>
                <label className="invisible col-md" id="upload">Upload
                    <button className="invisible" onClick={this.fileUploadHandlerXRay} />
                </label>
            </div>
            <div className="form-group hidden row" id="uploadProgressBarContainer">
                <div className="invisible" id="progress">
                    <div class="progress-bar bg-warning mx-0 px-0 " role="progressbar" id="uploadProgressBar" >
                        0%
                    </div>

                </div>
            </div>
            <div className="row" id="row">
                <p className="invisible col-lg" id="href"><a className="invisible" href="" id="href-XRay" onClick={this.defaultVisibility}>View X-Ray</a></p>
            </div>
        </div>
    );
  }
}

export default Azure;

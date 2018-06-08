import * as React from 'react';
import * as azure from 'azure-storage';
import {createBlockBlobFromBrowserFile} from 'azure-storage/lib/services/blob/blobservice.browser.js';
import {displayProcess} from './displayProcess';
import azureSasAndUrl from '../../helpers/azureurlandsas';

class Azure extends React.Component{
    constructor()   {
        super();
    this.state={
        selectedFile:null
    }
    }

    fileSelectedHandler = event =>{
                                    console.log(event.target.files[0])
                                    ,  this.setState(
                                    {selectedFile: event.target.files[0] })
                                   }


    fileUploadHandler = ()=>{ 
        var zminna="https://lv301storage.blob.core.windows.net/images/"+this.state.selectedFile.name;
        displayProcess(0);
       // document.getElementById("uploadProgressBarContainer").classList.remove('hidden');
        const blobService=azure.createBlobServiceWithSas(azureSasAndUrl.ShortUrl,azureSasAndUrl.Sas);
        var customBlockSize = this.state.selectedFile.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
        blobService.singleBlobPutThresholdInBytes = customBlockSize;
        var finishedOrError = false;
        var speedSummary=blobService.createBlockBlobFromBrowserFile('images',this.state.selectedFile.name, this.state.selectedFile,   { blockSize: customBlockSize }  ,
                                                                                         (error, response) => {
                                                                              finishedOrError=true;
                                                                              if(error) {
                                                                            // Handle blob error
                                                                             } else {
                                                                            displayProcess(100);}
                                                                     });

        function refreshProgress() {
            setTimeout(function () {
                    if (!finishedOrError) {
                        var process1 = speedSummary.getCompletePercent();
                        displayProcess(process1);
                        refreshProgress();}
                    else{//alert('заєбісь-чьотка');
                    //document.getElementById("lolkek").attr("href", "http://www.google.com/");
                       // displayProcess(0);
                    }
                                    }, 200);}                 
                                      
        refreshProgress();                       
this.setState({selectedFile:null});
    }




    fileUploadHandler1 = ()=>{ 
        const blobService=azure.createBlobServiceWithSas('https://lv301storage.blob.core.windows.net','se=2018-06-30&sp=rwdlac&sv=2017-07-29&ss=b&srt=sco&sig=ClSfTtPzdu5u0%2BivPlPdoDy1dY1QUQvAeylYyZ2nC4Y%3D');
        blobService.listBlobsSegmented('images', null,
                                                     (error, results) => {
                                                    if(error) {
                                                        // Handle blob error
                                                              }
                                                     else {
                                                        results.entries.forEach(blob => {
                                                            console.log(blob.name);
                                                        })                                                    }
                                                })
   

    }




    fileUploadHandler2 = ()=>{ 
        const blobService=azure.createBlobServiceWithSas('https://lv301storage.blob.core.windows.net','se=2018-06-30&sp=rwdlac&sv=2017-07-29&ss=b&srt=sco&sig=ClSfTtPzdu5u0%2BivPlPdoDy1dY1QUQvAeylYyZ2nC4Y%3D');
        blobService.deleteBlobIfExists('images','1.png', (error, results) => {
                                                                                if(error) {
                                                                            // Handle blob error
                                                                                          } 
                                                                                 else{console.alert('delate')}})
                            }
  render() {
    return (
        <div>
            <input type="file" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}>upload</button>
            <div className="form-group hidden" id="uploadProgressBarContainer">
            lol
                <div className="progress">
                    <div className="progress-bar" role="progressbar" id="uploadProgressBar" >
                            0%
                    </div>
                    
                </div>
                <p><a href="facebook.com" id="lolkek">Переходим</a> на вторую страницу</p>
            </div>
        </div>
    );
  }
}

export default Azure;

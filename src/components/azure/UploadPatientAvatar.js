import * as React from 'react';
import * as azure from 'azure-storage';
import {createBlockBlobFromBrowserFile} from 'azure-storage/lib/services/blob/blobservice.browser.js';
import {displayProcess} from './displayProcess';
import azureSasAndUrl from '../../helpers/azureurlandsas';
import {InsertAvatar} from './InsertAvatar';

class UploadPatientAvatar extends React.Component{
    constructor(props)   {
        super(props);
    this.state={
        
    }
    }

    fileSelectedHandlerPatientAvatar = (event) =>{ this.setState(
        {selectedFile: event.target.files[0]});
        const AvatarParams=
        {
            PhoneNum: this.props.PhoneNumPatient,
            Path: "/avatarpatient/"+ event.target.files[0].name}        
    
        const blobService=azure.createBlobServiceWithSas(azureSasAndUrl.ShortUrl,azureSasAndUrl.Sas);
        
        blobService.createBlockBlobFromBrowserFile('avatarpatient',
        event.target.files[0].name, event.target.files[0],(error, response) => {
        if(error) {
    // Handle blob error
        } else {
    }
});

InsertAvatar(AvatarParams)//.then(setTimeout(function(){ document.location.reload(); }, 3000));
        };
                         
  render() {
    return (
        <div>
            <label className="btn btn-secondary" for="kek">Upload Avatar
            <input type="file" id="kek" onChange={this.fileSelectedHandlerPatientAvatar} hidden />
            </label>
        </div>
    );
  }
}

export default UploadPatientAvatar;

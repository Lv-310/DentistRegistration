import * as React from 'react';
import * as azure from 'azure-storage';
import {createBlockBlobFromBrowserFile} from 'azure-storage/lib/services/blob/blobservice.browser.js';
import {displayProcess} from './displayProcess';
import azureSasAndUrl from '../../helpers/azureurlandsas';
import {InsertAvatar} from './InsertAvatar';

class UploadAvatar extends React.Component{
    constructor(props)   {
        super(props);
    this.state={
        
    }
    }
    fileSelectedHandlerDoctorAvatar = (event) =>{ this.setState(
        {selectedFileAvatar: event.target.files[0]});
        const AvatarParams=
        {
            PhoneNum: this.props.PhoneNum,
            Path: "/avatar/"+ event.target.files[0].name}        
    
        const blobService=azure.createBlobServiceWithSas(azureSasAndUrl.ShortUrl,azureSasAndUrl.Sas);
        
        blobService.createBlockBlobFromBrowserFile('avatar',
        event.target.files[0].name, event.target.files[0],(error, response) => {
        if(error) {
    // Handle blob error
        } else {
    }
});

        InsertAvatar(AvatarParams).then(setTimeout(function(){ document.location.reload(); }, 3000));;
        };
                         
  render() {
    return (
        <div>
            <label className="btn btn-secondary" for="lol">Upload Avatar
            <input type="file" id="lol" onChange={this.fileSelectedHandlerDoctorAvatar} hidden />
            </label>
        </div>
    );
  }
}

export default UploadAvatar;

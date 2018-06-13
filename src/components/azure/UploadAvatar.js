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

    fileSelectedHandler = (event) =>{ this.setState(
        {selectedFile: event.target.files[0]});
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

        InsertAvatar(AvatarParams);
        };
                         
  render() {
    return (
        <div>
            <label className="btn btn-secondary" for="avatar">Upload Avatar
            <input type="file" id="avatar" onChange={this.fileSelectedHandler} hidden />
            </label>
        </div>
    );
  }
}

export default UploadAvatar;

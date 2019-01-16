
declare var manywho: any;

import * as React from 'react';
import './FileDownloader.css';

class FileDownloaderComplex extends React.Component<any, any> 
{   
    componentId: string = "";
    flowKey: string ="";    
    attributes : any = {};
    selectedItem: string = null;

    text : string = "";

    constructor(props : any)
	{
        super(props);
        
        this.componentId = props.id;
        this.flowKey = props.flowKey;

        //push attributes into keyed map 
		var flowModel = manywho.model.getComponent(this.props.id,   this.props.flowKey);
		if(flowModel.attributes)
		{
			for(var key in flowModel.attributes)
			{
				this.attributes[key] = flowModel.attributes[key];
			}
        }
    }

    
    componentDidMount() 
    {
        //copy the model to the state
        const flowModel = manywho.model.getComponent(this.componentId,   this.flowKey);
        const flowState = manywho.state.getComponent(this.componentId, this.flowKey) || {};

        var objectData : any;
        if(flowState.objectData[0])
        {
            objectData=flowState.objectData[0];
            var props = objectData.properties;
        }
        else
        {
            objectData=flowModel.objectData[0];
        }

        objectData = JSON.parse(JSON.stringify(objectData));
        
        var newState = {
			objectData: [objectData]
		};
             
        manywho.state.setComponent(this.componentId, newState, this.flowKey, true);
        this.forceUpdate();
    }

    componentDidUpdate()
    {

    }

	getAttribute(attributeName : string)
	{
		if(this.attributes[attributeName])
		{
			return this.attributes[attributeName];
		}
		else
		{
			return null;
		}
	}

       
    render()
    {
        const flowModel = manywho.model.getComponent(this.componentId,   this.flowKey);
        const flowState = manywho.state.getComponent(this.componentId,   this.flowKey);

        if(flowModel.objectData && flowModel.objectData[0])
        {
            var objectData = flowModel.objectData[0];
            var fileData : any = manywho.utils.getObjectDataProperty(objectData.properties, "Content").contentValue;
            var fileName : any = manywho.utils.getObjectDataProperty(objectData.properties, "File Name").contentValue;
            var extension : any = manywho.utils.getObjectDataProperty(objectData.properties, "Extension").contentValue;
            var size : any = manywho.utils.getObjectDataProperty(objectData.properties, "Size").contentValue;
            var mimeType : any = manywho.utils.getObjectDataProperty(objectData.properties, "MimeType").contentValue;
        
            var dataUri : string = "data:binary/octet-stream;base64," + fileData;
        
        }

        

        

        var caption : string = this.getAttribute("Title") || "Download";
        var icon : string = this.getAttribute("Icon") || "envelope";
        var icon : string = this.getAttribute("PointSize") || "48";
        icon += "pt";
       

        return <div className="file-box"  >
                    <div className="file-box-body">
                        <a download={fileName} href={dataUri}>
                            <span className="glyphicon glyphicon-envelope icon-button" title="Download File"></span>
                        </a>
                    </div>
               </div>
    }

    
}

manywho.component.register('FileDownloaderComplex', FileDownloaderComplex);

export default FileDownloaderComplex;
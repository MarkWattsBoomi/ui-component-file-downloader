
declare var manywho: any;

import * as React from 'react';
import './FileDownloader.css';

class FileDownloader extends React.Component<any, any> 
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

        var fileData : any = flowState.contentValue;

        var dataUri : string = "data:binary/octet-stream;base64," + fileData;

        var caption : string = this.getAttribute("Title") || "Download";
        var icon : string = this.getAttribute("Icon") || "envelope";
        var icon : string = this.getAttribute("PointSize") || "48";
        icon += "pt";
       

        return <div className="file-box"  >
                    <div className="file-box-body">
                        <a download="firmware" href={dataUri}>
                            <span className="glyphicon glyphicon-envelope icon-button" title="Download File"></span>
                        </a>
                    </div>
               </div>
    }

    
}

manywho.component.register('FileDownloader', FileDownloader);

export default FileDownloader;
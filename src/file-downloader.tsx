
import * as React from 'react';
import './file-downloader.css';
import { FlowComponent, eLoadingState, FlowObjectData, eContentType } from 'flow-component-model';
import { CSSProperties } from 'react';
import {Buffer} from 'buffer';
declare const manywho: any;

export default class FileDownloader extends FlowComponent {

    // content holder to avoid blank pages during moves 
    lastContent: any = (<div></div>);
    context: any;
    anchor: HTMLAnchorElement;

    constructor(props: any) {
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
    }

    async componentDidMount() {
        await super.componentDidMount();
        this.forceUpdate();
    }

    async downloadFile(e: any) {

       

        let fileName: string;
        let extension: string;
        let size: number = 0;
        let mimeTypeStr: string;
        let base64: string;
        let dataAttributes: Map<string,string> = new Map();
        let dataUri: any;

        let statetype: eContentType = this.getStateValueType();
        switch(statetype){
            case eContentType.ContentString:
                base64 = this.getStateValue() as string;
                fileName = this.getAttribute("fileName",new Date().getTime() + "");
                extension = this.getAttribute("extension","txt")
                mimeTypeStr = this.getAttribute("mimeType","text/plain")
                break;
            case eContentType.ContentObject:
                const od: FlowObjectData = (this.getStateValue() as unknown) as FlowObjectData;
                if (od) {
                    fileName = od.properties.FileName.value as string;
                    extension = od.properties.Extension.value as string;
                    mimeTypeStr = od.properties.MimeType.value as string;
                    base64 = (od.properties.Content.value as string);
                    dataUri = base64;
                }
                break;
        }
        
        /*
        if(base64.indexOf(',') >= 0){
            let attrs: string=base64.split(',')[0];
            let dataAttrs: string[] = attrs.split(";");
            if(dataAttrs && dataAttrs.length > 0) {
                for(let pos = 0 ; pos < dataAttrs.length ; pos++) {
                    let dataAttrElements:string[] = dataAttrs[pos].split("=");
                    if(dataAttrElements.length>0) {
                        dataAttributes.set(dataAttrElements[0],dataAttrElements[1]?dataAttrElements[1]:"");
                    }
                    
                }
                
            }
            if(dataAttributes.has("data")) {
                mimeTypeStr = dataAttributes.get("data")
            }
            base64=base64.split(',')[1];
        }
*/

        let accept: any = {};
        accept[mimeTypeStr] = "." + extension;

        let pickerOpts: any = {
            suggestedName: fileName,
            types: [
                {
                    description: extension + ' files',
                    accept: accept,
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };
        const blob = await (await fetch(dataUri)).blob(); 
        const fileHandle = await (window as any).showSaveFilePicker(pickerOpts);
        const fileStream = await fileHandle.createWritable();
        await fileStream.write(blob);
        await fileStream.close();

        const outcome: string = this.getAttribute('onClickOutcome', '');
        if (outcome.length > 0) {
            await this.triggerOutcome(outcome);
        }
    }

    render() {

        if(this.loadingState !== eLoadingState.ready) {
            return this.lastContent;
        }

        let classes: string = "file-box " + this.getAttribute("classes","");
        let style: CSSProperties = {};
        style.width = "-webkit-fill-available";
        style.height = "-webkit-fill-available";

        if(this.model.visible === false) {
            style.display = "none";
        }
        if(this.model.width) {
            style.width=this.model.width + "px"
        }
        if(this.model.height) {
            style.height=this.model.height + "px"
        }

        const dataUri: string = 'data:binary/octet-stream;base64,' + this.getStateValue() as string;

        const caption: string = this.getAttribute('title',"File Downloader");
        const icon: string = this.getAttribute('icon','envelope');
        const className: string = 'glyphicon glyphicon-' + icon + ' icon-button';
        const iconSize: number = parseInt(this.getAttribute('pointSize', '24'));
        const outcome: string = this.getAttribute('onClickOutcome', '');
        const iconStyle: React.CSSProperties = { fontSize: iconSize + 'pt' };

        return (
            <div className={classes} >
                <div className="file-box-body">
                <a
                    href={'#'}
                    ref={(element: any) => {this.anchor = element; }}
                    onClick={this.downloadFile}
                >
                    <span
                        className={className}
                        style={iconStyle}
                        title={caption}

                    />
                </a>
                </div>
            </div>
        );
    }

}

manywho.component.register('FileDownloader', FileDownloader);


import * as React from 'react';
import './file-downloader.css';
//import { FlowComponent, eLoadingState } from 'flow-component-model';
//import "flow-component-model"
import { FlowComponent, eLoadingState, FlowObjectData, eContentType } from 'flow-component-model';
import { CSSProperties } from 'react';
//import { eLoadingState } from 'FlowBaseComponent';
//import { eLoadingState } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowBaseComponent';
//import {FlowComponent} from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowComponent';
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
        let mimeType: string;
        let base64: string;
        let dataAttributes: Map<string,string> = new Map();

        let statetype: eContentType = this.getStateValueType();
        switch(statetype){
            case eContentType.ContentString:
                base64 = this.getStateValue() as string;
                fileName = this.getAttribute("fileName",new Date().getTime() + "");
                extension = this.getAttribute("extension","txt")
                mimeType = this.getAttribute("mimeType","text/plain")
                break;
            case eContentType.ContentObject:
                const od: FlowObjectData = (this.getStateValue() as unknown) as FlowObjectData;
                if (od) {
                    fileName = od.properties.FileName.value as string;
                    extension = od.properties.Extension.value as string;
                    mimeType = od.properties.MimeType.value as string;
                    base64 = (od.properties.Content.value as string);
                }
                break;
        }
        
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
                mimeType = dataAttributes.get("data")
            }
            base64=base64.split(',')[1];
        }
        
        let byteString: string;
        
        if(dataAttributes.has("base64")){
            byteString = Buffer.from(base64, 'base64').toString('binary');
        }
        else {
            byteString = base64;
        }

        const ab = new ArrayBuffer(byteString.length);
        //const ia = new Uint8Array(ab);
        //for (let i = 0; i < byteString.length; i++) {
        //    ia[i] = byteString.charCodeAt(i);
        //}
        const blob = new Blob([byteString], {type: mimeType});

        const download = fileName + (extension?.length > 0 ? '.' + extension : '');

        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

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


import * as React from 'react';
import './file-downloader.css';
//import { FlowComponent, eLoadingState } from 'flow-component-model';
//import "flow-component-model"
import { FlowComponent, eLoadingState, FlowObjectData } from 'flow-component-model';
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

        const od: FlowObjectData = (this.getStateValue() as unknown) as FlowObjectData;

        let fileName: string;
        let extension: string;
        let size: number = 0;
        let mimeType: string;
        let base64: string;

        // = 'data:binary/octet-stream;base64,';

        if (od) {
            fileName = od.properties.FileName.value as string;
            extension = od.properties.Extension.value as string;
            size = od.properties.Size.value as number;
            mimeType = od.properties.MimeType.value as string;
            base64 = (od.properties.Content.value as string);
            if(base64.indexOf(',') >= 0){
                base64=base64.split(',')[1];
            }
        }

        // const byteString = Base64.encode(base64);
        // const byteString = atob(base64);
        const byteString = Buffer.from(base64, 'base64').toString('binary');

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], {type: mimeType});

        const download = fileName + (extension.length > 0 ? '.' + extension : '');

        if (window.navigator.msSaveOrOpenBlob) {

            // IE11
            window.navigator.msSaveOrOpenBlob(blob, download);
        } else {

            // Google chome, Firefox, ....
            const objectURL = URL.createObjectURL(blob);
            this.anchor.download = download;
            this.anchor.href = objectURL;
            // this.anchor.click();

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

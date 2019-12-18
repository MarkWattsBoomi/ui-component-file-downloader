
import * as React from 'react';
import './file-downloader.css';
import { FlowComponent } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowComponent';
import { FlowObjectData } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowObjectData';
import { eLoadingState } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowBaseComponent';

declare const manywho: any;

class FileDownloaderComplex extends FlowComponent {

    async componentDidMount() {
        await super.componentDidMount()
        this.forceUpdate();
    }

    render() {
        if (this.loadingState !== eLoadingState.ready) {
            return <div className="file-box"/>;
        }

        const od: FlowObjectData = this.getStateValue() as FlowObjectData;

        const fileName: string = od.properties.FileName.value as string;
        const extension: string = od.properties.Extension.value as string;
        const size: number = od.properties.Size.value as number;
        const mimeType: string = od.properties.MimeType.value as string;

        const dataUri: string = 'data:binary/octet-stream;base64,' + od.properties.Content.value as string;

        const caption: string = this.getAttribute('title',"File Downloader");
        const icon: string = this.getAttribute('icon','envelope');
        const className: string = 'glyphicon glyphicon-' + icon + ' icon-button';
        const iconSize: number = parseInt(this.getAttribute('pointSize', '24'));
        const iconStyle: React.CSSProperties = { fontSize: iconSize + 'pt' };
        const outcome: string = this.getAttribute('onClickOutcome', '');

        return (
        <div className="file-box"  >
            <div className="file-box-body">
                <a 
                    download={fileName} 
                    href={dataUri}
                    onClick={async (e: any) => {if(outcome.length > 0) {await this.triggerOutcome(outcome)}}}
                >
                    <span className={className} style={iconStyle} title={caption}/>
                </a>
            </div>
        </div>
        );
    }

}

manywho.component.register('FileDownloaderComplex', FileDownloaderComplex);

export default FileDownloaderComplex;

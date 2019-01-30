
import * as React from 'react';
import './file-downloader.css';
import { IComponentProps, IManywho  } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

class FileDownloaderComplex extends React.Component<IComponentProps, any> {

    componentDidMount() {
        this.forceUpdate();
        manywho.state.setComponent(this.props.id, {objectData: this.props.getObjectData(this.props.model)}, this.props.flowKey, true);
    }

    render() {
        if (this.props.state.loading) {
            return <div className="file-box"/>;
        }

        const oldOD = manywho.model.getComponent(this.props.id, this.props.flowKey);

        const objectData = this.props.getObjectData(this.props.model)[0];
        const fileName: string = objectData['File Name'] as string;
        const extension: string = objectData.Extension as string;
        const size: number = objectData.Size as number;
        const mimeType: string = objectData.MimeType as string;

        const dataUri: string = 'data:binary/octet-stream;base64,' + objectData.Content as string;

        const caption: string = this.props.getAttribute('title') as string || 'Download File';
        const icon: string = this.props.getAttribute('icon') as string || 'envelope';
        const className: string = 'glyphicon glyphicon-' + icon + ' icon-button';
        const iconSize: number = this.props.getAttribute('pointSize') as number || 48;
        const iconStyle: React.CSSProperties = { fontSize: iconSize + 'pt' };

        return (
        <div className="file-box"  >
            <div className="file-box-body">
                <a download={fileName} href={dataUri}>
                    <span className={className} style={iconStyle} title={caption}/>
                </a>
            </div>
        </div>
        );
    }

}

manywho.component.register('file-download-complex', component(FileDownloaderComplex));

export default FileDownloaderComplex;


import * as React from 'react';
import './file-downloader.css';
import { IComponentProps, IManywho  } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

class FileDownloader extends React.Component<IComponentProps, any> {

    componentDidMount() {
        this.forceUpdate();
    }

    render() {

     if (this.props.state.loading) {
            return <div className="file-box"/>;
        }

     const dataUri: string = 'data:binary/octet-stream;base64,' + this.props.getContentValue() as string;

     const caption: string = this.props.getAttribute('Title') as string || 'Download File';
     const icon: string = this.props.getAttribute('icon') as string || 'envelope';
     const className: string = 'glyphicon glyphicon-' + icon + ' icon-button';
     const iconSize: number = this.props.getAttribute('pointSize') as number || 48;
     const iconStyle: React.CSSProperties = { fontSize: iconSize + 'pt' };

     return (
        <div className="file-box" >
            <div className="file-box-body">
                <a download="firmware" href={dataUri}>
                    <span className={className} style={iconStyle} title={caption}/>
                </a>
            </div>
        </div>
        );
    }

}

manywho.component.register('FileDownloader', FileDownloader);

export default FileDownloader;

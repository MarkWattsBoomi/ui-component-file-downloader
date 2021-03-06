# File Downloader

A component that shows an icon on a page which when clicked forces a file download.

## Classes

FileDownloaderComplex - The state is a flow type defied like this: -

        File Data
        {
                "Content"       String  Contains the base64 encoded binary data of the file
                "FileName"      String  The name of the file used when pushing the file to the client
                "Extension"     String  Optional - not used
                "Size"          Number  Optional - not used
                "MimeType"      String  Optional - not used
        }

        or use this JSON

        {
        "bindings": null,
        "developerName": "FileData",
        "developerSummary": "",
        "elementType": "TYPE",
        "id": null,
        "properties": [
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "Content",
                "id": null,
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "FileName",
                "id": null,
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "Extension",
                "id": null,
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentNumber",
                "developerName": "Size",
                "id": null,
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "MimeType",
                "id": null,
                "typeElementDeveloperName": null,
                "typeElementId": null
            }
        ]


## Setup

- Grab the files from the /dist folder and import into your tenant.

- Add the files to your player code like this: -

        requires: ['core', 'bootstrap3'],
        customResources: [
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/FileDownloader.css',
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/FileDownloader.js'
                ],


- Add a component to your page, any type, save it then change it's "componentType" to "FileDownloader" in the metadata editor and save it.
e.g. 
            "componentType": "FileDownloader" 

- Add a type as defined above to hold your file's data e.g. "FileData".

- Set the component's "State" to a the new field (e.g. FileData). 


## Extra Configuration

You can add attributes to the component to control it's appearance: -

- title  - String - The tooltip shown when the download icon is hovered.  "Download File" is the default.

- icon  - String - The name of a glyphicon to use as the download icon button e.g. "cloud-download".  "envelope" is the default.

- pointSize - Number - the pointsize to use for the icon e.g. 48 = 48pt.  48 is the default.

- onClickOutcome - String - the name of an outcome to trigger after the file downloads.  can be ommitted or blank.  default is none.

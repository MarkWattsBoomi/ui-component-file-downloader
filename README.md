# File Downloader

A component that shows an icon on a page which when clicked forces a file download.

There are two versions: -

- FileDownloader - The state for the control should be a simple string field. The file contents are expected to be a base64 encoded into the state string.

- FileDownloaderComplex - The state is a flow type defied like this: -

        File Data
        {
                "Content"       String  Contains the base64 encoded binary data of the file
                "File Name"     String  The name of the file used when pushing the file to the client
                "Extension"     String  Optional - not used
                "Size"          Number  Optional - not used
                "MimeType"      String  Optional - not used
        }


## Setup

- Grab the files from the /build folder and import into your tenant.

- Add the files to your player code like this: -

        requires: ['core', 'bootstrap3'],
        customResources: [
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/FileDownloader.css',
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/FileDownloader.js'
                ],


- Add a component to your page, any type, save it then change it's "componentType" to "FileDownloader" in the metadata editor and save it.
e.g. 
            "componentType": "file-downloader" or "file-downloader-complex"

- Add a String value or type as defined above to hold your file's data e.g. "FileData".

- Set the component's "State" to a the new field (e.g. FileData). 


## Extra Configuration

You can add attributes to the component to control it's appearance: -

- Title  - String - The tooltip shown when the download icon is hovered.  "Download File" is the default.

- Icon  - String - The name of a glyphicon to use as the download icon button e.g. "envelope".  "envelope" is the default.

- PointSize - Number - the pointsize to use for the icon e.g. 48 = 48pt.  48 is the default

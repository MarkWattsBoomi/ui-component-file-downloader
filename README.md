# File Downloader

A component that shows an icon on a page which when clicked forces a file download.

The file contents are expected to be a base64 encoded string stored in a Flow string value.


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
            "componentType": "FileDownloader",

- Add a String value to hold your file's base64 data e.g. "FileData".

- Set the component's "State" to a the new field (e.g. FileData). 


## Extra Configuration

You can add attributes to the component to control it's appearance: -

- Icon  - String - The name of a glyphicon to use as the download icon button e.g. "envelope".  "envelope" is the default.

- PointSize - Number - the pointsize to use for the icon e.g. 48 = 48pt.  48 is the default

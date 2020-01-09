import React, { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { Uppload, Local, Instagram, xhrUploader, en } from "uppload";
import useClickOutside from "foundations/hooks/useClickOutside";
import { Dialog, ImageButton } from "./FileUpload.style";
import { FaCamera, FaCameraRetro, FaUpload, FaCloudUploadAlt } from 'react-icons/fa';
import * as filestack from 'filestack-js';
import { sendMessageAction } from "features/messages/sendMessageCommand";
import { ImageMessage } from "../../messages/messageModel";

import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";


const FileUpload = () => {
    const fileStackClient = filestack.init('AZhkqr7bURreG9fD8oCWxz');
    const dispatch = useDispatch();

    const toggleImageUploadBox = () => {
        console.log('Loading Upload File Widget');
        
        console.log('Loading FileStack Widget');
        const fileStackOptions = {
            maxFiles: 1,
            uploadInBackground: false,
            onOpen: () => console.log('Opened FileStack Widget'),
            onUploadDone: (fileUploadResponse: any) => {
                console.log(fileUploadResponse)
                const fileURL: string = fileUploadResponse.filesUploaded[0].url;
                const fileName: string = fileUploadResponse.filesUploaded[0].filename;
                var mimetype = fileUploadResponse.filesUploaded[0].mimetype;

                // If the file type is an image
                if(mimetype.startsWith("image/")){
                    mimetype = "image"
                }
                // If the file is a PDF or some kind of doc then set it as a document
                else if(mimetype.startsWith("application/")){
                    mimetype = "document"
                } 
                // If we dont know what the doc type is then its an unknown and just present it raw
                else {
                    mimetype = "unknown"
                }
                // Send the URL of the image via the Publish Event
                dispatch(
                    sendMessageAction({
                    type: mimetype,
                    url: fileURL,
                    body: fileName
                    })
                );
            },
        };
        fileStackClient.picker(fileStackOptions).open();
    };

    return(
        <div>
            <ImageButton onClick={toggleImageUploadBox}>
                <FaCloudUploadAlt />
            </ImageButton>
        </div>
    );
}


export { FileUpload };
// Notes 
//  - only when something is typed in can a send button pop-up 

import { useState, useRef  } from 'react';
import { sendPrompt, uploadPdf } from  '../services/api';

const ChatInput = () => {

    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(null);
    const [fileSelected, setFileSelected] = useState(null)
    
    // Create a reference to the hidden input field
    const fileInputRef = useRef(null);

    // Trigger the input click event programmatically
    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleTextChange = (event) => {
        // Captures each keystroke and updates state
        setInputText(event.target.value);
    };

    const onFileUpload = (event) => {
        const selectedFile = event.target.files[0]
        uploadPdf(selectedFile)
        setFileSelected(selectedFile.name)
    };

    
    return (
        <>
            <div
                className='file-button'
            >

                <button
                    onClick={handleFileButtonClick}
                >
                    <img
                        src='../assets/clip.png'
                        width={24} 
                        height={24}
                        alt='attatchment-icon'
                    />
                </button>                

                <input 
                    type='file'
                    onChange={onFileUpload}
                    accept='.pdf'
                />

            </div>

            {/* Swap in the fancy PDF icon image later with "X" icon on the top right of image with file name hovering over it */}
            {fileSelected && (
                <div>
                    <span>{fileSelected.name}</span>
                    <button onClick={() => setFileSelected(null)}>X</button>
                </div>
            )}
           
            <div
                className='text-input'
            >
                <input
                    type='text'
                    value={inputText}
                    onChange={handleTextChange}
                    placeholder='What do you wish to know in this pdf ...'
                />
            </div>

            <div
                className='send-prompt-button'
            >
                <button
                    onClick={sendPrompt}>
                    <img
                        src='../assets/send.png'
                        width={24} 
                        height={24}
                        alt='send-icon'
                    />
                </button>
            </div>
            
            
        </>
    )
}
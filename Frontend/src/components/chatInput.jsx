import { useState, useRef  } from 'react';
import { uploadPdf } from  '../services/api';

const ChatInput = ({onSendMessage}) => {

    const [inputText, setInputText] = useState("");
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

    const handleSendMessage = (prompt) => {
        onSendMessage(prompt)
        setInputText("")
    }

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
                        alt='paperclip-attatchment-icon'
                    />
                </button>                

                <input 
                    type='file'
                    onChange={onFileUpload}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept='.pdf'
                />

            </div>

            {/* Swap in the fancy PDF icon image later with "X" icon on the top right of image with file name hovering over it */}
            {fileSelected && (
                <div>
                    <span>{fileSelected}</span>
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
                    onClick={() => handleSendMessage(inputText)}>
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

export default ChatInput;
// Notes 
//  - only when something is typed in can a send button pop-up 

import { useState } from 'react';

const [inputText, setInputText] = useState("");
const [loading, setLoading] = useState(null);
const [fileSelected, setFileSelected] = useState(null)


const ChatInput = async () => {
    
    const handleTextChange = (event) => {
        // Captures each keystroke and updates state
        setInputText(event.target.value);
    };

    const onFileUpload = (event) => {
        const selectedFile = event.target.files[0]
        const allowedTypes = 'application/pdf'

        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFileSelected(selectedFile);
        } else {
            alert('Please upload a valid file type: PDF');
        }

        // Use FormData to package the file
        const formData = new FormData();
        formData.append('document', file); 

        try {
            const response = await fetch('/api/pdf/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json()

            if (response.ok) {
                console.log('Upload successful:', result);
            } else {
                console.error('Upload failed:', result.error);
            }

        } catch {
            console.error('Network error:', error)
        }
    };
    
    return (
        <>
            <input 
                type="file" 
                value={fileSelected}
                onChange={onFileChange}
                accept=".pdf" 
            />

            <input
                type="text"
                value={inputText}
                onChange={handleTextChange}
                placeholder="What do you wish to know in this pdf.."
            />

            <button>

            </button>
            
            
        </>
    )
}
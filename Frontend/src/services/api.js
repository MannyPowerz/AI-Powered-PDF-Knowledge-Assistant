const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

const sendPrompt = async (userInput) => {
    try{
        const response = await fetch(`${baseApiUrl}/api/query/prompt`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: userInput })          
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        return {
            success: true, 
            answer: data.answer
        };
        
    } catch {
        console.error('Error:', error)
        return { 
            success: false,
            error: 'Server error' 
        };
    }

}

const uploadPdf = async (selectedFile) => {
    const allowedTypes = 'application/pdf'

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        
        console.log('Valid PDF selected!');

        const formData = new FormData();
        formData.append('document', selectedFile); 
        
        try {
            const response = await fetch(`${baseApiUrl}/api/pdf/upload`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json()

            if (response.ok) {
                console.log('Upload successful:', result);
                return { success: true, data: result };
            } else {
                console.error('Upload failed:', result.error);
                return { success: false, error: result.error };
            }

            // The reset, so the change event fires next time
            event.target.value = null;
            

        } catch (error) {
            console.error('Network error:', error)
            return { success: false, error: 'Network error' };
        }

    } else {
        alert('Please upload a valid file type: PDF');
        return
    }

};

export { sendPrompt, uploadPdf }
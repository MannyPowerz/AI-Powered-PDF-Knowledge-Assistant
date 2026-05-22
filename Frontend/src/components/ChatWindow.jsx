const ChatWindow = ({chatHistory, spinner}) => {

    return (
        <>
            <div
                className='chat-window'
            >
                {chatHistory.map((message, index) => (
                    
                    <div
                        
                        key={index}

                        style={{
                            textAlign: message.role === 'user' ? 'right' : 'left',
                            margin: '10px 0'
                        }}
                    >

                        {message.content}

                    </div>
      
                ))}

                {spinner && (
                    <div className="loading-spinner">

                    </div>
                )
                
                }

            </div>
        </>

    );

};

export default ChatWindow;
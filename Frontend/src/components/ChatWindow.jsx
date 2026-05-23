import './ChatWindow.css';

const ChatWindow = ({chatHistory, spinner}) => {

    return (
        <div
            className='chat-window'
        >
            {chatHistory.map((message, index) => (
                
                <div
                    className={message.role === 'user' ? 'user-message' : 'assistant-message'}
                    
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

    );

};

export default ChatWindow;
const ChatWindow = ({chatHistory}) => {

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
            </div>
        </>

    );

};

export default ChatWindow;
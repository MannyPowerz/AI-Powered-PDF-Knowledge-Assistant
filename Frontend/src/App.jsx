import { useState } from 'react'
import ChatInput from './components/chatInput';
import ChatWindow from './components/ChatWindow';
import { sendPrompt } from './services/api';
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(null);


  
  const handleSendMessage = async (prompt) => {
    
    setLoading(true)
    
    setMessages(prev => [...prev, 
      {
        role: 'user',
        content: prompt
      }
    ])
  
    const response = await sendPrompt(prompt);
   
    setMessages(prev => [...prev, 
      {
        role: 'assistant',
        content: response.answer
      }
    ])
  

    setLoading(false)
  }

  return (
    <>
      <ChatWindow chatHistory={messages} />
      <ChatInput onSendMessage={handleSendMessage}/>
    </>
  )
}

export default App

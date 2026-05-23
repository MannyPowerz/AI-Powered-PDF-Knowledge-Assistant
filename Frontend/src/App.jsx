import { useState } from 'react'
import ChatInput from './components/chatInput';
import ChatWindow from './components/ChatWindow';
import { sendPrompt } from './services/api';
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);


  
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
    <div
      className='container'
    >
      <ChatWindow chatHistory={messages} spinner={loading}/>
      <ChatInput onSendMessage={handleSendMessage}/>

    </div>
  )
}

export default App

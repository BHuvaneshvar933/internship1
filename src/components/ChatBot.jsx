import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAIResponse, generateMockResponse } from '../services/openaiService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm SoftBot, your virtual assistant. How can I help you with selling your software licenses today?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Check if we have an API key
  const hasApiKey = import.meta.env.VITE_OPENAI_API_KEY && 
                    import.meta.env.VITE_OPENAI_API_KEY !== 'your-openai-api-key';
  
  const faqResponses = {
    'how do i sell my license': 'To sell your license, simply fill out our contact form with details about your software license. Our team will evaluate it and provide you with a quote within 24 hours.',
    'what licenses do you accept': 'We accept licenses from major vendors including Microsoft, Adobe, Oracle, Autodesk, VMware, and many others. If you have a specific license type, please contact us for confirmation.',
    'how much is my license worth': 'The value of your license depends on several factors including the software type, version, remaining subscription period, and current market demand. Submit your license details for a free valuation.',
    'how long does it take': 'Our process is quick! You will receive a valuation within 24 hours, and once you accept our offer, payment is typically processed within 3 business days.',
    'is this legal': 'Yes, our process is completely legal. We ensure all license transfers comply with vendor terms and conditions and are properly documented.',
    'how do i get paid': 'We offer multiple payment options including bank transfer, PayPal, and cryptocurrency. You can select your preferred method when accepting our offer.',
    'what information do you need': 'We need details about your software license including the vendor, product name, version, license type (perpetual or subscription), and remaining term if applicable.'
  };
  
  // Example prompts to show users what they can ask
  const examplePrompts = [
    "How do I sell my license?",
    "What licenses do you accept?",
    "How much is my license worth?",
    "How long does it take?",
    "Is this legal?",
    "How do I get paid?"
  ];
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Check if we have a predefined answer first
    const predefinedResponse = checkPredefinedResponses(inputValue);
    
    if (predefinedResponse) {
      // Use predefined response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: predefinedResponse,
            sender: 'bot'
          }
        ]);
        setIsTyping(false);
      }, 1000);
    } else {
      // Use AI for dynamic responses
      processAIResponse(inputValue);
    }
  };
  
  const checkPredefinedResponses = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for matches in FAQ
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowercaseInput.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses for common greetings
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hello! How can I help you with selling your software licenses today?";
    } else if (lowercaseInput.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowercaseInput.includes('bye')) {
      return "Goodbye! Feel free to come back if you have more questions.";
    }
    
    // No predefined response found
    return null;
  };
  
  const processAIResponse = async (userInput) => {
    try {
      let aiResponse;
      
      if (hasApiKey) {
        // Format conversation history for the API
        const formattedHistory = messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
        
        // Add system message to guide the AI
        const apiMessages = [
          {
            role: 'system',
            content: `You are SoftBot, a helpful assistant for SoftSell, a company that helps businesses sell their unused software licenses. 
                      Be concise, friendly, and informative. Focus on helping users understand how to sell their licenses, 
                      what types of licenses we accept, and the process involved. If you don't know something specific about 
                      SoftSell's operations, suggest they contact our team through the contact form.`
          },
          ...formattedHistory,
          { role: 'user', content: userInput }
        ];
        
        // Call OpenAI API
        aiResponse = await generateAIResponse(apiMessages);
      } else {
        // Use mock response if no API key is available
        aiResponse = generateMockResponse(userInput);
      }
      
      // Add AI response to chat
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: aiResponse,
            sender: 'bot'
          }
        ]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error processing AI response:', error);
      
      // Fallback response in case of API failure
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "I'm having trouble connecting to my knowledge base right now. For immediate assistance, please use our contact form or try asking one of the common questions below.",
            sender: 'bot'
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  };
  
  // Rest of the component remains the same
  
  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg z-50 transition-colors"
        aria-label="Chat with us"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header section */}
            <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <motion.div 
                  className="bg-white rounded-full p-1 mr-2 flex items-center justify-center"
                  initial={{ rotate: -30 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </motion.div>
                <span className="font-medium text-white">SoftBot{hasApiKey ? ' (AI)' : ''}</span>
              </div>
              <motion.button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className={`max-w-3/4 rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {message.text}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <motion.div 
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Example prompts section */}
            <motion.div 
              className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setInputValue(prompt);
                    }}
                    className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.3 + index * 0.1 }
                    }}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Input form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <motion.button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
// This service handles interactions with the OpenAI API

// In a production environment, API calls should be made through your backend
// to protect your API key and implement rate limiting

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "your-openai-api-key";

export const generateAIResponse = async (messages) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

// Mock function to use when API key is not available or for testing
export const generateMockResponse = (userInput) => {
  const responses = {
    'license': 'Our license selling process is simple and secure. We evaluate your software licenses and provide competitive offers based on current market value.',
    'payment': 'We offer multiple payment methods including bank transfers, PayPal, and cryptocurrency. Payments are typically processed within 3 business days after the license transfer is complete.',
    'process': 'Our process involves 4 simple steps: 1) Submit your license details, 2) Receive a valuation, 3) Accept our offer, 4) Complete the transfer and receive payment.',
    'legal': 'Yes, selling unused software licenses is completely legal as long as it complies with the vendor\'s license agreement. We ensure all transfers are properly documented and compliant.',
    'time': 'The entire process typically takes 3-5 business days from submission to payment, though this can vary depending on the license type and vendor.',
  };
  
  // Find a relevant response based on keywords
  for (const [keyword, response] of Object.entries(responses)) {
    if (userInput.toLowerCase().includes(keyword)) {
      return response;
    }
  }
  
  // Default response
  return "I'm here to help with any questions about selling your software licenses. Could you provide more details about what you'd like to know?";
};
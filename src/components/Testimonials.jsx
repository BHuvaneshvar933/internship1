import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "SoftSell helped us recover over $50,000 from unused enterprise software licenses. Their process was straightforward and the team was incredibly responsive throughout.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "Nexus Technologies",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      content: "After downsizing our team, we had several Adobe Creative Cloud licenses sitting idle. SoftSell offered us a fair price and handled all the transfer paperwork. Couldn't have been easier!",
      author: "Michael Chen",
      role: "IT Director",
      company: "Horizon Media",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      id: 3,
      content: "We were skeptical at first, but SoftSell made the entire process transparent and secure. We've now recovered significant value from our unused Microsoft licenses.",
      author: "Emily Rodriguez",
      role: "Finance Director",
      company: "Global Solutions Inc.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            What Our <span className="text-primary-600 dark:text-primary-400">Clients</span> Say
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            Don't just take our word for it. Here's what businesses like yours have to say about SoftSell.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].author}
                      className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-primary-400 dark:text-primary-300 mb-2" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic">
                        {testimonials[currentIndex].content}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{testimonials[currentIndex].author}</p>
                      <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex 
                      ? 'bg-primary-600 dark:bg-primary-400' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={handleNext}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
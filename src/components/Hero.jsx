import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      heroRef.current.style.setProperty('--x', x);
      heroRef.current.style.setProperty('--y', y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-950"
      style={{
        '--x': 0.5,
        '--y': 0.5,
      }}
    >
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div 
          className="absolute rounded-full w-[40vw] h-[40vw] bg-primary-300 dark:bg-primary-800 blur-3xl"
          style={{
            left: 'calc(var(--x) * 100%)',
            top: 'calc(var(--y) * 100%)',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
        <div 
          className="absolute rounded-full w-[25vw] h-[25vw] bg-secondary-300 dark:bg-secondary-800 blur-3xl"
          style={{
            left: 'calc((1 - var(--x)) * 100%)',
            top: 'calc(var(--y) * 100%)',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
        <div 
          className="absolute rounded-full w-[20vw] h-[20vw] bg-accent-300 dark:bg-accent-800 blur-3xl"
          style={{
            left: 'calc(var(--x) * 100%)',
            top: 'calc((1 - var(--y)) * 100%)',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 dark:from-primary-400 dark:via-primary-300 dark:to-accent-400">
            Turn Unused Software Licenses Into Cash
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            SoftSell helps businesses recover value from their unused software licenses. 
            Fast, secure, and hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Get a Quote
            </a>
            <a 
              href="#how-it-works" 
              className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg border border-primary-200 dark:border-primary-900"
            >
              How It Works
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Licenses Sold</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">$2M+</div>
              <div className="text-gray-600 dark:text-gray-400">Value Recovered</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">24h</div>
              <div className="text-gray-600 dark:text-gray-400">Avg. Turnaround</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
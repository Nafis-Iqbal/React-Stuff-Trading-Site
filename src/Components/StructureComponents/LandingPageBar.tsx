import React from 'react';
import SocialLinks from '../ElementComponents/SocialIcons';


const LandingPageBar: React.FC = () => {
  return (
    <nav className="bg-pink-600 text-white p-4 mb-2">
      <div className="flex flex-col md:flex-row justify-between items-center min-h-[80px]">
        <h1 className='text-4xl mt-4 md:mt-0 text-center font-bold'>Stuff Trader</h1>
        
        <div className='flex flex-col px-2'>
            <p className="text-lg md:text-xl mt-0 md:mt-2 text-white">
                Developed by {" "}
                <span className="txt-xl md:text-2xl font-bold drop-shadow-m">Nafis Iqbal</span>
            </p>
            {SocialLinks("ml-12 md:ml-0")}
        </div>
      </div>
    </nav>
  );
};

export default LandingPageBar;
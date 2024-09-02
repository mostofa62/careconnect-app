import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-[15px]">
        <div className="flex flex-row gap-4 py-3 h-[39px] text-[#333333] border-b border-[#333333]">

            <div className='text-[25px]'>
                <span className='font-medium'>{title}</span>
            </div>

            <div>

                <button
                    className="w-full flex justify-between items-center text-left text-gray-800 font-medium hover:bg-gray-100 focus:outline-none"
                    onClick={toggleAccordion}
                >
            
                    <svg
                    width={26}
                    height={26}
                    className={`transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                    </svg>
                </button>

            </div>

        </div>
      
      <div className={`pt-0 overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

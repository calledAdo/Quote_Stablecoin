import React, { useState } from 'react';
import { AccordionProps } from '../lib/interfaces';

export const Accordion:React.FC<AccordionProps> = ({
    question, answer, ...props}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <section className="" {...props}>
      <div className="flex flex-row justify-between" onClick={() => setIsActive(!isActive)}>
        <p className=' text-textMain font-satoshi-medium text-xl'>{question}</p>
        <p>{isActive ? '-' : '+'}</p>
      </div>
      {isActive && <p className="text-textSubtext mt-3">{answer}</p>}
    </section>
  );
};

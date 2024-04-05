import { Accordion } from '@components'
import { FAQItems } from '@constants'

export default function FAQS() {
  return (
    <main id='faqs' className='py-40 px-24 flex flex-col'>
         <p
          className={`text-3xl text-black self-center text-center font-satoshi-bold flex flex-row mb-7`}>
            FAQs
          </p>


    
        {/* <hr className="border-[0.5px] border-neutral-150 mb-14" /> */}
        {FAQItems.map((faq) => (
          <Accordion
            className="py-4 border-b-[1px] border-neutral-200 cursor-pointer"
            question={faq.question}
            answer={faq.answer}
          />
        ))}
    </main>
  )
}

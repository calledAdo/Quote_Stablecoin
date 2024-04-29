import { Accordion } from "@components";
import { FAQItems } from "@constants";
import { motion } from "framer-motion";

export default function FAQS() {
  return (
    <main id="faqs" className="py-40 px-24 flex flex-col relative">
      <p
        className={`text-5xl text-black dark:text-white self-center text-center font-satoshi flex flex-row mb-7`}
      >
        FAQs
      </p>

      {/* <hr className="border-[0.5px] border-neutral-150 mb-14" /> */}
      {FAQItems.map((faq) => (
        <Accordion
          className="py-4 border-b-[1px] border-neutral-200 cursor-pointer dark:text-white z-10"
          question={faq.question}
          answer={faq.answer}
        />
      ))}

      <motion.div
        className="w-80 h-80 absolute top-72 left-96 bg-blur dark:bg-blur-dark dark:opacity-70 blur-3xl -z-0"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 20, y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
    </main>
  );
}

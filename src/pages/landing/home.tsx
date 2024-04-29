import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main
      id="home"
      className="flex flex-col items-center justify-center pt-64 relative"
    >
      <motion.p
        className="font-satoshi-bold text-7xl z-10 dark:text-white"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0 }}
      >
        QUOTE
      </motion.p>
   
      <motion.p
        className="font-satoshi text-center text-3xl z-10 w-[50%] dark:text-white"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.4 }}
      >
      A dollar-pegged decentralized<br/>stablecoin backed by ETH
      </motion.p>
      <button
        className="bg-primary hover:bg-pink-600 hover:scale-90 w-52 px-5 h-14 text-white rounded-full transition-all font-satoshi my-7"
        onClick={() => {
          navigate("/app");
        }}
      >
        Start Minting
      </button>
      <motion.img
        className="font-satoshi text-center text-3xl z-10 w-[50%]"
        src="/macbook_home.svg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.4 }}
   />
      <motion.div
        className="w-52 h-52 absolute top-32 left-0 bg-blur dark:bg-blur-dark dark:opacity-70 blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 20, y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
        <motion.div
        className="w-52 h-52 absolute bottom-20 left-10 bg-blur dark:bg-blur-dark dark:opacity-70 blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -20, y: 20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="w-72 h-72 absolute top-72 right-0 bg-blur dark:bg-blur-dark dark:opacity-70 blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 20, y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
 <motion.img
        className="font-satoshi absolute w-[80%] top-0"
        src="/circle.svg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.4 }}
   />
    </main>
  );
}

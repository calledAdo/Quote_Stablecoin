import { motion } from "framer-motion";

export default function Home() {
  return (
    <main
      id="home"
      className="flex flex-col items-center justify-center pt-64 relative"
    >
      <motion.p
        className="font-satoshi-bold text-7xl z-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0 }}
      >
        $QUOTE
      </motion.p>
      <motion.p
        className="font-satoshi text-center text-3xl z-10 w-[50%]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.4 }}
      >
        A dollar-pegged decentralized algorithmic stablecoin utilizing virtual
        perp positions on $ETH
      </motion.p>
      <motion.div
        className="w-52 h-52 absolute top-32 left-0 bg-blur blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 20, y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="w-52 h-52 absolute top-72 right-0 bg-blur blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 20, y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
    </main>
  );
}

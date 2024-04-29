import { motion } from "framer-motion";

export default function Docs() {
  return (
    <main
      id="docs"
      className="w-full px-24 pb-24 gap-y-4 flex flex-col z-10 mt-24 relative"
    >
      
      <motion.p
        className="font-satoshi text-6xl z-10 dark:text-white text-center mb-7"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0 }}
      >
        Why QUOTE?
      </motion.p>
      <section className="flex flex-row gap-x-4 justify-between">
        <motion.div
          className="bg-white dark:bg-holder text-black dark:text-white shadow-lg rounded-xl p-5 w-[110%] border border-white border-opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0 }}
        >
          <p className="text-xl font-satoshi-medium">Peg Stability</p>
          <p className="mt-7">
          Each QUOTE token is backed by at least 400% ETH and kept pegged to a dollar by virtual delta-neutral positions on ETH.
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-holder text-black dark:text-white shadow-lg rounded-xl p-5 w-[90%] border border-white border-opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.4 }}
        >
          <p className="text-xl font-satoshi-medium">Decentralized</p>
          <p className="mt-7">
          QUOTE is fully decentralized, ensuring transparency, autonomy, and censorship resistance.
          </p>
        </motion.div>
      </section>

      <section className="flex flex-row gap-x-4 justify-between">
        <motion.div
          className="bg-white dark:bg-holder text-black dark:text-white shadow-lg rounded-xl p-5 w-[90%] border border-white border-opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.8 }}
        >
          <div className="flex flex-row justify-between items-center dark:text-white">
            <p className="text-xl font-satoshi-medium">Yield Rate</p>
            <p className="text-base font-satoshi-medium bg-primary-300 dark:bg-primary px-2 py-1 rounded-lg">
              Up to 12%
            </p>
          </div>

          <p className="mt-7">
          By depositing ETH to our pool, you  get LETH which allows you to share in rewards from QUOTE minting fees and yields.
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-holder text-black dark:text-white shadow-lg rounded-xl p-5 w-[110%]b border border-white border-opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 1.2 }}
        >
          <p className="text-xl font-satoshi-medium">Capital Efficiency</p>
          <p className="mt-7">
          Our unique providers model creates capital efficient CDP's with up to 90% collateral utilization while also making room for protection against sudden price swings.
          </p>
        </motion.div>
      </section>

      <motion.div
        className="w-96 h-96 absolute top-10 left-[32rem] -z-10 bg-blur dark:bg-blur-dark dark:opacity-50 blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 20, y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
    </main>
  );
}

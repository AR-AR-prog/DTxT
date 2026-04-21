'use client'

import { motion } from 'framer-motion'

export default function ChronicleBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none opacity-15 overflow-hidden mix-blend-multiply">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 180, repeat: Infinity }}
        className="w-[110%] h-[200%] -ml-[5%] flex flex-col blur-[1.5px] filter"
      >
        <div className="flex-1 flex flex-col">
          <img src="/images/newspaper_bg_1_1776592187573.png" alt="" className="w-full h-1/3 object-cover opacity-80" />
          <img src="/images/newspaper_bg_2_1776592283342.png" alt="" className="w-full h-1/3 object-cover opacity-90" />
          <img src="/images/newspaper_bg_3_1776592297605.png" alt="" className="w-full h-1/3 object-cover opacity-80" />
        </div>
        <div className="flex-1 flex flex-col">
          <img src="/images/newspaper_bg_1_1776592187573.png" alt="" className="w-full h-1/3 object-cover opacity-80" />
          <img src="/images/newspaper_bg_2_1776592283342.png" alt="" className="w-full h-1/3 object-cover opacity-90" />
          <img src="/images/newspaper_bg_3_1776592297605.png" alt="" className="w-full h-1/3 object-cover opacity-80" />
        </div>
      </motion.div>
    </div>
  )
}

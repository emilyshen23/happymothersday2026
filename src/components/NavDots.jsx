import { motion } from 'framer-motion'

const INACTIVE_COLOR = '#D4C5B5'

export default function NavDots({ total, activeIndex, activeColor }) {
  return (
    <div className="nav-dots">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className="dot"
          animate={{
            backgroundColor: i === activeIndex ? activeColor : INACTIVE_COLOR,
            scale: i === activeIndex ? 1.25 : 1,
          }}
          transition={{ duration: 0.26 }}
        />
      ))}
    </div>
  )
}

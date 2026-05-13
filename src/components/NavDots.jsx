import { motion } from 'framer-motion'

const INACTIVE_COLOR = 'rgba(201, 190, 178, 0.6)'
const ACTIVE_COLOR = '#9B7E5D'

export default function NavDots({ total, activeIndex }) {
  return (
    <div className="nav-dots">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className="dot"
          animate={{
            backgroundColor: i === activeIndex ? ACTIVE_COLOR : INACTIVE_COLOR,
            scale: i === activeIndex ? 1.25 : 1,
          }}
          transition={{ duration: 0.26 }}
        />
      ))}
    </div>
  )
}

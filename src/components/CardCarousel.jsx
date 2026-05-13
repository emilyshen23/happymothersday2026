import { AnimatePresence, motion } from 'framer-motion'
import Card from './Card'

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 0.95,
    opacity: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-24%' : '24%',
    scale: 0.95,
    opacity: 0,
  }),
}

export default function CardCarousel({ cards, activeIndex, direction }) {
  const card = cards[activeIndex]

  return (
    <div className="carousel">
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={card.id}
          className="carousel-slide"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.3 },
          }}
        >
          <Card card={card} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

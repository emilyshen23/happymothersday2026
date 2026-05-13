import { AnimatePresence, motion } from 'framer-motion'
import Card from './Card'
import useSoundEffects from '../hooks/useSoundEffects'

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    scale: 0.92,
    rotate: direction > 0 ? 2.5 : -2.5,
    opacity: 0.6,
    zIndex: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    zIndex: 1,
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 24, mass: 0.8 },
      scale: { type: 'spring', stiffness: 200, damping: 22 },
      rotate: { type: 'spring', stiffness: 200, damping: 20 },
      opacity: { duration: 0.2, ease: 'easeOut' },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    scale: 0.92,
    rotate: direction > 0 ? -2.5 : 2.5,
    opacity: 0,
    zIndex: 0,
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 24, mass: 0.8 },
      scale: { type: 'spring', stiffness: 200, damping: 22 },
      rotate: { type: 'spring', stiffness: 200, damping: 20 },
      opacity: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    },
  }),
}

export default function CardCarousel({ cards, activeIndex, direction, onNext, onPrev }) {
  const card = cards[activeIndex]
  const { playCardSwipe } = useSoundEffects()

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -80 && onNext) {
      playCardSwipe()
      onNext()
    } else if (info.offset.x > 80 && onPrev) {
      playCardSwipe()
      onPrev()
    }
  }

  return (
    <div className="carousel">
      {/* Invisible sizer to give the carousel its natural height */}
      <div className="carousel-sizer">
        <Card card={card} />
      </div>

      <AnimatePresence mode="sync" custom={direction} initial={false}>
        <motion.div
          key={card.id}
          className="carousel-slide"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={handleDragEnd}
          style={{ cursor: 'grab' }}
          whileDrag={{ cursor: 'grabbing' }}
        >
          <Card card={card} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

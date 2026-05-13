import { AnimatePresence, motion } from 'framer-motion'
import Card from './Card'
import useSoundEffects from '../hooks/useSoundEffects'

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    scale: 0.94,
    opacity: 1,
    zIndex: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      scale: { type: 'spring', stiffness: 320, damping: 30 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -60 : 60,
    scale: 0.94,
    opacity: 1,
    zIndex: 0,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      scale: { duration: 0.22, ease: 'easeIn' },
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

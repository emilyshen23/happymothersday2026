import { motion } from 'framer-motion'
import Card from './Card'
import useSoundEffects from '../hooks/useSoundEffects'

const FRONT = { x: 0, y: 0, scale: 1, rotate: 0 }

const spring = {
  type: 'spring',
  stiffness: 200,
  damping: 24,
  mass: 0.8,
}

export default function CardCarousel({ cards, activeIndex, direction, onNext, onPrev }) {
  const { playCardSwipe } = useSoundEffects()

  // Slot A is front on even indices, slot B on odd — toggles every navigation
  const aIsFront = activeIndex % 2 === 0
  const frontCard = cards[activeIndex]
  const backCard = activeIndex < cards.length - 1 ? cards[activeIndex + 1] : null

  const backTarget = {
    x: 0,
    y: 0,
    scale: 1,
    rotate: direction >= 0 ? 4 : -4,
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 80 && onNext) {
      playCardSwipe()
      onNext()
    } else if (info.offset.x < -80 && onPrev) {
      playCardSwipe()
      onPrev()
    }
  }

  const slots = [
    { key: 'slot-a', isFront: aIsFront, card: aIsFront ? frontCard : backCard },
    { key: 'slot-b', isFront: !aIsFront, card: !aIsFront ? frontCard : backCard },
  ]

  return (
    <div className="carousel">
      <div className="carousel-sizer">
        <Card card={frontCard} />
      </div>

      {slots.map(({ key, isFront, card }) => (
        <motion.div
          key={key}
          className="carousel-slide"
          animate={{
            ...(isFront ? FRONT : backTarget),
            opacity: card ? 1 : 0,
          }}
          transition={spring}
          style={{
            zIndex: isFront ? 2 : 1,
            pointerEvents: isFront ? 'auto' : 'none',
            cursor: isFront ? 'grab' : 'default',
            transformOrigin: 'center center',
          }}
          drag={isFront ? 'x' : false}
          dragConstraints={isFront ? { left: 0, right: 0 } : undefined}
          dragElastic={isFront ? 0.4 : undefined}
          onDragEnd={isFront ? handleDragEnd : undefined}
          whileDrag={isFront ? { cursor: 'grabbing' } : undefined}
        >
          {card && <Card key={`${card.id}-${activeIndex}`} card={card} />}
        </motion.div>
      ))}
    </div>
  )
}

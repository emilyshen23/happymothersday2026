import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import VoicePlayer from './VoicePlayer'

export default function Card({ card }) {
  const [playerOpen, setPlayerOpen] = useState(false)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rotateY: x * 8, rotateX: -y * 8 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="card"
      style={{
        position: 'relative',
        backgroundColor: card.colors.bg,
        perspective: 800,
      }}
      animate={tilt}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <VoicePlayer
        card={card}
        isOpen={playerOpen}
        onOpen={() => setPlayerOpen(true)}
        onClose={() => setPlayerOpen(false)}
      />

      <div className="card-illustration">
        <img src={card.illustration} alt={card.title} draggable={false} />
      </div>
    </motion.div>
  )
}

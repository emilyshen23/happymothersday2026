import { useState } from 'react'
import VoicePlayer from './VoicePlayer'

export default function Card({ card }) {
  const [playerOpen, setPlayerOpen] = useState(false)

  return (
    <div className="card" style={{ backgroundColor: card.colors.bg }}>
      <VoicePlayer
        card={card}
        isOpen={playerOpen}
        onOpen={() => setPlayerOpen(true)}
        onClose={() => setPlayerOpen(false)}
      />

      <div className="card-illustration">
        <img src={card.illustration} alt={card.title} draggable={false} />
      </div>
    </div>
  )
}

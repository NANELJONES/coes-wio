"use client"
import React from 'react'
import { pressMentions } from '@/data/pressMentions'

const FeaturedMentions = ({ title = 'Featured Mentions' }) => {
  return (
    <div className="w-full py-12">
      <h2 className="!text-[3em] md:!text-[4em] text-white mb-4">{title}</h2>
      <p className="text-white/80 max-w-2xl mb-8">
        COESSING in the press, journals, and partner channels.
      </p>

      <div className="flex flex-col gap-3">
        {pressMentions.map((item) => (
          <a
            key={`${item.source}-${item.link}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-white/20 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <p className="font-semibold text-white group-hover:text-secondary_color transition-colors">
                {item.source}
              </p>
              <p className="text-white/60 text-sm md:text-base">{item.date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default FeaturedMentions

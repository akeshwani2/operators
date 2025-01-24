"use client"

import { useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#18181b',
    primaryColor: '#3b82f6',
    primaryTextColor: '#fff',
    primaryBorderColor: '#3b82f6',
    lineColor: '#4b5563',
    secondaryColor: '#2563eb',
    tertiaryColor: '#1e40af',
  }
})

export function MermaidChart({ chart }: { chart: string }) {
  useEffect(() => {
    mermaid.contentLoaded()
  }, [])

  return (
    <div className="mermaid text-sm">
      {chart}
    </div>
  )
}
'use client'
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Oops! That summoner isn't currently in game</h2>
      <Link
        href='/'
        replace
      >
        Home
      </Link>
    </div>
  )
}
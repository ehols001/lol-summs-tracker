import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link className='bg-slate-400 m-2 p-2 rounded-lg' href='/create-session'>
        Create Session
      </Link>
      <Link className='bg-slate-400 m-2 p-2 rounded-lg' href='/join-session'>
        Join Session
      </Link>
    </div>
  )
}

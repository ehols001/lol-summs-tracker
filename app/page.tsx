'use client'

import Link from 'next/link'
import { Input } from 'postcss'
import React from 'react';

export default function Home() {
  const [summonerNameValue, setSummonerNameValue] = React.useState('');
  const [tagLineValue, setTagLineValue] = React.useState('');
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <input name='summonerName' 
        placeholder='Summoner' 
        className='bg-slate-400 m-2 p-2 rounded-lg placeholder-white' 
        onChange={(e) => setSummonerNameValue(e.target.value)}/>
      
      <input name='tagLine' 
        placeholder='Tag Line' 
        className='bg-slate-400 m-2 p-2 rounded-lg placeholder-white'
        onChange={(e) => setTagLineValue(e.target.value)}/>

      <Link className='bg-slate-400 m-2 p-2 rounded-lg' 
        href={{ pathname: '/game/1234', query: {summonerName: summonerNameValue, tagLine: tagLineValue}}}>
        Join Session
      </Link>
    </div>
  )
}

import Footer from '@/components/Footer'
import Header from '@/components/template/Header'
import TextoCentral from '@/components/template/TentoCentral'
import TextoBUsca from '@/components/template/TextoBusca'
import React from 'react'

export default function Home() {
  return (
    <div className='flex flex-col justify-between h-screen w-screen'>
      <Header />
      <TextoCentral />
      <TextoBUsca />
      <Footer />
    </div>
  )
}
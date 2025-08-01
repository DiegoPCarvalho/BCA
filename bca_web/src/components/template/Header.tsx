import React from 'react'
import logo from '@/assets/img/logo.png'
import Image from 'next/image'
import Botao from '../shared/Botao'
import { IconList, IconSetting } from '../icons/IconsHero'

export default function Header() {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex p-2'><Botao clase='text-white cursor-pointer' icone={IconList} /></div>
            <div><Image src={logo} alt="" /></div>
            <div className='flex p-2'><Botao clase='text-white cursor-pointer' icone={IconSetting} /></div>
        </div>
    )
}
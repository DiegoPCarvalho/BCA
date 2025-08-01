'use client'

import React from 'react';
import Botao from '../shared/Botao';
import Entrada from '../shared/Entrada';

interface TextoBuscaProps {
    buscar: () => void
    valor?: string
    alterouCampo?: (valor: string) => void
    fimEdicao?: () => void
}

export default function TextoBusca(props: TextoBuscaProps){
    return (
        <div className='flex justify-center items-center'>
            <div className='mr-5'>
                <Entrada fimEdicao={props.fimEdicao} valor={props.valor} alterouCampo={props.alterouCampo}/>
            </div>
            <div><Botao click={props.buscar} clase='bg-orange-500 cursor-pointer text-white font-bold p-3 rounded-lg' icone="Buscar"/></div>
        </div>
    )
}
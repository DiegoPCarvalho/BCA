'use client'

import React from 'react'

interface TextoCentralProps {
    mensagemErro?: boolean
    descricaoPreco?: boolean
    descricao?: string
    preco?: string
    error?: string
}

export default function TextoCentral(props: TextoCentralProps) {
    return (
        <div className='flex justify-center text-white'>
            {props.mensagemErro ? <div className='font-bold text-white text-6xl'>{props.error}</div>
                : props.descricaoPreco ?
                    <div className='flex flex-col text-center text-6xl font-bold'>
                        <div className='mb-9'>{props.descricao}</div>
                        <div>R$ {props.preco}</div>
                    </ div> :
                    <div className='text-7xl text-center font-bold'>PASSE O CÓDIGO DE BARRAS DO PRODUTO NO LEITOR</div>}
        </div>
    )
}
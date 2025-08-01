'use client'

import React from 'react';

interface EntradaProps {
    id?: string
    tipo?: string
    texto?: string
    nome?: string
    valor?: any
    leitura?: boolean
    className?: string
    requerido?: boolean
    mensagemCampo?: string
    soLeitura?: boolean
    children?: any
    filtro?: boolean
    desativar?: boolean
    linhas?: number
    optionDisabled?: boolean
    check?: boolean
    alterouCampo?: (novoValor: any) => void
    buscarPesquisa?: (novoValor: any) => void
    fimEdicao?: () => void
}


export default function Entrada(props: EntradaProps) {
    return (
        <div className={`flex flex-col ml-2 ${props.className}`}>
            <label className="font-bold text-lg text-black dark:text-white">{props.texto}</label>
            <input
                id={props.id}
                type={props.tipo ?? 'text'}
                name={props.nome}
                value={props.valor}
                onChange={(e) => props.alterouCampo!(e.target.value)}
                onKeyDown={props.buscarPesquisa}
                onBlur={props.fimEdicao}
                disabled={props.desativar ?? false}

                className={`
                    px-4 py-3 rounded-lg  mt-1 bg-red-700
                    focus:bg-white focus:outline-none
                    focus:ring-2
                `}
                placeholder={props.mensagemCampo}
                required={props.requerido}

            />
        </div>
    )
}
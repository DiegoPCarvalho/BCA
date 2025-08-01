import React from 'react'

interface BotaoProps {
    click?: () => void;
    icone?: React.ReactNode | string
    clase?: string
}

export default function Botao(props: BotaoProps){

    return <button className={props.clase} onClick={props.click}>{props.icone}</button>
}
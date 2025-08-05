'use client'

import Footer from '@/components/template/Footer'
import Header from '@/components/template/Header'
import TextoCentral from '@/components/template/TentoCentral'
import TextoBusca from '@/components/template/TextoBusca'
import React, { useState } from 'react'
import axios from 'axios'
import bancoLocal from '@/function/bancoLocal'

export default function Home() {

  const [loja, setLoja] = useState<string>('584')
  const [ean, setEan] = useState<any>("")
  const [descricao, setDescricao] = useState<string>('')
  const [preco, setPreco] = useState<string>('')
  const [mensagemErro, setMensagemErro] = useState<boolean>(false)
  const [descricaoPreco, setDescricaoPreco] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  async function buscarDados() {
    try {

      const { data } = await axios.get(bancoLocal(loja, ean), { timeout: 7000})

      console.log(data)
      if (!data || data.length === 0 || data.httpStatusCode === 404) {
        setMensagemErro(true)
        setDescricaoPreco(false)
        setDescricao('')
        setPreco('')
        setError('PRODUTO NÃO ENCONTRADO TENTE NOVAMENTE')
        setTimeout(() => {
          setDescricao('')
          setPreco('')
          setDescricaoPreco(false)
          setMensagemErro(false)
        }, 2000);
        return
      } else {
        setMensagemErro(false)
        setDescricaoPreco(true)
        setDescricao(data.descricao)
        setPreco(data.preco)
        setError('')
        setTimeout(() => {
          setDescricao('')
          setPreco('')
          setDescricaoPreco(false)
          setMensagemErro(false)
        }, 2000);
        return
      }

    } catch (error) {
      console.log('Erro capturado:', error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (error.code === 'ERR_NETWORK' || status === 404 || status === 500) {
          setMensagemErro(true);
          setDescricaoPreco(false);
          setDescricao('');
          setPreco('');
          setError('SERVIDOR OFFLINE TENTE NOVAMENTE MAIS TARDE');

          setTimeout(() => {
            setDescricao('');
            setPreco('');
            setDescricaoPreco(false);
            setMensagemErro(false);
          }, 2000);

          return;
        } else {
          console.warn('Erro Axios não tratado:', status, error.message);
          return;
        }
      } else {
        // 🚨 Aqui é onde caiu no seu caso
        console.log('Erro desconhecido capturado:', error);
        setMensagemErro(true);
          setDescricaoPreco(false);
          setDescricao('');
          setPreco('');
          setError('SERVIDOR OFFLINE TENTE NOVAMENTE MAIS TARDE');

          setTimeout(() => {
            setDescricao('');
            setPreco('');
            setDescricaoPreco(false);
            setMensagemErro(false);
          }, 2000);

          return;
      }
    }
  }

  return (
    <div className='flex flex-col justify-between h-screen w-screen bg-red-700'>
      <Header />
      <TextoCentral
        descricao={descricao}
        preco={preco}
        mensagemErro={mensagemErro}
        descricaoPreco={descricaoPreco}
        error={error}
      />
      <TextoBusca
        valor={ean}
        alterouCampo={setEan}
        buscar={buscarDados}
        fimEdicao={buscarDados} />
      <Footer />
    </div>
  )
}
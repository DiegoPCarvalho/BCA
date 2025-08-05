import { View, StyleSheet } from 'react-native'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
import CentralResposta from '@/components/Layout/CentralResposta'
import TextBusca from '@/components/Layout/TextBusca'
import { useEffect, useRef, useState } from 'react'
import useAppData from '@/hooks/useAppData'
import axios from 'axios'

export default function Home() {

  const { carregarConfiguracoes, salvarLogs, mostrarToast } = useAppData()
  const textBuscaRef = useRef<{ focus: () => void }>(null);
  const dt = new Date()

  const [loja, setLoja] = useState<string>('')
  const [baseUrl, setBaseUrl] = useState<string>('')

  const [erro, setErro] = useState<boolean>(false)
  const [resposta, setResposta] = useState<boolean>(false)
  const [inicio, setInicio] = useState<boolean>(true)
  const [mensagemErro, setMensagemErro] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [preco, setPreco] = useState<string>('')

  useEffect(() => {
    Busca()
  }, [])

  async function Busca() {

    const dado = await carregarConfiguracoes!()

    setLoja(dado?.loja!)
    setBaseUrl(dado?.urlApi!)

  }

  function mudarvalorReal(valor: string): string {
    const valorFormatado = valor.toString().replace(/\./, ',');
    return valorFormatado
  }

  async function buscarPreco(codigo: string) {
    try {

      const { data } = await axios.get(`${baseUrl}?loja=${loja}&ean=${codigo}`)

      // console.log(data)
      if (!data || data?.httpStatusCode === 404) {
        setMensagemErro("Produto Não Encontrados Passe o Código Novamente");
        salvarLogs!(`${dt}`, "Erro", "Produto ou Loja não encontrado")
        setInicio(false);
        setErro(true);
        setTimeout(() => {
          setErro(false)
          setInicio(true)
        }, 2000)
      } else {
        setDescricao(data?.descricao)
        setPreco("R$ " + mudarvalorReal(data?.preco))
        setInicio(false)
        setResposta(true)
        salvarLogs!(`${dt}`, "Sucesso", "Efetuado a leitura do código e buscado na API" + descricao + " " + preco)
        setTimeout(() => {
          setResposta(false)
          setInicio(true)
        }, 2000)
      }

    } catch (error: any) {
      const mensagem = "Servidor offline. Tente novamente mais tarde.";

      console.warn("Erro capturado:", error?.message || error);

      const logDetalhado = error?.toString?.() || JSON.stringify(error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const isErroRede = error.code === 'ERR_NETWORK';
        const isErroServidor = status === 404 || status === 500;

        if (isErroRede || isErroServidor) {
          setMensagemErro(mensagem);
          salvarLogs!(`${dt}`, "Erro", "Servidor OffLine - " + logDetalhado);
          setInicio(false);
          setErro(true);

          setTimeout(() => {
            setErro(false);
            setInicio(true);
          }, 2000);
        } else {
          // outros erros Axios podem ser tratados aqui se necessário
          console.warn("Erro Axios não tratado:", status, error.message);
        }
      } else {
        // erro genérico
        setMensagemErro(mensagem);
        salvarLogs!(`${dt}`, "Erro", "Erro desconhecido - " + logDetalhado);
        mostrarToast!('error', "Erro no sistema", mensagem);
        setInicio(false);
        setErro(true);

        setTimeout(() => {
          setErro(false);
          setInicio(true);
        }, 2000);
      }
    }
  }

  function mostrar() {
    console.log(baseUrl)
  }

  return (
    <View style={styles.home}>
      <View><Header config /></View>
      <View><CentralResposta inicio={inicio} resposta={resposta} erro={erro} descricao={descricao} preco={preco} mensagemErro={mensagemErro} /></View>
      <View><TextBusca ref={textBuscaRef} loja={loja} baseurl={baseUrl} buscar={buscarPreco} text={mostrar} /></View>
      <View><Footer mostrar /></View>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
    backgroundColor: "#FF0000",
    padding: 10
  }
})
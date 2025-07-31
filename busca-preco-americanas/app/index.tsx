import { View, StyleSheet } from 'react-native'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
import CentralResposta from '@/components/Layout/CentralResposta'
import TextBusca from '@/components/Layout/TextBusca'
import { useEffect, useRef, useState } from 'react'
import useAppData from '@/hooks/useAppData'

export default function Home() {

  const { carregarConfiguracoes, salvarLogs } = useAppData()
  const textBuscaRef = useRef<{ focus: () => void }>(null);
  const dt = new Date()

  const [loja, setLoja] = useState<string>('')
  const [baseUrl, setBaseUrl] = useState<string>('')

  useEffect(() => {
    Busca()
  }, [])

  async function Busca() {

    const dado = await carregarConfiguracoes!()

    setLoja(dado?.loja ?? '')
    setBaseUrl(dado?.urlApi?.trim().replace(/\/$/, '') ?? '')

  }

  return (
    <View style={styles.home}>
      <View><Header config /></View>
      <View><CentralResposta /></View>
      <View><TextBusca ref={textBuscaRef} loja={loja} baseurl={baseUrl} /></View>
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
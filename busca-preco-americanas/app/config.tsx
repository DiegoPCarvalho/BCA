import { Text, View, StyleSheet } from 'react-native'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
import Campos from '@/components/ConfigView/Campos'
import Botoes from '@/components/ConfigView/Botoes'
import { useEffect, useState } from 'react'
import useAppData from '@/hooks/useAppData'
import { useRouter } from 'expo-router'


export default function Config() {

    const { salvarConfiguracao, carregarConfiguracoes } = useAppData()
    const router = useRouter()

    const [loja, setLoja] = useState<string>('')
    const [urlApi, setUrlApi] = useState<string>('')

    useEffect(() => {
        Busca()
    }, [])

    async function Busca() {
        const dado = await carregarConfiguracoes!()

        setLoja(dado?.loja!)
        setUrlApi(dado?.urlApi!)
    }

    async function salvar() {
        try {
            await salvarConfiguracao!(loja, urlApi)

            router.back()
        } catch (e) {
            console.warn("erro")
        }
    }

    return (
        <View style={styles.home}>
            <View><Header /></View>
            <View>
                <View style={styles.config}><Text style={styles.texto}>CONFIGURAÇÕES</Text></View>
                <View style={styles.campos}>
                    <Campos
                        loja={loja}
                        urlApi={urlApi}
                        alterarLoja={setLoja}
                        alterarUrlApi={setUrlApi}
                    />
                </View>
                <View style={styles.botoes}><Botoes comando={salvar} /></View>
            </View>
            <View><Footer /></View>
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
    },
    config: {
        display: "flex",
        alignItems: "center",
    },
    texto: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold'
    },
    campos: {
        height: 200,
    },
    botoes: {
        display: "flex",
        alignItems: 'center',
        marginTop: 10
    }
})
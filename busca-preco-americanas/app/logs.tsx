import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import BotoesLogs from '@/components/LogsView/Botoes';
import CampoLogs from '@/components/LogsView/CampoLogs';
import { ArrayLogsProps } from '@/context/AppContext';
import useAppData from '@/hooks/useAppData';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function Logs() {
    const data = new Date()
    const [logs, setLogs] = useState<Array<ArrayLogsProps>>([])
    const { salvarArquivoTxtExpo, deletarLogs, carregarLogs, mostrarToast } = useAppData()

    useEffect(() => {
        BuscarDado()
    }, [])

    async function BuscarDado() {
        try {
            const dado = await carregarLogs!()

            return setLogs(dado ?? [])
        }
        catch (e) {
            mostrarToast!("error", "Erro:", "Falha em buscar os Logs")
        }
    }

    async function DeletarFull() {
        try {
            await deletarLogs!()

            BuscarDado()

        }catch(e){
            mostrarToast!("error", 'Erro:', "Erro ao Excluir os Logs")
        }
    }

    async function exportar(){
        try {
            const dados = await carregarLogs!()

            await salvarArquivoTxtExpo!(dados ?? [])

        }catch(e) {
            console.warn(e)
        }
    }

    return (
        <View style={styles.home}>
            <View><Header /></View>
            <View style={styles.viewTextoLog}><Text style={styles.textoLog}>Logs do Sistema</Text></View>
            <View style={styles.viewBotoes}>
                <BotoesLogs export   exportar={exportar}/>
                <BotoesLogs atualizar={BuscarDado} deletar={DeletarFull} />
            </View>
            <View><CampoLogs logs={logs}/></View>
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
    viewTextoLog: {
        display: 'flex',
        alignItems: "center"
    },
    textoLog: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    viewBotoes: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
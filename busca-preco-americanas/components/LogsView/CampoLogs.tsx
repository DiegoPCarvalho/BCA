import { ArrayLogsProps } from '@/context/AppContext'

import { View, StyleSheet, ScrollView, Text } from 'react-native'

interface CamposLogsProps {
    logs: Array<ArrayLogsProps>
}

export default function CampoLogs(props: CamposLogsProps) {

    function dataNova(data: string): string | undefined {

        const regex = /^[A-Za-z]{3} ([A-Za-z]{3}) (\d{1,2}) (\d{4}) (\d{2}):(\d{2}):(\d{2})/;

        const match = data.match(regex);

        if (match) {
            const [_, mesStr, dia, ano, hora, minuto, segundo] = match;

            const meses: any = {
                Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
                Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
            };

            const mes = meses[mesStr];
            const diaFormatado = dia.padStart(2, '0');

            const dataFormatada = `${diaFormatado}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
            return dataFormatada
        }
    }

    function renderizarLogs() {
        return props.logs.length === 0 ?
            (
                <Text style={styles.textArea}>...</Text>
            ) : props.logs.map((dado: ArrayLogsProps, i: number) => {
                return (
                    <Text key={i} style={styles.textArea}>{dataNova(dado.data!) ?? ''} - {dado.tipo ?? ''} - {dado.mensagem ?? ''}</Text>
                )
            })

    }

    return (
        <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                {renderizarLogs()}
            </ScrollView>
        </View>
    )

}
const styles = StyleSheet.create({
    main: {

    },
    scrollView: {
        height: 200,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white",
        padding: 2
    },
    textArea: {
        paddingHorizontal: 10,
        marginVertical: 1,
        fontSize: 16
    }
})
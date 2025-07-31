import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface BotoesProps {
    deletar?: () => Promise<void>
    exportar?: () => Promise<void>
    atualizar?: () => Promise<void>
    export?: boolean
}

export default function BotoesLogs(props: BotoesProps) {
    const router = useRouter()

    return (
        <View style={styles.main}>
            {props.export ? (
                <TouchableOpacity style={styles.botaoExpo} onPress={props.exportar}>
                    <Text style={styles.texto}>Exportar</Text>
                </TouchableOpacity>
            ) : (
                <>
                    <TouchableOpacity style={styles.botao} onPress={props.atualizar}>
                        <Text style={styles.texto}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={props.deletar}>
                        <Text style={styles.texto}>Deletar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
                        <Text style={styles.texto}>Voltar</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
    },
    botao: {
        backgroundColor: '#FF8C00',
        padding: 5,
        borderRadius: 10
    },
    texto: {
        fontSize: 15,
        padding: 5,
        fontWeight: 'bold',
        color: "white"
    },
    botaoExpo: {
        backgroundColor: '#056c22ff',
        padding: 5,
        borderRadius: 10
    }
})
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface BotoesProps {
    comando?: () => void
}

export default function Botoes(props: BotoesProps) {
    const router = useRouter()

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.botao} onPress={props.comando}>
                <Text style={styles.texto}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
                <Text style={styles.texto}>Cancelar</Text>
            </TouchableOpacity>
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
        padding: 10,
        borderRadius: 10
    },
    texto: {
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
        color: "white"    
    }
})
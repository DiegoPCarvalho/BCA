import { View, TextInput, StyleSheet, Text } from 'react-native';

interface InputTextoProps {
    mensagem: string
    tamanho?: boolean
    nome: string
    valor: string
    alterarCampo: (novoValor: string) => void
}

export default function InputTexto(props: InputTextoProps) {
    return (
        <View>
            <Text style={styles.nome}>{props.nome}</Text>
            <TextInput
                style={props.tamanho ? styles.input : styles.input2}
                placeholder={props.mensagem}
                value={props.valor}
                onChangeText={props.alterarCampo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    nome: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 2,
        color: 'white'
    },
    input: {
        display: 'flex',
        height: 50,
        fontSize: 16,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },
    input2: {
        display: 'flex',
        height: 50,
        width: 120,
        fontSize: 16,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },
})
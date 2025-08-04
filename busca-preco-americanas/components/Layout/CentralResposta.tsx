
import { StyleSheet, Text, View } from "react-native";

interface CentralRespostaProps {
    inicio: boolean
    resposta: boolean
    erro: boolean
    descricao: string
    preco: string
    mensagemErro: string
}

export default function CentralResposta(props: CentralRespostaProps) {
    
    return (
        <View style={styles.main}>
            {props.inicio ?
                <Text style={styles.fraseInicial}>PASSE O CÓDIGO DE BARRAS DO PRODUTO NO LEITOR</Text>
                : props.resposta ? (
                    <>
                        <Text style={styles.valor}>{props.descricao}</Text>
                        <Text style={styles.valor}>{props.preco}</Text>
                    </>
                ) : props.erro ? (
                    <>
                        <Text style={styles.erro}>{props.mensagemErro}</Text>
                    </>
                ) : false}
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        display: 'flex',
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: "center"
    },
    fraseInicial: {
        display: 'flex',
        textAlign: 'center',
        fontSize: 50,
        fontWeight: "bold",
        color: 'white'
    },
    valor: {
        display: 'flex',
        textAlign: 'center',
        fontSize: 60,
        fontWeight: "bold",
        color: 'white'
    },
    erro: {
         display: 'flex',
        textAlign: 'center',
        fontSize: 50,
        fontWeight: "bold",
        color: 'white'
    }
})
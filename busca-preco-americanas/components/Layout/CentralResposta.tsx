import useAppData from "@/hooks/useAppData";
import { StyleSheet, Text, View } from "react-native";

export default function CentralResposta() {
    const { inicio, resposta, erro, descricao, preco, mensagemErro } = useAppData();

    return (
        <View style={styles.main}>
            {inicio ?
                <Text style={styles.fraseInicial}>PASSE O CÓDIGO DE BARRAS DO PRODUTO NO LEITOR</Text>
                : resposta ? (
                    <>
                        <Text style={styles.valor}>{descricao}</Text>
                        <Text style={styles.valor}>{preco}</Text>
                    </>
                ) : erro ? (
                    <>
                        <Text style={styles.erro}>{mensagemErro}</Text>
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
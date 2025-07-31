import { View, StyleSheet } from 'react-native'
import InputTexto from '../Shared/InputTexto'

interface CamposProps {
    loja: string
    urlApi: string
    alterarLoja: (novoValor: string) => void
    alterarUrlApi: (novoValor: string) => void
}

export default function Campos(props: CamposProps){

    return (
        <View style={styles.main}>
            <InputTexto 
                nome='LOJA:'
                mensagem='Loja...'
                valor={props.loja}
                alterarCampo={props.alterarLoja}
            />
            <InputTexto 
                nome="URL API:"
                mensagem='URL Api...'
                valor={props.urlApi}
                alterarCampo={props.alterarUrlApi}
                tamanho
            />
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        display: "flex",
        justifyContent: "space-around",
        height: "100%"
    }
})
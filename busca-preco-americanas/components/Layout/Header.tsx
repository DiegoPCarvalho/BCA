import { Image, View, StyleSheet } from "react-native";
import BotaoConfig from "../Shared/BotaoConfig";
import BotaoLog from "../Shared/BotaoLog";

interface HeaderProps {
    config?: boolean
}

export default function Header(props: HeaderProps) {
    return (
        <View style={styles.main}>
            <View style={styles.botaoMain}>
               {props.config ?  <BotaoLog /> : false}
            </View>
            <View style={styles.imagemMain}>
                <Image source={require('@/assets/img/logo.png')} style={styles.imagem} />
            </View>
            <View style={styles.botaoMain}>
               {props.config ?  <BotaoConfig /> : false}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    imagemMain: {
        display: 'flex',
        alignItems: "center",
        width: "90%"
    },
    imagem: {
        display: "flex",
        height: 100,
        marginTop: 10
    },
    botaoMain: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        height: 90,
        width: "5%"
    }
})
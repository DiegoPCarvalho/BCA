import useAppData from '@/hooks/useAppData';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface FooterProps {
    mostrar?: boolean
}

export default function Footer(props: FooterProps){
    
    const { carregarConfiguracoes } = useAppData()

    const [loja, setLoja] = useState<string>('')

     useEffect(() => {
            Busca()
        }, [])
    
        async function Busca() {
            const dado = await carregarConfiguracoes!()
    
            setLoja(dado?.loja!)
        }

    return (
        <View style={styles.main}>
            <Text style={styles.loja}>{ props.mostrar ? `Loja: ${loja}` : false}</Text>
            <Text style={styles.dir}>© 2025 Zhaz Soluções - Todos os direitos reservados</Text>
        </View>
    )
} 


const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 5
    },
    loja:{
        color: "white"
    },
    dir: {
        color: "white"
    }
})
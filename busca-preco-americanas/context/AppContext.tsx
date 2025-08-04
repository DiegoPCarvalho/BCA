import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';


interface AppContextProps {
    buscarPreco?: (baseurl: string, loja: string | number, codigo: string | number) => Promise<void>
    descricao?: string
    preco?: string
    resposta?: boolean
    erro?: boolean
    inicio?: boolean
    mensagemErro?: string
    salvarConfiguracao?: (loja: string, urlApi: string) => Promise<void>
    carregarConfiguracoes?: () => Promise<Configuracoes | null | undefined>
    // mostrarDado?: (baseurl: string, loja: string | number, codigo: string | number) => Promise<void>
    mostrarToast?: (tipo: string, text1: string, text2: string) => void
    salvarLogs?: (data: string, tipo: string, mensagem: string) => Promise<void>
    carregarLogs?: () => Promise<Array<ArrayLogsProps> | null | undefined>
    deletarLogs?: () => Promise<void>
    salvarArquivoTxtExpo?: (dados: Array<ArrayLogsProps>) => Promise<void>
}

interface Configuracoes {
    loja: string | null;
    urlApi: string | null;
}

export interface ArrayLogsProps {
    data?: string
    tipo?: string
    mensagem?: string
}

const dt = new Date()

// const baseurl: string = "http://192.168.15.14:3000/product-service.prod-hydra.azr.internal.americanas.io/search/price/prost"

const AppContext = createContext<AppContextProps>({})

export function AppProvider({ children }: any) {


    function mostrarToast(tipo: string, text1: string, text2: string) {
        Toast.show({
            type: tipo,
            text1,
            text2,
            position: 'bottom'
        });
    }

    async function salvarConfiguracao(loja: string, urlApi: string) {
        try {
            await AsyncStorage.setItem('loja', loja)
            await AsyncStorage.setItem('urlApi', urlApi)
            mostrarToast('success', "Salvar", "Configuração salvas com sucesso")
        } catch (e) {
            mostrarToast('error', "Erro", "Erro ao salvar configurações")
            salvarLogs(`${dt}`, "Erro", "Não foi possivel salvar as configurações " + e)
        }
    }

    async function carregarConfiguracoes(): Promise<Configuracoes | null | undefined> {
        try {
            const loja = await AsyncStorage.getItem('loja')
            const urlApi = await AsyncStorage.getItem('urlApi')

            console.warn(loja, urlApi)
            return { loja, urlApi };
        } catch (e) {
            mostrarToast('error', "Erro", "Erro ao Carregar Configurações")
            salvarLogs(`${dt}`, "Erro", "Erro ao carregar as configurações " + e)
            return null
        }
    }

    async function salvarLogs(data: string, tipo: string, mensagem: string) {
        try {
            const resp = await carregarLogs()

            const dado = { data, tipo, mensagem }
            resp?.push(dado)

            const jsonValue = JSON.stringify(resp);
            await AsyncStorage.setItem("logs", jsonValue);

            console.log("salvo log com sucesso", jsonValue)

        } catch (e) {
            console.warn("Erro ao salvar o log")
        }
    }

    async function carregarLogs(): Promise<Array<ArrayLogsProps> | null | undefined> {
        try {
            const jsonValue = await AsyncStorage.getItem("logs");
            const arrayDado = jsonValue != null ? JSON.parse(jsonValue) : []
            return arrayDado

        } catch (e) {
            console.warn("Erro ao carregar o log")
            return null
        }
    }

    async function deletarLogs() {
        try {
            await AsyncStorage.removeItem('logs')
            mostrarToast("success", "Excluir", "Logs Excluídos com Sucesso!!!")
        } catch (e) {
            console.warn("Erro ao Excluir os Logs")
        }
    }


    async function salvarArquivoTxtExpo(dados: Array<ArrayLogsProps>) {
        try {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (!permissions.granted) {
                mostrarToast('error', 'Permissão negada', 'Não foi possível acessar o armazenamento.');
                return;
            }

            const conteudo = dados.map(d => `${d.data} - ${d.tipo ?? ''} - ${d.mensagem ?? ''}`).join('\n');
            const fileName = 'dados_exportados.txt';

            await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                fileName,
                'text/plain'
            ).then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, conteudo, {
                    encoding: FileSystem.EncodingType.UTF8,
                });

                mostrarToast('success', 'Sucesso', 'Arquivo salvo com sucesso!');
            });
        } catch (error) {
            console.error(error);
            mostrarToast('error', 'Erro', 'Não foi possível salvar o arquivo.');
        }
    }


    return (
        <AppContext.Provider
            value={{
                salvarConfiguracao,
                carregarConfiguracoes,
                mostrarToast,
                salvarLogs,
                carregarLogs,
                deletarLogs,
                salvarArquivoTxtExpo
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
import { createContext, useState } from 'react';
import axios from 'axios';
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

    const [erro, setErro] = useState<boolean>(false)
    const [resposta, setResposta] = useState<boolean>(false)
    const [inicio, setInicio] = useState<boolean>(true)
    const [mensagemErro, setMensagemErro] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [preco, setPreco] = useState<string>('')


    function mostrarToast(tipo: string, text1: string, text2: string) {
        Toast.show({
            type: tipo,
            text1,
            text2,
            position: 'bottom'
        });
    }

    async function buscarPreco(baseurl: string, loja: string | number, codigo: string | number) {
        try {

            const data = await axios.get(`${baseurl}?loja=${loja}&ean=${codigo}`).then(resp => resp.data)

            if (data.length > 0) {
                if (data[0]?.httpStatusCode === 404) {
                    setMensagemErro("Produto Não Encontrados Passe o Código Novamente");
                    salvarLogs(`${dt}`, "Erro", "Produto ou Loja não encontrado")
                    setInicio(false);
                    setErro(true);
                    setTimeout(() => {
                        setErro(false)
                        setInicio(true)
                    }, 2000)
                } else {
                    setDescricao(data[0]?.descricao)
                    setPreco(data[0]?.preco)
                    setInicio(false)
                    setResposta(true)
                    salvarLogs(`${dt}`, "Sucesso", "Efetuado a leitura do código e buscado na API" + descricao + " " + preco)
                    setTimeout(() => {
                        setResposta(false)
                        setInicio(true)
                    }, 2000)
                }
            }

        } catch (error: any) {
            const mensagem = "Servidor offline. Tente novamente mais tarde.";

            console.warn("Erro capturado:", error?.message || error);

            const logDetalhado = error?.toString?.() || JSON.stringify(error);

            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const isErroRede = error.code === 'ERR_NETWORK';
                const isErroServidor = status === 404 || status === 500;

                if (isErroRede || isErroServidor) {
                    setMensagemErro(mensagem);
                    salvarLogs(`${dt}`, "Erro", "Servidor OffLine - " + logDetalhado);
                    setInicio(false);
                    setErro(true);

                    setTimeout(() => {
                        setErro(false);
                        setInicio(true);
                    }, 2000);
                } else {
                    // outros erros Axios podem ser tratados aqui se necessário
                    console.warn("Erro Axios não tratado:", status, error.message);
                }
            } else {
                // erro genérico
                setMensagemErro(mensagem);
                salvarLogs(`${dt}`, "Erro", "Erro desconhecido - " + logDetalhado);
                mostrarToast('error', "Erro no sistema", mensagem);    
                setInicio(false);
                setErro(true);

                setTimeout(() => {
                    setErro(false);
                    setInicio(true);
                }, 2000);
            }
        }
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
                buscarPreco,
                erro,
                resposta,
                inicio,
                descricao,
                preco,
                mensagemErro,
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
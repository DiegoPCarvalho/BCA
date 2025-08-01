import useAppData from '@/hooks/useAppData';
import { Audio } from 'expo-av';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TextBuscaProps {
  baseurl: string,
  loja: string | number,
}

const TextBusca = forwardRef((props: TextBuscaProps, ref) => {
  const [texto, setTexto] = useState('');
  const [jaTocou, setJaTocou] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const manualFocusRef = useRef<boolean>(false); // nova flag

  const { buscarPreco, mostrarToast } = useAppData()

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/beep.wav')
      );
      soundRef.current = sound;
    };
    loadSound();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  // Mantém foco, mas sem beep
  useEffect(() => {
    const manterFoco = setInterval(() => {
      if (inputRef.current && !inputRef.current.isFocused()) {
        manualFocusRef.current = false;
        inputRef.current.focus();
      }
    }, 7000);

    return () => clearInterval(manterFoco);
  }, []);

  // Expõe método externo
  useImperativeHandle(ref, () => ({
    focus: () => {
      manualFocusRef.current = true;
      inputRef.current?.focus();
    },
  }));

  const playBeep = async () => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }
  };

  const handleFocus = () => {
    setJaTocou(false);
    if (manualFocusRef.current) {
      playBeep();
      manualFocusRef.current = false;
    }
  };

  const handleChangeText = (text: string) => {
    setTexto(text);
    if (text.length === 1 && !jaTocou) {
      playBeep();
      setJaTocou(true);
    }
    if (text.length === 0) {
      setJaTocou(false);
    }
  };

  async function buscar(texto: string) {
    try {
      await buscarPreco!(props.baseurl, props.loja, texto);

      console.warn('passou aqui')

    } catch (e) {
      mostrarToast!('error', "Função", "Não Efetuado a Função Busca Preço")
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          autoFocus
          keyboardType="visible-password"
          showSoftInputOnFocus={false}
          underlineColorAndroid="transparent"
          caretHidden={true}
          onFocus={handleFocus}
          onChangeText={handleChangeText}
          value={texto}
          onSubmitEditing={async () => {
            await buscar(texto)
            setTexto('');
            setJaTocou(false);
            inputRef.current?.focus();
          }}
        />
      </View>
      <TouchableOpacity onPress={() => buscar(texto)}>
        <Text>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
});

export default TextBusca;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: "#000000"
  },
});


// import useAppData from '@/hooks/useAppData';
// import { Audio } from 'expo-av';
// import React, {
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// interface TextBuscaProps {
//   baseurl: string;
//   loja: string | number;
// }

// const TextBusca = forwardRef((props: TextBuscaProps, ref) => {
//   const [texto, setTexto] = useState('');
//   const [jaTocou, setJaTocou] = useState(false);
//   const inputRef = useRef<TextInput>(null);
//   const soundRef = useRef<Audio.Sound | null>(null);
//   const manualFocusRef = useRef<boolean>(false);

//   const { buscarPreco, mostrarToast, carregarConfiguracoes } = useAppData();

//   useEffect(() => {
//     const loadSound = async () => {
//       const { sound } = await Audio.Sound.createAsync(
//         require('../../assets/sounds/beep.wav')
//       );
//       soundRef.current = sound;
//     };
//     loadSound();

//     return () => {
//       soundRef.current?.unloadAsync();
//     };
//   }, []);

//   // Comentado o setInterval para evitar conflito com foco manual
//   // useEffect(() => {
//   //   const manterFoco = setInterval(() => {
//   //     if (inputRef.current && !inputRef.current.isFocused()) {
//   //       manualFocusRef.current = false;
//   //       inputRef.current.focus();
//   //     }
//   //   }, 500);

//   //   return () => clearInterval(manterFoco);
//   // }, []);

//   useImperativeHandle(ref, () => ({
//     focus: () => {
//       manualFocusRef.current = true;
//       inputRef.current?.focus();
//     },
//   }));

//   const playBeep = async () => {
//     if (soundRef.current) {
//       await soundRef.current.replayAsync();
//     }
//   };

//   const handleFocus = () => {
//     setJaTocou(false);
//     if (manualFocusRef.current) {
//       playBeep();
//       manualFocusRef.current = false;
//     }
//   };

//   const handleChangeText = (text: string) => {
//     setTexto(text);
//     if (text.length === 1 && !jaTocou) {
//       playBeep();
//       setJaTocou(true);
//     }
//     if (text.length === 0) {
//       setJaTocou(false);
//     }
//   };

//   async function buscar(textoBusca: string) {
//     if (!textoBusca.trim()) return;

//     if (buscarPreco) {
//       try {
//         await buscarPreco(props.baseurl, props.loja, textoBusca);
//         // Se preferir, pode usar await carregarConfiguracoes!() aqui

//         setTexto('');
//         setJaTocou(false);

//         manualFocusRef.current = true; // sinaliza foco manual para tocar beep
//         inputRef.current?.focus();
//       } catch (error) {
//         mostrarToast?.('error', 'Erro', 'Falha na busca de preço');
//       }
//     } else {
//       mostrarToast?.('error', 'Função', 'Não Efetuado a Função Busca Preço');
//     }
//   }

//   return (
//     <View>
//       <View style={styles.container}>
//         <TextInput
//           ref={inputRef}
//           style={styles.input}
//           autoFocus
//           keyboardType="visible-password"
//           showSoftInputOnFocus={false}
//           underlineColorAndroid="transparent"
//           caretHidden={true}
//           onFocus={handleFocus}
//           onChangeText={handleChangeText}
//           value={texto}
//           onSubmitEditing={() => buscar(texto)}
//         />
//       </View>
//       <TouchableOpacity onPress={() => buscar(texto)} style={styles.button}>
//         <Text style={styles.buttonText}>Buscar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// });

// export default TextBusca;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 50,
//     fontSize: 16,
//     color: '#000000',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   button: {
//     marginTop: 15,
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });
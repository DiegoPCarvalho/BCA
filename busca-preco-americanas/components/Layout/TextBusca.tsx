import { Audio } from 'expo-av';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface TextBuscaProps {
  baseurl: string,
  loja: string | number,
  buscar: (texto: string) => void
  text?: () => void
}

const TextBusca = forwardRef((props: TextBuscaProps, ref) => {
  const [texto, setTexto] = useState('');
  const [jaTocou, setJaTocou] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const manualFocusRef = useRef<boolean>(false); // nova flag


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
    }, 1000);

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
          onSubmitEditing={() => {
            props.buscar(texto)
            setTexto('');
            setJaTocou(false);
            inputRef.current?.focus();
          }}
        />
      </View>
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
    color: "#FF0000"
  },
});
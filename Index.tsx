import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Video } from 'expo-av';
import AudioRecorder from '../components/AudioRecorder/AudioRecorder';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

export default function Index() {
  const [text, setText] = useState('');
  const [images, setImages] = useState<number[]>([]);
  const navigation = useNavigation(); // Hook para navegação

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#7a8088',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    video: {
      width: '100%',
      height: 250,
      margin: 20,
    },

    caixa: {
      margin: 15,
      width: 235,
      padding: 10,
      borderColor: '#ffffff',
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 20,
    },

    botao: {
      backgroundColor: '#FFAA6D',
      padding: 10,
      borderRadius: 5,
      height: 40,
      width: '40%',
      alignItems: 'center',
    },

    image: {
      height: 50,
      width: 15,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },

    navButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: '#FFAA6D',
      padding: 10,
      borderRadius: 5,
    },

    navButtonText: {
      color: 'white',
      fontSize: 16,
    }
  });

  const videoRef = React.useRef(null);

  const analyzeText = (transcription: string) => {
    const keywords: { [key: string]: any } = {
      nome: 'teste',
      cachorro: 'teste2',
      // Add more keywords and images as needed
    };

    const words = transcription.split(' ');
    const imagesToShow = words.map(word => keywords[word.toLowerCase()]).filter(Boolean);
    setImages(imagesToShow);
  };

  return (
    <View style={styles.container}>

      <Video
        ref={videoRef}
        style={styles.video}
        source={require('./videos/NOME.mp4')} // Ajuste o caminho do vídeo
        shouldPlay
        isLooping
        resizeMode='contain'
      />
      <AudioRecorder onTranscription={analyzeText} />

      <TextInput
        placeholder="Escreva aqui"
        style={styles.caixa}
        onChangeText={setText}
        value={text}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('tradtexto'); // Navega para a tela TradTexto
        }}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>Transcrição</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => {
          console.log('Botão pressionado');
        }}
        style={styles.botao}
      >
        <Text style={{ color: 'white' }}>Interpretar</Text>
      </TouchableOpacity>
    </View>
  );
}

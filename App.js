import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Linking } from 'react-native';

const moedas = [
  { codigo: 'USD', descricao: 'Dólar Americano' },
  { codigo: 'CAD', descricao: 'Dólar Canadense' },
  { codigo: 'BRL', descricao: 'Real Brasileiro' },
  { codigo: 'JPY', descricao: 'Iene Japonês' },
  { codigo: 'GBP', descricao: 'Libra Esterlina' },
  { codigo: 'BTC', descricao: 'Bitcoin' },
  { codigo: 'ETH', descricao: 'Etherium' },
  { codigo: 'EUR', descricao: 'Euro' },
];

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const [cotacaoBase, setCotacaoBase] = useState('');
  const [cotacao, setCotacao] = useState('');
  const [resultado, setResultado] = useState('');

  function buscarCotacao() {
    axios
      .get(`https://api.exchangerate.host/latest?base=${cotacaoBase}&symbols=${cotacao}`)
      .then(response => {
        const valorCotacao = response.data.rates[cotacao];
        setResultado(`1 ${cotacaoBase} = ${valorCotacao} ${cotacao}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Conversor de Moedas</Text>

      <View style={styles.formulario}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cotação Base:</Text>
          <TextInput
            style={styles.picker}
            value={cotacaoBase}
            onChangeText={setCotacaoBase}
            placeholder="Selecione a moeda"
            placeholderTextColor="#9b9b9b"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cotação:</Text>
          <TextInput
            style={styles.picker}
            value={cotacao}
            onChangeText={setCotacao}
            placeholder="Selecione a moeda"
            placeholderTextColor="#9b9b9b"
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={buscarCotacao}>
          <Text style={styles.textoBotao}>Buscar Cotação</Text>
        </TouchableOpacity>
      </View>

      {resultado ? (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultado}>{resultado}</Text>
        </View>
      ) : null}

      <View style={styles.moedasContainer}>
        <Text style={styles.subtitulo}>Moedas de Exemplo:</Text>
        <View style={styles.moedasLista}>
          {moedas.map((moeda) => (
            <Text style={styles.moeda} key={moeda.codigo}>
              {moeda.codigo} - {moeda.descricao}
            </Text>
          ))}
        </View>
      </View>

      <Text style={styles.linkApiTexto} onPress={() => Linking.openURL('https://api.exchangerate.host/latest')}>Fonte: API ExchangeRate</Text>

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>© GL&TEC</Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    marginBottom: 10,
  },
  formulario: {
    backgroundColor: '#383838',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    marginBottom: 20,
    height: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkApiTexto: {
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: '#1E90FF',
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 10,
  },
  label: {
    color: '#fff',
    marginRight: 10,
    width: 100,
  },
  picker: {
    flex: 1,
    height: 40,
    color: '#fff',
    borderRadius: 5,
    backgroundColor: '#4b4b4b',
    paddingLeft: 10,
  },
  botao: {
    backgroundColor: '#ffce00',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textoBotao: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultadoContainer: {
    backgroundColor: '#383838',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  resultado: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moedasContainer: {
    marginBottom: 20,
  },
  moedasLista: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  moeda: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  rodape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  rodapeTexto: {
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontWeight: 'bold',
    color: '#fff',
  }

})
import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Nav from "../../Components/NavBar/index";
import { Ionicons } from "@expo/vector-icons"; // Importe os ícones que deseja usar
import Logo from "../../Components/Logo";
import Doces1 from "../../assets/icons/doces.png";
import Doces2 from "../../assets/icons/coxinhas.png";
import Doces3 from "../../assets/icons/copoes.png";
import Doces4 from "../../assets/icons/tortinhas.png";
import Doces5 from "../../assets/icons/salgados.png";
import Doces6 from "../../assets/icons/bebidas.png";
import { useNavigation } from "@react-navigation/native";
import MenuInferior from "../../Components/MenuInferior";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

function ChooseSweet() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getParams = async () => {
    // Para testar, trocar o IP para o IP LAN ou IPV4 da máquina que está rodando o backend
    //const host = 'https://backend-vq7d276ypa-uc.a.run.app'
    const host = "http://192.168.0.154";
    const port = "8080";

    const endpoint = `${host}:${port}/api/v1/promotion-campain`;

    let result = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    console.log(result);
    let activeCampaigns = result.filter((campaign) => campaign.active)[0];

    setData(activeCampaigns == null ? result[0] : activeCampaigns);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getParams();
  }, []);

  const retorno = async () => {
    const user = await AsyncStorage.getItem("userData");
    console.log(user);
    if (JSON.parse(user).isRootUser) {
      navigation.navigate("Gerencial");
    } else {
      navigation.navigate("Login");
    }
  };

  const selectIndispensaveis = async () => {
    await AsyncStorage.setItem("category", "Indispensáveis");
    navigation.navigate("ExibeProdutos");
  };

  const selectCoxinhasDoces = async () => {
    await AsyncStorage.setItem("category", "Coxinhas Doces");
    navigation.navigate("ExibeProdutos");
  };

  const selectCopoes = async () => {
    await AsyncStorage.setItem("category", "Copões");
    navigation.navigate("ExibeProdutos");
  };

  const selectTortinhas = async () => {
    await AsyncStorage.setItem("category", "Tortinhas");
    navigation.navigate("ExibeProdutos");
  };

  const selectSalgados = async () => {
    await AsyncStorage.setItem("category", "Salgados");
    navigation.navigate("ExibeProdutos");
  };

  const selectBebidas = async () => {
    await AsyncStorage.setItem("category", "Bebidas");
    navigation.navigate("ExibeProdutos");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <Nav onPress={retorno} />

        <View style={styles.container}>

          {/* <Logo onPress={() => navigation.navigate("Sobre")} /> */}

          <Text style={styles.text}> Campanha Ativa </Text>

          <Text style={styles.paragraph}> </Text>

          <View style={{ flexDirection: "row" }}>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <>
                <Image source={{ uri: data.imageLink }} style={styles.image} />
                <View style={{ marginLeft: 10, flexDirection: "column" }}>
                  <Text style={styles.text}>{data.title}</Text>
                  <Text style={styles.text}>{data.description}</Text>
                </View>
              </>
            )}
          </View>

          <Text style={styles.paragraph}> </Text>

          <View style={styles.row}>
            {/* Botão 1 */}
            <TouchableOpacity
              style={styles.button}
              onPress={selectIndispensaveis}
            >
              <Image source={Doces1} style={styles.image} />
              <Text style={styles.text}>Indispensáveis</Text>
            </TouchableOpacity>

            {/* Botão 2 */}
            <TouchableOpacity
              style={styles.button}
              onPress={selectCoxinhasDoces}
            >
              <Image source={Doces2} style={styles.image} />
              <Text style={styles.text}>Coxinhas Doces</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {/* Botão 3 */}
            <TouchableOpacity style={styles.button} onPress={selectCopoes}>
              <Image source={Doces3} style={styles.image} />
              <Text style={styles.text}>Copões</Text>
            </TouchableOpacity>

            {/* Botão 4 */}
            <TouchableOpacity style={styles.button} onPress={selectTortinhas}>
              <Image source={Doces4} style={styles.image} />
              <Text style={styles.text}>Tortinhas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {/* Botão 5 */}
            <TouchableOpacity style={styles.button} onPress={selectSalgados}>
              <Image source={Doces5} style={styles.image} />
              <Text style={styles.text}>Salgados</Text>
            </TouchableOpacity>

            {/* Botão 6 */}
            <TouchableOpacity style={styles.button} onPress={selectBebidas}>
              <Image source={Doces6} style={styles.image} />
              <Text style={styles.text}>Bebidas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <MenuInferior />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2e8e3",
    margin: 10,
    padding: 30,
    borderRadius: 20,
  },
  image: {
    width: 70, // Largura da imagem
    height: 70, // Altura da imagem
  },
  text: {
    marginTop: 5,
    color: "#c05c63",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ChooseSweet;

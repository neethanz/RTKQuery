import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useGetAllPokemonsQuery} from './src/rtk/services/pokeman_query';

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function App() {

  const {data, isLoading} = useGetAllPokemonsQuery();

  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.results}
        renderItem={({item}) => <Item title={item.name} />}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:4
  },
  title: {
    fontSize: 32,
  },
});

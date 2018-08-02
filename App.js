import React from 'react';
import Game from './src/components/Game'
import {View, Text,  StyleSheet} from 'react-native'

class App extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Game randNumCount={6} initalSeconds={10}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection:'row',

    paddingTop: 28
  }
});
export default App;

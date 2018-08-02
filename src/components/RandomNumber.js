
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
// TouchableOpacity
// TouchableHighlight
class RandomNumber extends React.Component{
  static propTypes={
    id:PropTypes.number.isRequired,
    num:PropTypes.number.isRequired,
    onPress:PropTypes.func.isRequired
  }
  handlePress=()=>{
    if(!this.props.isDisabled){
      this.props.onPress(this.props.id)
    }
  }
  render() {
    let {num, isDisabled} =this.props
    return (
      <TouchableOpacity  style={styles.button} onPress={this.handlePress}>
        <Text style={[styles.num, isDisabled && styles.disabled]}>{num}</Text>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  num:{
    fontSize: 30,
    textAlign: 'center',
  },
  disabled:{
    opacity:0.3
  },
  button: {
    width:100,
    height:40,
    margin: 40,
    backgroundColor: 'grey',
  },
});
export default RandomNumber;

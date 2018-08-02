import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import RandomNumber from './RandomNumber'

class Game extends React.Component{
  static propTypes={
    randNumCount:PropTypes.number.isRequired,
    initalSeconds:PropTypes.number.isRequired,
  };
  state={
    selectedIds:[],
    remainingSeconds:this.props.initalSeconds,
  };
  isNumSelected=(i)=>{
    return this.state.selectedIds.indexOf(i)>=0
  };
  componentDidMount(){
    this.intervalId=setInterval(()=>{
      this.setState((prevState)=>{
        return {remainingSeconds:prevState.remainingSeconds-1}
      },()=>{
        if(this.state.remainingSeconds===0){
          clearInterval(this.intervalId)
        }
      })
    },1000)
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  componentWillUpdate(nextProps, nextState){
    if(nextState.selectedIds!==this.state.selectedIds || nextState.remainingSeconds===0){
      this.gameStatus=this.calcGameStatus(nextState)
    }
  }
  calcGameStatus(nextState){
    const sumSelected=nextState.selectedIds.reduce((acc, curr)=>{return acc+this.randNumArray[curr]},0)
    if(nextState.remainingSeconds===0){
      return "LOST"
    }
    if( sumSelected ===this.target ){
      return "WIN"
    }else if(sumSelected>this.target){
      return "LOST"
    }else{
      return "PLAYING"
    }
  };

  gameStatus="PLAYING"
  selectNum=(i)=>{
    this.setState((prevState)=>({selectedIds:[...prevState.selectedIds, i]}))
  };
  randNumArray=Array
    .from({length:this.props.randNumCount})
    .map(()=> 1+Math.floor(10*Math.random()));
  target = this.randNumArray
    .slice(0, this.props.randNumCount-2)
    .reduce((acc, curr)=> acc+curr,0);

  render() {
    const gameStatus= this.gameStatus;
    return (
      <View>
        <Text style={[styles.target,styles[`${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randNumList}>
          {this.randNumArray.map((num,i)=>
            <RandomNumber
              key={i}
              num={num}
              id={i}
              isDisabled={this.isNumSelected(i) || gameStatus!=='PLAYING'}
              onPress={this.selectNum}
            />
          )}
        </View>
        <Text style={styles.time}>Time Remaining: {this.state.remainingSeconds}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  target:{
    fontSize: 40,
    marginHorizontal: 50,
    textAlign: 'center',
  },
  randNumList:{
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  WIN:{
    backgroundColor:'green'
  },
  LOST:{
    backgroundColor:'red'
  },
  PLAYING:{
    backgroundColor: 'grey',
  },
  time:{
    fontSize: 10,
    textAlign: 'center'
  }
});
export default Game;

import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, ListView, Text, Animated, Dimensions } from 'react-native';

const Screen = Dimensions.get('window');
const data = [{key: 'a', text: 'Card 1'}, {key: 'b', text: 'Card 2'}, {key: 'c', text: 'Card 3'}, {key: 'd', text: 'Card 4'}, {key: 'e', text: 'Card 5'}, {key: 'f', text: 'Card 6'}, {key: 'g', text: 'Card 7'}, {key: 'h', text: 'Card 8'}];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class AnimatedScrollView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.backgroundImage, {
            opacity: this.state.scrollY.interpolate({
              inputRange: [0, 250],
              outputRange: [1, 0]
            }),
            transform: [
              {
                scale: this.state.scrollY.interpolate({
                  inputRange: [-200, 0, 1],
                  outputRange: [1.4, 1, 1]
                })
              }
            ]
          }]}
          source={require('../img/bg.jpg')}
        />
        <ListView
          dataSource={ds.cloneWithRows(data)}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          renderScrollComponent={this.renderScroll.bind(this)}
        />
      </View>
    );
  }
  renderRow(row) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{row.text}</Text>
      </View>
    );
  }
  renderHeader() {
    return <View style={styles.header} />;
  }
  renderScroll(props) {
    return (
      <Animated.ScrollView
        {...props}
        scrollEventThrottle={16}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { y: this.state.scrollY } }
          }], {
            useNativeDriver: true
          })
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  backgroundImage: {
    width: Screen.width,
    height: Screen.width / 750 * 800,
    position: 'absolute'
  },
  header: {
    height: 300
  },
  card: {
    height: 200,
    padding: 30,
    marginBottom: 25,
    marginHorizontal: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#606060',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  cardTitle: {
    color: 'black',
    fontSize: 30
  }
});

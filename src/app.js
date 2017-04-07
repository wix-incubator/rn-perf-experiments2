import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Switch
} from 'react-native';

import JavaScriptSetState from './JavaScriptSetState';
import AnimatedScrollView from './AnimatedScrollView';

const data = [{key: 'a', text: 'Card 1'}, {key: 'b', text: 'Card 2'}, {key: 'c', text: 'Card 3'}, {key: 'd', text: 'Card 4'}, {key: 'e', text: 'Card 5'}, {key: 'f', text: 'Card 6'}, {key: 'g', text: 'Card 7'}, {key: 'h', text: 'Card 8'}];

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: undefined,
      simulateBusyApp: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.onMenuPress.bind(this)}>
            <Image style={styles.menuIcon} source={require('../img/icon-menu.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>React Native Performance</Text>
        </View>
        <View style={styles.body}>
          {this.renderContent()}
        </View>
      </View>
    );
  }
  renderContent() {
    if (this.state.currentExample) {
      const ExampleComponent = this.state.currentExample;
      return <ExampleComponent data={data} />;
    }
    return (
      <ScrollView style={styles.menuContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Simulate busy app: </Text>
          <Switch
            value={this.state.simulateBusyApp}
            onValueChange={this.onSimulateBusyAppPress.bind(this)}
          />
        </View>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, JavaScriptSetState)}>
          <Text style={styles.button}>JavaScript SetState</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, AnimatedScrollView)}>
          <Text style={styles.button}>Animated ScrollView</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  onExamplePress(currentExample) {
    this.setState({currentExample});
  }
  onMenuPress() {
    this.setState({currentExample: undefined});
  }
  onSimulateBusyAppPress(value) {
    if (value) {
      setInterval(() => {
        for (let i=0; i<5e8; i++) {}
      }, 500);
    }
    this.setState({simulateBusyApp: value});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  header: {
    height: 75,
    paddingTop: 22,
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    zIndex: 1001
  },
  body: {
    flex: 1,
    zIndex: 1000
  },
  menuContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 40,
    backgroundColor: '#223f6b'
  },
  menuIcon: {
    width: 30,
    height: 30
  },
  headerTitle: {
    marginLeft: 30,
    color: 'white',
    fontSize: 20
  },
  button: {
    color: '#e0e0e0',
    fontSize: 20,
    marginBottom: 24
  },
  button2: {
    color: '#F09B95',
    fontSize: 20,
    marginBottom: 24
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 40,
    backgroundColor: '#a0a0a0',
    borderRadius: 6
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: 'black'
  }
});

AppRegistry.registerComponent('Example', () => example);

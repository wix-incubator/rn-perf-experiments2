import React, { PureComponent } from 'react';
import { View, Image, ListView, ScrollView, Text } from 'react-native';
import styles from './styles';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class JavaScriptSetState extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data),
      imageOpacity: 1,
      imageScale: 1
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.backgroundImage, {
            opacity: this.state.imageOpacity,
            transform: [{
              scale: this.state.imageScale
            }]
          }]}
          source={require('../img/bg.jpg')}
        />
        <ListView
          dataSource={this.state.dataSource}
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
      <ScrollView
        {...props}
        scrollEventThrottle={16}
        onScroll={this.onScroll.bind(this)}
      />
    );
  }
  onScroll(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY >= 0) {
      let newOpacity = 1 - (scrollY / 250);
      if (newOpacity < 0) newOpacity = 0;
      this.setState({
        imageOpacity: newOpacity,
        imageScale: 1
      });
    } else {
      let newScale = 1 + 0.4*(-scrollY / 200);
      if (newScale > 1.4) newScale = 1.4;
      this.setState({
        imageOpacity: 1,
        imageScale: newScale
      });
    }
  }
}

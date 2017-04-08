import React, { PureComponent } from 'react';
import ReactNative, { View, Image, ListView, ScrollView, Text, requireNativeComponent } from 'react-native';
import styles from './styles';

const NativeWrapper = requireNativeComponent('RPENativeWrapper');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class NativeScrollListener extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data),
      scrollViewHandle: undefined
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <NativeWrapper scrollViewHandle={this.state.scrollViewHandle}>
          <Image
            style={styles.backgroundImage}
            source={require('../img/bg.jpg')}
          />
        </NativeWrapper>
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
        ref={(element) => {
          const handle = ReactNative.findNodeHandle(element);
          this.setState({scrollViewHandle: handle});
        }}
      />
    );
  }
}

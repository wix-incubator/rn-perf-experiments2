import { StyleSheet, Dimensions } from 'react-native';

const Screen = Dimensions.get('window');

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

export default styles;

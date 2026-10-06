import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type Book = {
  key: string;
  title: string;
  description: string;
  image: any;
};

type ButtonState = {
  pressing: boolean;
  showImage: boolean;
};

type BooksState = {
  data: Book[];
  selected: string | null;
};

class ButtonScreen extends Component<{}, ButtonState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      pressing: false,
      showImage: false,
    };
  }

  _onPressIn = () => {
    this.setState({ pressing: true });
  };

  _onPressOut = () => {
    this.setState({ pressing: false });
  };

  _onPress = () => {
    this.setState({ showImage: true });
  };

  render() {
    if (this.state.showImage) {
      return (
        <View style={styles.container}>
          <Image
            source={require('./assets/images/duck.jpg')}
            style={styles.image}
          />
          <Text>Кнопка заменена на картинку</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPressIn={this._onPressIn}
          onPressOut={this._onPressOut}
          onPress={this._onPress}
          style={styles.touchable}
        >
          <View style={styles.button}>
            <Text style={styles.welcome}>
              {this.state.pressing ? 'НАЖАТО!' : 'НАЖМИ!'}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class BooksScreen extends Component<{}, BooksState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [
        {
          key: '1',
          title: 'Мастер и Маргарита',
          description: 'Роман Михаила Булгакова о любви, добре и зле.',
          image: require('./assets/images/book1.jpg'),
        },
        {
          key: '2',
          title: 'Преступление и наказание',
          description:
            'Роман Фёдора Достоевского о преступлении и его последствиях.',
          image: require('./assets/images/book2.jpg'),
        },
        {
          key: '3',
          title: 'Дюна',
          description:
            'Фантастический роман Фрэнка Герберта о планете Арракис.',
          image: require('./assets/images/book3.jpg'),
        },
        {
          key: '4',
          title: '1984',
          description: 'Антиутопия Джорджа Оруэлла о тотальном контроле.',
          image: require('./assets/images/book4.jpg'),
        },
      ],
      selected: null,
    };
  }

  _onPress = (key: string) => {
    this.setState({ selected: key });
  };

  _onLongPress = (key: string) => {
    this.setState({
      data: this.state.data.filter(item => item.key !== key),
    });
  };

  _renderItem = ({ item }: { item: Book }) => {
    const selected = this.state.selected === item.key;

    return (
      <TouchableHighlight
        onPress={() => this._onPress(item.key)}
        onLongPress={() => this._onLongPress(item.key)}
        underlayColor="#CCCCCC"
      >
        <View style={[styles.row, selected && styles.selectedRow]}>
          <Image source={item.image} style={styles.bookImage} />

          <View style={styles.bookText}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          extraData={this.state.selected}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Кнопки" component={ButtonScreen} />
        <Tab.Screen name="Книги" component={BooksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },

  touchable: {
    borderRadius: 20,
  },

  button: {
    backgroundColor: '#0088FF',
    borderRadius: 20,
    height: 120,
    width: 200,
    justifyContent: 'center',
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    width: 350,
    minHeight: 120,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },

  selectedRow: {
    backgroundColor: '#CCFFFF',
  },

  bookImage: {
    width: 70,
    height: 95,
    marginRight: 10,
  },

  bookText: {
    flex: 1,
    justifyContent: 'center',
  },

  bookTitle: {
    fontSize: 18,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
  },
});

export default App;

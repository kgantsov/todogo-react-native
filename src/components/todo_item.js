import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import CheckBox from './checkbox';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#df691a',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class TodoItem extends React.PureComponent {
  componentDidMount() {
    this.handlePress = this.handlePress.bind(this);
    this.handleLongPress = this.handleLongPress.bind(this);

    this.handleDeletePress = this.handleDeletePress.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
  }

  handlePress = () => {
    console.log('..........>>>>>', this.props.item.id);
    // this.props.onPressItem(this.props.id);
  };

  handleLongPress = () => {
    console.log('..........----->>>>>', this.props.item.id);
    // this.props.onLongPressItem(this.props.id);
  };

  handleDeletePress = () => {
    console.log('..........=====DEL>>>>>', this.props.item.todo_list_id, this.props.id, this.props);
    this.props.onDeleteItem(this.props.item.todo_list_id, this.props.item.id);
  };

  handleToggleComplete = (value) => {
    console.log('..........=====COMPLETED>>>>>', this.props, value);
    this.props.toggleCompletedTodo(this.props.item, value);
  };

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.handlePress}
        onLongPress={this.handleLongPress}
        style={styles.container}
      >
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <CheckBox
            value={this.props.item.completed}
            onChange={this.handleToggleComplete}
          />
          <Text style={styles.item}>{this.props.item.title}</Text>
        </View>
        <Icon name="trash" size={25} color="#fff" onPress={this.handleDeletePress} />
      </TouchableOpacity>
    );
  }
}

export default TodoItem;

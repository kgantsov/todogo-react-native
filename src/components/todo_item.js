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

const priorityColors = {
  1: '#58a264',
  2: '#70b55b',
  3: '#8eaf52',
  4: '#cca54a',
  5: '#bd8040',
  6: '#c16c41',
  7: '#d06046',
  8: '#d24747',
};

class TodoItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.handleLongPress = this.handleLongPress.bind(this);

    this.handleDeletePress = this.handleDeletePress.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
  }

  handlePress() {
    this.props.onPressItem(this.props.item);
  }

  handleLongPress() {
    console.log('..........----->>>>>', this.props.item.id);
    // this.props.onLongPressItem(this.props.id);
  }

  handleDeletePress() {
    this.props.onDeleteItem(this.props.item.todo_list_id, this.props.item.id);
  }

  handleToggleComplete(value) {
    this.props.toggleCompletedTodo(this.props.item, value);
  }

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
            color={priorityColors[this.props.item.priority]}
          />
          <Text style={styles.item}>{this.props.item.title}</Text>
        </View>
        <Icon name="trash" size={25} color="#fff" onPress={this.handleDeletePress} />
      </TouchableOpacity>
    );
  }
}

TodoItem.propTypes = {
  onPressItem: React.PropTypes.func.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired,
  toggleCompletedTodo: React.PropTypes.func.isRequired,
  Navigate: React.PropTypes.func,
  item: React.PropTypes.shape({
    id: React.PropTypes.string,
    todo_list_id: React.PropTypes.string,
    completed: React.PropTypes.bool,
    priority: React.PropTypes.number,
    title: React.PropTypes.string,
  }).isRequired,
};

export default TodoItem;

import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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

class TodoListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.handleLongPress = this.handleLongPress.bind(this);

    this.handleDeletePress = this.handleDeletePress.bind(this);
  }

  handlePress() {
    this.props.onPressItem(this.props.id);
  }

  handleLongPress() {
    console.log('..........----->>>>>', this.props.id);
    // this.props.onLongPressItem(this.props.id);
  }

  handleDeletePress() {
    this.props.onDeleteItem(this.props.id);
  }

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.handlePress}
        onLongPress={this.handleLongPress}
        style={styles.container}
      >
        <Text style={styles.item}>{this.props.title}</Text>
        <Icon name="trash" size={25} color="#fff" onPress={this.handleDeletePress} />
      </TouchableOpacity>
    );
  }
}

TodoListItem.propTypes = {
  onPressItem: React.PropTypes.func.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  Navigate: React.PropTypes.func.isRequired,
};

export default TodoListItem;

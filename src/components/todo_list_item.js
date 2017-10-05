import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

class TodoListItem extends React.PureComponent {
  componentDidMount() {
    this.handlePress = this.handlePress.bind(this);
    this.handleLongPress = this.handleLongPress.bind(this);
  }

  handlePress = () => {
    console.log('..........>>>>>', this.props.id);
    this.props.onPressItem(this.props.id);
  }

  handleLongPress = () => {
    console.log('..........----->>>>>', this.props.id);
    // this.props.onLongPressItem(this.props.id);
  }

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.handlePress}
        onLongPress={this.handleLongPress}
      >
        <Text style={styles.item}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default TodoListItem;

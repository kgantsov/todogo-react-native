import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet } from 'react-native';

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

class CheckBox extends React.PureComponent {
  componentDidMount() {
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress = () => {
    this.props.onChange(!this.props.value);
  };

  render() {
    const icon = (this.props.value) ? 'check-square-o' : 'square-o';
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.handlePress}
        style={this.props.style}
      >
        <Icon name={icon} size={this.props.size} color="#fff" onPress={this.handlePress} />
      </TouchableOpacity>
    );
  }
}

CheckBox.defaultProps = {
  value: false,
  size: 25,
};

CheckBox.propTypes = {
  value: React.PropTypes.bool,
  size: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

export default CheckBox;

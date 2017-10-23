import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';


class CheckBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.onChange(!this.props.value);
  }

  render() {
    const icon = (this.props.value) ? 'check-square-o' : 'square-o';
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.handlePress}
        style={this.props.style}
      >
        <Icon
          name={icon}
          size={this.props.size}
          color={this.props.color}
          onPress={this.handlePress}
        />
      </TouchableOpacity>
    );
  }
}

CheckBox.defaultProps = {
  value: false,
  size: 25,
  color: '#fff',
};

CheckBox.propTypes = {
  value: React.PropTypes.bool,
  size: React.PropTypes.number,
  color: React.PropTypes.string,
  style: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default CheckBox;

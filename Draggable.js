/**
 *  * Fork: https://github.com/tongyy/react-native-draggable
 * 	* Repo: https://github.com/btk/react-native-draggable-holder
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Platform,
	PanResponder,
	Animated,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';

export default class Draggable extends Component {
	static propTypes = {
		posX: PropTypes.number,
		posY: PropTypes.number,
		reverse: PropTypes.bool,
		activeOpacity: PropTypes.number,
		pressDrag: PropTypes.func,
		pressDragRelease: PropTypes.func,
		longPressDrag: PropTypes.func,
		pressInDrag: PropTypes.func,
		pressOutDrag: PropTypes.func
	};
	componentWillMount() {
		if (this.reverse == false)
			this.state.pan.addListener((c) => this.state._value = c);
	}
	componentWillUnmount() {
		this.state.pan.removeAllListeners();
	}
	constructor(props) {
		super(props);
		const { activeOpacity, pressDrag, pressDragRelease, longPressDrag, pressInDrag, pressOutDrag, posX, posY, reverse } = props;
		this.pressDrag = pressDrag;
		this.pressInDrag = pressInDrag;
		this.pressOutDrag = pressOutDrag;
		this.longPressDrag = longPressDrag;
		this.posX = posX != null ? posX : 100;
		this.posY = posY != null ? posY : 100;
		this.reverse = reverse != null ? reverse : true;
		this.activeOpacity = activeOpacity != null ? activeOpacity : 0.2;
		this.state = {
			pan: new Animated.ValueXY(),
			_value: { x: 0, y: 0 }
		};

		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (e, gestureState) => {
				if (this.reverse == false) {
					this.state.pan.setOffset({ x: this.state._value.x, y: this.state._value.y });
					this.state.pan.setValue({ x: 0, y: 0 });
				}
			},
			onPanResponderMove: Animated.event([null, {
				dx: this.state.pan.x,
				dy: this.state.pan.y
			}]),
			onPanResponderRelease: (e, gestureState) => {
				if (pressDragRelease)
					pressDragRelease(e, gestureState);
				if (this.reverse == false)
					this.state.pan.flattenOffset();
				else {
					Animated.spring(
						this.state.pan,
						{ toValue: { x: 0, y: 0 } }
					).start();
				}
			}
		});
	}
	_positionCss = (x, y) => {
		let Window = Dimensions.get('window');
		const { offsetX, offsetY, z } = this.props;
		return Platform.select({
			zIndex: z != null ? z : 999,
			ios: {
				position: 'absolute',
				zIndex: z != null ? z : 999,
				top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
				left: x != null ? x : (Window.width / 2 - renderSize + offsetX),
			},
			android: {
				position: 'absolute',
				width: Window.width,
				height: Window.height,
				top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
				left: x != null ? x : (Window.width / 2 - renderSize + offsetX)
			},
		});
	}
	render() {
		return (
			<View style={this._positionCss(this.posX, this.posY)}>
				<Animated.View
					{...this.panResponder.panHandlers}
					style={this.state.pan.getLayout()}>
					<TouchableOpacity
						activeOpacity={this.activeOpacity}
						onPress={this.pressDrag}
						onLongPress={this.longPressDrag}
						onPressIn={this.pressInDrag}
						onPressOut={this.pressOutDrag}>
						{this.props.children}
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}

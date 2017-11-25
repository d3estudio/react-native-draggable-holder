/**
 *  * https://github.com/tongyy/react-native-draggable
 *
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	PanResponder,
	Animated,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';

export default class Draggable extends Component {
	static propTypes = {
		offsetX:PropTypes.number,
		offsetY:PropTypes.number,
		reverse:PropTypes.bool,
		pressDrag:PropTypes.func,
		pressDragRelease:PropTypes.func,
		longPressDrag:PropTypes.func,
		pressInDrag:PropTypes.func,
		pressOutDrag:PropTypes.func
	};
	componentWillMount() {
		if(this.reverse == false)
			this.state.pan.addListener((c) => this.state._value = c);
	}
	componentWillUnmount() {
		this.state.pan.removeAllListeners();
	}
	constructor(props) {
		super(props);
		const { pressDrag, pressDragRelease, longPressDrag, pressInDrag, pressOutDrag, offsetX, offsetY, reverse} = props;
		this.pressDrag = pressDrag;
		this.pressInDrag = pressInDrag;
		this.pressOutDrag = pressOutDrag;
		this.longPressDrag = longPressDrag;
		this.offsetX = offsetX!=null ? offsetX : 100;
		this.offsetY = offsetY!=null ? offsetY : 100;
		this.reverse = reverse!=null ? reverse : true;
		this.state = {
			pan:new Animated.ValueXY(),
			_value:{x: 0, y: 0}
		};

		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (e, gestureState) => {
				if(this.reverse == false) {
					this.state.pan.setOffset({x: this.state._value.x, y: this.state._value.y});
					this.state.pan.setValue({x: 0, y: 0});
				}
			},
			onPanResponderMove: Animated.event([null,{
				dx:this.state.pan.x,
				dy:this.state.pan.y
			}]),
			onPanResponderRelease: (e, gestureState) => {
				if(pressDragRelease)
					pressDragRelease(e, gestureState);
				if(this.reverse == false)
					this.state.pan.flattenOffset();
				else {
					Animated.spring(
						this.state.pan,
						{toValue:{x:0,y:0}}
					).start();
				}
			}
		});
	}
	_positionCss = (size,x,y) => {
		let Window = Dimensions.get('window');
		return {
			zIndex:999,
			position: 'absolute',
			top: Window.height/2 - size+y,
			left: Window.width/2 - size+x,
		};
	}

	render() {
		return (
			<View style={this._positionCss(this.renderSize,this.offsetX,this.offsetY)}>
				<Animated.View
					{...this.panResponder.panHandlers}
					style={this.state.pan.getLayout()}>
					<TouchableOpacity
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

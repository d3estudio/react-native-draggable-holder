# react-native-draggable-holder-holder

Draggable item holder for react-native!

This is a form of react-native-draggable-holder that only ads the functionality of supplying children components for the draggable component, allowing you to make any component or component tree draggable, I really don't know why it has been implemented like this way originally, but here it is;

```
npm install react-native-draggable-holder --save
import Draggable from 'react-native-draggable-holder';
```
How to use

```
return (
    <View >
        <Draggable>
          <Text>Drag this text around</Text>
        </Draggable>

        <Draggable>
          <Image .../>
          <Text>Drag this text and image around</Text>
        </Draggable>
    </View>
);
```

For extra and more detailed usage, see: <https://github.com/tongyy/react-native-draggable-holder>

The props I left out is;

`pressDrag, pressDragRelease, longPressDrag, pressInDrag, pressOutDrag, offsetX, offsetY, reverse`

Others won't work.

Additional props;

- **activeOpacity (number):** Sometimes you don't want your draggable to have touchableopacity or want to change the activeOpacity value of it. Change it between 0 and 1. (Default is the default of touchableOpacity which is 0.2)

~~~JS
return(
  <Draggable activeOpacity={0.2}>
    <View style={{width: 100, height: 100, backgroundColor: "red"}}>
      <Text>Drag me</Text>
    </View>
  </Draggable>
);
~~~

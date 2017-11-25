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

// import React, { useRef } from 'react';
// import { View, Text, TouchableOpacity, Animated } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import { onGestureEvent, withDecay } from 'react-native-reanimated';

// export const TestScreen = () => {
//     const translationY = useRef(new Animated.Value(0)).current;
//     const gestureState = useRef(new Animated.Value(State.UNDETERMINED)).current;
//     const translateY = withDecay({ value: translationY, state: gestureState });
  
//     const handleGestureEvent = onGestureEvent({
//       translationY,
//       state: gestureState,
//     });
  
//     return (
//       <View style={{ flex: 1 }}>
//         <TouchableOpacity onPress={() => translateY.setValue(0)}>
//           <Text>Presionar para volver arriba</Text>
//         </TouchableOpacity>
//         <PanGestureHandler
//           onGestureEvent={handleGestureEvent}
//           onHandlerStateChange={handleGestureEvent}
//         >
//           <Animated.View
//             style={{
//               transform: [{ translateY }],
//               backgroundColor: 'lightblue',
//               padding: 20,
//             }}
//           >
//             {/* Contenido que se desplazará hacia abajo */}
//             <Text>ContenidoAnimado</Text>
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     );
//   };
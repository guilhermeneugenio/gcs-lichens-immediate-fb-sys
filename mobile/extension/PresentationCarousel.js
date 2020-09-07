import React, { useEffect, useState } from 'react';

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const PresentationCarousel  = props => {

    const [intervals, setIntervals] = useState(1);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return(

        <ScrollView
            horizontal={true}
            contentContainerStyle={{ width: windowWidth*3,     justifyContent: 'center',
        alignItems: 'center', }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
          >
             <View style={styles.view}>
                 <Text>1</Text>
             </View>
             <View style={styles.view}>
                 <Text>2</Text>
             </View>
             <View style={styles.view}>
                 <Text>3</Text>
             </View>
          </ScrollView>
      
    );

};

const styles = StyleSheet.create({
    view: {
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }
});
  

export default PresentationCarousel;
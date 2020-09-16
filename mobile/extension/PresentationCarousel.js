import React, { useEffect, useState } from 'react';

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const PresentationCarousel  = props => {


    const [interval, setInterval] = useState(0)

    let content = (<View style={styles.view}><Text>0</Text></View>)
  
  
    const end=() => {
      if(interval == 375) content = (<View style={styles.view}><Text>1</Text></View>)
      if(interval == 750) content = (<View style={styles.view}><Text>2</Text></View>)
    }
    return (
      <View style={{flex:1}}>
        <ScrollView
          horizontal={true}
          onScroll={data => {
            console.log(data.nativeEvent.contentOffset.x)
            setInterval(data.nativeEvent.contentOffset.x)
          }}
          onScrollEndDrag={end()}
          contentContainerStyle={{
            width: windowWidth * 3,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled>
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
        {content}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    view: {
      marginBottom:200,
      width: windowWidth,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  

export default PresentationCarousel;
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';

const { height, width } = Dimensions.get("window");

export default function App() {
  const [data, setData] = useState([1, 1, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);

  const handleScrollToIndex = (index) => {
    setCurrentIndex(index);
    ref.current.scrollToIndex({ animated: true, index });
  };

  return (
    <ImageBackground 
      source={ require('./assets/image.png')} 
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      resizeMode="cover"
    >
      {/* Login Button */}
      <TouchableOpacity 
        style={{
          position: 'absolute',
          top: 40, // Adjust this value based on the status bar height
          right: 20,
          padding: 10,
          backgroundColor: 'blue',
          borderRadius: 10
        }}
        onPress={() => alert('Login Button Pressed')}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
      </TouchableOpacity>

      <View style={{ height: height / 2, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          ref={ref}
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Math.round(x / width));
          }}
          renderItem={({ item, index }) => (
            <View style={{
              width: width,
              height: height / 2,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 20
            }}>
              <TouchableOpacity disabled={true}
                style={{ 
                  width: "90%", 
                  height: "90%", 
                  backgroundColor: "orange", 
                  borderRadius: 20, 
                  justifyContent: "center", // Center the content vertically
                  alignItems: "center"   // Center the content horizontally
                }}>
                {/* Main Text */}
                <Text style={{ color: "white", fontSize: 35, textAlign: "center", marginBottom: 10 }}>
                  We Serve Incomparable Delicacies.
                </Text>
                {/* Smaller Text */}
                <Text style={{ color: "white", fontSize: 17, textAlign: "center" }}>
                  All the best Restaurants with their top menu waiting for you, they can't wait for your order !!
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={{ flexDirection: "row", width: width, justifyContent: "center", alignItems: "center" }}>
        {data.map((item, index) => (
          <View key={index} style={{
            width: currentIndex === index ? 40 : 8,
            height: currentIndex === index ? 10 : 8,
            borderRadius: currentIndex === index ? 5 : 4,
            backgroundColor: currentIndex === index ? "gray" : "gray",
            marginLeft: 5,
          }} />
        ))}
      </View>

      <View style={{
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20
      }}>
        {currentIndex > 0 && (
          <TouchableOpacity style={{
            width: 100,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green"
          }}
            onPress={() => handleScrollToIndex(currentIndex - 1)}>
            <Text>Previous</Text>
          </TouchableOpacity>
        )}

        {currentIndex < data.length - 1 && (
          <TouchableOpacity style={{
            width: 100,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green"
          }}
            onPress={() => handleScrollToIndex(currentIndex + 1)}>
            <Text>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

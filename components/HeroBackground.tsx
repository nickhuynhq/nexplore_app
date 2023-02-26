import React, { useState, useEffect, useRef } from "react";
import { ImageBackground } from "react-native";

import * as Animatable from "react-native-animatable";
import { Banff, Beach, Egypt, Greece, Tokyo } from "../assets/backgroundImages";

const images = [Greece, Tokyo, Banff, Egypt, Beach];

const HeroBackground = () => {
  const [index, setIndex] = useState(0);
  const imageRef = useRef<Animatable.View & ImageBackground>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageRef.current) {
        if (imageRef.current.fadeOut)
          // Fade out the current image
          imageRef.current.fadeOut(1000).then(() => {
            // Set the next image index after the fade out is complete
            setIndex((prevIndex) => (prevIndex + 1) % images.length);

            // Fade in the next image
            if (imageRef?.current?.fadeIn) imageRef.current?.fadeIn(1000);
          });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Animatable.View ref={imageRef} animation="fadeIn">
      <ImageBackground
        source={images[index]}
        resizeMode="cover"
        className="h-full w-full"
      />
    </Animatable.View>
  );
};

export default HeroBackground;

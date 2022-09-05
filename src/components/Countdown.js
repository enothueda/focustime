import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';


const minutesToMilliseconds = (mins) => mins * 1000 * 60

export const Countdown = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd
 }) => {
  
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);
  
  const countDown = () => { setMillis((time) => {
    if(time === 0) {
      clearInterval(interval.current);
      return time
    }

    const timeRemaining = time - 1000;
    return timeRemaining;
    });
  };

  useEffect(() => {
    setMillis(minutesToMilliseconds(minutes))
  }, [minutes])
  
  useEffect(() => { 
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current)
  }, [isPaused]);

  useEffect(()=> {
    onProgress(millis / minutesToMilliseconds(minutes));
    if(millis === 0) {
      onEnd();
    }
  }, [millis])
  
  
  const formatTime = (time) => time < 10 ? `0${time}` : time;
  
  const minute = Math.floor(millis / 1000 / 60) % 60 ;
  const seconds = Math.floor(millis / 1000) % 60;
  
  return(
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,    
    fontWeight: 'bold',
    color: 'white',
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 296, 0.3)'
  }
})

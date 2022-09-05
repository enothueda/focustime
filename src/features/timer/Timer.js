import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing'

import { fontSizes, spacing } from '../../utils/sizes';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const interval = React.useRef(null)
  const [minutes, setMinutes] = useState(0.1)
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => setProgress(progress);

  const vibrate = () => {
    if(Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(5000);
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false)
  };

  return(
    <View style={styles.container}>

      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={onProgress}
          onEnd={onEnd}  
        />
      </View>

      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{ focusSubject }</Text>
      </View>

      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar 
          progress={progress}
          color='#5e84e2'
          style={{height:10}}
        />
     </View>

     <View style={styles.buttonWrapper}>
      <Timing onTimeChange={changeTime} />
     </View>

     <View style={styles.buttonWrapper}>
     {
       isStarted 
       ? <RoundedButton title='pause' onPress={()=> setIsStarted(false)} />
       : <RoundedButton title='start' onPress={()=> setIsStarted(true)} />
     }
     </View>
     <View style={styles.clearSubject}>     
      <RoundedButton title='-' size={50} onPress={()=> clearSubject() } />     
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: fontSizes.lg
  },
  task: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
     fontSize: fontSizes.lg
  },
  countdown: {
    paddingTop: spacing.sm,
    flex: 0.5,
    alignItems: 'center'
  },
  buttonWrapper : {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
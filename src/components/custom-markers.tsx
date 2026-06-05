import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Flame, Moon } from 'lucide-react-native';

export function GacorMarker({ title }: { title: string }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View className="items-center justify-center">
      <View className="relative items-center justify-center w-16 h-16">
        {/* Pulsing Outer Ring */}
        <Animated.View 
          style={{ 
            transform: [{ scale: pulseAnim }],
            opacity: pulseAnim.interpolate({
              inputRange: [1.0, 1.25],
              outputRange: [0.8, 0.2]
            })
          }}
          className="absolute w-12 h-12 bg-error/30 rounded-full"
        />
        
        {/* Main Inner Circle */}
        <View className="w-8 h-8 bg-error rounded-full border-2 border-white items-center justify-center shadow-md">
          <Flame size={16} color="#ffffff" fill="#ffffff" />
        </View>
      </View>
      
      {/* Label Pill */}
      <View className="mt-0.5 bg-surface-container-lowest px-2 py-0.5 rounded-full border border-outline/10 shadow-sm flex-row items-center">
        <Text className="text-[10px] font-bold text-on-surface" numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export function QuietMarker({ title }: { title: string }) {
  return (
    <View className="items-center justify-center">
      <View className="w-12 h-12 items-center justify-center">
        {/* Main Circle */}
        <View className="w-8 h-8 bg-surface-container-highest rounded-full border-2 border-white items-center justify-center shadow-sm">
          <Moon size={16} color="#414844" fill="#414844" />
        </View>
      </View>
      
      {/* Label Pill */}
      <View className="mt-0.5 bg-surface-container-lowest/80 px-2 py-0.5 rounded-full border border-outline/10 shadow-sm">
        <Text className="text-[10px] font-bold text-on-surface-variant">
          {title}
        </Text>
      </View>
    </View>
  );
}

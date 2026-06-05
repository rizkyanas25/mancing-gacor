import React, { useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, Tabs, router } from 'expo-router';
import { useColorScheme, View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Flame, Compass } from 'lucide-react-native';
import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import CustomTabBar from '@/components/custom-tab-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showPostMenu, setShowPostMenu] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        
        <Tabs 
          tabBar={(props) => (
            <CustomTabBar 
              {...props} 
              onOpenPostMenu={() => setShowPostMenu(true)} 
            />
          )}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen name="index" options={{ title: 'Peta' }} />
          <Tabs.Screen name="post" options={{ title: 'Tangkapan Baru' }} />
          <Tabs.Screen name="community" options={{ title: 'Feed' }} />
          <Tabs.Screen name="add-spot" options={{ title: 'Spot Baru' }} />
          <Tabs.Screen name="profile" options={{ title: 'Profil Pemancing' }} />
        </Tabs>

        {/* Post Options Menu Overlay */}
        {showPostMenu && (
          <View className="absolute inset-0 bg-black/60 z-[100] flex-col justify-end">
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => setShowPostMenu(false)} 
              className="absolute inset-0" 
            />
            
            <View className="bg-surface-container-lowest rounded-t-[32px] p-container-margin pb-10 flex-col gap-gutter">
              <View className="items-center justify-center -mt-2 mb-2">
                <View className="w-10 h-1 bg-outline-variant rounded-full" />
              </View>
              
              <Text className="text-[18px] font-bold text-primary text-center">
                Pilih Menu Tambah
              </Text>
              
              <View className="flex-row gap-4 justify-between mt-2">
                <TouchableOpacity
                  onPress={() => {
                    setShowPostMenu(false);
                    router.push('/post');
                  }}
                  activeOpacity={0.85}
                  className="flex-1 bg-surface-container-low p-5 rounded-2xl border border-outline/5 items-center justify-center gap-3 active:bg-surface-container-high"
                >
                  <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                    <Flame size={24} color="#012d1d" fill="#012d1d" />
                  </View>
                  <View className="items-center">
                    <Text className="text-[14px] font-bold text-on-surface text-center">
                      Hasil Mancing
                    </Text>
                    <Text className="text-[10px] text-outline text-center mt-0.5 leading-tight">
                      Catat ikan tangkapan barumu di sini
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => {
                    setShowPostMenu(false);
                    router.push('/add-spot');
                  }}
                  activeOpacity={0.85}
                  className="flex-1 bg-surface-container-low p-5 rounded-2xl border border-outline/5 items-center justify-center gap-3 active:bg-surface-container-high"
                >
                  <View className="w-12 h-12 rounded-full bg-secondary/15 items-center justify-center">
                    <Compass size={24} color="#75593a" />
                  </View>
                  <View className="items-center">
                    <Text className="text-[14px] font-bold text-on-surface text-center">
                      Spot Baru
                    </Text>
                    <Text className="text-[10px] text-outline text-center mt-0.5 leading-tight">
                      Bagikan spot memancing baru di peta
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                onPress={() => setShowPostMenu(false)}
                activeOpacity={0.8}
                className="w-full bg-surface-container-high h-touch-target-min rounded-full items-center justify-center mt-2"
              >
                <Text className="text-on-surface-variant text-[14px] font-bold">Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Map, Newspaper, Plus } from 'lucide-react-native';

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  onOpenPostMenu?: () => void;
}

export default function CustomTabBar({ state, descriptors, navigation, onOpenPostMenu }: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Dapatkan rute aktif saat ini
  const activeRouteName = state.routes[state.index].name;

  // Hanya tampilkan tab bar pada halaman Peta (index) dan Feed (community)
  const showTabBar = activeRouteName === 'index' || activeRouteName === 'community';
  if (!showTabBar) {
    return null;
  }

  // Filter rute: Tampilkan hanya Peta, Tambah (post), dan Feed
  const visibleRoutes = state.routes.filter(
    (route: any) => route.name !== 'profile' && route.name !== 'add-spot'
  );

  return (
    <View 
      style={{ 
        paddingBottom: insets.bottom,
        height: 60 + insets.bottom 
      }}
      className="flex-row items-center bg-surface-container-lowest border-t border-outline/15 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] px-12"
    >
      {visibleRoutes.map((route: any) => {
        const routeIndex = state.routes.findIndex((r: any) => r.key === route.key);
        const isFocused = state.index === routeIndex;

        const onPress = () => {
          if (route.name === 'post') {
            onOpenPostMenu?.();
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Rework untuk tombol TAMBAH (Center Raised Button)
        if (route.name === 'post') {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 items-center justify-center -mt-6 z-50 h-full"
              activeOpacity={0.85}
            >
              <View className="w-14 h-14 bg-primary rounded-full items-center justify-center border-4 border-surface-container-lowest shadow-lg shadow-primary/30">
                <Plus size={32} color="#ffffff" strokeWidth={3} />
              </View>
            </TouchableOpacity>
          );
        }

        const renderIcon = () => {
          const size = 22;
          const color = isFocused ? '#012d1d' : '#717973'; // primary vs outline

          switch (route.name) {
            case 'index':
              return <Map size={size} color={color} strokeWidth={isFocused ? 2.5 : 2} />;
            case 'community':
              return <Newspaper size={size} color={color} strokeWidth={isFocused ? 2.5 : 2} />;
            default:
              return null;
          }
        };

        const getLabelText = () => {
          switch (route.name) {
            case 'index':
              return 'Peta';
            case 'community':
              return 'Feed';
            default:
              return route.name;
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center h-full"
            activeOpacity={0.8}
          >
            <View className="items-center justify-center pt-2">
              {renderIcon()}
              <Text 
                className={`text-[11px] mt-1 ${
                  isFocused ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {getLabelText()}
              </Text>
              
              {/* Dot indicator from Stitch design system */}
              <View 
                className={`w-1 h-1 rounded-full mt-1 ${
                  isFocused ? 'bg-primary' : 'bg-transparent'
                }`} 
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

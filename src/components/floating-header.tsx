import React from 'react';
import { View, TextInput, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Flame, Trees, Users, Waves, SlidersHorizontal } from 'lucide-react-native';
import { FilterState } from './filter-bottom-sheet';
import { router } from 'expo-router';

interface FloatingHeaderProps {
  filters: FilterState;
  onToggleFilter: (key: keyof FilterState | 'waterType_saltwater') => void;
  onOpenFilterSheet: () => void;
}

export default function FloatingHeader({ filters, onToggleFilter, onOpenFilterSheet }: FloatingHeaderProps) {
  const insets = useSafeAreaInsets();

  const filterItems = [
    { id: 'gacorOnly', label: 'Spot Gacor', icon: Flame, isActive: filters.gacorOnly },
    { id: 'freeOnly', label: 'Spot Gratis', icon: Trees, isActive: filters.freeOnly },
    { id: 'familyOnly', label: 'Ramah Keluarga', icon: Users, isActive: filters.familyOnly },
    { id: 'waterType_saltwater', label: 'Air Laut', icon: Waves, isActive: filters.waterType === 'saltwater' },
  ];

  return (
    <View 
      style={{ paddingTop: insets.top + 8 }}
      className="absolute top-0 left-0 right-0 z-50"
    >
      {/* Floating Search Bar */}
      <View className="mx-container-margin bg-surface-container-lowest/95 flex-row items-center h-touch-target-min px-gutter rounded-full shadow-md border border-outline/10">
        <Search size={20} color="#717973" />
        <TextInput 
          className="flex-1 px-2 text-[14px] text-on-surface placeholder:text-outline h-full"
          placeholder="Cari spot, ikan, atau teman..."
          placeholderTextColor="#717973"
        />
        <TouchableOpacity 
          onPress={() => router.push('/profile')}
          activeOpacity={0.8}
          className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2"
        >
          <Image 
            source={{ 
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuIGzkizBUO2ZNyzfl_HUxoH_YSp9L6wGXpbArnclD_0IPqHj8oMdsHVBwuskkzdQE9eo_4oP5LyrVsBo38ZvQM-pX2k9zKC5De_hdzrEOIiJ36SxBpCkZXcmpN-BP-sK_6xFtwooRiWd7sUl3joydVB4peA9ejLRsqqAdcQ9ObG79I_euoC8FwI58d0TqMe_h1DO1JzYAJDFnw3FvnNNLfUUpMVAInhKMnGuus9n5FvF7SZW6r-LLN5-Oef3mSbu72PljI82rPKDQ' 
            }} 
            className="w-full h-full object-cover"
          />
        </TouchableOpacity>
      </View>

      {/* Filter Row Container */}
      <View className="relative flex-row items-center mt-4 h-10">
        {/* Filter Pills Scrollable (Full Width) */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="w-full h-full"
          contentContainerStyle={{ 
            paddingLeft: 68, // 20 (container-margin) + 40 (button) + 8 (spacing)
            paddingRight: 20, 
            gap: 8, 
            alignItems: 'center'
          }}
        >
          {filterItems.map((item) => {
            const IconComponent = item.icon;
            
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onToggleFilter(item.id as any)}
                activeOpacity={0.8}
                className={`flex-row items-center gap-2 px-4 h-[32px] rounded-full border shadow-sm ${
                  item.isActive 
                    ? 'bg-primary-container border-primary/20' 
                    : 'bg-secondary-fixed border-outline/5'
                }`}
              >
                <IconComponent 
                  size={14} 
                  color={item.isActive ? '#86af99' : '#2b1701'} 
                  fill={item.isActive && item.id === 'gacorOnly' ? '#86af99' : 'none'}
                />
                <Text 
                  className={`text-[12px] font-bold ${
                    item.isActive ? 'text-on-primary-container' : 'text-on-secondary-fixed'
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tombol Filter Lanjutan (Melayang di atas ScrollView sebelah kiri) */}
        <TouchableOpacity
          onPress={onOpenFilterSheet}
          activeOpacity={0.8}
          className="absolute left-container-margin w-10 h-10 bg-surface-container-lowest rounded-full shadow-md border border-outline/10 items-center justify-center z-10"
        >
          <SlidersHorizontal size={18} color="#012d1d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

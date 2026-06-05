import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View 
      style={{ paddingTop: insets.top }}
      className="bg-surface-container-lowest border-b border-outline/10"
    >
      <View className="h-14 px-container-margin flex-row items-center justify-between">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="w-10 h-10 -ml-2 items-center justify-center rounded-full active:bg-surface-container-low"
        >
          <ArrowLeft size={22} color="#012d1d" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-[16px] font-bold text-primary text-center flex-1 pr-8">
          {title}
        </Text>

        {/* Empty placeholder to balance flexbox */}
        <View className="w-2" />
      </View>
    </View>
  );
}

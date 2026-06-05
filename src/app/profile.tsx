import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, ShieldAlert, Waves, Compass, Flame, MapPin } from 'lucide-react-native';
import PageHeader from '@/components/page-header';

interface CatchLog {
  id: string;
  fishType: string;
  weight: string;
  spotName: string;
  date: string;
  photoUri: string;
}

const MY_CATCHES_HISTORY: CatchLog[] = [
  {
    id: '1',
    fishType: 'Ikan Gurame Babon',
    weight: '5.2 kg',
    spotName: 'Pinka Riverside (Kali Ngrowo)',
    date: 'Hari ini, 10:15 WIB',
    photoUri: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    fishType: 'Ikan Nila Merah',
    weight: '2.4 kg',
    spotName: 'Bendungan Wonorejo',
    date: '3 hari yang lalu',
    photoUri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    fishType: 'Ikan Patin',
    weight: '3.8 kg',
    spotName: 'Dam Karangrejo',
    date: '1 minggu yang lalu',
    photoUri: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=400&q=80',
  }
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <PageHeader title="Profil Pemancing" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1"
      >
        {/* Section 1: User Card */}
        <View className="bg-surface-container-lowest p-container-margin border-b border-outline/10 flex-col items-center">
          <View className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/15 relative">
            <Image 
              source={{ 
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuIGzkizBUO2ZNyzfl_HUxoH_YSp9L6wGXpbArnclD_0IPqHj8oMdsHVBwuskkzdQE9eo_4oP5LyrVsBo38ZvQM-pX2k9zKC5De_hdzrEOIiJ36SxBpCkZXcmpN-BP-sK_6xFtwooRiWd7sUl3joydVB4peA9ejLRsqqAdcQ9ObG79I_euoC8FwI58d0TqMe_h1DO1JzYAJDFnw3FvnNNLfUUpMVAInhKMnGuus9n5FvF7SZW6r-LLN5-Oef3mSbu72PljI82rPKDQ' 
              }} 
              className="w-full h-full object-cover"
            />
          </View>

          <Text className="text-[20px] font-bold text-primary mt-3">Rizky Anas Bukhori</Text>
          
          <View className="flex-row items-center gap-1.5 mt-1 bg-secondary/10 px-3 py-1 rounded-full">
            <Award size={12} color="#75593a" />
            <Text className="text-[11px] font-black text-on-secondary-fixed">Master Gurame (Lvl 12)</Text>
          </View>

          {/* Level Progress Bar */}
          <View className="w-full mt-5 flex-col gap-1.5">
            <View className="flex-row justify-between items-center px-1">
              <Text className="text-[11px] font-bold text-outline uppercase tracking-wider">Level Pemancing</Text>
              <Text className="text-[11px] font-black text-primary">85% Menuju Lvl 13</Text>
            </View>
            <View className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
              <View style={{ width: '85%' }} className="h-full bg-primary rounded-full" />
            </View>
          </View>
        </View>

        {/* Section 2: Stats Grid */}
        <View className="p-container-margin flex-col gap-2">
          <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Statistik Memancing</Text>
          
          <View className="flex-row gap-3 justify-between">
            {/* Stat 1 */}
            <View className="flex-1 bg-surface-container-low p-4 rounded-2xl border border-outline/5 items-center justify-center gap-1.5 shadow-sm">
              <Text className="text-[20px] font-black text-primary">28</Text>
              <Text className="text-[10px] text-outline uppercase tracking-wide text-center">Trip Mancing</Text>
            </View>

            {/* Stat 2 */}
            <View className="flex-1 bg-surface-container-low p-4 rounded-2xl border border-outline/5 items-center justify-center gap-1.5 shadow-sm">
              <Text className="text-[20px] font-black text-primary">104</Text>
              <Text className="text-[10px] text-outline uppercase tracking-wide text-center">Tangkapan</Text>
            </View>

            {/* Stat 3 */}
            <View className="flex-1 bg-surface-container-low p-4 rounded-2xl border border-outline/5 items-center justify-center gap-1.5 shadow-sm">
              <Text className="text-[20px] font-black text-primary">5.2 kg</Text>
              <Text className="text-[10px] text-outline uppercase tracking-wide text-center">Tangkapan Terberat</Text>
            </View>
          </View>
        </View>

        {/* Section 3: Favorit Details */}
        <View className="px-container-margin mb-6 flex-col gap-2.5">
          <View className="bg-surface-container-low p-gutter rounded-2xl border border-outline/5 flex-col gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                  <Compass size={16} color="#012d1d" />
                </View>
                <View>
                  <Text className="text-[11px] text-outline uppercase tracking-wider font-bold">Spot Terfavorit</Text>
                  <Text className="text-[14px] font-bold text-on-surface">Pinka Riverside (Kali Ngrowo)</Text>
                </View>
              </View>
            </View>

            <View className="h-[1px] bg-outline/10 w-full" />

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-secondary/15 rounded-full items-center justify-center">
                  <Waves size={16} color="#75593a" />
                </View>
                <View>
                  <Text className="text-[11px] text-outline uppercase tracking-wider font-bold">Umpan Andalan</Text>
                  <Text className="text-[14px] font-bold text-on-surface">Cacing Tanah & Lumut Esen</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Section 4: Logbook Riwayat Tangkapan */}
        <View className="px-container-margin flex-col gap-3">
          <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Logbook Tangkapan Saya</Text>
          
          <View className="flex-col gap-3">
            {MY_CATCHES_HISTORY.map((log) => (
              <View 
                key={log.id}
                className="flex-row bg-surface-container-lowest border border-outline/10 rounded-xl overflow-hidden shadow-sm"
              >
                {/* Fish Photo Thumbnail */}
                <View className="w-24 h-24 bg-surface-container-low">
                  <Image source={{ uri: log.photoUri }} className="w-full h-full object-cover" />
                </View>
                
                {/* Details */}
                <View className="flex-1 p-3 flex-col justify-between">
                  <View>
                    <View className="flex-row justify-between items-start">
                      <Text className="text-[14px] font-bold text-on-surface leading-tight">
                        {log.fishType} ({log.weight})
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1 mt-1">
                      <MapPin size={10} color="#717973" />
                      <Text className="text-[10px] text-outline font-bold truncate">
                        {log.spotName}
                      </Text>
                    </View>
                  </View>
                  
                  <Text className="text-[9px] text-outline text-right font-medium">
                    {log.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

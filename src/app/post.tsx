import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera, ShieldCheck, Flame, Scale } from 'lucide-react-native';
import PageHeader from '@/components/page-header';

export default function PostScreen() {
  const [selectedSpotId, setSelectedSpotId] = useState('1');
  const [fishType, setFishType] = useState('');
  const [fishWeight, setFishWeight] = useState('');
  const [selectedBait, setSelectedBait] = useState('Cacing');
  const [notes, setNotes] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const spotsList = [
    { id: '1', name: 'Pinka Riverside (Kali Ngrowo)' },
    { id: '2', name: 'Dam Kleben Tiudan' },
    { id: '3', name: 'Bendungan Wonorejo' },
    { id: '4', name: 'Dam Karangrejo' },
    { id: '5', name: 'Pantai Popoh' }
  ];

  const baitOptions = ['Cacing', 'Lumut', 'Pelet', 'Udang Rebon', 'Lure Minnow', 'Ulat Belatung'];

  const handleChoosePhoto = () => {
    // Simulasi unggah foto tangkapan dengan gambar placeholder tangkapan ikan gurame/nila riil
    setPhotoUri('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80');
    Alert.alert('Foto Terpilih!', 'Foto hasil tangkapan berhasil diunggah.');
  };

  const handleSubmit = () => {
    if (!fishType || !fishWeight) {
      Alert.alert('Formulir Belum Lengkap', 'Jenis ikan dan berat hasil tangkapan wajib diisi.');
      return;
    }

    const spotName = spotsList.find(s => s.id === selectedSpotId)?.name || 'Spot Tulungagung';

    Alert.alert(
      'Catatan Tersimpan!',
      `Tangkapan "${fishType} (${fishWeight} kg)" di ${spotName} berhasil dicatat di logbook Pemancing Anda.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <PageHeader title="Catat Tangkapan Baru" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1 px-container-margin py-base"
      >
        <View className="flex-col gap-5">
          {/* Section 1: Unggah Foto */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Foto Tangkapan</Text>
            
            <TouchableOpacity
              onPress={handleChoosePhoto}
              activeOpacity={0.7}
              className="w-full h-48 rounded-2xl border-2 border-dashed border-outline/35 bg-surface-container-low overflow-hidden items-center justify-center gap-2"
            >
              {photoUri ? (
                <View className="w-full h-full relative">
                  <Image source={{ uri: photoUri }} className="w-full h-full object-cover" />
                  <View className="absolute bottom-3 right-3 bg-primary px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
                    <Camera size={12} color="#ffffff" />
                    <Text className="text-[10px] text-white font-bold">Ganti Foto</Text>
                  </View>
                </View>
              ) : (
                <View className="items-center justify-center gap-2">
                  <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                    <Camera size={24} color="#012d1d" />
                  </View>
                  <Text className="text-[13px] font-bold text-on-surface">Unggah Foto Tangkapan</Text>
                  <Text className="text-[10px] text-outline">Format JPG, PNG (Maks 5MB)</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Section 2: Spot Pancing */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Spot Pancing</Text>
            <View className="flex-row flex-wrap gap-2">
              {spotsList.map((spot) => {
                const isSelected = selectedSpotId === spot.id;
                return (
                  <TouchableOpacity
                    key={spot.id}
                    onPress={() => setSelectedSpotId(spot.id)}
                    activeOpacity={0.8}
                    className={`px-4 py-2.5 rounded-xl border ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-surface-container-lowest border-outline/15'
                    }`}
                  >
                    <Text className={`text-[12px] font-bold ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                      {spot.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Section 3: Jenis & Berat Ikan */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Detail Hasil Tangkapan</Text>
            <View className="flex-row gap-3">
              {/* Jenis Ikan */}
              <View className="flex-[2] flex-col gap-1">
                <Text className="text-[12px] font-bold text-on-surface">Jenis Ikan *</Text>
                <View className="relative justify-center">
                  <TextInput
                    value={fishType}
                    onChangeText={setFishType}
                    placeholder="Contoh: Gurame, Nila"
                    placeholderTextColor="#717973"
                    className="bg-surface-container-lowest border border-outline/20 pl-9 pr-4 py-3 rounded-lg text-[14px] text-on-surface"
                  />
                  <View className="absolute left-3">
                    <Flame size={14} color="#717973" />
                  </View>
                </View>
              </View>

              {/* Berat Ikan */}
              <View className="flex-1 flex-col gap-1">
                <Text className="text-[12px] font-bold text-on-surface">Berat (kg) *</Text>
                <View className="relative justify-center">
                  <TextInput
                    value={fishWeight}
                    onChangeText={setFishWeight}
                    placeholder="4.5"
                    placeholderTextColor="#717973"
                    keyboardType="numeric"
                    className="bg-surface-container-lowest border border-outline/20 pl-9 pr-4 py-3 rounded-lg text-[14px] text-on-surface"
                  />
                  <View className="absolute left-3">
                    <Scale size={14} color="#717973" />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Section 4: Umpan yang Digunakan */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Umpan yang Digunakan</Text>
            <View className="flex-row flex-wrap gap-2">
              {baitOptions.map((bait) => {
                const isSelected = selectedBait === bait;
                return (
                  <TouchableOpacity
                    key={bait}
                    onPress={() => setSelectedBait(bait)}
                    activeOpacity={0.8}
                    className={`px-4 py-2 rounded-full border ${
                      isSelected
                        ? 'bg-secondary-fixed border-secondary text-on-secondary-fixed'
                        : 'bg-surface-container-lowest border-outline/15'
                    }`}
                  >
                    <Text className={`text-[12px] font-bold ${isSelected ? 'text-on-secondary-fixed' : 'text-on-surface-variant'}`}>
                      {isSelected ? `#${bait}` : bait}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Section 5: Catatan Lapangan */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Catatan Tambahan</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Tulis tingkat kesulitan, cuaca, waktu menyambar, atau info berharga lainnya..."
              placeholderTextColor="#717973"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="bg-surface-container-lowest border border-outline/20 px-4 py-3 rounded-lg text-[14px] text-on-surface min-h-[80px]"
            />
          </View>

          {/* Tips Info */}
          <View className="bg-primary/5 p-4 rounded-xl flex-row items-start gap-2 border border-primary/10">
            <ShieldCheck size={16} color="#012d1d" className="mt-0.5" />
            <Text className="text-[11px] text-primary-container leading-normal flex-1">
              Catatan tangkapan Anda akan ditambahkan ke logbook riwayat pribadi dan dibagikan secara lokal untuk membantu komunitas pemancing Tulungagung memetakan spot gacor secara real-time!
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.8}
            className="bg-primary h-touch-target-min rounded-full items-center justify-center mt-2 shadow-md shadow-primary/20"
          >
            <Text className="text-white text-[14px] font-bold">Simpan Catatan Tangkapan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

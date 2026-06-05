import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MapPin, Waves, Trees, Users, Info } from 'lucide-react-native';
import * as Location from 'expo-location';
import PageHeader from '@/components/page-header';

export default function AddSpotScreen() {
  const [title, setTitle] = useState('');
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [waterType, setWaterType] = useState<'freshwater' | 'saltwater'>('freshwater');
  const [isFree, setIsFree] = useState(true);
  const [isFamilyFriendly, setIsFamilyFriendly] = useState(true);
  const [description, setDescription] = useState('');
  const [selectedBaits, setSelectedBaits] = useState<string[]>([]);
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);

  const baitOptions = ['Cacing', 'Lumut', 'Pelet', 'Udang Rebon', 'Lure Minnow', 'Ulat Belatung'];

  const toggleBait = (bait: string) => {
    setSelectedBaits((prev) =>
      prev.includes(bait) ? prev.filter((b) => b !== bait) : [...prev, bait]
    );
  };

  const getGPSLocation = async () => {
    setIsLoadingGPS(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Izin Ditolak', 'Izin akses lokasi diperlukan untuk mengambil GPS saat ini.');
        setIsLoadingGPS(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLatitude(location.coords.latitude.toFixed(6));
      setLongitude(location.coords.longitude.toFixed(6));
      setLocationName('Koordinat GPS Terdeteksi');
    } catch (error) {
      console.log('Error getting GPS:', error);
      Alert.alert('Gagal', 'Gagal mendeteksi lokasi GPS Anda.');
    } finally {
      setIsLoadingGPS(false);
    }
  };

  const handleSubmit = () => {
    if (!title || !latitude || !longitude) {
      Alert.alert('Formulir Belum Lengkap', 'Nama spot dan koordinat lokasi wajib diisi.');
      return;
    }

    Alert.alert(
      'Spot Terdaftar!',
      `Spot "${title}" berhasil didaftarkan secara lokal di Tulungagung.`,
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
      <PageHeader title="Tambah Spot Baru" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1 px-container-margin py-base"
      >
        <View className="flex-col gap-5">
          {/* Section 1: Detail Spot */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Nama & Detail Spot</Text>
            <View className="flex-col gap-3">
              <View className="flex-col gap-1">
                <Text className="text-[12px] font-bold text-on-surface">Nama Spot *</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Contoh: Dam Karangrejo Utara"
                  placeholderTextColor="#717973"
                  className="bg-surface-container-lowest border border-outline/20 px-4 py-3 rounded-lg text-[14px] text-on-surface"
                />
              </View>

              <View className="flex-col gap-1">
                <Text className="text-[12px] font-bold text-on-surface">Nama Kelurahan / Kecamatan</Text>
                <TextInput
                  value={locationName}
                  onChangeText={setLocationName}
                  placeholder="Contoh: Karangrejo, Tulungagung"
                  placeholderTextColor="#717973"
                  className="bg-surface-container-lowest border border-outline/20 px-4 py-3 rounded-lg text-[14px] text-on-surface"
                />
              </View>
            </View>
          </View>

          {/* Section 2: GPS Koordinat */}
          <View className="flex-col gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Koordinat Peta *</Text>
              <TouchableOpacity 
                onPress={getGPSLocation}
                disabled={isLoadingGPS}
                activeOpacity={0.7}
                className="flex-row items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full"
              >
                <MapPin size={12} color="#012d1d" />
                <Text className="text-[11px] font-black text-primary">
                  {isLoadingGPS ? 'Mencari GPS...' : 'Gunakan GPS Saat Ini'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 flex-col gap-1">
                <Text className="text-[11px] text-outline font-bold">Latitude</Text>
                <TextInput
                  value={latitude}
                  onChangeText={setLatitude}
                  placeholder="-8.059100"
                  placeholderTextColor="#717973"
                  keyboardType="numeric"
                  className="bg-surface-container-lowest border border-outline/20 px-4 py-3 rounded-lg text-[14px] text-on-surface"
                />
              </View>

              <View className="flex-1 flex-col gap-1">
                <Text className="text-[11px] text-outline font-bold">Longitude</Text>
                <TextInput
                  value={longitude}
                  onChangeText={setLongitude}
                  placeholder="111.884100"
                  placeholderTextColor="#717973"
                  keyboardType="numeric"
                  className="bg-surface-container-lowest border border-outline/20 px-4 py-3 rounded-lg text-[14px] text-on-surface"
                />
              </View>
            </View>
          </View>

          {/* Section 3: Tipe Perairan */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Tipe Perairan</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setWaterType('freshwater')}
                activeOpacity={0.8}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border ${
                  waterType === 'freshwater'
                    ? 'bg-primary border-primary'
                    : 'bg-surface-container-lowest border-outline/15'
                }`}
              >
                <Waves size={16} color={waterType === 'freshwater' ? '#ffffff' : '#717973'} />
                <Text className={`text-[12px] font-bold ${waterType === 'freshwater' ? 'text-white' : 'text-on-surface'}`}>
                  Air Tawar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setWaterType('saltwater')}
                activeOpacity={0.8}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border ${
                  waterType === 'saltwater'
                    ? 'bg-primary border-primary'
                    : 'bg-surface-container-lowest border-outline/15'
                }`}
              >
                <Waves size={16} color={waterType === 'saltwater' ? '#ffffff' : '#717973'} />
                <Text className={`text-[12px] font-bold ${waterType === 'saltwater' ? 'text-white' : 'text-on-surface'}`}>
                  Air Laut
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 4: Karakteristik Spot */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Karakteristik Spot</Text>
            <View className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline/5 flex-col gap-4">
              {/* Gratis Masuk */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                    <Trees size={16} color="#012d1d" />
                  </View>
                  <View>
                    <Text className="text-[14px] font-bold text-on-surface">Bebas Biaya Masuk</Text>
                    <Text className="text-[11px] text-outline">Spot pancing ini gratis & bebas diakses umum</Text>
                  </View>
                </View>
                <Switch
                  value={isFree}
                  onValueChange={setIsFree}
                  trackColor={{ false: '#dde3eb', true: '#86af99' }}
                  thumbColor={isFree ? '#012d1d' : '#ffffff'}
                />
              </View>

              {/* Ramah Keluarga */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 bg-secondary/15 rounded-full items-center justify-center">
                    <Users size={16} color="#75593a" />
                  </View>
                  <View>
                    <Text className="text-[14px] font-bold text-on-surface">Ramah Keluarga</Text>
                    <Text className="text-[11px] text-outline">Akses jalan mudah & aman untuk anak-anak</Text>
                  </View>
                </View>
                <Switch
                  value={isFamilyFriendly}
                  onValueChange={setIsFamilyFriendly}
                  trackColor={{ false: '#dde3eb', true: '#86af99' }}
                  thumbColor={isFamilyFriendly ? '#012d1d' : '#ffffff'}
                />
              </View>
            </View>
          </View>

          {/* Section 5: Umpan Rekomendasi */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Rekomendasi Umpan Jitu</Text>
            <View className="flex-row flex-wrap gap-2">
              {baitOptions.map((bait) => {
                const isSelected = selectedBaits.includes(bait);
                return (
                  <TouchableOpacity
                    key={bait}
                    onPress={() => toggleBait(bait)}
                    activeOpacity={0.8}
                    className={`px-4 py-2 rounded-full border ${
                      isSelected
                        ? 'bg-secondary-fixed border-secondary text-on-secondary-fixed'
                        : 'bg-surface-container-lowest border-outline/15 text-on-surface'
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

          {/* Section 6: Catatan Tambahan */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Catatan Lapangan & Deskripsi</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Tulis kondisi jalan, kedalaman air, atau tips memancing lainnya..."
              placeholderTextColor="#717973"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-surface-container-lowest border border-outline/20 px-4 py-3 rounded-lg text-[14px] text-on-surface min-h-[100px]"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.8}
            className="bg-primary h-touch-target-min rounded-full items-center justify-center mt-4 shadow-md shadow-primary/20"
          >
            <Text className="text-white text-[14px] font-bold">Daftarkan Spot Baru</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

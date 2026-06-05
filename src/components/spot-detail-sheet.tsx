import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { MapPin, Bookmark, BookmarkCheck, Navigation, Flame, Moon, Compass } from 'lucide-react-native';
import { Spot } from '@/constants/spots-data';

interface SpotDetailSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
  spot: Spot | null;
  onNavigateToSpot: (spot: Spot) => void;
  onClose?: () => void;
}

export default function SpotDetailSheet({ sheetRef, spot, onNavigateToSpot, onClose }: SpotDetailSheetProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    setIsBookmarked(false);
  }, [spot?.id]);

  // Sync spot state to BottomSheet index imperatively to avoid library prop bugs
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (spot) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [spot]);

  const isGacor = spot?.type === 'gacor';
  const indicatorPercentage = spot ? Math.round(spot.indicatorValue * 100) : 0;

  // Fungsi untuk mendapatkan warna indikator keaktifan ikan
  const getIndicatorColor = () => {
    if (!spot) return '#717973';
    if (spot.indicatorValue >= 0.8) return '#ba1a1a'; // Gacor (Red)
    if (spot.indicatorValue >= 0.5) return '#f59e0b'; // Aktif (Orange-Yellow)
    return '#717973'; // Tenang (Gray)
  };

  const handleNavigate = () => {
    if (spot) {
      onNavigateToSpot(spot);
    }
    sheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1} // Dimulai dalam keadaan tertutup, dikontrol oleh useEffect di atas
      snapPoints={['58%']}
      enablePanDownToClose={true}
      onChange={(index) => {
        if (index === -1 && onClose) {
          onClose();
        }
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.3}
        />
      )}
      backgroundStyle={{
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#dde3eb',
        width: 40,
        height: 4,
      }}
    >
      <BottomSheetView className="flex-1 px-container-margin py-base justify-between">
        <View className="flex-1">
          {/* Header Section */}
          <View className="flex-row justify-between items-start mb-gutter">
            <View className="flex-1 pr-4">
              <Text className="text-[20px] font-bold text-primary leading-tight">
                {spot?.title || ''}
              </Text>
              <View className="flex-row items-center gap-1 mt-1.5">
                <MapPin size={12} color="#717973" />
                <Text className="text-[12px] text-outline font-bold">
                  {spot?.locationName || ''}
                </Text>
              </View>
            </View>

            {/* Tombol Bookmark */}
            <TouchableOpacity
              onPress={() => setIsBookmarked(!isBookmarked)}
              activeOpacity={0.8}
              className={`w-10 h-10 rounded-full border items-center justify-center shadow-sm ${
                isBookmarked 
                  ? 'bg-primary border-primary' 
                  : 'bg-surface-container-lowest border-outline/10'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck size={18} color="#ffffff" />
              ) : (
                <Bookmark size={18} color="#012d1d" />
              )}
            </TouchableOpacity>
          </View>

          {/* Scrollable Content inside Bottom Sheet */}
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1"
          >
            {/* Section 1: Gacor Meter (Progress Bar bergaya Termometer) */}
            <View className="bg-surface-container-low p-gutter rounded-2xl border border-outline/5 mb-5">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-1.5">
                  {isGacor ? (
                    <Flame size={16} color="#ba1a1a" fill="#ba1a1a" />
                  ) : (
                    <Moon size={16} color="#717973" fill="#717973" />
                  )}
                  <Text className="text-[13px] font-bold text-on-surface">
                    Indikator Keaktifan Ikan
                  </Text>
                </View>
                <Text 
                  style={{ color: getIndicatorColor() }} 
                  className="text-[12px] font-black uppercase tracking-wider"
                >
                  {spot?.indicatorText || ''} ({indicatorPercentage}%)
                </Text>
              </View>

              {/* Progress Bar Container */}
              <View className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden relative">
                {/* Active Progress Bar Gradient */}
                <View 
                  style={{ 
                    width: `${indicatorPercentage}%`, 
                    backgroundColor: getIndicatorColor(),
                    shadowColor: getIndicatorColor(),
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                  }} 
                  className="h-full rounded-full"
                />
              </View>
              <Text className="text-[11px] text-outline mt-2 leading-relaxed">
                {spot?.description || ''}
              </Text>
            </View>

            {/* Section 2: Foto Tangkapan Terbaru (Carousel) */}
            <View className="mb-5">
              <Text className="text-[13px] font-bold text-outline uppercase tracking-wider mb-2">
                Tangkapan Terbaru Pemancing
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {spot?.photos?.map((photo, index) => (
                  <View 
                    key={index}
                    className="w-40 h-24 rounded-xl overflow-hidden border border-outline/10 shadow-sm"
                  >
                    <Image
                      source={{ uri: photo }}
                      className="w-full h-full"
                      contentFit="cover"
                      transition={300}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Section 3: Umpan Jitu */}
            <View className="mb-2">
              <Text className="text-[13px] font-bold text-outline uppercase tracking-wider mb-2">
                Rekomendasi Umpan Jitu
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {spot?.baits?.map((bait, index) => (
                  <View 
                    key={index}
                    className="bg-secondary-fixed px-3 py-1.5 rounded-full border border-outline/5"
                  >
                    <Text className="text-[11px] font-bold text-on-secondary-fixed">
                      {bait}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Action Button: Mancing Di Sini */}
        <View className="pt-gutter border-t border-outline/10">
          <TouchableOpacity
            onPress={handleNavigate}
            activeOpacity={0.8}
            className="w-full bg-primary h-touch-target-min rounded-full flex-row items-center justify-center gap-2 shadow-md"
          >
            <Navigation size={18} color="#ffffff" fill="#ffffff" />
            <Text className="text-white text-[14px] font-bold">Mancing di Sini</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

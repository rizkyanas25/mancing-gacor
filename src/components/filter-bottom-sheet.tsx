import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Flame, Trees, Users, Waves, SlidersHorizontal, RotateCcw } from 'lucide-react-native';

export interface FilterState {
  gacorOnly: boolean;
  freeOnly: boolean;
  familyOnly: boolean;
  waterType: 'all' | 'freshwater' | 'saltwater';
}

interface FilterBottomSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
  filters: FilterState;
  onApplyFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  matchCount: number;
}

export default function FilterBottomSheet({
  sheetRef,
  filters,
  onApplyFilters,
  onResetFilters,
  matchCount,
}: FilterBottomSheetProps) {
  // Gunakan local state agar user bisa memilih-milih filter dulu sebelum menekan "Terapkan"
  const [localFilters, setLocalFilters] = useState<FilterState>({ ...filters });

  // Sinkronkan local state saat filters prop berubah (misal ketika direset atau di-toggle via header)
  useEffect(() => {
    setLocalFilters({ ...filters });
  }, [filters]);

  const toggleLocalFilter = (key: keyof FilterState) => {
    if (key === 'waterType') return; // dihandle terpisah
    setLocalFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const setLocalWaterType = (type: 'all' | 'freshwater' | 'saltwater') => {
    setLocalFilters((prev) => ({
      ...prev,
      waterType: type,
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    sheetRef.current?.close();
  };

  const handleReset = () => {
    onResetFilters();
    sheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1} // Dimulai dalam keadaan tertutup
      snapPoints={['52%']}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      )}
      backgroundStyle={{
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#dde3eb', // surface-container-highest
        width: 40,
        height: 4,
      }}
    >
      <BottomSheetView className="flex-1 px-container-margin py-base">
        {/* Header Sheet */}
        <View className="flex-row items-center justify-between pb-gutter border-b border-outline/10">
          <View className="flex-row items-center gap-2">
            <SlidersHorizontal size={20} color="#012d1d" />
            <Text className="text-[18px] font-bold text-primary">Filter Spot</Text>
          </View>
          <TouchableOpacity onPress={handleReset} className="flex-row items-center gap-1">
            <RotateCcw size={14} color="#717973" />
            <Text className="text-[12px] font-bold text-outline">Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 py-gutter flex-col gap-6">
          {/* Section 1: Tipe Air */}
          <View className="flex-col gap-2">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Tipe Perairan</Text>
            <View className="flex-row gap-2">
              {(['all', 'freshwater', 'saltwater'] as const).map((type) => {
                const isActive = localFilters.waterType === type;
                const label = type === 'all' ? 'Semua Air' : type === 'freshwater' ? 'Air Tawar' : 'Air Laut';
                
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setLocalWaterType(type)}
                    activeOpacity={0.8}
                    className={`flex-1 py-2 rounded-full border items-center justify-center ${
                      isActive 
                        ? 'bg-primary border-primary' 
                        : 'bg-surface-container-lowest border-outline/15'
                    }`}
                  >
                    <Text className={`text-[12px] font-bold ${isActive ? 'text-white' : 'text-on-surface'}`}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Section 2: Karakteristik Spot */}
          <View className="flex-col gap-4">
            <Text className="text-[13px] font-bold text-outline uppercase tracking-wider">Karakteristik Spot</Text>
            
            {/* Toggle Gacor */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-error/10 rounded-full items-center justify-center">
                  <Flame size={16} color="#ba1a1a" fill="#ba1a1a" />
                </View>
                <View>
                  <Text className="text-[14px] font-bold text-on-surface">Hanya Spot Gacor</Text>
                  <Text className="text-[11px] text-outline">Menampilkan spot dengan keaktifan tinggi</Text>
                </View>
              </View>
              <Switch
                value={localFilters.gacorOnly}
                onValueChange={() => toggleLocalFilter('gacorOnly')}
                trackColor={{ false: '#dde3eb', true: '#86af99' }}
                thumbColor={localFilters.gacorOnly ? '#012d1d' : '#ffffff'}
              />
            </View>

            {/* Toggle Gratis */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                  <Trees size={16} color="#012d1d" />
                </View>
                <View>
                  <Text className="text-[14px] font-bold text-on-surface">Hanya Spot Gratis</Text>
                  <Text className="text-[11px] text-outline">Tanpa biaya tiket masuk kawasan</Text>
                </View>
              </View>
              <Switch
                value={localFilters.freeOnly}
                onValueChange={() => toggleLocalFilter('freeOnly')}
                trackColor={{ false: '#dde3eb', true: '#86af99' }}
                thumbColor={localFilters.freeOnly ? '#012d1d' : '#ffffff'}
              />
            </View>

            {/* Toggle Keluarga */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-secondary/15 rounded-full items-center justify-center">
                  <Users size={16} color="#75593a" />
                </View>
                <View>
                  <Text className="text-[14px] font-bold text-on-surface">Ramah Keluarga</Text>
                  <Text className="text-[11px] text-outline">Akses jalan mudah dan aman untuk anak</Text>
                </View>
              </View>
              <Switch
                value={localFilters.familyOnly}
                onValueChange={() => toggleLocalFilter('familyOnly')}
                trackColor={{ false: '#dde3eb', true: '#86af99' }}
                thumbColor={localFilters.familyOnly ? '#012d1d' : '#ffffff'}
              />
            </View>
          </View>
        </View>

        {/* Footer Buttons */}
        <View className="pt-gutter pb-6 border-t border-outline/10 flex-row gap-2">
          <TouchableOpacity
            onPress={handleApply}
            activeOpacity={0.8}
            className="flex-1 bg-primary h-touch-target-min rounded-full items-center justify-center shadow-md"
          >
            <Text className="text-white text-[14px] font-bold">
              Terapkan Filter ({matchCount} Spot)
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

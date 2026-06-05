import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { Locate, Layers } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import { Spot, SPOTS_DATA } from '@/constants/spots-data';
import { GacorMarker, QuietMarker } from '@/components/custom-markers';
import FloatingHeader from '@/components/floating-header';
import FilterBottomSheet, { FilterState } from '@/components/filter-bottom-sheet';
import SpotDetailSheet from '@/components/spot-detail-sheet';

// Lokasi awal berpusat di Tulungagung sebagai fallback jika GPS tidak diizinkan
const INITIAL_REGION = {
  latitude: -8.0591,
  longitude: 111.8841,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function HomeScreen() {
  const [filters, setFilters] = useState<FilterState>({
    gacorOnly: false,
    freeOnly: false,
    familyOnly: false,
    waterType: 'all',
  });
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const mapRef = useRef<MapView>(null);
  const filterSheetRef = useRef<BottomSheet>(null);
  const detailSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  // Meminta izin lokasi dan mengarahkan peta ke koordinat pengguna saat pertama kali dibuka
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }, 1000);
        }
      } catch (error) {
        console.log('Error getting initial location:', error);
      }
    })();
  }, []);

  // Filter spot berdasarkan seluruh kriteria filter aktif
  const filteredSpots = SPOTS_DATA.filter((spot) => {
    if (filters.gacorOnly && spot.type !== 'gacor') return false;
    if (filters.freeOnly && !spot.isFree) return false;
    if (filters.familyOnly && !spot.isFamilyFriendly) return false;
    if (filters.waterType !== 'all' && spot.waterType !== filters.waterType) return false;
    return true;
  });

  // Fungsi untuk menggeser peta ke lokasi saat ini
  const moveToUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Izin lokasi diperlukan untuk menemukan koordinat Anda saat ini.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }, 1000);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  // Fungsi saat marker di peta diklik
  const handleMarkerPress = (spot: Spot) => {
    setSelectedSpot(spot);
    
    // Tutup filter sheet jika sedang terbuka
    filterSheetRef.current?.close();
    
    // Geser peta agar marker terfokus di area atas (tidak tertutup oleh bottom sheet)
    const latOffset = Platform.OS === 'ios' ? -0.014 : -0.010;
    mapRef.current?.animateToRegion({
      latitude: spot.latitude + latOffset,
      longitude: spot.longitude,
      latitudeDelta: 0.035,
      longitudeDelta: 0.035,
    }, 1000);
  };

  // Fungsi saat tombol "Mancing di Sini" diklik di detail sheet
  const handleNavigateToSpot = (spot: Spot) => {
    // Zoom lebih dekat tepat ke pusat koordinat spot
    mapRef.current?.animateToRegion({
      latitude: spot.latitude,
      longitude: spot.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  };

  // Fungsi untuk me-toggle filter cepat dari horizontal header
  const handleToggleFilter = (key: keyof FilterState | 'waterType_saltwater') => {
    setFilters((prev) => {
      if (key === 'waterType_saltwater') {
        return {
          ...prev,
          waterType: prev.waterType === 'saltwater' ? 'all' : 'saltwater',
        };
      }
      return {
        ...prev,
        [key]: !prev[key as keyof FilterState],
      };
    });
  };

  // Fungsi untuk membuka Bottom Sheet Filter Lanjutan
  const handleOpenFilterSheet = () => {
    // Tutup detail sheet jika sedang terbuka
    detailSheetRef.current?.close();
    filterSheetRef.current?.expand();
  };

  // Fungsi untuk menerapkan filter dari Bottom Sheet
  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Fungsi untuk mereset seluruh filter
  const handleResetFilters = () => {
    setFilters({
      gacorOnly: false,
      freeOnly: false,
      familyOnly: false,
      waterType: 'all',
    });
  };

  // Fungsi untuk mengganti tipe peta
  const toggleMapType = () => {
    setMapType((prev) => (prev === 'standard' ? 'satellite' : 'standard'));
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
      >
        {filteredSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
            onPress={(e) => {
              // Mencegah default callout balon muncul di iOS/Android
              e.stopPropagation();
              handleMarkerPress(spot);
            }}
            tracksViewChanges={false}
          >
            {spot.type === 'gacor' ? (
              <GacorMarker title={`Gacor: ${spot.targetFish}`} />
            ) : (
              <QuietMarker title={spot.title} />
            )}
          </Marker>
        ))}
      </MapView>

      {/* Floating Header (Search & Filters) melayang di atas peta */}
      <FloatingHeader 
        filters={filters}
        onToggleFilter={handleToggleFilter}
        onOpenFilterSheet={handleOpenFilterSheet}
      />

      {/* Map Interactions Layer (Floating Buttons on the Right) - Ditempelkan 16px di atas Tab Bar */}
      {!selectedSpot && (
        <View 
          style={{ bottom: 16 }}
          className="absolute right-container-margin flex-col gap-2 z-40"
        >
          <TouchableOpacity 
            onPress={moveToUserLocation}
            activeOpacity={0.8}
            className="w-12 h-12 bg-surface-container-lowest rounded-full shadow-lg border border-outline/10 items-center justify-center"
          >
            <Locate size={20} color="#161c22" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={toggleMapType}
            activeOpacity={0.8}
            className={`w-12 h-12 rounded-full shadow-lg items-center justify-center border border-outline/10 ${
              mapType === 'satellite' ? 'bg-primary' : 'bg-surface-container-lowest'
            }`}
          >
            <Layers size={20} color={mapType === 'satellite' ? '#ffffff' : '#012d1d'} />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Sheet Filter Lanjutan */}
      <FilterBottomSheet
        sheetRef={filterSheetRef}
        filters={filters}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        matchCount={filteredSpots.length}
      />

      {/* Bottom Sheet Detail Spot */}
      <SpotDetailSheet
        sheetRef={detailSheetRef}
        spot={selectedSpot}
        onNavigateToSpot={handleNavigateToSpot}
        onClose={() => setSelectedSpot(null)}
      />
    </View>
  );
}

module.exports = ({ config }) => {
  const plugins = config.plugins || [];
  
  // Add react-native-maps config plugin for native iOS Google Maps SDK
  plugins.push([
    "react-native-maps",
    {
      "iosGoogleMapsApiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
    }
  ]);

  return {
    ...config,
    plugins,
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },
    ios: {
      ...config.ios,
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
      infoPlist: {
        ...config.ios?.infoPlist,
        NSLocationWhenInUseUsageDescription: "MancingGacor memerlukan akses lokasi untuk mendeteksi spot pancing terdekat dari Anda.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "MancingGacor memerlukan akses lokasi untuk mendeteksi spot pancing terdekat dari Anda.",
      },
    },
  };
};

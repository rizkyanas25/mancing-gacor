import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Share2, MapPin, Award, Flame } from 'lucide-react-native';

interface CatchPost {
  id: string;
  userName: string;
  userAvatar: string;
  userRank: string;
  timeAgo: string;
  fishType: string;
  weight: string;
  spotName: string;
  baitUsed: string;
  description: string;
  photoUri: string;
  initialLikes: number;
  commentsCount: number;
}

const FEED_DATA: CatchPost[] = [
  {
    id: '1',
    userName: 'Eko Setyawan',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    userRank: 'Master Gurame (Lvl 12)',
    timeAgo: '2 jam yang lalu',
    fishType: 'Ikan Gurame Babon',
    weight: '5.2 kg',
    spotName: 'Pinka Riverside (Kali Ngrowo)',
    baitUsed: 'Cacing Tanah',
    description: 'Strike pagi hari pas air lagi tenang dan mendung tipis. Gurame babon Tulungagung di Pinka lagi bener-bener liar nyamber umpan cacing tanah segar. Tarikannya jos gandos!',
    photoUri: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    initialLikes: 24,
    commentsCount: 8,
  },
  {
    id: '2',
    userName: 'Budi Santoso',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
    userRank: 'Pemancing Handal (Lvl 5)',
    timeAgo: '5 jam yang lalu',
    fishType: 'Ikan Nila Merah',
    weight: '1.8 kg',
    spotName: 'Dam Kleben Tiudan',
    baitUsed: 'Lumut Sawah',
    description: 'Umpan lumut sawah campur esen kelapa muda terbukti ampuh. Narik terus tanpa henti di tiudan, spot ini sangat direkomendasikan untuk sore hari.',
    photoUri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    initialLikes: 15,
    commentsCount: 3,
  },
  {
    id: '3',
    userName: 'Hendri Wijaya',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    userRank: 'Pemburu Monster (Lvl 9)',
    timeAgo: '1 hari yang lalu',
    fishType: 'Ikan Bawal',
    weight: '4.2 kg',
    spotName: 'Dam Karangrejo',
    baitUsed: 'Pelet Wangi',
    description: 'Bawal babon sukses landed setelah pertarungan sengit 15 menit. Joran tegek sempat meliuk ekstrim tapi akhirnya aman. Dam Karangrejo emang gacor!',
    photoUri: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80',
    initialLikes: 42,
    commentsCount: 11,
  }
];

export default function CommunityScreen() {
  const [posts, setPosts] = useState(FEED_DATA);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = prev.includes(id);
      if (isLiked) {
        setPosts((currentPosts) =>
          currentPosts.map((p) => (p.id === id ? { ...p, initialLikes: p.initialLikes - 1 } : p))
        );
        return prev.filter((item) => item !== id);
      } else {
        setPosts((currentPosts) =>
          currentPosts.map((p) => (p.id === id ? { ...p, initialLikes: p.initialLikes + 1 } : p))
        );
        return [...prev, id];
      }
    });
  };

  const renderPost = ({ item }: { item: CatchPost }) => {
    const isLiked = likedPosts.includes(item.id);

    return (
      <View className="mx-container-margin mb-4 bg-surface-container-lowest border border-outline/10 rounded-2xl overflow-hidden shadow-sm">
        {/* Post Header */}
        <View className="flex-row justify-between items-center p-gutter">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full overflow-hidden border border-outline/10">
              <Image source={{ uri: item.userAvatar }} className="w-full h-full" />
            </View>
            <View>
              <View className="flex-row items-center gap-1.5">
                <Text className="text-[14px] font-bold text-on-surface">{item.userName}</Text>
                <Award size={14} color="#75593a" />
              </View>
              <Text className="text-[11px] text-outline font-medium">{item.userRank}</Text>
            </View>
          </View>
          <Text className="text-[10px] text-outline">{item.timeAgo}</Text>
        </View>

        {/* Post Catch Image */}
        <View className="w-full h-64 bg-surface-container-low">
          <Image source={{ uri: item.photoUri }} className="w-full h-full object-cover" />
          
          {/* Overlay Tag Tangkapan */}
          <View className="absolute bottom-3 left-3 bg-primary/90 px-3 py-1.5 rounded-full flex-row items-center gap-1">
            <Flame size={12} color="#ffffff" fill="#ffffff" />
            <Text className="text-[11px] text-white font-bold">
              {item.fishType} ({item.weight})
            </Text>
          </View>
        </View>

        {/* Post Body */}
        <View className="p-gutter">
          <View className="flex-row items-center gap-1.5 mb-2">
            <MapPin size={12} color="#012d1d" />
            <Text className="text-[11px] text-primary font-black uppercase tracking-wider">{item.spotName}</Text>
          </View>

          <Text className="text-[13px] text-on-surface-variant leading-relaxed mb-3">
            {item.description}
          </Text>

          {/* Umpan Tag */}
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-[11px] text-outline font-bold uppercase tracking-wider">Umpan Jitu:</Text>
            <View className="bg-secondary-fixed px-3 py-1 rounded-full border border-outline/5">
              <Text className="text-[10px] font-black text-on-secondary-fixed">#{item.baitUsed}</Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-[1px] bg-outline/10 w-full mb-3" />

          {/* Interaction Row */}
          <View className="flex-row justify-between items-center px-1">
            <TouchableOpacity 
              onPress={() => handleLike(item.id)}
              activeOpacity={0.7} 
              className="flex-row items-center gap-2"
            >
              <Heart size={18} color={isLiked ? '#ba1a1a' : '#717973'} fill={isLiked ? '#ba1a1a' : 'none'} />
              <Text className={`text-[12px] font-bold ${isLiked ? 'text-error' : 'text-outline'}`}>
                {item.initialLikes} Suka
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-2">
              <MessageCircle size={18} color="#717973" />
              <Text className="text-[12px] font-bold text-outline">
                {item.commentsCount} Komentar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-2">
              <Share2 size={18} color="#717973" />
              <Text className="text-[12px] font-bold text-outline">Bagikan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header Utama Feed */}
      <View className="h-14 px-container-margin border-b border-outline/10 flex-row items-center justify-between bg-surface-container-lowest">
        <Text className="text-[18px] font-bold text-primary">Logbook Feed Pemancing</Text>
        <Award size={20} color="#012d1d" />
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
        className="flex-1"
      />
    </SafeAreaView>
  );
}

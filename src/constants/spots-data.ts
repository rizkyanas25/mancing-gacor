export interface Spot {
  id: string;
  title: string;
  locationName: string;
  latitude: number;
  longitude: number;
  type: 'gacor' | 'quiet' | 'regular';
  targetFish: string;
  indicatorValue: number; // 0.0 - 1.0 (e.g. 0.8 = 80%)
  indicatorText: string;  // e.g. "SANGAT AKTIF!"
  description: string;
  baits: string[];
  photos: string[];
  isFree: boolean;
  isFamilyFriendly: boolean;
  waterType: 'freshwater' | 'saltwater';
}

export const SPOTS_DATA: Spot[] = [
  {
    id: 'spot-1',
    title: 'Pinka Riverside (Kali Ngrowo)',
    locationName: 'Sembung, Tulungagung',
    latitude: -8.0657,
    longitude: 111.9025,
    type: 'gacor',
    targetFish: 'Nila & Gurame',
    indicatorValue: 0.9,
    indicatorText: 'MEGA GACOR!',
    description: 'Pinggir Kali Ngrowo. Air tenang dan teduh, ikan Nila babon sedang sangat aktif menyambar umpan pagi ini.',
    baits: ['#Lumut', '#Cacing'],
    isFree: true,
    isFamilyFriendly: true,
    waterType: 'freshwater',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDX9gcuMcucgcPlAb4sCnxFHo8kV3Isn6bPbreS6pmovPitJbCLL7jKQvyjkI256-Ab8IOX4nPqEnKx-wYNPBhXVSAZ2WFDESbiIzJUGz10TQtWPo7MA_gytbRJVmkD1kTwlq5k6eKC81y8wH5idZZakgKbSwMS5XWOiKBoo5R9gP6k9Dvxy9zT7viqyuKFOtb2HjAet8Zsdid0UsrwdQ1bnYyp-lHFEHDamsXkKfBY8CpRj7jmBxnxlLKuTM3mlR3wPEGQZRvUrR0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-d49IRB65rrvX9tED3z_0U4YJb_2mfpVZxdFCeu_-gCuwunxowsjkqRtWdAyvpc4C87t8r0TFd537oewdCcDcDFOhd7rGaOuty6-3sGd2IGu6UYNiVjcfUCQsZtZIYeGs2TnHOkfmPeIuavp70NW4YRtgYcyx0Vtk2XpeSTMGadq2Rnv2pn-9RHXerrrUeN990I0KC6376be773r731VVoFhr2J55uUwznpoll7njPDn1BPA2hybLwRDocc02MfSaIrSOZiZZfUI'
    ]
  },
  {
    id: 'spot-2',
    title: 'Dam Kleben Tiudan',
    locationName: 'Gondang, Tulungagung',
    latitude: -8.0603,
    longitude: 111.8567,
    type: 'gacor',
    targetFish: 'Wader & Bader',
    indicatorValue: 0.75,
    indicatorText: 'AKTIF',
    description: 'Pintu air Dam Kleben. Aliran air dari limpasan bendungan membawa banyak plankton, wader berkumpul di pusaran air tenang.',
    baits: ['#Cacing', '#Rotiklik', '#Pelet'],
    isFree: true,
    isFamilyFriendly: true,
    waterType: 'freshwater',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDX9gcuMcucgcPlAb4sCnxFHo8kV3Isn6bPbreS6pmovPitJbCLL7jKQvyjkI256-Ab8IOX4nPqEnKx-wYNPBhXVSAZ2WFDESbiIzJUGz10TQtWPo7MA_gytbRJVmkD1kTwlq5k6eKC81y8wH5idZZakgKbSwMS5XWOiKBoo5R9gP6k9Dvxy9zT7viqyuKFOtb2HjAet8Zsdid0UsrwdQ1bnYyp-lHFEHDamsXkKfBY8CpRj7jmBxnxlLKuTM3mlR3wPEGQZRvUrR0'
    ]
  },
  {
    id: 'spot-3',
    title: 'Bendungan Wonorejo',
    locationName: 'Pagerwojo, Tulungagung',
    latitude: -7.9625,
    longitude: 111.8153,
    type: 'quiet',
    targetFish: 'Tombro & Patin',
    indicatorValue: 0.4,
    indicatorText: 'TENANG',
    description: 'Area pinggiran dermaga bendungan terbesar di Asia Tenggara. Air sangat dalam. Cocok untuk mancing glosoran malam hari.',
    baits: ['#Pelet', '#Rotiklik', '#UmpanRacik'],
    isFree: false,
    isFamilyFriendly: true,
    waterType: 'freshwater',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-d49IRB65rrvX9tED3z_0U4YJb_2mfpVZxdFCeu_-gCuwunxowsjkqRtWdAyvpc4C87t8r0TFd537oewdCcDcDFOhd7rGaOuty6-3sGd2IGu6UYNiVjcfUCQsZtZIYeGs2TnHOkfmPeIuavp70NW4YRtgYcyx0Vtk2XpeSTMGadq2Rnv2pn-9RHXerrrUeN990I0KC6376be773r731VVoFhr2J55uUwznpoll7njPDn1BPA2hybLwRDocc02MfSaIrSOZiZZfUI'
    ]
  },
  {
    id: 'spot-4',
    title: 'Dam Karangrejo',
    locationName: 'Karangrejo, Tulungagung',
    latitude: -8.0180,
    longitude: 111.8980,
    type: 'gacor',
    targetFish: 'Gabus & Lele',
    indicatorValue: 0.85,
    indicatorText: 'SANGAT AKTIF',
    description: 'Dam irigasi persawahan Karangrejo. Struktur beton terjal dan berarus deras di tengah. Banyak sambaran ikan predator.',
    baits: ['#CacingTanah', '#Jangkrik'],
    isFree: true,
    isFamilyFriendly: false,
    waterType: 'freshwater',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDX9gcuMcucgcPlAb4sCnxFHo8kV3Isn6bPbreS6pmovPitJbCLL7jKQvyjkI256-Ab8IOX4nPqEnKx-wYNPBhXVSAZ2WFDESbiIzJUGz10TQtWPo7MA_gytbRJVmkD1kTwlq5k6eKC81y8wH5idZZakgKbSwMS5XWOiKBoo5R9gP6k9Dvxy9zT7viqyuKFOtb2HjAet8Zsdid0UsrwdQ1bnYyp-lHFEHDamsXkKfBY8CpRj7jmBxnxlLKuTM3mlR3wPEGQZRvUrR0'
    ]
  },
  {
    id: 'spot-5',
    title: 'Pantai Popoh Tulungagung',
    locationName: 'Besuki, Tulungagung',
    latitude: -8.2536,
    longitude: 111.7915,
    type: 'quiet',
    targetFish: 'Kerapu & Kakap',
    indicatorValue: 0.35,
    indicatorText: 'TENANG',
    description: 'Area dermaga pelelangan kapal nelayan Popoh. Air laut tenang terlindung teluk. Target ikan karang aktif di bawah tiang.',
    baits: ['#CacingMerah', '#UsusAyam', '#UmpanKolek'],
    isFree: false,
    isFamilyFriendly: true,
    waterType: 'saltwater',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-d49IRB65rrvX9tED3z_0U4YJb_2mfpVZxdFCeu_-gCuwunxowsjkqRtWdAyvpc4C87t8r0TFd537oewdCcDcDFOhd7rGaOuty6-3sGd2IGu6UYNiVjcfUCQsZtZIYeGs2TnHOkfmPeIuavp70NW4YRtgYcyx0Vtk2XpeSTMGadq2Rnv2pn-9RHXerrrUeN990I0KC6376be773r731VVoFhr2J55uUwznpoll7njPDn1BPA2hybLwRDocc02MfSaIrSOZiZZfUI'
    ]
  }
];

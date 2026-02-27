/* ============================================
   competitions.js — Data 9 lomba AIRFEST 26
   
   CARA MENGUBAH:
   - name        : Nama lomba
   - level       : Jenjang peserta
   - status      : "ONLINE" atau "OFFLINE"
   - image       : Path poster PNG (A4 ratio)
   - guideBook   : URL link guide book
   - registerUrl : URL link form pendaftaran
   ============================================ */

const competitions = [
  {
    id: 1,
    name: 'Cerdas Cermat',
    level: 'MTS / SMP Sederajat',
    status: 'OFFLINE',
    image: '/assets/competitions/lomba1.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 2,
    name: 'Debat Bahasa',
    level: 'SMA / MA / SMK Sederajat',
    status: 'OFFLINE',
    image: '/assets/competitions/lomba2.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 3,
    name: 'Olimpiade Sains',
    level: 'MTS / SMP Sederajat',
    status: 'ONLINE',
    image: '/assets/competitions/lomba3.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 4,
    name: 'Poster Digital',
    level: 'SMA / MA / SMK Sederajat',
    status: 'ONLINE',
    image: '/assets/competitions/lomba4.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 5,
    name: 'Speech Contest',
    level: 'MTS / SMP Sederajat',
    status: 'OFFLINE',
    image: '/assets/competitions/lomba5.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 6,
    name: 'Tahfidz Quran',
    level: 'MTS / SMP Sederajat',
    status: 'OFFLINE',
    image: '/assets/competitions/lomba6.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 7,
    name: 'Futsal',
    level: 'SMA / MA / SMK Sederajat',
    status: 'OFFLINE',
    image: '/assets/competitions/lomba7.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 8,
    name: 'Mobile Legends',
    level: 'SMA / MA / SMK Sederajat',
    status: 'ONLINE',
    image: '/assets/competitions/lomba8.png',
    guideBook: '#',
    registerUrl: '#',
  },
  {
    id: 9,
    name: 'Kaligrafi',
    level: 'MTS / SMP Sederajat',
    status: 'OFFLINE',
    image: '/assets/competitions/lomba9.png',
    guideBook: '#',
    registerUrl: '#',
  },
];

export default competitions;
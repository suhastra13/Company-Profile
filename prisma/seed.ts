import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Memulai proses seeding...')

  // 1. BERSIHKAN DATA LAMA (Agar tidak duplikat saat di-seed ulang)
  await prisma.contactMessage.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.portfolio.deleteMany()
  await prisma.service.deleteMany()
  await prisma.companyInfo.deleteMany()
  await prisma.user.deleteMany()
  
  console.log('🧹 Database dibersihkan.')

  // --------------------------------------------------------
  // 4.4.2 - SEED ADMIN USER
  // --------------------------------------------------------
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.user.create({
    data: {
      email: 'admin@wokiltech.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
      image: 'https://ui-avatars.com/api/?name=Super+Admin&background=0D8ABC&color=fff',
    },
  })
  console.log('👤 Admin User dibuat (Pass: admin123)')

  // --------------------------------------------------------
  // 4.4.3 - SEED COMPANY INFO
  // --------------------------------------------------------
  await prisma.companyInfo.create({
    data: {
      name: 'Wokil Tech',
      description: 'Mitra transformasi digital terpercaya untuk bisnis masa depan. Kami menggabungkan inovasi, estetika, dan fungsionalitas.',
      address: 'Jl. Teknologi Digital No. 88, Jakarta Selatan, Indonesia 12345',
      email: 'hello@wokiltech.com',
      phone: '+62 812-3456-7890',
      whatsapp: '6281234567890',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...', // Isi URL iframe maps asli nanti
      socials: {
        instagram: 'https://instagram.com/wokiltech',
        linkedin: 'https://linkedin.com/company/wokiltech',
        github: 'https://github.com/wokiltech'
      },
    },
  })
  console.log('🏢 Company Info dibuat')

  // --------------------------------------------------------
  // 4.4.4 - SEED SERVICES
  // --------------------------------------------------------
  await prisma.service.createMany({
    data: [
      {
        title: 'Web Development',
        slug: 'web-development',
        icon: 'Globe',
        description: 'Website performa tinggi yang dirancang untuk konversi dan SEO.',
        features: ['Landing Page Premium', 'Toko Online (E-Commerce)', 'Sistem ERP Custom'],
        content: '<p>Kami membangun website menggunakan teknologi terbaru...</p>',
      },
      {
        title: 'Mobile Application',
        slug: 'mobile-apps',
        icon: 'Smartphone',
        description: 'Aplikasi Android & iOS yang responsif dan user-friendly.',
        features: ['Native Android/iOS', 'Hybrid (Flutter/React Native)', 'Upload ke Store'],
        content: '<p>Solusi aplikasi mobile untuk startup dan korporat...</p>',
      },
      {
        title: 'Internet of Things (IoT)',
        slug: 'iot-solutions',
        icon: 'Cpu',
        description: 'Integrasi hardware dan software untuk automasi cerdas.',
        features: ['Smart Home', 'Monitoring Dashboard', 'Custom Hardware'],
        content: '<p>Hubungkan dunia fisik dengan digital...</p>',
      },
    ],
  })
  console.log('🛠️ 3 Services dibuat')

  // --------------------------------------------------------
  // 4.4.5 - SEED PORTFOLIO
  // --------------------------------------------------------
  const portfolios = [
    {
      title: 'Smart Farm Hidroponik',
      slug: 'smart-farm-hidroponik',
      client: 'Dinas Pertanian',
      category: 'IoT',
      year: '2025',
      description: 'Sistem monitoring nutrisi tanaman otomatis berbasis IoT.',
      challenge: 'Petani kesulitan menjaga kadar pH air stabil.',
      solution: 'Implementasi sensor IoT real-time dengan dashboard web.',
      result: 'Hasil panen meningkat 40%.',
      techStack: ['ESP32', 'Laravel', 'MQTT'],
      thumbnail: 'https://placehold.co/600x400/1a1a1a/FFF?text=Smart+Farm',
      featured: true,
    },
    {
      title: 'E-Commerce Batik Solo',
      slug: 'ecommerce-batik-solo',
      client: 'UMKM Batik',
      category: 'Web Dev',
      year: '2024',
      description: 'Platform marketplace untuk pengrajin batik lokal.',
      challenge: 'Jangkauan pasar terbatas lokal.',
      solution: 'Website E-Commerce multi-vendor dengan payment gateway.',
      result: 'Penjualan ekspor meningkat 200%.',
      techStack: ['Next.js', 'Prisma', 'Stripe'],
      thumbnail: 'https://placehold.co/600x400/2a2a2a/FFF?text=Batik+Shop',
      featured: true,
    },
    {
      title: 'Aplikasi Absensi Wajah',
      slug: 'face-attendance-app',
      client: 'PT. Teknologi Maju',
      category: 'Mobile Apps',
      year: '2024',
      description: 'Aplikasi absensi karyawan menggunakan AI Face Recognition.',
      challenge: 'Kecurangan absensi manual.',
      solution: 'Mobile app dengan deteksi wajah dan lokasi GPS.',
      result: 'Kedisiplinan karyawan meningkat.',
      techStack: ['Flutter', 'TensorFlow', 'Firebase'],
      thumbnail: 'https://placehold.co/600x400/3a3a3a/FFF?text=Face+App',
      featured: false,
    },
    {
      title: 'Sistem Kasir Cloud (POS)',
      slug: 'pos-cloud-system',
      client: 'Coffee Shop Chain',
      category: 'Web Dev',
      year: '2023',
      description: 'Sistem Point of Sale terintegrasi untuk 50 cabang.',
      challenge: 'Sinkronisasi stok antar cabang sulit.',
      solution: 'Sistem POS berbasis Cloud real-time.',
      result: 'Manajemen stok menjadi otomatis.',
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      thumbnail: 'https://placehold.co/600x400/4a4a4a/FFF?text=POS+System',
      featured: true,
    },
  ]

  for (const pf of portfolios) {
    await prisma.portfolio.create({ data: pf })
  }
  console.log('📂 4 Portfolio items dibuat')

  // --------------------------------------------------------
  // 4.4.6 - SEED TEAM MEMBERS
  // --------------------------------------------------------
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Alex Wokil',
        position: 'CEO & Founder',
        bio: 'Visioner dengan pengalaman 10 tahun di industri teknologi.',
        photo: 'https://placehold.co/400x400/111/FFF?text=CEO',
        order: 1,
        socials: { linkedin: '#', instagram: '#' },
      },
      {
        name: 'Sarah Tech',
        position: 'CTO',
        bio: 'Ahli arsitektur software dan keamanan siber.',
        photo: 'https://placehold.co/400x400/222/FFF?text=CTO',
        order: 2,
        socials: { linkedin: '#', github: '#' },
      },
      {
        name: 'Budi Creative',
        position: 'Lead Designer',
        bio: 'Menciptakan pengalaman pengguna yang intuitif.',
        photo: 'https://placehold.co/400x400/333/FFF?text=Designer',
        order: 3,
        socials: { dribbble: '#', instagram: '#' },
      },
    ],
  })
  console.log('👥 3 Team Members dibuat')

  // --------------------------------------------------------
  // 4.4.7 - SEED TESTIMONIALS
  // --------------------------------------------------------
  await prisma.testimonial.createMany({
    data: [
      {
        client: 'Bapak Hartono',
        company: 'Dinas Pertanian',
        content: 'Sistem IoT dari Wokil Tech sangat membantu efisiensi panen kami. Timnya sangat responsif!',
        rating: 5,
        isShow: true,
      },
      {
        client: 'Ibu Ani',
        company: 'Owner Batik Solo',
        content: 'Penjualan kami meningkat pesat sejak punya website sendiri. Desainnya elegan dan mudah dipakai.',
        rating: 5,
        isShow: true,
      },
      {
        client: 'Manager HRD',
        company: 'PT. Teknologi Maju',
        content: 'Aplikasi absensinya akurat dan anti-fake GPS. Sangat recommended!',
        rating: 4,
        isShow: true,
      },
    ],
  })
  console.log('💬 3 Testimonials dibuat')

  console.log('✅ SEEDING SELESAI! Database siap digunakan.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
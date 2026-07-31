import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const workshops = [
  {
    title: "Uçak Yapımı",
    slug: "ucak-yapimi",
    summary: "Kauçuk bantla çalışan 3D baskılı uçak: enerjiyi öğren, boya, uçur.",
    description:
      "Çocuklar hazır bir 3D baskılı uçak modelini ele alıyor, kinetik enerji prensiplerini (kauçuk bandın geri çekilip serbest bırakılması) basit bir şekilde öğreniyor, sonra uçağını kendi seçtikleri renklerle boyuyorlar.",
    steps: JSON.stringify([
      "Kinetik enerjinin ne olduğu kısaca anlatılıyor",
      "3D baskılı uçak parçaları gösterilir",
      "Çocuk uçakta kauçuk bandı monte eder",
      "Uçağını renklendirir",
      "Kauçuk bandı çekerek uçağını test eder",
    ]),
    learnings: JSON.stringify([
      "Enerji nasıl çalışır (teorik + pratik)",
      "Sebep-sonuç ilişkisi",
      "İnce motor becerisi",
      "Renkler ve tasarım seçimi",
      "Başarı hissi",
    ]),
    output: "Renkli, uçan 3D baskılı uçak (çocuk evine götürür)",
    featured: true,
    sortOrder: 1,
  },
  {
    title: "Mini Fan / El Feneri / Gece Lambası",
    slug: "mini-fan-el-feneri-gece-lambasi",
    summary: "DC motor ve LED ile elektrik prensibini yaşayarak öğrenme.",
    description:
      "Çocuklar 3D baskılı bir nesnede (fan, fener veya lamba) küçük bir DC motor ve LED’li sistem monte ediyor. Aç-kapat mekanizmasını kendisi çalıştırıyor, enerji dönüşümünü yaşıyor.",
    steps: JSON.stringify([
      "LED ışık ve pil hakkında kısa bilgi",
      "Elektronik bileşenleri tanıma",
      "Basit kablolama",
      "LED’i 3D baskılı parçaya monte etme",
      "Aç-kapa ile test ve dekorasyon",
    ]),
    learnings: JSON.stringify([
      "Elektrik devresi nasıl çalışır",
      "Pil, enerji, ışık kavramları",
      "İnce motor becerisi",
      "Sebep-sonuç",
      "Tasarım ve dekorasyon",
    ]),
    output: "Işıklı veya çalışan bir 3D nesne",
    featured: true,
    sortOrder: 2,
  },
  {
    title: "Dinozor Arkeolojisi",
    slug: "dinozor-arkeolojisi",
    summary: "Kumdan parçaları çıkar, puzzle’ı birleştir, dinozoru boya.",
    description:
      "Çocuk arkeolog gibi oyun oynuyor. Kuma gömülü 3D baskılı dinozor puzzle parçalarını kazarak bulur, sonra birleştirerek tam dinozor şeklini oluşturur ve boyar.",
    steps: JSON.stringify([
      "Arkeolog olmak nasıl bir şey anlatılır",
      "Kum dolu kutuda parçaları dikkatle kazıma",
      "Parçaları bulup çıkarma",
      "Puzzle’ı birleştirme",
      "Dinozoru boyama",
    ]),
    learnings: JSON.stringify([
      "Keşif hissi ve merak",
      "Sabır ve dikkat",
      "Motor becerisi",
      "Tanımlama",
      "Başarıyla bütün oluşturma",
    ]),
    output: "Renklendirilmiş 3D dinozor puzzle",
    featured: true,
    sortOrder: 3,
  },
  {
    title: "Dedektiflik Oyunu",
    slug: "dedektiflik-oyunu",
    summary: "Matematik işlemli kasalar, doğru anahtar, ödül.",
    description:
      "Çocuğa matematiksel işlem yazılı kasalar veriliyor. Kasaların üzerindeki anahtarlarda cevaplar yazılı. Doğru cevapla doğru anahtarı bularak kasayı açıyor; içinde küçük hediye/oyuncak var.",
    steps: JSON.stringify([
      "5-6 matematik işlemli kasa hazırlanır",
      "Çocuk işlemi okur",
      "Doğru cevabı anahtarlar arasından bulur",
      "Kasayı açar ve ödülü alır",
      "Bir sonraki kasaya geçer",
    ]),
    learnings: JSON.stringify([
      "Matematik problem çözme",
      "Mantıksal düşünme",
      "Sebep-sonuç",
      "Başarı ile ödüllendirilme",
      "Özgüven",
    ]),
    output: "Kazanılan hediyeler",
    sortOrder: 4,
  },
  {
    title: "Renk Eşleştirme",
    slug: "renk-eslestirme",
    summary: "Renkli figürleri doğru tüplere yerleştirme oyunu.",
    description:
      "Çocuklar renkli 3D baskılı figürleri rengi uygun tüplere/kutulara yerleştiriyor. Basit mantık oyunu ve renk tanıma etkinliği.",
    steps: JSON.stringify([
      "Farklı renkte top/figür gösterilir",
      "Renkli delik/tüpler tanıtılır",
      "Toplar uygun renge yerleştirilir",
      "Doğru yerleşimde geri bildirim alınır",
      "Tüm toplar yerleşince tamamlanır",
    ]),
    learnings: JSON.stringify([
      "Renk tanıma ve ayırma",
      "Eşleştirme mantığı",
      "Sıra bekleme",
      "Kurallara uyma",
      "Problem çözme",
    ]),
    output: "Tamamlanmış renkli yapı, başarı hissi",
    sortOrder: 5,
  },
  {
    title: "Oyuncak Bulmaca",
    slug: "oyuncak-bulmaca",
    summary: "Gözler kapalı, dokunarak oyuncak bulma.",
    description:
      "Çocuğun gözleri kapalıyken kutudaki 3D baskılı oyuncakları yalnızca dokunarak araması istenir. Dokunsal algı ve şekil tanıma gelişir.",
    steps: JSON.stringify([
      "Gözler eşarp/maske ile kapatılır",
      "Kutu içindeki oyuncaklar hazırlanır",
      "Yönetici bir oyuncağı söyler",
      "Çocuk dokunarak bulur",
      "Gözlerini açıp kontrol eder",
    ]),
    learnings: JSON.stringify([
      "Dokunsal algı",
      "Şekil hissetme",
      "Merak ve keşif",
      "Dinleme",
      "Koordinasyon",
    ]),
    output: "Bulduğu oyuncaklar, başarı hissi",
    sortOrder: 6,
  },
  {
    title: "Kaydırımlı Puzzle",
    slug: "kaydirmali-puzzle",
    summary: "Numaralı kaydırma puzzle ile sıra ve planlama.",
    description:
      "3D baskılı kaydırma puzzle’da her parçanın üstünde numara vardır. Çocuk numaraları sırasıyla doğru yerlere kaydırarak puzzle’ı çözer.",
    steps: JSON.stringify([
      "Karışık puzzle gösterilir",
      "Hedef sıra açıklanır",
      "Boş alan kullanarak parçalar kaydırılır",
      "Adım adım doğru sıra oluşur",
      "Son parça yerleşince tamamlanır",
    ]),
    learnings: JSON.stringify([
      "Sıra mantığı",
      "Problem çözme",
      "Sabır",
      "Planlama",
      "Konsantrasyon",
    ]),
    output: "Tamamlanmış sıralı puzzle",
    sortOrder: 7,
  },
  {
    title: "Duygu Tanıma",
    slug: "duygu-tanima",
    summary: "Emoji rozetlerle duyguları adlandırma ve ifade etme.",
    description:
      "Çocuklar kabartmalı emoji rozetler yapıyor. Her emoji bir duyguyu temsil eder. Çocuk o gün ne hissettiğini seçip rozetini takar.",
    steps: JSON.stringify([
      "Farklı emoji duyguları tanıtılır",
      "Duygular adlandırılır",
      "Bugün nasıl hissediyorsun sorulur",
      "Uygun emoji seçilir",
      "Rozet takılır ve istenirse dekore edilir",
    ]),
    learnings: JSON.stringify([
      "Duyguları tanıma",
      "Duyguları adlandırma",
      "Duygulara saygı",
      "Duygu regülasyonu",
      "Sosyalleşme",
    ]),
    output: "Kişiye özel emoji rozet",
    sortOrder: 8,
  },
  {
    title: "Köprü Oluşturma",
    slug: "kopru-olusturma",
    summary: "Parçaları birleştir, köprü kur, dayanıklılık testi yap.",
    description:
      "Çocuklara birbirine geçebilecek 3D baskılı köprü parçaları verilir. Kendi köprülerini inşa ederler ve üzerine ağırlık koyarak dayanıklılık testi yaparlar.",
    steps: JSON.stringify([
      "Köprü mühendisliği kısaca anlatılır",
      "Parçalar tanıtılır",
      "Çocuk parçaları birleştirir",
      "Köprü tamamlanır",
      "Ağırlık testi yapılır ve sonuç yazılır",
    ]),
    learnings: JSON.stringify([
      "Yapı mühendisliği temelleri",
      "Denge ve ağırlık dağılımı",
      "Problem çözme",
      "Deney yapma",
      "Özgüven",
    ]),
    output: "3D köprü",
    featured: true,
    sortOrder: 9,
  },
  {
    title: "Bilgisayarsız Kodlama",
    slug: "bilgisayarsiz-kodlama",
    summary: "Komut kartlarıyla algoritmik düşünceyi bedenle öğrenme.",
    description:
      "Çocuk kartları sıraya dizer; arkadaşı bu komutları uygular. Kodlama mantığını bedeniyle öğrenir.",
    steps: JSON.stringify([
      "Yere kare grid konur",
      "Komut kartları tanıtılır",
      "Hedef belirlenir",
      "Kartlar sıraya dizilir",
      "Komutlar adım adım uygulanır",
    ]),
    learnings: JSON.stringify([
      "Algoritmik düşünce",
      "Sebep-sonuç",
      "Problem çözme",
      "Takım çalışması",
      "Programlama mantığı",
    ]),
    output: "Tamamlanmış kod, başarılı hareket",
    sortOrder: 10,
  },
  {
    title: "Denge Oyunu",
    slug: "denge-oyunu",
    summary: "Tahterevalli üzerinde ağırlık ve denge deneyi.",
    description:
      "3D baskılı tahterevallide farklı ağırlıktaki bloklarla denge kurulur. Fizik ve eşitlik kavramları pratikte öğrenilir.",
    steps: JSON.stringify([
      "Denge ve ağırlık merkezi anlatılır",
      "Bloklar tanıtılır",
      "İki tarafa blok yerleştirilir",
      "Basit dengeden karmaşık kombinasyonlara geçilir",
      "Sonuç gözlemlenir",
    ]),
    learnings: JSON.stringify([
      "Ağırlık, denge, yerçekimi",
      "Matematiksel eşitlik",
      "Problem çözme",
      "Deney yapma",
      "Sebep-sonuç",
    ]),
    output: "Dengelenmiş tahterevalli",
    sortOrder: 11,
  },
  {
    title: "Kilit Kutusu",
    slug: "kilit-kutusu",
    summary: "Farklı mekanizmalı kutuları çözerek ödül bulma.",
    description:
      "Çocuğa 3-4 farklı kilit mekanizmalı 3D baskılı kutu verilir. Mandal, mıknatıs, döndürme ve kaydırma gibi sistemleri deneyerek çözer.",
    steps: JSON.stringify([
      "Farklı sırlı kutular gösterilir",
      "Deneyerek açması istenir",
      "İlk kutuyu çözer",
      "Stratejiyi sonraki kutulara taşır",
      "Tüm kutuları açınca tamamlar",
    ]),
    learnings: JSON.stringify([
      "Problem çözme",
      "Mekanik keşif",
      "Deney yapma",
      "Sebep-sonuç",
      "Sabır ve konsantrasyon",
    ]),
    output: "Açılmış kutular + kazanılan ödüller",
    ageGroup: "5-8 yaş",
    duration: "75-90 dakika",
    sortOrder: 12,
  },
  {
    title: "Boyama Atölyesi",
    slug: "boyama-atolyesi",
    summary: "Mini 3D karakterleri kendi renklerinle boya.",
    description:
      "Çocuklara istenilen bir karakterin mini 3D baskılı versiyonu verilir. Kendi renkleriyle boyayarak kişisel bir oyuncak yaratır.",
    steps: JSON.stringify([
      "Boyanacak karakterler gösterilir",
      "Paletten renk seçilir",
      "Fırçalarla boyanır",
      "İnce detaylar tamamlanır",
      "Kurutma alanında beklenir",
    ]),
    learnings: JSON.stringify([
      "Sanat ve yaratıcılık",
      "Renk teorisi",
      "İnce motor becerisi",
      "Kendini ifade etme",
      "Özgüven",
    ]),
    output: "Mini 3D boyalı karakter",
    ageGroup: "3-8 yaş",
    duration: "60-75 dakika",
    featured: true,
    sortOrder: 13,
  },
  {
    title: "Döndürmeli Oyuncak",
    slug: "dodurmeli-oyuncak",
    summary: "Renkli halkalar ve dönen kulelerle ince motor çalışması.",
    description:
      "3D baskılı renkli halkalar spiral kuleler üzerine sıralanır. Çocuk halkaları rengine göre dizer, döndürür ve kendi tasarımını oluşturur.",
    steps: JSON.stringify([
      "Döndürme mekanizması gösterilir",
      "Renkli halkalar verilir",
      "Halkalar kuleye geçirilir",
      "Döndürme keşfedilir",
      "Kendi renk kombinasyonu oluşturulur",
    ]),
    learnings: JSON.stringify([
      "Renk tanıma ve sıralama",
      "İnce motor becerisi",
      "Denge ve stabilite",
      "Yaratıcılık",
      "Sakinleştirici aktivite",
    ]),
    output: "Kişisel renkli halka kulesi",
    sortOrder: 14,
  },
  {
    title: "Sakla-Bul Oyunu",
    slug: "sakla-bul-oyunu",
    summary: "Karakteri boya, sakla, arkadaşlarınla bul.",
    description:
      "Çocuklar 3D baskılı karakterleri boyar, sınıfta gizler ve arkadaş grubuyla saklanmış karakterleri bulmaya çalışır.",
    steps: JSON.stringify([
      "Beyaz 3D karakter verilir",
      "Renk seçilip boyanır",
      "Saklama yerleri kararlaştırılır",
      "Karakter gizlenir",
      "Grup halinde bulunur",
    ]),
    learnings: JSON.stringify([
      "Sanat ve yaratıcılık",
      "Gözlem ve konsantrasyon",
      "Uzamsal farkındalık",
      "Merak ve keşif",
      "Sosyal oyun",
    ]),
    output: "Kendi boyadığı karakter",
    sortOrder: 15,
  },
];

async function main() {
  for (const workshop of workshops) {
    await prisma.workshop.upsert({
      where: { slug: workshop.slug },
      update: workshop,
      create: workshop,
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      email: "info@lilyum.com",
      phone: "",
      instagram: "@lilyumbaskiatolyesi",
      address: "",
      about:
        "Lilyum Baskı Atölyesi; okullarda öğrenmeyi oyunla birleştiren atölyeler düzenler ve 3D yazıcıyla kişiye özel ürünler üretir. Sloganımız: Düşle, Tasarla, Şekillendir.",
    },
  });

  console.log(`Seeded ${workshops.length} workshops`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

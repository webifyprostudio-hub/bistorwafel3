import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, Star, Instagram, Facebook, Utensils, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';

const MENU = {
  Pizza: [
    { name: "Margherita", desc: "pomidory San Marzano, Mozzarella, bazylia", price: "28 zł" },
    { name: "Americana", desc: "j.w. + frytki", price: "35 zł" },
    { name: "Ruccolina", desc: "Prosciutto Crudo, rukola, pomidorki", price: "33 zł" },
    { name: "Salami", desc: "Salami, Mozzarella", price: "33 zł" },
    { name: "Quattro Formaggi", desc: "Gorgonzola, Mascarpone", price: "35 zł" },
    { name: "Bianca", desc: "Cukinia, Salami", price: "35 zł" },
    { name: "Prosciutto", desc: "szynka Prosciutto Cotto", price: "33 zł" },
    { name: "Diavola 🌶", desc: "Salami Picante", price: "33 zł" },
    { name: "Inferno 🌶🌶🌶", desc: "jalapeno, Carolina Reaper 720 000 SHU", price: "33 zł" },
    { name: "Capriciosa", desc: "pieczarki, szynka", price: "33 zł" },
    { name: "Tono Bianca", desc: "tuńczyk, oliwki", price: "35 zł" },
    { name: "Tono Rosso", desc: "tuńczyk, pomidory", price: "35 zł" },
    { name: "Tartufata", desc: "krem z czarnej trufli, pieczarki", price: "39 zł" },
    { name: "Buratina", desc: "ser Buratta, Prosciutto, balsamiczny", price: "45 zł" },
  ],
  Burgery: [
    { name: "Baby Burger", desc: "wołowina, sałata, cheddar", price: "17 zł" },
    { name: "Chicken Burger", desc: "panierowana pierś, sałata", price: "17 zł" },
    { name: "Firmowy", desc: "wołowina, cheddar, sos firmowy", price: "28 zł" },
    { name: "Firmowy na Ostro 🌶", desc: "wołowina, jalapeno", price: "28 zł" },
    { name: "Chicken Combo", desc: "2x pierś kurczaka", price: "24 zł" },
    { name: "Mamut", desc: "2x wołowina, cheddar", price: "39 zł" },
    { name: "Mamut na Ostro 🌶", desc: "2x wołowina, jalapeno", price: "39 zł" },
  ],
  Panuozzo: [
    { name: "Panuozzo Cotto", desc: "Prosciutto Cotto, Buratta, rukola", price: "25 zł" },
    { name: "Panuozzo Crudo", desc: "Prosciutto Crudo, Buratta, rukola", price: "28 zł" },
    { name: "Panuozzo Salami", desc: "Salami, Buratta, rukola", price: "25 zł" },
    { name: "Panuozzo Salami Picante 🌶", desc: "", price: "25 zł" },
    { name: "Panuozzo Caprese", desc: "pomidor, rukola, balsamiczny", price: "25 zł" },
  ],
  Zestawy: [
    { name: "Nuggetsy z frytkami (6szt)", desc: "", price: "20 zł" },
    { name: "Fingersy z frytkami (3szt)", desc: "", price: "22 zł" },
    { name: "Stripsy z frytkami (3szt)", desc: "", price: "26 zł" },
    { name: "Skrzydełka z frytkami (6szt)", desc: "", price: "27 zł" },
    { name: "Chicken Burger z frytkami", desc: "", price: "24 zł" },
    { name: "Chicken Combo z frytkami", desc: "", price: "31 zł" },
    { name: "Firmowy Burger z frytkami", desc: "", price: "35 zł" },
    { name: "Firmowy na Ostro z frytkami", desc: "", price: "35 zł" },
    { name: "Mamut z frytkami", desc: "", price: "45 zł" },
    { name: "Mamut na Ostro z frytkami", desc: "", price: "45 zł" },
  ],
  Zapiekanki: [
    { name: "Zapiekanka Classic", desc: "bagietka, ser, pieczarki, ketchup", price: "12 zł" },
    { name: "Zapiekanka Farmera", desc: "bagietka, kiełbasa, cebula, ser", price: "17 zł" },
  ],
  Przekąski: [
    { name: "Frytki Małe", desc: "", price: "9 zł" },
    { name: "Frytki Duże", desc: "", price: "10 zł" },
    { name: "Frytki Special", desc: "majonez, sos curry, cebula", price: "14 zł" },
    { name: "Frytki z Batata", desc: "", price: "14 zł" },
    { name: "Płatki Ziemniaczane", desc: "", price: "12 zł" },
    { name: "Płatki Ziemniaczane z DIP curry", desc: "", price: "14 zł" },
    { name: "Krążki Cebulowe (10szt)", desc: "", price: "10 zł" },
    { name: "Chipsy Krewetkowe", desc: "sos słodko-pikantny", price: "10 zł" },
  ],
  "Hot-dogi": [
    { name: "Hot Dog z Parówką", desc: "", price: "10 zł" },
    { name: "Hot Dog z Parówką XL", desc: "", price: "14 zł" },
    { name: "Hot Dog z Kabanosem", desc: "", price: "13 zł" },
    { name: "Hot Dog z Kabanosem XL", desc: "", price: "15 zł" },
    { name: "Hot Dog Amerykański", desc: "pomidor, sałata, cebula prażona", price: "16 zł" },
  ],
  Gofry: [
    { name: "Gofrytki z cukrem pudrem lub polewą", desc: "", price: "12 zł" },
    { name: "Gofrytki z bitą śmietaną", desc: "", price: "15 zł" },
    { name: "Gofr z Cukrem Pudrem", desc: "", price: "9 zł" },
    { name: "Gofr z Polewą (czekoladowa/owocowa/toffi)", desc: "", price: "10 zł" },
    { name: "Gofr z Frużeliną", desc: "", price: "12 zł" },
    { name: "Gofr z Owocami", desc: "", price: "12 zł" },
    { name: "Gofr z Bitą Śmietaną", desc: "", price: "12 zł" },
    { name: "Gofr z Nutellą", desc: "", price: "12 zł" },
    { name: "Gofr z Nutellą i Bananem", desc: "", price: "15 zł" },
    { name: "Gofr Firmowy", desc: "bita śmietana, polewa, owoce", price: "16 zł" },
    { name: "Fruit Bubble", desc: "bita śmietana, żelowe kulki owocowe", price: "16 zł" },
  ],
  Desery: [
    { name: "Lody (1 gałka)", desc: "", price: "7 zł" },
    { name: "Koktajl Bananowy", desc: "", price: "15 zł" },
    { name: "Koktajl Brzoskwiniowy", desc: "", price: "18 zł" },
    { name: "Affogato na Bogato", desc: "espresso, 2 gałki, bita śmietana", price: "24 zł" },
    { name: "Deser Dnia", desc: "zapytaj w barze", price: "" },
  ],
  "Kawa Gorąca": [
    { name: "Espresso", desc: "", price: "8 zł" },
    { name: "Espresso Doppio", desc: "", price: "10 zł" },
    { name: "Espresso Macchiato", desc: "", price: "10 zł" },
    { name: "Espresso con Panna", desc: "", price: "11 zł" },
    { name: "Americano", desc: "", price: "10 zł" },
    { name: "Lungo", desc: "", price: "10 zł" },
    { name: "Flat White", desc: "", price: "10 zł" },
    { name: "Cappuccino", desc: "", price: "10 zł" },
    { name: "Cappuccino Duże", desc: "", price: "12 zł" },
    { name: "Latte Macchiato", desc: "", price: "12 zł" },
    { name: "Kawa Rozpuszczalna", desc: "", price: "9 zł" },
    { name: "Kawa Parzona", desc: "", price: "9 zł" },
    { name: "Kakao", desc: "", price: "9 zł" },
    { name: "Herbata", desc: "", price: "9 zł" },
  ],
  "Kawa Zimna": [
    { name: "Affogato na Bogato", desc: "espresso, 2 gałki loda, bita śmietana", price: "24 zł" },
    { name: "Kawa Mrożona", desc: "espresso, mleko, lód, lody, bita śmietana", price: "24 zł" },
    { name: "Cappuccino Fredo", desc: "", price: "15 zł" },
    { name: "Cappuccino Ice", desc: "", price: "15 zł" },
    { name: "Iced Latino", desc: "espresso, zimna mleczna pianka", price: "15 zł" },
    { name: "Iced Latino z Gałką Loda", desc: "", price: "20 zł" },
  ],
  Napoje: [
    { name: "Cola / Fanta / Sprite 0,25", desc: "", price: "8 zł" },
    { name: "Cola / Fanta / Sprite 0,5", desc: "", price: "9 zł" },
    { name: "Sok Cappy 0,33", desc: "", price: "8 zł" },
    { name: "Woda 0,33/0,5", desc: "", price: "6 zł" },
    { name: "Sok Pomidorowy", desc: "", price: "6 zł" },
    { name: "Tymbark/Frugo", desc: "", price: "8 zł" },
    { name: "Pellegrino (cytryna/pomarańcza)", desc: "", price: "12 zł" },
  ],
};

const REVIEWS = [
  { text: "Nigdzie nie jadłem lepszych burgerów. Hot-dogi też nie mają sobie równych.", author: "Piotr Kacprzak" },
  { text: "Rewelacyjne miejsce, zawsze świeże i smaczne. Wracam regularnie!", author: "Zadowolony Klient" },
  { text: "Najlepsze gofry w okolicy i świetna kawa. Polecam każdemu!", author: "Stały Klient" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Pizza");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-bistro-dark text-bistro-light font-sans layout-overflow-x-hidden selection:bg-bistro-gold selection:text-bistro-dark">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bistro-charcoal/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold text-bistro-light tracking-wide cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Utensils className="text-bistro-gold hidden sm:block" size={24} />
            Bistro <span className="text-bistro-gold italic">Wafel</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="#o-nas" className="hover:text-bistro-gold transition-colors">O Nas</a>
            <a href="#menu" className="hover:text-bistro-gold transition-colors">Menu</a>
            <a href="#lokalizacje" className="hover:text-bistro-gold transition-colors">Lokalizacje</a>
          </nav>
          <a href="tel:601545556" className="hidden sm:flex items-center gap-2 border border-bistro-gold text-bistro-gold px-5 py-2 rounded-sm hover:bg-bistro-gold hover:text-black transition-all text-sm uppercase tracking-widest font-semibold">
            <Phone size={16} /> Zadzwoń
          </a>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bistro-dark/60 via-bistro-dark/80 to-bistro-dark z-10" />
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" 
            alt="Pyszna, aromatyczna pizza"
            className="w-full h-full object-cover scale-105 transform hover:scale-100 transition-transform duration-[20s]"
          />
        </div>

        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-28 right-6 z-20 flex items-center gap-2 bg-bistro-gold/10 backdrop-blur-md px-3 py-1 rounded-sm border border-bistro-gold text-bistro-gold text-[10px] sm:text-xs uppercase tracking-widest font-medium"
        >
          <Star className="text-bistro-gold fill-current" size={16} />
          4,9/5 · 251 opinii Google
        </motion.div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif italic leading-tight mb-8"
          >
            Najlepsze Jedzenie<br/>
            w <span className="text-bistro-gold italic font-light">Ostrzeszowie.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-bistro-light/80 font-light max-w-3xl mx-auto mb-12"
          >
            Pizza, burgery, gofry, hot-dogi i kawa — świeże, z pasją, dla każdego.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="tel:601545556" className="w-full sm:w-auto bg-bistro-gold text-black px-8 py-4 rounded-sm text-sm border-none uppercase tracking-wider font-bold hover:bg-bistro-gold-hover transition-colors flex items-center justify-center gap-3">
              <Phone size={18} /> Zadzwoń: 601 545 556
            </a>
            <button onClick={scrollToMenu} className="w-full sm:w-auto border border-bistro-gold text-bistro-gold px-8 py-4 rounded-sm text-sm uppercase tracking-wider font-semibold hover:bg-bistro-gold hover:text-black transition-all">
              Zobacz Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <div className="bg-bistro-charcoal border-y border-bistro-light/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-6 text-sm text-bistro-light/70 font-medium">
          <div className="flex items-center gap-2"><Star className="text-bistro-gold fill-current" size={16} /> 4,9/5 Google (251 opinii)</div>
          <div className="flex items-center gap-2"><MapPin className="text-bistro-gold" size={16} /> Kąpielowa 4A Ostrzeszów</div>
          <div className="flex items-center gap-2"><Clock className="text-bistro-gold" size={16} /> Pon-Pt 9:30–21:30, Sob-Nd 8:00–21:30</div>
          <div className="flex items-center gap-2"><Phone className="text-bistro-gold" size={16} /> 601 545 556</div>
        </div>
      </div>

      {/* 3. O NAS */}
      <section id="o-nas" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative aspect-[4/5] rounded-sm border border-white/10 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-bistro-dark/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" 
              alt="Pyszny burger" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">
              Nie Tylko Jedzenie.<br/>
              <span className="text-bistro-gold italic font-light">To Doświadczenie.</span>
            </h2>
            <div className="w-16 h-px bg-bistro-gold" />
            <p className="text-lg md:text-xl text-bistro-light/70 font-light leading-relaxed max-w-xl">
              Bistro Wafel to miejsce gdzie każdy znajdzie coś dla siebie. Tworzymy pizzę, burgery, hot-dogi, gofry i kawę z najlepszych składników — świeże, smaczne i w dobrej cenie. Odwiedź nas i przekonaj się sam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. NASZE MENU */}
      <section id="menu" className="py-24 md:py-32 bg-bistro-charcoal border-y border-white/10 relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic mb-6">
              Nasze <span className="text-bistro-gold italic font-light">Menu</span>
            </h2>
            <p className="text-xs text-bistro-gold/70 font-bold tracking-[0.2em] uppercase">Coś dla każdego — od pizzy po gofry</p>
          </motion.div>

          {/* Menu Tabs */}
          <div className="mb-16 overflow-x-auto pb-4 no-scrollbar border-b border-white/10">
            <div className="flex gap-8 whitespace-nowrap min-w-max px-2">
              {Object.keys(MENU).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`text-sm uppercase tracking-[0.15em] font-semibold pb-4 relative transition-colors ${activeTab === category ? 'text-bistro-gold' : 'text-bistro-light/50 hover:text-bistro-light'}`}
                >
                  {category}
                  {activeTab === category && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-bistro-gold"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-x-16 gap-y-10"
              >
                {MENU[activeTab as keyof typeof MENU].map((item, index) => (
                  <div key={index} className="flex justify-between items-start group">
                    <div className="flex-1 pr-6">
                      <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-bistro-gold transition-colors">{item.name}</h3>
                      {item.desc && (
                        <p className="text-xs text-bistro-light/50 font-light leading-snug">{item.desc}</p>
                      )}
                    </div>
                    <div className="text-lg font-bold text-bistro-gold whitespace-nowrap self-start mt-0">
                      {item.price}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. OPINIE */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bistro-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic mb-10">
              Co Mówią <span className="text-bistro-gold italic font-light">Nasi Klienci</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {REVIEWS.map((review, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/5 p-8 rounded-sm hover:-translate-y-1 transition-transform border border-bistro-gold/10">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={18} className="text-bistro-gold fill-current" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed mb-6 text-bistro-light/70">"{review.text}"</p>
                <div className="text-[10px] tracking-widest uppercase text-bistro-light/50 font-semibold">— {review.author}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center text-bistro-light/60 text-sm tracking-[0.2em] uppercase">
            4,9/5 w Google · 251 opinii · Dwie lokalizacje
          </div>
        </div>
      </section>

      {/* 6. LOKALIZACJE */}
      <section id="lokalizacje" className="py-24 md:py-32 bg-bistro-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic">
              Znajdź <span className="text-bistro-gold italic font-light">Nas</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-bistro-dark p-12 rounded-sm border border-bistro-light/10 flex flex-col items-center text-center group hover:border-bistro-gold/20 transition-all"
            >
              <div className="w-16 h-16 rounded-sm border border-bistro-gold/50 flex items-center justify-center mb-8 text-bistro-gold group-hover:bg-bistro-gold group-hover:text-black transition-colors">
                <MapPin size={24} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Ostrzeszów</h3>
              <p className="text-bistro-light/70 font-light mb-2">ul. Kąpielowa 4A</p>
              <p className="text-bistro-gold font-semibold mb-10 flex items-center gap-2"><Phone size={16}/> 601 545 556</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Bistro+Wafel+Ostrzeszow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-bistro-gold text-bistro-gold px-8 py-3 rounded-sm text-sm uppercase tracking-wider hover:bg-bistro-gold hover:text-black transition-all">
                <Navigation size={16} /> Wyznacz Trasę
              </a>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-bistro-dark p-12 rounded-sm border border-bistro-light/10 flex flex-col items-center text-center group hover:border-bistro-gold/20 transition-all"
            >
              <div className="w-16 h-16 rounded-sm border border-bistro-gold/50 flex items-center justify-center mb-8 text-bistro-gold group-hover:bg-bistro-gold group-hover:text-black transition-colors">
                <MapPin size={24} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Kobyla Góra</h3>
              <p className="text-bistro-light/70 font-light mb-2">Plac Wiosny Ludów 18</p>
              <p className="text-bistro-gold font-semibold mb-10 flex items-center gap-2"><Phone size={16}/> 601 545 556</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Bistro+Wafel+Kobyla+Gora" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-bistro-gold text-bistro-gold px-8 py-3 rounded-sm text-sm uppercase tracking-wider hover:bg-bistro-gold hover:text-black transition-all">
                <Navigation size={16} /> Wyznacz Trasę
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="relative py-32 overflow-hidden bg-bistro-gold flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop')] mix-blend-overlay opacity-20 bg-cover bg-center" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-6xl md:text-8xl font-serif italic text-black mb-4 tracking-tight"
          >
            Głodny?
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-5xl font-serif italic text-black/80 mb-12"
          >
            Zadzwoń i zarezerwuj stolik.
          </motion.div>
          
          <motion.a 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            href="tel:601545556" 
            className="inline-flex items-center gap-4 bg-[#0A0A0A] text-bistro-gold px-12 py-6 rounded-sm text-sm md:text-base uppercase tracking-wider font-bold border border-transparent hover:bg-black hover:border-bistro-gold transition-all"
          >
            <Phone size={24} /> Zadzwoń Teraz — 601 545 556
          </motion.a>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-bistro-dark pt-24 pb-12 border-t border-bistro-light/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-bistro-light/10 pb-12 mb-12">
            
            <div className="text-3xl font-serif font-bold cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              Bistro <span className="text-bistro-gold italic">Wafel</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-8 text-sm uppercase tracking-widest font-semibold text-bistro-light/70">
              <a href="#menu" className="hover:text-bistro-gold transition-colors">Menu</a>
              <a href="#lokalizacje" className="hover:text-bistro-gold transition-colors">Lokalizacje</a>
              <a href="tel:601545556" className="hover:text-bistro-gold transition-colors">Zadzwoń</a>
            </nav>

            <div className="flex gap-6">
              <a href="https://www.facebook.com/BistroWafel" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-sm border border-bistro-gold flex items-center justify-center text-bistro-gold hover:bg-bistro-gold hover:text-black transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/bistrowafel" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-sm border border-bistro-gold flex items-center justify-center text-bistro-gold hover:bg-bistro-gold hover:text-black transition-all">
                <Instagram size={20} />
              </a>
            </div>

          </div>
          
          <div className="text-center text-sm font-light text-bistro-light/40 tracking-wider">
            © 2025 Bistro Wafel. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>

    </div>
  );
}


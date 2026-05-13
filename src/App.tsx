import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download, 
  ArrowRight, 
  Menu, 
  X,
  Instagram,
  Eye,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Zap,
  Search,
  Cpu,
  Layout,
  Image as ImageIcon,
  PenTool,
  Brush,
  FileText,
  Presentation
} from 'lucide-react';

// --- Data ---
const PROJECTS = [
  { 
    id: 13, 
    title: '7 Dates - Kurma Susu Social Media Feed', 
    category: 'Instagram Feed Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/1_escnjv',
    link: 'https://www.behance.net/gallery/247998375/7-Dates-Kurma-Susu',
    tags: ['Instagram', 'Social Media', 'Feed']
  },
  { 
    id: 14, 
    title: '7 Dates - Healthy Milk Series', 
    category: 'Instagram Feed Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/2_e73mwj',
    link: 'https://www.behance.net/gallery/247998375/7-Dates-Kurma-Susu',
    tags: ['Branding', 'Layout', 'Visual']
  },
  { 
    id: 15, 
    title: '7 Dates - Juice Kurma Collection', 
    category: 'Instagram Feed Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/3_joaegi',
    link: 'https://www.behance.net/gallery/247997399/7-Dates-Juice-Kurma',
    tags: ['Juice', 'Marketing', 'Creative']
  },
  { 
    id: 10, 
    title: 'Company Profile Website DPD KOMNAS PPLH KARAWANG', 
    category: 'UI/UX Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/project_pplh_karawang.png',
    link: 'https://www.behance.net/gallery/247685267/Webiste-DPD-Komnas-PPLH-Karawang',
    tags: ['React', 'Tailwind', 'Responsive']
  },
  { 
    id: 11, 
    title: 'Responsive Website OT REWORK ID', 
    category: 'UI/UX Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/project_ot_rework.png',
    link: 'https://www.behance.net/gallery/247685193/Website-OT-Rework-ID',
    tags: ['Framer', 'Motion', 'Responsive']
  },
  { 
    id: 12, 
    title: 'Portfolio Website Raka Portfolio', 
    category: 'UI/UX Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/project_portfolio_raka.png',
    link: 'https://www.behance.net/gallery/247685015/Website-Portfolio-Design',
    tags: ['Portfolio', 'Creative', 'Minimal']
  },
  { 
    id: 1, 
    title: 'Design UI/UX Website SMAN 1 Karawang', 
    category: 'UI/UX Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_1.jpg',
    link: 'https://www.behance.net/gallery/174706483/Design-UIUX-Website-SMAN-1-Karawang',
    tags: ['Figma', 'UI/UX', 'Web Design']
  },
  { 
    id: 2, 
    title: 'Desk Calendar Design Disparpora Kab Karawang', 
    category: 'Graphic Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_2.jpg',
    link: 'https://www.behance.net/gallery/243798881/Desk-Calender-Design-Disparpora-Kab-Karawang',
    tags: ['Photoshop', 'Branding', 'Print']
  },
  { 
    id: 3, 
    title: 'Design Calendar Disparpora Kab Karawang', 
    category: 'Graphic Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_3.jpg',
    link: 'https://www.behance.net/gallery/243799909/Design-Calender-Disparpora-Kab-Karawang',
    tags: ['Photoshop', 'Illustrator', 'Print']
  },
  { 
    id: 4, 
    title: 'Rains Collagen Design Packaging', 
    category: 'Packaging Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_4.jpg',
    link: 'https://www.behance.net/gallery/181341921/Rains-Collagen-Design-Packaging',
    tags: ['Packaging', 'Branding', 'Illustrator']
  },
  { 
    id: 5, 
    title: 'Design Packaging Premium Rice Karawang', 
    category: 'Packaging Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_5.jpg',
    link: 'https://www.behance.net/gallery/180671887/DESIGN-PACKAGING-PREMIUM-RICE-KARAWANG',
    tags: ['Packaging', 'Branding', 'Corel Draw']
  },
  { 
    id: 6, 
    title: 'Potato Chips Design Packaging', 
    category: 'Packaging Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_6.jpg',
    link: 'https://www.behance.net/gallery/182325949/Potato-Chips-Design-Packaging-For-Sumbition-Mr-Potato',
    tags: ['Packaging', 'Branding', 'Photoshop']
  },
  { 
    id: 7, 
    title: 'Sribufood Restaurant Design Food Packaging', 
    category: 'Packaging Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_7.jpg',
    link: 'https://www.behance.net/gallery/191949523/Sribufood-Restaurant-Design-Food-Packaging',
    tags: ['Packaging', 'Branding', 'Illustrator']
  },
  { 
    id: 8, 
    title: 'Design of Health Supplement Products', 
    category: 'Packaging Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_8.jpg',
    link: 'https://www.behance.net/gallery/224634539/Design-of-health-supplement-products-for-exercising',
    tags: ['Packaging', 'Branding', 'Photoshop']
  },
  { 
    id: 9, 
    title: 'Design Packaging Foodbox Sribu', 
    category: 'Packaging Design', 
    image: 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_9.jpg',
    link: 'https://www.behance.net/gallery/180430355/Desig-Packaging-Foodbox-Srbu',
    tags: ['Packaging', 'Branding', 'Illustrator']
  },
];

const PROFILE_IMAGES = [
  "https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/foto.png",
];

const CV_IMAGES = [
  "https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/cv_1.jpg",
  "https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/cv_2.jpg",
  "https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/cv_4.jpg",
  "https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/cv_3.jpg",
];

// --- Components ---

const BehanceIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12h2a2.1 2.1 0 1 1 0 4H9V8h2a2.1 2.1 0 1 1 0 4" />
    <path d="M9 12v4" />
    <path d="M14 12.12c.5-.3 1.15-.5 1.88-.5 1.72 0 3.12 1.3 3.12 3s-1.4 3-3.12 3c-1.72 0-3.12-1.3-3.12-3v-4.38" />
    <path d="M14 15.5h6" />
    <path d="M15 8h4" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="#25D366"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Navbar = ({ currentView, onNavigate }: { currentView: string, onNavigate: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || currentView !== 'home' ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 md:py-4' : 'bg-transparent py-5 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="text-xl md:text-2xl font-display font-extrabold tracking-tighter">
          RAKA<span className="text-blue-600">.</span>
        </button>
        
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={`text-sm font-semibold transition-colors ${currentView === item.id ? 'text-blue-600' : 'hover:text-blue-600'}`}
            >
              {item.name}
            </button>
          ))}
          <a href="https://wa.me/6285155054880" target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-600 transition-all">
            Let's Talk
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden flex flex-col space-y-4"
          >
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id)} 
                className={`text-lg font-bold text-left ${currentView === item.id ? 'text-blue-600' : ''}`}
              >
                {item.name}
              </button>
            ))}
            <a 
              href="https://wa.me/6285155054880" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsOpen(false)}
              className="bg-gray-900 text-white px-6 py-3 rounded-full text-center font-bold hover:bg-blue-600 transition-all mt-4"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProfileSlideshow = ({ className = "" }: { className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (PROFILE_IMAGES.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROFILE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={PROFILE_IMAGES[index]}
          src={PROFILE_IMAGES[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full object-cover absolute inset-0"
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/foto.png';
          }}
        />
      </AnimatePresence>
    </div>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center lg:text-left"
      >
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-green-100">
          <CheckCircle2 className="w-3.5 h-3.5 md:w-4 h-4 text-green-500" />
          <span>Available for Hire</span>
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-8 md:mb-10">
          Hello, I am <br />
          <span className="text-blue-600">Raka Yanuar Firdaus</span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8">
          <button 
            onClick={() => onNavigate('work')} 
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all flex items-center justify-center group"
          >
            View My Work
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center space-x-6">
            <a href="https://www.instagram.com/raka_yanuar/?hl=en" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="https://www.behance.net/rakayanuarf" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><BehanceIcon /></a>
            <a href="https://www.linkedin.com/in/raka-yanuar-f-6a6928205/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative px-4 sm:px-10 lg:px-0"
      >
        <ProfileSlideshow className="aspect-square rounded-[32px] sm:rounded-[40px] shadow-2xl rotate-2 lg:rotate-3 bg-gray-100 max-w-md mx-auto lg:max-w-none" />
        <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 -rotate-2 lg:-rotate-3">
          <p className="text-[10px] sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Experience</p>
          <p className="text-xl sm:text-3xl font-display font-extrabold text-gray-900">3+ Years</p>
        </div>
      </motion.div>
    </div>
    
    {/* Background Elements */}
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-blue-50/20 -z-10 rounded-l-[50px] lg:rounded-l-[100px] hidden sm:block" />
  </section>
);

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  const allTags = [...new Set(PROJECTS.flatMap(p => p.tags))].sort();
  
  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));

  const nextProject = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [activeFilter]);

  // Auto-play slideshow (10 seconds)
  useEffect(() => {
    if (filteredProjects.length <= 1) return;
    const timer = setInterval(() => {
      nextProject();
    }, 10000);
    return () => clearInterval(timer);
  }, [nextProject, filteredProjects.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  const project = filteredProjects[currentIndex];

  return (
    <section id="work" className="py-32 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 lg:mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-[10px] md:text-sm font-bold text-blue-400 uppercase tracking-[0.3em] mb-4">Graphic Designer - UI/UX Designer - IT Support</h2>
            <p className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight">Showcasing Creativity.</p>
          </div>
          <p className="text-gray-400 max-w-xs text-center md:text-right hidden sm:block">
            A collection of projects that define my approach to design and problem solving.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col items-center gap-8 mb-12 md:mb-20">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeFilter === cat 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
            <span className="w-full text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Filter by Skill</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 md:px-4 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  activeFilter === tag 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-lg' 
                    : 'bg-gray-800/30 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="relative px-4 md:px-20">
          <div className="relative min-h-[500px] md:min-h-[650px] flex items-center justify-center">
            {filteredProjects.length > 0 ? (
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`${activeFilter}-${currentIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.4 }
                  }}
                  className="w-full max-w-4xl"
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer block"
                  >
                    <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden bg-gray-800 mb-8 shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 border border-gray-800">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (project.id === 9 && !target.src.includes('gambar_9.jpg')) {
                            target.src = 'https://res.cloudinary.com/dfa5fy1hh/image/upload/f_auto,q_auto/portfolio_migration/gambar_9.jpg';
                          }
                        }}
                      />
                      {/* Enhanced Fade-in Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 backdrop-blur-[4px]">
                        <div className="text-center">
                          <p className="text-blue-400 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            {project.category}
                          </p>
                          <h4 className="text-white text-2xl md:text-4xl font-display font-extrabold mb-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            {project.title}
                          </h4>
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full text-gray-900 shadow-2xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 delay-200">
                            <ZoomIn className="w-8 h-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center transform transition-all duration-500 group-hover:-translate-y-2">
                      <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3 transition-colors group-hover:text-blue-300">{project.category}</p>
                      <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-6 transition-colors group-hover:text-blue-500">{project.title}</h3>
                      <div className="flex flex-wrap justify-center gap-3">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-4 py-2 bg-gray-800 text-gray-400 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 italic">No projects found in this category.</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {filteredProjects.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10 px-2 md:px-0">
              <button 
                onClick={prevProject}
                className="w-10 h-10 md:w-16 md:h-16 bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-xl md:rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 transition-all pointer-events-auto border border-gray-700 group"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={nextProject}
                className="w-10 h-10 md:w-16 md:h-16 bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-xl md:rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 transition-all pointer-events-auto border border-gray-700 group"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Indicators */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-blue-500' : 'w-3 bg-gray-700 hover:bg-gray-600'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Infinite Scrolling Slider */}
      <div className="relative py-20 bg-gray-900/50 border-y border-gray-800">
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [-2000, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...PROJECTS, ...PROJECTS, ...PROJECTS].map((project, idx) => (
              <div 
                key={`${project.id}-${idx}`}
                onClick={() => setSelectedProject(project)}
                className="w-64 md:w-80 flex-shrink-0 group relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-800 cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">{project.category}</p>
                  <h4 className="text-white font-bold text-sm truncate">{project.title}</h4>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-[40px] overflow-hidden shadow-2xl border border-gray-800 flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Section */}
              <div className="lg:w-2/3 relative aspect-video lg:aspect-auto">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Section */}
              <div className="lg:w-[35%] p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-gray-900 overflow-y-auto min-h-0">
                <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3">
                  {selectedProject.category}
                </p>
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/title"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-extrabold text-white mb-6 leading-[1.1] break-words group-hover/title:text-blue-400 transition-colors flex items-center gap-3">
                    {selectedProject.title}
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover/title:opacity-100 transition-all -translate-y-1" />
                  </h3>
                </a>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all group shadow-lg shadow-blue-500/20 text-sm md:text-base whitespace-nowrap"
                >
                  View Live Project
                  <ExternalLink className="ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  const [showCV, setShowCV] = useState(false);
  const [cvIndex, setCvIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const nextCV = () => {
    setCvIndex((prev) => (prev + 1) % CV_IMAGES.length);
    setZoom(1); // Reset zoom on page change
  };
  const prevCV = () => {
    setCvIndex((prev) => (prev - 1 + CV_IMAGES.length) % CV_IMAGES.length);
    setZoom(1); // Reset zoom on page change
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showCV) {
      interval = setInterval(() => {
        nextCV();
      }, 10000); // 10 seconds slideshow
    }
    return () => clearInterval(interval);
  }, [showCV, cvIndex]);

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative px-4 sm:px-12 md:px-0"
          >
            <ProfileSlideshow className="aspect-[4/5] rounded-[32px] md:rounded-[48px] shadow-2xl bg-gray-100 max-w-md mx-auto md:max-w-none" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600 rounded-[40px] -z-10 hidden lg:block opacity-10"></div>
          </motion.div>
          
          <div className="text-center md:text-left">
            <h2 className="text-[10px] md:text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-6">About Me</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-8 leading-[1.2]">
              Graphic Designer <br />
              UI/UX Designer <br />
              <span className="text-blue-600">& IT Support</span>.
            </p>
            <div className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed space-y-4 max-w-2xl mx-auto md:mx-0">
              <p>
                Hi, I'm Raka, a professional Graphic Designer, UI/UX Designer, and IT Support specialist. I am a graduate of S1 Informatics Engineering from the University of Singaperbangsa Karawang (2020) with over 3 years of experience in these fields.
              </p>
              <p>
                My ability to work both independently and as part of a team, coupled with strong adaptability and time management skills, allows me to excel in dynamic environments.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-8 mb-12">
              <div>
                <p className="text-3xl font-display font-extrabold text-gray-900">3+</p>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Years Experience</p>
              </div>
              <button 
                onClick={() => {
                  setShowCV(true);
                  setZoom(1);
                  setCvIndex(0);
                }}
                className="flex items-center space-x-3 px-8 py-4 bg-white border border-gray-200 rounded-full font-bold hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                <Eye className="w-5 h-5" />
                <span>View Full CV</span>
              </button>
            </div>
          </div>
        </div>

        {/* CV Modal */}
        <AnimatePresence>
          {showCV && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setShowCV(false)}
            >
              {/* Controls Bar */}
              <div className="absolute top-6 right-6 flex items-center space-x-6 z-[210]">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(0.5, prev - 0.25)); }}
                    className="text-white hover:text-blue-400 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-white text-xs font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(3, prev + 0.25)); }}
                    className="text-white hover:text-blue-400 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  className="text-white hover:text-red-400 transition-colors"
                  onClick={() => setShowCV(false)}
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="relative max-w-5xl w-full h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={prevCV}
                  className="absolute left-0 lg:-left-24 p-4 text-white/50 hover:text-white transition-all hover:scale-110 z-[210]"
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>

                <div className="w-full h-full relative overflow-hidden rounded-2xl bg-white/5 flex items-center justify-center cursor-grab active:cursor-grabbing">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={CV_IMAGES[cvIndex]}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: zoom }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={CV_IMAGES[cvIndex]}
                        className="max-w-full max-h-full object-contain shadow-2xl"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button 
                  onClick={nextCV}
                  className="absolute right-0 lg:-right-24 p-4 text-white/50 hover:text-white transition-all hover:scale-110 z-[210]"
                >
                  <ChevronRight className="w-12 h-12" />
                </button>

                {/* Progress Bar */}
                <div className="absolute -bottom-12 left-0 right-0 flex flex-col items-center space-y-4">
                  <div className="flex space-x-2">
                    {CV_IMAGES.map((_, i) => (
                      <div 
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === cvIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">
                    Page {cvIndex + 1} of {CV_IMAGES.length} • Auto-sliding every 10s
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Experience & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-32">
        {/* Work Experience */}
        <div>
          <h3 className="text-3xl font-display font-bold text-gray-900 mb-12 flex items-center">
            <span className="w-8 h-1 bg-blue-600 mr-4"></span>
            Work Experience
          </h3>
          <div className="relative pl-8 border-l-2 border-gray-200 space-y-12">
            {[
              {
                year: "2022 — 2025",
                company: "CV Syamjaya Palugada Nusantara",
                role: "Graphic Designer",
                desc: "Responsible for creating visual materials (logos, banners, social media content, etc.) and UI/UX design elements."
              },
              {
                year: "2021 — 2025",
                company: "HK Motorworks West Cikampek",
                role: "Graphic Designer | IT Support",
                desc: "Created branded merchandise, managed documentation, and provided IT support."
              },
              {
                year: "2024 — 2025",
                company: "Kementerian Perhubungan",
                role: "Graphic Designer",
                desc: "Designed materials for leadership meetings, presentation templates, and website UI/UX interfaces."
              },
              {
                year: "2021 — 2022",
                company: "Dinas Pekerjaan Umum",
                role: "Staff | IT Support",
                desc: "Digitized paper archives, provided technical support for software/hardware, and upgraded components."
              }
            ].map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full -left-[41px] top-1.5 z-10"></div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{exp.year}</p>
                <h4 className="text-xl font-bold text-gray-900">{exp.company}</h4>
                <p className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{exp.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Applications */}
        <div className="space-y-16">
          {/* Skills */}
          <div>
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-12 flex items-center">
              <span className="w-8 h-1 bg-blue-600 mr-4"></span>
              Core Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "Creative & Innovative", icon: Lightbulb },
                { name: "High Integrity", icon: ShieldCheck },
                { name: "Adaptable & Quick Learner", icon: Zap },
                { name: "Strategic Researcher", icon: Search },
                { name: "IT Support Specialist", icon: Cpu },
                { name: "Design Principles", icon: Layout }
              ].map((skill) => (
                <div key={skill.name} className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:border-blue-600 transition-colors">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <skill.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-700 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-12 flex items-center">
              <span className="w-8 h-1 bg-blue-600 mr-4"></span>
              Applications
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Figma", icon: Layout },
                { name: "Adobe Photoshop", icon: ImageIcon },
                { name: "Adobe Illustrator", icon: PenTool },
                { name: "Corel Draw", icon: Brush },
                { name: "MS Word", icon: FileText },
                { name: "MS Power Point", icon: Presentation }
              ].map((app) => (
                <div key={app.name} className="flex items-center px-5 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors group">
                  <app.icon className="w-4 h-4 mr-2.5 text-blue-400 group-hover:text-white transition-colors" />
                  {app.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};


const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [btnText, setBtnText] = useState("Send Message");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setBtnText("Sending...");
    setIsSubmitting(true);

    const formData = new FormData(formRef.current);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://formspree.io/f/xwvwjoyb", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      if (response.ok) {
        setShowSuccess(true);
        setBtnText("Sent Successfully!");
        formRef.current.reset();
      } else {
        alert("An error occurred, please try again later.");
        setBtnText("Send Message");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Connection problem occurred.");
      setBtnText("Send Message");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[10px] md:text-sm font-bold text-blue-400 uppercase tracking-[0.4em] mb-6 md:mb-8">Get In Touch</h2>
          <p className="text-3xl sm:text-5xl md:text-8xl font-display font-extrabold mb-8 md:mb-12 tracking-tighter leading-tight">
            Let's create <br />
            something <span className="text-blue-500 italic">great</span>.
          </p>

          {/* Skills Highlight */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-20 max-w-4xl mx-auto">
            {[
              "Graphic Design", "UI/UX Design", "IT Support", 
              "Creative Strategy", "Visual Branding", "Technical Support"
            ].map((skill) => (
              <span key={skill} className="px-4 md:px-5 py-2 bg-gray-800/50 border border-gray-700 text-blue-400 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f172a] p-8 rounded-2xl shadow-2xl border border-gray-800"
          >
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                <p className="text-sm text-gray-400">All fields below are <span className="text-red-500 font-bold">required</span> to send your message.</p>
            </div>

            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              action="https://formspree.io/f/xwvwjoyb" 
              method="POST" 
              className="space-y-5"
            >
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name *</label>
                    <input type="text" name="name" required placeholder="Your Name" className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address *</label>
                    <input type="email" name="email" required placeholder="Your Email" className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Subject *</label>
                    <input type="text" name="subject" required placeholder="Message Subject" className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Message *</label>
                    <textarea name="message" required rows={4} placeholder="Your Message" className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none"></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                    {btnText}
                </button>
                
                {showSuccess && (
                  <p className="text-center text-green-400 font-bold mt-4 italic">Message sent successfully! Please check your email for the first-time activation.</p>
                )}
            </form>
          </motion.div>

        {/* Contact Info */}
        <div className="space-y-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-display font-bold">Contact Information</h3>
            <div className="space-y-6">
              <a href="mailto:rakayf308@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-6 h-6 text-blue-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-xl font-bold group-hover:text-blue-400 transition-colors">rakayf308@gmail.com</p>
                </div>
              </a>
              <a href="https://wa.me/6285155054880" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <div className="scale-75"><WhatsAppIcon /></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">WhatsApp</p>
                  <p className="text-xl font-bold group-hover:text-green-400 transition-colors">+62 851 5505 4880</p>
                </div>
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-display font-bold">Follow Me</h3>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram />, link: "https://www.instagram.com/raka_yanuar/?hl=en", color: "hover:bg-pink-600" },
                { icon: <BehanceIcon />, link: "https://www.behance.net/rakayanuarf", color: "hover:bg-blue-500" },
                { icon: <Linkedin />, link: "https://www.linkedin.com/in/raka-yanuar-f-6a6928205/", color: "hover:bg-blue-700" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentView !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  const handleNavigate = (id: string) => {
    if (currentView === 'home') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    setCurrentView(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'home' && (
            <>
              <Hero onNavigate={handleNavigate} />
              <Portfolio />
              <About />
              <Contact />
            </>
          )}
          {currentView === 'work' && <Portfolio />}
          {currentView === 'about' && <About />}
          {currentView === 'contact' && <Contact />}
        </motion.div>
      </AnimatePresence>
      
      <footer className="py-12 bg-gray-900 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
          © 2026 Raka Yanuar Firdaus.
        </p>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors group"
          >
            <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

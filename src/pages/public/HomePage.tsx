import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, BookOpen, Activity, Bone, Heart, User, Brain, Hand, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  { icon: Award, value: '15+', label: 'Anni di esperienza' },
  { icon: Users, value: '500+', label: 'Pazienti soddisfatti' },
  { icon: BookOpen, value: '98%', label: 'Tasso di successo' },
];

const services = [
  {
    icon: Bone,
    title: 'Riabilitazione Ortopedica',
    description: 'Recupero funzionale post-chirurgico e trattamento di traumi muscolo-scheletrici.',
  },
  {
    icon: Heart,
    title: 'Terapia del Dolore',
    description: 'Approcci evidence-based per il trattamento del dolore cronico e acuto.',
  },
  {
    icon: User,
    title: 'Rieducazione Posturale',
    description: 'Correzione delle disfunzioni posturali e prevenzione delle recidive.',
  },
  {
    icon: Activity,
    title: 'Fisioterapia Sportiva',
    description: 'Prevenzione e trattamento degli infortuni sportivi per atleti di ogni livello.',
  },
  {
    icon: Hand,
    title: 'Terapia Manuale',
    description: 'Tecniche manuali avanzate per il trattamento delle disfunzioni neuro-muscolo-scheletrici.',
  },
  {
    icon: Brain,
    title: 'Riabilitazione Neurologica',
    description: 'Percorsi riabilitativi per pazienti con patologie neurologiche.',
  },
];

function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-hero pt-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium mb-6">
                Studio di Fisioterapia Professionale
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] leading-tight mb-6">
                Ritorna a vivere{' '}
                <span className="text-gradient">senza dolore</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Terapie personalizzate per il tuo benessere fisico. Oltre 15 anni di esperienza 
                nel trattamento di patologie muscolo-scheletriche.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/contatti">
                  <Button 
                    size="lg" 
                    className="bg-[#1CAAD9] hover:bg-[#1590B8] text-white px-8 py-6 text-base group"
                  >
                    Prenota una visita
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/servizi">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-[#1CAAD9] text-[#1CAAD9] hover:bg-[#1CAAD9] hover:text-white px-8 py-6 text-base"
                  >
                    Scopri i servizi
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-12 h-12 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-[#1CAAD9]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2C3E50]">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              <img
                src="/hero-image.jpg"
                alt="Fisioterapista al lavoro"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2C3E50]">Certificato</p>
                    <p className="text-xs text-gray-500">Albo Fisioterapisti</p>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1CAAD9]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#1ABC9C]/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium mb-4">
            I miei servizi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
            Trattamenti personalizzati per ogni esigenza
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Offro una vasta gamma di servizi di fisioterapia, utilizzando tecniche 
            all'avanguardia e approcci evidence-based.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/servizi">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-[#1CAAD9] text-[#1CAAD9] hover:bg-[#1CAAD9] hover:text-white"
            >
              Vedi tutti i servizi
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-gradient-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto a iniziare il tuo percorso di recupero?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Prenota una visita di valutazione gratuita e scopri come posso aiutarti 
            a ritrovare il tuo benessere fisico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contatti">
              <Button 
                size="lg" 
                className="bg-white text-[#1CAAD9] hover:bg-gray-100 px-8 py-6 text-base"
              >
                Prenota ora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+390212345678">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base"
              >
                <Phone className="mr-2 w-5 h-5" />
                Chiama ora
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <CTASection />
    </main>
  );
}

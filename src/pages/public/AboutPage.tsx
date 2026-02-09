import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Award, GraduationCap, BadgeCheck, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const qualifications = [
  {
    icon: GraduationCap,
    title: 'Laurea in Fisioterapia',
    description: 'Università degli Studi di Padova',
    year: '2009',
  },
  {
    icon: Award,
    title: 'Master in Terapia Manuale',
    description: 'Istituto Superiore di Osteopatia',
    year: '2012',
  },
  {
    icon: BadgeCheck,
    title: 'Certificazione in Dry Needling',
    description: 'DGSA - German Medical Association',
    year: '2015',
  },
  {
    icon: BadgeCheck,
    title: 'Specializzazione in Terapia Manuale Ortopedica',
    description: 'IFOMPT - International Federation',
    year: '2018',
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'Anni di esperienza' },
  { value: 500, suffix: '+', label: 'Pazienti trattati' },
  { value: 98, suffix: '%', label: 'Pazienti soddisfatti' },
  { value: 4, suffix: '', label: 'Specializzazioni' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-[#1CAAD9]">
      {count}{suffix}
    </span>
  );
}

export function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="/physio-portrait.jpg"
                  alt="Dott. Marco Rossi"
                  className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#1CAAD9]/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#1ABC9C]/20 rounded-full blur-xl" />
              </div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#1CAAD9]/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2C3E50]">Iscritto all'Albo</p>
                    <p className="text-xs text-gray-500">Fisioterapisti</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-4 py-2 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium mb-6">
                Chi sono
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
                Dott. Marco Rossi
              </h1>
              <p className="text-xl text-[#1CAAD9] mb-6">
                Fisioterapista - Osteopata
              </p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Laureato in Fisioterapia presso l'Università di Padova con specializzazione 
                  in Terapia Manuale Ortopedica. Da oltre 15 anni aiuto i miei pazienti a 
                  recuperare la funzionalità e a vivere senza dolore.
                </p>
                <p>
                  Il mio approccio si basa sull'integrazione di tecniche manuali avanzate, 
                  esercizio terapeutico e paziente education. Credo fermamente nell'importanza 
                  di coinvolgere il paziente nel proprio percorso di recupero.
                </p>
                <p>
                  Ho lavorato con atleti di alto livello, pazienti post-operatori e chi soffre 
                  di dolore cronico. Ogni caso è una sfida che affronto con dedizione e professionalità.
                </p>
              </div>
              
              {/* Certifications */}
              <div className="mt-8 flex flex-wrap gap-3">
                {['Fisioterapia', 'Osteopatia', 'Dry Needling', 'Terapia Manuale'].map((cert) => (
                  <span
                    key={cert}
                    className="px-4 py-2 bg-white rounded-full text-sm text-[#2C3E50] shadow-sm border border-gray-100"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium mb-4">
              Formazione
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              Titoli e Certificazioni
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un percorso di formazione continua per offrire sempre le migliori 
              tecniche terapeutiche ai miei pazienti.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {qualifications.map((qual, index) => (
              <motion.div
                key={qual.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <qual.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-[#2C3E50]">
                        {qual.title}
                      </h3>
                      <span className="px-3 py-1 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium">
                        {qual.year}
                      </span>
                    </div>
                    <p className="text-gray-600">{qual.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium mb-6">
                La mia filosofia
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">
                Il paziente al centro del percorso terapeutico
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Approccio olistico</h4>
                    <p className="text-gray-600">
                      Considero il corpo come un sistema interconnesso, non limitandomi 
                      a trattare il sintomo ma cercando la causa del problema.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Evidence-based practice</h4>
                    <p className="text-gray-600">
                      Utilizzo solo tecniche validate dalla ricerca scientifica, 
                      aggiornandomi costantemente sulle novità del settore.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Paziente education</h4>
                    <p className="text-gray-600">
                      Credo nell'importanza di educare il paziente sulla propria 
                      condizione e sulle strategie di auto-gestione.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/hero-image.jpg"
                alt="Approccio terapeutico"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { motion } from 'framer-motion';
import { Bone, Heart, User, Activity, Hand, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  {
    icon: Bone,
    title: 'Riabilitazione Ortopedica',
    description: 'Il recupero funzionale post-chirurgico è fondamentale per ripristinare la piena funzionalità dopo interventi ortopedici.',
    features: [
      'Recupero post-operatorio',
      'Trattamento traumi sportivi',
      'Rieducazione articolare',
      'Prevenzione recidive',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Terapia del Dolore',
    description: 'Approcci evidence-based per il trattamento del dolore cronico e acuto, combinando tecniche manuali e terapie fisiche.',
    features: [
      'Gestione dolore cronico',
      'Terapia TENS',
      'Massoterapia',
      'Esercizi terapeutici',
    ],
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: User,
    title: 'Rieducazione Posturale',
    description: 'Correzione delle disfunzioni posturali attraverso un approccio globale che considera il corpo come un sistema interconnesso.',
    features: [
      'Analisi posturale',
      'Ginnastica correttiva',
      'Consigli ergonomici',
      'Prevenzione',
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Activity,
    title: 'Fisioterapia Sportiva',
    description: 'Prevenzione e trattamento degli infortuni sportivi per atleti di ogni livello, dal dilettante al professionista.',
    features: [
      'Prevenzione infortuni',
      'Recupero sportivo',
      'Valutazione funzionale',
      'Programmi personalizzati',
    ],
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Hand,
    title: 'Terapia Manuale',
    description: 'Tecniche manuali avanzate per il trattamento delle disfunzioni neuro-muscolo-scheletrici.',
    features: [
      'Manipolazioni',
      'Mobilizzazioni',
      'Tecniche miofasciali',
      'Trigger point',
    ],
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Brain,
    title: 'Riabilitazione Neurologica',
    description: 'Percorsi riabilitativi personalizzati per pazienti con patologie neurologiche.',
    features: [
      'Post-ictus',
      'Parkinson',
      'Sclerosi multipla',
      'Lesioni midollari',
    ],
    color: 'from-indigo-500 to-blue-500',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className={`h-2 bg-gradient-to-r ${service.color}`} />
      <div className="p-8">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <service.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-[#2C3E50] mb-4">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>
        <ul className="space-y-3 mb-8">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-[#1CAAD9] mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Link to="/contatti">
          <Button 
            variant="outline" 
            className="w-full border-[#1CAAD9] text-[#1CAAD9] hover:bg-[#1CAAD9] hover:text-white group/btn"
          >
            Prenota
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export function ServicesPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section ref={headerRef} className="bg-gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium mb-6">
              Servizi Professionali
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">
              I miei servizi di fisioterapia
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Offro una vasta gamma di trattamenti personalizzati, utilizzando tecniche 
              all'avanguardia e approcci evidence-based per garantire i migliori risultati.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-[#1CAAD9]/10 text-[#1CAAD9] rounded-full text-sm font-medium mb-6">
                Il mio approccio
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">
                Un percorso personalizzato per ogni paziente
              </h2>
              <div className="space-y-6 text-gray-600">
                <p className="leading-relaxed">
                  Ogni paziente è unico e merita un approccio personalizzato. Il mio metodo di lavoro 
                  si basa su una valutazione approfondita e sulla creazione di un piano di trattamento 
                  su misura per le esigenze specifiche di ciascuno.
                </p>
                <p className="leading-relaxed">
                  Utilizzo tecniche evidence-based e strumenti all'avanguardia per garantire 
                  risultati efficaci e duraturi. L'obiettivo non è solo alleviare il dolore, 
                  ma ripristinare la funzionalità e prevenire future recidive.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50]">Valutazione</h4>
                    <p className="text-sm text-gray-500">Analisi approfondita</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50]">Trattamento</h4>
                    <p className="text-sm text-gray-500">Tecniche avanzate</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50]">Monitoraggio</h4>
                    <p className="text-sm text-gray-500">Follow-up costante</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#1CAAD9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#1CAAD9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50]">Prevenzione</h4>
                    <p className="text-sm text-gray-500">Evitare recidive</p>
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
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 hidden md:block">
                <p className="text-3xl font-bold text-[#1CAAD9]">15+</p>
                <p className="text-gray-600">Anni di esperienza</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

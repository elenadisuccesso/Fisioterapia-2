import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Indirizzo',
    content: 'Via Roma 123, 20121 Milano',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    title: 'Telefono',
    content: '+39 02 1234 5678',
    href: 'tel:+390212345678',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@fisiocare.it',
    href: 'mailto:info@fisiocare.it',
  },
  {
    icon: Clock,
    title: 'Orari',
    content: 'Lun-Ven: 9:00 - 19:00\nSab: 9:00 - 13:00',
    href: null,
  },
];

export function ContactPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const { ref: formRef, isVisible: formVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              Contatti
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">
              Prenota la tua visita
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Compila il form per richiedere un appuntamento o per qualsiasi informazione. 
              Ti risponderò nel più breve tempo possibile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={formRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-2xl font-semibold text-[#2C3E50] mb-6">
                  Invia un messaggio
                </h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 rounded-xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Messaggio inviato!
                    </h3>
                    <p className="text-green-600">
                      Ti risponderò nel più breve tempo possibile.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome e Cognome *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Mario Rossi"
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="mario@esempio.it"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+39 333 123 4567"
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Messaggio *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Descrivi il tuo problema o richiesta..."
                        required
                        rows={5}
                        className="resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#1CAAD9] hover:bg-[#1590B8] text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Invia messaggio
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-[#2C3E50] mb-6">
                  Informazioni di contatto
                </h2>
                <p className="text-gray-600 mb-8">
                  Sono disponibile per consulenze e trattamenti dal lunedì al sabato. 
                  Per urgenze, contattami telefonicamente.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={formVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-[#1CAAD9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-[#1CAAD9]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2C3E50] mb-1">{info.title}</h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-600 hover:text-[#1CAAD9] transition-colors whitespace-pre-line"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-card bg-gray-100 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#1CAAD9] mx-auto mb-2" />
                  <p className="text-gray-600">Mappa interattiva</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1CAAD9] hover:underline text-sm"
                  >
                    Apri in Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

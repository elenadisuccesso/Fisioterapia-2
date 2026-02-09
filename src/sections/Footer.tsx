import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Chi Sono', href: '/chi-sono' },
  { label: 'Contatti', href: '/contatti' },
];

const services = [
  'Riabilitazione Ortopedica',
  'Terapia del Dolore',
  'Rieducazione Posturale',
  'Fisioterapia Sportiva',
  'Terapia Manuale',
  'Riabilitazione Neurologica',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <footer ref={ref} className="bg-[#2C3E50] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-semibold">FisioCare</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Studio di fisioterapia professionale dedicato al tuo benessere. 
              Oltre 15 anni di esperienza nel trattamento di patologie muscolo-scheletriche.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1CAAD9] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Link Rapidi</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#1CAAD9] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Servizi</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/servizi"
                    className="text-gray-300 hover:text-[#1CAAD9] transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#1CAAD9] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Via Roma 123, 20121 Milano
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#1CAAD9] flex-shrink-0" />
                <a 
                  href="tel:+390212345678" 
                  className="text-gray-300 hover:text-[#1CAAD9] transition-colors text-sm"
                >
                  +39 02 1234 5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#1CAAD9] flex-shrink-0" />
                <a 
                  href="mailto:info@fisiocare.it"
                  className="text-gray-300 hover:text-[#1CAAD9] transition-colors text-sm"
                >
                  info@fisiocare.it
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#1CAAD9] mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Lun-Ven: 9:00 - 19:00</p>
                  <p>Sab: 9:00 - 13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FisioCare. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="#" className="text-gray-400 hover:text-[#1CAAD9] transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-[#1CAAD9] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

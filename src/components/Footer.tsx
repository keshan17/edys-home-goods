import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src={logo} alt="Diven Casa" className="h-16 w-16 rounded-full object-cover mb-4" />
            <p className="font-body text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Premium glass items for your home. Elegance in every detail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-primary-foreground text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Categories", "Products", "Contact Us"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="font-body text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-primary-foreground text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="font-body text-primary-foreground/70 text-sm">+94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="font-body text-primary-foreground/70 text-sm">info@divencasa.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="font-body text-primary-foreground/70 text-sm">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="font-body text-primary-foreground/40 text-xs tracking-wider">
            © 2025 Diven Casa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

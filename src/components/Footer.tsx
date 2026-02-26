import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contato" className="section-dark py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display text-3xl font-bold text-secondary-foreground">
              Clamore <span className="text-primary">Sul</span>
            </span>
            <p className="text-secondary-foreground/60 mt-4 leading-relaxed text-sm">
              Distribuidora de cosméticos profissionais, levando qualidade e inovação aos melhores salões do Sul do Brasil.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/clamoresul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-secondary-foreground hover:bg-muted-foreground/30 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-secondary-foreground hover:bg-muted-foreground/30 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5547999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-[#25D366] hover:bg-muted-foreground/30 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {["Início", "Produtos", "Sobre Nós", "Depoimentos", "Contato"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">
              Categorias
            </h4>
            <ul className="space-y-3">
              {["Tratamento", "Coloração", "Finalização", "Acessórios"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/60 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Itajaí, SC
                  <br />
                  Brasil
                </span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/60 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>(47) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/60 text-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>contato@clamoresul.com.br</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/60 text-sm">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Seg - Sex: 9h às 18h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/40 text-sm">
            © 2024 Clamore Sul. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-secondary-foreground/40 hover:text-primary transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-secondary-foreground/40 hover:text-primary transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

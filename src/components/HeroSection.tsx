import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedCounter from "./AnimatedCounter";
import heroImage from "@/assets/hero-products-white.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-secondary">
      {/* Background Image - mais visível */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Gradient overlay mais suave - permite ver mais a imagem */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent" />

      {/* Bottom fade for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content - mais compacto */}
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-32">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary font-medium tracking-widest text-xs mb-4 uppercase"
          >
            Distribuidor Oficial Clamore Sul em SC
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
          >
            <span className="text-secondary-foreground">Cosméticos </span>
            <span className="text-primary">Premium</span>
            <br />
            <span className="text-secondary-foreground">para Profissionais</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-secondary-foreground/60 text-base md:text-lg mb-8 max-w-md"
          >
            Produtos capilares de alta performance para salões em Itajaí,
            Balneário Camboriú e litoral de Santa Catarina.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button variant="hero" size="lg" className="group">
              Falar com Consultor
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/catalogo">Ver Catálogo</Link>
            </Button>
          </motion.div>

          {/* Stats - mais compacto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex gap-8"
          >
            {[
              { value: 300, label: "Salões", suffix: "+" },
              { value: 72, label: "Entrega", suffix: "h", isStatic: true },
              { value: 98, label: "Satisfação", suffix: "%" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.isStatic ? (
                    `${stat.value}${stat.suffix}`
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-secondary-foreground/50 text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

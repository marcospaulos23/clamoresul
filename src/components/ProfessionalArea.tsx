import { motion } from "framer-motion";
import { Star, Truck, Award, HeartHandshake } from "lucide-react";

const ProfessionalArea = () => {
  const benefits = [
    {
      icon: Star,
      title: "Preços Exclusivos",
      description: "Condições especiais para profissionais cadastrados"
    },
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Receba seus produtos em até 24h na região"
    },
    {
      icon: Award,
      title: "Produtos Premium",
      description: "Marcas de alta performance para seu salão"
    },
    {
      icon: HeartHandshake,
      title: "Suporte Especializado",
      description: "Consultores prontos para atender você"
    }
  ];

  return (
    <section
      id="profissional"
      className="py-24 section-dark"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Exclusivo para Profissionais
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Por que Escolher a <span className="text-primary">Clamore Sul</span>?
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Somos especialistas em distribuição de cosméticos profissionais,
            oferecendo as melhores condições para salões em Santa Catarina.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-dark-elevated rounded-2xl p-8 border border-border text-center hover:border-primary/50 transition-colors overflow-hidden"
            >
              {/* Gradiente branco no topo */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-secondary-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-secondary-foreground/60">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalArea;

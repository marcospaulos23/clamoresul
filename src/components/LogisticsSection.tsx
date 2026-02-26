import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Shield } from "lucide-react";

const LogisticsSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Entrega para Todo Brasil",
      description: "Enviamos para todo o Brasil com agilidade. Entrega expressa em até 24h para a região da AMFRI.",
    },
    {
      icon: Clock,
      title: "Atendimento Ágil",
      description: "Consultores especializados visitam seu salão em Santa Catarina.",
    },
    {
      icon: MapPin,
      title: "Localização Estratégica",
      description: "Centro de distribuição em Itajaí, polo logístico do Sul do Brasil.",
    },
    {
      icon: Shield,
      title: "Garantia de Qualidade",
      description: "Produtos originais com nota fiscal e suporte técnico especializado.",
    },
  ];

  return (
    <section className="py-24 section-dark section-blend-top relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Logística Rápida
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Distribuição para
            <br />
            <span className="text-primary">Todo Brasil</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
            Localizados estrategicamente em Itajaí, garantimos entregas ágeis
            de cosméticos profissionais para todo o país.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-dark-elevated border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300 group overflow-hidden"
            >
              {/* Gradiente branco no topo */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                <h3 className="font-display text-xl font-bold text-secondary-foreground mb-3">
                  {feature.title}
                </h3>

                <p className="text-secondary-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coverage area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-secondary-foreground/50 text-sm mb-4">
            ÁREA DE COBERTURA PRIORITÁRIA
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Itajaí",
              "Balneário Camboriú",
              "Navegantes",
              "Camboriú",
              "Itapema",
              "Blumenau",
              "Florianópolis",
              "Joinville",
            ].map((city) => (
              <span
                key={city}
                className="px-4 py-2 bg-secondary-foreground/5 border border-border rounded-full text-secondary-foreground/70 text-sm hover:border-primary/50 hover:text-primary transition-colors duration-300"
              >
                {city}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogisticsSection;

import { motion } from "framer-motion";
import { Sparkles, Palette, Wind, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const CategoriesSection = () => {
  const categories = [
    {
      icon: Sparkles,
      title: "Tratamento",
      description:
        "Máscaras, óleos e séruns para reconstrução e hidratação profunda dos fios.",
      products: "120+ produtos",
    },
    {
      icon: Palette,
      title: "Coloração",
      description:
        "Tintas profissionais, oxidantes e descolorantes de alta performance.",
      products: "80+ produtos",
    },
    {
      icon: Wind,
      title: "Finalização",
      description:
        "Sprays, mousses e cremes para styling e proteção térmica.",
      products: "60+ produtos",
    },
  ];

  return (
    <section id="produtos" className="py-24 section-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Nosso Catálogo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(0 0% 10%)' }}>
            Categorias de Produtos
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(0 0% 40%)' }}>
            Linha completa de cosméticos capilares profissionais para atender
            todas as necessidades do seu salão.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group p-8 rounded-2xl bg-white border-2 border-transparent hover:border-primary transition-all duration-300"
              style={{ boxShadow: '0 4px 20px hsl(0 0% 0% / 0.08)' }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <category.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              <h3 className="font-display text-2xl font-bold mb-3" style={{ color: 'hsl(0 0% 10%)' }}>
                {category.title}
              </h3>

              <p className="mb-6 leading-relaxed" style={{ color: 'hsl(0 0% 40%)' }}>
                {category.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">
                  {category.products}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group/btn hover:text-primary"
                  style={{ color: 'hsl(0 0% 40%)' }}
                >
                  Ver Detalhes
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

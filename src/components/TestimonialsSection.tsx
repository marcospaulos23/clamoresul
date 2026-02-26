import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marina Santos",
      role: "Proprietária - Salão Beleza Pura",
      content:
        "A parceria com a Clamor e Sul transformou meu negócio. Produtos de qualidade excepcional e atendimento impecável.",
      rating: 5,
    },
    {
      name: "Carlos Ferreira",
      role: "Hair Stylist - Studio CF",
      content:
        "Trabalho com os produtos da Clamore há 5 anos e os resultados falam por si. Meus clientes sempre voltam satisfeitos.",
      rating: 5,
    },
    {
      name: "Ana Paula Lima",
      role: "Colorista - Espaço Hair Design",
      content:
        "A linha de coloração é simplesmente incrível. Cores vibrantes que duram e não danificam os fios.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 section-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(0 0% 10%)' }}>
            O Que Dizem Nossos Parceiros
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(0 0% 40%)' }}>
            Veja por que centenas de salões confiam na Clamore Sul para seus
            produtos capilares.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary/30 transition-colors duration-300"
              style={{ boxShadow: '0 4px 20px hsl(0 0% 0% / 0.08)' }}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="leading-relaxed mb-6" style={{ color: 'hsl(0 0% 20%)' }}>
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'hsl(0 0% 10%)' }}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm" style={{ color: 'hsl(0 0% 50%)' }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="mb-4" style={{ color: 'hsl(0 0% 50%)' }}>
            Siga-nos no Instagram para mais conteúdo
          </p>
          <a
            href="https://instagram.com/clamoresul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
          >
            @clamoresul
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

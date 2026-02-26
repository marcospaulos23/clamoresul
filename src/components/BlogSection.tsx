import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const BlogSection = () => {
  const posts = [
    {
      title: "Cronograma Capilar: Guia Completo para Profissionais",
      excerpt:
        "Aprenda a montar um cronograma personalizado para cada tipo de cabelo e conquiste resultados incríveis.",
      date: "15 Dez 2024",
      readTime: "8 min",
      category: "Tratamento",
    },
    {
      title: "Queratina: Mitos e Verdades sobre o Ativo",
      excerpt:
        "Descubra tudo sobre a queratina e como utilizá-la corretamente nos tratamentos capilares.",
      date: "10 Dez 2024",
      readTime: "6 min",
      category: "Técnicas",
    },
    {
      title: "Tendências de Coloração para 2025",
      excerpt:
        "As cores e técnicas que vão dominar os salões no próximo ano. Prepare-se para as novidades!",
      date: "05 Dez 2024",
      readTime: "5 min",
      category: "Coloração",
    },
  ];

  return (
    <section id="blog" className="py-24 section-dark section-blend-top">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Blog Técnico
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Conteúdo para Profissionais
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Artigos, dicas e técnicas exclusivas para você se manter atualizado
            no mercado da beleza.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group bg-card rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-2"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="h-48 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="group/btn text-primary hover:bg-primary/10 px-0"
                >
                  Ler Artigo
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline-primary" size="lg">
            Ver Todos os Artigos
            <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;

import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSection from "@/components/CatalogSection";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Catalog = () => {
  return (
    <>
      <Helmet>
        <title>Catálogo de Produtos | Clamore Sul</title>
        <meta name="description" content="Explore nosso catálogo completo de cosméticos capilares profissionais. Tratamento, coloração, finalização e acessórios." />
      </Helmet>
      <div className="min-h-screen section-dark">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 pt-2">
            <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-white mb-0">
              <Link to="/">
                <ArrowLeft size={18} />
                Voltar ao Início
              </Link>
            </Button>
          </div>
          <CatalogSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Catalog;

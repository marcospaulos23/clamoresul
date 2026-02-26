import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import LogisticsSection from "@/components/LogisticsSection";
import LocationSection from "@/components/LocationSection";
import ProfessionalArea from "@/components/ProfessionalArea";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

import { useVisitTracker } from "@/hooks/useVisitTracker";

const Index = () => {
  useVisitTracker();
  return (
    <>
      <Helmet>
        <title>Clamore Sul | Distribuidor de Cosméticos em Itajaí SC</title>
        <meta
          name="description"
          content="Distribuidor oficial Clamore Sul em Santa Catarina. Cosméticos capilares premium para salões em Itajaí, Balneário Camboriú e litoral SC. Entrega expressa 72h."
        />
        <meta
          name="keywords"
          content="distribuidora de cosméticos Itajaí, produtos para salão Santa Catarina, Clamore Sul SC, cosméticos profissionais Balneário Camboriú, onde comprar Clamore Sul em SC, tratamento capilar litoral SC"
        />
        <meta property="og:title" content="Clamore Sul | Cosméticos Capilares Profissionais em SC" />
        <meta
          property="og:description"
          content="Distribuidor oficial de cosméticos capilares premium para profissionais da beleza em Santa Catarina. Entrega expressa para todo o litoral."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://clamoresul.com.br" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <SectionDivider from="dark" to="light" />
          <CategoriesSection />
          <SectionDivider from="light" to="dark" />
          <ProfessionalArea />
          <LogisticsSection />
          <LocationSection />
          <BlogSection />
          <SectionDivider from="dark" to="light" />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

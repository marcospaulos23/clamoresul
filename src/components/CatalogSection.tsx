import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette, Wind, Package, Search, Plus, Loader2, LogOut, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const categoryIcons: Record<string, any> = {
  tratamento: Sparkles,
  coloracao: Palette,
  "finalização": Wind,
  acessorios: Package,
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  category_id: string | null;
  is_active: boolean | null;
}

const CatalogSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [isOpeningForm, setIsOpeningForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category_id: "",
  });

  useEffect(() => {
    checkAdmin();
    // Listen for auth changes to update isAdmin status instantly
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
      if (session?.user) {
        verifyAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setHasSession(!!session);
    if (session?.user) {
      verifyAdminRole(session.user.id);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logout realizado", description: "Sessão encerrada com sucesso." });
  };

  const verifyAdminRole = async (userId: string) => {
    const { data: roles } = await supabase.from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin");

    if (roles && roles.length > 0) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [catRes, prodRes] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("products").select("*").eq("is_active", true).order("sort_order"),
      ]);

      if (catRes.data && catRes.data.length > 0) {
        setCategories(catRes.data);
      } else {
        // Fallback categories for demo
        setCategories([
          { id: "1", name: "Tratamento", slug: "tratamento", description: "" },
          { id: "2", name: "Coloração", slug: "coloracao", description: "" },
          { id: "3", name: "Finalização", slug: "finalizacao", description: "" },
        ]);
      }

      if (prodRes.data && prodRes.data.length > 0) {
        setProducts(prodRes.data);
      } else {
        // Fallback products for demo to show the new card design
        setProducts([
          {
            id: "demo1",
            name: "Kit Reconstrução Prime",
            category_id: "1",
            description: "Tratamento intensivo para cabelos danificados com queratina pura e óleos essenciais.",
            price: 189.90,
            image_url: "https://images.unsplash.com/photo-1527799822344-429dfa8a810d?auto=format&fit=crop&q=80&w=800",
            is_active: true
          },
          {
            id: "demo2",
            name: "Sérum Finalizador Luxo",
            category_id: "3",
            description: "Brilho instantâneo e proteção térmica com toque sedoso e aroma sofisticado.",
            price: 85.00,
            image_url: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800",
            is_active: true
          },
          {
            id: "demo3",
            name: "Máscara Color Reflect",
            category_id: "2",
            description: "Proteção da cor e nutrição profunda para cabelos coloridos e descoloridos.",
            price: 124.50,
            image_url: "https://images.unsplash.com/photo-1599422315624-c102a061405b?auto=format&fit=crop&q=80&w=800",
            is_active: true
          }
        ]);
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("products").insert({
        name: productForm.name,
        description: productForm.description || null,
        price: productForm.price ? parseFloat(productForm.price) : null,
        image_url: productForm.image_url || null,
        category_id: productForm.category_id || null,
        is_active: true,
      });

      if (error) throw error;

      toast({ title: "Sucesso!", description: "Produto adicionado ao catálogo." });
      setIsOpeningForm(false);
      setProductForm({ name: "", description: "", price: "", image_url: "", category_id: "" });

      // Refresh products
      const { data: updatedProducts } = await supabase.from("products").select("*").eq("is_active", true).order("sort_order");
      if (updatedProducts) setProducts(updatedProducts);
    } catch (err: any) {
      toast({ title: "Erro ao adicionar", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchCat = !activeCategory || p.category_id === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="catalogo" className="pb-24 relative">
      <div className="container mx-auto px-4 relative">
        {/* Admin floating actions - placed top right, aligned with Voltar button */}
        <div className="absolute top-[-38px] right-4 z-50 flex gap-2">
          {isAdmin ? (
            <>
              <Dialog open={isOpeningForm} onOpenChange={setIsOpeningForm}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 h-9 rounded-lg shadow-lg shadow-primary/20 gap-2 uppercase tracking-widest text-[9px] transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-3.5 h-3.5" /> Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-[#121212] border-white/10 text-white shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-display font-bold">Cadastrar Produto</DialogTitle>
                    <DialogDescription className="text-white/50">
                      Preencha os detalhes para adicionar um novo item ao catálogo luxo.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddProduct} className="space-y-6 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white/70 text-xs uppercase tracking-wider font-bold">Nome do Produto *</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          required
                          placeholder="Ex: Kit Reconstrução Prime"
                          className="bg-white/5 border-white/10 focus:border-primary text-white h-12"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price" className="text-white/70 text-xs uppercase tracking-wider font-bold">Valor (R$)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            className="bg-white/5 border-white/10 focus:border-primary text-white h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-white/70 text-xs uppercase tracking-wider font-bold">Categoria *</Label>
                          <Select
                            value={productForm.category_id}
                            onValueChange={(val) => setProductForm({ ...productForm, category_id: val })}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary text-white h-12">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                              {categories.map((c) => (
                                <SelectItem key={c.id} value={c.id} className="hover:bg-primary/20 focus:bg-primary/20">
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image_url" className="text-white/70 text-xs uppercase tracking-wider font-bold">URL da Imagem</Label>
                        <Input
                          id="image_url"
                          placeholder="https://exemplo.com/imagem.jpg"
                          value={productForm.image_url}
                          onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-primary text-white h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-white/70 text-xs uppercase tracking-wider font-bold">Descrição Curta</Label>
                        <Textarea
                          id="description"
                          placeholder="Descrição elegante do produto..."
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-primary text-white min-h-[100px] resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/5">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-white/10 text-white hover:bg-white/5 hover:text-white"
                        onClick={() => setIsOpeningForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Produto"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-white/10 text-white/50 hover:text-white hover:bg-white/5 px-3 py-2 h-9 rounded-lg gap-2 uppercase tracking-widest text-[8px]"
              >
                <LogOut className="w-3.5 h-3.5" /> Sair
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              asChild
              className="border-white/10 text-white/40 hover:text-white hover:bg-white/5 px-4 py-2 h-9 rounded-lg gap-2 uppercase tracking-widest text-[8px] transition-all"
            >
              <a href="/admin/login">
                <LogIn className="w-3.5 h-3.5" /> Acesso Admin
              </a>
            </Button>
          )}
        </div>

        {/* Título e introdução */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Catálogo Completo
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Produtos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore nossa linha completa de cosméticos capilares profissionais.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border text-foreground"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(null)}
            className="rounded-full"
          >
            Todos
          </Button>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] || Package;
            return (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="rounded-full gap-2"
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </Button>
            );
          })}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {products.length === 0
                ? "Nenhum produto cadastrado ainda. Adicione produtos pelo painel administrativo."
                : "Nenhum produto encontrado."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl overflow-hidden group flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-white/10"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-gray-300" />
                    </div>
                  )}
                  {/* Category Tag */}
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest rounded border border-white/10">
                      {categories.find(c => c.id === product.category_id)?.name || 'Cosmético'}
                    </span>
                  </div>
                </div>

                {/* Content - COMPACT DARK THEME */}
                <div className="p-3 flex flex-col flex-grow bg-[#121212] border-t border-white/5">
                  <h3 className="font-display text-[13px] font-bold text-white mb-0.5 group-hover:text-primary transition-colors duration-300 line-clamp-1 leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-white/40 text-[10px] line-clamp-1 mb-3 leading-relaxed">
                    {product.description || "Linha profissional Clamore Sul."}
                  </p>

                  <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-white/20 text-[8px] font-medium uppercase tracking-wider">Valor</span>
                      <span className="text-base font-bold text-primary">
                        {product.price ? `R$ ${product.price.toFixed(2)}` : "Consultar"}
                      </span>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 h-auto rounded-md shadow-sm hover:shadow-primary/20 transition-all duration-300 gap-1.5 text-[9px] uppercase tracking-wider"
                      asChild
                    >
                      <a
                        href={`https://wa.me/5547999999999?text=Olá, tenho interesse no produto: ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;

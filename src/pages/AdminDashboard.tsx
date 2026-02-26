import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  BarChart3, Users, ShoppingCart, DollarSign, LogOut, Plus, Trash2, Edit, Eye, Package, TrendingUp,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

interface DashboardStats {
  totalVisits: number;
  uniqueVisitors: number;
  totalSales: number;
  totalRevenue: number;
  totalProducts: number;
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

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Sale {
  id: string;
  customer_name: string | null;
  total: number;
  status: string | null;
  sale_date: string;
  quantity: number;
  unit_price: number;
  product_id: string | null;
}

const CHART_COLORS = ["hsl(16, 100%, 50%)", "hsl(25, 100%, 55%)", "hsl(35, 100%, 50%)", "hsl(45, 100%, 50%)"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({ totalVisits: 0, uniqueVisitors: 0, totalSales: 0, totalRevenue: 0, totalProducts: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [visitData, setVisitData] = useState<any[]>([]);
  const [salesChartData, setSalesChartData] = useState<any[]>([]);

  // Filters
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date(); d.setMonth(d.getMonth() - 1);
    return d.toISOString().split("T")[0];
  });
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().split("T")[0]);

  // Product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({ name: "", description: "", price: "", image_url: "", category_id: "", is_active: true });

  // Sale form
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [saleForm, setSaleForm] = useState({ customer_name: "", product_id: "", quantity: "1", unit_price: "", notes: "" });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [dateFrom, dateTo]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) { navigate("/admin/login"); return; }
  };

  const fetchAll = async () => {
    const [visitsRes, salesRes, productsRes, categoriesRes] = await Promise.all([
      supabase.from("site_visits").select("*").gte("created_at", dateFrom).lte("created_at", dateTo + "T23:59:59"),
      supabase.from("sales").select("*").gte("sale_date", dateFrom).lte("sale_date", dateTo + "T23:59:59").order("sale_date", { ascending: false }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("sort_order"),
    ]);

    const visits = visitsRes.data || [];
    const salesData = salesRes.data || [];
    const prods = productsRes.data || [];
    const cats = categoriesRes.data || [];

    setProducts(prods);
    setCategories(cats);
    setSales(salesData);

    const uniqueIds = new Set(visits.map((v) => v.visitor_id));
    const revenue = salesData.reduce((sum, s) => sum + Number(s.total), 0);

    setStats({
      totalVisits: visits.length,
      uniqueVisitors: uniqueIds.size,
      totalSales: salesData.length,
      totalRevenue: revenue,
      totalProducts: prods.length,
    });

    // Group visits by day
    const visitsByDay: Record<string, number> = {};
    visits.forEach((v) => {
      const day = v.created_at.split("T")[0];
      visitsByDay[day] = (visitsByDay[day] || 0) + 1;
    });
    setVisitData(Object.entries(visitsByDay).map(([date, count]) => ({ date: date.slice(5), visitas: count })).sort((a, b) => a.date.localeCompare(b.date)));

    // Group sales by day
    const salesByDay: Record<string, number> = {};
    salesData.forEach((s) => {
      const day = s.sale_date.split("T")[0];
      salesByDay[day] = (salesByDay[day] || 0) + Number(s.total);
    });
    setSalesChartData(Object.entries(salesByDay).map(([date, total]) => ({ date: date.slice(5), faturamento: total })).sort((a, b) => a.date.localeCompare(b.date)));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: productForm.name,
      description: productForm.description || null,
      price: productForm.price ? parseFloat(productForm.price) : null,
      image_url: productForm.image_url || null,
      category_id: productForm.category_id || null,
      is_active: productForm.is_active,
    };

    if (editingProduct) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingProduct.id);
      if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Produto atualizado!" });
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Produto criado!" });
    }

    setShowProductForm(false);
    setEditingProduct(null);
    setProductForm({ name: "", description: "", price: "", image_url: "", category_id: "", is_active: true });
    fetchAll();
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Produto excluído!" });
    fetchAll();
  };

  const handleSaveSale = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(saleForm.quantity);
    const price = parseFloat(saleForm.unit_price);
    const { error } = await supabase.from("sales").insert({
      customer_name: saleForm.customer_name || null,
      product_id: saleForm.product_id || null,
      quantity: qty,
      unit_price: price,
      total: qty * price,
      notes: saleForm.notes || null,
    });
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Venda registrada!" });
    setShowSaleForm(false);
    setSaleForm({ customer_name: "", product_id: "", quantity: "1", unit_price: "", notes: "" });
    fetchAll();
  };

  const editProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      description: p.description || "",
      price: p.price?.toString() || "",
      image_url: p.image_url || "",
      category_id: p.category_id || "",
      is_active: p.is_active ?? true,
    });
    setShowProductForm(true);
  };

  // Category sales distribution for pie chart
  const categorySales = categories.map((cat) => {
    const catProducts = products.filter((p) => p.category_id === cat.id).map((p) => p.id);
    const total = sales.filter((s) => s.product_id && catProducts.includes(s.product_id)).reduce((sum, s) => sum + Number(s.total), 0);
    return { name: cat.name, value: total };
  }).filter((c) => c.value > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-xl font-bold text-foreground">
            Clamore <span className="text-primary">Sul</span>
          </h1>
          <span className="text-muted-foreground text-sm">| Painel Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-1">
            <Eye className="w-4 h-4" /> Ver site
          </a>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" /> Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        {/* Date filters */}
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">De</Label>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="bg-card w-40" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Até</Label>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="bg-card w-40" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Visitas", value: stats.totalVisits, icon: Eye, color: "text-blue-400" },
            { label: "Visitantes Únicos", value: stats.uniqueVisitors, icon: Users, color: "text-green-400" },
            { label: "Vendas", value: stats.totalSales, icon: ShoppingCart, color: "text-primary" },
            { label: "Faturamento", value: `R$ ${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-yellow-400" },
            { label: "Produtos", value: stats.totalProducts, icon: Package, color: "text-purple-400" },
          ].map((s) => (
            <Card key={s.label} className="bg-card border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{s.label}</p>
                  <p className="text-foreground text-xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2 text-base">
                <BarChart3 className="w-5 h-5 text-primary" /> Visitas por dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                  <XAxis dataKey="date" stroke="hsl(0 0% 60%)" fontSize={12} />
                  <YAxis stroke="hsl(0 0% 60%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)", borderRadius: 8 }} />
                  <Bar dataKey="visitas" fill="hsl(16, 100%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-primary" /> Faturamento por dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                  <XAxis dataKey="date" stroke="hsl(0 0% 60%)" fontSize={12} />
                  <YAxis stroke="hsl(0 0% 60%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)", borderRadius: 8 }} formatter={(v: any) => [`R$ ${Number(v).toFixed(2)}`, "Faturamento"]} />
                  <Line type="monotone" dataKey="faturamento" stroke="hsl(16, 100%, 50%)" strokeWidth={2} dot={{ fill: "hsl(16, 100%, 50%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {categorySales.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-base">Vendas por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={categorySales} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {categorySales.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)", borderRadius: 8 }} formatter={(v: any) => `R$ ${Number(v).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tabs: Produtos / Vendas */}
        <Tabs defaultValue="products">
          <TabsList className="bg-card">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-foreground font-bold text-lg">Gerenciar Produtos</h3>
              <Button size="sm" className="gap-2" onClick={() => { setEditingProduct(null); setProductForm({ name: "", description: "", price: "", image_url: "", category_id: "", is_active: true }); setShowProductForm(!showProductForm); }}>
                <Plus className="w-4 h-4" /> Novo Produto
              </Button>
            </div>

            {showProductForm && (
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <form onSubmit={handleSaveProduct} className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome *</Label>
                      <Input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <select value={productForm.category_id} onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                        <option value="">Selecione...</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preço (R$)</Label>
                      <Input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label>URL da Imagem</Label>
                      <Input value={productForm.image_url} onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })} className="bg-background" />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label>Descrição</Label>
                      <Input value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="bg-background" />
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                      <Button type="submit">{editingProduct ? "Atualizar" : "Criar"}</Button>
                      <Button type="button" variant="outline" onClick={() => setShowProductForm(false)}>Cancelar</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                      <TableCell>{p.price ? `R$ ${Number(p.price).toFixed(2)}` : "—"}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${p.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {p.is_active ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => editProduct(p)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(p.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">Nenhum produto cadastrado</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-foreground font-bold text-lg">Registro de Vendas</h3>
              <Button size="sm" className="gap-2" onClick={() => setShowSaleForm(!showSaleForm)}>
                <Plus className="w-4 h-4" /> Nova Venda
              </Button>
            </div>

            {showSaleForm && (
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <form onSubmit={handleSaveSale} className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cliente</Label>
                      <Input value={saleForm.customer_name} onChange={(e) => setSaleForm({ ...saleForm, customer_name: e.target.value })} className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label>Produto</Label>
                      <select value={saleForm.product_id} onChange={(e) => setSaleForm({ ...saleForm, product_id: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                        <option value="">Selecione...</option>
                        {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantidade *</Label>
                      <Input type="number" min="1" value={saleForm.quantity} onChange={(e) => setSaleForm({ ...saleForm, quantity: e.target.value })} required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label>Preço Unitário (R$) *</Label>
                      <Input type="number" step="0.01" value={saleForm.unit_price} onChange={(e) => setSaleForm({ ...saleForm, unit_price: e.target.value })} required className="bg-background" />
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                      <Button type="submit">Registrar Venda</Button>
                      <Button type="button" variant="outline" onClick={() => setShowSaleForm(false)}>Cancelar</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{new Date(s.sale_date).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell className="text-foreground">{s.customer_name || "—"}</TableCell>
                      <TableCell>{s.quantity}</TableCell>
                      <TableCell className="text-primary font-semibold">R$ {Number(s.total).toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">{s.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sales.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Nenhuma venda registrada</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

const LocationSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  // Itajaí coordinates
  const itajaiCoords: [number, number] = [-48.6619, -26.9078];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || mapLoaded) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: itajaiCoords,
      zoom: 13,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Add marker
    const markerEl = document.createElement("div");
    markerEl.className = "custom-marker";
    markerEl.innerHTML = `
      <div style="
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, hsl(16, 100%, 50%), hsl(25, 100%, 55%));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(255, 69, 0, 0.4);
        animation: pulse 2s ease-in-out infinite;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `;

    new mapboxgl.Marker(markerEl).setLngLat(itajaiCoords).addTo(map.current);

    setMapLoaded(true);

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, mapLoaded]);

  return (
    <section id="localizacao" className="py-24 section-dark section-blend-top">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Nossa Localização
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Visite Nossa <span className="text-primary">Sede</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estamos localizados em Itajaí, Santa Catarina - um dos principais polos
            logísticos do Sul do Brasil.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden border border-border"
          >
            {!mapboxToken ? (
              <div className="absolute inset-0 bg-secondary flex flex-col items-center justify-center p-8">
                <MapPin className="w-16 h-16 text-primary mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Mapa Interativo
                </h3>
                <p className="text-muted-foreground text-center mb-6 max-w-sm">
                  Insira seu token Mapbox para visualizar a localização no mapa
                </p>
                <input
                  type="text"
                  placeholder="Mapbox Public Token"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <a
                  href="https://mapbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm mt-3 hover:underline"
                >
                  Obter token gratuito →
                </a>
              </div>
            ) : (
              <div ref={mapContainer} className="absolute inset-0" />
            )}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Highlight box */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
              <h4 className="font-display text-2xl font-bold text-foreground mb-4">
                Atendimento Personalizado
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Nossos consultores visitam salões em toda Santa Catarina.
                Agende uma visita e conheça nosso portfólio completo de produtos Clamore.
              </p>
            </div>

            {/* Service Areas */}
            <div className="bg-card border border-border rounded-2xl p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Áreas de Atendimento
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Itajaí",
                  "Balneário Camboriú",
                  "Navegantes",
                  "Camboriú",
                  "Florianópolis",
                  "Joinville",
                  "Blumenau",
                  "Brusque"
                ].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

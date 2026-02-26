interface SectionDividerProps {
  from?: "dark" | "light";
  to?: "dark" | "light";
}

const SectionDivider = ({ from = "dark", to = "light" }: SectionDividerProps) => {
  // Cores base extraídas do index.css
  const lightColor = "hsl(0 0% 98%)";
  const darkColor = "hsl(0 0% 5%)"; // Início do gradient-dark

  const getGradient = () => {
    if (from === "light" && to === "dark") {
      // Easing gradient: Light -> Dark
      return `linear-gradient(to bottom, 
        ${lightColor} 0%, 
        ${lightColor} 20%, 
        rgba(250, 250, 250, 0.8) 40%, 
        rgba(13, 13, 13, 0.2) 60%, 
        ${darkColor} 85%, 
        ${darkColor} 100%)`;
    }
    if (from === "dark" && to === "light") {
      // Easing gradient: Dark -> Light (Usando o final do dark 2%)
      const endDark = "hsl(0 0% 2%)";
      return `linear-gradient(to bottom, 
        ${endDark} 0%, 
        ${endDark} 15%, 
        rgb(10, 10, 10, 0.8) 35%, 
        rgba(250, 250, 250, 0.2) 65%, 
        ${lightColor} 85%, 
        ${lightColor} 100%)`;
    }
    const color = from === "dark" ? darkColor : lightColor;
    return `linear-gradient(to bottom, ${color}, ${color})`;
  };

  return (
    <div
      className="h-48 w-full relative z-10"
      style={{ background: getGradient() }}
    />
  );
};

export default SectionDivider;

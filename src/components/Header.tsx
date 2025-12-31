import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="py-3 sm:py-6 px-3 sm:px-4 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-4">
        <img 
          src={logo} 
          alt="iHelpBD Logo" 
          className="h-8 sm:h-12 w-auto object-contain"
        />
        <span className="text-lg sm:text-2xl font-display font-bold text-brand-blue">
          iHelpBD
        </span>
      </div>
    </header>
  );
};

export default Header;

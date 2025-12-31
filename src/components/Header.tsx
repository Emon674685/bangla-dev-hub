import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <img 
          src={logo} 
          alt="iHelpBD Logo" 
          className="h-12 w-auto object-contain"
        />
        <span className="text-2xl font-display font-bold text-brand-blue">
          iHelpBD
        </span>
      </div>
    </header>
  );
};

export default Header;

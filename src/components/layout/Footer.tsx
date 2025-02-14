import logo from "/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur py-4 support-[background-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="brand-logo" className="h-12" />
        </Link>

        {/* App Description */}
        <p className="text-sm text-muted-foreground text-center mt-3 md:mt-0">
          Nimbus - Your reliable weather forecast app. Stay updated with
          real-time weather insights!
        </p>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-muted-foreground mt-4">
        © {new Date().getFullYear()} Nimbus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

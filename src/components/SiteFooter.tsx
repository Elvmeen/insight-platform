const SiteFooter = () => {
  return (
    <footer className="bg-naps-dark text-primary-foreground/60 py-6 mt-10">
      <div className="container mx-auto px-4 text-center text-xs">
        <p>© {new Date().getFullYear()} Department of Physics, University of Jos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;

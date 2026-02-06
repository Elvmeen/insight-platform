import { PlayCircle } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="bg-naps-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="lg:w-3/4">
          <h2 className="font-heading text-xl md:text-2xl font-bold mb-3">
            Welcome to the Department of Physics, University of Jos
          </h2>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Where excellence in teaching, research, and innovation is our hallmark. We provide a
            stimulating academic environment that nurtures curiosity, critical thinking, and
            scientific discovery. Whether you are a prospective student, researcher, or visitor, we
            invite you to explore our programs and become part of a dynamic community dedicated to
            advancing the frontiers of physics.
          </p>
        </div>
        <div>
          <a
            href="https://www.unijos.edu.ng/node/560"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-naps-blue hover:bg-naps-blue-light text-primary-foreground font-heading font-semibold px-6 py-3 rounded transition-colors text-sm"
          >
            <PlayCircle className="w-5 h-5" />
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;

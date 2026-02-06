import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl font-bold text-naps-blue border-t-4 border-naps-gold pt-2">
          Testimonials
        </h2>
        <div className="flex gap-1">
          <button className="w-6 h-6 flex items-center justify-center text-naps-blue">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-naps-blue">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <blockquote className="border-l-4 border-naps-gold pl-4">
        <Quote className="w-5 h-5 text-naps-gold mb-2" />
        <p className="text-sm text-muted-foreground italic leading-relaxed mb-3">
          Studying Physics at the University of Jos was a defining chapter of my journey. It trained
          me to think critically, embrace challenges, and approach problems with confidence. UNIJOS
          provided a solid academic foundation and an environment that pushed me to grow beyond my
          limits. As I learned, "Physics doesn't just explain how the world works, it trains you to
          think differently about everything." I am proud of my time at UNIJOS and confident in the
          future it prepared me for.
        </p>
        <footer className="text-xs">
          <span className="font-heading font-semibold text-foreground">Matthew Mgbukwu</span>
          <br />
          <span className="text-muted-foreground">Dr. Ultrafast spect…</span>
        </footer>
      </blockquote>
    </section>
  );
};

export default Testimonials;

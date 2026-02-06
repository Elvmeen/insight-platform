import { Clock, MapPin, ChevronRight } from "lucide-react";

const EventsSection = () => {
  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-naps-blue border-t-4 border-naps-gold pt-2 mb-6">
        Events
      </h2>

      <div className="flex gap-4 mb-4">
        <div className="bg-naps-blue text-primary-foreground text-center px-3 py-2 rounded">
          <span className="block text-xs font-heading font-bold uppercase">DEC</span>
          <span className="block text-2xl font-heading font-bold">13</span>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-1">
            University of Jos Combined Convocation & Golden Jubilee
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3" />
            11:00AM - 05:00PM
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Jeremiah Useni Stadium, Naraguta Campus.
          </p>
        </div>
      </div>

      <a href="#" className="text-naps-blue text-xs font-semibold inline-flex items-center gap-1 hover:underline">
        All events <ChevronRight className="w-3 h-3" />
      </a>
    </section>
  );
};

export default EventsSection;

import { ChevronRight, ChevronLeft } from "lucide-react";
import newsThumb from "@/assets/news-thumb.png";

const LatestNews = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-naps-blue border-t-4 border-naps-gold pt-2">
            Latest News
          </h2>
          <div className="flex gap-1">
            <button className="w-7 h-7 flex items-center justify-center border border-border rounded text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center border border-border rounded text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-heading font-semibold text-naps-blue text-sm mb-2 hover:underline cursor-pointer">
              Christmas Holiday Resumption Message
            </h3>
            <img
              src={newsThumb}
              alt="Christmas Holiday Resumption Message"
              className="w-24 h-24 object-cover rounded mb-2"
            />
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              The staff and students of the Department of Physics, University of Jos, warmly welcome you…
            </p>
            <a href="#" className="text-naps-blue text-xs font-semibold inline-flex items-center gap-1 hover:underline">
              Read more <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;

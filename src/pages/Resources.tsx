import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import MainNav from "@/components/MainNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Eye,
  FileText,
  Search,
  Upload,
  User,
  Calendar,
  BookOpen,
  GraduationCap,
} from "lucide-react";

type ResourceType =
  | "Past Question"
  | "Lecture Note"
  | "Solved Question"
  | "Assignment"
  | "Summary"
  | "Other";

type Level = "100" | "200" | "300" | "400" | "MSc" | "General";

interface Resource {
  id: string;
  title: string;
  description?: string;
  courseCode?: string;
  level: Level;
  type: ResourceType;
  uploader: string;
  uploadedAt: string;
  views: number;
  downloads: number;
}

// Sample data removed — list is now driven by the Django backend.
// Wire `GET /api/resources/?level=&type=&q=` and set the result via setResources.

const LEVELS: { key: Level | "ALL"; label: string }[] = [
  { key: "ALL", label: "All Levels" },
  { key: "100", label: "100 Level" },
  { key: "200", label: "200 Level" },
  { key: "300", label: "300 Level" },
  { key: "400", label: "400 Level" },
  { key: "MSc", label: "Postgraduate" },
  { key: "General", label: "General" },
];

const TYPES: (ResourceType | "All")[] = [
  "All",
  "Past Question",
  "Solved Question",
  "Lecture Note",
  "Assignment",
  "Summary",
  "Other",
];

const typeColor: Record<ResourceType, string> = {
  "Past Question": "bg-naps-blue text-primary-foreground",
  "Solved Question": "bg-naps-gold text-naps-dark",
  "Lecture Note": "bg-naps-blue-light text-primary-foreground",
  Assignment: "bg-secondary text-secondary-foreground",
  Summary: "bg-accent text-accent-foreground",
  Other: "bg-muted text-foreground",
};

interface ResourceStats {
  totalResources: number;
  levelsCovered: string;
  contributors: number;
  totalDownloads: number;
}

// TODO: replace with `GET /api/resources/stats/` from Django backend
const DEFAULT_STATS: ResourceStats = {
  totalResources: 0,
  levelsCovered: "—",
  contributors: 0,
  totalDownloads: 0,
};

const formatCount = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`;
  if (n >= 10) return `${n}+`;
  return `${n}`;
};

const Resources = () => {
  const [activeLevel, setActiveLevel] = useState<Level | "ALL">("ALL");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [query, setQuery] = useState("");
  const [stats] = useState<ResourceStats>(DEFAULT_STATS);
  const [resources] = useState<Resource[]>([]);

  // TODO: replace with real auth from Django backend (e.g. session check via /api/auth/me/)
  const isAuthenticated = false;

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (activeLevel !== "ALL" && r.level !== activeLevel) return false;
      if (type !== "All" && r.type !== type) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${r.title} ${r.courseCode ?? ""} ${r.uploader}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeLevel, type, query, resources]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <MainNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-naps-dark via-naps-blue to-naps-blue-light text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <Badge className="bg-naps-gold text-naps-dark hover:bg-naps-gold mb-4">
              Student-Powered
            </Badge>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Extra Resources
            </h1>
            <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed">
              Past questions, solved problems, lecture notes and study summaries
              shared by your fellow Physics students. Browse freely — sign in to
              contribute.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {isAuthenticated ? (
                <Button asChild size="lg" className="bg-naps-gold text-naps-dark hover:bg-naps-gold/90">
                  <Link to="/resources/upload">
                    <Upload className="w-4 h-4" /> Upload a Resource
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-naps-gold text-naps-dark hover:bg-naps-gold/90">
                  <Link to="/login?next=/resources/upload">
                    <Upload className="w-4 h-4" /> Sign in to Upload
                  </Link>
                </Button>
              )}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="#browse">
                  <BookOpen className="w-4 h-4" /> Browse materials
                </a>
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { label: "Resources", value: formatCount(stats.totalResources) },
              { label: "Levels Covered", value: stats.levelsCovered },
              { label: "Contributors", value: formatCount(stats.contributors) },
              { label: "Downloads", value: formatCount(stats.totalDownloads) },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-md px-4 py-3"
              >
                <div className="font-heading text-2xl font-bold">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-primary-foreground/75">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse */}
      <section id="browse" className="container mx-auto px-4 py-10 flex-1">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by course code, title or uploader…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Filter by type
            </span>
            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Level tabs */}
        <Tabs
          value={activeLevel}
          onValueChange={(v) => setActiveLevel(v as Level | "ALL")}
          className="w-full"
        >
          <TabsList className="flex flex-wrap h-auto bg-muted p-1 mb-6">
            {LEVELS.map((l) => (
              <TabsTrigger
                key={l.key}
                value={l.key}
                className="data-[state=active]:bg-naps-blue data-[state=active]:text-primary-foreground"
              >
                {l.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeLevel} className="mt-0">
            {filtered.length === 0 ? (
              <div className="text-center py-16 border border-dashed rounded-lg">
                <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-heading text-lg font-semibold mb-1">
                  No resources match your filters
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Be the first to share something for this category.
                </p>
                <Button asChild className="bg-naps-blue hover:bg-naps-blue/90">
                  <Link to={isAuthenticated ? "/resources/upload" : "/login?next=/resources/upload"}>
                    <Upload className="w-4 h-4" /> Contribute a Resource
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((r) => (
                  <Card
                    key={r.id}
                    className="group hover:shadow-lg transition-shadow border-border/70"
                  >
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <Badge className={typeColor[r.type]}>{r.type}</Badge>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          {r.level === "General" ? "General" : `${r.level}L`}
                        </span>
                      </div>

                      <h3 className="font-heading font-semibold text-base leading-snug mb-2 group-hover:text-naps-blue transition-colors">
                        {r.title}
                      </h3>

                      {r.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {r.description}
                        </p>
                      )}

                      <div className="mt-auto pt-3 border-t border-border/60 text-xs text-muted-foreground space-y-1.5">
                        {r.courseCode && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span className="font-medium text-foreground">{r.courseCode}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5" /> {r.uploader}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(r.uploadedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> {r.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" /> {r.downloads}
                          </span>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="bg-naps-blue hover:bg-naps-blue/90"
                        >
                          <Link to={`/resources/${r.id}`}>
                            <Download className="w-4 h-4" /> View
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Contribute CTA */}
        <div className="mt-12 rounded-lg border border-naps-blue/20 bg-naps-light p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-naps-dark mb-1">
              Have study materials to share?
            </h3>
            <p className="text-sm text-muted-foreground">
              Help your fellow students. Upload past questions, solved problems
              or notes — admin reviews before they go live.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-naps-blue hover:bg-naps-blue/90 shrink-0"
          >
            <Link to={isAuthenticated ? "/resources/upload" : "/login?next=/resources/upload"}>
              <Upload className="w-4 h-4" />
              {isAuthenticated ? "Upload a Resource" : "Sign in to Upload"}
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Resources;

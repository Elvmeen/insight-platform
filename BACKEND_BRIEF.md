# Backend Brief — NAPS Resources API (Django)

This document is the contract between the existing React frontend (this repo) and a new Django backend. Hand this file to Replit (or any Django dev) as the source of truth.

## 1. Frontend overview

- Framework: React 18 + Vite + TypeScript, Tailwind, React Router.
- The Resources page lives at `/resources` (`src/pages/Resources.tsx`).
- The page already renders:
  - A hero with 4 stat tiles (Resources, Levels Covered, Contributors, Downloads).
  - A search box, a type filter (`Past Question`, `Solved Question`, `Lecture Note`, `Assignment`, `Summary`, `Other`).
  - Level tabs: `ALL`, `100`, `200`, `300`, `400`, `MSc`, `General`.
  - A grid of resource cards. Each card shows title, type badge, level, course code, uploader, date, views, downloads, and a "View" button linking to `/resources/:id`.
- Currently `resources` and `stats` are empty arrays / zero values. The TODO comments mark the exact spots to wire `fetch`.

The auth flag `isAuthenticated` is hardcoded to `false`. Replace with a real session check (`GET /api/auth/me/`).

## 2. Required endpoints

All JSON, all under `/api/`. CORS must allow the frontend origin.

### Public

- `GET /api/resources/?level=100|200|300|400|MSc|General&type=Past%20Question&q=phy101&page=1`
  Returns: `{ count, next, previous, results: Resource[] }`
- `GET /api/resources/:id/` — full resource + increments `views`.
- `GET /api/resources/:id/download/` — 302 to file URL, increments `downloads`.
- `GET /api/resources/stats/` — `{ totalResources, levelsCovered, contributors, totalDownloads }`.

### Auth (django-allauth or dj-rest-auth, session or JWT)

- `POST /api/auth/register/` — `{ email, password, full_name }`
- `POST /api/auth/login/` — `{ email, password }`
- `POST /api/auth/logout/`
- `GET  /api/auth/me/` — current user or 401.

### Authenticated

- `POST /api/resources/` (multipart/form-data) — create. Sets `is_approved=False`.
  Fields: `title, description?, course_code?, level, type, file, uploader_name?`
  - Logged-in: `uploaded_by` set from session, `uploader_name` ignored.
  - (Optional, decide policy:) Allow guest uploads — if so, drop the auth requirement on POST and require `uploader_name`.

## 3. Resource shape (must match the frontend type)

```ts
interface Resource {
  id: string;
  title: string;
  description?: string;
  courseCode?: string;          // serializer: source="course_code"
  level: "100"|"200"|"300"|"400"|"MSc"|"General";
  type: "Past Question"|"Lecture Note"|"Solved Question"|"Assignment"|"Summary"|"Other";
  uploader: string;             // display name (user.full_name or uploader_name)
  uploadedAt: string;           // ISO date
  views: number;
  downloads: number;
}
```

Use DRF serializers with `source=` to map snake_case DB fields → camelCase JSON.

## 4. Django models (suggested)

```python
# users/models.py — extend AbstractUser or use a Profile
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=120)
    matric_number = models.CharField(max_length=20, blank=True)
    level = models.CharField(max_length=10, blank=True)

# resources/models.py
class Resource(models.Model):
    LEVELS = [("100","100"),("200","200"),("300","300"),("400","400"),("MSc","MSc"),("General","General")]
    TYPES  = [("Past Question","Past Question"),("Solved Question","Solved Question"),
              ("Lecture Note","Lecture Note"),("Assignment","Assignment"),
              ("Summary","Summary"),("Other","Other")]

    title         = models.CharField(max_length=200)
    description   = models.TextField(blank=True)
    course_code   = models.CharField(max_length=20, blank=True)
    level         = models.CharField(max_length=10, choices=LEVELS)
    type          = models.CharField(max_length=20, choices=TYPES)
    file          = CloudinaryField("file")  # or models.FileField with S3/Supabase Storage
    uploaded_by   = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    uploader_name = models.CharField(max_length=80, blank=True)
    is_approved   = models.BooleanField(default=False)
    views         = models.PositiveIntegerField(default=0)
    downloads     = models.PositiveIntegerField(default=0)
    created_at    = models.DateTimeField(auto_now_add=True)
```

Public list query: `Resource.objects.filter(is_approved=True)`.

## 5. Stats endpoint logic

```python
def stats(_):
    qs = Resource.objects.filter(is_approved=True)
    return JsonResponse({
        "totalResources":  qs.count(),
        "levelsCovered":   "100–400" if qs.exists() else "—",
        "contributors":    qs.exclude(uploaded_by=None).values("uploaded_by").distinct().count(),
        "totalDownloads":  qs.aggregate(Sum("downloads"))["downloads__sum"] or 0,
    })
```

## 6. Admin panel

Use **Django's built-in admin** — do NOT build a custom one. Replit can scaffold this in 5 minutes:

```python
# resources/admin.py
@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display  = ("title","level","type","uploader_name","is_approved","created_at")
    list_filter   = ("is_approved","level","type")
    search_fields = ("title","course_code","uploader_name")
    actions       = ["approve_selected"]

    @admin.action(description="Approve selected resources")
    def approve_selected(self, request, queryset):
        queryset.update(is_approved=True)
```

**Recommendation:** let Replit do it. Django admin is auto-generated, ~20 lines per model. There is no benefit to building it on the frontend side.

## 7. Suggested stack & hosting (all free)

- **Backend:** Django 4.2 + Django REST Framework + django-cors-headers + dj-rest-auth.
- **DB:** PostgreSQL on Supabase or Neon (free).
- **File storage:** Cloudinary free tier (1 GB) OR Supabase Storage.
- **Hosting:** Render or Railway free tier. Use `gunicorn` + `whitenoise`.
- **Env vars:** `SECRET_KEY`, `DATABASE_URL`, `CLOUDINARY_URL`, `FRONTEND_ORIGIN`, `DEBUG`.

## 8. Frontend wiring (when backend is live)

In `src/pages/Resources.tsx`, replace the TODOs:

```ts
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/resources/?level=${activeLevel}&type=${type}&q=${query}`)
    .then(r => r.json()).then(d => setResources(d.results));
  fetch(`${import.meta.env.VITE_API_URL}/api/resources/stats/`)
    .then(r => r.json()).then(setStats);
}, [activeLevel, type, query]);
```

Add `VITE_API_URL=https://your-backend.onrender.com` to `.env`.

## 9. One-shot Replit prompt

> Build a Django 4.2 + DRF backend with two apps (`users`, `resources`) implementing the API in `BACKEND_BRIEF.md` (attached). Use PostgreSQL via `DATABASE_URL`, Cloudinary for files via `CLOUDINARY_URL`, dj-rest-auth + django-allauth for session auth, django-cors-headers allowing `FRONTEND_ORIGIN`. Register the `Resource` model in Django admin with list filters and a bulk "approve" action. Provide `requirements.txt`, `Procfile` (`web: gunicorn config.wsgi`), and `render.yaml`. Do not include any frontend code.

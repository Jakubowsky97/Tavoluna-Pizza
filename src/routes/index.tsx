import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getGoogleReviews } from "@/lib/reviews.functions";

const images = {
  antipasti: "/images/antipasti.jpg",
  cocktail: "/images/cocktail.jpg",
  facade: "/images/facade-sapori.jpg",
  interiorBanquette: "/images/interior-banquette.jpg",
  neonSapori: "/images/neon-sapori.jpg",
  pizzaMargherita: "/images/pizza-margherita.jpg",
  pizzaProsciutto: "/images/pizza-prosciutto.jpg",
  windowView: "/images/window-view.jpg",
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sapori Sandomierz — Pizzeria na Rynku" },
      {
        name: "description",
        content:
          "Pizzeria Sapori — autentyczna włoska pizza z pieca w sercu sandomierskiej Starówki. Rynek 29, Sandomierz.",
      },
      { property: "og:title", content: "Sapori Sandomierz — Pizzeria na Rynku" },
      {
        property: "og:description",
        content: "Autentyczna włoska pizza w sercu sandomierskiej Starówki.",
      },
      { property: "og:image", content: images.pizzaProsciutto },
      { name: "twitter:image", content: images.pizzaProsciutto },
    ],
  }),
  component: Index,
});

const menu = {
  Klasyczne: [
    {
      name: "Margherita",
      desc: "Sos pomidorowy, mozzarella fior di latte, świeża bazylia, oliwa",
      price: "29",
    },
    {
      name: "Prosciutto e Funghi",
      desc: "Mozzarella, szynka, świeże pieczarki, oregano",
      price: "39",
    },
    { name: "Diavola", desc: "Pikantne salami, mozzarella, papryczki chili, oliwa", price: "42" },
    { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmezan, ser kozi", price: "44" },
  ],
  "Specialità Sapori": [
    {
      name: "Sapori della Casa",
      desc: "Mozzarella, prosciutto crudo, rukola, pomidorki, płatki parmezanu",
      price: "48",
    },
    { name: "Tartufo", desc: "Krem truflowy, mozzarella, pieczarki, oliwa truflowa", price: "52" },
    { name: "Capricciosa", desc: "Szynka, pieczarki, karczochy, oliwki, mozzarella", price: "45" },
    {
      name: "Vegetariana",
      desc: "Cukinia, bakłażan, papryka, oliwki, pomidorki, mozzarella",
      price: "41",
    },
  ],
  "Antipasti & Dolci": [
    {
      name: "Bruschetta al Pomodoro",
      desc: "Grzanki z pomidorem, czosnkiem i bazylią",
      price: "22",
    },
    {
      name: "Caprese",
      desc: "Mozzarella di bufala, pomidor, bazylia, oliwa z oliwek",
      price: "32",
    },
    { name: "Tiramisù", desc: "Klasyczny włoski deser z mascarpone i kawą", price: "24" },
    { name: "Panna Cotta", desc: "Z sosem z owoców leśnych", price: "22" },
  ],
};

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Story />
      <Gallery />
      <Menu />
      <Reviews />
      <Visit />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a
          href="#"
          className="font-display text-2xl font-bold tracking-tight text-cream"
          style={{ color: "var(--cream)" }}
        >
          Sapori<span style={{ color: "var(--gold)" }}>.</span>
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex" style={{ color: "var(--cream)" }}>
          <a href="#story" className="opacity-90 transition hover:opacity-100">
            Historia
          </a>
          <a href="#menu" className="opacity-90 transition hover:opacity-100">
            Menu
          </a>
          <a href="#visit" className="opacity-90 transition hover:opacity-100">
            Odwiedź nas
          </a>
        </nav>
        <a
          href="tel:+48000000000"
          className="rounded-full border px-5 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/10"
          style={{ color: "var(--cream)", borderColor: "rgba(255,255,255,0.4)" }}
        >
          Rezerwacja
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src={images.pizzaProsciutto}
        alt="Pizza z szynką parmeńską i rukolą — Sapori Sandomierz"
        width={1536}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.015 40 / 0.55) 0%, oklch(0.16 0.015 40 / 0.4) 40%, oklch(0.16 0.015 40 / 0.92) 100%)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-40 md:px-10 md:pb-28">
        <p
          className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em]"
          style={{ color: "var(--gold)" }}
        >
          <span className="h-px w-10" style={{ background: "var(--gold)" }} /> Sandomierz · Rynek 29
        </p>
        <h1
          className="max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl"
          style={{ color: "var(--cream)" }}
        >
          Smak Włoch{" "}
          <em className="italic font-medium" style={{ color: "var(--gold)" }}>
            w sercu
          </em>{" "}
          sandomierskiej Starówki.
        </h1>
        <p
          className="mt-8 max-w-xl text-lg leading-relaxed"
          style={{ color: "rgba(252,251,248,0.85)" }}
        >
          Ręcznie wyrabiane ciasto, włoska mozzarella i pomidory San Marzano. Pizza z pieca,
          podawana z widokiem na Rynek.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#menu"
            className="rounded-full px-7 py-4 text-sm font-semibold transition hover:scale-105"
            style={{
              background: "var(--gradient-warm)",
              color: "var(--cream)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            Zobacz menu
          </a>
          <a
            href="#visit"
            className="rounded-full border px-7 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
            style={{ color: "var(--cream)", borderColor: "rgba(255,255,255,0.5)" }}
          >
            Znajdź nas
          </a>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center md:px-10">
        <div>
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "var(--terracotta)" }}
          >
            La nostra storia
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Włoska prostota,{" "}
            <em className="italic font-medium" style={{ color: "var(--basil)" }}>
              polska gościnność
            </em>
            .
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Sapori powstało z miłości do tradycyjnej kuchni włoskiej — tej, w której najmniej znaczy
            najwięcej. Ciasto dojrzewa u nas 48 godzin, sos przygotowujemy z pomidorów San Marzano,
            a mozzarellę sprowadzamy prosto z Kampanii.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Każdą pizzę wypiekamy w piecu w temperaturze 450°C — tak, jak robi się to w Neapolu od
            pokoleń.
          </p>
          <div
            className="mt-10 grid grid-cols-3 gap-6 border-t pt-8"
            style={{ borderColor: "var(--border)" }}
          >
            <Stat n="48h" l="dojrzewania ciasta" />
            <Stat n="450°" l="temperatura pieca" />
            <Stat n="4.6★" l="opinii gości" />
          </div>
        </div>
        <div className="relative">
          <img
            src={images.pizzaMargherita}
            alt="Margherita z pieca — Sapori"
            width={1440}
            height={1440}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-sm object-cover"
            style={{ boxShadow: "var(--shadow-warm)" }}
          />
          <div
            className="absolute -bottom-6 -left-6 hidden rounded-sm bg-card p-6 md:block"
            style={{ boxShadow: "var(--shadow-soft)", maxWidth: "260px" }}
          >
            <p className="font-display text-2xl italic" style={{ color: "var(--terracotta)" }}>
              "La semplicità è la massima sofisticazione."
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
              — Leonardo da Vinci
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold" style={{ color: "var(--terracotta)" }}>
        {n}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}

function Gallery() {
  return (
    <section className="relative py-24 md:py-32" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p
              className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: "var(--terracotta)" }}
            >
              Atmosfera
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Świeże smaki,{" "}
              <em className="italic font-medium" style={{ color: "var(--basil)" }}>
                ciepłe światło
              </em>
              .
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Kawałek Włoch w sandomierskiej kamienicy — neon, czerwone aksamity i talerze pełne
            koloru.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <GalleryTile src={images.facade} alt="Wejście do Sapori, Rynek 29" tall />
          <GalleryTile src={images.neonSapori} alt="Neon Sapori we wnętrzu" />
          <GalleryTile src={images.antipasti} alt="Antipasti — caprese i sałatki" />
          <GalleryTile src={images.cocktail} alt="Drink przy neonie Sapori" tall />
          <GalleryTile src={images.windowView} alt="Widok z okna na Bramę Opatowską" />
          <GalleryTile src={images.pizzaProsciutto} alt="Pizza z prosciutto i rukolą" />
        </div>
      </div>
    </section>
  );
}

function GalleryTile({ src, alt, tall }: { src: string; alt: string; tall?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm ${tall ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
}

function Menu() {
  return (
    <section
      id="menu"
      className="relative py-24 md:py-32"
      style={{ background: "var(--charcoal)", color: "var(--cream)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "var(--gold)" }}
          >
            Il menu
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Z pieca prosto{" "}
            <em className="italic font-medium" style={{ color: "var(--gold)" }}>
              na stół
            </em>
            .
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {Object.entries(menu).map(([cat, items]) => (
            <div key={cat}>
              <h3
                className="mb-8 border-b pb-4 font-display text-2xl font-bold"
                style={{ borderColor: "rgba(252,251,248,0.15)", color: "var(--gold)" }}
              >
                {cat}
              </h3>
              <ul className="space-y-6">
                {items.map((it) => (
                  <li key={it.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg font-semibold">{it.name}</span>
                      <span
                        className="font-display text-lg font-bold"
                        style={{ color: "var(--gold)" }}
                      >
                        {it.price} zł
                      </span>
                    </div>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: "rgba(252,251,248,0.65)" }}
                    >
                      {it.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-sm" style={{ color: "rgba(252,251,248,0.55)" }}>
          Pełne menu dostępne w restauracji. Ceny mogą się różnić.
        </p>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={images.interiorBanquette}
            alt="Wnętrze pizzerii Sapori"
            width={720}
            height={1090}
            loading="lazy"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "var(--terracotta)" }}
          >
            Vieni a trovarci
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Odwiedź nas na{" "}
            <em className="italic font-medium" style={{ color: "var(--basil)" }}>
              Rynku
            </em>
            .
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Znajdziesz nas w samym sercu sandomierskiej Starówki — zarezerwuj stolik z widokiem na
            Rynek.
          </p>

          <div className="mt-10 space-y-6 border-t pt-8" style={{ borderColor: "var(--border)" }}>
            <InfoRow label="Adres" value="Rynek 29, 27-600 Sandomierz" />
            <InfoRow label="Godziny" value={<div>Codziennie: 12:00 – 22:00</div>} />
            <InfoRow
              label="Kontakt"
              value={
                <div>
                  <a
                    href="https://www.facebook.com/p/Sapori-Sandomierz-61571400634935/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                    style={{ color: "var(--terracotta)" }}
                  >
                    Facebook.com/Sapori Sandomierz
                  </a>
                  <br />
                  <a
                    href="https://www.instagram.com/sapori_sandomierz/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                    style={{ color: "var(--terracotta)" }}
                  >
                    Instagram.com/Sapori Sandomierz
                  </a>
                </div>
              }
            />
          </div>

          <a
            href="https://maps.app.goo.gl/f2RdFFQTzkAKZUyh8"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex w-fit rounded-full px-7 py-4 text-sm font-semibold transition hover:scale-105"
            style={{
              background: "var(--gradient-warm)",
              color: "var(--cream)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            Otwórz w Mapach Google →
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-6">
      <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="text-base">{value}</div>
    </div>
  );
}

const fallbackReviews = [
  {
    name: "Anna K.",
    rating: 5,
    date: "2 tygodnie temu",
    text: "Najlepsza pizza w Sandomierzu! Cienkie, chrupiące ciasto i świetne składniki. Obsługa bardzo miła, klimat wnętrza cudowny — polecam każdemu odwiedzającemu Starówkę.",
  },
  {
    name: "Marek W.",
    rating: 5,
    date: "miesiąc temu",
    text: "Prosciutto e funghi rewelacja, ciasto idealne. Widok z okna na Rynek bezcenny. Wrócimy na pewno!",
  },
  {
    name: "Karolina P.",
    rating: 5,
    date: "3 tygodnie temu",
    text: "Klimat jak we Włoszech — neon, aksamity, świetne aperolki. Pizza Sapori della Casa to mistrzostwo. Obsługa szybka i uśmiechnięta.",
  },
  {
    name: "Tomasz R.",
    rating: 5,
    date: "2 miesiące temu",
    text: "Diavola z prawdziwą ostrością, mozzarella ciągnąca się aż miło. Najlepsza włoska kuchnia w mieście, bez dwóch zdań.",
  },
];

function Reviews() {
  const fetchReviews = useServerFn(getGoogleReviews);
  const { data } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: () => fetchReviews(),
    staleTime: 1000 * 60 * 60 * 6, // 6h
  });

  const items =
    (data?.reviews?.length ?? 0) > 0
      ? data!.reviews.map((r) => ({ name: r.author, rating: r.rating, date: r.date, text: r.text }))
      : fallbackReviews;
  const ratingDisplay = data?.rating != null ? data.rating.toFixed(1) : "4.6";
  const totalDisplay =
    data?.total != null ? `na podstawie ${data.total} opinii Google` : "na podstawie opinii Google";

  return (
    <section
      id="reviews"
      className="relative py-24 md:py-32"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: "var(--terracotta)" }}
            >
              Opinie gości
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Co mówią o nas{" "}
              <em className="italic font-medium" style={{ color: "var(--basil)" }}>
                na Google
              </em>
              .
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-display text-5xl font-bold" style={{ color: "var(--terracotta)" }}>
              {ratingDisplay}
            </div>
            <div>
              <div className="flex gap-1" aria-label={`Ocena ${ratingDisplay} na 5`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} filled={i < 5} />
                ))}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {totalDisplay}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((r) => (
            <article
              key={r.name}
              className="flex flex-col rounded-sm bg-card p-7"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} filled small />
                ))}
              </div>
              <p className="flex-1 text-[15px] leading-relaxed text-foreground/85">"{r.text}"</p>
              <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <div className="font-display text-base font-semibold">{r.name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {r.date}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/search?q=Pizzeria+Sapori+Sandomierz+opinie"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            style={{ color: "var(--terracotta)" }}
          >
            Zobacz wszystkie opinie w Google →
          </a>
        </div>
      </div>
    </section>
  );
}

function Star({ filled, small }: { filled?: boolean; small?: boolean }) {
  const size = small ? 14 : 18;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={filled ? "var(--gold)" : "none"}
      stroke="var(--gold)"
      strokeWidth="1.5"
    >
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row md:px-10">
        <div className="font-display text-xl font-bold" style={{ color: "var(--charcoal)" }}>
          Sapori<span style={{ color: "var(--terracotta)" }}>.</span>{" "}
          <span className="text-sm font-normal text-muted-foreground">Sandomierz</span>
        </div>
        <div>© {new Date().getFullYear()} Pizzeria Sapori. Wszystkie prawa zastrzeżone.</div>
      </div>
    </footer>
  );
}

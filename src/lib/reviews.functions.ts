import { createServerFn } from "@tanstack/react-start";

export type GoogleReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type ReviewsPayload = {
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
};

const PLACES_BASE = "https://places.googleapis.com/v1";
const QUERY = "Pizzeria Sapori Sandomierz Rynek 29";

function formatRelativeDate(publishTime: string, languageCode = "pl"): string {
  const then = new Date(publishTime).getTime();
  if (Number.isNaN(then)) return "";
  const diffSec = Math.max(0, (Date.now() - then) / 1000);
  const rtf = new Intl.RelativeTimeFormat(languageCode, { numeric: "auto" });
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];
  for (const [unit, sec] of units) {
    if (diffSec >= sec) return rtf.format(-Math.floor(diffSec / sec), unit);
  }
  return rtf.format(0, "minute");
}

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<ReviewsPayload> => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return { rating: null, total: null, reviews: [] };
    }

    // 1) Find Place ID via Text Search
    const searchRes = await fetch(`${PLACES_BASE}/places:searchText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName",
      },
      body: JSON.stringify({ textQuery: QUERY, languageCode: "pl", regionCode: "PL" }),
    });
    if (!searchRes.ok) {
      console.error("Places searchText failed", searchRes.status, await searchRes.text());
      return { rating: null, total: null, reviews: [] };
    }
    const searchJson = (await searchRes.json()) as {
      places?: Array<{ id: string; displayName?: { text: string } }>;
    };
    const placeId = searchJson.places?.[0]?.id;
    if (!placeId) return { rating: null, total: null, reviews: [] };

    // 2) Place details with reviews
    const detailsRes = await fetch(
      `${PLACES_BASE}/places/${placeId}?languageCode=pl&regionCode=PL`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
      },
    );
    if (!detailsRes.ok) {
      console.error("Places details failed", detailsRes.status, await detailsRes.text());
      return { rating: null, total: null, reviews: [] };
    }
    const details = (await detailsRes.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        rating: number;
        text?: { text: string };
        originalText?: { text: string };
        authorAttribution?: { displayName: string };
        publishTime: string;
      }>;
    };

    const reviews = (details.reviews ?? [])
      .filter((r) => r.rating >= 4 && (r.text?.text || r.originalText?.text))
      .sort((a, b) => b.rating - a.rating || +new Date(b.publishTime) - +new Date(a.publishTime))
      .slice(1, 6)
      .map<GoogleReview>((r) => ({
        author: r.authorAttribution?.displayName ?? "Gość Google",
        rating: r.rating,
        date: formatRelativeDate(r.publishTime),
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
      }));

    return {
      rating: details.rating ?? null,
      total: details.userRatingCount ?? null,
      reviews,
    };
  },
);

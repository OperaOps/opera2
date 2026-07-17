// Every unique visual available to the landing wall, in wall-sized
// variants: 480p clips (videos/wall/) and 420px thumbs (posters/wall/).
// Full-resolution sources stay untouched for the product sections.

const clip = (name: string) => `/videos/wall/${name}.mp4`;
const thumb = (name: string) => `/videos/posters/wall/${name}.jpg`;

export const WALL_VIDEOS: string[] = [
  "knee-anatomy-acl",
  "knee2",
  "knee3",
  "knee4",
  "knee5",
  "knee6",
  "cardio-stent",
  "scope-device",
  "medication-routine",
  "patient-watching-home",
  "patient-watching-veo",
  "veo-01",
  "veo-02",
  "veo-03",
  "veo-04",
  "veo-05",
  "veo-06",
  "veo-07",
  "veo-08",
  "veo-09",
  "veo-10",
  "veo-11",
  "veo-12",
  "veo-13",
  "veo-14",
  // the full dental allowance
  "hero-tooth",
  "invisalignseries",
  "crown-outcome",
  "bracesoutcome",
  "ceramic-smile",
  "expander-device",
].map(clip);

/** Poster frame for a wall clip, shown when the video budget is spent. */
export const wallPoster = (src: string) =>
  `/videos/posters/${src.split("/").pop()!.replace(/\.mp4$/, "")}-a.jpg`;

const SITEPICS = Array.from({ length: 38 }, (_, i) =>
  `sitepic-${String(i + 1).padStart(2, "0")}`
);

export const WALL_IMAGES: string[] = [
  ...SITEPICS,
  "sitepic-39",
  "jesse-orrico-Us3AQvyOP-o-unsplash",
  "robina-weermeijer-NIuGLCC7q54-unsplash",
  "bhautik-patel-NVprB2Xt1bA-unsplash",
  "owen-beard-DK8jXx1B-1c-unsplash",
  "jonathan-borba-Ld50KjnPSzM-unsplash",
  "piron-guillaume-U4FyCp3-KzY-unsplash",
  "stefanie-belinda-tHSLU1CMc7g-unsplash",
  "patricia-prudente--P2djqAwM8U-unsplash",
].map(thumb);

export const WALL_POOL: { kind: "video" | "image"; src: string }[] = [
  ...WALL_VIDEOS.map((src) => ({ kind: "video" as const, src })),
  ...WALL_IMAGES.map((src) => ({ kind: "image" as const, src })),
];

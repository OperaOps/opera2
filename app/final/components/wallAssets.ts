// Every unique visual available to the landing wall. Each is a genuinely
// distinct piece of source material (no stills derived from clips that are
// also in the pool, so nothing can ever read as a duplicate), and each
// appears in at most one cell at a time.

export const WALL_VIDEOS: string[] = [
  "/videos/knee-anatomy-acl.mp4",
  "/videos/knee2.mp4",
  "/videos/knee3.mp4",
  "/videos/knee4.mp4",
  "/videos/knee5.mp4",
  "/videos/knee6.mp4",
  "/videos/library/cardio-stent.mp4",
  "/videos/library/scope-device.mp4",
  "/videos/library/colonoscopy-patient-video.mp4",
  "/videos/library/medication-routine.mp4",
  "/videos/library/patient-watching-home.mp4",
  "/videos/sitepics/patient-watching-veo.mp4",
  // photoreal Veo clips
  "/videos/sitepics/veo-01.mp4",
  "/videos/sitepics/veo-02.mp4",
  "/videos/sitepics/veo-03.mp4",
  "/videos/sitepics/veo-04.mp4",
  "/videos/sitepics/veo-05.mp4",
  "/videos/sitepics/veo-06.mp4",
  "/videos/sitepics/veo-07.mp4",
  "/videos/sitepics/veo-08.mp4",
  "/videos/sitepics/veo-09.mp4",
  "/videos/sitepics/veo-10.mp4",
  "/videos/sitepics/veo-11.mp4",
  "/videos/sitepics/veo-12.mp4",
  "/videos/sitepics/veo-13.mp4",
  "/videos/sitepics/veo-14.mp4",
  // the full dental allowance
  "/videos/hero-tooth.mp4",
  "/videos/invisalignseries.mp4",
  "/videos/crown-outcome.mp4",
  "/videos/bracesoutcome.mp4",
  "/videos/ceramic-smile.mp4",
  "/videos/expander-device.mp4",
];

const SITEPICS = Array.from(
  { length: 38 },
  (_, i) => `/videos/sitepics/sitepic-${String(i + 1).padStart(2, "0")}.jpeg`
);

export const WALL_IMAGES: string[] = [
  ...SITEPICS,
  "/videos/sitepics/sitepic-39.png",
  "/videos/sitepics/jesse-orrico-Us3AQvyOP-o-unsplash.jpg",
  "/videos/sitepics/robina-weermeijer-NIuGLCC7q54-unsplash.jpg",
  "/videos/sitepics/bhautik-patel-NVprB2Xt1bA-unsplash.jpg",
  "/videos/sitepics/owen-beard-DK8jXx1B-1c-unsplash.jpg",
  "/videos/sitepics/jonathan-borba-Ld50KjnPSzM-unsplash.jpg",
  "/videos/sitepics/piron-guillaume-U4FyCp3-KzY-unsplash.jpg",
  "/videos/sitepics/stefanie-belinda-tHSLU1CMc7g-unsplash.jpg",
  "/videos/sitepics/patricia-prudente--P2djqAwM8U-unsplash.jpg",
];

export const WALL_POOL: { kind: "video" | "image"; src: string }[] = [
  ...WALL_VIDEOS.map((src) => ({ kind: "video" as const, src })),
  ...WALL_IMAGES.map((src) => ({ kind: "image" as const, src })),
];

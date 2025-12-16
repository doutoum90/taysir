export type Slide = {
  src: string;
  key: string;
  title?: string;
  subtitle?: string;
  alt?: string;
};

export const slides: Slide[] = [
  { src: "/assets/slide1.jpg", key: "slides.s1" },
  { src: "/assets/slide2.jpg", key: "slides.s2" },
  { src: "/assets/slide3.jpg", key: "slides.s3" },
  { src: "/assets/slide4.jpg", key: "slides.s4" },
  { src: "/assets/slide5.jpg", key: "slides.s5" }
];

export type ActivityCategory =
  | "Eau"
  | "Qurban"
  | "Repas"
  | "Coran"
  | "Élevage"
  | "Mosquées"
  | "Autres";

export type Service = {
  id: string;
  category: ActivityCategory;
  titleKey: string;
  descriptionKey: string;
  bulletsKey: string;
  images: string[];
};

export const services: Service[] = [
  {
    id: "a1",
    category: "Eau",
    titleKey: "activities.a1.title",
    descriptionKey: "activities.a1.desc",
    bulletsKey: "activities.a1.bullets",
    images: [
      "/assets/puits/photo1.jpg",
      "/assets/puits/photo2.jpg",
      "/assets/puits/photo3.jpg",
      "/assets/puits/photo4.jpg",
    ],
  },
  {
    id: "a2",
    category: "Qurban",
    titleKey: "activities.a2.title",
    descriptionKey: "activities.a2.desc",
    bulletsKey: "activities.a2.bullets",
    images: [
      "/assets/moutons/photo1.jpg",
      "/assets/moutons/photo2.jpg",
      "/assets/moutons/photo3.jpg",
      "/assets/moutons/photo4.jpg",
      "/assets/moutons/photo5.jpg",
    ],
  },
  {
    id: "a3",
    category: "Repas",
    titleKey: "activities.a3.title",
    descriptionKey: "activities.a3.desc",
    bulletsKey: "activities.a3.bullets",
    images: [
      "/assets/autres/photo1.jpg",
      "/assets/autres/photo2.jpg",
      "/assets/autres/photo3.jpg",
    ],
  },
  {
    id: "a4",
    category: "Coran",
    titleKey: "activities.a4.title",
    descriptionKey: "activities.a4.desc",
    bulletsKey: "activities.a4.bullets",
    images: [
      "/assets/coran/photo1.jpg",
      "/assets/coran/photo2.jpg",
      "/assets/coran/photo3.jpg",
      "/assets/coran/photo4.jpg",
    ],
  },
  {
    id: "a5",
    category: "Élevage",
    titleKey: "activities.a5.title",
    descriptionKey: "activities.a5.desc",
    bulletsKey: "activities.a5.bullets",
    images: [
      "/assets/moutons/photo1.jpg",
      "/assets/moutons/photo2.jpg",
      "/assets/moutons/photo3.jpg",
    ],
  },
  {
    id: "a6",
    category: "Mosquées",
    titleKey: "activities.a6.title",
    descriptionKey: "activities.a6.desc",
    bulletsKey: "activities.a6.bullets",
    images: [
      "/assets/mosquee/photo1.jpg",
      "/assets/mosquee/photo2.jpg",
      "/assets/mosquee/photo3.jpg",
    ],
  },
  {
    id: "a7",
    category: "Autres",
    titleKey: "activities.a7.title",
    descriptionKey: "activities.a7.desc",
    bulletsKey: "activities.a7.bullets",
    images: [
      "/assets/autres/photo1.jpg",
      "/assets/autres/photo2.jpg",
      "/assets/autres/photo3.jpg",
    ],
  },
];

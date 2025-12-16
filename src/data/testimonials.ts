export type Testimonial = {
  id: string;
  name: string;         // généralement on ne traduit pas le nom
  roleKey: string;      // rôle traduit
  rating: number;       // 1..5
  messageKey: string;   // message traduit
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Fatima A.",
    roleKey: "testimonialsData.t1.role",
    rating: 5,
    messageKey: "testimonialsData.t1.message"
  },
  {
    id: "t2",
    name: "Youssouf M.",
    roleKey: "testimonialsData.t2.role",
    rating: 5,
    messageKey: "testimonialsData.t2.message"
  },
  {
    id: "t3",
    name: "Amina K.",
    roleKey: "testimonialsData.t3.role",
    rating: 4,
    messageKey: "testimonialsData.t3.message"
  }
];

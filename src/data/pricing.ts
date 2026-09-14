export const pricingPlans = {
  ps5: {
    name: "PS5",
    subtitle: "Next-gen gaming experience",
    plans: [
      { duration: "6 Hours", price: "₹499" }
    ],
    features: ["Premium console", "DualSense controller", "3 Premium Games", "Free Delivery"],
    ctaText: "Rent PS5",
    primary: true,
  },
  ps4: {
    name: "PS4",
    subtitle: "Flexible Rental Plans",
    plans: [
      { duration: "6 hours", price: "₹249" },
      { duration: "24 hours", price: "₹349" },
      { duration: "2 days", price: "₹649" },
      { duration: "3 days", price: "₹999" }
    ],
    features: [
      "5 Free games included",
      "PS4 console & one controller include",
      "Drop and pickup",
    ],
    ctaText: "Rent PS4",
    primary: false,
  },
};

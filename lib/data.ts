export type Product = {
  name: string;
  tagline: string;
  desc: string;
  img: string;
  tint: string; // category label tint
};

export const cheeses: Product[] = [
  {
    name: "Mozzarella",
    tagline: "The pizza favourite.",
    desc: "Beautiful stretch, golden melt. Perfect for pizzas, toasties, pasta bakes and foodservice.",
    img: "/img/pizza.jpg",
    tint: "#e7b64a",
  },
  {
    name: "Cheddar",
    tagline: "Rich, creamy and versatile.",
    desc: "Ideal for burgers, sandwiches, tacos, baked potatoes or everyday family meals.",
    img: "/img/burger.jpg",
    tint: "#e08a3c",
  },
  {
    name: "Parmesan",
    tagline: "Bold, savoury flavour.",
    desc: "A perfectly grated texture. Finish pastas, risottos, salads and roasted vegetables.",
    img: "/img/pasta-parm.jpg",
    tint: "#d8c191",
  },
  {
    name: "Feta",
    tagline: "Creamy, crumbly and fresh.",
    desc: "Perfect for salads, Mediterranean dishes, pizzas and grazing platters.",
    img: "/img/feta-salad.jpg",
    tint: "#8a9968",
  },
  {
    name: "Cream Cheese",
    tagline: "Smooth. Creamy. Spreadable.",
    desc: "Ideal for bagels, cheesecakes, sauces, dips and baking.",
    img: "/img/creamcheese-real.jpg",
    tint: "#eaddb9",
  },
  {
    name: "Sour Cream",
    tagline: "Rich and tangy.",
    desc: "The perfect finishing touch for Mexican dishes, baked potatoes and nachos.",
    img: "/img/nachos.jpg",
    tint: "#c98f2c",
  },
];

export const meats: Product[] = [
  {
    name: "Burgers",
    tagline: "Juicy, hearty and BBQ-ready.",
    desc: "Perfect in burgers, wraps and loaded fries.",
    img: "/img/burger2.jpg",
    tint: "#c4622d",
  },
  {
    name: "Meatballs",
    tagline: "Tender and packed with flavour.",
    desc: "Serve with pasta, subs or rich tomato sauces.",
    img: "/img/meatballs.jpg",
    tint: "#9a4a2c",
  },
  {
    name: "Pulled Pork Style",
    tagline: "Slow-cooked flavour, no pork.",
    desc: "Perfect for tacos, sliders, loaded fries, pizzas and rice bowls.",
    img: "/img/pulledpork.jpg",
    tint: "#a5572f",
  },
  {
    name: "Seafood Rings",
    tagline: "Light, crispy, made for sharing.",
    desc: "Ideal for sharing platters, seafood baskets and pub-style meals.",
    img: "/img/calamari.jpg",
    tint: "#c99a55",
  },
  {
    name: "Fish Fingers",
    tagline: "Golden, crunchy, family friendly.",
    desc: "Perfect with chips, salads or wraps.",
    img: "/img/fishchips.jpg",
    tint: "#d3a860",
  },
  {
    name: "Pastrami",
    tagline: "Traditional deli flavour.",
    desc: "Perfect for sandwiches, bagels, platters and cafés.",
    img: "/img/pastrami.jpg",
    tint: "#9c3a2f",
  },
  {
    name: "Salami Sticks",
    tagline: "Ready-to-eat snacking.",
    desc: "Perfect for lunchboxes, entertaining or on-the-go.",
    img: "/img/salami.jpg",
    tint: "#8f2f2a",
  },
  {
    name: "Chorizo Sticks",
    tagline: "Bold. Smoky. Full of flavour.",
    desc: "Enjoy as a snack or slice into pizzas, pasta and tapas dishes.",
    img: "/img/chorizo.jpg",
    tint: "#a83820",
  },
];

export const pillars = [
  {
    no: "01",
    title: "Delicious First",
    desc: "We believe plant-based food should simply taste incredible.",
  },
  {
    no: "02",
    title: "Premium Ingredients",
    desc: "Carefully selected ingredients combined with years of product development.",
  },
  {
    no: "03",
    title: "Foodservice Ready",
    desc: "Designed to perform consistently in cafés, restaurants and commercial kitchens.",
  },
  {
    no: "04",
    title: "Australian Market Focus",
    desc: "Committed to supplying Australian retailers, distributors and foodservice partners.",
  },
];

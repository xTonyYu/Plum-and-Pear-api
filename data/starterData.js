const bcrypt = require("bcryptjs");

const userData = [
  {
    userName: "AdminX",
    email: "x@gmail.com",
    password: "$2a$10$WHAOrDFlUH5fwdxW6D9s6eqnNZe3Bb/yYWoS1qG1K75d7kuaYYtuK",
    firstName: "Tony",
    lastName: "Yu",
    streetAddress: "123 A St. #123",
    city: "San Mateo",
    state: "CA",
    zipCode: "94401",
  },
  {
    userName: "customer",
    email: "y@gmail.com",
    password: "$2a$10$zF8hKRPc.N.3IkOrabuUZOV63goeJYd1h7ZL/0zNxWUGPTaa7CG/m",
    firstName: "Tony",
    lastName: "Yu",
    streetAddress: "123 West 58th St. #1011",
    city: "New York",
    state: "NY",
    zipCode: "10019",
  },
  {
    userName: "Vader",
    email: "DV@gdeathstar.org",
    password: "$2a$10$zF8hKRPc.N.3IkOrabuUZOV63goeJYd1h7ZL/0zNxWUGPTaa7CG/m",
    firstName: "Darth",
    lastName: "Vader",
    streetAddress: "123 Central Park West #1210",
    city: "New York",
    state: "NY",
    zipCode: "10019",
  },
];

const productData = [
  {
    prodType: "Sith",
    quantity: 150,
    name: "Darth Vader",
    price: 49.99,
    cost: 5,
    liked: 999,
    description: "Anakin Skywalker was a Force-sensitive Human male who served the Galactic Republic as a Jedi Knight and later served the Galactic Empire as the Sith Lord Darth Vader.",
    image: "/images/babyVader.png",
  },
  {
    prodType: "Sith",
    quantity: 50,
    name: "Darth Maul",
    price: 39.99,
    cost: 5,
    liked: 600,
    description: "Darth Maul was a Force-sensitive male Dathomirian Zabrak Dark Lord of the Sith who lived during the waning years of the Galactic Republic.",
    image: "https://vignette.wikia.nocookie.net/starwars/images/5/50/Darth_Maul_profile.png/revision/latest/scale-to-width-down/499?cb=20140209162228",
  },
  {
    prodType: "Sith",
    quantity: 80,
    name: "Darth Sidiou",
    price: 59.99,
    cost: 5,
    liked: 234,
    description: "Darth Sidious, born Sheev Palpatine and commonly known simply as the Emperor, was a Force-sensitive human male who became a Dark Lord of the Sith and Galactic Emperor of the Galactic Empire, shaping history and ruling the galaxy throughout most of the Imperial Era.",
    image: "https://vignette.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png/revision/latest?cb=20130620100935",
  },
  {
    prodType: "Painting",
    quantity: 15,
    name: "Palm Tree Pastel 2016",
    price: 29.99,
    cost: 10,
    liked: 1389,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque necessitatibus earum et at voluptatum. Blanditiis magni, ad reiciendis, totam ipsum vero ea dolores aliquid praesentium eum labore, illum voluptas cumque.",
    image: "/images/palmtree.jpeg",
  },
  {
    prodType: "Painting",
    quantity: 10,
    name: "New thing",
    price: 15,
    cost: 2.5,
    liked: 231,
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis deserunt, sequi libero veniam autem sint commodi nisi nesciunt hic ratione quis pariatur at eligendi, aut eaque? Consectetur mollitia dolores ducimus harum ipsum quaerat ipsa, veniam ipsam corporis rerum, quae labore!",
    image: "/images/palmtree.jpeg",
  },
  {
    name: "Hofner Electric Violin AS-160E-V",
    price: 595,
    cost: 150,
    prodType: "Violin",
    quantity: 30,
    liked: 99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi fugit voluptates itaque, consectetur eius consequatur laboriosam quod qui placeat.",
    image: "https://elcoda.com/images/super/hofner-electric-violin-as-160e-v-1.jpg",
  },
  {
    name: "NEW Electric Violin",
    price: 200,
    cost: 50,
    prodType: "Violin",
    quantity: 15,
    image: "https://elcoda.com/images/super/hofner-electric-violin-as-160e-v-1.jpg",
  },
];

const cartData = [
    {
        prodName: 'starter',
    }
]
module.exports = { userData, productData, cartData };

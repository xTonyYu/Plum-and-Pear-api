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
];

const productData = [
  {
    prodType: "Painting",
    quantity: 5,
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
    quantity: 3,
    liked: 99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi fugit voluptates itaque, consectetur eius consequatur laboriosam quod qui placeat.",
    image: "https://elcoda.com/images/super/hofner-electric-violin-as-160e-v-1.jpg",
  },
  {
    name: "NEW Electric Violin",
    price: 200,
    cost: 50,
    prodType: "Violin",
    quantity: 10,
    image: "https://elcoda.com/images/super/hofner-electric-violin-as-160e-v-1.jpg",
  },
];

const cartData = [
    {
        prodName: 'starter',
    }
]
module.exports = { userData, productData, cartData };

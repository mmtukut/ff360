import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';

export const featuredProperties = [
  {
    id: 1,
    title: "Modern Apartment in Maitama",
    price: "₦75,000,000",
    location: "Maitama District, Abuja",
    beds: 3,
    baths: 2,
    area: "150m²",
    image: image1,
    description: "Spacious apartment with modern amenities in the heart of Maitama.",
    coordinates: [7.498, 9.082], // Maitama coordinates
  },
  {
    id: 2,
    title: "Luxury Villa in Asokoro",
    price: "₦120,000,000",
    location: "Asokoro District, Abuja",
    beds: 5,
    baths: 4,
    area: "300m²",
    image: image2,
    description: "Elegant villa with premium finishes in prestigious Asokoro.",
    coordinates: [7.526, 9.045] // Asokoro coordinates
  },
  {
    id: 3,
    title: "Office Space in Central Business District",
    price: "₦45,000,000",
    location: "CBD, Abuja",
    beds: null,
    baths: 2,
    area: "200m²",
    image: image3,
    description: "Prime office space in Abuja's business hub.",
    coordinates: [7.498, 9.027] // CBD coordinates
  }
];

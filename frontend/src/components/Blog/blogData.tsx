import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Mastering Virtual Trading: A Beginner's Guide",
    paragraph:
      "Learn how to navigate the market risk-free using live NSE data and AI-driven insights from Praedico.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Praedico Research Team",
      image: "/images/blog/author-03.png",
      designation: "Market Analyst",
    },
    tags: ["Trading"],
    publishDate: "2026",
  },
  {
    id: 2,
    title: "Understanding AI Predictions in Modern Investing",
    paragraph:
      "Explore how artificial intelligence is reshaping the landscape of stock market forecasting and decision making.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Praedico Research Team",
      image: "/images/blog/author-02.png",
      designation: "Fintech Expert",
    },
    tags: ["AI"],
    publishDate: "2026",
  },
  {
    id: 3,
    title: "Top 5 Strategies for NSE Derivatives Trading",
    paragraph:
      "Deep dive into the most effective strategies for trading derivatives on the National Stock Exchange.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Praedico Research Team",
      image: "/images/blog/author-03.png",
      designation: "Certified Trader",
    },
    tags: ["NSE"],
    publishDate: "2026",
  },
];
export default blogData;

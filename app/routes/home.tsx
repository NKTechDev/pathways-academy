import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Header from "component/Header";
import Home2 from "component/home/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pathways Academy — Learn. Grow. Achieve." },
    {
      name: "description",
      content:
        "Pathways Academy is a premier institute for O-Levels, A-Levels, IGCSE, and IELTS preparation. We provide expert faculty, small-group learning, personalized mentoring, and a proven track record of academic success to help students achieve their highest potential.",
    },
    // Open Graph
    { property: "og:title", content: "Pathways Academy — Learn. Grow. Achieve." },
    {
      property: "og:description",
      content:
        "Join Pathways Academy for O/A-Levels, IGCSE, and IELTS. Experienced teachers, personalized support, and excellent results.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://pathwaysacademy.com" }, // 🔄 update with your actual domain
    { property: "og:image", content: "https://pathwaysacademy.com/og-logo.png" }, // 🔄 replace with your logo/OG image URL (1200x630 recommended)
    // Twitter card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Pathways Academy — Learn. Grow. Achieve." },
    {
      name: "twitter:description",
      content:
        "Expert-led classes for O/A-Levels, IGCSE, and IELTS with personalized support and outstanding results.",
    },
    { name: "twitter:image", content: "https://pathwaysacademy.com/og-logo.png" }, // 🔄 same as og:image
  ];
}

export default function Home() {

   return (
    <Home2/>
     )

}

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
        "Pathways Academy offers expert-led classes for O/A-Levels, IGCSE, and IELTS. Small batches, personalized support, and proven results.",
    },
  ];
}
export default function Home() {

   return (
    <Home2/>
     )

}

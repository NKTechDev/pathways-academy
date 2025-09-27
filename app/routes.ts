// routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // index "/" → Home
  index("routes/home.tsx"),

  // simple pages
//   route("about", "routes/about.tsx"),
//   route("contact", "routes/contact.tsx"),

  // extra examples
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("forget-password", "routes/forget.tsx"),
  route("contact", "routes/contactUs.tsx"),



//   route("login", "routes/login.tsx"),
] satisfies RouteConfig;

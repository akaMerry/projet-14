import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/index.tsx"),
    route("/employees-list", "routes/employees-list.tsx"),
  ]),
] satisfies RouteConfig;

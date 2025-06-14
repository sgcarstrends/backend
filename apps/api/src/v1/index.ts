import { getCarsByFuelType } from "@api/lib/getCarsByFuelType";
import { OpenAPIHono } from "@hono/zod-openapi";
import { FuelType } from "@sgcarstrends/types";
import { bearerAuth } from "hono/bearer-auth";
import { Resource } from "sst";
import cars from "./routes/cars";
import coe from "./routes/coe";
import months from "./routes/months";

const v1 = new OpenAPIHono();

v1.use(bearerAuth({ token: Resource.SG_CARS_TRENDS_API_TOKEN.value }));

v1.get("/", async (c) => {
  const month = c.req.query("month");
  return c.json({ data: await getCarsByFuelType(FuelType.Petrol, month) });
});

v1.route("/cars", cars);
v1.route("/coe", coe);
v1.route("/months", months);

export default v1;

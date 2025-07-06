import Link from "next/link";
import slugify from "@sindresorhus/slugify";
import { Battery, Droplet, Fuel, type LucideIcon, Zap } from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Car } from "@/types";
import type { FuelType } from "@/types/cars";

// interface Category {
//   title: string;
//   description?: string;
//   icon: LucideIcon;
//   colour: string;
//   url: string;
// }

interface Props {
  data: FuelType[];
}
 
// TODO: Keeping this for now
// const CATEGORIES: Category[] = [
//   {
//     title: "Overall",
//     description: "Combination of all fuel types",
//     icon: Trophy,
//     colour: "text-yellow-600",
//   },
//   {
//     title: "Petrol",
//     description: "Internal Combustion Engine (ICE) vehicles",
//     icon: Fuel,
//     colour: "text-red-600",
//     url: "/cars/fuel-types/petrol",
//   },
//   {
//     title: "Hybrid",
//     description: "Includes Petrol, Diesel and Plug-In types",
//     icon: Zap,
//     colour: "text-blue-600",
//     url: "/cars/fuel-types/hybrid",
//   },
//   {
//     title: "Electric",
//     description: "Battery Electric Vehicles (BEV)",
//     icon: Battery,
//     colour: "text-green-600",
//     url: "/cars/fuel-types/electric",
//   },
//   {
//     title: "Diesel",
//     description: "Compression-ignition engine vehicles",
//     icon: Droplet,
//     colour: "text-gray-600",
//     url: "/cars/fuel-types/diesel",
//   },
// ];

export const TopMakes = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      {data.map(({ fuelType, total, makes }) => {
        const href = `/cars/fuel-types/${slugify(fuelType)}`;

        return (
          <Card key={fuelType}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/*<Icon className={`size-6 ${colour}`} />*/}
                {fuelType}
              </CardTitle>
              {/*<CardDescription>{description}</CardDescription>*/}
            </CardHeader>
            <CardContent>
              {makes.map(({ make, count }) => (
                <div
                  key={make}
                  className="grid grid-cols-2 border-b py-2 last:border-none"
                >
                  <span>{make.toUpperCase()}</span>
                  <div className="flex items-center gap-2">
                    <AnimatedNumber value={count} />
                    <progress
                      className="progress text-primary"
                      value={count / total}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href={href} className="underline">
                View More
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

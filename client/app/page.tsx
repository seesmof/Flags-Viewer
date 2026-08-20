"use client";

import { Input } from "@/components/ui/input";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export enum Region {
  Europe = "Europe",
  Asia = "Asia",
  America = "America",
}

export type Flag = {
  countryName: string;
  region: Region;
  imageName: string;
};

const flags: Flag[] = [
  { countryName: "Israel", region: Region.Asia, imageName: "il" },
  { countryName: "Japan", region: Region.Asia, imageName: "jp" },
  { countryName: "Netherlands", region: Region.Europe, imageName: "nl" },
  { countryName: "Sweden", region: Region.Europe, imageName: "se" },
  { countryName: "Ukraine", region: Region.Europe, imageName: "ua" },
  {
    countryName: "United States of America",
    region: Region.America,
    imageName: "us",
  },
];

export default function IndexPage() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-slate-700 text-white" : "bg-stone-50"}`}
    >
      <nav
        className={`sticky top-0 border-b-2 ${isDark ? "bg-slate-800 border-slate-900" : "bg-white"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="font-bold hover:underline underline-offset-4">
            <Link href={"/"}>Where in the world?</Link>
          </h1>
          <button
            className={`cursor-pointer p-3 rounded-md flex gap-3 ${isDark ? "hover:bg-slate-700" : "hover:bg-stone-100"}`}
            onClick={() => setIsDark((isDark) => !isDark)}
          >
            {isDark ? <Sun /> : <Moon />}
            <p className="hidden sm:block">
              {isDark ? "Light Mode" : "Dark Mode"}
            </p>
          </button>
        </div>
      </nav>
      <main>
        <div className="container mx-auto gap-5 px-4 py-2 flex items-center">
          <input
            className={`outline w-full rounded-md px-4 py-2 ${isDark ? "outline-slate-900 bg-slate-800" : "bg-white"}`}
            type="text"
            placeholder="Enter a country name..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="container grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 py-2 mx-auto">
          {flags
            .filter((flag) =>
              flag.countryName
                .toLocaleLowerCase()
                .includes(country.toLowerCase()),
            )
            .map((flag, index) => (
              <div
                className={`p-5 rounded-md shadow outline ${isDark ? "outline-slate-900 bg-slate-800 border-slate-900" : "bg-white"}`}
                key={index}
              >
                <Image
                  src={`/${flag.imageName}.png`}
                  alt={`A flag of ${flag.countryName}`}
                  width={200}
                  height={100}
                  className="w-full rounded-md"
                />
                <h3 className="font-bold mt-5">{flag.countryName}</h3>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

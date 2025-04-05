import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      className="flex flex-col items-center gap-8 h-screen justify-center bg-slate-100" // bg-[#11DF97]
    >
      <div className="container flex flex-col items-center gap-5">
        <h1 className="text-[30pt] font-bold">My Projects</h1>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col items-start gap-5 bg-white shadow-md p-5 rounded-2xl w-1/3">
            <div className="flex items-center gap-5">
              <Image
                src={"/images/icons/pencil-ruler.svg"}
                width={30}
                height={30}
                alt="globe"
                className="bg-[#11DF97] p-2 w-12 h-12 rounded-xl shadow-md"
              />
              <h3 className="font-bold text-3xl">Graphic Designs</h3>
            </div>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Email marketing designs</strong>
              <Button variant={"outline"}>View</Button>
            </article>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Logo designs</strong>
              <Button variant={"outline"}>View</Button>
            </article>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Flyers</strong>
              <Button variant={"outline"}>View</Button>
            </article>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Web page mock-ups</strong>
              <Button variant={"outline"}>View</Button>
            </article>
          </div>
          <div className="flex flex-col items-start gap-5 bg-white shadow-md p-5 rounded-2xl w-1/3">
            <div className="flex items-center gap-5">
              <Image
                src={"/images/icons/film.svg"}
                width={30}
                height={30}
                alt="globe"
                className="bg-[#11DF97] p-2 w-12 h-12 rounded-xl shadow-md"
              />
              <h3 className="font-bold text-3xl">Animations & Videos</h3>
            </div>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Logo animations</strong>
              <Button variant={"outline"}>View</Button>
            </article>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Lottie animations</strong>
              <Button variant={"outline"}>View</Button>
            </article>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Video editing</strong>
              <Button variant={"outline"}>View</Button>
            </article>
          </div>
          <div className="flex flex-col items-start gap-5 bg-white shadow-md p-5 rounded-2xl w-1/3">
            <div className="flex items-center gap-5">
              <Image
                src={"/images/icons/code.svg"}
                width={30}
                height={30}
                alt="globe"
                className="bg-[#11DF97] p-2 w-12 h-12 rounded-xl shadow-md"
              />
              <h3 className="font-bold text-3xl">Web Development</h3>
            </div>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Wordpress dev</strong>
              <Button variant={"outline"}>View</Button>
            </article>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Backend dev (Django)</strong>
              <Button variant={"outline"}>View</Button>
            </article>
            <article className="flex justify-between items-center border-1 p-4 w-full rounded-2xl">
              <strong>Frontend dev (NextJS)</strong>
              <Button variant={"outline"}>View</Button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

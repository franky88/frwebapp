import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="flex items-center gap-8 h-screen justify-center"
    >
      <div className="container flex items-center justify-center gap-10">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-3xl">About Me</p>
          <h1 className="text-[60pt] font-bold -mb-8 -mt-8">FRANKLIN RAMOS</h1>
          <p className="text-lg max-w-2xl mt-4">
            I am a versatile Multimedia Artist with over 10 years of experience
            in graphic design, video editing, animation, and web development.
            Skilled in Adobe Creative Suite and various multimedia tools, I
            create visually compelling and user-friendly digital experiences.
            With a passion for creativity and innovation, I deliver high-quality
            designs, animations, and websites that make an impact.
          </p>
          <div className="flex gap-3">
            <Button variant={"default"} className="mt-4">
              <Link href="/resume" className="flex gap-2" passHref>
                View Resume
              </Link>
            </Button>
            <Button variant={"outline"} className="mt-4">
              <Link href="/resume" passHref>
                Hire Me
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={"/images/profile_image.png"}
          width={350}
          height={350}
          alt="next logo"
        />
      </div>
    </section>
  );
};

export default HeroSection;

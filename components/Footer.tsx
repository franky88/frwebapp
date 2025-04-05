import Image from "next/image";
import React from "react";
import { navigationItems } from "@/data/navigationItems";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-8 bg-accent">
      <div className="flex flex-col gap-10 container mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <Link href={"/"} legacyBehavior passHref>
              <Image
                src={"/images/frlogo.svg"}
                width={50}
                height={50}
                alt="frlogo"
              />
            </Link>
            <div>
              <h2 className="font-bold">
                <Link href={"/"} legacyBehavior passHref>
                  Franklin Ramos
                </Link>
              </h2>
              <small className="text-gray-500">
                Multimedia Artist / Web Designer / Web Developer
              </small>
            </div>
          </div>
          <nav>
            <h3 className="font-bold">Links</h3>
            <ul>
              {navigationItems.map((item) => (
                <li
                  key={item.title}
                  className="px-2 my-2 rounded-sm hover:bg-slate-200 hover:px-2"
                >
                  <Link href={item.link} legacyBehavior passHref>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article>
            <h3 className="font-bold">Contact information</h3>
            <div>
              <div className="flex gap-4 items-center">
                <Image
                  src={"/images/icons/mail.svg"}
                  alt="mail"
                  width={20}
                  height={20}
                />
                <Link href={"mailto:ramosfp99@gmail.com"}>
                  ramosfp99@gmail.com
                </Link>
              </div>
              <div className="flex gap-4 items-center">
                <Image
                  src={"/images/linkedin_logo.svg"}
                  alt="mail"
                  width={20}
                  height={20}
                />
                <Link href={"https://linkedin.com"}>LinkedIn</Link>
              </div>
            </div>
          </article>
        </div>
        <p>
          All rights reserved © {new Date().getFullYear()} by Franklin Ramos
        </p>
      </div>
    </footer>
  );
};

export default Footer;

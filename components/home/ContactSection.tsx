import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="flex flex-col items-center gap-8 h-screen justify-center"
    >
      <div className="flex items-center justify-center gap-5 w-full">
        <div
          className="relative flex flex-col gap-8 h-screen items-end justify-center w-[50%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/contact_us.jpg')" }}
        >
          {/* Green Overlay with Blur */}
          <div className="absolute inset-0 bg-[#11DF97]/70 backdrop-blur-[5px]"></div>

          {/* Content */}
          <div className="relative z-10">
            <article className="flex items-start gap-12">
              <Image
                src={"/images/linkedin_logo.svg"}
                width={35}
                height={35}
                alt="linkedin logo"
              />
              <div className="flex flex-col items-start">
                <h1 className="text-[20pt] font-bold">
                  <Link
                    href={
                      "https://www.linkedin.com/in/franklin-ramos-6898b954/"
                    }
                  >
                    Linkedin
                  </Link>
                </h1>
                <p className="max-w-md mr-5">
                  Message me in Linkedin and I will be in touch within the
                  business days.
                </p>
              </div>
            </article>
            <article className="flex items-start gap-12 mt-8">
              <Image
                src={"/images/whatsapp.svg"}
                width={35}
                height={35}
                alt="wechat logo"
              />
              <div className="flex flex-col items-start">
                <h1 className="text-[20pt] font-bold">
                  <Link href={"https://google.com"}>WhatsUp</Link>
                </h1>
                <p className="max-w-md mr-5">
                  Message me in WhatsUp and I will be in touch within the
                  business days.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-start w-[50%]">
          <article className="flex flex-col items-start">
            <h1 className="text-[30pt] font-bold">Contact Me</h1>
            <p className="max-w-md">
              {`Let's talk about your website or your projects. Send me a message
              and I will be in touch within the business days.`}
            </p>
          </article>
          <div className="flex flex-col gap-5 bg-slate-100 shadow-lg w-[500px] rounded-2xl p-5">
            <h3 className="font-bold">Send Me a Message</h3>
            <form action="" className="flex flex-col gap-5 w-full">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" id="name" className="bg-white" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-white"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  name="message"
                  id="message"
                  className="bg-white h-24"
                />
              </div>
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

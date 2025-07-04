"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";

// this part is to make the banner dynamic and moving
const HeroSection = () => {
    const imageRef = useRef(null);
    useEffect(() => {
      const imageElement=imageRef.current;

      const handleScroll=()=>{
          const scrollPosition = window.scrollY;
          const scrollThreshhold = 100;
          if(scrollPosition>scrollThreshhold){
              imageElement.classList.add("scrolled");
            }
            else{
                imageElement.classList.remove("scrolled")
            }
        };
        window.addEventListener("scroll",handleScroll);
        return()=>window.removeEventListener("scroll",handleScroll)


  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
           Industry-Grade Guidance <br />
           Powered by TrAIn
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:texxt-xl">
            Boost your Career with personalized guidance, interview prep, and
            AI-powered tools for landing jobs.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>

          <Link href="https://github.com/sakshamXcode">
            <Button size="lg" className="px-8" variant={"outline"}>
              My Github
            </Button>
          </Link>
        </div>
      </div>
      <div className="hero-image-wrapper mt-5 md:mt-0">
        <div ref={imageRef} className="hero-image">
          <Image
            src="/banner.png"
            alt="banner"
            width={800} // wider
            height={300} // shorter
            className="mx-auto w-full max-w-5xl rounded-xl object-contain mt-4"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

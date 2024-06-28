import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../assets/logo.svg";
import LandingImage from "../assets/main.svg";

const Home = () => {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="Jobify" />
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            officiis distinctio consequuntur, voluptas cumque accusamus
            molestias placeat iste delectus ratione.
          </p>

          <Button asChild className="mt-4">
            <Link href={"/add-job"}>Get Started</Link>
          </Button>
        </div>

        <Image
          src={LandingImage}
          alt="Jobify"
          className="hidden lg:block"
          width={400}
          height={400}
        />
      </section>
    </main>
  );
};

export default Home;

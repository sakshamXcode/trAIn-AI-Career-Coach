"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";


const Header = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      {/* look at the header tailwind u will see a lot comes frrom shadcn-tailwind */}
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="transition-all duration-300 hover:animate-electric">
          <Image
            src="/logo6.png"
            alt="Padhaku"
            width={100}
            height={60}
            className="h-12 py-1/2 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant={"outline"}>
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Sector Intelligence</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Progress Stack</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Momentum Drivers</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => router.push("/resume")}> 
                  <FileText className="h-4 w-4" />
                  <span>Resume Builder</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/ai-cover-letter")}> 
                  <PenBox className="h-4 w-4" />
                  <span>AI-Cover Letter</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/interview")}> 
                  <GraduationCap className="h-4 w-4" />
                  <span>Interview Prep</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/dsa")}> 
                  <GraduationCap className="h-4 w-4" />
                  <span>DSA Revision</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton>
            <Button className={'cursor-pointer'} variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className={'cursor-pointer'} variant="outline">Sign Up</Button>
              </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{elements:{avatarBox:'w-10 h-10',
                userButtonPopoverCard:"shadow-xl",
                userPreviewMainIdentifier:"font-semibold"
            },
            }} afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;

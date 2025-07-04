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
import  {Button}  from "./ui/button";
 import { checkUser } from "@/lib/checkUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = async () => {
   await checkUser();
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
                <DropdownMenuItem>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Resume Builder</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    <span>AI-Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Prep</span>
                  </Link>
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

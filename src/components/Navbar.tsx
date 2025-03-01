import { Globe } from "lucide-react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <div className="rounded-full bg-primary/10 p-2">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl">Globetrotter</span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                Leaderboard
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                About
              </a>
            </li>
          </ul>
        </nav>
        <Button variant="ghost" size="sm" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  );
}

export default Navbar;

import { Globe } from "lucide-react";
import "./App.css";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <main className="flex-1">
        <section className="flex justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              The Globetrotter Challenge
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Test your travel knowledge with cryptic clues about famous
              destinations around the world. Guess correctly to unlock fun facts
              and trivia!
            </p>
            <div className="space-x-4">
              <Link to="/username">
                <Button size="lg" className="px-8">
                  Start Playing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore, challenge, and track your global knowledge
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="group flex flex-col items-center space-y-4 rounded-xl border p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Explore the World</h3>
              <p className="text-center text-muted-foreground">
                Discover fascinating destinations and learn interesting facts
                about places around the globe.
              </p>
            </div>

            <div className="group flex flex-col items-center space-y-4 rounded-xl border p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
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
                  className="h-8 w-8 text-primary"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Challenge Friends</h3>
              <p className="text-center text-muted-foreground">
                Share your score and challenge your friends to beat it with a
                custom invitation link.
              </p>
            </div>

            <div className="group flex flex-col items-center space-y-4 rounded-xl border p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
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
                  className="h-8 w-8 text-primary"
                >
                  <path d="M12 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                  <path d="M12 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                  <path d="M20 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                  <path d="M20 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                  <path d="M4 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                  <path d="M4 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                  <path d="M12 10v8" />
                  <path d="m7.5 15.5 9-9" />
                  <path d="m7.5 6.5 9 9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Track Your Progress</h3>
              <p className="text-center text-muted-foreground">
                Keep track of your score and see how well you know the world's
                most famous destinations.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Featured Destination
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to test your knowledge?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our curated collection of global destinations will challenge
                even the most seasoned travelers. From hidden gems to famous
                landmarks, how many can you identify?
              </p>
              <div className="pt-4">
                <Button className="rounded-full">Start Quiz Now</Button>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">100+ Destinations</h3>
                  <p className="mt-2">From every corner of the globe</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

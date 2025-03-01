"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Globe, Share2, Frown, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

interface Destination {
  id: string;
  name: string;
  clues: string[];
  facts: string[];
  image: string;
}

export default function GamePage() {
  const [
    currentDestination,
    setCurrentDestination,
  ] = useState<Destination | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [fact, setFact] = useState<string>("");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [inviterUsername, setInviterUsername] = useState<string | null>(null);
  const [inviterScore, setInviterScore] = useState<{
    correct: number;
    incorrect: number;
  } | null>(null);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const inviterId = searchParams.get("inviter");

  useEffect(() => {
    // Check if user has a username stored
    const checkUsername = async () => {
      try {
        const response = await fetch("/api/users/me");
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setUserId(data.id);
          setScore(data.score);
        } else {
          // Redirect to username page if no username is set
          navigate("/username");
        }
      } catch (error) {
        console.error("Error checking username:", error);
        navigate("/username");
      }
    };

    // Get inviter details if coming from an invitation
    const getInviterDetails = async () => {
      if (inviterId) {
        try {
          const response = await fetch(`/api/users/${inviterId}`);
          if (response.ok) {
            const data = await response.json();
            setInviterUsername(data.username);
            setInviterScore(data.score);
          }
        } catch (error) {
          console.error("Error fetching inviter details:", error);
        }
      }
    };

    const loadGame = async () => {
      await checkUsername();
      await getInviterDetails();
      await fetchNewDestination();
    };

    // loadGame();
  }, [inviterId, navigate]);

  useEffect(() => {
    // Update share URL when userId changes
    if (userId) {
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}/game?inviter=${encodeURIComponent(userId)}`);
    }
  }, [userId]);

  const fetchNewDestination = async () => {
    setIsLoading(true);
    setSelectedOption(null);
    setIsCorrect(null);
    setFact("");

    try {
      // Fetch a random destination with options
      const response = await fetch("/api/destinations/random");
      if (response.ok) {
        const data = await response.json();
        setCurrentDestination(data.destination);
        setOptions(data.options);
      } else {
        console.error("Failed to fetch destination");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (option: string) => {
    if (selectedOption !== null || !currentDestination) return;

    setSelectedOption(option);
    const correct = option === currentDestination.name;
    setIsCorrect(correct);

    // Update local score
    if (correct) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    // Show a random fact
    if (currentDestination.facts.length > 0) {
      const randomFact =
        currentDestination.facts[
          Math.floor(Math.random() * currentDestination.facts.length)
        ];
      setFact(randomFact);
    }

    // Update score on the server
    updateScore(correct);
  };

  const updateScore = async (correct: boolean) => {
    try {
      const response = await fetch("/api/users/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correct }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update score from server response to ensure consistency
        setScore(data.score);
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const generateShareImage = () => {
    // In a real implementation, this would generate an image with the user's score
    // For now, we'll just return a placeholder URL
    return (
      "/api/share-image?username=" +
      encodeURIComponent(username || "") +
      "&correct=" +
      score.correct +
      "&incorrect=" +
      score.incorrect
    );
  };

  const handleShare = () => {
    const shareImage = generateShareImage();
    const shareText = `I scored ${score.correct} correct answers in the Globetrotter Challenge! Can you beat me?`;

    // For WhatsApp sharing
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      shareText + " " + shareUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Globe className="h-5 w-5" />
            <span>Globetrotter</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              Playing as: <span className="font-bold">{username}</span>
            </div>
            <div className="text-sm">
              Score:{" "}
              <span className="font-bold text-green-600">{score.correct}</span>{" "}
              /{" "}
              <span className="font-bold text-red-600">{score.incorrect}</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Challenge a Friend
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Challenge a Friend</DialogTitle>
                  <DialogDescription>
                    Share your score and challenge your friends to beat it!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="text-center space-y-2">
                      <p className="font-medium">Your Score</p>
                      <div className="text-2xl font-bold">
                        {score.correct} correct / {score.incorrect} incorrect
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={generateShareImage() || "/placeholder.svg"}
                      alt="Share preview"
                      className="max-w-full h-auto rounded-lg border"
                      width={300}
                      height={200}
                    />
                  </div>
                  <Button onClick={handleShare} className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on WhatsApp
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {inviterUsername && inviterScore && (
          <div className="mb-8 p-4 border rounded-lg bg-muted/30">
            <p className="font-medium">
              You were challenged by{" "}
              <span className="font-bold">{inviterUsername}</span>!
            </p>
            <p className="text-sm text-muted-foreground">
              Their score: {inviterScore.correct} correct /{" "}
              {inviterScore.incorrect} incorrect
            </p>
          </div>
        )}

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Where in the world is this?</CardTitle>
            <CardDescription>
              Read the clues and guess the destination
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentDestination && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Clues:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {currentDestination.clues.slice(0, 2).map((clue, index) => (
                      <li key={index}>{clue}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  {options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        selectedOption === option
                          ? option === currentDestination?.name
                            ? "default"
                            : "destructive"
                          : "outline"
                      }
                      className={`h-auto py-3 justify-start ${
                        selectedOption === option &&
                        option === currentDestination?.name
                          ? "bg-green-600 hover:bg-green-700"
                          : ""
                      }`}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedOption !== null}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {isCorrect !== null && (
                  <div
                    className={`p-4 rounded-lg ${
                      isCorrect
                        ? "bg-green-100 dark:bg-green-900/20"
                        : "bg-red-100 dark:bg-red-900/20"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <>
                          <PartyPopper className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <span className="font-bold text-green-600 dark:text-green-400">
                            Correct!
                          </span>
                        </>
                      ) : (
                        <>
                          <Frown className="h-5 w-5 text-red-600 dark:text-red-400" />
                          <span className="font-bold text-red-600 dark:text-red-400">
                            Incorrect! The answer was {currentDestination.name}.
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm">{fact}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={fetchNewDestination}
              className="w-full"
              disabled={isLoading}
            >
              {selectedOption === null ? "Skip" : "Next Destination"}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, MongoDB, and a passion for travel.
          </p>
        </div>
      </footer>
    </div>
  );
}

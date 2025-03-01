import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Frown, PartyPopper } from "lucide-react";

interface QuizCardProps {
  clues: string[];
  options: { _id: string; name: string }[];
  handleAnswer: (option: string) => void;
  isCorrect?: boolean | null;
  isLoading?: boolean;
  fetchNewDestination: () => void;
  actualCity?: string;
  fact?: string;
  selectedOption: string | null;
}

function QuizCard({
  clues = [],
  options,
  handleAnswer,
  isCorrect = false,
  isLoading = false,
  fetchNewDestination,
  actualCity,
  fact,
  selectedOption,
}: QuizCardProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="items-start">
        <CardTitle className="text-2xl">Where in the world is this?</CardTitle>
        <CardDescription>
          Read the clues and guess the destination
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 ">
        <div className="space-y-4">
          <div className="flex flex-col items-start space-y-2">
            <h3 className="font-medium">Clues:</h3>
            <ul className="flex flex-col list-disc pl-5 space-y-2">
              {clues.slice(0, 2).map((clue, index) => (
                <li className="justify-items-start" key={index}>
                  {clue}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
            {options.map((option) => (
              <Button
                key={option._id}
                variant={
                  selectedOption === option.name
                    ? isCorrect
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className={`h-auto py-3 justify-start ${
                  selectedOption === option.name && isCorrect
                    ? "bg-green-600 hover:bg-green-700"
                    : "text-black"
                }`}
                onClick={() => {
                  handleAnswer(option.name);
                }}
                disabled={selectedOption !== null}
              >
                {option.name}
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
                      Incorrect! The answer was {actualCity}.
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm">{fact}</p>
            </div>
          )}
        </div>
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
  );
}

export default QuizCard;

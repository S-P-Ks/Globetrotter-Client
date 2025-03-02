import { Medal, RotateCcw, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useGetUserQuery } from "../store/features/userApi";
import { useCallback } from "react";

function CompletionCard() {
  const { data: UserData } = useGetUserQuery();

  const resetQuiz = () => {};

  const getAccuracyPercentage = useCallback(() => {
    return Math.round(
      (parseInt(UserData?.correctScore ?? "0") /
        (parseInt(UserData?.correctScore ?? "0") +
          parseInt(UserData?.incorrectScore ?? "0"))) *
        100
    );
  }, [UserData]);

  const getFeedbackMessage = () => {
    const accuracy = getAccuracyPercentage();
    if (accuracy >= 90)
      return "World Explorer! Your geography knowledge is exceptional!";
    if (accuracy >= 70)
      return "Globe Trotter! You really know your way around the world!";
    if (accuracy >= 50)
      return "Aspiring Traveler! You're on your way to becoming a geography expert!";
    return "Novice Explorer! Keep discovering our amazing world!";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg border-2 border-blue-100 dark:border-blue-900/20">
        <CardHeader className="items-center text-center bg-blue-50 dark:bg-blue-900/20 rounded-t-lg">
          <Medal className="h-16 w-16 text-yellow-500 mb-2" />
          <CardTitle className="text-3xl font-bold text-blue-800">
            Quiz Complete!
          </CardTitle>
          <CardDescription className="text-lg text-blue-600">
            You've completed the GlobeTrotter Geography Quiz
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              {getFeedbackMessage()}
            </h2>

            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 rounded-full bg-blue-50 border-4 border-blue-500 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-4xl font-bold text-blue-700">
                    {getAccuracyPercentage()}%
                  </span>
                  <span className="text-sm text-blue-600">Accuracy</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                <p className="text-sm text-gray-500">Correct</p>
                <p className="text-2xl font-bold text-green-600">
                  {UserData?.correctScore}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-gray-500">Incorrect</p>
                <p className="text-2xl font-bold text-red-600">
                  {UserData?.incorrectScore}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {parseInt(UserData?.correctScore ?? "0") +
                    parseInt(UserData?.incorrectScore ?? "0")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-b-lg flex flex-col sm:flex-row gap-3">
          <Button
            onClick={resetQuiz}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 flex items-center justify-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>

          <Button
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 flex items-center justify-center"
            variant="default"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CompletionCard;

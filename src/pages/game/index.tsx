"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import QuizCard from "../../components/QuizCard";
import { useGetUserByIDQuery } from "../../store/features/userApi";
import {
  useGetRandomCityQuery,
  useValidateOptionMutation,
} from "../../store/features/cityApi";
import CompletionCard from "../../components/CompletionCard";

export default function GamePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [actualCity, setActualCity] = useState<string | null>(null);
  const [fact, setFact] = useState<string>("");
  const [score] = useState({ correct: 0, incorrect: 0 });

  const [searchParams] = useSearchParams();
  const inviterId = searchParams.get("inviter");

  const { data: inviterData } = useGetUserByIDQuery(`${inviterId ?? ""}`, {
    refetchOnMountOrArgChange: true,
    skip: !inviterId,
  });
  const {
    data: cityData,
    refetch,
    isFetching: isFetchingCity,
  } = useGetRandomCityQuery();

  const [validateOption] = useValidateOptionMutation();

  const fetchNewDestination = async () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setFact("");

    try {
      refetch()
        .unwrap()
        .then(() => {});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAnswer = async (option: string) => {
    setSelectedOption(option);

    validateOption({
      cityId: cityData?.data._id ?? "",
      guess: option,
    })
      .unwrap()
      .then((data) => {
        setIsCorrect(data.correct);
        setActualCity(data.actualCity);

        if (data.correct) {
          // setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });

          const randomFact =
            data.facts[Math.floor(Math.random() * data.facts.length)];
          setFact(randomFact);
        } else {
          console.log(score);
          // setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
        }
      });
  };

  if (isFetchingCity) {
    return <Loader />;
  }

  if (!cityData?.data || cityData.options.length == 0) {
    return <CompletionCard />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        {inviterData && (
          <div className="mb-8 p-4 border rounded-lg bg-muted/30">
            <p className="font-medium">
              You were challenged by{" "}
              <span className="font-bold">{inviterData.user.username}</span>!
            </p>
            <p className="text-sm text-muted-foreground">
              Their score: {inviterData.correctScore} correct /{" "}
              {inviterData.incorrectScore} incorrect
            </p>
          </div>
        )}

        <QuizCard
          clues={cityData?.data.clues ?? []}
          options={cityData?.options ?? []}
          handleAnswer={handleAnswer}
          isCorrect={isCorrect}
          isLoading={isFetchingCity}
          fetchNewDestination={fetchNewDestination}
          actualCity={actualCity ?? ""}
          fact={fact ?? ""}
          selectedOption={selectedOption}
        />
      </main>
    </div>
  );
}

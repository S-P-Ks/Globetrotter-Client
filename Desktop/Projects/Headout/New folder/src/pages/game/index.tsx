"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import axiosClient from "../../axios";
import QuizCard from "../../components/QuizCard";
import { useGetUserQuery } from "../../store/features/userApi";
import {
  useGetRandomCityQuery,
  useValidateOptionMutation,
} from "../../store/features/cityApi";

export default function GamePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [actualCity, setActualCity] = useState<string | null>(null);
  const [fact, setFact] = useState<string>("");
  const [score] = useState({ correct: 0, incorrect: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [inviterUsername, setInviterUsername] = useState<string | null>(null);
  const [inviterScore, setInviterScore] = useState<{
    correct: number;
    incorrect: number;
  } | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: UserData, isFetching, isError } = useGetUserQuery();
  const { data: cityData, refetch } = useGetRandomCityQuery();

  console.log(UserData);

  const [validateOption] = useValidateOptionMutation();

  useEffect(() => {
    if (isError) {
      navigate("/username");
    }
  }, [isError]);

  const inviterId = searchParams.get("inviter");

  useEffect(() => {
    const getInviterDetails = async () => {
      if (inviterId) {
        try {
          const response = await axiosClient.get(`/user/${inviterId}`);
          const data = await response.data;
          setInviterUsername(data.username);
          setInviterScore(data.score);
        } catch (error) {
          console.error("Error fetching inviter details:", error);
        }
      }
    };

    const loadGame = async () => {
      await getInviterDetails();
      await fetchNewDestination();
    };

    loadGame();
  }, [inviterId, navigate]);

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
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen flex-col">
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

        <QuizCard
          clues={cityData?.data.clues ?? []}
          options={cityData?.options ?? []}
          handleAnswer={handleAnswer}
          isCorrect={isCorrect}
          isLoading={isFetching}
          fetchNewDestination={fetchNewDestination}
          actualCity={actualCity ?? ""}
          fact={fact ?? ""}
          selectedOption={selectedOption}
        />
      </main>
    </div>
  );
}

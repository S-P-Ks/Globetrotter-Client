"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import axiosClient from "../../axios";
import QuizCard from "../../components/QuizCard";
import { CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Frown, PartyPopper } from "lucide-react";
import { useGetUserQuery } from "../../store/features/userApi";
import {
  useGetRandomCityQuery,
  useValidateOptionMutation,
} from "../../store/features/cityApi";

interface Destination {
  id: string;
  name: string;
  clues: string[];
  facts: string[];
  image: string;
}

export default function GamePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [actualCity, setActualCity] = useState<string | null>(null);
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

  const { data: UserData, isFetching, isError } = useGetUserQuery();
  const {
    data: cityData,
    isFetching: isDestinationFetching,
    isError: isDestinationError,
    refetch,
  } = useGetRandomCityQuery();

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

  useEffect(() => {
    // Update share URL when userId changes
    if (userId) {
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}/game?inviter=${encodeURIComponent(userId)}`);
    }
  }, [userId]);

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

          updateScore(data.correct);
        } else {
          console.log(score);
          // setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
        }
      });
  };

  const updateScore = async (correct: boolean) => {
    try {
      // const response = await axiosClient.post("/user/score", { correct });
      // const data = response.data;
      // setScore(data.score);
    } catch (error) {
      console.error("Error updating score:", error);
    }
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

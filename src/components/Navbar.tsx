import { Globe, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetUserByUsernameQuery,
  useGetUserQuery,
} from "../store/features/userApi";

function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const inviterId = searchParams.get("inviter");
  const navigate = useNavigate();
  const { data: userData, isFetching, isError } = useGetUserQuery();
  const {
    data: inviterData,
    isFetching: isInviterFetching,
    isError: isInviterError,
  } = useGetUserByUsernameQuery(`${inviterId ?? ""}`, {
    refetchOnMountOrArgChange: true,
    skip: !inviterId,
  });

  useEffect(() => {
    if (isError) {
      navigate("/username");
    }
  }, [isError]);

  const generateShareImage = () => {
    return (
      `${import.meta.env.VITE_API_URL}/share-image?username=` +
      encodeURIComponent(userData?.user.username || "") +
      "&correct=" +
      userData?.correctScore +
      "&incorrect=" +
      userData?.incorrectScore
    );
  };

  const handleShare = () => {
    const baseUrl = window.location.origin;
    const shareImage = generateShareImage();
    const shareText = `I scored ${userData?.correctScore} correct answers in the Globetrotter Challenge! Can you beat me?`;
    const shareUrl = `${baseUrl}/game?inviter=${encodeURIComponent(
      userData?.user._id ?? ""
    )}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      shareText + " " + shareUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <div className="rounded-full bg-primary/10 p-2">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl">Globetrotter</span>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <div className="flex flex-row">
              <div className="text-sm">
                Playing as:{" "}
                <span className="font-bold">{userData?.user.username}</span>
              </div>
              <div className="ml-2 text-sm">
                Score:{" "}
                <span className="font-bold text-green-600">
                  {userData?.correctScore}
                </span>{" "}
                /{" "}
                <span className="font-bold text-red-600">
                  {userData?.incorrectScore}
                </span>
              </div>
            </div>
            {inviterId && (
              <div className="flex flex-row">
                <div className="text-sm">
                  Inviter :{" "}
                  <span className="font-bold">
                    {inviterData?.user.username}
                  </span>
                </div>
                <div className="ml-2 text-sm">
                  Score:{" "}
                  <span className="font-bold text-green-600">
                    {inviterData?.correctScore}
                  </span>{" "}
                  /{" "}
                  <span className="font-bold text-red-600">
                    {inviterData?.incorrectScore}
                  </span>
                </div>
              </div>
            )}
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
                      {userData?.correctScore} correct /{" "}
                      {userData?.incorrectScore} incorrect
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

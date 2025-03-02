import type React from "react";

import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreateUserMutation } from "../../store/features/userApi";

export default function UsernamePage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviterId = searchParams.get("inviter");

  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      await createUser({ username })
        .unwrap()
        .then(() => {
          navigate(`/game${inviterId ? `?inviter=${inviterId}` : ""}`);
        })
        .catch((err: any) => {
          console.log(err);
          console.error("Failed to register username");
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Choose a Username</h1>
            <p className="text-muted-foreground">
              Enter a username to start playing and challenge your friends
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Start Playing"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

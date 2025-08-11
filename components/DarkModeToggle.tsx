import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const DarkModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // When the component mounts on the client, update the state to indicate it is mounted
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Render nothing on the server
  if (!mounted) return null;

  // Once the component has mounted, we can safely render
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    {resolvedTheme === "dark" ?(
        <Sun className="w-5 h-5 text-amber-400" />
    ) : (
        <Moon className="w-5 h-5 text-blue-600" />
    )}
  </Button>
  );
};

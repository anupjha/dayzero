import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <span className="flex"><Logo /> &copy;</span>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Link href="/privacy">
            <Button size="sm" variant="ghost">
              Privacy Policy
            </Button>
          </Link>
          <Link href="/terms">
            <Button size="sm" variant="ghost">
              Terms of Service
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

import SignIn from "@/components/sign-in";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Return to frontpage
      </Link>
      
      <div className="absolute inset-0 -z-10 bg-transparent overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-blue-100/30 blur-[120px] rounded-full mix-blend-multiply opacity-50"></div>
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-indigo-100/30 blur-[120px] rounded-full mix-blend-multiply opacity-50"></div>
      </div>
      
      <SignIn />
    </div>
  );
}

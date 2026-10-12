"use client";

import React from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Flairtek <span className="text-blue-600">Review AI</span>
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900">Create Free Account</h2>
          <p className="mt-2 text-sm text-slate-600">
            Start your 14-day free trial. No credit card required.
          </p>
        </div>

        <Card className="p-8 border-slate-200/80 shadow-sm bg-white">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Sanjay Kumar" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="At least 8 characters" required />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold h-11">
              Create Account & Start Trial
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-11 gap-2 font-medium">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
            Sign up with Google
          </Button>
        </Card>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

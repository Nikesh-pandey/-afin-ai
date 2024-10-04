"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuit, CreditCard, PieChart, TrendingUp, Menu, X } from "lucide-react"
import Link from "next/link"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"

import { FlipWords } from "@/components/ui/flip-words"

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-sky-200">
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-14 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "bg-gray-900 shadow-md" : "bg-transparent"
        }`}
      >
        <Link className="flex items-center justify-center" href="#">
          <BrainCircuit className="h-6 w-6 text-sky-300" />
          <span className="ml-2 text-lg font-bold text-sky-200">AFIN</span>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-sky-300 transition-colors"
            href="/portfolio"
          >
            Portfolio
          </Link>
          <Link
            className="text-sm font-medium hover:text-sky-300 transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium hover:text-sky-300 transition-colors"
            href="/savingandbudget"
          >
            AI based savings
          </Link>
          <Link
            className="text-sm font-medium hover:text-sky-300 transition-colors"
            href="/crypto"
          >
            Crypto Transaction
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-sky-200 hover:text-sky-300"
          onClick={toggleMenu}
        >
          <Menu />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-gray-900 pt-14"
          >
            <div className="flex flex-col h-full p-4">
              <Button
                variant="ghost"
                size="icon"
                className="self-end text-sky-200 hover:text-sky-300"
                onClick={toggleMenu}
              >
                <X />
                <span className="sr-only">Close menu</span>
              </Button>
              <nav className="flex flex-col items-center justify-center flex-1 gap-4">
                <Link
                  className="text-lg font-medium hover:text-sky-300 transition-colors"
                  href="/portfolio"
                  onClick={toggleMenu}
                >
                  Portfolio
                </Link>
                <Link
                  className="text-lg font-medium hover:text-sky-300 transition-colors"
                  href="/dashboard"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  className="text-lg font-medium hover:text-sky-300 transition-colors"
                  href="/savingandbudget"
                  onClick={toggleMenu}
                >
                  AI based savings
                </Link>
                <Link
                  className="text-lg font-medium hover:text-sky-300 transition-colors"
                  href="/crypto"
                  onClick={toggleMenu}
                >
                  Crypto transaction
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1 pt-14">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-sky-100">
                  <TextHoverEffect
                    text="AFIN"
                    duration={10} // duration in seconds
                  />
                </h1>
                <p className="mx-auto max-w-[700px] text-sky-300 md:text-xl">
                  Take control of your finances with our cutting-edge AI
                  technology. Smart expense tracking, personalized insights, and
                  automated savings.
                </p>
              </div>
              <div>
                <Button className="bg-sky-500 text-black hover:bg-sky-400 transition-colors">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-sky-100">
              Key
              <FlipWords
                words={["aspects", "powers", "features"]}
                duration={3000}
                className="text-sky-100"
              />
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  icon: <CreditCard className="h-12 w-12 mb-4 text-sky-400" />,
                  title: "Smart Expense Tracking",
                  description:
                    "Automatically categorize and track your expenses with AI precision.",
                },
                {
                  icon: <PieChart className="h-12 w-12 mb-4 text-sky-400" />,
                  title: "Personalized Insights",
                  description:
                    "Get tailored financial advice based on your spending patterns.",
                },
                {
                  icon: <TrendingUp className="h-12 w-12 mb-4 text-sky-400" />,
                  title: "Automated Savings",
                  description:
                    "Let AI optimize your savings with smart allocation strategies.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold mb-2 text-sky-200">
                    {feature.title}
                  </h3>
                  <p className="text-sky-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-100">
                  Start Your Financial Journey
                </h2>
                <p className="max-w-[600px] text-sky-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have transformed their financial
                  lives with our AI-powered platform.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-sky-200 placeholder-sky-400"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-sky-500 text-black hover:bg-sky-400 transition-colors"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-sky-400">
                  By signing up, you agree to our{" "}
                  <Link
                    className="underline underline-offset-2 hover:text-sky-300 transition-colors"
                    href="#"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-sky-400">
          © 2023 AI Finance. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:text-sky-300 transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:text-sky-300 transition-colors"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

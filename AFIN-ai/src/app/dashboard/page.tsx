"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,

  Menu,
  PiggyBank,
  Search,
  Wallet,
} from "lucide-react"


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PersonalFinanceDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)
  const [savingsRate, setSavingsRate] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const savings = monthlyIncome - monthlyExpenses
    const calculatedSavingsRate = (savings / monthlyIncome) * 100
    setSavingsRate(parseFloat(calculatedSavingsRate.toFixed(2)))
    setTotalBalance(savings)
    setIsDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-sky-300">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        <FinancialOverview
          isLoaded={isLoaded}
          totalBalance={totalBalance}
          monthlyIncome={monthlyIncome}
          monthlyExpenses={monthlyExpenses}
          savingsRate={savingsRate}
        />
        <FinancialDetails isLoaded={isLoaded} />
      </main>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-sky-950 text-sky-100 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-sky-300 text-xl sm:text-2xl">Welcome to Your Financial Dashboard</DialogTitle>
            <DialogDescription className="text-sky-400 text-sm sm:text-base">
              Please enter your monthly income and expenses to get started.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDialogSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="monthlyIncome" className="text-right text-sky-300 text-sm sm:text-base">
                  Monthly Income
                </Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  className="col-span-3 bg-sky-900 text-sky-100"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="monthlyExpenses" className="text-right text-sky-300 text-sm sm:text-base">
                  Monthly Expenses
                </Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  className="col-span-3 bg-sky-900 text-sky-100"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-sky-700 text-sky-100 hover:bg-sky-600 w-full sm:w-auto">
                Calculate and Start
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 flex h-14 sm:h-16 items-center gap-4 border-b border-sky-800 bg-black px-4 md:px-6"
    >
      <NavBar />
      <MobileNav />
      <SearchAndUserNav />
    </motion.header>
  )
}

function NavBar() {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-base font-semibold md:text-lg"
      >
        <Wallet className="h-5 w-5 md:h-6 md:w-6" />
        <span className="sr-only">FinanceTrack</span>
      </Link>
      <Link
        href="/"
        className="text-sky-300 transition-colors hover:text-sky-100"
      >
        Home
      </Link>
      <Link
        href="#"
        className="text-sky-500 transition-colors hover:text-sky-300"
      >
        Accounts
      </Link>
      <Link
        href="#"
        className="text-sky-500 transition-colors hover:text-sky-300"
      >
        Transactions
      </Link>
      <Link
        href="#"
        className="text-sky-500 transition-colors hover:text-sky-300"
      >
        Budgets
      </Link>
      <Link
        href="#"
        className="text-sky-500 transition-colors hover:text-sky-300"
      >
        Goals
      </Link>
    </nav>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 border-sky-700 bg-black text-sky-300 hover:bg-sky-950 hover:text-sky-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black text-sky-300 w-[250px] sm:w-[300px]">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Wallet className="h-6 w-6" />
            <span>FinanceTrack</span>
          </Link>
          <Link href="/" className="hover:text-sky-100">
            Home
          </Link>
          <Link
            href="#"
            className="text-sky-500 hover:text-sky-300"
          >
            Accounts
          </Link>
          <Link
            href="#"
            className="text-sky-500 hover:text-sky-300"
          >
            Transactions
          </Link>
          <Link
            href="#"
            className="text-sky-500 hover:text-sky-300"
          >
            Budgets
          </Link>
          <Link
            href="#"
            className="text-sky-500 hover:text-sky-300"
          >
            Goals
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function SearchAndUserNav() {
  return (
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-sky-500" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="bg-sky-950 pl-8 text-sky-100 placeholder:text-sky-500 w-full sm:w-[200px] md:w-[250px] lg:w-[300px]"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full bg-sky-800 text-sky-100 hover:bg-sky-700">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-black text-sky-300 w-[200px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-sky-800" />
          <DropdownMenuItem className="hover:bg-sky-950 hover:text-sky-100">Profile</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-sky-950 hover:text-sky-100">Settings</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-sky-950 hover:text-sky-100">Notifications</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-sky-800" />
          <DropdownMenuItem className="hover:bg-sky-950 hover:text-sky-100">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function FinancialOverview({ isLoaded, totalBalance, monthlyIncome, monthlyExpenses, savingsRate }: { isLoaded: boolean; totalBalance: number; monthlyIncome: number; monthlyExpenses: number; savingsRate: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <FinanceCard
        title="Total Balance"
        value={`$${totalBalance.toFixed(2)}`}
        change="Calculated from your input"
        icon={<DollarSign className="h-4 w-4 text-sky-500" />}
      />
      <FinanceCard
        title="Monthly Income"
        value={`$${monthlyIncome.toFixed(2)}`}
        change="Your reported income"
        icon={<Activity className="h-4 w-4 text-sky-500" />}
      />
      <FinanceCard
        title="Monthly Expenses"
        value={`$${monthlyExpenses.toFixed(2)}`}
        change="Your reported expenses"
        icon={<CreditCard className="h-4 w-4 text-sky-500" />}
      />
      <FinanceCard
        title="Savings Rate"
        value={`${savingsRate.toFixed(2)}%`}
        change="Percentage of income saved"
        icon={<PiggyBank className="h-4 w-4 text-sky-500" />}
      />
    </motion.div>
  )
}

function FinanceCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card className="bg-sky-950 text-sky-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-sky-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <p className="text-xs text-sky-400">{change}</p>
      </CardContent>
    </Card>
  )
}

function FinancialDetails({ isLoaded }: { isLoaded: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="grid gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2 xl:grid-cols-3"
    >
      <RecentTransactions />
      <BudgetOverview />
      <SavingsGoals />
    </motion.div>
  )
}

function RecentTransactions() {
  interface Transaction {
    _id: string;
    description: string;
    category: string;
    date: string;
    amount: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, '_id'>) => {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    const newTransaction = await res.json();
    setTransactions((prev) => [...prev, newTransaction]);
    setIsDialogOpen(false); // Close the dialog after adding the transaction
  };

  return (
    <div>
      <Card className="col-span-2 xl:col-span-2 bg-sky-950 text-sky-100">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle className="text-sky-300">Recent Transactions</CardTitle>
            <CardDescription className="text-sky-400">Your latest financial activities.</CardDescription>
          </div>
          <Button
            asChild
            size="sm"
            className="ml-auto gap-1 bg-sky-700 text-sky-100 hover:bg-sky-600"
          >
            <Link href="#">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>

          {/* Add Transaction Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="ml-4 bg-green-700 text-sky-100 hover:bg-green-600"
              >
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>Fill in the form below to add a new transaction.</DialogDescription>
              </DialogHeader>

              {/* Pass the onClose handler to the AddTransactionDialog */}
              <AddTransactionDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={addTransaction} />

              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-sky-800">
                <TableHead className="text-sky-300">Description</TableHead>
                <TableHead className="hidden md:table-cell text-sky-300">Category</TableHead>
                <TableHead className="hidden xl:table-cell text-sky-300">Date</TableHead>
                <TableHead className="text-right text-sky-300">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction._id}
                  _id={transaction._id}
                  description={transaction.description}
                  category={transaction.category}
                  date={transaction.date}
                  amount={transaction.amount}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Transaction Dialog */}
      {isDialogOpen && (
        <AddTransactionDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={addTransaction}
        />
      )}
    </div>
  );
}

interface Transaction {
  _id: string;
  description: string;
  category: string;
  date: string;
  amount: string;
}

function TransactionRow({ description, category, date, amount }: Transaction) {
  const isIncome = amount.startsWith('+');
  return (
    <TableRow className="border-sky-800">
      <TableCell className="text-sky-100">{description}</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="border-sky-700 text-sky-300">
          {category}
        </Badge>
      </TableCell>
      <TableCell className="hidden xl:table-cell text-sky-400">
        {new Date(date).toLocaleDateString()}
      </TableCell>
      <TableCell className={`text-right ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
        {amount}
      </TableCell>
    </TableRow>
  );
}



interface AddTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (transaction: { description: string; category: string; date: string; amount: string }) => void;
}

function AddTransactionDialog({ open, onClose, onSave }: AddTransactionDialogProps) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    if (!description || !category || !date || !amount) {
      alert('All fields are required.');
      return;
    }

    onSave({ description, category, date, amount });
    onClose(); // Close the dialog after saving
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogDescription>
          Fill in the form below to add a new transaction to the list.
        </DialogDescription>
        <form className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-sky-100">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="block w-full px-3 py-2 bg-gray-800 text-sky-100 border border-sky-600 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-sky-100">
              Category
            </label>
            <input
              type="text"
              id="category"
              className="block w-full px-3 py-2 bg-gray-800 text-sky-100 border border-sky-600 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-sky-100">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="block w-full px-3 py-2 bg-gray-800 text-sky-100 border border-sky-600 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-sky-100">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="block w-full px-3 py-2 bg-gray-800 text-sky-100 border border-sky-600 rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-green-600 text-sky-100 py-2 px-4 rounded hover:bg-green-500"
              onClick={handleSubmit}
            >
              Add Transaction
            </button>
            <button
              type="button"
              className="ml-4 bg-red-600 text-sky-100 py-2 px-4 rounded hover:bg-red-500"
              onClick={onClose} // Triggering the dialog close function
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


function BudgetOverview() {
  return (
    <Card className="bg-sky-950 text-sky-100">
      <CardHeader>
        <CardTitle className="text-sky-300 text-lg sm:text-xl">Budget Overview</CardTitle>
        <CardDescription className="text-sky-400 text-sm">Your spending vs budget this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <BudgetCategory name="Housing" spent={1200} budget={1500} />
          <BudgetCategory name="Food" spent={450} budget={600} />
          <BudgetCategory name="Transportation" spent={200} budget={300} />
          <BudgetCategory name="Entertainment" spent={150} budget={200} />
          <BudgetCategory name="Utilities" spent={280} budget={350} />
        </div>
      </CardContent>
    </Card>
  )
}

function BudgetCategory({ name, spent, budget }: { name: string; spent: number; budget: number }) {
  const percentage = (spent / budget) * 100
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-sky-300">{name}</span>
        <span className="text-sky-400">
          ${spent} / ${budget}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-sky-900">
        <div
          className="h-full rounded-full bg-sky-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}





function SavingsGoals() {
  return (
    <Card className="bg-sky-950 text-sky-100">
      <CardHeader>
        <CardTitle className="text-sky-300 text-lg sm:text-xl">Savings Goals</CardTitle>
        <CardDescription className="text-sky-400 text-sm">Track your progress towards financial goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8">
        <SavingsGoal name="Emergency Fund" current={5000} target={10000} />
        <SavingsGoal name="Vacation" current={2500} target={5000} />
        <SavingsGoal name="New Car" current={7500} target={20000} />
      </CardContent>
    </Card>
  )
}

function SavingsGoal({ name, current, target }: { name: string; current: number; target: number }) {
  const percentage = (current / target) * 100
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium text-sky-300">{name}</span>
        <span className="text-sm text-sky-400">
          ${current.toLocaleString()} / ${target.toLocaleString()}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-sky-900">
        <div
          className="h-full rounded-full bg-sky-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-sm text-sky-400">{percentage.toFixed(1)}% complete</div>
    </div>
  )
}
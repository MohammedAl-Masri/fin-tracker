
import { Receipt, TrendingUp, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-[100vh]">
      <Image
        src="/bg-fin.jpg"
        fill
        alt="Home page background"
        className="object-cover object-center z-[-1]"
        priority
        unoptimized
      />

      <section className='h-[100vh] '>
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow-lg text-center pt-8">
          Take Control of Your Finances
        </h1>
        <p className="text-2xl text-white rounded-lg m-10 p-5 bg-gradient-to-r from-gray-400 to-gray-500
                      bg-opacity-50 drop-shadow-lg text-center px-10 pt-4 hover:scale-105 transition">
          Track your income and expenses, understand your spending, and make better financial decisions.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-gray-500 text-white drop-shadow-lg 
                            rounded-lg px-6 py-3 ml-10 hover:bg-gray-400 transition">
            <Link href="/register">Get Started</Link>
          </button>
          <button className="bg-gray-500 text-white drop-shadow-lg 
                            rounded-lg px-6 py-3 mr-10 hover:bg-gray-400 transition">
            <Link href="/register">Learn More</Link>
          </button>
        </div>
      </section>
      <section className="h-[100vh] bg-gradient-to-r from-gray-400 to-gray-500 bg-opacity-50 drop-shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 drop-shadow-lg text-center pt-8 drop-shadow-lg ">
          Everything You Need to Manage Your Money
        </h2>
        <div className='flex justify-center flex-wrap gap-10 mt-10'>
          <div className='bg-gradient-to-r from-gray-400 to-gray-500 drop-shadow-lg mx-10 p-5
                          rounded-lg hover:scale-105 transition'>
            <h3 className="font-bold text-gray-900 text-lg flex gap-3">Track Your Income <Wallet /></h3>
            <p className="">Keep all your salary/income records organized in one place. Add amounts and dates
              so you always know how much you&apos;re earning.</p>
          </div> 

          <div className='bg-gradient-to-r from-gray-400 to-gray-500 drop-shadow-lg mx-10 p-5
                          rounded-lg hover:scale-105 transition'>
            <h3 className="font-bold text-gray-900 text-lg flex gap-3">Manage Your Expenses <Receipt /></h3>
            <p className="">Record your daily expenses and see exactly where your money is going. Stay aware of your spending habits.</p>
          </div>

          <div className='bg-gradient-to-r from-gray-400 to-gray-500 drop-shadow-lg mx-10 p-5
                          rounded-lg hover:scale-105 transition'>
            <h3 className="font-bold text-gray-900 text-lg flex gap-3">Understand Your Finances <TrendingUp /></h3>
            <p className="">Get a clear overview of your income, expenses, and balance with simple statistics and visual charts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

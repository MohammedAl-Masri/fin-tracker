
import { Receipt, TrendingUp, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-[100vh] md:h-[calc(100vh-60px)]">
      <Image
        src="/bg-fin.jpg"
        fill
        alt="Home page background"
        className="object-cover object-center z-[-1]"
        priority
        unoptimized
      />

      <section className='h-[calc(100vh-60px)] md:px-30 md:grid md:grid-cols-6 md:grid-rows-3 '>
        <h1 className="md:text-5xl text-3xl font-bold text-gray-800 drop-shadow-lg text-center
                    pt-30 md:pt-15 md:h-1 md:col-span-4 md:col-start-2 md:row-span-1 md:row-start-1">
          Take Control of Your Finances
        </h1>
        <p className="text-2xl text-white rounded-lg m-10 md:m-0 p-5 bg-gradient-to-r from-gray-400 to-gray-500
                      bg-opacity-50 drop-shadow-lg text-center px-10 pt-4 hover:scale-105 transition
                      col-start-1 col-end-3 md:row-span-1 md:row-start-2 md:row-span-4 md:mb-10
                      md:text-3xl  md:hover:text-gray-900 md:font-bold md:leading-14 md:w-130 
                      md:pt-15 md:tracking-wide ">
          Track your income and expenses, understand your spending, and make better financial decisions.
        </p>
        <div className="flex justify-center gap-10 mt-20 md:mt-0 md:mb-10 md:row-span-4 md:row-start-2
                        col-start-5 col-end-6 md:flex-col">
          <button className="bg-gray-500 text-white drop-shadow-lg  md:w-100 md:h-20 md:text-3xl
                            rounded-lg px-6 py-3 ml-10 md:ml-0 hover:bg-gray-400 transition md:hover:text-gray-900">
            <Link href="/register">Get Started</Link>
          </button>
          <button className="bg-gray-500 text-white drop-shadow-lg md:mr-0 md:w-100 md:h-20 md:text-3xl
                            rounded-lg px-6 py-3 mr-10 hover:bg-gray-400 transition md:hover:text-gray-900">
            <Link href="/register">Learn More</Link>
          </button>
        </div>
      </section>
      <section className="h-[100vh] bg-gradient-to-r from-gray-400 to-gray-500 bg-opacity-50
                        drop-shadow-lg">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 drop-shadow-lg text-center pt-8 drop-shadow-lg ">
          Everything You Need to Manage Your Money
        </h2>
        <div className='flex justify-center flex-wrap gap-10 mt-10 md:flex-col md:mt-20'>
          <div className='bg-gradient-to-r from-gray-400 to-gray-500 drop-shadow-lg mx-10 p-5
                          rounded-lg hover:scale-105 transition md:w-80 md:h-120'>
            <h3 className="font-bold text-gray-900 text-lg flex gap-3 md:text-2xl md:pb-10">
              Track Your Income <Wallet className="mt-2"/></h3>
            <p className="md:text-2xl ms:tracking-wide md:leading-13">Keep all your salary/income records organized in one place. Add amounts
                        and dates so you always know how much you&apos;re earning.</p>
          </div> 

          <div className='bg-gradient-to-r from-gray-400 to-gray-500 drop-shadow-lg mx-10 p-5
                          rounded-lg hover:scale-105 transition md:w-80 md:h-120'>
            <h3 className="font-bold text-gray-900 text-lg flex gap-3 md:text-2xl md:pb-10">Manage Your Expenses
              <Receipt className="mt-2"/></h3>
            <p className="md:text-2xl ms:tracking-wide md:leading-13">Record your daily expenses and see exactly where your money is going. Stay
                            aware of your spending habits.</p>
          </div>

          <div className='bg-gradient-to-r from-gray-400 to-gray-500 drop-shadow-lg mx-10 p-5
                          rounded-lg hover:scale-105 transition md:w-80 md:h-120'>
            <h3 className="font-bold text-gray-900 text-lg flex gap-3 md:text-2xl md:pb-10">Understand Your Finances
              <TrendingUp className="mt-2"/></h3>
            <p className="md:text-2xl ms:tracking-wide md:leading-13">Get a clear overview of your income, expenses, and balance with simple statistics and visual charts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

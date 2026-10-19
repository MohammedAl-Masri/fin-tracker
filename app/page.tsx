
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <Image
        src="/bg-fin.jpg"
        fill
        alt="Home page background"
        className="object-cover object-center"
        priority
        unoptimized
      />

      <section>
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
      <section>
        <h2 className="text-3xl font-bold text-gray-800 drop-shadow-lg text-center pt-8 drop-shadow-lg ">
          Features
        </h2>
        <div>
          <div>
            <h3 className="drop-shadow-lg ">Track Your Income</h3>
            <p className="">Keep all your salary/income records organized in one place. Add amounts and dates
              so you always know how much you&apos;re earning.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

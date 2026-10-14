import Image from "next/image";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen">
      <Image  src='/bg-fin.jpg'
              alt="Home page banner" width={1200} height={600}
              className="w-full h-auto" unoptimized/>
    </div>
  );
}

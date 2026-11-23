import NeoPortfolio from "@/components/neo/NeoPortfolio";
import ScrollObserver from "@/components/ScrollObserver";

export default function Home() {
  return (
    <main className="relative w-full">
      <ScrollObserver />
      <NeoPortfolio />
    </main>
  );
}

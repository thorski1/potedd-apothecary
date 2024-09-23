import Image from "next/image";
import MissionPhilosophy from "@/components/mission-philosophy";
import OwnerStory from "@/components/owner-story";
import ShopCTA from "@/components/shop-cta";
import HeroSection from "@/components/hero-section";

export default function AboutUs() {
	return (
		<main className="min-h-screen">
			<HeroSection
				title="About Us"
				subtitle="Learn more about our journey and our commitment to sustainability"
				backgroundImage="/about-hero.png"
			/>

			<MissionPhilosophy />

			<OwnerStory />

			<ShopCTA />
		</main>
	);
}

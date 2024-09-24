import Image from "next/image";
import MissionPhilosophy from "@/components/mission-philosophy";
import OwnerStory from "@/components/owner-story";
import ShopCTA from "@/components/shop-cta";
import HeroSection from "@/components/hero-section";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function AboutUs() {
	return (
		<main className="min-h-screen">
			<HeroSection
				title="About Us"
				subtitle="Learn more about our journey and our commitment to sustainability"
				backgroundImage="/about-hero.webp"
			/>
			<div className="container mx-auto px-4 py-8">
				<MissionPhilosophy />

				<OwnerStory />

				<ShopCTA />
			</div>
		</main>
	);
}

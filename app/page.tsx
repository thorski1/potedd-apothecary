import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import CallToAction from "@/components/call-to-action";
import Introduction from "@/components/introduction";

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection
				title="Pot.EdD Apothecary"
				subtitle="Welcome to Pot.EdD Apothecary. Our greenhouse is a haven for locally-grown, sustainable plants. 'Grow with Us' – your go-to nursery for native, perennial fruits and plants."
				backgroundImage="/homepage-hero.png"
			/>
			<Introduction content="At Pot.EdD Apothecary, our mission is to preserve native fruit and plant species by growing them in harmony with nature. We follow micro-local, sustainable practices to ensure that all our plants thrive in the healthiest environment." />
			<FeaturedProducts
				title="Featured Products"
				description="Explore our current offerings including canna lilies, prickly pear starters, elderberry trees, hibiscus, figs, and more! These seasonal plants are all grown with love and care, right here in our greenhouse."
			/>
			<CallToAction
				header="Ready to Start Your Green Journey?"
				subheader="Explore our collection of sustainable, locally-grown plants and learn about our eco-friendly practices."
				primaryButton={{
					text: "Shop Plants Now",
					href: "/shop",
				}}
				secondaryButton={{
					text: "Learn More About Our Process",
					href: "/about",
				}}
			/>
		</main>
	);
}

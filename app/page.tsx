import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import CallToAction from "@/components/call-to-action";
import ContactOptions from "@/components/contact-options";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

/**
 * HomePage component for the main landing page of the website.
 *
 * This page includes a hero section, featured products,
 * a call-to-action section, and contact options.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
export const metadata: Metadata = {
	title: "Pot.EdD Apothecary",
	description:
		"Your source for native, perennial fruits and plants",
	other: {
		"application/ld+json": JSON.stringify([
			{
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "Pot.EdD Apothecary",
				url: "https://potedd-apothecary.com",
			},
			{
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "Pot.EdD Apothecary",
				url: "https://potedd-apothecary.com",
				logo: "https://potedd-apothecary.com/logo.png",
			},
		]),
	},
};

export default function HomePage(): JSX.Element {
	return (
		<main>
			<HeroSection
				title="Welcome to Pot.EdD Apothecary"
				subtitle="Your source for native, perennial fruits and plants"
				backgroundImage="/homepage-hero.png"
			/>
			<FeaturedProducts
				title="Our Featured Products"
				description="Discover our selection of carefully curated plants and fruits"
			/>
			<CallToAction
				header="Start Your Garden Today"
				subheader="Join us in promoting sustainable, micro-local gardening practices"
				primaryButton={{
					text: "Shop Now",
					href: "/shop",
				}}
				secondaryButton={{
					text: "Learn More",
					href: "/about",
				}}
			/>
			<ContactOptions />
		</main>
	);
}

import Image from 'next/image'

export default function OwnerStory() {
  return (
		<section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
			<div className="container mx-auto flex flex-col md:flex-row-reverse items-center">
				<div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
					<h2 className="text-3xl font-bold mb-4">
						Owner&apos;s Story
					</h2>
					<p className="text-lg">
						Founded by a passionate horticulturist, Pot.EdD
						Apothecary began as a small backyard project.
						With years of experience in nurturing plants and
						a deep respect for the environment, we envision
						expanding our nursery to help communities across
						the region have access to fresh, local fruits
						and plants.
					</p>
				</div>
				<div className="md:w-1/2">
					<Image
						src="/horticulturist.png"
						alt="Pot.EdD Apothecary owner"
						width={600}
						height={400}
						className="rounded-lg shadow-lg"
					/>
				</div>
			</div>
		</section>
	);
}
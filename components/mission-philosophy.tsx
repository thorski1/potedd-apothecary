import Image from 'next/image'

export default function MissionPhilosophy() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 bg-accent/10">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Mission & Philosophy</h2>
          <p className="text-lg text-gray-700">
            Our philosophy is simple: micro-local, sustainable, and transparent practices. We grow everything with a zero-waste approach, using only what is naturally available nearby. Our passion lies in cultivating native fruit and plant species that promote ecological balance and support local biodiversity.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/sustainable-gardening.webp"
            alt="Sustainable gardening practices"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
interface IntroductionProps {
  content: string
}

export default function Introduction({ content }: IntroductionProps) {
  return (
    <section className="py-16 bg-primary-light px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <p className="text-lg">{content}</p>
      </div>
    </section>
  )
}
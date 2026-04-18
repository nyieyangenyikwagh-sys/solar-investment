export function PartnersSection() {
  const partners = [
    { name: 'remote', logo: 'R' },
    { name: 'ARC', logo: 'A' },
    { name: 'Raycast', logo: 'R' },
    { name: 'runway', logo: 'r' },
    { name: 'ramp', logo: 'r' },
    { name: 'HEX', logo: 'H' },
    { name: 'Vercel', logo: 'V' },
  ]

  return (
    <section className="border-y border-border/50 bg-card/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-lg font-semibold">{partner.logo}</span>
              <span className="text-sm font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

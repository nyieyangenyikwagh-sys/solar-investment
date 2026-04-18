import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6">
          <SocialLink href="https://twitter.com" label="Twitter">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://youtube.com" label="YouTube">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://facebook.com" label="Facebook">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://threads.net" label="Threads">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.082-1.168 3.59-1.304.929-.084 1.804-.036 2.596.089l.053-.895c-.053-.888-.289-1.525-.704-1.894-.44-.392-1.1-.59-1.962-.59l-.04.001c-.848.01-1.51.221-1.966.631-.414.37-.637.91-.663 1.605l-2.104-.063c.053-1.282.564-2.32 1.478-3.003 1.004-.748 2.296-1.135 3.843-1.152h.073c1.587.017 2.874.386 3.826 1.098.99.741 1.526 1.856 1.595 3.316l.007.176-.033 1.14c.915.477 1.692 1.15 2.253 1.96.804 1.16 1.124 2.593.897 4.03-.19 1.207-.673 2.282-1.393 3.107-1.878 2.152-4.678 3.242-8.32 3.242h-.018zm2.073-9.073c-.67-.05-1.381-.044-2.12.019-1.045.095-1.871.378-2.387.818-.466.397-.688.893-.66 1.474.025.467.236.86.628 1.17.483.381 1.198.595 2.012.602l.075-.001c1.095-.06 1.934-.48 2.498-1.25.429-.585.692-1.378.81-2.379-.273-.152-.556-.296-.856-.453z" />
            </svg>
          </SocialLink>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Made with <span className="text-destructive">&#9829;</span> by opera programming team
        </p>

        {/* Footer Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact Us
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Opera. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function SocialLink({ 
  href, 
  label, 
  children 
}: { 
  href: string
  label: string
  children: React.ReactNode 
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </a>
  )
}

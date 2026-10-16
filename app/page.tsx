import ChatWidget from "@/components/ChatWidget";
import {
  Shirt, Coffee, GraduationCap, ShoppingBag, CreditCard, ShieldCheck, Zap, Tag,
  Gem, Settings2, Clock, Coins, MessageCircle, ArrowRight, Facebook, Instagram, Music2, Menu,
} from "lucide-react";

const WA = "https://wa.me/923213283881";
const NAV = ["Home", "About Us", "Services", "Gallery", "Contact"];

const SERVICES = [
  { icon: Shirt, title: "T-Shirt Printing", text: "Custom tees for teams, events & business.", color: "#1ec8ff" },
  { icon: Coffee, title: "Mug Printing", text: "Personalized mugs for every occasion.", color: "#ff3fa4" },
  { icon: GraduationCap, title: "Cap Printing", text: "Stylish caps with your logo or design.", color: "#ffc61a" },
  { icon: ShoppingBag, title: "Bag Printing", text: "Tote & promotional bags with custom prints.", color: "#7a5cff" },
  { icon: CreditCard, title: "Business Printing", text: "Visiting cards, flyers, banners & more.", color: "#19d3c5" },
];

const GALLERY = [
  { icon: Shirt, bg: "#0a63d8", label: "T-Shirt" },
  { icon: Coffee, bg: "#f5b819", label: "Mug" },
  { icon: GraduationCap, bg: "#e83a96", label: "Cap" },
  { icon: ShoppingBag, bg: "#7a4fe0", label: "Tote Bag" },
  { icon: Shirt, bg: "#14b8b0", label: "Folded Tees" },
];

const WHY = [
  { icon: Gem, text: "High Quality Printing" },
  { icon: Settings2, text: "Custom Designs & Support" },
  { icon: Clock, text: "On-Time Delivery" },
  { icon: Coins, text: "Competitive Pricing" },
];

function Logo({ size = 64 }: { size?: number }) {
  return (
    <span className="logo-badge" style={{ width: size, height: size, fontSize: size * 0.5 }} aria-hidden>
      92
    </span>
  );
}

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#home" className="brand">
            <Logo />
            <span className="brand-name">PRINT STUDIO</span>
          </a>
          <nav aria-label="Main" className="nav-links">
            {NAV.map((n, i) => (
              <a key={n} href={`#${n.split(" ")[0].toLowerCase()}`} className={i === 0 ? "active" : ""}>
                {n}
              </a>
            ))}
          </nav>
          <a href={WA} className="btn btn-outline nav-cta">
            <MessageCircle size={18} /> <span>Get a Quote</span>
          </a>
          <details className="mnav">
            <summary aria-label="Menu"><Menu size={26} /></summary>
            <nav aria-label="Mobile">
              {NAV.map((n) => <a key={n} href={`#${n.split(" ")[0].toLowerCase()}`}>{n}</a>)}
            </nav>
          </details>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="wrap hero-in">
            <div className="hero-copy">
              <p className="kicker">Your vision &nbsp;•&nbsp; Our print</p>
              <h1>
                High Quality Printing
                <br />
                For a <span className="grad">Brighter</span> <span className="grad2">Tomorrow</span>
              </h1>
              <p className="lead">
                At 92 Print Studio, we bring your ideas to life with premium quality printing, creative
                designs and professional service. From business to personal, we print your world.
              </p>
              <div className="cta-row">
                <a href={WA} className="btn btn-grad">
                  <MessageCircle size={18} /> Get a Quote
                </a>
                <a href="#services" className="btn btn-outline">
                  Explore Our Services <ArrowRight size={16} />
                </a>
              </div>
              <ul className="perks">
                <li><ShieldCheck size={22} /> Premium Quality</li>
                <li><Zap size={22} /> Fast Turnaround</li>
                <li><Tag size={22} /> Affordable Prices</li>
              </ul>
            </div>
            {/* Drop your product photo at /public/hero.png */}
            <div className="hero-art" role="img" aria-label="Printed t-shirt, mug, cap and tote bag">
              <span className="splash s1" /><span className="splash s2" /><span className="splash s3" />
              <Logo size={150} />
              <p className="script">Custom<br />Printing<br />Solutions</p>
            </div>
          </div>
        </section>

        <section id="services" className="band">
          <div className="wrap split">
            <div className="intro">
              <p className="kicker">Our services</p>
              <h2>What We Print</h2>
              <p className="muted">Wide range of printing services for your business, event or personal needs.</p>
            </div>
            <div className="cards5">
              {SERVICES.map(({ icon: Icon, title, text, color }) => (
                <a key={title} href={WA} className="card" style={{ ["--c" as string]: color }}>
                  <Icon size={34} color={color} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="dot" aria-hidden><ArrowRight size={14} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="band">
          <div className="wrap split">
            <div className="intro">
              <p className="kicker">Our gallery</p>
              <h2>Our Work Speaks</h2>
              <p className="muted">Check out some of our latest printing projects and happy clients.</p>
              <a href="#gallery" className="btn btn-outline">View Gallery <ArrowRight size={16} /></a>
            </div>
            <div className="cards5 tiles">
              {GALLERY.map(({ icon: Icon, bg, label }) => (
                <figure key={label} className="tile" style={{ background: bg }}>
                  <Icon size={56} color="#fff" />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="band why">
          <div className="wrap split">
            <div className="intro">
              <p className="kicker">Why choose us</p>
              <h2>Why 92 Print Studio?</h2>
              <p className="muted">We are committed to providing the best printing experience with quality, creativity and customer satisfaction.</p>
            </div>
            <ul className="why-grid">
              {WHY.map(({ icon: Icon, text }) => (
                <li key={text}><Icon size={30} color="#ffc61a" /><span>{text}</span></li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer id="contact" className="foot">
        <div className="wrap foot-in">
          <a href="#home" className="brand">
            <Logo size={52} />
            <span>
              <span className="brand-name sm">PRINT STUDIO</span>
              <small className="muted">Print • Design • Create</small>
            </span>
          </a>
          <nav aria-label="Footer" className="foot-links">
            {NAV.map((n) => <a key={n} href={`#${n.split(" ")[0].toLowerCase()}`}>{n}</a>)}
          </nav>
          <div className="foot-right">
            <a href={WA} className="phone"><MessageCircle size={22} /> +92 321 3283881</a>
            <a href="#" aria-label="Facebook" className="soc"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="soc"><Instagram size={18} /></a>
            <a href="#" aria-label="TikTok" className="soc"><Music2 size={18} /></a>
          </div>
        </div>
        <div className="wrap copy">
          <span>© 2025 92 Print Studio. All rights reserved.</span>
          <span className="script small">Your Ideas • Our Print</span>
        </div>
      </footer>
      <ChatWidget />
    </>
  );
}

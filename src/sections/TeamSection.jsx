import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import BlueButterfly from '../components/BlueButterfly';
import TimelineButterfly from '../components/TimelineButterfly';

// ─── Social Icon SVGs ────────────────────────────────────────────────────────

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.1rem', height: '1.1rem' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.1rem', height: '1.1rem' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XTwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.1rem', height: '1.1rem' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.5h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.1rem', height: '1.1rem' }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.1rem', height: '1.1rem' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.1rem', height: '1.1rem' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ─── Team Data ────────────────────────────────────────────────────────────────

const teamMembers = [
  {
    id: 2,
    role: 'Co-founder, CMO',
    name: 'Vishal Patel',
    image: '/clients/Team/Graphics designer.webp',
    quote: '"Efficiency is doing things right; effectiveness is doing the right things. I strive to bring both to our daily operations."',
    bio: 'Managing our daily operations is about empowering our creative minds. By streamlining workflows and optimizing resources, I ensure our team can focus entirely on creating exceptional brand experiences.',
    stats: [{ label: 'Teams Managed', value: '8+' }, { label: 'Deadlines Met', value: '100%' }, { label: 'Client Retentions', value: '95%' }],
    accentFrom: '#f97316',
    accentTo: '#dc2626',
    socials: { linkedin: '#', instagram: '#', whatsapp: '#', twitter: '#', github: '#', email: 'mailto:#' },
  },
  {
    id: 3,
    role: 'Lead Developer',
    name: 'Krish Patel',
    image: '/clients/Team/lead Developer.webp',
    quote: '"Code is poetry written for machines to build human experiences. Functionality should always feel natural and intuitive."',
    bio: 'Translating beautiful designs into robust, functional code is my passion. Performance, accessibility, and scalability are always at the forefront — a great brand deserves a digital presence that performs flawlessly.',
    stats: [{ label: 'Apps Shipped', value: '20+' }, { label: 'Technologies', value: '15+' }, { label: 'Commits', value: '2K+' }],
    accentFrom: '#fb923c',
    accentTo: '#b91c1c',
    socials: { linkedin: '#', instagram: '#', whatsapp: '#', twitter: '#', github: '#', email: 'mailto:#' },
  },
];

const socialMap = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  twitter: XTwitterIcon,
  github: GitHubIcon,
  email: EmailIcon,
};

// ─── Floating Particles ───────────────────────────────────────────────────────

function FloatingParticles({ count = 18, accent }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }))
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: accent,
            opacity: 0.25,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────

function TiltImage({ src, alt, accent }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 12);
    rotateY.set(dx * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        width: '100%',
        position: 'relative',
      }}
    >


      {/* Image frame */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '1.75rem',
          overflow: 'hidden',
          aspectRatio: '3/4',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${accent}55 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Social Pill ──────────────────────────────────────────────────────────────

function SocialPill({ platform, url, accent }) {
  const Icon = socialMap[platform];
  const [hovered, setHovered] = useState(false);
  if (!Icon) return null;

  return (
    <motion.a
      href={url}
      target={platform === 'email' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -4 : 0,
        background: hovered ? `linear-gradient(135deg, ${accent}, ${accent}99)` : 'rgba(255,255,255,0.06)',
      }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: '50%',
        border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.1)'}`,
        color: hovered ? '#fff' : 'rgba(255,225,197,0.7)',
        cursor: 'pointer',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      <Icon />
    </motion.a>
  );
}

// ─── Member Card ──────────────────────────────────────────────────────────────

function MemberCard({ member, index, activeCard, setActiveCard }) {
  const sectionRef = useRef(null);
  
  // Trigger card activation when it enters the middle 60% of the viewport
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' });
  const isEven = index % 2 === 0;

  React.useEffect(() => {
    if (inView) {
      setActiveCard(index);
    }
  }, [inView, index, setActiveCard]);

  const accent = member.accentFrom;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: isEven ? -60 : 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: isEven ? 60 : -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ position: 'relative', padding: '3px' }}
    >
      {/* Ambient glow behind entire row */}
      <div
        style={{
          position: 'absolute',
          width: '50%',
          height: '60%',
          top: '20%',
          left: isEven ? '0' : '50%',
          background: `radial-gradient(ellipse, ${accent}18 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Grid row layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4rem',
          alignItems: 'center',
        }}
        className="team-grid-row"
      >
        {/* Image column */}
        <motion.div
          variants={isEven ? leftVariants : rightVariants}
          style={{ order: isEven ? 0 : 1, position: 'relative' }}
          className="team-img-col"
        >
          <TiltImage src={member.image} alt={member.name} accent={accent} />
        </motion.div>

        {/* Content column */}
        <motion.div
          variants={isEven ? rightVariants : leftVariants}
          style={{ order: isEven ? 1 : 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}
          className="team-content-col"
        >
          {/* Role tag */}
          <motion.div variants={textVariants}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 100,
                background: `linear-gradient(135deg, ${accent}22, ${member.accentTo}11)`,
                border: `1px solid ${accent}40`,
                marginBottom: 8,
              }}
            >
              {/* Pulse dot */}
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: accent,
                    display: 'block',
                  }}
                />
              </span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, fontWeight: 600 }}>
                {member.role}
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontFamily: '"Goli", sans-serif',
                fontStyle: 'italic',
                fontWeight: 500,
                color: '#fff',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {member.name}
              
              {/* Pink Butterfly Name Hopper placed safely inside an inline span */}
              <span style={{ display: 'inline-block', position: 'relative', width: 0, height: 0, marginLeft: '10px' }}>
                {activeCard === index && (
                  <motion.div
                    layoutId="name-hopper"
                    transition={{ type: 'spring', damping: 12, stiffness: 40 }}
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      left: '0px',
                      zIndex: 20,
                      rotate: 25,
                    }}
                  >
                    <TimelineButterfly scale={0.45} />
                  </motion.div>
                )}
              </span>
            </h3>
          </motion.div>

          {/* Decorative divider */}
          <motion.div variants={textVariants} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                height: 2,
                width: 40,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${accent}, transparent)`,
              }}
            />
            <div
              style={{
                height: 2,
                flex: 1,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.05)',
              }}
            />
          </motion.div>

          {/* Quote */}
          <motion.div variants={textVariants}>
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                fontStyle: 'italic',
                color: '#ffe1c5',
                lineHeight: 1.7,
                margin: 0,
                paddingLeft: '1.2rem',
                borderLeft: `3px solid ${accent}`,
              }}
            >
              {member.quote}
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div variants={textVariants}>
            <p
              style={{
                fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                color: 'rgba(255,225,197,0.65)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {member.bio}
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div variants={textVariants} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 8 }}>
            {Object.entries(member.socials).map(([platform, url]) => (
              <SocialPill key={platform} platform={platform} url={url} accent={accent} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  // Blue Butterfly Figure-8 (Infinity) Animation Logic
  const butterflyX = useMotionValue(0);
  const butterflyY = useMotionValue(0);
  const butterflyRotate = useMotionValue(90); // default pointing right
  const timeRef = useRef(0);

  useAnimationFrame((time, delta) => {
    // Normalize time to handle different display rates gracefully
    const dt = delta / 16.6;
    timeRef.current += 0.015 * dt; // Speed of the loop
    const t = timeRef.current;

    // Infinity figure parametric equations
    const A = 350; // Horizontal Width radius
    const B = 100; // Vertical Height radius

    const x = A * Math.sin(t);
    const y = B * Math.sin(t) * Math.cos(t);
    butterflyX.set(x);
    butterflyY.set(y);

    // Calculate exact tangent angle to the path for correct facing
    // Derivatives of the path
    const dx = A * Math.cos(t);
    // Derivative of sin(t)*cos(t) is cos^2(t) - sin^2(t) = cos(2t)
    const dy = B * Math.cos(2 * t);

    // atan2 gives angle from standard Right horizontal. 
    // Since SVG 0 degree is UP, we add 90 to align its head with the tangent.
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;
    
    // Smooth angle interpolation to prevent snapping
    const currentRot = butterflyRotate.get();
    let diff = (angleDeg + 90) - currentRot;
    
    // Normalize diff to -180 to +180 to avoid full circle spins
    diff = ((diff + 180) % 360 + 360) % 360 - 180;
    
    butterflyRotate.set(currentRot + diff * 0.15 * dt);
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative' }}
    >
      {/* Animated Infinity Blue Butterfly */}
      <motion.div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          x: butterflyX,
          y: butterflyY,
          rotate: butterflyRotate,
          marginLeft: -45, // Half of SVG width
          marginTop: -32.5, // Half of SVG height
          zIndex: -1, // Fly slightly behind main text but over the background
          opacity: 0.7,
          pointerEvents: "none"
        }}
      >
        <BlueButterfly scale={1.2} />
      </motion.div>
      {/* Overline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg, transparent, #ff6b2b)' }} />
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff6b2b', fontWeight: 600 }}>
          The Minds Behind Kalpnova
        </span>
        <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg, #ff6b2b, transparent)' }} />
      </motion.div>

      {/* Main heading */}
      <h2
        style={{
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          fontFamily: '"Goli", sans-serif',
          fontWeight: 500,
          color: '#fff',
          lineHeight: 1,
          margin: '0 0 1.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        Meet the{' '}
        <span
          style={{
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #ff6b2b 0%, #e31e24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          team
        </span>
      </h2>

      <p
        style={{
          maxWidth: 520,
          margin: '0 auto',
          fontSize: '1rem',
          color: 'rgba(255,225,197,0.55)',
          lineHeight: 1.7,
        }}
      >
        A small, passionate collective united by a single mission — to craft brands that leave a lasting impression.
      </p>
    </motion.div>
  );
}

// ─── Separator Line ───────────────────────────────────────────────────────────

function MemberSeparator({ index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,107,43,0.3), transparent)',
        margin: '0 auto',
        transformOrigin: 'center',
        maxWidth: 800,
      }}
    />
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function TeamSection() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  return (
    <>
      {/* Scoped CSS for responsive layout */}
      <style>{`
        .team-grid-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .team-img-col { max-width: 420px; width: 100%; margin: 0 auto; }
        @media (max-width: 900px) {
          .team-grid-row {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .team-img-col {
            order: 0 !important;
            max-width: 340px;
          }
          .team-content-col {
            order: 1 !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: '#080808',
          color: '#ffe1c5',
          fontFamily: '"Eurostile Round", sans-serif',
          padding: '8rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background noise texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Large ambient orbs */}
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <SectionHeader />

          {/* Member cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7rem' }}>
            {teamMembers.map((member, index) => (
              <React.Fragment key={member.id}>
                <MemberCard 
                  member={member} 
                  index={index} 
                  activeCard={activeCard} 
                  setActiveCard={setActiveCard} 
                />
                {index < teamMembers.length - 1 && <MemberSeparator index={index} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

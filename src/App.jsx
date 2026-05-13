import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const PIXEL_FONT = "'Press Start 2P', monospace";
const MONO_FONT = "'Courier New', monospace";

const COLORS = {
  bg: "#1a1208",
  bgMid: "#2b1f0e",
  bgCard: "#221810",
  amber: "#c8891a",
  amberLight: "#e8a832",
  amberPale: "#f5c96a",
  cream: "#f0e6c8",
  creamDark: "#c8b890",
  brown: "#6b4c2a",
  brownLight: "#8a6040",
  green: "#4a8c3f",
  greenLight: "#6ab85e",
  red: "#8c3f3f",
  redLight: "#c05050",
  scanline: "rgba(0,0,0,0.18)",
};

const SKILLS = [
  { name: "HTML/CSS", level: 92, icon: "◈" },
  { name: "JavaScript", level: 88, icon: "◉" },
  { name: "React", level: 85, icon: "◈" },
  { name: "Node.js", level: 76, icon: "◉" },
  { name: "TypeScript", level: 72, icon: "◈" },
  { name: "SQL", level: 68, icon: "◉" },
];

const PROJECTS = [
  {
    id: "001",
    title: "NextChat",
    desc: "Real-time encrypted chat application with authentication, friend requests, and seamless messaging experience.",
    tags: ["Next.js", "Socket.IO", "MongoDB"],
    status: "PRIVATE",
    statusColor: COLORS.redLight,
  },
  {
    id: "002",
    title: "AnonReview",
    desc: "Privacy-focused anonymous feedback platform with secure submissions and unique shareable review links.",
    tags: ["Next.js", "MongoDB", "Tailwind CSS"],
    status: "PRIVATE",
    statusColor: COLORS.redLight,
  },
  {
    id: "005",
    title: "HireHelper",
    desc: "Task hiring platform where users can post jobs, connect with helpers, and manage ongoing or completed tasks.",
    tags: ["Node.js", "MongoDB", "Express"],
    status: "PRIVATE",
    statusColor: COLORS.redLight,
  },

];

const NAV_ITEMS = ["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"];
const SOCIAL_LINKS = [
  {
    name: "GITHUB",
    url: "https://github.com/abhishek-chaudhary2003",
  },
  {
    name: "LINKEDIN",
    url: "https://www.linkedin.com/in/abhishek-chaudhary-168497189/",
  },
  {
    name: "TWITTER",
    url: "https://x.com/Abhi0510shek",
  },
  {
    name: "EMAIL",
    url: "mailto:chaudharyabhishekmp@gmail.com",
  },
];
function PixelBorder({ children, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        background: COLORS.bgCard,
        border: `2px solid ${COLORS.amber}`,
        boxShadow: `4px 4px 0 ${COLORS.brown}, 0 0 0 1px ${COLORS.brownLight}`,
        imageRendering: "pixelated",
        ...style,
      }}
    >
      {/* Corner pixels */}
      {[
        { top: -4, left: -4 },
        { top: -4, right: -4 },
        { bottom: -4, left: -4 },
        { bottom: -4, right: -4 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            background: COLORS.amberPale,
            ...pos,
          }}
        />
      ))}
      {children}
    </div>
  );
}

function Scanlines() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
      }}
    />
  );
}

function CRTVignette() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        background:
          "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}

function BlinkCursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: 12,
        height: "1em",
        background: on ? COLORS.amberLight : "transparent",
        verticalAlign: "middle",
        marginLeft: 4,
      }}
    />
  );
}

function TypewriterText({ text, speed = 48, style = {} }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    const t = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(t);
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <span style={style}>
      {displayed}
      {displayed.length < text.length && <BlinkCursor />}
    </span>
  );
}

function SkillBar({ name, level, icon, delay = 0 }) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFilled(level), delay + 200);
    return () => clearTimeout(t);
  }, [level, delay]);
  const blocks = 20;
  const filledBlocks = Math.round((filled / 100) * blocks);
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontFamily: PIXEL_FONT,
          fontSize: 9,
          color: COLORS.cream,
        }}
      >
        <span>
          {icon} {name}
        </span>
        <span style={{ color: COLORS.amberLight }}>{level}%</span>
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: blocks }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: 14,
              background:
                i < filledBlocks ? COLORS.amberLight : COLORS.brownLight,
              transition: `background ${0.05 * i}s ease`,
              border: `1px solid ${i < filledBlocks ? COLORS.amberPale : COLORS.brown}`,
              imageRendering: "pixelated",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <PixelBorder
      style={{
        padding: "20px 18px",
        cursor: "pointer",
        transition: "transform 0.1s",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
        boxShadow: hovered
          ? `6px 6px 0 ${COLORS.brown}`
          : `4px 4px 0 ${COLORS.brown}`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 8,
              color: COLORS.brown,
            }}
          >
            #{project.id}
          </span>
          <span
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 7,
              color: project.statusColor,
              border: `1px solid ${project.statusColor}`,
              padding: "2px 6px",
            }}
          >
            {project.status}
          </span>
        </div>
        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: 11,
            color: COLORS.amberLight,
            marginBottom: 10,
            lineHeight: 1.6,
          }}
        >
          {project.title}
        </div>
        <p
          style={{
            fontFamily: MONO_FONT,
            fontSize: 13,
            color: COLORS.creamDark,
            lineHeight: 1.7,
            margin: "0 0 14px",
          }}
        >
          {project.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 7,
                color: COLORS.cream,
                background: COLORS.brown,
                padding: "3px 8px",
                border: `1px solid ${COLORS.brownLight}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </PixelBorder>
  );
}

function NavBar({ active, onNav }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: COLORS.bg,
        borderBottom: `2px solid ${COLORS.amber}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 52,
      }}
    >
      <span
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 10,
          color: COLORS.amberLight,
          letterSpacing: 2,
        }}
      >
        ▶ ABHISHEK.DEV
      </span>
      <div style={{ display: "flex", gap: 24 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => onNav(item)}
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 8,
              color: active === item ? COLORS.amberPale : COLORS.creamDark,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 6px",
              borderBottom:
                active === item ? `2px solid ${COLORS.amberLight}` : "none",
              transition: "color 0.1s",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HomeSection() {
   const ACTION_BUTTONS = [
    {
      label: "VIEW PROJECTS",
      target: "PROJECTS",
    },
    {
      label: "CONTACT ME",
      target: "CONTACT",
    },
  ];
  return (
    <section
      id="HOME"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px 40px",
        position: "relative",
      }}
    >
      {/* Decorative pixel grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${COLORS.brownLight} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.18,
        }}
      />

      <div style={{ position: "relative", maxWidth: 700 }}>
        {/* Avatar pixel art */}
        <div
          style={{
            width: 96,
            height: 96,
            margin: "0 auto 28px",
            background: COLORS.bgCard,
            border: `3px solid ${COLORS.amber}`,
            boxShadow: `6px 6px 0 ${COLORS.brown}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            imageRendering: "pixelated",
          }}
        >
          <svg width="64" height="64" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
            <rect x="2" y="0" width="4" height="1" fill={COLORS.amberPale} />
            <rect x="1" y="1" width="6" height="4" fill={COLORS.cream} />
            <rect x="2" y="2" width="1" height="1" fill={COLORS.bgMid} />
            <rect x="5" y="2" width="1" height="1" fill={COLORS.bgMid} />
            <rect x="2" y="4" width="4" height="1" fill={COLORS.bgMid} />
            <rect x="0" y="2" width="1" height="3" fill={COLORS.cream} />
            <rect x="7" y="2" width="1" height="3" fill={COLORS.cream} />
            <rect x="1" y="5" width="6" height="1" fill={COLORS.amber} />
            <rect x="2" y="6" width="4" height="2" fill={COLORS.brown} />
            <rect x="1" y="7" width="2" height="1" fill={COLORS.brownLight} />
            <rect x="5" y="7" width="2" height="1" fill={COLORS.brownLight} />
          </svg>
        </div>

        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: 10,
            color: COLORS.amberLight,
            letterSpacing: 3,
            marginBottom: 12,
          }}
        >
          WELCOME TO MY PORTFOLIO
        </div>

        <h1
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: 28,
            color: COLORS.cream,
            lineHeight: 1.4,
            marginBottom: 16,
          }}
        >
          <TypewriterText text="ABHISHEK CHAUDHARY" speed={80} />
        </h1>

        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: 13,
            color: COLORS.amberLight,
            marginBottom: 28,
            letterSpacing: 2,
          }}
        >
          ▸ WEB DEVELOPER ◂
        </div>

        <p
          style={{
            fontFamily: MONO_FONT,
            fontSize: 15,
            color: COLORS.creamDark,
            lineHeight: 1.8,
            maxWidth: 520,
            margin: "0 auto 36px",
          }}
        >
          Crafting digital experiences one pixel at a time. Passionate about
          clean code, creative UIs, and building things that actually work.
        </p>
           <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {ACTION_BUTTONS.map((btn, i) => (
          <button
            key={btn.label}
            onClick={() => {
              const el = document.getElementById(btn.target);

              if (el) {
                el.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 9,
              color: i === 0 ? COLORS.bg : COLORS.amberLight,
              background: i === 0 ? COLORS.amberLight : "transparent",
              border: `2px solid ${COLORS.amberLight}`,
              padding: "12px 24px",
              cursor: "pointer",
              boxShadow: `3px 3px 0 ${COLORS.brown}`,
              transition: "transform 0.08s",
              letterSpacing: 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translate(-1px,-1px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translate(0,0)")
            }
          >
            {btn.label}
          </button>
        ))}
      </div>
       
        {/* Stat row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginTop: 56,
            padding: "20px 0",
            borderTop: `1px solid ${COLORS.brown}`,
          }}
        >
          {[
            { val: "2", label: "MO EXP" },
            { val: "4", label: "PROJECTS" },
            { val: "0", label: "CLIENTS" },
            { val: "99", label: "COFFEE" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: 18,
                  color: COLORS.amberPale,
                  marginBottom: 6,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: 7,
                  color: COLORS.creamDark,
                  letterSpacing: 1,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="ABOUT"
      style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}
    >
      <SectionHeader label="ABOUT.EXE" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <PixelBorder style={{ padding: 28 }}>
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 9,
              color: COLORS.amberLight,
              marginBottom: 16,
              letterSpacing: 1,
            }}
          >
            &gt; PROFILE_
          </div>
          <p
            style={{
              fontFamily: MONO_FONT,
              fontSize: 14,
              color: COLORS.creamDark,
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            I’m Abhishek a web developer passionate about building fast, accessible, and visually refined digital experiences. I create modern web applications with a strong focus on clean design, smooth performance, and attention to detail.
          </p>
          <p
            style={{
              fontFamily: MONO_FONT,
              fontSize: 14,
              color: COLORS.creamDark,
              lineHeight: 1.9,
              marginTop: 16,
            }}
          >
            I believe great software should feel effortless to use while maintaining high standards in both design and code quality. Every project I build is crafted to deliver a seamless and engaging user experience.
          </p>
        </PixelBorder>

        <PixelBorder style={{ padding: 28 }}>
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 9,
              color: COLORS.amberLight,
              marginBottom: 16,
              letterSpacing: 1,
            }}
          >
            &gt; SYSTEM_INFO_
          </div>
          {[
            ["NAME", "Abhishek Chaudhary"],
            ["ROLE", "Web Developer"],
            ["LOCATION", "Hyderabad"],
            ["AVAILABLE", "Freelance / Full-time"],
            ["LANGUAGES", "EN / HN"],
            ["EDITOR", "VS Code"],
            ["OS", "LINUX"],
          ].map(([key, val]) => (
            <div
              key={key}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 10,
                fontFamily: MONO_FONT,
                fontSize: 13,
              }}
            >
              <span
                style={{
                  color: COLORS.amberLight,
                  minWidth: 100,
                  fontFamily: PIXEL_FONT,
                  fontSize: 8,
                }}
              >
                {key}:
              </span>
              <span style={{ color: COLORS.cream }}>{val}</span>
            </div>
          ))}
        </PixelBorder>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section
      id="SKILLS"
      style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}
    >
      <SectionHeader label="SKILLS.DAT" />
      <PixelBorder style={{ padding: 32 }}>
        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: 9,
            color: COLORS.amberLight,
            marginBottom: 28,
            letterSpacing: 1,
          }}
        >
          &gt; LOADING_SKILL_TREE...
        </div>
        {SKILLS.map((skill, i) => (
          <SkillBar
            key={skill.name}
            {...skill}
            delay={i * 120}
          />
        ))}
        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: `1px solid ${COLORS.brown}`,
          }}
        >
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 9,
              color: COLORS.amberLight,
              marginBottom: 16,
            }}
          >
            &gt; ALSO_KNOWN_
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "Git", "Docker", "Tailwind CSS", "REST APIs", "Next.js", "Linux", "Socket.io"
            ].map((tool) => (
              <span
                key={tool}
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: 7,
                  color: COLORS.cream,
                  background: COLORS.bgMid,
                  border: `1px solid ${COLORS.brownLight}`,
                  padding: "5px 10px",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </PixelBorder>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="PROJECTS"
      style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}
    >
      <SectionHeader label="PROJECTS.LOG" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 28,
        }}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_f1ixewy",
        "template_u2rtumw",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "rXYZicooB3X-gJpiU"
      );

      setSent(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };

  return (
     <section
      id="CONTACT"
      style={{
        padding: "100px 24px 140px",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <SectionHeader label="CONTACT.SH" />

      <PixelBorder style={{ padding: 36 }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>

            <div
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 12,
                color: COLORS.greenLight,
                marginBottom: 12,
              }}
            >
              MESSAGE SENT!
            </div>

            <p
              style={{
                fontFamily: MONO_FONT,
                fontSize: 14,
                color: COLORS.creamDark,
              }}
            >
              Thanks for reaching out. I'll get back to you soon.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 9,
                color: COLORS.amberLight,
                marginBottom: 28,
              }}
            >
              &gt; INIT_CONTACT_FORM...
            </div>

            {[
              { key: "name", label: "YOUR_NAME", type: "text" },
              { key: "email", label: "EMAIL_ADDR", type: "email" },
            ].map(({ key, label, type }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: PIXEL_FONT,
                    fontSize: 8,
                    color: COLORS.amberLight,
                    marginBottom: 8,
                  }}
                >
                  {label}:
                </label>

                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      [key]: e.target.value,
                    }))
                  }
                  required
                  style={{
                    width: "100%",
                    background: COLORS.bgMid,
                    border: `2px solid ${COLORS.brownLight}`,
                    color: COLORS.cream,
                    fontFamily: MONO_FONT,
                    fontSize: 14,
                    padding: "10px 14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = COLORS.amberLight)
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = COLORS.brownLight)
                  }
                />
              </div>
            ))}

            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: PIXEL_FONT,
                  fontSize: 8,
                  color: COLORS.amberLight,
                  marginBottom: 8,
                }}
              >
                MESSAGE:
              </label>

              <textarea
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    message: e.target.value,
                  }))
                }
                required
                style={{
                  width: "100%",
                  background: COLORS.bgMid,
                  border: `2px solid ${COLORS.brownLight}`,
                  color: COLORS.cream,
                  fontFamily: MONO_FONT,
                  fontSize: 14,
                  padding: "10px 14px",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = COLORS.amberLight)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = COLORS.brownLight)
                }
              />
            </div>

            <button
              type="submit"
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 9,
                color: COLORS.bg,
                background: COLORS.amberLight,
                border: `2px solid ${COLORS.amberPale}`,
                padding: "14px 32px",
                cursor: "pointer",
                boxShadow: `3px 3px 0 ${COLORS.brown}`,
                letterSpacing: 1,
                width: "100%",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translate(-1px,-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translate(0,0)")
              }
            >
              ▶ SEND MESSAGE
            </button>
          </form>
        )}
      </PixelBorder>

      {/* SOCIAL LINKS */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 36,
          flexWrap: "wrap",
        }}
      >
        {SOCIAL_LINKS.map((s) => (
          <button
            key={s.name}
            onClick={() => window.open(s.url, "_blank")}
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 8,
              color: COLORS.creamDark,
              background: "none",
              border: `1px solid ${COLORS.brownLight}`,
              padding: "8px 14px",
              cursor: "pointer",
              letterSpacing: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.amberLight;
              e.currentTarget.style.color = COLORS.amberLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.brownLight;
              e.currentTarget.style.color = COLORS.creamDark;
            }}
          >
            {s.name}
          </button>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ label }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 16,
          color: COLORS.amberLight,
          letterSpacing: 2,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            height: 2,
            width: 40,
            background: COLORS.amberLight,
          }}
        />
        <div
          style={{
            height: 2,
            flex: 1,
            background: COLORS.brown,
          }}
        />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: `2px solid ${COLORS.amber}`,
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 7,
          color: COLORS.brownLight,
        }}
      >
        © 2026 ABHISHEK CHAUDHARY — BUILT WITH ♥ + COFFEE
      </span>
      <span
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 7,
          color: COLORS.brownLight,
        }}
      >
        REACT + TAILWIND + PIXELS
      </span>
    </footer>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("HOME");

  const handleNav = (section) => {
    setActiveNav(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS;
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveNav(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${COLORS.bg}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bgMid}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.amber}; }
        ::selection { background: ${COLORS.amber}; color: ${COLORS.bg}; }
      `}</style>

      <Scanlines />
      <CRTVignette />
      <NavBar active={activeNav} onNav={handleNav} />

      <main style={{ background: COLORS.bg, minHeight: "100vh" }}>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
/*
  HUSSEIN MASRI - Brand Experience Website
  Interactive Logic & Cinematic Animations
*/

// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// Case Studies Dataset
const caseStudies = {
  aiq: {
    title: "Energy & Oil Industry",
    client: "AIQ, ADNOC",
    role: "Creative Lead / Brand Strategist",
    direction: "Unified AI-Energy Aesthetics",
    year: "2023 - 2026",
    overview: "AIQ is a joint venture focused on driving digital transformation in the energy sector through AI. As Creative Lead, the challenge was to take complex deep-learning operations and frame them into a luxury, institutional brand narrative. The campaign established a visual dialogue between software algorithms and energy flows.",
    challenge: "Energy systems and Artificial Intelligence are both highly complex sectors. Most communications default to corporate clichés—such as stock photos of servers or generic circuit boards. Our challenge was to design a bespoke visual language that feels premium, intellectual, and clearly communicates the synergy between cognitive software and oil/gas physics.",
    solution: "We developed the 'Aesthetics of Energy AI'—a design system featuring glowing neural networks overlaid on stylized energy infrastructure. By employing mathematical particle systems, 3D motion streaks, and dark luxury layouts, we established a sense of prestige. We rolled this out across global campaigns, corporate presentations, and institutional reports, creating unified brand consistency.",
    results: [
      "Complete digital brand guidelines authored, deployed, and scaled.",
      "Institutional presentation designs used by executive teams in global energy summits.",
      "Interactive campaign materials reaching over 500k industry decision-makers.",
      "AI creative workflows implemented, reducing asset production cycles by 40%."
    ],
    image: "assets/ai_energy.png"
  },
  etihad: {
    title: "Aviation Campaigns",
    client: "Etihad Airways, Etihad Cargo, Air Alitalia, Qatar Airways",
    role: "Creative Lead & Multimedia Specialist",
    direction: "Global Aviation Motion & Brand Campaigns",
    year: "2014 - 2023",
    overview: "A portfolio of premium digital experiences and high-impact campaigns created for leading global airlines, including Etihad Airways, Etihad Cargo, Air Alitalia, and Qatar Airways. This case study showcases creative rollouts designed to elevate brand presence, drive marketing strategies, and maintain a premium visual identity across international terminals, digital booking systems, and global flight corridors.",
    challenge: "Aviation marketing at a global scale requires absolute visual prestige and strict brand alignment across diverse companies. The creative challenge lies in designing unified motion and digital systems that communicate luxury and reliability while scaling seamlessly from massive terminal video walls down to mobile advertising formats.",
    solution: "Developed premium multi-channel design systems utilizing cinematic flight renders, custom animations, and clean layouts. Created template systems for regional marketing teams, ensuring absolute brand consistency across international passenger acquisition campaigns.",
    results: [
      "Engineered premium motion assets and terminal branding packages for Etihad Airways & Etihad Cargo.",
      "Developed digital campaign creatives scaled for Air Alitalia and Qatar Airways marketing.",
      "Maintained 100% brand consistency across regional marketing rollouts and international corridors.",
      "Multimedia creative direction that elevated digital brand perception in luxury traveler segments."
    ],
    image: "assets/aviation.png"
  },
  corporate: {
    title: "Government & Corporate Communication",
    client: "UAE Red Crescent, Abrahamic House Abu Dhabi, DCT Department of Culture and Tourism, HH Sheikha Fatima Bint Mubarak",
    role: "Creative & Brand Strategist",
    direction: "Strategic Visual Narratives",
    year: "2020 to 2026",
    overview: "Designing visual systems for executive presentations, state summits, and public awareness campaigns. This work involved organizing high-level corporate data into visual slides that command authority and guide decision-makers.",
    challenge: "State-level summits and CEO presentations contain highly complex policy information and large datasets. The risk is overwhelming the audience. Traditional slides are cluttered and fail to make an emotional connection. The presentation design had to command visual respect, maintain extreme clarity, and support the speaker's strategic narrative.",
    solution: "We applied editorial design layouts to strategic decks: ample white space, high-contrast layouts, structural grids, and custom vector diagrams. By treating slides as pieces of architectural design rather than placeholders for bullet points, we transformed complex arguments into intuitive visual steps.",
    results: [
      "Designed keynotes for executive leadership in major summits.",
      "State-level awareness campaigns launched across national print and digital networks.",
      "Created a proprietary template library used by corporate strategy teams for high-value tenders."
    ],
    image: "assets/corporate.png"
  },
  ai_workflow: {
    title: "AI & Future Technology",
    client: "G42, Presight",
    role: "Multimedia Director / AI Design",
    direction: "Neural Generative Pipelines",
    year: "2023 - Present",
    overview: "Exploring the boundary of artificial intelligence and high-end design. By setting up custom local neural pipelines, we generate conceptual sketches, moodboards, and final assets for branding campaigns, showcasing the future of multimedia production.",
    challenge: "Generative AI is often seen as a tool for chaotic, uncontrolled images. Integrating AI into premium corporate branding requires absolute control: style alignment, consistency, and clean compositions. The challenge was building a reliable pipeline that bridges AI speed with human-led strategic art direction.",
    solution: "We created a hybrid creative pipeline: AI tools generate concepts and initial textures, which are then refined, vector-aligned, and finished in Photoshop, Illustrator, and After Effects. This system allows us to test and iterate visual ideas in hours rather than days, maintaining professional standards.",
    results: [
      "Concept design process speed increased by over 300%.",
      "Successfully integrated AI assets in marketing test groups.",
      "Authored workflow guides on blending Stable Diffusion, Midjourney, and Adobe Firefly with classic design principles."
    ],
    image: "assets/ai_tech.png"
  }
};

/* ----------------------------------------------------
   1. Preloader Animation
---------------------------------------------------- */
const runPreloader = () => {
  const preloader = document.getElementById("preloader");
  const bar = document.querySelector(".preloader-bar");
  const percentage = document.querySelector(".preloader-percentage");
  
  let progress = 0;
  const interval = setInterval(() => {
    // Accelerate near end
    progress += Math.floor(Math.random() * 8) + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Hide preloader & trigger entrance
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          preloader.style.display = "none";
          triggerHeroAnimations();
        }
      });
    }
    
    bar.style.width = `${progress}%`;
    percentage.textContent = `${progress}%`;
  }, 40);
};

/* ----------------------------------------------------
   2. Hero & Global Entrance Animations (GSAP)
---------------------------------------------------- */
const triggerHeroAnimations = () => {
  // Animate Navbar
  gsap.from(".navbar", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate Hero Elements sequentially
  const tl = gsap.timeline();
  
  tl.from(".hero-bg-overlay", {
    scale: 1.1,
    opacity: 0,
    duration: 2.2,
    ease: "power2.out"
  })
  .from(".reveal-elem", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  }, "-=1.5");

  // Start Timeline scroll indicator fade in
  gsap.from(".hero-scroll-indicator", {
    opacity: 0,
    y: -10,
    duration: 1,
    delay: 2,
    ease: "power2.out"
  });
};

/* ----------------------------------------------------
   3. Custom Cursor spotlight
---------------------------------------------------- */
const setupCustomCursor = () => {
  const cursor = document.querySelector(".custom-cursor");
  const cursorGlow = document.querySelector(".custom-cursor-glow");
  
  if (!cursor) return;

  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    
    // Animate cursor pointer
    gsap.to(cursor, {
      x: clientX,
      y: clientY,
      duration: 0.1,
      ease: "power2.out"
    });
    
    // Animate large glow lag
    gsap.to(cursorGlow, {
      x: clientX,
      y: clientY,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // Detect hover on interactive elements
  const hoverElements = document.querySelectorAll("a, button, .portfolio-card, .software-item, .timeline-content, .filter-btn");
  hoverElements.forEach(elem => {
    elem.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
    elem.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
  });
};

/* ----------------------------------------------------
   4. Scroll-to-Hide Navbar
---------------------------------------------------- */
const setupNavbarScroll = () => {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
      navbar.style.backgroundColor = "rgba(5, 5, 5, 0.95)";
      navbar.style.padding = "1rem 2rem";
      
      // Hide on scroll down, show on scroll up
      if (window.scrollY > lastScrollY) {
        navbar.classList.add("hidden");
      } else {
        navbar.classList.remove("hidden");
      }
    } else {
      navbar.style.backgroundColor = "rgba(5, 5, 5, 0.7)";
      navbar.style.padding = "1.5rem 2rem";
      navbar.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
  });
};

/* ----------------------------------------------------
   5. Mobile Navigation Menu Toggle
---------------------------------------------------- */
const setupMobileMenu = () => {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const overlay = document.querySelector(".mobile-nav-overlay");
  const links = document.querySelectorAll(".mobile-nav-link");
  
  if (!toggleBtn) return;

  const toggle = () => {
    const isActive = toggleBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = isActive ? "hidden" : "";
  };

  toggleBtn.addEventListener("click", toggle);
  
  links.forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
};

/* ----------------------------------------------------
   6. Skill Cards Spotlight Radial Tracking
---------------------------------------------------- */
const setupSkillspotlights = () => {
  const cards = document.querySelectorAll(".skill-card");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
};

/* ----------------------------------------------------
   7. Portfolio Grid Filtering System
---------------------------------------------------- */
const setupPortfolioFilters = () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".portfolio-card");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle button active class
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.getAttribute("data-filter");
      
      cards.forEach(card => {
        const categories = card.getAttribute("data-category").split(" ");
        
        if (filter === "all" || categories.includes(filter)) {
          card.classList.add("show");
          setTimeout(() => card.classList.add("reveal-active"), 50);
        } else {
          card.classList.remove("reveal-active");
          setTimeout(() => card.classList.remove("show"), 300);
        }
      });
    });
  });

  // Reveal portfolio cards on scroll trigger
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".portfolio-card").forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        card.classList.add("reveal-active");
      },
      once: true
    });
  });
};

/* ----------------------------------------------------
   8. Sliding Case Study Drawer System
---------------------------------------------------- */
const setupCaseStudyDrawer = () => {
  const drawer = document.getElementById("case-study-drawer");
  const closeBtn = document.querySelector(".drawer-close-btn");
  const cards = document.querySelectorAll(".portfolio-card");
  
  if (!drawer || !closeBtn) return;

  const openDrawer = (projectId) => {
    const data = caseStudies[projectId];
    if (!data) return;

    // Inject data into drawer elements
    document.getElementById("drawer-main-title").textContent = data.title;
    document.getElementById("drawer-client-tag").textContent = data.client.split(" ")[0];
    document.getElementById("drawer-meta-client").textContent = data.client;
    document.getElementById("drawer-meta-role").textContent = data.role;
    document.getElementById("drawer-meta-direction").textContent = data.direction;
    document.getElementById("drawer-meta-year").textContent = data.year;
    
    document.getElementById("drawer-overview-text").textContent = data.overview;
    document.getElementById("drawer-challenge-text").textContent = data.challenge;
    document.getElementById("drawer-solution-text").textContent = data.solution;
    
    // Inject Results List
    const resultsContainer = document.getElementById("drawer-results-list");
    resultsContainer.innerHTML = "";
    data.results.forEach(res => {
      const li = document.createElement("li");
      li.textContent = res;
      resultsContainer.appendChild(li);
    });
    
    // Inject Hero image
    const heroWrapper = document.getElementById("drawer-hero");
    if (data.image) {
      heroWrapper.style.backgroundImage = `url('${data.image}')`;
    } else {
      heroWrapper.style.backgroundImage = "none";
      heroWrapper.style.backgroundColor = "var(--bg-secondary)";
    }
    
    // Inject Gallery Image
    const galleryContainer = document.getElementById("drawer-gallery-images");
    galleryContainer.innerHTML = "";
    if (data.image) {
      const img = document.createElement("img");
      img.src = data.image;
      img.alt = data.title;
      img.className = "drawer-gallery-image";
      galleryContainer.appendChild(img);
    }
    
    // Slide Drawer in & Lock Body scroll
    drawer.classList.add("active");
    document.body.style.overflow = "hidden";
    
    // Relayout lucide icons if loaded inside
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  const closeDrawer = () => {
    drawer.classList.remove("active");
    document.body.style.overflow = "";
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const projectId = card.getAttribute("data-project-id");
      openDrawer(projectId);
    });
  });

  closeBtn.addEventListener("click", closeDrawer);
  
  // Close drawer on escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
};

/* ----------------------------------------------------
   9. Scroll Trigger Reveals & Counters (GSAP)
---------------------------------------------------- */
const setupScrollAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  // About Metrics Counter Increments
  const metricsSection = document.querySelector(".journey-left");
  if (metricsSection) {
    ScrollTrigger.create({
      trigger: metricsSection,
      start: "top 80%",
      onEnter: () => {
        document.querySelectorAll(".journey-left .metric-value").forEach(metric => {
          const target = parseInt(metric.getAttribute("data-target"), 10);
          const counter = { val: 0 };
          
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              metric.textContent = "+" + Math.floor(counter.val);
            }
          });
        });
      },
      once: true
    });
  }

  // Timeline Item slide-in animation
  gsap.utils.toArray(".timeline-item").forEach(item => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%"
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  // Skill Card zoom-reveal animation
  gsap.from(".skill-card", {
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 80%"
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    clearProps: "transform,opacity"
  });

  // Behind the Process layout fade-in
  gsap.from(".process-wrapper", {
    scrollTrigger: {
      trigger: ".process-section",
      start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
};


// Initialize All Features on Load
window.addEventListener("load", () => {
  runPreloader();
  setupCustomCursor();
  setupNavbarScroll();
  setupMobileMenu();
  setupSkillspotlights();
  setupPortfolioFilters();
  setupCaseStudyDrawer();
  setupScrollAnimations();

});

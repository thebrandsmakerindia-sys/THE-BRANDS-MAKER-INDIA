const preloader = document.getElementById("preloader");
const preloaderBar = document.getElementById("preloader-bar");
const preloaderPercent = document.getElementById("preloader-percent");

let progress = 0;
const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 12;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);

        if (preloaderBar) preloaderBar.style.width = "100%";
        if (preloaderPercent) preloaderPercent.textContent = "100%";

        setTimeout(() => {
            if (preloader) preloader.classList.add("fade-out");
            document.body.classList.add("page-loaded");
        }, 320);
    } else {
        if (preloaderBar) preloaderBar.style.width = `${progress}%`;
        if (preloaderPercent) preloaderPercent.textContent = `${progress}%`;
    }
}, 45);

window.addEventListener("load", () => {
    if (progress < 100) {
        progress = 100;
        clearInterval(loadInterval);
        if (preloaderBar) preloaderBar.style.width = "100%";
        if (preloaderPercent) preloaderPercent.textContent = "100%";
        setTimeout(() => {
            if (preloader) preloader.classList.add("fade-out");
            document.body.classList.add("page-loaded");
        }, 250);
    }
});


const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const btnText = menuToggle ? menuToggle.querySelector(".btn-text") : null;
const drawerContainer = document.getElementById("drawer-container");
const backdrop = document.getElementById("drawer-backdrop");
const navLinks = document.querySelectorAll(".sm-menu-item a, .desktop-menu a");
const menuItems = document.querySelectorAll(".sm-menu-item");

function updateHeader() {
    if (document.body.classList.contains("menu-active")) return;
    if (window.innerWidth <= 768) {
        header.style.background = "#03061f";
    } else {
        header.style.background = window.scrollY > 20 ? "#010417" : "#000968";
    }
}
window.addEventListener("scroll", updateHeader);
window.addEventListener("resize", updateHeader);
updateHeader();

function openDrawer() {
    drawerContainer.classList.add("open");
    document.body.classList.add("menu-active");
    document.body.style.overflow = "hidden";
    menuToggle.setAttribute("aria-expanded", "true");
    if (btnText) btnText.textContent = "CLOSE";
}

function closeDrawer() {
    drawerContainer.classList.remove("open");
    document.body.classList.remove("menu-active");
    document.body.style.overflow = "";
    menuToggle.setAttribute("aria-expanded", "false");
    if (btnText) btnText.textContent = "MENU";
    updateHeader();
}

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        drawerContainer.classList.contains("open") ? closeDrawer() : openDrawer();
    });
}
if (backdrop) backdrop.addEventListener("click", closeDrawer);

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const targetEl = document.querySelector(href);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        }

        const parentItem = link.closest(".sm-menu-item");
        if (parentItem) {
            menuItems.forEach(item => item.classList.remove("active"));
            parentItem.classList.add("active");
            closeDrawer();
        }
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawerContainer.classList.contains("open")) closeDrawer();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && drawerContainer.classList.contains("open")) closeDrawer();
});


const servicesData = [
    {
        num: "01",
        category: "IDENTITY",
        title: "Distinctive Logos Engineered to Be Unforgettable",
        heading: "Logo Design",
        subtext: "Memorable marks custom-built for high retention.",
        tag: "Vector Geometry • Minimalist • Scalable",
        desc: "Bespoke logos, monograms, and icon systems with precision grid proportions that anchor brand presence across every platform.",
        badge: "Vector Mark",
        theme: "deepblue"
    },
    {
        num: "02",
        category: "PACKAGING",
        title: "Packaging That Commands Retail & Unboxing Attention",
        heading: "Packaging Design",
        subtext: "Turn retail boxes and mailers into brand ambassadors.",
        tag: "Dieline Precision • Shelf Impact • Premium Finishes",
        desc: "Production-ready 3D box structures, luxury pouches, and tactile packaging materials calibrated to stand out in competitive marketplaces.",
        badge: "Dieline Ready",
        theme: "orange"
    },
    {
        num: "03",
        category: "ECOSYSTEM",
        title: "Complete Brand Ecosystems That Mean Real Business",
        heading: "Complete Branding",
        subtext: "Unified design language, typography & guidelines from Day 1.",
        tag: "Full Brand Identity • Styleguides • Typography",
        desc: "End-to-end design frameworks: color psychology palettes, font pairings, stationery sets, and digital asset rules designed for unified scaling.",
        badge: "Full System",
        theme: "electric"
    },
    {
        num: "04",
        category: "MARKETING",
        title: "Social Media Creatives Designed for High Engagement",
        heading: "Social Media Post",
        subtext: "Thumb-stopping assets that spark conversions.",
        tag: "High CTR • Carousel Kits • Motion Templates",
        desc: "High-engagement Instagram carousels, ad creatives, LinkedIn thought-leadership cards, and story kits built to maximize conversions.",
        badge: "Viral Growth",
        theme: "purple"
    },
    {
        num: "05",
        category: "PRINT SPECS",
        title: "Precision Labeling for Bottles, Jars & Products",
        heading: "Label Design",
        subtext: "Sharp, compliant labels engineered for bottles and jars.",
        tag: "Bottles & Jars • Metallic Foil • Barcode Spec",
        desc: "Custom wrap-around, waterproof, metallic foil, and UV-spot labels with clear typographic hierarchy and barcode calibration.",
        badge: "CMYK Calibrated",
        theme: "emerald"
    },
    {
        num: "06",
        category: "PROMOTION",
        title: "High-Impact Marketing Flyers That Drive Footfall",
        heading: "Flyer Design",
        subtext: "Direct-response flyers built for live distribution.",
        tag: "Single & Double Sided • Print Ready • Quick Promo",
        desc: "Crisp hierarchies, structured offers, and compelling calls-to-action designed to convert foot traffic at expos, retail, and launches.",
        badge: "Event Ready",
        theme: "red"
    },
    {
        num: "07",
        category: "CATALOG",
        title: "Corporate Brochures & Catalogs for High-Ticket Deals",
        heading: "Brochure Design",
        subtext: "Structured catalogs designed for business pitches.",
        tag: "Bi-Fold • Tri-Fold • Multi-Page Books",
        desc: "Sophisticated editorial layouts presenting your products, enterprise capabilities, and credentials to investors and corporate buyers.",
        badge: "Corporate",
        theme: "navy"
    }
];

const totalCards = servicesData.length;
const scrollTrack = document.getElementById("services");
const container = document.getElementById("curved-carousel-wrap");
const canvas = document.getElementById("three-canvas");
const progressBar = document.getElementById("scroll-progress-bar");

const activeTags = document.getElementById("active-tags");
const activeTitle = document.getElementById("active-title");
const activeDesc = document.getElementById("active-desc");
const activeInfoBox = document.getElementById("active-service-info");
const serviceOrderBtn = document.getElementById("service-order-btn");

const skipAboveBtn = document.getElementById("skip-above-btn");
const skipBelowBtn = document.getElementById("skip-below-btn");

let width = container.clientWidth;
let height = container.clientHeight;

const scene = new THREE.Scene();
const isMobile = window.innerWidth <= 768;

const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 54, width / height, 0.1, 1000);
camera.position.set(0, 0, isMobile ? 5.2 : 3.65);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const cylinderRadius = isMobile ? 4.8 : 6.6;
const cardWidthAngle = (2 * Math.PI) / totalCards;
const cardHeight = isMobile ? 2.85 : 3.7;
const arcCoverage = cardWidthAngle * 0.94;

function createCardTexture(data) {
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 1200;
    texCanvas.height = 760;
    const ctx = texCanvas.getContext("2d");

    ctx.fillStyle = "#070c24";
    ctx.beginPath();
    ctx.roundRect(10, 10, 1180, 740, 40);
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(47, 92, 255, 0.45)";
    ctx.stroke();

    let accentGrad = ctx.createLinearGradient(740, 40, 1140, 700);
    if (data.theme === "orange") {
        accentGrad.addColorStop(0, "#e64a19");
        accentGrad.addColorStop(1, "#8a2503");
    } else if (data.theme === "electric") {
        accentGrad.addColorStop(0, "#2f5cff");
        accentGrad.addColorStop(1, "#0a1f7d");
    } else if (data.theme === "purple") {
        accentGrad.addColorStop(0, "#7c3aed");
        accentGrad.addColorStop(1, "#2e1065");
    } else if (data.theme === "emerald") {
        accentGrad.addColorStop(0, "#059669");
        accentGrad.addColorStop(1, "#022c22");
    } else if (data.theme === "red") {
        accentGrad.addColorStop(0, "#dc2626");
        accentGrad.addColorStop(1, "#450a0a");
    } else {
        accentGrad.addColorStop(0, "#1a3294");
        accentGrad.addColorStop(1, "#070f38");
    }

    ctx.fillStyle = accentGrad;
    ctx.beginPath();
    ctx.roundRect(750, 40, 400, 680, 28);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.roundRect(780, 70, 340, 200, 18);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 70px Manrope, sans-serif";
    ctx.fillText(data.num, 810, 155);

    ctx.font = "700 22px Manrope, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fillText(data.category, 810, 205);

    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.beginPath();
    ctx.roundRect(780, 620, 260, 58, 29);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 22px Manrope, sans-serif";
    ctx.fillText(data.badge, 810, 656);

    ctx.fillStyle = "rgba(123, 136, 183, 0.9)";
    ctx.font = "700 24px Manrope, sans-serif";
    ctx.fillText(data.num + " / Services", 70, 110);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 56px Manrope, sans-serif";

    const words = data.heading.split(" ");
    let line = "";
    let y = 210;
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = ctx.measureText(testLine);
        if (metrics.width > 620 && n > 0) {
            ctx.fillText(line, 70, y);
            line = words[n] + " ";
            y += 72;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, 70, y);

    ctx.fillStyle = "#9cb1e8";
    ctx.font = "400 28px 'Segoe UI', sans-serif";
    ctx.fillText(data.subtext, 70, y + 84);

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(70, 620, 260, 60, 30);
    ctx.fill();

    ctx.fillStyle = "#000968";
    ctx.font = "800 24px Manrope, sans-serif";
    ctx.fillText("Learn More ↗", 102, 658);

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    return texture;
}

const cardMeshes = [];
const cylinderGroup = new THREE.Group();
scene.add(cylinderGroup);

servicesData.forEach((data, index) => {
    const geometry = new THREE.CylinderGeometry(
        cylinderRadius,
        cylinderRadius,
        cardHeight,
        36,
        1,
        true,
        -arcCoverage / 2,
        arcCoverage
    );

    const material = new THREE.MeshBasicMaterial({
        map: createCardTexture(data),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = index * cardWidthAngle;
    mesh.userData = { index: index, data: data };
    cylinderGroup.add(mesh);
    cardMeshes.push(mesh);
});

cylinderGroup.position.set(0, isMobile ? 0.05 : 0.05, -cylinderRadius);

let targetTheta = - 2 * cardWidthAngle;
let currentTheta = targetTheta;
let activeIndex = 2;

function updateActiveInfo(newIndex) {
    if (newIndex === activeIndex) return;
    activeIndex = newIndex;

    const data = servicesData[activeIndex];
    activeInfoBox.classList.add("fade");

    setTimeout(() => {
        activeTags.textContent = data.tag;
        activeTitle.textContent = data.title;
        activeDesc.textContent = data.desc;
        serviceOrderBtn.href = `https://wa.me/917417256721?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(data.title)}`;
        activeInfoBox.classList.remove("fade");
    }, 140);
}

function onScroll() {
    const rect = scrollTrack.getBoundingClientRect();
    const trackHeight = scrollTrack.offsetHeight - window.innerHeight;

    if (trackHeight > 0) {
        const scrolledIntoTrack = Math.min(Math.max(-rect.top, 0), trackHeight);
        const progress = scrolledIntoTrack / trackHeight;

        const totalRotationSpan = (totalCards - 1) * cardWidthAngle;
        targetTheta = - (progress * totalRotationSpan);

        if (progressBar) {
            progressBar.style.width = `${progress * 100}%`;
        }
    }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function getCanvasRelativeCoords(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: - ((event.clientY - rect.top) / rect.height) * 2 + 1
    };
}

canvas.addEventListener("mousemove", (e) => {
    const coords = getCanvasRelativeCoords(e);
    mouse.x = coords.x;
    mouse.y = coords.y;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardMeshes);

    if (intersects.length > 0) {
        const hit = intersects[0];
        const uv = hit.uv;
        const isOverButton = (uv.x >= 0.05 && uv.x <= 0.32 && uv.y >= 0.08 && uv.y <= 0.22);
        
        if (isOverButton) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = hit.object.userData.index !== activeIndex ? "pointer" : "default";
        }
    } else {
        canvas.style.cursor = "default";
    }
});

canvas.addEventListener("click", (e) => {
    const coords = getCanvasRelativeCoords(e);
    mouse.x = coords.x;
    mouse.y = coords.y;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardMeshes);

    if (intersects.length > 0) {
        const hit = intersects[0];
        const clickedIndex = hit.object.userData.index;
        const uv = hit.uv;
        const isOverButton = (uv.x >= 0.05 && uv.x <= 0.32 && uv.y >= 0.08 && uv.y <= 0.22);

        if (isOverButton) {
            const data = hit.object.userData.data;
            window.open(`https://wa.me/917417256721?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(data.title)}`, "_blank");
            return;
        }

        scrollToCard(clickedIndex);
    }
});

function scrollToCard(index) {
    const trackTop = scrollTrack.offsetTop;
    const trackHeight = scrollTrack.offsetHeight - window.innerHeight;
    const targetProgress = index / (totalCards - 1);
    const scrollTarget = trackTop + (targetProgress * trackHeight);

    window.scrollTo({
        top: scrollTarget,
        behavior: "smooth"
    });
}


if (skipAboveBtn) {
    skipAboveBtn.addEventListener("click", () => {
        const heroSection = document.getElementById("home");
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}

if (skipBelowBtn) {
    skipBelowBtn.addEventListener("click", () => {
        const nextAnchor = document.getElementById("after-services");
        if (nextAnchor) {
            nextAnchor.scrollIntoView({ behavior: "smooth" });
        } else {
            const trackBottom = scrollTrack.offsetTop + scrollTrack.offsetHeight;
            window.scrollTo({ top: trackBottom, behavior: "smooth" });
        }
    });
}


function animate() {
    requestAnimationFrame(animate);

    currentTheta += (targetTheta - currentTheta) * 0.085;
    cylinderGroup.rotation.y = currentTheta;

    let normalized = Math.round(-currentTheta / cardWidthAngle) % totalCards;
    if (normalized < 0) normalized += totalCards;
    updateActiveInfo(normalized);

    cardMeshes.forEach((mesh) => {
        let relAngle = (mesh.rotation.y + currentTheta) % (Math.PI * 2);
        if (relAngle > Math.PI) relAngle -= Math.PI * 2;
        if (relAngle < -Math.PI) relAngle += Math.PI * 2;

        const dist = Math.abs(relAngle);
        mesh.material.opacity = Math.max(0.35, 1.0 - dist * 0.7);
    });

    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    width = container.clientWidth;
    height = container.clientHeight;
    
    const mobile = window.innerWidth <= 768;
    camera.fov = mobile ? 50 : 54;
    camera.position.z = mobile ? 5.2 : 3.65;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    onScroll();
});
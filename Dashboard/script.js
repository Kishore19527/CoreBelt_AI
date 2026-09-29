/* =========================================================
   codeNcore
   CONVEYOR HEALTH MONITORING
   STATIC SENSOR SIMULATION
   + THREE.JS 3D DIGITAL TWIN
========================================================= */


/* =========================================================
   SENSOR DATA
========================================================= */

const sensorData = {

    vibration: 0.42,

    temperature: 48,

    tension: 62,

    speed: 3.2,

    current: 8.4,

    load: 55

};


let simulationRunning = true;
let vibrationPhase = 0;
let waveAnimationFrame = null;


/* =========================================================
   PAGE INFORMATION
========================================================= */

const pageInformation = {

    dashboard: {

        title: "Conveyor Health Overview",

        subtitle:
            "Intelligent Conveyor Belt Health Monitoring System"

    },

    conveyor: {

        title: "3D Conveyor Digital Twin",

        subtitle:
            "Interactive 3D representation of the conveyor system."

    },

    sensors: {

        title: "Live Sensor Monitoring",

        subtitle:
            "Real-time conveyor equipment parameters."

    },

    vision: {

        title: "AI Vision",

        subtitle:
            "YOLO-based conveyor belt damage detection."

    },

    prediction: {

        title: "Predictive Maintenance",

        subtitle:
            "Conveyor health and failure prediction."

    },

    alarms: {

        title: "Alarms & Events",

        subtitle:
            "System event history and operational records."

    }

};


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function openPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(
        function(page) {

            page.classList.remove(
                "active-page"
            );

        }
    );


    const selectedPage =
        document.getElementById(pageName);

    if (!selectedPage) {
        return;
    }


    selectedPage.classList.add(
        "active-page"
    );


    /* UPDATE SIDEBAR */

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );

    navItems.forEach(
        function(item) {

            item.classList.remove(
                "active"
            );

            if (
                item.dataset.page ===
                pageName
            ) {

                item.classList.add(
                    "active"
                );

            }

        }
    );


    /* UPDATE HEADER */

    const info =
        pageInformation[pageName];

    if (info) {

        const title =
            document.getElementById(
                "pageTitle"
            );

        const subtitle =
            document.getElementById(
                "pageSubtitle"
            );

        const breadcrumb =
            document.getElementById(
                "breadcrumbPage"
            );


        if (title) {
            title.textContent =
                info.title;
        }


        if (subtitle) {
            subtitle.textContent =
                info.subtitle;
        }


        if (breadcrumb) {
            breadcrumb.textContent =
                pageName
                    .replace("-", " ")
                    .toUpperCase();
        }

    }


    /* RESIZE 3D */

    if (
        pageName === "conveyor"
    ) {

        setTimeout(
            function() {

                window.dispatchEvent(new Event("resize"));

            },
            100
        );

    }

}


/* =========================================================
   SIDEBAR EVENTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const navItems =
            document.querySelectorAll(
                ".nav-item"
            );


        navItems.forEach(
            function(item) {

                item.addEventListener(
                    "click",
                    function() {

                        const page =
                            item.dataset.page;

                        openPage(page);

                    }
                );

            }
        );

    }
);


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );

    if (!clock) {
        return;
    }


    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const seconds =
        String(
            now.getSeconds()
        ).padStart(
            2,
            "0"
        );


    clock.textContent =
        `${hours}:${minutes}:${seconds}`;
}


setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================================================
   RANDOM VALUE
========================================================= */

function randomBetween(
    min,
    max
) {

    return Math.random() *
        (max - min) +
        min;

}


/* =========================================================
   SIMULATE SENSORS
========================================================= */

function simulateSensors() {

    if (!simulationRunning) {
        return;
    }


    sensorData.vibration =
        randomBetween(
            0.30,
            0.58
        );


    sensorData.temperature =
        randomBetween(
            45,
            51
        );


    sensorData.tension =
        randomBetween(
            58,
            66
        );


    sensorData.speed =
        randomBetween(
            2.9,
            3.5
        );


    sensorData.current =
        randomBetween(
            7.5,
            9.4
        );


    sensorData.load =
        randomBetween(
            48,
            62
        );


    updateUI();

}


/* =========================================================
   HEALTH CALCULATION
========================================================= */

function calculateHealth() {

    const vibrationPenalty =
        Math.max(
            0,
            (sensorData.vibration - 0.3) *
            4
        );


    const temperaturePenalty =
        Math.max(
            0,
            (sensorData.temperature - 45) *
            0.15
        );


    const tensionPenalty =
        Math.max(
            0,
            Math.abs(
                sensorData.tension - 62
            ) *
            0.08
        );


    const currentPenalty =
        Math.max(
            0,
            (sensorData.current - 7.5) *
            0.2
        );


    let health =
        98 -
        vibrationPenalty -
        temperaturePenalty -
        tensionPenalty -
        currentPenalty;


    health =
        Math.max(
            90,
            Math.min(
                98,
                health
            )
        );


    return Math.round(
        health
    );

}


/* =========================================================
   UPDATE DASHBOARD UI
========================================================= */

function updateUI() {

    const health =
        calculateHealth();


    /* -----------------------------------------
       SENSOR VALUES
    ----------------------------------------- */

    setText(
        "overviewVibration",
        sensorData.vibration.toFixed(2)
    );

    setText(
        "overviewTemperature",
        Math.round(
            sensorData.temperature
        )
    );

    setText(
        "overviewTension",
        Math.round(
            sensorData.tension
        )
    );

    setText(
        "overviewSpeed",
        sensorData.speed.toFixed(1)
    );

    setText(
        "overviewCurrent",
        sensorData.current.toFixed(1)
    );
/* -----------------------------------------
       DASHBOARD HEALTH
    ----------------------------------------- */

    setText(
        "healthValue",
        health
    );


    setText(
        "dashVibration",
        sensorData.vibration.toFixed(2)
        + " g"
    );


    setText(
        "dashTemperature",
        Math.round(
            sensorData.temperature
        )
        + "°C"
    );


    setText(
        "dashSpeed",
        sensorData.speed.toFixed(1)
        + " m/s"
    );


    /* -----------------------------------------
       LIVE SENSOR PAGE
    ----------------------------------------- */

    setText(
        "sensorVibration",
        sensorData.vibration.toFixed(2)
    );


    setText(
        "sensorTemperature",
        Math.round(
            sensorData.temperature
        )
    );


    setText(
        "sensorTension",
        Math.round(
            sensorData.tension
        )
    );


    setText(
        "sensorSpeed",
        sensorData.speed.toFixed(1)
    );


    setText(
        "sensorCurrent",
        sensorData.current.toFixed(1)
    );
/* -----------------------------------------
       SENSOR DETAILS
    ----------------------------------------- */

    setText(
        "tempDetail",
        Math.round(
            sensorData.temperature
        )
        + "°C"
    );


    setText(
        "speedDetail",
        sensorData.speed.toFixed(1)
        + " m/s"
    );
/* -----------------------------------------
       METERS
    ----------------------------------------- */

    const tempMeter =
        document.getElementById(
            "tempMeter"
        );

    if (tempMeter) {

        tempMeter.style.width =
            sensorData.temperature
            + "%";

    }


    const tensionMeter =
        document.getElementById(
            "tensionMeter"
        );

    if (tensionMeter) {

        tensionMeter.style.width =
            sensorData.tension
            + "%";

    }
    const temperatureFill =
        document.getElementById(
            "temperatureFill"
        );

    if (temperatureFill) {

        temperatureFill.style.width =
            sensorData.temperature
            + "%";

    }


    /* -----------------------------------------
       TENSION CIRCLE
    ----------------------------------------- */

    const tensionCircle =
        document.getElementById(
            "tensionCircle"
        );


    if (tensionCircle) {

        const degree =
            sensorData.tension *
            3.6;


        tensionCircle.style.background =
            `conic-gradient(
                var(--orange) 0deg ${degree}deg,
                #edf1f5 ${degree}deg 360deg
            )`;

    }


    setText(
        "tensionCircleValue",
        Math.round(
            sensorData.tension
        )
    );


    /* -----------------------------------------
       SPEED METER
    ----------------------------------------- */

    const speedMeter =
        document.getElementById(
            "speedMeter"
        );

    if (speedMeter) {

        speedMeter.style.width =
            (
                sensorData.speed /
                5
            ) * 100
            + "%";

    }


    /* -----------------------------------------
       SPEED NEEDLE
    ----------------------------------------- */

    const speedNeedle =
        document.getElementById(
            "speedNeedle"
        );

    if (speedNeedle) {

        const angle =
            -90 +
            (
                sensorData.speed /
                5
            ) * 180;


        speedNeedle.style.transform =
            `rotate(${angle}deg)`;

    }


    /* -----------------------------------------
       PREDICTION PAGE
    ----------------------------------------- */

    setText(
        "predVibration",
        sensorData.vibration.toFixed(2)
        + " g"
    );


    setText(
        "predTemperature",
        Math.round(
            sensorData.temperature
        )
        + "°C"
    );


    setText(
        "predTension",
        Math.round(
            sensorData.tension
        )
        + "%"
    );


    setText(
        "predSpeed",
        sensorData.speed.toFixed(1)
        + " m/s"
    );


    setText(
        "predCurrent",
        sensorData.current.toFixed(1)
        + " A"
    );


    setText(
        "predLoad",
        Math.round(
            sensorData.load
        )
        + "%"
    );


    /* -----------------------------------------
       DIGITAL TWIN DATA
    ----------------------------------------- */

    setText(
        "twinSpeed",
        sensorData.speed.toFixed(1)
        + " m/s"
    );


    setText(
        "twinTension",
        Math.round(
            sensorData.tension
        )
        + "%"
    );


    setText(
        "twinCurrent",
        sensorData.current.toFixed(1)
        + " A"
    );


    setText(
        "twinTemperature",
        Math.round(
            sensorData.temperature
        )
        + "°C"
    );


    setText(
        "twinVibration",
        sensorData.vibration.toFixed(2)
        + " g"
    );


    /* -----------------------------------------
       CONFIDENCE
    ----------------------------------------- */

    const confidence =
        Math.max(
            90,
            Math.min(
                98,
                health + 2
            )
        );


    setText(
        "confidenceValue",
        confidence + "%"
    );


    const confidenceBar =
        document.getElementById(
            "confidenceBar"
        );


    if (confidenceBar) {

        confidenceBar.style.width =
            confidence + "%";

    }


    /* -----------------------------------------
       LIVE SENSOR STATUS
    ----------------------------------------- */

    updateSensorStatuses();

    /* -----------------------------------------
       WAVEFORMS
    ----------------------------------------- */


}


/* =========================================================
   SAFE TEXT UPDATE
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   VIBRATION WAVEFORM
========================================================= */

function drawWave(canvasId) {

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Soft monitoring grid
    ctx.strokeStyle = "#e9eef5";
    ctx.lineWidth = 1;
    for (let y = 10; y < height; y += Math.max(12, height / 10)) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Make the waveform respond to the simulated ADXL345 value.
    const normalized = Math.max(0, Math.min(1, (sensorData.vibration - 0.20) / 0.70));
    const amplitude = Math.max(8, height * (0.16 + normalized * 0.18));
    const center = height / 2;
    const frequency = 0.075 + normalized * 0.025;

    ctx.beginPath();
    for (let x = 0; x <= width; x += 2) {
        const wave = Math.sin(x * frequency + vibrationPhase) * amplitude;
        const wave2 = Math.sin(x * 0.19 + vibrationPhase * 1.35) * amplitude * 0.28;
        const micro = Math.sin(x * 0.47 + vibrationPhase * 0.7) * amplitude * 0.08;
        const y = center + wave + wave2 + micro;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#1769e0";
    ctx.lineWidth = canvasId === "vibrationWave" ? 2.2 : 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
}

function animateVibrationWave() {
    vibrationPhase += simulationRunning ? 0.018 : 0.006;

    drawWave("overviewWave");
    drawWave("vibrationWave");

    waveAnimationFrame = requestAnimationFrame(animateVibrationWave);
}

function getSensorState(type) {
    if (type === "vibration") {
        if (sensorData.vibration >= 1.20) return ["CRITICAL", "critical"];
        if (sensorData.vibration >= 0.80) return ["WARNING", "warning"];
        return ["NORMAL", "normal"];
    }
    if (type === "temperature") {
        if (sensorData.temperature >= 80) return ["CRITICAL", "critical"];
        if (sensorData.temperature >= 65) return ["WARNING", "warning"];
        return ["NORMAL", "normal"];
    }
    if (type === "tension") {
        if (sensorData.tension >= 95) return ["CRITICAL", "critical"];
        if (sensorData.tension >= 85) return ["WARNING", "warning"];
        return ["NORMAL", "normal"];
    }
    if (type === "speed") {
        if (sensorData.speed < 1 || sensorData.speed > 5) return ["CRITICAL", "critical"];
        if (sensorData.speed < 2 || sensorData.speed > 4) return ["WARNING", "warning"];
        return ["NORMAL", "normal"];
    }
    if (type === "current") {
        if (sensorData.current >= 16) return ["CRITICAL", "critical"];
        if (sensorData.current >= 12) return ["WARNING", "warning"];
        return ["NORMAL", "normal"];
    }
    return ["NORMAL", "normal"];
}

function applyStatus(id, type) {
    const element = document.getElementById(id);
    if (!element) return;

    const [label, state] = getSensorState(type);
    element.textContent = label;
    element.classList.remove("normal-text", "status-normal", "status-warning", "status-critical");

    if (element.classList.contains("live-status")) {
        element.classList.add(`status-${state}`);
        const dot = element.querySelector("span");
        if (dot) dot.className = "";
    } else {
        element.classList.add(state === "normal" ? "normal-text" : `status-${state}`);
    }
}

function updateSensorStatuses() {
    applyStatus("dashVibrationStatus", "vibration");
    applyStatus("dashTemperatureStatus", "temperature");
    applyStatus("dashTensionStatus", "tension");
    applyStatus("dashSpeedStatus", "speed");
    applyStatus("dashCurrentStatus", "current");

    applyStatus("sensorVibrationStatus", "vibration");
    applyStatus("sensorTemperatureStatus", "temperature");
    applyStatus("sensorTensionStatus", "tension");
    applyStatus("sensorSpeedStatus", "speed");
    applyStatus("sensorCurrentStatus", "current");
}


/* =========================================================
   SIMULATION BUTTON
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const button =
            document.getElementById(
                "simulationToggle"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function() {

                simulationRunning =
                    !simulationRunning;


                const text =
                    document.getElementById(
                        "simulationText"
                    );


                if (simulationRunning) {

                    button.textContent =
                        "Pause Simulation";


                    if (text) {

                        text.textContent =
                            "SIMULATION RUNNING";

                    }

                } else {

                    button.textContent =
                        "Resume Simulation";


                    if (text) {

                        text.textContent =
                            "SIMULATION PAUSED";

                    }

                }

            }
        );

    }
);


/* =========================================================
   SENSOR SIMULATION LOOP
========================================================= */

setInterval(
    simulateSensors,
    2000
);


/* =========================================================
   INITIAL UI
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateUI();
        animateVibrationWave();

        window.addEventListener("resize", function() {
            drawWave("overviewWave");
            drawWave("vibrationWave");
        });

    }
);

/* =========================================================
   3D DIGITAL TWIN - UPLOADED REFERENCE IMPLEMENTATION
========================================================= */


(function () {
    const container = document.getElementById("conveyor3D");
    if (!container || typeof THREE === "undefined") return;

    container.innerHTML = "";

    /* ---------------------------------------------------------
       SCENE / CAMERA
    --------------------------------------------------------- */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f9fb);

    const initialHeight = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(
        34,
        Math.max(container.clientWidth, 900) / initialHeight,
        0.1,
        100
    );

    const DEFAULT_CAMERA = new THREE.Vector3(14.4, 7.8, 16.4);
    const DEFAULT_TARGET = new THREE.Vector3(0, 2.05, 0);
    camera.position.copy(DEFAULT_CAMERA);
    camera.lookAt(DEFAULT_TARGET);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth || 1000, initialHeight, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    /* ---------------------------------------------------------
       LIGHTING
    --------------------------------------------------------- */
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc4ccd3, 2.15));

    const key = new THREE.DirectionalLight(0xffffff, 3.0);
    key.position.set(7, 12, 9);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xdbeaff, 1.35);
    fill.position.set(-9, 6, -8);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(0, 5, 12);
    scene.add(rim);

    /* ---------------------------------------------------------
       CONVEYOR GROUP
    --------------------------------------------------------- */
    const conveyor = new THREE.Group();
    conveyor.rotation.y = -0.18;
    scene.add(conveyor);

    const frameMat = new THREE.MeshStandardMaterial({
        color: 0x7d8991,
        metalness: 0.82,
        roughness: 0.25
    });

    const darkFrameMat = new THREE.MeshStandardMaterial({
        color: 0x27323a,
        metalness: 0.62,
        roughness: 0.32
    });

    const steelMat = new THREE.MeshStandardMaterial({
        color: 0xbfc7cc,
        metalness: 0.94,
        roughness: 0.18
    });

    const blueMat = new THREE.MeshStandardMaterial({
        color: 0x1d5f91,
        metalness: 0.7,
        roughness: 0.24
    });

    const blackMat = new THREE.MeshStandardMaterial({
        color: 0x161c21,
        metalness: 0.28,
        roughness: 0.55
    });

    const frameLength = 10.4;
    const beltWidth = 2.25;
    const beltCenterY = 2.42;
    const beltRadius = 0.72;
    const beltHalfStraight = 4.55;
    const beltThickness = 0.16;

    function addBox(w, h, d, x, y, z, material, parent = conveyor) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            material
        );
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
    }

    /* ---------------------------------------------------------
       FRAME — TWO SUPPORT STANDS ONLY
    --------------------------------------------------------- */
    addBox(frameLength, 0.18, 0.16, 0, 1.76, 1.08, darkFrameMat);
    addBox(frameLength, 0.18, 0.16, 0, 1.76, -1.08, darkFrameMat);
    addBox(frameLength, 0.16, 0.12, 0, 2.82, 1.08, frameMat);
    addBox(frameLength, 0.16, 0.12, 0, 2.82, -1.08, frameMat);

    // Two stand structures. Each stand has two legs, matching the reference.
    [-4.05, 4.05].forEach((x) => {
        addBox(0.30, 1.82, 0.30, x, 0.87, 0.78, frameMat);
        addBox(0.30, 1.82, 0.30, x, 0.87, -0.78, frameMat);
        addBox(0.46, 0.18, 2.05, x, 0.08, 0, darkFrameMat);
        addBox(0.42, 0.16, 2.22, x, 1.76, 0, frameMat);
    });

    /* ---------------------------------------------------------
       CONTINUOUS BELT RIBBON
       The belt is one continuous mesh around both pulleys.
       There are NO rotating sticks / objects inside the belt.
    --------------------------------------------------------- */
    const pathPoints = [];
    const pathSegmentsStraight = 42;
    const pathSegmentsArc = 28;

    // Top: left -> right
    for (let i = 0; i <= pathSegmentsStraight; i++) {
        const t = i / pathSegmentsStraight;
        pathPoints.push({
            x: THREE.MathUtils.lerp(-beltHalfStraight, beltHalfStraight, t),
            y: beltCenterY + beltRadius
        });
    }

    // Right semicircle: top -> bottom
    for (let i = 1; i <= pathSegmentsArc; i++) {
        const a = Math.PI / 2 - (Math.PI * i / pathSegmentsArc);
        pathPoints.push({
            x: beltHalfStraight + Math.cos(a) * beltRadius,
            y: beltCenterY + Math.sin(a) * beltRadius
        });
    }

    // Bottom: right -> left
    for (let i = 1; i <= pathSegmentsStraight; i++) {
        const t = i / pathSegmentsStraight;
        pathPoints.push({
            x: THREE.MathUtils.lerp(beltHalfStraight, -beltHalfStraight, t),
            y: beltCenterY - beltRadius
        });
    }

    // Left semicircle: bottom -> top
    for (let i = 1; i < pathSegmentsArc; i++) {
        const a = -Math.PI / 2 + (Math.PI * i / pathSegmentsArc);
        pathPoints.push({
            x: -beltHalfStraight + Math.cos(a) * beltRadius,
            y: beltCenterY + Math.sin(a) * beltRadius
        });
    }

    const beltCount = pathPoints.length;
    const beltPositions = [];
    const beltNormals = [];
    const beltUVs = [];
    const beltIndices = [];

    // Approximate path length for UV animation.
    const pathLengths = [0];
    let totalPathLength = 0;
    for (let i = 1; i <= beltCount; i++) {
        const a = pathPoints[(i - 1) % beltCount];
        const b = pathPoints[i % beltCount];
        totalPathLength += Math.hypot(b.x - a.x, b.y - a.y);
        pathLengths.push(totalPathLength);
    }

    // Four vertices per path point: top-front, top-back, bottom-front, bottom-back.
    for (let i = 0; i < beltCount; i++) {
        const p = pathPoints[i];
        const next = pathPoints[(i + 1) % beltCount];
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const len = Math.hypot(dx, dy) || 1;

        // In-plane outward direction.
        const nx = dy / len;
        const ny = -dx / len;
        const zFront = beltWidth / 2;
        const zBack = -beltWidth / 2;

        const yTop = p.y + beltThickness / 2;
        const yBottom = p.y - beltThickness / 2;
        const u = pathLengths[i] / totalPathLength;

        beltPositions.push(
            p.x, yTop, zFront,
            p.x, yTop, zBack,
            p.x, yBottom, zFront,
            p.x, yBottom, zBack
        );

        beltNormals.push(
            nx, ny, 0,
            nx, ny, 0,
            -nx, -ny, 0,
            -nx, -ny, 0
        );

        beltUVs.push(
            u, 0,
            u, 1,
            u, 0,
            u, 1
        );
    }

    for (let i = 0; i < beltCount; i++) {
        const n = (i + 1) % beltCount;
        const a = i * 4;
        const b = n * 4;

        // Top surface
        beltIndices.push(a, b, a + 1);
        beltIndices.push(b, b + 1, a + 1);

        // Bottom surface
        beltIndices.push(a + 2, a + 3, b + 2);
        beltIndices.push(b + 2, a + 3, b + 3);

        // Front edge
        beltIndices.push(a, a + 2, b);
        beltIndices.push(b, a + 2, b + 2);

        // Back edge
        beltIndices.push(a + 1, b + 1, a + 3);
        beltIndices.push(b + 1, b + 3, a + 3);
    }

    const beltGeometry = new THREE.BufferGeometry();
    beltGeometry.setAttribute("position", new THREE.Float32BufferAttribute(beltPositions, 3));
    beltGeometry.setAttribute("normal", new THREE.Float32BufferAttribute(beltNormals, 3));
    beltGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(beltUVs, 2));
    beltGeometry.setIndex(beltIndices);
    beltGeometry.computeBoundingSphere();

    // Animated conveyor texture: the surface pattern moves with the belt.
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 1024;
    textureCanvas.height = 128;
    const tx = textureCanvas.getContext("2d");
    tx.fillStyle = "#171d22";
    tx.fillRect(0, 0, 1024, 128);

    for (let x = -80; x < 1100; x += 86) {
        tx.save();
        tx.translate(x, 0);
        tx.rotate(-0.18);
        tx.fillStyle = "rgba(255,255,255,0.12)";
        tx.fillRect(0, -20, 7, 180);
        tx.restore();
    }

    for (let x = 0; x < 1024; x += 32) {
        tx.fillStyle = "rgba(255,255,255,0.035)";
        tx.fillRect(x, 0, 2, 128);
    }

    const beltTexture = new THREE.CanvasTexture(textureCanvas);
    beltTexture.wrapS = THREE.RepeatWrapping;
    beltTexture.wrapT = THREE.ClampToEdgeWrapping;
    beltTexture.repeat.set(9.5, 1);
    beltTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    beltTexture.colorSpace = THREE.SRGBColorSpace;

    const beltMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a3136,
        map: beltTexture,
        metalness: 0.05,
        roughness: 0.72
    });

    const belt = new THREE.Mesh(beltGeometry, beltMaterial);
    belt.castShadow = true;
    belt.receiveShadow = true;
    conveyor.add(belt);

    /* ---------------------------------------------------------
       MOVING BELT TREADS — THESE ARE ON THE BELT SURFACE
       They travel around the same continuous path as the belt.
       Nothing rotates or floats inside the belt.
    --------------------------------------------------------- */
    const treadMaterial = new THREE.MeshStandardMaterial({
        color: 0x56616a,
        roughness: 0.78,
        metalness: 0.08
    });

    const treadGroup = new THREE.Group();
    conveyor.add(treadGroup);

    const treadCount = 30;
    const treadMeshes = [];

    for (let i = 0; i < treadCount; i++) {
        const tread = new THREE.Mesh(
            new THREE.BoxGeometry(0.075, 0.035, beltWidth - 0.10),
            treadMaterial
        );
        tread.castShadow = true;
        tread.receiveShadow = true;
        treadGroup.add(tread);
        treadMeshes.push(tread);
    }

    function sampleBeltPath(t) {
        const wrapped = ((t % 1) + 1) % 1;
        const scaled = wrapped * beltCount;
        const i0 = Math.floor(scaled) % beltCount;
        const i1 = (i0 + 1) % beltCount;
        const f = scaled - Math.floor(scaled);
        const a = pathPoints[i0];
        const b = pathPoints[i1];
        const x = THREE.MathUtils.lerp(a.x, b.x, f);
        const y = THREE.MathUtils.lerp(a.y, b.y, f);
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return { x, y, angle: Math.atan2(dy, dx) };
    }

    function updateTreads(offset) {
        for (let i = 0; i < treadMeshes.length; i++) {
            const t = (i / treadCount + offset) % 1;
            const p = sampleBeltPath(t);
            const isCurve = Math.abs(Math.cos(p.angle)) < 0.86;
            treadMeshes[i].position.set(p.x, p.y + 0.095, 0);
            treadMeshes[i].rotation.z = p.angle;
            treadMeshes[i].scale.z = isCurve ? 0.92 : 1;
        }
    }

    /* ---------------------------------------------------------
       PULLEYS
    --------------------------------------------------------- */
    const pulleys = [];

    function createPulley(x, accent = false) {
        const group = new THREE.Group();
        group.position.set(x, beltCenterY, 0);

        const drum = new THREE.Mesh(
            new THREE.CylinderGeometry(beltRadius * 0.98, beltRadius * 0.98, beltWidth + 0.18, 64),
            steelMat
        );
        drum.rotation.x = Math.PI / 2;
        drum.castShadow = true;
        drum.receiveShadow = true;
        group.add(drum);

        const sideMat = accent ? blueMat : darkFrameMat;
        [-1, 1].forEach((side) => {
            const cap = new THREE.Mesh(
                new THREE.CylinderGeometry(beltRadius * 0.84, beltRadius * 0.84, 0.13, 56),
                sideMat
            );
            cap.rotation.x = Math.PI / 2;
            cap.position.z = side * (beltWidth / 2 + 0.10);
            cap.castShadow = true;
            group.add(cap);
        });

        conveyor.add(group);
        pulleys.push(group);
        return group;
    }

    const tailPulley = createPulley(-beltHalfStraight, false);
    const drivePulley = createPulley(beltHalfStraight, true);

    /* ---------------------------------------------------------
       DRIVE MOTOR — SEPARATE, FIXED MOTOR
       The motor sits close to the drive pulley, but NOTHING is
       attached to it and nothing rotates with the motor.
    --------------------------------------------------------- */
    const motorGroup = new THREE.Group();
    motorGroup.position.set(beltHalfStraight + 1.12, 1.18, 0);
    conveyor.add(motorGroup);

    // Main motor housing. It is fixed in place; only the conveyor
    // drive pulley rotates.
    const motorBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 1.30, 48),
        blueMat
    );
    motorBody.rotation.z = Math.PI / 2;
    motorBody.castShadow = true;
    motorBody.receiveShadow = true;
    motorGroup.add(motorBody);

    // Fixed rear/end cap — no shaft, coupling, rod or rotating part.
    const motorEnd = new THREE.Mesh(
        new THREE.CylinderGeometry(0.43, 0.43, 0.14, 48),
        darkFrameMat
    );
    motorEnd.rotation.z = Math.PI / 2;
    motorEnd.position.x = 0.72;
    motorEnd.castShadow = true;
    motorGroup.add(motorEnd);

    // Small fixed mounting base under the motor.
    const motorMount = addBox(2.15, 0.16, 1.35, beltHalfStraight + 1.12, 0.52, 0, frameMat);

    /* ---------------------------------------------------------
       TEXT-ONLY LABELS — LARGE AND SEPARATED FROM THE MODEL
    --------------------------------------------------------- */
    function textSprite(text, color, width = 3.2, height = 0.58) {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 150;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "700 42px Arial";
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
                map: new THREE.CanvasTexture(canvas),
                transparent: true,
                depthTest: false
            })
        );
        sprite.scale.set(width, height, 1);
        return sprite;
    }

    const tailLabel = textSprite("TAIL PULLEY", "#53616b", 3.05, 0.58);
    tailLabel.position.set(-5.35, 4.05, 0);
    conveyor.add(tailLabel);

    const driveLabel = textSprite("DRIVE MOTOR", "#17527f", 3.35, 0.62);
    driveLabel.position.set(7.05, 4.05, 0);
    conveyor.add(driveLabel);

    /* ---------------------------------------------------------
       FLOOR / SHADOW
    --------------------------------------------------------- */
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 15),
        new THREE.MeshStandardMaterial({
            color: 0xe6ebef,
            roughness: 0.96,
            metalness: 0
        })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.03;
    floor.receiveShadow = true;
    scene.add(floor);

    /* ---------------------------------------------------------
       CONTROLS — RESET + AUTO ROTATE, NO ZOOM
    --------------------------------------------------------- */
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let autoRotate = false;
    let beltMotion = 0;

    const resetButton = document.getElementById("reset3D");
    const rotateButton = document.getElementById("rotate3D");

    function resetView() {
        autoRotate = false;

        if (rotateButton) {
            rotateButton.classList.remove("active");
            rotateButton.textContent = "AUTO ROTATE";
        }

        conveyor.rotation.set(0, -0.18, 0);
        camera.position.copy(DEFAULT_CAMERA);
        camera.lookAt(DEFAULT_TARGET);
    }

    if (resetButton) resetButton.onclick = resetView;

    if (rotateButton) {
        rotateButton.onclick = function () {
            autoRotate = !autoRotate;
            rotateButton.classList.toggle("active", autoRotate);
            rotateButton.textContent = autoRotate ? "STOP ROTATE" : "AUTO ROTATE";
        };
    }

    // Dragging rotates the model. There is intentionally NO wheel zoom.
    renderer.domElement.addEventListener("pointerdown", (e) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        renderer.domElement.style.cursor = "grabbing";
        renderer.domElement.setPointerCapture?.(e.pointerId);
    });

    renderer.domElement.addEventListener("pointerup", (e) => {
        dragging = false;
        renderer.domElement.style.cursor = "grab";
        renderer.domElement.releasePointerCapture?.(e.pointerId);
    });

    renderer.domElement.addEventListener("pointercancel", () => {
        dragging = false;
        renderer.domElement.style.cursor = "grab";
    });

    renderer.domElement.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        conveyor.rotation.y += dx * 0.007;
        conveyor.rotation.x = THREE.MathUtils.clamp(
            conveyor.rotation.x + dy * 0.003,
            -0.12,
            0.12
        );

        lastX = e.clientX;
        lastY = e.clientY;
    });

    // Prevent browser page zoom / wheel zoom inside the 3D view.
    renderer.domElement.addEventListener("wheel", (e) => {
        e.preventDefault();
    }, { passive: false });

    /* ---------------------------------------------------------
       ANIMATION
       1. Belt texture visibly travels around the conveyor.
       2. Both pulleys rotate on their own correct axle.
       3. Motor remains fixed; there is no rotating attachment.
       4. Nothing rotates in the center of the belt.
    --------------------------------------------------------- */
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const dt = clock.getDelta();

        // Continuous belt-surface motion.
        beltMotion = (beltMotion + dt * 0.16) % 1;
        beltTexture.offset.x = -beltMotion;
        updateTreads(beltMotion);

        // Correct pulley axle: Z axis for the cylinder mounted across the belt width.
        drivePulley.rotation.z -= dt * 0.95;
        tailPulley.rotation.z -= dt * 0.95;

        if (autoRotate && !dragging) {
            conveyor.rotation.y += dt * 0.18;
        }

        renderer.render(scene, camera);
    }

    function resize() {
        const w = container.clientWidth || 1000;
        const h = container.clientHeight || 500;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
    }

    window.addEventListener("resize", resize);
    if (window.ResizeObserver) {
        new ResizeObserver(resize).observe(container);
    }

    resize();
    resetView();
    animate();
})();

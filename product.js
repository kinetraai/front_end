// Product page interactions: info popups, architecture tabs, roadmap modal.
// Content ported from the React prototype; rendering is plain DOM.

const POPUPS = {
  // --- hero actions ---
  'hero-explore': {
    icon: 'layers', tag: 'Action · Explore', title: 'Explore Capabilities',
    description: 'Jump straight into the four capability pillars that make up the Kinetra platform, asset management, kinematics, simulation and edge deployment.',
    bullets: ['Robot Model Library', 'Kinematics Studio', 'Simulation Lab', 'Edge Robotics AI'],
  },
  'twin-engine': {
    icon: 'box', tag: 'Engine · Twin', title: 'NVIDIA cuRobo + Isaac Sim Twin',
    description: 'A physics-accurate digital twin of the robot, driven by cuRobo motion generation and validated in Isaac Sim before any hardware command is issued.',
    bullets: ['cuRobo GPU motion generation', 'Isaac Sim PhysX physics validation', 'OpenUSD robot & sensor schemas', 'Sim-first development workflow'],
  },

  // --- capabilities ---
  'cap-overview': {
    icon: 'layers', tag: 'Section · 01', title: 'Capabilities Overview',
    description: 'Four integrated pillars cover the full robotics lifecycle, from robot model definition through GPU-accelerated motion planning, physics simulation and edge deployment.',
    bullets: ['Asset Engine, robot model library', 'GPU Accelerated, kinematics studio', 'Digital Twin, simulation lab', 'Real-Time Control, edge robotics AI'],
  },
  'cap-library': {
    icon: 'database', tag: 'Capability · Asset Engine', title: 'Robot Model Library',
    description: 'A single source of truth for every robot in your workspace. Keep joint definitions, URDF and USD assets, and tool profiles versioned and reusable across all projects.',
    bullets: ['Centralized manipulator & joint records', 'URDF / USD asset import and validation', 'Reusable tool and end-effector profiles', 'Version history with instant rollback'],
  },
  'cap-kinematics': {
    icon: 'sliders-horizontal', tag: 'Capability · GPU Accelerated', title: 'Kinematics Studio',
    description: 'Interactive forward and inverse kinematics workbench driven by cuRobo CUDA kernels. Solve batch IK in 27μs and collision-free IK in 130μs at batch size 1000.',
    bullets: ['Forward & inverse kinematics solving', 'Batch-parallel IK across many seeds', 'Workspace visualisation & reachability maps', 'Trajectory editing with live collision feedback'],
  },
  'cap-simulation': {
    icon: 'play', tag: 'Capability · Digital Twin', title: 'Simulation Lab',
    description: 'Physically accurate digital twins of your work cell. Validate motion, collision behaviour and cycle times before a single servo moves.',
    bullets: ['GPU-accelerated PhysX physics', 'OpenUSD robot & sensor schemas', 'Collision analysis and clearance checks', 'Cycle-time context for throughput planning'],
  },
  'cap-edge': {
    icon: 'cpu', tag: 'Capability · Real-Time Control', title: 'Edge Robotics AI',
    description: 'Deploy optimised inference to the robot itself. TensorRT-compiled policies, Holoscan sensor streaming and Isaac ROS perception on Jetson Thor and Orin.',
    bullets: ['TensorRT INT8 / FP16 policy optimisation', 'Holoscan Sensor Bridge, 17ms 4K60 latency', 'Isaac ROS cuVSLAM & cuMotion deployment', 'Up to 2,070 FP4 TFLOPS on Jetson Thor'],
  },

  // --- hero badges ---
  'badge-ik': {
    icon: 'cpu', tag: 'Benchmark · Kinematics', title: '27μs Inverse Kinematics',
    description: 'Batch-parallel inverse kinematics solved on GPU with cuRobo. Standard IK converges in 27 microseconds, and collision-free IK in 130 microseconds at batch size 1000 on an NVIDIA RTX 4090.',
    bullets: ['27μs standard IK solve', '130μs collision-free IK (batch 1000)', 'Runs on RTX 4090 / Jetson Orin', 'Scales across multi-robot fleets'],
  },
  'badge-motion': {
    icon: 'zap', tag: 'Benchmark · Motion', title: '60× Faster Trajectory Generation',
    description: 'Industrial cuRobo deployments generate collision-free trajectories an average of 60× faster than leading CPU-based motion planners, under 100 milliseconds end to end.',
    bullets: ['60× speed-up vs CPU planners', 'UR10 motion generated in under 100ms', 'Global motion generation in ~30ms', 'Real-time reactive control enabled'],
  },
  'badge-compute': {
    icon: 'bot', tag: 'Benchmark · Compute', title: '2,070 FP4 TFLOPS at the Edge',
    description: 'NVIDIA Jetson AGX Thor T5000 delivers up to 2,070 FP4 TFLOPS with 128GB of memory, enough to run billion-parameter foundation models directly on a humanoid robot.',
    bullets: ['2,070 FP4 TFLOPS · 128GB memory', '7.5× performance vs Jetson AGX Orin', '3.5× better energy efficiency', 'Up to 12GB memory reclamation'],
  },

  // --- hero twin panel ---
  'twin-live': {
    icon: 'activity', tag: 'Runtime · Simulation', title: 'Live Digital Twin',
    description: 'The simulation twin is actively solving kinematics and validating collision-free trajectories against the physics model.',
    bullets: ['cuRobo kinematics solver running', 'Isaac Sim physics validation active', 'Trajectory replanned in under 100ms', 'Ready for edge deployment'],
  },
  'twin-planning': {
    icon: 'gauge', tag: 'Metric · Planning', title: 'Trajectory Planning < 100ms',
    description: 'Collision-free motion for a UR10 is generated in under 100 milliseconds on Jetson Orin, fast enough for real-time reactive control.',
    bullets: ['UR10 motion under 100ms on Jetson Orin', '60× faster than CPU-based planners', 'Global motion generation in ~30ms', 'Runs on RTX 4090 and Jetson Thor'],
  },
  'twin-platform': {
    icon: 'cpu', tag: 'Runtime · Hardware', title: 'Target Platform',
    description: 'Kinetra runs on both workstation GPUs for development and Jetson Thor or Orin modules for on-robot inference.',
    bullets: ['NVIDIA RTX 4090, desktop development', 'Jetson AGX Thor T5000, 2,070 TFLOPS', 'Jetson AGX Orin, existing robot platforms', 'Jetson Thor T3000 / T2000, compact edge'],
  },

  // --- architecture ---
  'arch-innovation': {
    icon: 'circuit-board', tag: 'Protocol · Innovation', title: 'Engineering Innovation',
    description: 'Kinetra exists to protect engineering assumptions and operational interests in an environment where robotics technology evolves at a dizzying pace.',
    bullets: ['Sim-first development methodology', 'Physics-accurate validation gates', 'GPU-accelerated throughout the pipeline', 'Bridges the simulation-to-reality gap'],
  },
  'arch-matrix': {
    icon: 'shield', tag: 'Matrix · Architecture', title: 'Technical Roadmap & Architecture',
    description: 'The full production stack, NVIDIA SDK integration matrix, target compute hardware and quarterly delivery roadmap for Kinetra.',
    bullets: ['Executive overview', 'Core technical stack', 'NVIDIA SDK matrix', 'Compute & hardware targets', 'Q3–Q4 advanced roadmap'],
    action: { label: 'Open Full Roadmap', roadmap: true },
  },
  'overview-domain': {
    icon: 'globe', tag: 'Platform · Domain', title: 'Production Domain: Kinetra.lk',
    description: 'Kinetra is live at kinetra.lk, an AI Motion Intelligence, Robotics & Kinematics platform for industrial, mobile and humanoid systems.',
    bullets: ['AI Motion Intelligence platform', 'Robotics & Kinematics tooling', 'Industrial, mobile & humanoid domains', 'GPU-accelerated throughout'],
  },
  'overview-perf': {
    icon: 'gauge', tag: 'Platform · Benchmark', title: '100ms UR10 Motion Generation',
    description: 'Kinetra generates collision-free motion for a UR10 manipulator in under 100 milliseconds, running on NVIDIA Jetson Orin and Thor hardware.',
    bullets: ['UR10 motion in under 100ms', '60× faster than CPU planners', 'Runs on Jetson Orin / Thor', 'Enables real-time reactive control'],
  },
  'hw-cloud': {
    icon: 'server', tag: 'Infrastructure · Cloud', title: 'Cloud Training & Simulation',
    description: 'Robot policies are trained and simulation workloads are orchestrated on AWS GPU instances with NVIDIA H100 and A100 Tensor Core GPUs.',
    bullets: ['Amazon EC2 P5, NVIDIA H100 GPUs', 'Amazon EC2 P4d, NVIDIA A100 GPUs', 'AWS EKS for cluster orchestration', 'Thousands of parallel simulation envs'],
  },
  'hw-edge': {
    icon: 'cpu', tag: 'Infrastructure · Edge', title: 'Edge Robot Deployment',
    description: 'Optimised inference runs directly on the robot via NVIDIA Jetson Thor and Orin modules, real-time control without a network round trip.',
    bullets: ['Jetson AGX Thor T5000, 2,070 TFLOPS', 'Jetson Thor T3000 / T2000', 'Jetson AGX Orin / IGX Orin', 'TensorRT-optimised inference'],
  },

  // --- metrics ---
  'metric-engineers': {
    icon: 'network', tag: 'Metric · Team', title: '1,000+ Active Engineers',
    description: 'A distributed engineering network contributing to Kinetra robot models, motion planning pipelines and simulation environments.',
    bullets: ['Robotics, controls & ML specialists', 'Contributors across industrial and mobile robotics', 'Shared robot model and asset library'],
  },
  'metric-years': {
    icon: 'calendar', tag: 'Metric · Experience', title: '20+ Years of Expertise',
    description: 'Two decades of combined experience across kinematics, motion planning, control theory and GPU-accelerated simulation.',
    bullets: ['Kinematics & motion planning', 'Physics simulation & digital twins', 'Edge AI and embedded robotics'],
  },
  'metric-validation': {
    icon: 'shield-check', tag: 'Metric · Quality', title: '100% Validation',
    description: 'Every motion plan produced by Kinetra passes collision and constraint validation before it reaches hardware, sim-first, safety-aware by design.',
    bullets: ['Collision-free verification on every plan', 'Physics-accurate simulation gate', 'Hardware-in-the-loop validation stage'],
  },
  'metric-projects': {
    icon: 'rocket', tag: 'Metric · Delivery', title: '500+ Completed Projects',
    description: 'Robotics deployments delivered across industrial manipulation, mobile autonomy and research platforms.',
    bullets: ['Industrial manipulator work cells', 'Mobile and autonomous platforms', 'Research and academic robotics'],
  },
};

const SDKS = {
  'cuRobo': {
    icon: 'zap', tag: 'NVIDIA SDK · Motion', title: 'NVIDIA cuRobo',
    summary: 'GPU-accelerated kinematics, collision checking, and motion generation. Enables 27μs batch IK, 130μs collision-free IK, and 60× faster trajectory generation compared to CPU-based planners.',
    description: 'GPU-accelerated kinematics, collision checking and motion generation for manipulators and high-DoF systems.',
    bullets: ['27μs batch IK · 130μs collision-free IK', '60× faster trajectory generation', 'MPPI, L-BFGS & gradient-descent solvers', 'UR10 motion under 100ms on Jetson Orin'],
  },
  'Isaac Sim': {
    icon: 'box', tag: 'NVIDIA SDK · Simulation', title: 'NVIDIA Isaac Sim',
    summary: 'GPU-accelerated, physically accurate robotics simulation built on Omniverse. Provides PhysX physics, OpenUSD robot schemas, and photorealistic NuRec neural rendering.',
    description: 'GPU-accelerated, physically accurate robotics simulation built on Omniverse libraries for motion validation and digital twins.',
    bullets: ['PhysX GPU physics for accurate validation', 'OpenUSD robot & sensor schemas', 'High-fidelity camera, LiDAR & depth simulation', 'NuRec neural rendering for photorealism'],
  },
  'Isaac Lab': {
    icon: 'brain-circuit', tag: 'NVIDIA SDK · Learning', title: 'NVIDIA Isaac Lab',
    summary: 'Open-source framework for robot learning through RL and imitation learning. Enables thousands of parallel robot training instances for manipulation and locomotion.',
    description: 'Open-source, GPU-accelerated framework for robot learning through reinforcement and imitation learning.',
    bullets: ['Thousands of parallel training instances', 'Automatic Domain Randomisation (ADR)', 'Population Based Training (PBT)', 'Whole-body control for humanoids'],
  },
  'Isaac ROS': {
    icon: 'network', tag: 'NVIDIA SDK · Perception', title: 'NVIDIA Isaac ROS',
    summary: 'Hardware-accelerated packages including cuVSLAM, cuVGL, and cuMotion MoveIt integration for real-time ROS 2 obstacle avoidance and navigation.',
    description: 'Hardware-accelerated ROS 2 packages for perception, navigation and manipulation on NVIDIA GPUs.',
    bullets: ['cuVSLAM visual SLAM localisation', 'cuVGL global localisation', 'cuMotion MoveIt collision-free planning', 'Real-time obstacle avoidance pipelines'],
  },
  'Holoscan Sensor Bridge': {
    icon: 'radar', tag: 'NVIDIA SDK · Sensor Fusion', title: 'NVIDIA Holoscan Sensor Bridge',
    summary: 'Sensor-over-Ethernet technology streaming high-speed data directly to GPU memory. 4K60 camera latency of 17ms and signal processing under 1ms with GPUDirect.',
    description: 'Sensor-over-Ethernet technology streaming high-speed sensor data directly into GPU memory through FPGA interfaces.',
    bullets: ['4K60 camera latency of 17ms', 'GPUDirect signal processing under 1ms', '1% CPU utilisation with Camera-over-Ethernet', 'Scales from 10GbE to 100GbE'],
  },
  'Jetson Thor': {
    icon: 'cpu', tag: 'NVIDIA SDK · Edge Compute', title: 'NVIDIA Jetson Thor',
    summary: 'Edge AI compute delivering up to 2,070 FP4 TFLOPS with 128GB memory. 7.5× performance and 3.5× energy efficiency improvement over Jetson AGX Orin.',
    description: 'Edge-deployable AI compute for real-time robotics inference and physical AI workloads.',
    bullets: ['Up to 2,070 FP4 TFLOPS · 128GB memory', '7.5× performance vs Jetson AGX Orin', '3.5× energy efficiency improvement', '4×25GbE networking & camera offload'],
  },
  'NemoClaw': {
    icon: 'bot', tag: 'NVIDIA SDK · Agentic AI', title: 'NVIDIA NemoClaw',
    summary: 'Agentic AI framework orchestrating physical AI workflows and physical skills, secured by OpenShell policy-based governance.',
    description: 'Agentic AI framework for orchestrating physical AI development and autonomous robotics workflows.',
    bullets: ['Agent-executable robotics workflows', 'Policy-based security via OpenShell', 'Skills spanning Omniverse, Cosmos & Isaac', 'Safe deployment of autonomous agents'],
  },
  'Cosmos': {
    icon: 'globe', tag: 'NVIDIA SDK · World Models', title: 'NVIDIA Cosmos',
    summary: 'World foundation models for physical world reasoning, high-fidelity synthetic data generation, and enhanced simulation realism.',
    description: 'World foundation models for physical world reasoning and high-fidelity synthetic data generation.',
    bullets: ['Physical world reasoning for robotics', 'Synthetic data for robot learning', 'Improved simulation realism', 'Diverse scenario generation'],
  },
};

const STACK = [
  'Python & C++', 'PyTorch', 'CUDA & CUDA Graphs', 'NVIDIA Isaac Sim', 'NVIDIA Isaac Lab', 'NVIDIA cuRobo',
  'NVIDIA Isaac ROS', 'ROS 2', 'FastAPI & gRPC', 'PostgreSQL & TimescaleDB', 'Redis', 'Docker',
  'Kubernetes (EKS / K3s)', 'Apache Kafka', 'MLflow', 'Prometheus & Grafana', 'React',
];

const ROADMAP_ITEMS = [
  { text: 'Q3: Integrate cuRobo GPU kinematics & motion planning', sdk: 'cuRobo' },
  { text: 'Q3: Launch Isaac Sim & Lab digital twin environments', sdk: 'Isaac Sim' },
  { text: 'Q4: Deploy Holoscan Sensor Bridge 1ms streaming', sdk: 'Holoscan Sensor Bridge' },
  { text: 'Q4: Execute Jetson Thor edge humanoid deployment', sdk: 'Jetson Thor' },
  { text: 'Q4: Integrate NemoClaw agentic robotics skills', sdk: 'NemoClaw' },
  { text: 'Q4: Scale TensorRT & Triton multi-model inference', sdk: 'cuRobo' },
];

const METRICS = [
  { label: 'Active Engineers', value: '1,000+', popup: 'metric-engineers' },
  { label: 'Years of Expertise', value: '20+', popup: 'metric-years' },
  { label: 'Validation', value: '100%', popup: 'metric-validation' },
  { label: 'Completed Projects', value: '500+', popup: 'metric-projects' },
];

const PHASES = [
  {
    icon: 'circuit-board', title: 'Phase 01: Q3 · Core Acceleration Layer', sub: 'GPU-Accelerated Kinematics & Simulation Foundation',
    items: [
      'Integrate NVIDIA cuRobo for GPU-accelerated kinematics and motion generation',
      'Deploy NVIDIA Isaac Sim for physics-accurate robot simulation and digital twins',
      'Leverage NVIDIA Isaac Lab for GPU-accelerated robot learning and policy training',
      'Integrate NVIDIA Isaac ROS for hardware-accelerated perception and navigation',
    ],
  },
  {
    icon: 'radar', title: 'Phase 02: Q3–Q4 · Sensor Fusion & Edge Runtime', sub: 'Real-Time Perception, Streaming & Edge Compute',
    items: [
      'Deploy NVIDIA Holoscan Sensor Bridge for real-time sensor fusion',
      'Deploy core robotics inference on NVIDIA Jetson AGX Thor',
      'Integrate NVIDIA NemoClaw and physical AI skills for agentic robotics workflows',
      'Leverage NVIDIA Cosmos for synthetic data generation and world modeling',
    ],
  },
  {
    icon: 'gauge', title: 'Phase 03: Q4 · Optimization & Scale', sub: 'Inference Optimization, Benchmarking & Unified Platform',
    items: [
      'Optimize robotics AI models using NVIDIA TensorRT',
      'Deploy NVIDIA Triton Inference Server for scalable multi-model serving',
      'Benchmark motion intelligence workloads on NVIDIA H100 Tensor Core GPUs',
      'Build unified motion intelligence platform connecting kinematics, simulation, learning, and deployment',
      'Expand GPU-accelerated analytics pipelines across robot motion and sensor datasets',
    ],
  },
];

const TARGETS = [
  ['27μs', 'IK Solve'], ['130μs', 'Collision-Free IK'], ['<100ms', 'UR10 Motion'], ['60×', 'Trajectory Speed'],
  ['17ms', '4K60 Camera'], ['<1ms', 'GPUDirect Signal'], ['2,070 TFLOPS', 'Edge Compute'], ['7.5×', 'Perf. vs AGX Orin'],
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const refreshIcons = () => window.lucide && window.lucide.createIcons();

/* ---------- popup ---------- */
const popupEl = $('#ppPopup');
const roadmapEl = $('#ppRoadmap');

const syncScrollLock = () => {
  document.body.style.overflow = (!popupEl.hidden || !roadmapEl.hidden) ? 'hidden' : '';
};

const closeAll = () => {
  popupEl.hidden = true;
  roadmapEl.hidden = true;
  syncScrollLock();
};

const openPopup = (data) => {
  if (!data) return;
  roadmapEl.hidden = true;

  // Replace the icon node: lucide swaps <i> for <svg>, so rebuild it each time.
  const iconHost = $('.pp-dialog-icon', popupEl);
  iconHost.innerHTML = `<i data-lucide="${data.icon || 'info'}"></i>`;

  $('#ppPopupTag').textContent = data.tag || '';
  $('#ppPopupTitle').textContent = data.title || '';
  $('#ppPopupDesc').textContent = data.description || '';
  $('#ppPopupBullets').innerHTML = (data.bullets || [])
    .map((b) => `<li><i data-lucide="check-circle"></i><span></span></li>`).join('');
  $$('#ppPopupBullets li span').forEach((el, i) => { el.textContent = data.bullets[i]; });

  const action = $('#ppPopupAction');
  if (data.action) {
    action.hidden = false;
    action.textContent = data.action.label;
    action.removeAttribute('href');
    action.onclick = null;
    if (data.action.href) {
      action.href = data.action.href;
      action.target = '_blank';
      action.rel = 'noopener';
    } else if (data.action.roadmap) {
      action.href = '#';
      action.onclick = (e) => { e.preventDefault(); openRoadmap(); };
    }
  } else {
    action.hidden = true;
  }

  popupEl.hidden = false;
  syncScrollLock();
  refreshIcons();
};

const openRoadmap = () => {
  popupEl.hidden = true;
  roadmapEl.hidden = false;
  syncScrollLock();
};

/* ---------- roadmap modal body ---------- */
const buildRoadmap = () => {
  const phases = PHASES.map((p) => `
    <div class="pp-phase">
      <div class="pp-phase-head">
        <div class="pp-dialog-icon"><i data-lucide="${p.icon}"></i></div>
        <div><h5>${p.title}</h5><small>${p.sub}</small></div>
      </div>
      <div class="pp-two">
        ${p.items.map((t) => `<div class="pp-item"><i data-lucide="check-circle"></i><span>${t}</span></div>`).join('')}
      </div>
    </div>`).join('');

  const targets = TARGETS.map(([v, l]) => `<div class="pp-target"><strong>${v}</strong><small>${l}</small></div>`).join('');
  const stack = STACK.map((s) => `<span class="pp-chip pp-chip-static">${s}</span>`).join('');

  $('#ppRoadmapBody').innerHTML = `
    <div class="pp-mission"><strong>MISSION:</strong> Deliver GPU-accelerated motion intelligence that operates in milliseconds rather than seconds, unifying kinematics solving, collision-free motion generation, robot learning, and edge deployment across industrial, mobile, and humanoid robotics.</div>
    ${phases}
    <div class="pp-phase">
      <div class="pp-phase-head">
        <div class="pp-dialog-icon"><i data-lucide="trending-up"></i></div>
        <div><h5>Performance Targets</h5><small>Benchmarked on Production-Relevant Hardware</small></div>
      </div>
      <div class="pp-targets">${targets}</div>
    </div>
    <div class="pp-phase">
      <div class="pp-phase-head">
        <div class="pp-dialog-icon"><i data-lucide="layers"></i></div>
        <div><h5>Production Core Stack</h5></div>
      </div>
      <div class="pp-chips">${stack}</div>
    </div>`;
};

/* ---------- architecture tabs ---------- */
const initTabs = () => {
  const tabs = $$('.pp-tab');
  const panels = $$('.pp-panel');
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
    panels.forEach((p) => p.classList.toggle('is-active', p.dataset.panel === tab.dataset.tab));
  }));
};

const initStack = () => {
  $('#ppStack').innerHTML = STACK
    .map((item, i) => `<button type="button" class="pp-chip" data-stack="${i}"><i data-lucide="code"></i><span></span></button>`).join('');
  $$('#ppStack .pp-chip span').forEach((el, i) => { el.textContent = STACK[i]; });
};

const initSdk = () => {
  const chips = $('#ppSdkChips');
  chips.innerHTML = Object.keys(SDKS)
    .map((name) => `<button type="button" class="pp-chip pp-sdk-chip${name === 'cuRobo' ? ' is-active' : ''}" data-sdk="${name}">${name}</button>`).join('');

  let selected = 'cuRobo';
  const render = () => {
    $('#ppSdkName').textContent = selected;
    $('#ppSdkMoreName').textContent = selected;
    $('#ppSdkText').textContent = SDKS[selected].summary;
    $$('.pp-sdk-chip').forEach((c) => c.classList.toggle('is-active', c.dataset.sdk === selected));
  };
  render();

  chips.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-sdk]');
    if (!chip) return;
    selected = chip.dataset.sdk;
    render();
    openPopup(SDKS[selected]);
  });
  $('#ppSdkMore').addEventListener('click', () => openPopup(SDKS[selected]));
};

const initRoadmapItems = () => {
  $('#ppRoadmapItems').innerHTML = ROADMAP_ITEMS
    .map((it, i) => `<button type="button" class="pp-item pp-item-btn" data-road="${i}"><i data-lucide="check-circle"></i><span></span></button>`).join('');
  $$('#ppRoadmapItems .pp-item span').forEach((el, i) => { el.textContent = ROADMAP_ITEMS[i].text; });
};

const initMetrics = () => {
  $('#ppMetrics').innerHTML = METRICS
    .map((m) => `<button type="button" class="pp-metric" data-popup="${m.popup}"><small>${m.label}</small><strong>${m.value}</strong></button>`).join('');
};

/* ---------- wiring ---------- */
buildRoadmap();
initTabs();
initStack();
initSdk();
initRoadmapItems();
initMetrics();

document.addEventListener('click', (e) => {
  const popupTrigger = e.target.closest('[data-popup]');
  if (popupTrigger) {
    if (popupTrigger.dataset.goto) {
      const target = document.getElementById(popupTrigger.dataset.goto);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
    openPopup(POPUPS[popupTrigger.dataset.popup]);
    return;
  }

  if (e.target.closest('[data-roadmap]')) { openRoadmap(); return; }

  const stackChip = e.target.closest('[data-stack]');
  if (stackChip) {
    const item = STACK[stackChip.dataset.stack];
    openPopup({
      icon: 'code', tag: 'Stack · Component', title: item,
      description: `Part of the Kinetra production core stack, ${item} is used across the platform for motion planning, simulation, learning or deployment workloads.`,
      bullets: ['In production use across Kinetra', 'Integrated into the AI-native architecture', 'Supports real-time robotics workloads'],
    });
    return;
  }

  const road = e.target.closest('[data-road]');
  if (road) { openPopup(SDKS[ROADMAP_ITEMS[road.dataset.road].sdk]); return; }

  // Backdrop click or any close control
  if (e.target.closest('[data-close]') || e.target === popupEl || e.target === roadmapEl) closeAll();
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

refreshIcons();

/**
 * JAELSON R. CUNHA - ARCHITECT & AGENTIC AI PORTFOLIO SCRIPT
 * Background Canvas Particles, Interactive Agent Terminal, Counters & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initNavbar();
  initStatCounters();
  initAgentTerminal();
});

/* ==========================================================================
   1. BACKGROUND CANVAS PARTICLES (Cyber Constellation Network)
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 245, 212, ' : 'rgba(157, 78, 221, '
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   3. ANIMATED COUNTERS
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let activated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !activated) {
        activated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.innerText = target;
              clearInterval(interval);
            } else {
              counter.innerText = current;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-row');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   4. INTERACTIVE AGENTIC MATRIX TERMINAL
   ========================================================================== */
function initAgentTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const submitBtn = document.getElementById('terminal-submit-btn');
  const clearBtn = document.getElementById('btn-clear-term');
  const chips = document.querySelectorAll('.term-chip');

  if (!terminalBody || !terminalInput) return;

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => [
      `🤖 <span class="term-highlight">COMANDOS DO AGENTIC CLUSTER DISPONÍVEIS:</span>`,
      `  • <span class="term-highlight">agents</span>                 : Lista os nós de agentes do cluster e seus papéis`,
      `  • <span class="term-highlight">orchestrate [options]</span>  : Simula a orquestração autônoma de um pipeline multi-agente`,
      `  • <span class="term-highlight">harness --status</span>       : Inspeciona guardrails, mitigação de alucinação e latência`,
      `  • <span class="term-highlight">legacy-inspect</span>         : Executa análise de desacoplamento de monolito legado`,
      `  • <span class="term-highlight">whoami</span>                 : Perfil executivo e credenciais de Jaelson R. Cunha`,
      `  • <span class="term-highlight">contact</span>                : Informações diretas de conexão e contato`,
      `  • <span class="term-highlight">clear</span>                  : Limpa o buffer da tela do terminal`
    ],
    agents: () => [
      `📡 <span class="term-highlight">TOPOLOGIA DO CLUSTER MULTI-AGENTE (Active Mesh):</span>`,
      `  [1] <span style="color:#38BDF8">SupervisorArchitect</span>  : Roteamento semântico, decomposição de tarefas e estado global`,
      `  [2] <span style="color:#A855F7">HarnessGuardian</span>      : Validação formal, anti-prompt injection e circuit-breaker`,
      `  [3] <span style="color:#4ADE80">LegacyAnalyzer</span>       : AST Parser, extração de dependências e mapeamento DDD`,
      `  [4] <span style="color:#FBBF24">CodeSynthesisWorker</span>  : Geração de microsserviços modernos e testes unitários`,
      `  [5] <span style="color:#F43F5E">ReflectionEvaluator</span>  : Avaliação adversarial e garantia de zero quebra funcional`,
      `  <span style="color:#94A3B8">Status: 5/5 nós saudáveis | Latência média inter-agentes: 14ms | Protocolo: Event-Stream</span>`
    ],
    orchestrate: () => [
      `⚡ <span class="term-highlight">[ORCHESTRATOR] Iniciando pipeline agêntico de segurança e refatoração...</span>`,
      `  [00.1s] <span style="color:#38BDF8">SupervisorArchitect</span> decompôs a intenção do usuário em 3 subtarefas.`,
      `  [00.3s] <span style="color:#A855F7">HarnessGuardian</span> aprovou os guardrails de segurança (Score: 0.992).`,
      `  [00.7s] <span style="color:#4ADE80">LegacyAnalyzer</span> mapeou os acoplamentos do banco de dados relacional.`,
      `  [01.1s] <span style="color:#FBBF24">CodeSynthesisWorker</span> gerou o novo microsserviço desacoplado em TypeScript.`,
      `  [01.4s] <span style="color:#F43F5E">ReflectionEvaluator</span> rodou testes de mutação. 100% dos testes passaram!`,
      `✅ <span style="color:#00F5D4; font-weight:bold">SUCESSO: Artefato compilado e pronto para produção com zero downtime.</span>`
    ],
    harness: () => [
      `🛡️ <span class="term-highlight">[LLM HARNESS & SAFETY MATRIX]</span>`,
      `  • Prompt Injection Shield    : <span style="color:#00F5D4">ATIVO (0 violações detectadas)</span>`,
      `  • Hallucination Mitigation  : <span style="color:#00F5D4">ATIVO (Threshold de confiança > 0.985)</span>`,
      `  • Token Budget Optimization  : <span style="color:#00F5D4">62% economia com caching semântico</span>`,
      `  • Circuit Breaker Fallback   : <span style="color:#00F5D4">STANDBY (99.98% de disponibilidade)</span>`,
      `  • Modelos Conectados         : GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama-3-70B`
    ],
    'legacy-inspect': () => [
      `🔍 <span class="term-highlight">[LEGACY DECOUPLING SCANNER]</span>`,
      `  • Analisando estrutura legada: Monólito Java / JEE / Wildfly...`,
      `  • Componentes detectados     : 84 entidades JPA, 12 serviços acoplados, sessões de estado.`,
      `  • Estratégia recomendada    : Strangler Fig Pattern com Event Sourcing via Apache Kafka.`,
      `  • Aceleração por Agentes    : Extração automatizada de DTOs e geração de contratos OpenAPI.`,
      `💡 <span style="color:#38BDF8">Resultado: Arquitetura modernizada com isolamento de falhas e escalabilidade horizontal.</span>`
    ],
    whoami: () => [
      `👤 <span class="term-highlight">JAELSON R. CUNHA</span>`,
      `  • Cargo Atual    : Senior Software Architect & Agentic AI Specialist`,
      `  • Especialidade  : Orquestração Multi-Agente, LLM Harness, Sistemas Críticos & Legados`,
      `  • Localização    : Campo Grande - MS, Brasil`,
      `  • Distinções     : GitHub Developer Program Member, Starstruck, Arctic Code Vault Contributor`,
      `  • GitHub         : https://github.com/jaelsonrc`,
      `  • LinkedIn       : https://www.linkedin.com/in/jaelsonrc/`
    ],
    contact: () => [
      `📬 <span class="term-highlight">CANAIS DE CONTATO PROFISSIONAL:</span>`,
      `  • LinkedIn : <a href="https://www.linkedin.com/in/jaelsonrc/" target="_blank" style="color:#00F5D4; text-decoration:underline">linkedin.com/in/jaelsonrc/</a>`,
      `  • GitHub   : <a href="https://github.com/jaelsonrc" target="_blank" style="color:#00F5D4; text-decoration:underline">github.com/jaelsonrc</a>`,
      `  • Status   : Aberto para consultorias de arquitetura agêntica e projetos de alta escala.`
    ],
    clear: () => {
      terminalBody.innerHTML = '';
      return [];
    }
  };

  function executeCommand(inputRaw) {
    const raw = inputRaw.trim();
    if (!raw) return;

    history.push(raw);
    historyIndex = history.length;

    // Echo input
    appendLine(`jaelson@agentic:~$ ${escapeHtml(raw)}`, 'cmd-echo');

    const clean = raw.toLowerCase();
    let response = null;

    if (clean === 'help') {
      response = commands.help();
    } else if (clean === 'agents') {
      response = commands.agents();
    } else if (clean.startsWith('orchestrate')) {
      response = commands.orchestrate();
    } else if (clean.startsWith('harness')) {
      response = commands.harness();
    } else if (clean.startsWith('legacy')) {
      response = commands['legacy-inspect']();
    } else if (clean === 'whoami') {
      response = commands.whoami();
    } else if (clean === 'contact') {
      response = commands.contact();
    } else if (clean === 'clear') {
      response = commands.clear();
    } else {
      response = [
        `<span style="color:#F43F5E">Comando não reconhecido: '${escapeHtml(raw)}'.</span>`,
        `Digite <span class="term-highlight">'help'</span> para visualizar os comandos válidos.`
      ];
    }

    if (response && response.length > 0) {
      response.forEach(line => appendLine(line, 'output'));
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function appendLine(htmlContent, className) {
    const line = document.createElement('div');
    line.className = `term-line ${className || ''}`;
    line.innerHTML = htmlContent;
    terminalBody.appendChild(line);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  // Event Listeners
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (history.length > 0 && historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  submitBtn.addEventListener('click', () => {
    executeCommand(terminalInput.value);
    terminalInput.value = '';
  });

  clearBtn.addEventListener('click', () => {
    commands.clear();
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        executeCommand(cmd);
        terminalInput.value = '';
      }
    });
  });
}

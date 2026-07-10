(function () {
  "use strict";

  // ===== ELEMENTOS DO DOM =====
  const main = document.getElementById("main");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelectorAll(
    ".nav__link, .dropdown__group ul li a, #logo-link, .header__link"
  );
  const dropdownToggles = document.querySelectorAll(
    ".nav__item--has-dropdown > .nav__link"
  );

  // Mapeando os elementos da busca pelas classes do CSS para fazer funcionar
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

  // ===== Mapeamento para breadcrumb =====
  const sectionInfo = {
    home: { label: "HOME", parent: null },
    clube: { label: "CLUBE", parent: "home" },
    historia: { label: "HISTÓRIA", parent: "clube" },
    titulos: { label: "TÍTULOS", parent: "clube" },
    identidade: { label: "IDENTIDADE", parent: "clube" },
    diretoria: { label: "PRESIDÊNCIA E DIRETORIA", parent: "clube" },
    contatos: { label: "CONTATOS", parent: "clube" },
    ouvidoria: { label: "OUVIDORIA", parent: "clube" },
    contato: { label: "CONTATO", parent: "home" },
    futebol: { label: "FUTEBOL", parent: "home" },
    modalidades: { label: "MODALIDADES", parent: "home" },
    ingressos: { label: "INGRESSOS/PLANOS", parent: "home" },
    transparencia: { label: "TRANSPARÊNCIA", parent: "home" },
    negocios: { label: "NEGÓCIOS", parent: "home" },
    imprensa: { label: "IMPRENSA", parent: "home" },
    noticias: { label: "NOTÍCIAS", parent: "home" },
    "proximos-jogos": { label: "PRÓXIMOS JOGOS", parent: "home" },
  };

  // ===== CONTEÚDO DAS PÁGINAS (ALINHADO COM A HISTÓRIA REAL) =====
  const contentMap = {
    home: `
            <div class="page-home">
                <h1>Bem-vindo ao José Justi FC</h1>
                <p class="lead">Clube de futebol com tradição, garra e amor pela camisa.<br />Aqui vivemos o esporte com paixão e excelência.</p>
                <p style="color: #D4AF37; font-size: 1.2rem;">#JoséJustiFC #GarraDourada</p>
                <div style="margin-top: 30px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <span style="background:#1a1a1a; padding:10px 20px; border-radius:30px; border:1px solid #D4AF37;">2 títulos da Copa Terrão</span>
                    <span style="background:#1a1a1a; padding:10px 20px; border-radius:30px; border:1px solid #D4AF37;">1 vice-campeonato</span>
                    <span style="background:#1a1a1a; padding:10px 20px; border-radius:30px; border:1px solid #D4AF37;">Oitavas da Copa Igaraí</span>
                </div>
            </div>
        `,
    historia: `
            <h2>História da Equipe José Justi</h2>
            <p>Fundada em 2019, a equipe José Justi iniciou suas atividades no campo de terra do bairro que leva o seu nome. Em seus primeiros anos, o projeto demonstrou grande potencial competitivo, conquistando dois títulos da Copa Terrão e um vice-campeonato. No ano subsequente, a equipe expandiu sua atuação para partidas amistosas em modalidades de campo e futsal.</p>
            <p>O ano de 2022 marcou a primeira participação do elenco em um torneio oficial de futsal, alcançando as oitavas de final na Copa Igaraí. Em 2023, a equipe estreou no Campeonato Amador de Mococa e foi convidada a integrar a Copa Libertadores em Santa Cruz das Palmeiras, competição da qual não pôde participar por questões orçamentárias.</p>
            <p>Após um período de hiato em 2024 devido ao desmanche do elenco, o projeto foi retomado no fim de 2025. Em 2026, a equipe consolida o seu retorno com uma gestão reestruturada e um planejamento sólido, com o objetivo claro de disputar as próximas competições, buscar títulos e alcançar o acesso às divisões superiores.</p>
        `,
    titulos: `
            <h2>Títulos e Conquistas</h2>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 10px 0; border-bottom: 1px solid #333;">Campeão da Copa Terrão – 2020 e 2021</li>
                <li style="padding: 10px 0; border-bottom: 1px solid #333;">Vice-campeão da Copa Terrão – 2019</li>
                <li style="padding: 10px 0; border-bottom: 1px solid #333;">Oitavas de final na Copa Igaraí (futsal) – 2022</li>
                <li style="padding: 10px 0; border-bottom: 1px solid #333;">Participação no Campeonato Amador de Mococa – 2023</li>
                <li style="padding: 10px 0;">Convite para a Copa Libertadores em Santa Cruz das Palmeiras – 2023 (não disputada)</li>
            </ul>
        `,
    identidade: `
            <h2>Identidade do Clube</h2>
            <div class="card-grid">
                <div class="card"><h3>Nome</h3><p>José Justi FC – homenagem ao bairro onde tudo começou.</p></div>
                <div class="card"><h3>Cores</h3><p>Preto e Dourado – representam a elegância, a força e a riqueza da nossa história.</p></div>
                <div class="card"><h3>Escudo</h3><p>O escudo traz as iniciais JJF entrelaçadas, uma bola de futebol e uma estrela dourada que simboliza os primeiros títulos conquistados.</p></div>
                <div class="card"><h3>Valores</h3><p>Raça, superação, fair play, trabalho em equipe e amor à camisa.</p></div>
            </div>
        `,
    diretoria: `
            <h2>Presidência e Diretoria – Gestão 2026</h2>
            <div style="background: #111; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
                <p><strong>Presidente:</strong> Vardir Junior</p>
                <p><strong>Vice-presidente:</strong> Maria Eduarda</p>
            </div>
        `,
    contatos: `
            <h2>Contatos</h2>
            <p><i class="fas fa-envelope" style="color:#D4AF37; width:30px;"></i> <strong>E-mail:</strong> Indefinido</p>
            <p><i class="fas fa-phone-alt" style="color:#D4AF37; width:30px;"></i> <strong>Telefone:</strong> Telefones para contato (19) 99014-1082 e (19) 99608-3109</p>
            <p><i class="fas fa-map-marker-alt" style="color:#D4AF37; width:30px;"></i> <strong>Sede:</strong> Sem definição! Mococa – SP</p>
            <p><i class="fas fa-clock" style="color:#D4AF37; width:30px;"></i> <strong>Horário de atendimento:</strong> Segunda a sexta, 9h às 18h</p>
        `,
    ouvidoria: `
            <h2>Ouvidoria</h2>
            <p>Canal exclusivo para reclamações, sugestões e elogios. Sua opinião é fundamental para melhorarmos cada dia mais.</p>
            <p><i class="fas fa-envelope" style="color:#D4AF37; width:30px;"></i> <strong>E-mail:</strong> ouvidoria@josejustifc.com.br</p>
            <p><i class="fas fa-phone-alt" style="color:#D4AF37; width:30px;"></i> <strong>Telefone:</strong> (19) 99014-1082 e (19) 99608-3109</p>
            <p><i class="fas fa-clock" style="color:#D4AF37; width:30px;"></i> <strong>Atendimento:</strong> Segunda a sexta, 10h às 17h</p>
        `,
    noticias: `
            <h2>Últimas Notícias</h2>
            <div class="card-grid">
                <div class="card"><h3>Retorno do elenco em 2026</h3><p>Após hiato em 2024, o José Justi FC reestrutura sua gestão e planeja disputar competições oficiais.</p></div>
            </div>
        `,
    "proximos-jogos": `
            <h2>Próximos Jogos</h2>
            <table class="table-games">
                <thead>
                    <tr><th>Data</th><th>Adversário</th><th>Local</th><th>Horário</th></tr>
                </thead>
                <tbody>
                    <tr><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td></tr>
                    <tr><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td></tr>
                    <tr><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td></tr>
                    <tr><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td><td>Indefinido</td></tr>
                </tbody>
            </table>
        `,
    contato: `
            <h2>Contato</h2>
            <p>Entre em contato conosco através dos nossos canais:</p>
            <p><i class="fas fa-envelope" style="color:#D4AF37; width:30px;"></i> Indefinido</p>
            <p><i class="fas fa-phone-alt" style="color:#D4AF37; width:30px;"></i> (19) 99014-1082</p>
            <p><i class="fas fa-phone-alt" style="color:#D4AF37; width:30px;"></i> (19) 99608-3109</p>
        `,
    futebol: `
            <h2>Futebol</h2>
            <p>O departamento de futebol do José Justi FC está em fase de reestruturação para a temporada 2026. A equipe profissional disputará amistosos e competições regionais com o objetivo de conquistar títulos e acesso a divisões superiores.</p>
            <p>As categorias de base (sub-15, sub-17 e sub-20) também estão sendo reformuladas com novos talentos.</p>
        `,
    modalidades: `
            <h2>Modalidades</h2>
            <p>Além do futebol de campo, o José Justi FC investe em outras modalidades:</p>
            <ul style="list-style: disc; padding-left: 20px; color: #e0e0e0;">
                <li>Futsal – equipe masculina e feminina (Não Iniciado)</li>
                <li>Futebol society (Não Iniciado)</li>
                <li>Escolinhas de futebol para crianças e adolescentes (Não Iniciado)</li>
            </ul>
        `,
    ingressos: `
            <h2>Ingressos / Planos</h2>
            <p>Confira os valores e benefícios dos planos de sócio-torcedor do José Justi FC:</p>
            <ul style="list-style: disc; padding-left: 20px; color: #e0e0e0;">
                <li><strong>Plano Ouro:</strong> Plano Indefinido.</li>
                <li><strong>Plano Prata:</strong> Plano Indefinido.</li>
                <li><strong>Plano Bronze:</strong> Plano Indefinido.</li>
            </ul>
        `,
    transparencia: `
            <h2>Transparência</h2>
            <p>O José Justi FC segue rigorosamente as normas de governança e transparência. Disponibilizamos para consulta:</p>
            <ul style="list-style: disc; padding-left: 20px; color: #e0e0e0;">
                <li>Demonstrações financeiras anuais (Indefinido)</li>
                <li>Relatórios de gestão (Indefinido)</li>
                <li>Prestação de contas (Indefinido)</li>
                <li>Plano de carreira e desenvolvimento de atletas (Indefinido)</li>
            </ul>
        `,
    negocios: `
            <h2>Negócios</h2>
            <p>O José Justi FC está aberto a parcerias, patrocínios e oportunidades comerciais. Entre em contato com nosso departamento de marketing para propostas.</p>
            <p><i class="fas fa-envelope" style="color:#D4AF37; width:30px;"></i> Indefinido</p>
        `,
    imprensa: `
            <h2>Imprensa</h2>
            <p>Assessoria de imprensa do José Justi FC:</p>
            <p><i class="fas fa-envelope" style="color:#D4AF37; width:30px;"></i> Indefinido</p>
            <p><i class="fas fa-phone-alt" style="color:#D4AF37; width:30px;"></i> (19) 99014-1082</p>
            <p><i class="fas fa-phone-alt" style="color:#D4AF37; width:30px;"></i> (19) 99608-3109</p>
            <p>Disponibilizamos releases, interviews e materiais para veículos de comunicação.</p>
        `,
  };

  // ===== FUNÇÕES DE BREADCRUMB E VOLTAR =====
  function buildBreadcrumb(section) {
    if (!section || section === "home") return null;
    const info = sectionInfo[section];
    if (!info) return null;
    const parts = [];
    let current = section;
    while (current && sectionInfo[current]) {
      const item = sectionInfo[current];
      parts.unshift({ id: current, label: item.label });
      current = item.parent;
    }
    parts.unshift({ id: "home", label: "HOME" });
    let html = '<div class="breadcrumb">';
    parts.forEach((p, index) => {
      if (index === parts.length - 1) {
        html += `<span>${p.label}</span>`;
      } else {
        html += `<a href="#" data-section="${p.id}">${p.label}</a> > `;
      }
    });
    html += "</div>";
    return html;
  }

  function buildBackButton(section) {
    if (!section || section === "home") return "";
    const info = sectionInfo[section];
    if (!info || !info.parent) return "";
    return `<button class="btn-voltar" data-section="${info.parent}"><i class="fas fa-arrow-left"></i> VOLTAR</button>`;
  }

  // ===== CARREGAR CONTEÚDO =====
  function loadContent(section) {
    section = section || "home";
    let content = contentMap[section] || contentMap.home;
    const breadcrumb = buildBreadcrumb(section);
    const backBtn = buildBackButton(section);

    let headerHtml = "";
    if (breadcrumb) {
      headerHtml = `
                <div class="page-header">
                    ${breadcrumb}
                    ${backBtn}
                </div>
            `;
    }
    main.innerHTML = headerHtml + content;
    window.location.hash = section;
    highlightActiveLink(section);

    // Eventos do botão voltar
    const backBtnElement = main.querySelector(".btn-voltar");
    if (backBtnElement) {
      backBtnElement.addEventListener("click", function (e) {
        const parentSection = this.dataset.section;
        if (parentSection) {
          e.preventDefault();
          loadContent(parentSection);
          closeMobileMenu();
          closeAllDropdowns();
        }
      });
    }

    // Eventos dos links do breadcrumb
    main.querySelectorAll(".breadcrumb a").forEach((link) => {
      link.addEventListener("click", function (e) {
        const section = this.dataset.section;
        if (section) {
          e.preventDefault();
          loadContent(section);
          closeMobileMenu();
          closeAllDropdowns();
        }
      });
    });
  }

  // ===== DESTAQUE DO LINK ATIVO =====
  function highlightActiveLink(section) {
    document
      .querySelectorAll(".nav__link, .dropdown__group ul li a, .header__link")
      .forEach((link) => link.classList.remove("active"));
    if (!section || section === "home") return;
    document
      .querySelectorAll(".nav__link, .dropdown__group ul li a, .header__link")
      .forEach((link) => {
        if (link.dataset.section === section) link.classList.add("active");
      });
  }

  // ===== NAVEGAÇÃO =====
  function navigate(e) {
    const target = e.currentTarget;
    const section = target.dataset.section;
    if (target.id === "logo-link" || section === "home") {
      e.preventDefault();
      loadContent("home");
      closeMobileMenu();
      return;
    }
    if (section) {
      e.preventDefault();
      loadContent(section);
      closeMobileMenu();
      closeAllDropdowns();
    }
  }

  // ===== MENU MOBILE =====
  function toggleMobileMenu(e) {
    e.stopPropagation();
    const left = document.querySelector(".header__left");
    const right = document.querySelector(".header__right");
    left.classList.toggle("open");
    right.classList.toggle("open");
    if (left.classList.contains("open")) closeAllDropdowns();
  }
  function closeMobileMenu() {
    document.querySelector(".header__left")?.classList.remove("open");
    document.querySelector(".header__right")?.classList.remove("open");
  }

  // ===== DROPDOWN MOBILE =====
  function toggleDropdown(e) {
    const parent = e.currentTarget.closest(".nav__item--has-dropdown");
    if (!parent) return;
    e.preventDefault();
    document
      .querySelectorAll(".nav__item--has-dropdown.open")
      .forEach((item) => {
        if (item !== parent) item.classList.remove("open");
      });
    parent.classList.toggle("open");
  }
  function closeAllDropdowns() {
    document
      .querySelectorAll(".nav__item--has-dropdown.open")
      .forEach((item) => item.classList.remove("open"));
  }

  // ===== INICIALIZAÇÃO =====
function pesquisar() {

    if (!searchInput) return;

    const texto = searchInput.value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (texto === "") return;

    // Procura em TODO o conteúdo do site
    for (const pagina in contentMap) {

        const conteudo = contentMap[pagina]
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (
            conteudo.includes(texto) ||
            pagina.includes(texto)
        ) {
            loadContent(pagina);
            searchInput.value = "";
            return;
        }
    }

    // Palavras-chave
    const atalhos = {
        clube: "clube",
        historia: "historia",
        titulos: "titulos",
        identidade: "identidade",
        diretoria: "diretoria",
        presidente: "diretoria",
        vice: "diretoria",
        contato: "contato",
        contatos: "contatos",
        telefone: "contatos",
        email: "contatos",
        ouvidoria: "ouvidoria",
        futebol: "futebol",
        futsal: "modalidades",
        modalidades: "modalidades",
        ingresso: "ingressos",
        ingressos: "ingressos",
        plano: "ingressos",
        planos: "ingressos",
        transparencia: "transparencia",
        negocios: "negocios",
        patrocinio: "negocios",
        imprensa: "imprensa",
        noticia: "noticias",
        noticias: "noticias",
        jogo: "proximos-jogos",
        jogos: "proximos-jogos",
        proximo: "proximos-jogos"
    };

    for (const palavra in atalhos) {
        if (texto.includes(palavra)) {
            loadContent(atalhos[palavra]);
            searchInput.value = "";
            return;
        }
    }

    alert("Nenhum resultado encontrado.");
}
  function init() {
    const hash = window.location.hash.replace("#", "");
    loadContent(hash || "home");

    navLinks.forEach((link) => link.addEventListener("click", navigate));
    
    // Vincula os eventos apenas se os seletores da busca existirem no DOM
    if (searchBtn && searchInput) {
      searchBtn.addEventListener("click", pesquisar);
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          pesquisar();
        }
      });
    }

    if (hamburger) {
      hamburger.addEventListener("click", toggleMobileMenu);
    }
    
    dropdownToggles.forEach((toggle) =>
      toggle.addEventListener("click", toggleDropdown)
    );

    document.addEventListener("click", function (e) {
      if (
        !e.target.closest(".header") &&
        (document.querySelector(".header__left.open") ||
          document.querySelector(".header__right.open"))
      ) {
        closeMobileMenu();
      }
    });

    window.addEventListener("hashchange", function () {
      const newHash = window.location.hash.replace("#", "");
      if (contentMap[newHash]) loadContent(newHash);
      else loadContent("home");
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();

```

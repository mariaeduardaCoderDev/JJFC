(function () {
  "use strict";

  // ===== 1. ELEMENTOS DO DOM =====
  const main = document.getElementById("main");
  const hamburger = document.getElementById("hamburger");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  
  // Seleciona as listas de navegação para o menu mobile
  const navLeft = document.querySelector(".nav-left");
  const navRight = document.querySelector(".nav-right");
  const searchContainer = document.querySelector(".header__search");

  // Links que mudam de página
  const navLinks = document.querySelectorAll(
    ".nav__link, .dropdown__group ul li a, #logo-link, .header__link"
  );
  
  // Itens que possuem subfaturamento (dropdown)
  const dropdownToggles = document.querySelectorAll(
    ".nav__item--has-dropdown > .nav__link"
  );

  // ===== 2. MAPEAMENTO PARA BREADCRUMB E BUSCA =====
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

  // ===== 3. CONTEÚDO HTML DAS PÁGINAS (adicione mais templates aqui) =====
  const pages = {
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
    historia: `<div class="page-section"><h1>Nossa História</h1><p>Em breve, a trajetória completa do José Justi FC...</p></div>`,
    titulos: `<div class="page-section"><h1>Galeria de Títulos</h1><p>Nossas conquistas e troféus marcantes.</p></div>`,
  };

  // ===== 4. FUNÇÃO DE RENDERIZAÇÃO DAS PÁGINAS =====
  function carregarPagina(idPagina) {
    if (!main) return;

    if (!idPagina || idPagina === "logo-link") {
      idPagina = "home";
    }

    if (pages[idPagina]) {
      main.innerHTML = pages[idPagina];
    } else {
      const label = sectionInfo[idPagina] ? sectionInfo[idPagina].label : idPagina.toUpperCase();
      main.innerHTML = `
        <div class="page-section" style="padding: 50px 20px; text-align: center;">
          <h1>${label}</h1>
          <p style="color: #bbb;">O conteúdo desta seção está sendo preparado.</p>
        </div>
      `;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ===== 5. INTERCEPTAR CLIQUES NOS LINKS (NAVEGAÇÃO) =====
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const secao = this.getAttribute("data-section") || this.id;
      
      // Se for um link que apenas abre dropdown, não muda de página
      if (this.parentNode.classList.contains("nav__item--has-dropdown") && e.target === this) {
        return; 
      }

      if (secao) {
        e.preventDefault();
        carregarPagina(secao);
        fecharMenuMobile();
      }
    });
  });

  // ===== 6. LÓGICA DO MENU HAMBÚRGUER (MOBILE) =====
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      if (navLeft) navLeft.classList.toggle("active");
      if (navRight) navRight.classList.toggle("active");
      if (searchContainer) searchContainer.classList.toggle("active");
    });
  }

  function fecharMenuMobile() {
    if (hamburger && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      if (navLeft) navLeft.classList.remove("active");
      if (navRight) navRight.classList.remove("active");
      if (searchContainer) searchContainer.classList.remove("active");
    }
  }

  // ===== 7. CONTROLAR DROPDOWNS (CLIQUE NO MOBILE / HOVER NO DESKTOP) =====
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      // Executa apenas se a tela for menor/igual a 992px (comportamento mobile)
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown) {
          dropdown.classList.toggle("active");
          const seta = this.querySelector(".nav__arrow");
          if (seta) seta.classList.toggle("fa-chevron-up");
        }
      }
    });
  });

  // ===== 8. LÓGICA DO SISTEMA DE BUSCA =====
  function executarBusca() {
    const termoBusca = searchInput.value.trim().toLowerCase();

    if (termoBusca === "") {
      alert("Por favor, digite um termo para buscar.");
      return;
    }

    let secaoEncontrada = null;

    for (const [id, info] of Object.entries(sectionInfo)) {
      const label = info.label.toLowerCase();
      if (id.includes(termoBusca) || label.includes(termoBusca)) {
        secaoEncontrada = id;
        break;
      }
    }

    if (secaoEncontrada) {
      carregarPagina(secaoEncontrada);
      searchInput.value = "";
      searchInput.blur();
      fecharMenuMobile(); // Fecha o menu caso a busca tenha sido feita pelo celular
    } else {
      alert("Nenhum conteúdo correspondente foi encontrado.");
    }
  }

  if (searchBtn) searchBtn.addEventListener("click", executarBusca);
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") executarBusca();
    });
  }

  // ===== 9. INICIALIZAÇÃO =====
  // Carrega a Home automaticamente ao abrir o site
  carregarPagina("home");

})();

document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('open-sidebar-button');
  const closeButton = document.getElementById('close-sidebar-button');
  const navbar = document.getElementById('navbar');
  const overlay = document.getElementById('overlay');
  const navLinks = navbar.querySelectorAll('a');
  const sendButton = document.getElementById('send-button');

  // Event listeners
  openButton.addEventListener('click', openSidebar);
  closeButton.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  sendButton.addEventListener('click', clearTextareas);

  const media = window.matchMedia("(max-width: 700px)");

  function updateNavbar(e) {
    const isMobile = e.matches;
    if (isMobile) {
      navbar.setAttribute('inert', '');
      openButton.style.display = 'block';
      closeButton.style.display = 'none';
      openButton.setAttribute('aria-expanded', 'false');
    } else {
      navbar.classList.remove('show');
      navbar.removeAttribute('inert');
      openButton.setAttribute('aria-expanded', 'false');
      overlay.style.display = 'none';
      openButton.style.display = 'none';
      closeButton.style.display = 'none';
    }
  }

  function openSidebar() {
    navbar.classList.add('show');
    navbar.removeAttribute('inert');
    openButton.setAttribute('aria-expanded', 'true');
    overlay.style.display = 'block';
    openButton.style.display = 'none';
    closeButton.style.display = 'block';
  }

  function closeSidebar() {
    navbar.classList.remove('show');
    navbar.setAttribute('inert', '');
    openButton.setAttribute('aria-expanded', 'false');
    overlay.style.display = 'none';
    openButton.style.display = 'block';
    closeButton.style.display = 'none';
  }

  // Close navbar on nav link click (mobile only)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (media.matches) closeSidebar();
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && media.matches) {
      closeSidebar();
    }
  });

  media.addEventListener('change', updateNavbar);
  updateNavbar(media);
});
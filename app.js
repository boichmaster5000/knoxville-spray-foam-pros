(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('header nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.textContent = open ? '✕' : '☰';
      });
    }

    var faqs = document.querySelectorAll('.faq-question');
    faqs.forEach(function (q) {
      q.addEventListener('click', function () {
        var expanded = q.getAttribute('aria-expanded') === 'true';
        q.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        var answer = q.nextElementSibling;
        if (answer) answer.setAttribute('aria-hidden', expanded ? 'true' : 'false');
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href.length > 1) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  });
})();

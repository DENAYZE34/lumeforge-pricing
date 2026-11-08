const FOOTER_LINKS = [
  { label: "Центр поддержки", href: "#" },
  { label: "Политика конфиденциальности", href: "#" },
  { label: "Условия использования", href: "#" },
  { label: "Сообщить об уязвимости", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Lumeforge. Все права защищены.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-white/70">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

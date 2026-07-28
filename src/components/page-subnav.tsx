import Link from "next/link";

type PageSubnavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export function PageSubnav({
  items,
  current,
}: {
  items: PageSubnavItem[];
  current: string;
}) {
  return (
    <nav className="page-subnav" aria-label="Section navigation">
      {items.map((item) => {
        const className = item.label === current ? "is-current" : undefined;

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={className}
            aria-current={item.label === current ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

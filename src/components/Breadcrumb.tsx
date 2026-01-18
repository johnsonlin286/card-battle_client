import Link from "next/link"

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ul className="flex items-center gap-2">
      {items.map((item, index) => (
        <li key={index} className="text-sm text-gray-500 after:content-['/'] after:text-gray-500 after:mx-2 last:after:content-['']">
          {item.href ? (
            <Link href={item.href} className="underline hover:text-blue-500">
              {item.label}
            </Link>
          ) : (
            <strong>{item.label}</strong>
          )}
        </li>
      ))}
    </ul>
  )
}
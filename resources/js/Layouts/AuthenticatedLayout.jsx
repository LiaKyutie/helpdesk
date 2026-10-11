import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import FlashMessage from '@/Components/FlashMessage';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const link = (href, label, active) => (
        <Link
            href={href}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
                active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            {label}
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard')} className="mr-4 text-lg font-bold text-indigo-600">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-1 sm:flex">
                            {link(route('dashboard'), 'Dashboard', route().current('dashboard'))}
                            {link(route('tickets.index'), 'Tickets', route().current('tickets.*'))}
                        </div>
                    </div>

                    <div className="hidden items-center gap-3 sm:flex">
                        <Link
                            href={route('tickets.create')}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            New Ticket
                        </Link>
                        <Link href={route('profile.edit')} className="text-sm text-gray-700 hover:underline">
                            {auth.user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Logout
                        </Link>
                    </div>

                    <button
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>

                {open && (
                    <div className="space-y-1 border-t border-gray-200 px-4 py-3 sm:hidden">
                        <p className="px-3 pb-2 text-sm font-medium text-gray-700">{auth.user.name}</p>
                        {link(route('dashboard'), 'Dashboard', route().current('dashboard'))}
                        {link(route('tickets.index'), 'Tickets', route().current('tickets.*'))}
                        {link(route('tickets.create'), '+ New Ticket', route().current('tickets.create'))}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="px-4 py-6 sm:px-6 lg:px-8">
                <FlashMessage />
                <div className="mx-auto max-w-7xl">{children}</div>
            </main>
        </div>
    );
}
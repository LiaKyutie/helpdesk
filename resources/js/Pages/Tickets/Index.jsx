import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const input = 'rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

const cleanLabel = (label) => label.replace('&laquo;', '«').replace('&raquo;', '»');

export default function Index({ tickets, filters, options }) {
    const [values, setValues] = useState({
        search: filters.search ?? '',
        status: filters.status ?? '',
        priority: filters.priority ?? '',
    });

    const apply = (next) => {
        setValues(next);
        router.get(route('tickets.index'), next, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">My Tickets</h1>
                    <span className="text-sm text-gray-500">{tickets.total} total</span>
                </div>
            }
        >
            <Head title="Tickets" />

            <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <input
                    className={input}
                    placeholder="Search title…"
                    value={values.search}
                    onChange={(e) => apply({ ...values, search: e.target.value })}
                />
                <select className={input} value={values.status} onChange={(e) => apply({ ...values, status: e.target.value })}>
                    <option value="">All statuses</option>
                    {options.statuses.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
                <select className={input} value={values.priority} onChange={(e) => apply({ ...values, priority: e.target.value })}>
                    <option value="">All priorities</option>
                    {options.priorities.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
            </div>

            {tickets.data.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                    <p className="text-lg font-medium text-gray-900">No tickets yet</p>
                    <p className="mt-1 text-sm text-gray-500">Create your first ticket to get started.</p>
                    <Link
                        href={route('tickets.create')}
                        className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        New Ticket
                    </Link>
                </div>
            ) : (
                <>
                    <div className="hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="max-w-xs truncate px-4 py-3">
                                            <Link href={route('tickets.show', t.id)} className="font-medium text-indigo-600 hover:underline">
                                                {t.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><PriorityBadge value={t.priority} /></td>
                                        <td className="px-4 py-3"><StatusBadge value={t.status} /></td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {new Date(t.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <Link
                                key={t.id}
                                href={route('tickets.show', t.id)}
                                className="block rounded-lg bg-white p-4 shadow-sm"
                            >
                                <p className="break-words font-medium text-gray-900">{t.title}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {t.category} · {new Date(t.created_at).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {tickets.last_page > 1 && (
                        <nav className="mt-6 flex flex-wrap justify-center gap-1">
                            {tickets.links.map((l, i) =>
                                l.url ? (
                                    <Link
                                        key={i}
                                        href={l.url}
                                        preserveScroll
                                        className={`rounded-md px-3 py-1.5 text-sm ${
                                            l.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {cleanLabel(l.label)}
                                    </Link>
                                ) : (
                                    <span key={i} className="rounded-md px-3 py-1.5 text-sm text-gray-400">
                                        {cleanLabel(l.label)}
                                    </span>
                                )
                            )}
                        </nav>
                    )}
                </>
            )}
        </AuthenticatedLayout>
    );
}
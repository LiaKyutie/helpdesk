import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import { Head, Link } from '@inertiajs/react';

const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

export default function Dashboard({ counts, recent }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STATUSES.map((s) => (
                    <div key={s} className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-sm text-gray-500">{s}</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">{counts[s] ?? 0}</p>
                    </div>
                ))}
            </div>

            <h2 className="mb-3 mt-8 text-lg font-semibold text-gray-800">Recent tickets</h2>
            {recent.length === 0 ? (
                <p className="text-sm text-gray-500">
                    Nothing here yet.{' '}
                    <Link href={route('tickets.create')} className="text-indigo-600 hover:underline">
                        Create a ticket
                    </Link>
                </p>
            ) : (
                <ul className="divide-y divide-gray-100 rounded-lg bg-white shadow-sm">
                    {recent.map((t) => (
                        <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
                            <Link href={route('tickets.show', t.id)} className="font-medium text-indigo-600 hover:underline">
                                {t.title}
                            </Link>
                            <div className="flex gap-2">
                                <PriorityBadge value={t.priority} />
                                <StatusBadge value={t.status} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </AuthenticatedLayout>
    );
}
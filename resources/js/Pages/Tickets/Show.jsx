import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ ticket }) {
    const destroy = () => {
        if (confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h1>}>
            <Head title={ticket.title} />
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
                <h2 className="break-words text-2xl font-bold text-gray-900">{ticket.title}</h2>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PriorityBadge value={ticket.priority} />
                    <StatusBadge value={ticket.status} />
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">{ticket.category}</span>
                </div>

                <p className="mt-6 whitespace-pre-wrap break-words text-gray-700">{ticket.description}</p>

                <p className="mt-6 text-xs text-gray-500">
                    Created {new Date(ticket.created_at).toLocaleString()} · Updated{' '}
                    {new Date(ticket.updated_at).toLocaleString()}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href={route('tickets.edit', ticket.id)}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={destroy}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                    >
                        Delete
                    </button>
                    <Link href={route('tickets.index')} className="px-2 py-2 text-sm text-gray-600 hover:text-gray-900">
                        ← Back to tickets
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
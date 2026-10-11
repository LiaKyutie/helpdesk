import { Link } from '@inertiajs/react';

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1">{children}</div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

const input =
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';

export default function TicketForm({ data, setData, errors, processing, onSubmit, options, submitLabel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-5 rounded-lg bg-white p-6 shadow-sm">
            <Field label="Title" error={errors.title}>
                <input className={input} value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </Field>

            <Field label="Description" error={errors.description}>
                <textarea
                    rows={5}
                    className={input}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </Field>

            <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Priority" error={errors.priority}>
                    <select className={input} value={data.priority} onChange={(e) => setData('priority', e.target.value)}>
                        {options.priorities.map((p) => (
                            <option key={p}>{p}</option>
                        ))}
                    </select>
                </Field>
                <Field label="Status" error={errors.status}>
                    <select className={input} value={data.status} onChange={(e) => setData('status', e.target.value)}>
                        {options.statuses.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                </Field>
                <Field label="Category" error={errors.category}>
                    <select className={input} value={data.category} onChange={(e) => setData('category', e.target.value)}>
                        {options.categories.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving…' : submitLabel}
                </button>
                <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:text-gray-900">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
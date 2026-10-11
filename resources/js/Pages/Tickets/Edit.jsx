import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TicketForm from './TicketForm';

export default function Edit({ ticket, options }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tickets.update', ticket.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Edit Ticket #{ticket.id}</h1>}>
            <Head title={`Edit Ticket #${ticket.id}`} />
            <div className="mx-auto max-w-3xl">
                <TicketForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={submit}
                    options={options}
                    submitLabel="Save Changes"
                />
            </div>
        </AuthenticatedLayout>
    );
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TicketForm from './TicketForm';

export default function Create({ options }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: options.categories[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">New Ticket</h1>}>
            <Head title="New Ticket" />
            <div className="mx-auto max-w-3xl">
                <TicketForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={submit}
                    options={options}
                    submitLabel="Create Ticket"
                />
            </div>
        </AuthenticatedLayout>
    );
}
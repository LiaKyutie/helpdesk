const priorityStyles = {
    Low: 'bg-gray-100 text-gray-700 ring-gray-200',
    Medium: 'bg-blue-100 text-blue-700 ring-blue-200',
    High: 'bg-orange-100 text-orange-700 ring-orange-200',
    Urgent: 'bg-red-100 text-red-700 ring-red-200',
};

const statusStyles = {
    Open: 'bg-green-100 text-green-700 ring-green-200',
    'In Progress': 'bg-yellow-100 text-yellow-800 ring-yellow-200',
    Resolved: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
    Closed: 'bg-gray-200 text-gray-600 ring-gray-300',
};

function Pill({ className, children }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
            {children}
        </span>
    );
}

export function PriorityBadge({ value }) {
    return <Pill className={priorityStyles[value] ?? priorityStyles.Low}>{value}</Pill>;
}

export function StatusBadge({ value }) {
    return <Pill className={statusStyles[value] ?? statusStyles.Closed}>{value}</Pill>;
}
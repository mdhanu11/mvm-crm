export const getTicketPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
        case 'high': return 'text-red-600 bg-red-50 border-red-200';
        case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
        case 'low': return 'text-green-600 bg-green-50 border-green-200';
        case 'critical': return 'text-red-900 bg-red-200 border-red-500';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};

export const getTicketStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'open': return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'in_progress': return 'text-purple-600 bg-purple-50 border-purple-200';
        case 'closed': return 'text-green-600 bg-green-50 border-green-200';
        case 'on_hold': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};
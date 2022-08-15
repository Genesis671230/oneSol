export default {
    name: 'job',
    title: 'Job',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Job Title',
            type: 'string',
            description: 'Enter job tile',
        },
        {
            name: 'price',
            title: 'price',
            type: 'number',
            description: 'Enter the project cost in number',
        },
        {
            name: 'postedBy',
            title: 'Client',
            type: 'string',
            description: 'wallet address of the client',
        },
        {
            name: 'deadline',
            title: 'Deadline',
            type: 'date',
            description: 'deadline of the project',
            options: {
              dateFormat: 'YYYY-MM-DD',
              calendarTodayLabel: 'Today'
            }
        },
        {
            name: 'hired_freelancer',
            title: 'Hired Freelancer',
            type: 'string',
        },
    ],
}
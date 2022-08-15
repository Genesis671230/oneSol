export default {
    name: 'clients',
    title: 'Clients',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'name',
            type: 'string',
        },
        {
            name: 'walletAddress',
            title: 'Wallet Address',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Profile image',
            type: 'image',
            options:{
                hotspot:true
            }
        },
        {
            name: 'postedJobs',
            title: 'Posted Jobs',
            type: 'reference',
            to:[{type:'job'}]
        },
    ],
}
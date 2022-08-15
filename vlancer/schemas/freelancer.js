export default {
    name: 'freelancer',
    title: 'Freelancer',
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
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            autogenerate:true,
            options:{
                source:'name',
                maxLength:96,

            },
            
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
            name: 'completedProjects',
            title: 'Completed Projects',
            type: 'reference',
            to:[{type:'job'}]
        },
    ],
}
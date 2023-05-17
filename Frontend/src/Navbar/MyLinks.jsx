export const links = [{name: 'Home', mainlink:"/home"}, 
    {name: 'Products', mainlink:"/productcategory", 
    },
    {name: 'Solutions',mainlink:"/solutioncategory", submenu:true, sublinks:[
        
        {
            Head: "Meeting and Presentation",
            sublink:[
                { name:'Boardrooms and Conference Rooms'},
                { name: 'Interactive Training Rooms'}
            ]
        },
        {
            Head: "Specialised AV Solutions",
            sublink:[
                { name:'Auditorium'},
                { name:'Operations Centres'}
                
            ]
        },
    ]},
    // {name: 'Blog',mainlink:"/"},
    {name: 'About Us',mainlink:"/aboutus"},
    {name:'Contact Us', mainlink:"/contactus"},
    // {name:'Blogs', mainlink:"/blog"},
]
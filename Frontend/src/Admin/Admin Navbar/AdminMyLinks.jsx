export const links = [{name: 'Home', mainlink:"/add-admin", submenu:true, sublinks:[
    {Head: "Home Submenu",
    sublink:[
        {name:'Add Home Video', link:'/add-home-video'},
        {name:'Add Home Description', link:'/add-home-description'},
        {name:'Add Home Achievements',link:'/add-achievements'},
        {name:'Add Home Counter', link:'/add-counter'},
        {name:'Add Navbar',link:'/add-navbar'}
    ]}
]}, 
{name: 'Add Excel', mainlink:"", submenu:true, sublinks:[
    {Head: "Excel Submenu",
    sublink:[
        {name:'Add Product Excel', link:'/add-product-excel'},
        {name:'Add Solution Excel', link:'/add-solution-excel'},
        {name:'Add Product Category Excel', link:'/add-product-category-excel'},
        {name:'Add Solution Category Excel', link:'/add-solution-category-excel'}
    ]}
]}, 
    {name: 'Add Product', mainlink:"/add-product", submenu:true, sublinks:[
    {
        Head: "Product Submenu",
        sublink:[
            {name:'Add Product Feature', link: '/add-product-feature'},
            {name:'Add Product Highlights', link: '/add-product-highlights'},
            {name:'Add Product Category',link:'/add-product-category'},
            {name:'Add Product Specifications',link:'/add-specifications'}
        ]
    }
    ]
    },
    {name: 'Add Solution',mainlink:"/add-solution", submenu:true, sublinks:[
        {
            Head: "Solution Submenu",
            sublink:[
                { name:'Add Solution Feature', link : '/add-solution-features'},
                { name:'Add Solution Benefits', link: '/add-solution-benefits'},
                { name:'Add Solution Category', link: '/add-solution-category'}
            ]
        },
       
    ]},
    {name: 'Delete All',mainlink:"/delete-products", submenu:true, sublinks:[
        {
            Head: "Delete Submenu",
            sublink:[
                { name:'Delete Solutions', link : '/delete-solutions'},
                { name:'Delete Solution Category', link: '/delete-solution-category'},
                { name:'Delete Products', link: '/delete-products'},
                { name:'Delete Product Category', link: '/delete-product-category'},
                { name:'Delete All Counters', link:'/delete-counters'},
                { name:'Delete Navbar', link: '/delete-navbar'}
            ]
        },
       
    ]},
    {name: 'Delete One',mainlink:"/delete-products", submenu:true, sublinks:[
        {
            Head: "Delete Submenu",
            sublink:[
                { name:'Delete Solution By Id', link : '/delete-solution-id'},
                { name:'Delete Solution Category By Id', link: '/delete-solution-category-id'},
                { name:'Delete Products By Id', link: '/delete-product-id'},
                { name:'Delete Product Category By Id', link: '/delete-product-category-id'},
                { name:'Delete Home Cover', link: '/delete-home-cover'},
                { name:'Delete Home Achievement', link: '/delete-home-achievement'},
                { name:'Delete Home Description', link: '/delete-home-description'},
                { name:'Delete Counter By Name', link:'/delete-counters-id'}
            ]
        },
       
    ]}

]
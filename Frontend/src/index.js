import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {useNavigate, BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom';
import Aboutus from './aboutus/Aboutus';
import Solution from './Solution/Solution';
import Home1 from './Home/MainHomePage';
import ProductPage from './ProductsPage/ProductPage';
import MultiItemCarousel1 from './ProductCategory/ProductCategory';
import Solcat from './Solcat/Solcat';
import AddSolution from './Admin/AddSolution';
import AddProduct from './Admin/AddProduct';
import AddBenefits from './Admin/AddBenefits';
import AddFeatures from './Admin/AddFeatures';
import AddSolCategory from './Admin/AddSolCategory';
import AddProductFeatures from './Admin/AddProductFeatures';
import AddProductHighlights from './Admin/AddProductHighlights';
import AddProductCategory from './Admin/AddProductCategory';
import AddHomeVideo from './Admin/AddHomeVideo';
import AddAchievements from './Admin/AddAchievements';
import AddHomeDescription from './Admin/AddHomeDescription';
import NavTrial from './Navbar/NavTrial';
import AddAdmin from './Admin/AddAdmin';
import AddProductExcel from './Admin/AddProductExcel';
import AddSolutionExcel from './Admin/AddSolutionExcel';
import Contact1 from './ContactUs/Contact1';
import Blog from './Blogs/Blog';
import BlogMain from './Blogs/BlogMain';
import DownloadBroucher from './ProductsPage/DownloadBroucher1';
import AddProductCategoryExcel from './Admin/AddProductCategoryExcel';
import AddSolutionCategoryExcel from './Admin/AddSolutionCategoryExcel';
import PopUp from './ProductsPage/PopUp';
import DeleteProducts from './Admin/DeleteProducts';
import DeleteProductCategory from './Admin/DeleteProductCategory';
import DeleteSolutions from './Admin/DeleteSolutions';
import DeleteSolutionCategory from './Admin/DeleteSolutionCategory';
import DeleteHomeAchievement from './Admin/DeleteHomeAchievement';
import DeleteHomeDescription from './Admin/DeleteHomeDescription';
import DeleteHomeCover from './Admin/DeleteHomeCover';
import DeleteProductCatById from './Admin/DeleteProductCatById';
import DeleteProductById from './Admin/DeleteProductById';
import DeleteSolCatById from './Admin/DeleteSolCatById';
import DeleteSolutionById from './Admin/DeleteSolutionById';
import AddCounter from './Admin/AddCounter';
import DeleteAllCounters from './Admin/DeleteAllCounters';
import DeleteCounterById from './Admin/DeleteCounterById';
import AddSpecification from './Admin/AddSpecification';
import AdminLogin from './Admin/AdminLogin';
import AddNavbar from './Admin/AddNavbar';
import DeleteNavbar from './Admin/DeleteNavbar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  {/* <React.StrictMode>
    <App />
  </React.StrictMode> */}
  <HashRouter>
  <Routes>
    <Route path = '/' element = {<Home1/>}/>
    <Route path = '/add-admin' element = {<AddAdmin/>}/>
    <Route path = '/aboutus' element = {<Aboutus/>}/>
    <Route path = '/solution/:category/:link' element = {<Solution/>}/>
    {/* <Route path = '/solution' element = {<Solution/>}/> */}
    <Route path = '/solutioncategory' element = {<Solcat/>}/>
    <Route path = '/product' element = {<ProductPage/>}/>
    <Route path = '/home' element = {<Home1/>}/>
    <Route path = '/contactus' element = {<Contact1/>}/>
    <Route path = '/admin' element = {<AdminLogin/>}/>
    <Route path = 'add-counter' element = {<AddCounter/>}/>
    <Route path = '/add-navbar' element = {<AddNavbar/>}/>
    <Route path = '/add-counter' element = {<AddCounter/>}/>
    <Route path = '/add-solution' element = {<AddSolution/>}/>
    <Route path = '/add-product' element = {<AddProduct/>}/>
    <Route path = '/add-specifications' element = {<AddSpecification/>}/>
    <Route path = '/add-solution-benefits' element = {<AddBenefits/>}/>
    <Route path = '/add-solution-features' element = {<AddFeatures/>}/>
    <Route path = '/add-solution-category' element = {<AddSolCategory/>}/>
    <Route path = '/add-product-feature' element = {<AddProductFeatures/>}/>
    <Route path = '/add-product-highlights' element = {<AddProductHighlights/>}/>
    <Route path = '/add-product-category' element = {<AddProductCategory/>}/>
    <Route path = '/add-home-video' element = {<AddHomeVideo/>}/>
    <Route path = '/add-achievements' element = {<AddAchievements/>}/>
    <Route path = '/add-home-description' element = {<AddHomeDescription/>}/>
    <Route path = '/add-product-excel' element = {<AddProductExcel/>}/>
    <Route path = '/add-product-category-excel' element = {<AddProductCategoryExcel/>}/>
    <Route path = '/add-solution-category-excel' element = {<AddSolutionCategoryExcel/>}/>
    <Route path = '/add-solution-excel' element = {<AddSolutionExcel/>}/>
    <Route path = '/productcategory' element = {<MultiItemCarousel1/>}/>
    <Route path = '/delete-products' element = {<DeleteProducts/>}/>
    <Route path = '/delete-product-id' element = {<DeleteProductById/>}/>
    <Route path = '/delete-product-category' element = {<DeleteProductCategory/>}/>
    <Route path = '/delete-product-category-id' element = {<DeleteProductCatById/>}/>
    <Route path = '/delete-solution-category-id' element = {<DeleteSolCatById/>}/>
    <Route path = '/delete-solution-id' element = {<DeleteSolutionById/>}/>
    <Route path = '/delete-solutions' element = {<DeleteSolutions/>}/>
    <Route path = '/delete-solution-category' element = {<DeleteSolutionCategory/>}/>
    <Route path = '/delete-home-achievement' element = {<DeleteHomeAchievement/>}/>
    <Route path = '/delete-home-description' element = {<DeleteHomeDescription/>}/>
    <Route path = '/delete-home-cover' element = {<DeleteHomeCover/>}/>
    <Route path = '/delete-counters' element = {<DeleteAllCounters/>}/>
    <Route path = '/delete-counters-id' element = {<DeleteCounterById/>}/>
    <Route path = '/delete-navbar' element = {<DeleteNavbar/>}/>
    <Route path = '/trial' element = {<NavTrial/>}/>
    <Route path = '/blog' element = {<Blog/>}/>
    <Route path = '/blog-main' element = {<BlogMain/>}/>
    <Route path = '/popup' element = {<PopUp/>}/>
  </Routes>
  </HashRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

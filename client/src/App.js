import { Route, Routes } from 'react-router-dom';
import { Layout } from './Components/Layout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { AddPostPage } from './Pages/AddPostPage';
import { EditPostPage } from './Pages/EditPostPage';
import { LoginPage } from './Pages/LoginPage';
import { MainPage } from './Pages/MainPage';
import { PostPage } from './Pages/PostPage';
import { PostsPage } from './Pages/PostsPage';
import { RegisterPage } from './Pages/RegisterPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './Redux/Features/auth/authSlice';

function App() {
   const dispatch=useDispatch()

   useEffect(()=>{
      dispatch(getMe())
   })

   return (
   <Layout>
      <Routes>
         <Route path='/' element={<MainPage />} />
         <Route path='posts' element={<PostsPage />} />
         <Route path=':id' element={<PostPage />} />
         <Route path=':id/edit' element={<EditPostPage />} />
         <Route path='new' element={<AddPostPage />} />
         <Route path='login' element={<LoginPage />} />
         <Route path='register' element={<RegisterPage />} />
      </Routes>
      <ToastContainer position='bottom-right'/>
   </Layout>
   );
}

export default App;

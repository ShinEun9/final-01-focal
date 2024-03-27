import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from 'routes';
import {
  WelcomePage,
  LoginPage,
  SignUpPage,
  HomePage,
  SearchPage,
  MyProfilePage,
  ChatListPage,
  ChatRoomPage,
  PostPage,
  UserProfilePage,
  FollowersPage,
  FollowingsPage,
  NotFoundPage,
  PostUploadPage,
  PostEditPage,
  ProductUploadPage,
  ProductEditPage,
  ProfileEditPage,
  SplashPage,
} from 'pages';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
        <Route element={<PublicRoute />}>
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/post/" element={<Outlet />}>
            <Route path=":post_id" element={<PostPage />} />
            <Route path="upload" element={<PostUploadPage />} />
            <Route path=":post_id/edit" element={<PostEditPage />} />
          </Route>
          <Route path="/profile/" element={<Outlet />}>
            <Route path="" element={<MyProfilePage />} />
            <Route path=":account_name" element={<UserProfilePage />} />
            <Route path="edit" element={<ProfileEditPage />} />
          </Route>
          <Route path="/follow/:account_name" element={<Outlet />}>
            <Route path="follower" element={<FollowersPage />} />
            <Route path="following" element={<FollowingsPage />} />
          </Route>
          <Route path="/product/" element={<Outlet />}>
            <Route path="" element={<ProductUploadPage />} />
            <Route
              path="/product/:product_id/edit"
              element={<ProductEditPage />}
            />
          </Route>
          <Route path="/chat/" element={<Outlet />}>
            <Route path="" element={<ChatListPage />} />
            <Route path=":_id" element={<ChatRoomPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>

        {/* <Route path="/splash" element={<SplashPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import ViewPostPage from "./components/Pages/ViewPostPage";
import { Toaster } from "@/components/ui/sonner";
import NotFoundPage from "./components/Pages/NotFoundPage";
import SignUpPage from "./components/Pages/SignUpPage";
import LoginPage from "./components/Pages/LoginPage";
import SignUpSuccessPage from "./components/Pages/SignUpSuccessPage";
import ProfilePage from "./components/Pages/ProfilePage";
import ResetPasswordPage from "./components/Pages/ResetPasswordPage";
import AdminArticleManagementPage from "./components/admin/AdminArticlePage";
import AdminLogin from "./components/admin/AdminLoginPage";
import AdminCategoryManagementPage from "./components/admin/AdminCategoryPage";
import AdminProfilePage from "./components/admin/AdminProfilePage";
import AdminResetPasswordPage from "./components/admin/AdminResetPasswordPage";
import AdminCreateArticlePage from "./components/admin/AdminCreateArticle";
import AdminNotificationPage from "./components/admin/AdminNotificationPage";
import AdminCreateCategoryPage from "./components/admin/AdminCreateCategory";
import AdminEditCategoryPage from "./components/admin/AdminEditCategoryPage";
import AdminEditArticlePage from "./components/admin/AdminEditArticlePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-up/success" element={<SignUpSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* Admin Section */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/article-management"
            element={<AdminArticleManagementPage />}
          />
          <Route
            path="/admin/article-management/create"
            element={<AdminCreateArticlePage />}
          />
          <Route
            path="/admin/article-management/edit/:postId"
            element={<AdminEditArticlePage />}
          />
          <Route
            path="/admin/category-management"
            element={<AdminCategoryManagementPage />}
          />
          <Route
            path="/admin/category-management/create"
            element={<AdminCreateCategoryPage />}
          />
          <Route
            path="/admin/category-management/edit/:categoryId"
            element={<AdminEditCategoryPage />}
          />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route
            path="/admin/notification"
            element={<AdminNotificationPage />}
          />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPasswordPage />}
          />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          unstyled: true,
        }}
      />
    </div>
  );
}

export default App;

import { lazy, Suspense } from 'react'
import ScrollToTop from './Components/ScrollToTop'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import AdminRoute from './Components/AdminPanel/AdminRoute'
import { Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom'
import { isDevToBlogId } from './utils/blogUrls'

const Home = lazy(() => import('./Components/Home/Home'))
const Services = lazy(() => import('./Components/Services/Services'))
const Vision = lazy(() => import('./Components/Vision/Vision'))
const AboutUs = lazy(() => import('./Components/AboutUs/AboutUs'))
const Contact = lazy(() => import('./Components/Contact/Contact'))
const Login = lazy(() => import('./Components/Login/Login'))
const ForgotPassword = lazy(() => import('./Components/Login/ForgotPassword'))
const ResetPassword = lazy(() => import('./Components/Login/ResetPassword'))
const Blog = lazy(() => import('./Components/Blog/Blog'))
const BlogDetail = lazy(() => import('./Components/Blog/BlogDetail'))
const AdminPanel = lazy(() => import('./Components/AdminPanel/AdminPanel'))
const BlogApproval = lazy(() => import('./Components/AdminPanel/BlogApproval/BlogApproval'))
const AdminBlogDetail = lazy(() => import('./Components/AdminPanel/BlogApproval/AdminBlogDetail'))
const AdminCustomBlogDetail = lazy(() => import('./Components/AdminPanel/BlogApproval/AdminCustomBlogDetail'))
const Cloud = lazy(() => import('./Components/Services-Dropdown/Cloud/Cloud'))
const CloudDesign = lazy(() => import('./Components/Services-Dropdown/Cloud/CloudDesign/CloudDesign'))
const CloudMigration = lazy(() => import('./Components/Services-Dropdown/Cloud/CloudMigration/CloudMigration'))
const CloudSecurity = lazy(() => import('./Components/Services-Dropdown/Cloud/CloudSecurity/CloudSecurity'))
const Consulting = lazy(() => import('./Components/Services-Dropdown/Consulting/Consulting'))
const CyberSecurity = lazy(() => import('./Components/Services-Dropdown/CyberSecurity/CyberSecurity'))
const Enterprise = lazy(() => import('./Components/Services-Dropdown/Enterprise-Solutions/Enterprise'))
const ITServices = lazy(() => import('./Components/Services-Dropdown/IT-Services/ITServices'))
const Network = lazy(() => import('./Components/Services-Dropdown/Network-Solutions/Network'))
const NetworkDesign = lazy(() => import('./Components/Services-Dropdown/Network-Solutions/NetworkDesign/NetworkDesign'))
const NetworkSecurity = lazy(() => import('./Components/Services-Dropdown/Network-Solutions/NetworkSecurity/NetworkSecurity'))
const NetworkSupport = lazy(() => import('./Components/Services-Dropdown/Network-Solutions/NetworkSupport/NetworkSupport'))
const WebDevelopment = lazy(() => import('./Components/Services-Dropdown/WebDevelopment/WebDevelopment'))
const SecurityAssessment = lazy(() => import('./Components/Services-Dropdown/CyberSecurity/SecurityAssessment/SecurityAssessment'))
const Careers = lazy(() => import('./Components/Careers/Careers'))
const ApplyJob = lazy(() => import('./Components/Careers/ApplyJob/ApplyJob'))
const JobDetail = lazy(() => import('./Components/Careers/JobDetail/JobDetail'))
const NotFound = lazy(() => import('./Components/NotFound/NotFound'))

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#130d24' }}>
    <div style={{ width: 40, height: 40, border: '3px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </div>
)

const CustomBlogRedirect = () => {
  const { slug } = useParams()
  return <Navigate to={`/${slug}`} replace />
}

const LegacyBlogSlugRedirect = () => {
  const { id } = useParams()
  if (isDevToBlogId(id)) {
    return <BlogDetail />
  }
  return <Navigate to={`/${id}`} replace />
}

function App() {
  const location = useLocation()
  const isHideLayout = ['/signup', '/login', '/forgot-password'].includes(location.pathname) || location.pathname.startsWith('/admin') || location.pathname.startsWith('/reset-password')

  return (
    <>
      {!isHideLayout && <Header />}
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/cloud" element={<Cloud />} />
          <Route path="/services/cloud/design" element={<CloudDesign />} />
          <Route path="/services/cloud/migration" element={<CloudMigration />} />
          <Route path="/services/cloud/security" element={<CloudSecurity />} />
          <Route path="/services/cyber-security" element={<CyberSecurity />} />
          <Route path="/services/cyber-security/assessment" element={<SecurityAssessment />} />
          <Route path="/services/consulting" element={<Consulting />} />
          <Route path="/services/enterprise-solutions" element={<Enterprise />} />
          <Route path="/services/it-services" element={<ITServices />} />
          <Route path="/services/network-solutions" element={<Network />} />
          <Route path="/services/network-solutions/design" element={<NetworkDesign />} />
          <Route path="/services/network-solutions/security" element={<NetworkSecurity />} />
          <Route path="/services/network-solutions/support" element={<NetworkSupport />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/vision-mission" element={<Vision />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />
          <Route path="/apply" element={<ApplyJob />} />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<LegacyBlogSlugRedirect />} />
          <Route path="/custom-blog/:slug" element={<CustomBlogRedirect />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <AdminRoute>
                <BlogApproval />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/blog/:id"
            element={
              <AdminRoute>
                <AdminBlogDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/custom-blog/:id"
            element={
              <AdminRoute>
                <AdminCustomBlogDetail />
              </AdminRoute>
            }
          />
          <Route path="/:slug" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isHideLayout && <Footer />}
    </>
  )
}

export default App

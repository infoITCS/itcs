import { Suspense } from 'react'
import ScrollToTop from './Components/ScrollToTop'
import RouteErrorBoundary from './Components/RouteErrorBoundary'
import { lazyWithRetry } from './utils/lazyWithRetry'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import AdminRoute from './Components/AdminPanel/AdminRoute'
import { Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom'
import { isDevToBlogId } from './utils/blogUrls'

const Home = lazyWithRetry(() => import('./Components/Home/Home'))
const Services = lazyWithRetry(() => import('./Components/Services/Services'))
const Vision = lazyWithRetry(() => import('./Components/Vision/Vision'))
const AboutUs = lazyWithRetry(() => import('./Components/AboutUs/AboutUs'))
const Contact = lazyWithRetry(() => import('./Components/Contact/Contact'))
const Login = lazyWithRetry(() => import('./Components/Login/Login'))
const ForgotPassword = lazyWithRetry(() => import('./Components/Login/ForgotPassword'))
const ResetPassword = lazyWithRetry(() => import('./Components/Login/ResetPassword'))
const Blog = lazyWithRetry(() => import('./Components/Blog/Blog'))
const BlogDetail = lazyWithRetry(() => import('./Components/Blog/BlogDetail'))
const AdminPanel = lazyWithRetry(() => import('./Components/AdminPanel/AdminPanel'))
const BlogApproval = lazyWithRetry(() => import('./Components/AdminPanel/BlogApproval/BlogApproval'))
const AdminBlogDetail = lazyWithRetry(() => import('./Components/AdminPanel/BlogApproval/AdminBlogDetail'))
const AdminCustomBlogDetail = lazyWithRetry(() => import('./Components/AdminPanel/BlogApproval/AdminCustomBlogDetail'))
const Cloud = lazyWithRetry(() => import('./Components/Services-Dropdown/Cloud/Cloud'))
const CloudDesign = lazyWithRetry(() => import('./Components/Services-Dropdown/Cloud/CloudDesign/CloudDesign'))
const CloudMigration = lazyWithRetry(() => import('./Components/Services-Dropdown/Cloud/CloudMigration/CloudMigration'))
const CloudSecurity = lazyWithRetry(() => import('./Components/Services-Dropdown/Cloud/CloudSecurity/CloudSecurity'))
const Consulting = lazyWithRetry(() => import('./Components/Services-Dropdown/Consulting/Consulting'))
const CyberSecurity = lazyWithRetry(() => import('./Components/Services-Dropdown/CyberSecurity/CyberSecurity'))
const Enterprise = lazyWithRetry(() => import('./Components/Services-Dropdown/Enterprise-Solutions/Enterprise'))
const ITServices = lazyWithRetry(() => import('./Components/Services-Dropdown/IT-Services/ITServices'))
const Network = lazyWithRetry(() => import('./Components/Services-Dropdown/Network-Solutions/Network'))
const NetworkDesign = lazyWithRetry(() => import('./Components/Services-Dropdown/Network-Solutions/NetworkDesign/NetworkDesign'))
const NetworkSecurity = lazyWithRetry(() => import('./Components/Services-Dropdown/Network-Solutions/NetworkSecurity/NetworkSecurity'))
const NetworkSupport = lazyWithRetry(() => import('./Components/Services-Dropdown/Network-Solutions/NetworkSupport/NetworkSupport'))
const WebDevelopment = lazyWithRetry(() => import('./Components/Services-Dropdown/WebDevelopment/WebDevelopment'))
const SecurityAssessment = lazyWithRetry(() => import('./Components/Services-Dropdown/CyberSecurity/SecurityAssessment/SecurityAssessment'))
const Careers = lazyWithRetry(() => import('./Components/Careers/Careers'))
const ApplyJob = lazyWithRetry(() => import('./Components/Careers/ApplyJob/ApplyJob'))
const JobDetail = lazyWithRetry(() => import('./Components/Careers/JobDetail/JobDetail'))
const NotFound = lazyWithRetry(() => import('./Components/NotFound/NotFound'))

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', paddingTop: '120px' }}>
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
      <RouteErrorBoundary key={location.pathname}>
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
      </RouteErrorBoundary>
      {!isHideLayout && <Footer />}
    </>
  )
}

export default App

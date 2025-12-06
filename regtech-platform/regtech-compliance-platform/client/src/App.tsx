import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ResourceErrorBoundary } from "./components/ResourceErrorBoundary";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Loader2 } from "lucide-react";

// Eager load critical pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// Lazy load heavy pages
const Home = lazy(() => import("./pages/Home"));
const RegAdvisor = lazy(() => import("./pages/RegAdvisor"));
const RegDrafter = lazy(() => import("./pages/RegDrafter"));
const RaaC = lazy(() => import("./pages/RaaC"));
const RegulatoryComparison = lazy(() => import("./pages/RegulatoryComparison"));
const Resources = lazy(() => import("./pages/Resources"));
const Diagnostic = lazy(() => import("./pages/Diagnostic"));
const SignUp = lazy(() => import("./pages/SignUp"));
const OnboardingWizard = lazy(() => import("./pages/OnboardingWizard"));
const Help = lazy(() => import("./pages/Help"));
const ControlDetailsPage = lazy(() => import("./pages/ControlDetailsPage"));
const ArticleDetailsPage = lazy(() => import("./pages/ArticleDetailsPage"));
const ProvisionDetailsPage = lazy(() => import("./pages/ProvisionDetailsPage"));
const Assessments = lazy(() => import("./pages/Assessments"));
const AssessmentDetails = lazy(() => import("./pages/AssessmentDetails"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Frameworks = lazy(() => import("./pages/Frameworks"));
const FrameworkDetails = lazy(() => import("./pages/FrameworkDetails"));
const Map = lazy(() => import("./pages/Map"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const TestLayeredMap = lazy(() => import("./pages/TestLayeredMap"));
const Packages = lazy(() => import("./pages/Packages"));
const LeadForm = lazy(() => import("./pages/LeadForm"));
const Projects = lazy(() => import("./pages/Projects"));
const FinancialProjections = lazy(() => import("./pages/FinancialProjections"));
const PricingModels = lazy(() => import("./pages/PricingModels"));
const KPIsDashboard = lazy(() => import("./pages/KPIsDashboard"));
const SWOTAnalysis = lazy(() => import("./pages/SWOTAnalysis"));
const CustomerJourney = lazy(() => import("./pages/CustomerJourney"));
const ComplianceAssessment = lazy(() => import("./pages/ComplianceAssessment"));
const Reports = lazy(() => import("./pages/Reports"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const MonitorDashboard = lazy(() => import("./pages/MonitorDashboard"));
const ComplianceHub = lazy(() => import("./pages/ComplianceHub"));
const RegMonitor = lazy(() => import("./pages/RegMonitor"));
const LegalDisclaimers = lazy(() => import("./pages/LegalDisclaimers"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Support = lazy(() => import("./pages/Support"));
const ContentUpdate = lazy(() => import("./pages/ContentUpdate"));
const BackupSystem = lazy(() => import("./pages/BackupSystem"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const DataExport = lazy(() => import("./pages/DataExport"));
const ApiDocumentation = lazy(() => import("@/pages/ApiDocumentation"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Error500 = lazy(() => import("@/pages/Error500"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ProfessionalInsurance = lazy(() => import("./pages/ProfessionalInsurance"));
const MasterServiceAgreement = lazy(() => import("./pages/MasterServiceAgreement"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AMLManagement = lazy(() => import("./pages/AMLManagement"));
const KYCManagement = lazy(() => import("./pages/KYCManagement"));
const ComplianceReports = lazy(() => import("./pages/ComplianceReports"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center night-gradient">
    <Loader2 className="w-12 h-12 animate-spin text-primary" />
  </div>
);

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/regadvisor"} component={RegAdvisor} />
      <Route path={"/regdrafter"} component={RegDrafter} />
      <Route path={"/raac"} component={RaaC} />
      <Route path={"/onboarding"} component={OnboardingWizard} />
      <Route path={"/help"} component={Help} />
      <Route path={"/regulatory-comparison"} component={RegulatoryComparison} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/diagnostic"} component={Diagnostic} />
      <Route path={"/404"} component={NotFound} />
      <Route path="/frameworks" component={Frameworks} />
      <Route path="/frameworks/:id" component={FrameworkDetails} />
      <Route path="/map" component={Map} />
      {/* Dev-only routes - hidden in production */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <Route path="/preview" component={PreviewPage} />
          <Route path="/test" component={TestLayeredMap} />
        </>
      )}
      <Route path="/controls/:id" component={ControlDetailsPage} />
      <Route path="/articles/:id" component={ArticleDetailsPage} />
      <Route path="/provisions/:id" component={ProvisionDetailsPage} />
      <Route path="/assessments" component={Assessments} />
      <Route path="/assessments/:id" component={AssessmentDetails} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/compliance-hub" component={ComplianceHub} />
      <Route path="/regmonitor" component={RegMonitor} />
      <Route path="/packages" component={Packages} />
      <Route path="/contact" component={Contact} />
      <Route path="/signup" component={SignUp} />
      <Route path="/welcome" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/financial-projections" component={FinancialProjections} />
      <Route path="/pricing-models" component={PricingModels} />
      <Route path="/kpis" component={KPIsDashboard} />
      <Route path="/swot" component={SWOTAnalysis} />
      <Route path="/customer-journey" component={CustomerJourney} />
      <Route path="/assessment" component={ComplianceAssessment} />
      <Route path="/reports" component={Reports} />
      <Route path="/onboarding-full" component={Onboarding} />
      <Route path="/monitor" component={MonitorDashboard} />
      <Route path="/legal-disclaimers" component={LegalDisclaimers} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/professional-insurance" component={ProfessionalInsurance} />
      <Route path="/master-service-agreement" component={MasterServiceAgreement} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/support" component={Support} />
      <Route path="/content-update" component={ContentUpdate} />
      <Route path="/backup-system" component={BackupSystem} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/data-export" component={DataExport} />
      <Route path="/api-documentation" component={ApiDocumentation} />
      {/* Removed duplicate /contact - already defined above */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/faq" component={FAQ} />
      <Route path="/500" component={Error500} />
      {/* Removed duplicate /404 - already defined above */}
      <Route path="/aml" component={AMLManagement} />
      <Route path="/kyc" component={KYCManagement} />
      <Route path="/compliance-reports" component={ComplianceReports} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    <Footer />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ResourceErrorBoundary>
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<PageLoader />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
    </ResourceErrorBoundary>
  );
}

export default App;

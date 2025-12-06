import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isNetworkError: boolean;
}

/**
 * Enhanced Error Boundary that detects Ad Blocker / Network issues
 * and provides helpful guidance to users
 */
export class ResourceErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isNetworkError: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Check if it's a network/resource loading error
    const isNetworkError =
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError') ||
      error.message.includes('ERR_BLOCKED_BY_CLIENT') ||
      error.message.includes('Load failed');

    return {
      hasError: true,
      error,
      isNetworkError,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ResourceErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Check for blocked resources in console
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('blocked') || entry.duration === 0) {
            this.setState({ isNetworkError: true });
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.state.isNetworkError) {
        // Ad Blocker / Network Error UI
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-amber-400" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                تم حظر بعض الموارد
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                يبدو أن <strong className="text-amber-400">Ad Blocker</strong> أو إضافة خصوصية في متصفحك تحجب بعض الموارد المطلوبة لعرض المنصة.
              </p>

              <div className="bg-slate-900/50 rounded-xl p-6 mb-6 text-right">
                <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center justify-end gap-2">
                  <span>الحلول المقترحة</span>
                  <AlertTriangle className="w-5 h-5" />
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">1.</span>
                    <span>تعطيل Ad Blocker مؤقتاً لهذا الموقع</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">2.</span>
                    <span>إضافة المنصة للقائمة البيضاء (Whitelist)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">3.</span>
                    <span>استخدام متصفح آخر (Chrome أو Safari)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">4.</span>
                    <span>تعطيل إضافات الخصوصية مؤقتاً</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReload}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة المحاولة
                </Button>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  تواصل معنا للمساعدة
                </Button>
              </div>

              <p className="text-slate-500 text-sm mt-6">
                نحن نحترم خصوصيتك ولا نستخدم إعلانات مزعجة. المنصة آمنة 100%
              </p>
            </div>
          </div>
        );
      }

      // Generic Error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              حدث خطأ غير متوقع
            </h2>

            <p className="text-slate-300 mb-6">
              نعتذر عن الإزعاج. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="bg-slate-900/50 rounded-xl p-4 mb-6 text-right">
                <summary className="text-red-400 cursor-pointer mb-2">
                  تفاصيل الخطأ (للمطورين)
                </summary>
                <pre className="text-xs text-slate-400 overflow-auto text-left">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReload}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <RefreshCw className="w-4 h-4 ml-2" />
                إعادة تحميل الصفحة
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                العودة للصفحة الرئيسية
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

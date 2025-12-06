/**
 * RegAdvisor - المستشار التنظيمي الذكي
 */

import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  Send,
  Loader2,
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Copy,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

// ============================================================================
// Types
// ============================================================================

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Array<{
    controlCode: string;
    articleCode: string;
    articleText: string;
    frameworkName: string;
  }>;
  recommendations?: string[];
  relatedQuestions?: string[];
  auditRef?: string;
  confidence?: number;
  timestamp: Date;
}

// ============================================================================
// Component
// ============================================================================

export default function RegAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [framework, setFramework] = useState<"PDPL" | "ECC" | "SAMA" | "ALL">("ALL");
  const [conversationId] = useState(() => `conv-${Date.now()}`);
  const scrollRef = useRef<HTMLDivElement>(null);

  // APIs
  const askMutation = trpc.regAdvisor.ask.useMutation();
  const { data: examples } = trpc.regAdvisor.getExampleQuestions.useQuery({
    language: "ar",
    framework,
  });

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ========================================================================
  // Handlers
  // ========================================================================

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await askMutation.mutateAsync({
        question: input,
        conversationId,
        framework,
        language: "ar",
        context: messages.slice(-5).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: response.answer,
        sources: response.sources,
        recommendations: response.recommendations,
        relatedQuestions: response.relatedQuestions,
        auditRef: response.auditRef,
        confidence: response.confidence,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "فشل الحصول على إجابة"
      );
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("تم النسخ");
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.success("تم مسح المحادثة");
  };

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RegAdvisor
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            المستشار التنظيمي الذكي - استشارات فورية حول PDPL, ECC, SAMA
          </p>
        </div>

        {/* Framework Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {(["ALL", "PDPL", "ECC", "SAMA"] as const).map((f) => (
            <Button
              key={f}
              variant={framework === f ? "default" : "outline"}
              onClick={() => setFramework(f)}
              size="sm"
            >
              {f === "ALL" ? "جميع الأطر" : f}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <Card className="lg:col-span-2 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">المحادثة</h2>
              </div>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                >
                  مسح المحادثة
                </Button>
              )}
            </div>

            <Separator className="mb-4" />

            {/* Messages */}
            <ScrollArea
              ref={scrollRef}
              className="h-[500px] pr-4 mb-4"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Sparkles className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    مرحباً! كيف يمكنني مساعدتك؟
                  </h3>
                  <p className="text-gray-500">
                    اسأل أي سؤال عن الامتثال التنظيمي
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        } rounded-2xl p-4 shadow-md`}
                      >
                        {/* Content */}
                        <div className="prose prose-sm max-w-none">
                          {message.role === "assistant" ? (
                            <Streamdown>{message.content}</Streamdown>
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>

                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              المصادر:
                            </p>
                            <div className="space-y-2">
                              {message.sources.map((source, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs bg-white rounded-lg p-2"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs">
                                      {source.frameworkName}
                                    </Badge>
                                    <span className="font-mono text-blue-600">
                                      {source.controlCode} / {source.articleCode}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 line-clamp-2">
                                    {source.articleText}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommendations */}
                        {message.recommendations &&
                          message.recommendations.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                التوصيات:
                              </p>
                              <ul className="text-sm space-y-1">
                                {message.recommendations.map((rec, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Related Questions */}
                        {message.relatedQuestions &&
                          message.relatedQuestions.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm font-semibold mb-2">
                                أسئلة ذات صلة:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {message.relatedQuestions.map((q, idx) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-auto py-1"
                                    onClick={() => setInput(q)}
                                  >
                                    {q}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            {message.confidence && (
                              <Badge
                                variant={
                                  message.confidence > 0.8
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                ثقة: {Math.round(message.confidence * 100)}%
                              </Badge>
                            )}
                            {message.auditRef && (
                              <span className="text-gray-500 font-mono">
                                {message.auditRef.substring(0, 8)}
                              </span>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1"
                            onClick={() => handleCopyMessage(message.content)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {askMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl p-4 shadow-md">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="اسأل أي سؤال عن PDPL, ECC, SAMA..."
                className="min-h-[60px] resize-none"
                disabled={askMutation.isPending}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || askMutation.isPending}
                size="lg"
                className="px-6"
              >
                {askMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Examples */}
            <Card className="p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                أمثلة الأسئلة
              </h3>
              <div className="space-y-2">
                {examples?.examples.map((example, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start text-right h-auto py-3 px-4"
                    onClick={() => handleExampleClick(example)}
                  >
                    <span className="line-clamp-2 text-sm">{example}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Info */}
            <Card className="p-6 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                كيف يعمل RegAdvisor؟
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>مربوط بـ 258 ضابط ومادة</strong> من PDPL, ECC, SAMA
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>إجابات موثقة</strong> مع المصادر الرسمية
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>قابل للتدقيق</strong> مع Audit Ref لكل استشارة
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>توصيات عملية</strong> قابلة للتنفيذ فوراً
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

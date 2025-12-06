import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertTriangle, TrendingUp, Award, Download } from "lucide-react";
import { Link } from "wouter";
import { downloadCertificate } from "@/lib/certificateGenerator";
import { toast } from "sonner";

/**
 * 🎯 Interactive Compliance Quiz
 * تقييم سريع لمستوى الامتثال (7 أسئلة)
 */

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "هل لديك سياسات موثقة لحماية البيانات الشخصية (PDPL)؟",
    category: "حماية البيانات"
  },
  {
    id: 2,
    question: "هل تجري تقييمات دورية للمخاطر (Risk Assessment)؟",
    category: "إدارة المخاطر"
  },
  {
    id: 3,
    question: "هل لديك فريق امتثال مخصص أو مسؤول امتثال معين؟",
    category: "الحوكمة"
  },
  {
    id: 4,
    question: "هل تستخدم أنظمة آلية لمراقبة الامتثال (Compliance Monitoring)؟",
    category: "الأتمتة"
  },
  {
    id: 5,
    question: "هل تقدم تدريبات منتظمة للموظفين على متطلبات الامتثال؟",
    category: "التدريب"
  },
  {
    id: 6,
    question: "هل لديك خطة استجابة للحوادث الأمنية (Incident Response Plan)؟",
    category: "الأمن السيبراني"
  },
  {
    id: 7,
    question: "هل تجري مراجعات دورية للامتثال مع الجهات التنظيمية؟",
    category: "المراجعة"
  }
];

export function ComplianceQuiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  const calculateScore = () => {
    const yesCount = Object.values(answers).filter(a => a).length;
    return Math.round((yesCount / questions.length) * 100);
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: "ممتاز", color: "text-chart-2", icon: Award };
    if (score >= 60) return { level: "جيد", color: "text-primary", icon: TrendingUp };
    if (score >= 40) return { level: "متوسط", color: "text-chart-4", icon: AlertTriangle };
    return { level: "يحتاج تحسين", color: "text-chart-5", icon: XCircle };
  };

  const reset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
  };

  if (!started) {
    return (
      <Card className="premium-card max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl legal-heading">
            اختبر مستوى امتثالك الآن
          </CardTitle>
          <CardDescription className="text-base">
            7 أسئلة سريعة لتقييم جاهزيتك التنظيمية • دقيقتان فقط
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              "✅ تقييم فوري",
              "✅ نتيجة مئوية",
              "✅ توصيات مخصصة",
              "✅ مجاني 100%"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Button 
            onClick={() => setStarted(true)} 
            className="w-full" 
            size="lg"
          >
            ابدأ التقييم الآن
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            لا حاجة للتسجيل • النتيجة فورية
          </p>
        </CardContent>
      </Card>
    );
  }

  if (completed) {
    const score = calculateScore();
    const scoreInfo = getScoreLevel(score);
    const ScoreIcon = scoreInfo.icon;

    return (
      <Card className="premium-card max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className={`w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4`}>
            <ScoreIcon className={`w-10 h-10 ${scoreInfo.color}`} />
          </div>
          <CardTitle className="text-3xl legal-heading gold-glow">
            نتيجتك: {score}%
          </CardTitle>
          <CardDescription className="text-lg">
            <Badge className={`${scoreInfo.color} border-current`} variant="outline">
              مستوى الامتثال: {scoreInfo.level}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>التقدم</span>
              <span className="font-bold">{score}%</span>
            </div>
            <Progress value={score} className="h-3" />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-bold text-sm">📊 تحليل النتيجة:</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {score >= 80 && "ممتاز! شركتك تتمتع بمستوى عالٍ من الامتثال. نوصي بالحفاظ على هذا المستوى مع التحديثات المستمرة."}
              {score >= 60 && score < 80 && "جيد! لديك أساس قوي للامتثال، لكن هناك مجالات تحتاج لتحسين. نوصي بتعزيز الأتمتة والتدريب."}
              {score >= 40 && score < 60 && "متوسط. شركتك تحتاج لتحسينات جوهرية في عدة مجالات. نوصي بإنشاء خطة امتثال شاملة."}
              {score < 40 && "يحتاج تحسين عاجل. هناك فجوات كبيرة في الامتثال قد تعرضك لمخاطر تنظيمية. نوصي بالبدء فوراً."}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm">🎯 الخطوات التالية:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-chart-2 shrink-0 mt-0.5" />
                <span>احصل على تقرير تفصيلي مع توصيات مخصصة</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-chart-2 shrink-0 mt-0.5" />
                <span>تعرّف على الفجوات في امتثالك لكل إطار تنظيمي</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-chart-2 shrink-0 mt-0.5" />
                <span>ابدأ رحلة الامتثال الكامل مع منصتنا</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1" size="lg">
                <Link href="/signup">
                  احصل على التقرير الكامل
                </Link>
              </Button>
              <Button 
                onClick={async () => {
                  try {
                    await downloadCertificate({
                      companyName: "شركتك",
                      score,
                      frameworks: [],
                      date: new Date(),
                      assessmentType: "تقييم سريع"
                    });
                    toast.success("تم تحميل الشهادة بنجاح!");
                  } catch (error) {
                    toast.error("حدث خطأ في تحميل الشهادة");
                  }
                }}
                variant="outline" 
                className="flex-1" 
                size="lg"
              >
                <Download className="w-5 h-5 ml-2" />
                حمّل الشهادة (PDF)
              </Button>
            </div>
            <Button onClick={reset} variant="ghost" className="w-full" size="sm">
              إعادة التقييم
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            💡 التقرير الكامل يتضمن: تحليل تفصيلي • خطة عمل • مقارنة بالمعايير
          </p>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="premium-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {questions[currentQuestion].category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-[100px] flex items-center">
          <h3 className="text-xl font-bold legal-heading">
            {questions[currentQuestion].question}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleAnswer(true)}
            size="lg"
            variant="outline"
            className="h-20 text-lg hover:bg-chart-2/10 hover:border-chart-2"
          >
            <CheckCircle2 className="w-6 h-6 ml-2 text-chart-2" />
            نعم
          </Button>
          <Button
            onClick={() => handleAnswer(false)}
            size="lg"
            variant="outline"
            className="h-20 text-lg hover:bg-chart-5/10 hover:border-chart-5"
          >
            <XCircle className="w-6 h-6 ml-2 text-chart-5" />
            لا
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          اختر الإجابة الأقرب لواقع شركتك الحالي
        </p>
      </CardContent>
    </Card>
  );
}

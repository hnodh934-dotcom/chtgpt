import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * مكون الرسم البياني التفاعلي للأطر التنظيمية
 * Interactive Framework Graph Component
 * 
 * يعرض العلاقات والتقاطعات بين الأطر التنظيمية بشكل بصري تفاعلي
 */

interface Framework {
  id: number;
  code: string;
  name: string;
  sectorAr: string;
  mandatory: boolean;
  authority: string;
  relatedFrameworks?: number[];
}

interface InteractiveFrameworkGraphProps {
  frameworks: Framework[];
}

// ألوان حسب القطاع
const sectorColors: Record<string, string> = {
  "التقنية المالية": "#3b82f6", // blue
  "الأمن السيبراني": "#ef4444", // red
  "حماية البيانات": "#a855f7", // purple
  "الخدمات المالية": "#22c55e", // green
  "التمويل الجماعي": "#f97316", // orange
  "الشركات": "#6366f1", // indigo
  "أخرى": "#64748b" // gray
};

export function InteractiveFrameworkGraph({ frameworks }: InteractiveFrameworkGraphProps) {
  // تحويل الأطر إلى nodes
  const initialNodes: Node[] = useMemo(() => {
    return frameworks.map((framework, index) => {
      const angle = (index / frameworks.length) * 2 * Math.PI;
      const radius = 300;
      const x = Math.cos(angle) * radius + 400;
      const y = Math.sin(angle) * radius + 300;

      return {
        id: framework.id.toString(),
        type: 'default',
        position: { x, y },
        data: {
          label: (
            <div className="p-3 min-w-[200px]" dir="rtl">
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="outline" 
                  className="text-xs font-mono"
                  style={{
                    borderColor: sectorColors[framework.sectorAr] || sectorColors["أخرى"],
                    color: sectorColors[framework.sectorAr] || sectorColors["أخرى"]
                  }}
                >
                  {framework.code}
                </Badge>
                {true && (
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: sectorColors[framework.sectorAr] || sectorColors["أخرى"] }}
                  ></div>
                )}
              </div>
              <div className="text-sm font-medium text-foreground mb-1 line-clamp-2">
                {framework.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {framework.authority}
              </div>
            </div>
          ),
        },
        style: {
          background: 'white',
          border: `2px solid ${sectorColors[framework.sectorAr] || sectorColors["أخرى"]}`,
          borderRadius: '8px',
          padding: 0,
          width: 'auto',
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    });
  }, [frameworks]);

  // إنشاء edges بناءً على العلاقات
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    
    frameworks.forEach((framework) => {
      if (framework.relatedFrameworks && framework.relatedFrameworks.length > 0) {
        framework.relatedFrameworks.forEach((relatedId) => {
          // التأكد من وجود الإطار المرتبط
          const relatedFramework = frameworks.find(f => f.id === relatedId);
          if (relatedFramework) {
            edges.push({
              id: `e${framework.id}-${relatedId}`,
              source: framework.id.toString(),
              target: relatedId.toString(),
              type: 'smoothstep',
              animated: true,
              style: {
                stroke: sectorColors[framework.sectorAr] || sectorColors["أخرى"],
                strokeWidth: 2,
                opacity: 0.6,
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: sectorColors[framework.sectorAr] || sectorColors["أخرى"],
              },
              label: 'استناد',
              labelStyle: {
                fontSize: 10,
                fill: '#64748b',
              },
              labelBgStyle: {
                fill: 'white',
                fillOpacity: 0.8,
              },
            });
          }
        });
      }
    });

    // إضافة edges افتراضية بين الأطر من نفس القطاع (للتوضيح)
    const frameworksBySector = frameworks.reduce((acc, f) => {
      if (!acc[f.sectorAr]) acc[f.sectorAr] = [];
      acc[f.sectorAr].push(f);
      return acc;
    }, {} as Record<string, Framework[]>);

    Object.values(frameworksBySector).forEach((sectorFrameworks) => {
      if (sectorFrameworks.length > 1) {
        for (let i = 0; i < sectorFrameworks.length - 1; i++) {
          const source = sectorFrameworks[i];
          const target = sectorFrameworks[i + 1];
          
          // تجنب التكرار
          const edgeExists = edges.some(
            e => (e.source === source.id.toString() && e.target === target.id.toString()) ||
                 (e.source === target.id.toString() && e.target === source.id.toString())
          );
          
          if (!edgeExists) {
            edges.push({
              id: `sector-${source.id}-${target.id}`,
              source: source.id.toString(),
              target: target.id.toString(),
              type: 'smoothstep',
              style: {
                stroke: sectorColors[source.sectorAr] || sectorColors["أخرى"],
                strokeWidth: 1,
                strokeDasharray: '5 5',
                opacity: 0.3,
              },
              label: 'نفس القطاع',
              labelStyle: {
                fontSize: 9,
                fill: '#94a3b8',
              },
              labelBgStyle: {
                fill: 'white',
                fillOpacity: 0.7,
              },
            });
          }
        }
      }
    });

    return edges;
  }, [frameworks]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          الخريطة التفاعلية للعلاقات
        </CardTitle>
        <CardDescription className="text-sm">
          استكشف العلاقات والتقاطعات بين الأطر التنظيمية - يمكنك السحب والتكبير للتنقل
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="mb-4 p-3 bg-muted/30 rounded-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {Object.entries(sectorColors).map(([sector, color]) => (
              <div key={sector} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-muted-foreground">{sector}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-primary"></div>
              <span>علاقة استناد</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t border-dashed border-muted-foreground"></div>
              <span>نفس القطاع</span>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="h-[600px] border rounded-md bg-background" dir="ltr">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-left"
          >
            <Background />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                const framework = frameworks.find(f => f.id.toString() === node.id);
                return framework ? (sectorColors[framework.sectorAr] || sectorColors["أخرى"]) : '#64748b';
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
            />
          </ReactFlow>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-3 bg-muted/20 rounded-md text-xs text-muted-foreground" dir="rtl">
          <p className="font-medium mb-1">إرشادات التنقل:</p>
          <ul className="space-y-1">
            <li>• اسحب الأطر لتغيير موضعها</li>
            <li>• استخدم عجلة الماوس للتكبير والتصغير</li>
            <li>• اسحب الخلفية للتنقل في الخريطة</li>
            <li>• استخدم الخريطة المصغرة في الأسفل للتنقل السريع</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

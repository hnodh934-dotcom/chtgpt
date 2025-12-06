/**
 * مكوّن الخريطة الهرمية الرباعية الطبقات
 * 
 * الميزات:
 * - دعم RTL كامل
 * - التوسّع/الطي الديناميكي (< 200ms)
 * - مسار الفتات (Breadcrumbs)
 * - اللوحة الجانبية (Sidebar)
 * - عرض العلاقات بين العقد
 */

import React, { useState, useMemo, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge as FlowEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type {
  Framework,
  Control,
  Article,
  Provision,
  Edge,
  AnyNode,
  NodeKind,
} from '@shared/types/layered-system';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

interface LayeredMapProps {
  frameworks: Framework[];
  controls: Control[];
  articles: Article[];
  provisions: Provision[];
  edges: Edge[];
  onSelect?: (node: AnyNode) => void;
}

/**
 * تحويل العقد إلى نقاط React Flow
 */
const createFlowNode = (
  node: AnyNode,
  position: { x: number; y: number },
  isExpanded: boolean
): Node => {
  const colors = {
    framework: 'bg-blue-100 border-blue-400 text-blue-900',
    control: 'bg-emerald-100 border-emerald-400 text-emerald-900',
    article: 'bg-amber-100 border-amber-400 text-amber-900',
    provision: 'bg-purple-100 border-purple-400 text-purple-900',
  };

  const labels = {
    framework: 'إطار',
    control: 'ضابط',
    article: 'مادة',
    provision: 'حكم',
  };

  return {
    id: node.id,
    type: 'default',
    position,
    data: {
      label: (
        <div
          className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${colors[node.kind]}`}
          style={{ minWidth: '200px', maxWidth: '300px' }}
        >
          <div className="text-xs font-semibold mb-1">{labels[node.kind]}</div>
          <div className="font-bold text-sm mb-1 legal-heading">{node.name}</div>
          {node.description && (
            <div className="text-xs opacity-80 line-clamp-2">{node.description}</div>
          )}
          <div className="text-xs mt-2 opacity-60">
            {isExpanded ? '← انقر للطي' : '← انقر للتوسّع'}
          </div>
        </div>
      ),
    },
  };
};

/**
 * تحويل العلاقات إلى حواف React Flow
 */
const createFlowEdge = (edge: Edge, index: number): FlowEdge => {
  const colors = {
    'يستند إلى': '#3b82f6',
    'يفسّر': '#10b981',
    'يقيّد': '#f59e0b',
    'يحيل إلى': '#8b5cf6',
  };

  return {
    id: edge.id,
    source: edge.fromId,
    target: edge.toId,
    type: 'smoothstep',
    animated: true,
    label: edge.relation,
    labelStyle: { fill: colors[edge.relation], fontWeight: 600, fontSize: 12 },
    style: { stroke: colors[edge.relation], strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: colors[edge.relation],
    },
  };
};

export function LayeredMap({
  frameworks,
  controls,
  articles,
  provisions,
  edges,
  onSelect,
}: LayeredMapProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<AnyNode | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<AnyNode[]>([]);

  // بناء خريطة العقد للوصول السريع
  const nodeMap = useMemo(() => {
    const map = new Map<string, AnyNode>();
    [...frameworks, ...controls, ...articles, ...provisions].forEach((node) => {
      map.set(node.id, node);
    });
    return map;
  }, [frameworks, controls, articles, provisions]);

  // بناء خريطة الحواف للوصول السريع
  const edgeMap = useMemo(() => {
    const map = new Map<string, Edge[]>();
    edges.forEach((edge) => {
      if (!map.has(edge.fromId)) {
        map.set(edge.fromId, []);
      }
      map.get(edge.fromId)!.push(edge);
    });
    return map;
  }, [edges]);

  // حساب العقد والحواف المرئية
  const { visibleNodes, visibleEdges } = useMemo(() => {
    const visible = new Set<string>();
    const queue: string[] = [];

    // البدء بالأطر (الطبقة الأولى)
    frameworks.forEach((fw) => {
      visible.add(fw.id);
      if (expandedNodes.has(fw.id)) {
        queue.push(fw.id);
      }
    });

    // التوسّع بناءً على العقد الموسّعة
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      const nodeEdges = edgeMap.get(nodeId) || [];
      
      nodeEdges.forEach((edge) => {
        visible.add(edge.toId);
        if (expandedNodes.has(edge.toId)) {
          queue.push(edge.toId);
        }
      });
    }

    const nodes: AnyNode[] = [];
    visible.forEach((id) => {
      const node = nodeMap.get(id);
      if (node) nodes.push(node);
    });

    const edgeList = edges.filter(
      (edge) => visible.has(edge.fromId) && visible.has(edge.toId)
    );

    return { visibleNodes: nodes, visibleEdges: edgeList };
  }, [frameworks, expandedNodes, edgeMap, nodeMap, edges]);

  // حساب مواقع العقد (Layout)
  const flowNodes = useMemo(() => {
    const layerSpacing = 350;
    const nodeSpacing = 150;
    const layers: { [key in NodeKind]: AnyNode[] } = {
      framework: [],
      control: [],
      article: [],
      provision: [],
    };

    visibleNodes.forEach((node) => {
      layers[node.kind].push(node);
    });

    const nodes: Node[] = [];
    let layerIndex = 0;

    (['framework', 'control', 'article', 'provision'] as NodeKind[]).forEach((kind) => {
      const layerNodes = layers[kind];
      layerNodes.forEach((node, index) => {
        const position = {
          x: layerIndex * layerSpacing,
          y: index * nodeSpacing,
        };
        nodes.push(
          createFlowNode(node, position, expandedNodes.has(node.id))
        );
      });
      if (layerNodes.length > 0) layerIndex++;
    });

    return nodes;
  }, [visibleNodes, expandedNodes]);

  const flowEdges = useMemo(() => {
    return visibleEdges.map((edge, index) => createFlowEdge(edge, index));
  }, [visibleEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges2, setEdges, onEdgesChange] = useEdgesState([]);

  // تحديث العقد والحواف عند تغيير البيانات
  React.useEffect(() => {
    console.log('⚙️ Updating nodes:', flowNodes.length, 'edges:', flowEdges.length);
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  // معالجة النقر على العقدة
  const handleNodeClick = useCallback(
    (node: AnyNode) => {
      const startTime = performance.now();

      setExpandedNodes((prev) => {
        const next = new Set(prev);
        // إضافة فقط (لا حذف) - للتوسّع التدريجي
        next.add(node.id);
        return next;
      });

      setSelectedNode(node);
      onSelect?.(node);

      // بناء مسار الفتات
      const path: AnyNode[] = [node];
      let current = node;
      
      // البحث عن الآباء
      while (current) {
        const parentEdge = edges.find((e) => e.toId === current.id);
        if (parentEdge) {
          const parent = nodeMap.get(parentEdge.fromId);
          if (parent) {
            path.unshift(parent);
            current = parent;
          } else {
            break;
          }
        } else {
          break;
        }
      }

      setBreadcrumbs(path);

      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`⚡ Node click performance: ${duration.toFixed(2)}ms`);
    },
    [edges, nodeMap, onSelect]
  );

  // معالجة النقر على العقدة من ReactFlow
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      console.log('👆 Node clicked:', node.id);
      const anyNode = nodeMap.get(node.id);
      if (anyNode) {
        console.log('✅ Found anyNode:', anyNode.name);
        handleNodeClick(anyNode);
      }
    },
    [nodeMap, handleNodeClick]
  );

  return (
    <div className="h-screen flex flex-col" dir="rtl">
      {/* مسار الفتات */}
      {breadcrumbs.length > 0 && (
        <div className="bg-white border-b p-3 flex items-center gap-2 overflow-x-auto">
          {breadcrumbs.map((node, index) => (
            <React.Fragment key={node.id}>
              {index > 0 && <ChevronLeft className="w-4 h-4 text-gray-400" />}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNodeClick(node)}
                className="text-sm"
              >
                {node.name}
              </Button>
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex-1 flex">
        {/* الخريطة */}
        <div className="flex-1 relative">
          {/* زر إظهار الكل */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              onClick={() => {
                const allIds = new Set<string>();
                frameworks.forEach((fw) => allIds.add(fw.id));
                controls.forEach((ctl) => allIds.add(ctl.id));
                articles.forEach((art) => allIds.add(art.id));
                provisions.forEach((prov) => allIds.add(prov.id));
                setExpandedNodes(allIds);
              }}
              variant="default"
              size="sm"
            >
              إظهار الكل
            </Button>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges2}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            dir="ltr"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* اللوحة الجانبية */}
        {selectedNode && (
          <Card className="w-96 m-4 p-4 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2">
                  {selectedNode.kind === 'framework' && 'إطار تنظيمي'}
                  {selectedNode.kind === 'control' && 'ضابط'}
                  {selectedNode.kind === 'article' && 'مادة'}
                  {selectedNode.kind === 'provision' && 'حكم'}
                </Badge>
                <h2 className="text-xl font-bold legal-heading">{selectedNode.name}</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedNode(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {selectedNode.description && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">الوصف</h3>
                <p className="text-sm text-gray-700 legal-text">{selectedNode.description}</p>
              </div>
            )}

            {selectedNode.regulator && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">الجهة المنظمة</h3>
                <p className="text-sm text-gray-700">{selectedNode.regulator}</p>
              </div>
            )}

            {selectedNode.sector && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">القطاع</h3>
                <Badge variant="outline">{selectedNode.sector}</Badge>
              </div>
            )}

            {/* معلومات خاصة بالإطار */}
            {selectedNode.kind === 'framework' && (
              <>
                {selectedNode.effectiveDate && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">تاريخ السريان</h3>
                    <p className="text-sm text-gray-700">{selectedNode.effectiveDate}</p>
                  </div>
                )}
                {selectedNode.externalUrl && (
                  <div className="mb-4">
                    <a
                      href={selectedNode.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      رابط النظام الرسمي
                    </a>
                  </div>
                )}
              </>
            )}

            {/* معلومات خاصة بالضابط */}
            {selectedNode.kind === 'control' && (
              <>
                {selectedNode.priority && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">الأولوية</h3>
                    <Badge
                      variant={
                        selectedNode.priority === 'high'
                          ? 'destructive'
                          : selectedNode.priority === 'medium'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {selectedNode.priority === 'high' && 'عالية'}
                      {selectedNode.priority === 'medium' && 'متوسطة'}
                      {selectedNode.priority === 'low' && 'منخفضة'}
                    </Badge>
                  </div>
                )}
                {selectedNode.implementationGuidance && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">إرشادات التنفيذ</h3>
                    <p className="text-sm text-gray-700 legal-text">
                      {selectedNode.implementationGuidance}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* معلومات خاصة بالمادة */}
            {selectedNode.kind === 'article' && (
              <>
                {selectedNode.articleNo && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">رقم المادة</h3>
                    <p className="text-sm text-gray-700">{selectedNode.articleNo}</p>
                  </div>
                )}
                {selectedNode.legalText && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">النص القانوني</h3>
                    <p className="text-sm text-gray-700 legal-text border-r-4 border-amber-400 pr-3">
                      {selectedNode.legalText}
                    </p>
                  </div>
                )}
                {selectedNode.references && selectedNode.references.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">المراجع</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {selectedNode.references.map((ref, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-amber-600">•</span>
                          <span>{ref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* معلومات خاصة بالحكم */}
            {selectedNode.kind === 'provision' && (
              <>
                {selectedNode.citation && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">الاستشهاد</h3>
                    <p className="text-sm text-gray-700">{selectedNode.citation}</p>
                  </div>
                )}
                {selectedNode.court && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">الجهة القضائية</h3>
                    <p className="text-sm text-gray-700">{selectedNode.court}</p>
                  </div>
                )}
                {selectedNode.date && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">التاريخ</h3>
                    <p className="text-sm text-gray-700">{selectedNode.date}</p>
                  </div>
                )}
                {selectedNode.summary && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">الملخص</h3>
                    <p className="text-sm text-gray-700 legal-text border-r-4 border-purple-400 pr-3">
                      {selectedNode.summary}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* العلاقات */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">العلاقات</h3>
              <div className="space-y-2">
                {edges
                  .filter((e) => e.fromId === selectedNode.id || e.toId === selectedNode.id)
                  .map((edge) => {
                    const isOutgoing = edge.fromId === selectedNode.id;
                    const relatedNodeId = isOutgoing ? edge.toId : edge.fromId;
                    const relatedNode = nodeMap.get(relatedNodeId);
                    
                    if (!relatedNode) return null;
                    
                    return (
                      <div
                        key={edge.id}
                        className="text-sm p-2 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100"
                        onClick={() => handleNodeClick(relatedNode)}
                      >
                        <div className="font-semibold text-xs text-gray-500 mb-1">
                          {isOutgoing ? '→' : '←'} {edge.relation}
                        </div>
                        <div>{relatedNode.name}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

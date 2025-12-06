/**
 * صفحة اختبار للخريطة الهرمية
 */

import { useState } from 'react';
import { frameworks, controls, articles, provisions, edges } from '@shared/seed.sample';
import { Button } from '@/components/ui/button';

export default function TestLayeredMap() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // حساب العقد المرئية
  const edgeMap = new Map<string, typeof edges>();
  edges.forEach((edge) => {
    if (!edgeMap.has(edge.fromId)) {
      edgeMap.set(edge.fromId, []);
    }
    edgeMap.get(edge.fromId)!.push(edge);
  });

  const visible = new Set<string>();
  const queue: string[] = [];

  // البدء بالأطر
  frameworks.forEach((fw) => {
    visible.add(fw.id);
    if (expandedNodes.has(fw.id)) {
      queue.push(fw.id);
    }
  });

  // التوسّع
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

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">اختبار الخريطة الهرمية</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">العقد الموسّعة:</h2>
        <p>{Array.from(expandedNodes).join(', ') || 'لا توجد'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">العقد المرئية ({visible.size}):</h2>
        <p>{Array.from(visible).join(', ')}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">الأطر ({frameworks.length}):</h2>
          {frameworks.map((fw) => (
            <div key={fw.id} className="mb-2">
              <Button
                onClick={() => toggleNode(fw.id)}
                variant={expandedNodes.has(fw.id) ? 'default' : 'outline'}
              >
                {fw.name} {expandedNodes.has(fw.id) ? '(موسّع)' : '(مطوي)'}
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">الضوابط ({controls.length}):</h2>
          {controls.map((ctl) => (
            <div key={ctl.id} className="mb-2">
              <Button
                onClick={() => toggleNode(ctl.id)}
                variant={expandedNodes.has(ctl.id) ? 'default' : 'outline'}
                disabled={!visible.has(ctl.id)}
              >
                {ctl.name} {visible.has(ctl.id) ? '(مرئي)' : '(مخفي)'}
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">المواد ({articles.length}):</h2>
          {articles.map((art) => (
            <div key={art.id} className="mb-2">
              <Button
                onClick={() => toggleNode(art.id)}
                variant={expandedNodes.has(art.id) ? 'default' : 'outline'}
                disabled={!visible.has(art.id)}
              >
                {art.name} {visible.has(art.id) ? '(مرئي)' : '(مخفي)'}
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">الأحكام ({provisions.length}):</h2>
          {provisions.map((prov) => (
            <div key={prov.id} className="mb-2">
              <Button
                onClick={() => toggleNode(prov.id)}
                variant={expandedNodes.has(prov.id) ? 'default' : 'outline'}
                disabled={!visible.has(prov.id)}
              >
                {prov.name} {visible.has(prov.id) ? '(مرئي)' : '(مخفي)'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">العلاقات ({edges.length}):</h2>
        {edges.map((edge) => (
          <div key={edge.id} className="text-sm mb-1">
            {edge.fromId} → {edge.relation} → {edge.toId}
          </div>
        ))}
      </div>
    </div>
  );
}

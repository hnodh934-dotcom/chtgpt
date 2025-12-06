/**
 * صفحة معاينة الخريطة الهرمية الرباعية الطبقات
 * 
 * تستخدم البيانات العينة من seed.sample.ts
 */

import { LayeredMap } from '@/components/LayeredMap';
import { frameworks, controls, articles, provisions, edges } from '@shared/seed.sample';
import type { AnyNode } from '@shared/types/layered-system';

export default function PreviewPage() {
  const handleSelect = (node: AnyNode) => {
    console.log('Selected node:', node);
  };

  return (
    <div className="h-screen">
      <LayeredMap
        frameworks={frameworks}
        controls={controls}
        articles={articles}
        provisions={provisions}
        edges={edges}
        onSelect={handleSelect}
      />
    </div>
  );
}

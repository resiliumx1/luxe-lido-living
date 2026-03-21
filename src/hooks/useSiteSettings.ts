import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type SiteSettings = Record<string, string>;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('key, value');
        if (data) {
          const map: SiteSettings = {};
          data.forEach((row: { key: string; value: string }) => {
            if (row.value) map[row.key] = row.value;
          });
          setSettings(map);
        }
      } catch {
        // silently fail — use defaults
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { settings, loading };
}

import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const getVisitorId = () => {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }
  return id;
};

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await supabase.from("site_visits").insert({
          visitor_id: getVisitorId(),
          page: window.location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
        });
      } catch (e) {
        // silently fail
      }
    };
    trackVisit();
  }, []);
};

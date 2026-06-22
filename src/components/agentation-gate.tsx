"use client";

import { useEffect, useState } from "react";
import { Agentation } from "agentation";

/**
 * Blendet die Agentation-Feedback-Toolbar ein:
 * - im Dev-Modus immer
 * - auf Produktion nur, wenn `?annotate` in der URL steht
 *
 * So können wir die Live-Seite gezielt annotieren, ohne die Toolbar
 * allen Besuchern zu zeigen. Temporäres Werkzeug – kann später wieder
 * entfernt werden.
 */
export function AgentationGate() {
  const [show, setShow] = useState(process.env.NODE_ENV === "development");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("annotate")) {
      setShow(true);
    }
  }, []);

  if (!show) {
    return null;
  }

  return <Agentation />;
}

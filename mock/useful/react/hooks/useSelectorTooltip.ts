import { MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";

export const useSelectorTooltip = <T extends HTMLElement | null>(refs?: MutableRefObject<T>[]) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [lastNode, setLastNode] = useState(null);

  const checkIsAllowed = () => {
    if (!lastNode) return;

    if (refs === undefined) setIsActive(true);
    else if (refs.find((x) => x.current?.contains(lastNode))) setIsActive(true);
  };

  const coords = useMemo(() => {
    checkIsAllowed();
    return globalCoords;
  }, [selectedText]);

  const handleMouseUp = useCallback((e: any) => {
    const text = (document.getSelection() as Selection).toString();

    if (text.length > 5) {
      setLastNode(e.target);
      setSelectedText(text);
    }
  }, []);

  const handleWindowMouseMove = useCallback((e: any) => {
    setGlobalCoords({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleResetActivity = useCallback((e: unknown) => setIsActive(false), []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleResetActivity);
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleResetActivity);
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return { isActive, selectedText, coords };
};

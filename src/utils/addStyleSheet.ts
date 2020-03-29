export function styleSheetManager() {
  const id: number = 0;
  let styleSheet: CSSStyleSheet | null | undefined = undefined;

  return {
    insertStyleSheetRule(rule: string): void {
      const styleEl = document.createElement("style");
      document.head.appendChild(styleEl);

      // Grab style element's sheet
      styleSheet = styleEl.sheet as CSSStyleSheet | null | undefined;
      if (styleSheet == null || !("insertRule" in styleSheet)) {
        return;
      }
      styleSheet.insertRule(rule, id);
      console.warn(styleSheet?.rules);
    },
    cleanStyleSheet() {
      if (styleSheet != null && "removeRule" in styleSheet) {
        styleSheet.removeRule(id);
      }
    }
  };
}

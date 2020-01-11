declare namespace JSX {
  interface Element extends SVGElement, HTMLElement, DocumentFragment {}
  type BaseIntrinsicElement = IntrinsicElements["div"];
  type LabelIntrinsicElement = IntrinsicElements["label"];
  interface IntrinsicElements {
    "has-rgh": {};
    label: LabelIntrinsicElement & { for?: string };
    "include-fragment": BaseIntrinsicElement & { src?: string };
    "details-menu": BaseIntrinsicElement & { src?: string; preload?: boolean };
    "time-ago": BaseIntrinsicElement & { datetime: string; format?: string };
    "relative-time": BaseIntrinsicElement & { datetime: string; title: string };
    "details-dialog": BaseIntrinsicElement & { tabindex: string };
  }
}

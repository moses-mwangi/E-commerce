declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.AllHTMLAttributes<
          Partial<globalThis.HTMLElementTagNameMap["model-viewer"]>
        >,
        Partial<globalThis.HTMLElementTagNameMap["model-viewer"]>
      >;
    }
  }
}

export {};

// declare namespace JSX {
//   interface IntrinsicElements {
//     "model-viewer": React.DetailedHTMLProps<
//       React.HTMLAttributes<HTMLElement>,
//       HTMLElement
//     > & {
//       src?: string;
//       alt?: string;
//       ar?: boolean;
//       "ar-modes"?: string;
//       "camera-controls"?: boolean;
//       "shadow-intensity"?: number;
//       "auto-rotate"?: boolean;
//     };
//   }
// }

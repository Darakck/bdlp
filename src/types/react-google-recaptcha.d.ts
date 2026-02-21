declare module 'react-google-recaptcha' {
  import * as React from 'react';

  interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    theme?: 'light' | 'dark';
    size?: 'compact' | 'normal' | 'invisible';
    tabindex?: number;
    hl?: string;
    stoken?: string;
    badge?: 'bottomright' | 'bottomleft' | 'inline';
  }

  class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
    public reset(): void;
    public getValue(): string | null;
  }

  export default ReCAPTCHA;
}

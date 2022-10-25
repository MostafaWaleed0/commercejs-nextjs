import type * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--auto-grid-min-size'?: string;
    backgroundColor?: string;
  }
}

/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 14:12:44
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    // interface ElementClass extends Vue {}
    // interface IntrinsicElements {
    //   [elem: string]: any
    // }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $commonApi: any,
    $systemApi: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any;
    ref?: string;
  }
}

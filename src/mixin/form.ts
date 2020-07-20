import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component
export default class FormMixin extends Vue {
  public drawer = false
  public menuOpen = false
  public addRow (): void {
    this.drawer = true
  }

  closeDrawer (): void {
    this.drawer = false
  }
}

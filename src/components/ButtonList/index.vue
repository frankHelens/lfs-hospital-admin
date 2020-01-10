<template lang="pug">
.button-wrap
  ButtonItem(
    v-for="(button,index) in buttonLists"
    v-bind="button"
    :key="button.name")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ButtonItem from './ButtonItem.vue'

@Component({
  components: {
    ButtonItem
  }
})
export default class ButtonList extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  buttonList!: object[]

  get buttonLists () {
    return this.buttonList.filter((button: any) => {
      return !button.showFunc || button.showFunc(this.$parent, button)
    })
  }
}

</script>

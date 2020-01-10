<template lang='pug'>
ButtonList(:buttonList="buttonList")
</template>

<script lang='ts'>
import { Vue, Component, Provide } from 'vue-property-decorator'
import ButtonList from '@/components/ButtonList/index.vue'

@Component({
  components: {
    ButtonList
  }
})
export default class ButtonListPage extends Vue {
  @Provide() buttonList: object[] = [{
    label: '点击它',
    type: 'primary',
    func: ({ button }: any) => {
      button.loading = true
      setTimeout(() => {
        button.loading = false
      }, 3000)
      console.log(button)
    }
  }, {
    label: '点击它',
    disabled: true,
    func: ({ button }: any) => {
      button.loading = true
      setTimeout(() => {
        button.loading = false
      }, 3000)
      console.log(button)
    }
  }, {
    label: '点击它',
    func: ({ button }: any) => {
      button.loading = true
      setTimeout(() => {
        button.loading = false
      }, 3000)
      console.log(button)
    }
  }]
}
</script>

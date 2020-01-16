<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-16 12:00:28
 * @Author: huangfengrui
 * @Date: 2020-01-16 10:41:19
 * @Description:
 -->
<script>
import { isObject } from '@/utils/common'
import { Image, Tag } from 'element-ui'
export default {
  name: 'InfoRender',
  props: {
    name: {
      type: String
    },
    row: {
      type: Object
    },
    render: {
      type: [Function, Object]
    },
    index: {
      type: Number,
      default: 0
    },
    data: {
      type: [String, Number],
      default: ''
    }
  },
  render (h) {
    if (isObject(this.render)) {
      const { type, ...arg } = this.render
      return this[type](h, arg)
    }
    const params = {
      data: this.data,
      row: this.row,
      index: this.index,
      name: this.name
    }
    return this.render(h, params)
  },
  methods: {
    image (h) {
      const data = this.data
      return h(Image, {
        style: {
          width: '60px',
          height: '60px'
        },
        props: {
          previewSrcList: [data],
          src: data,
          fit: 'fit'
        }
      })
    },
    select (h, { dict }) {
      const data = this.data
      const { type, label } = dict[data]
      return h(Tag, {
        props: {
          type
        }
      }, label)
    }
  }
}
</script>

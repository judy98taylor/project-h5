import { get, post } from '../../../libs/http'

export default {
  name: 'Index',
  data() {
    return {
      listTopSites: [],
      listCards: [],
      msg: ''
    }
  },
  methods: {
    loadImage(src) {
      return require('./images/' + src)
    },
    switchExpand(item) {
      item.isExpand = !item.isExpand
    },
    changeLang() {
      // en cn
      if (this.$i18n.locale === 'cn') {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'cn'
      }
    }
  },
  mounted() {
    const self = this
    // ok
    get(
      `/browser/hp/v1/layout`,
      {
        r: 'IN', // [必] 地区
        l: 'en', // [必] 语言
        m: 'test'
      },
      {
        // 需要和后端约定
        pkg: 'chrome_layout_package',
        err_cbk: err => {
          console.log(err)
        }
      }
    )
      .then(resp => {
        console.log('resp', resp)
        self.msg = resp
      })
      .catch()
  }

  // todo post
}

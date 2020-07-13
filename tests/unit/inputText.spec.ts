// 試行錯誤中
// import { expect } from 'chai'
// import { shallowMount } from '@vue/test-utils'
// import InputText from '@/components/InputText.vue'

// describe('InputText.vue', () => {
//     it('renders props.msg when passed', () => {
//         const t1 = "私的置換ツールです。左側にMarkdown文書を入力してみましょう。"
//         const wrapper = shallowMount(InputText, {
//             propsData: { t1 }
//         });
//         const t = `
//         # [TAG]TEXT H1
//         - リスト1
//         - リスト2
//             1. 項目1
//             1. 項目2
//             1. 項目3
//         ## TEXT H2
//         - これはH2のテキストです。
//             - 詳細1
//             - 詳細2
        
//         ### TEXT H3
//         - \`詳細3\`
//         `

//         wrapper.setData({
//             input: t
//         })
//         expect(wrapper.text()).to.include(t1)
//     })
// })

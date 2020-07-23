
// サンプル
import { convert } from '@/components/convert'
import { expect } from 'chai'

const inputText = `
# [TAG]TEXT H1
- リスト1
- リスト2
    1. 項目1
    1. 項目2
    1. 項目3
## TEXT H2
- これはH2のテキストです。
    - 詳細1
    - 詳細2

### TEXT H3
- \`詳細3\`

`

const outputText = `

●TAG●
TEXT H1
・	リスト1
・	リスト2
	1. 項目1
	1. 項目2
	1. 項目3

	TEXT H2
	・	これはH2のテキストです。
		・	詳細1
		・	詳細2
	

		TEXT H3
		・	\`詳細3\`
		
		`

describe('convert.ts:', () => {
    it('メソッド・convert', () => {
        const result = convert(inputText);
        expect(result).to.equal(outputText)
    })
})
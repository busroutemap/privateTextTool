
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
	2. 項目2
	3. 項目3

	TEXT H2
	・	これはH2のテキストです。
		・	詳細1
		・	詳細2
	

		TEXT H3
		・	\`詳細3\`
		
		`

const i2 = `# お手本
1. 
    1. 
    1. 
1. 
    1. 
    1. 
1. 
    1. 
    1. 

## その1
1. 
1. 
1. 

### その2
1. 

1. 
1. 

## お
1. 
1. 
1. 


# おて
1. 
    1. 

1. 
    1. `

const o2 = `
お手本
1. 
	1. 
	2. 
2. 
	1. 
	2. 
3. 
	1. 
	2. 


	その1
	1. 
	2. 
	3. 
	

		その2
		1. 
		
		1. 
		2. 
		

	お
	1. 
	2. 
	3. 
	
	

おて
1. 
	1. 

1. 
	1. `

describe('convert.ts:', () => {
    it('メソッド・convert', () => {
        const result = convert(inputText);
		expect(result).to.equal(outputText);
	}),
		it('リスト番号置換処理', () => {
			const result = convert(i2);
			expect(result).to.equal(o2);
	})
})
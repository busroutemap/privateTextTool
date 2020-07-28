
import { convert } from '@/components/convert'
import { expect } from 'chai'

//---------------------------------------------
// テストパターンのインポート
import {
    i1, o1,
    i2, o2
} from './i'

describe('convert.ts:', () => {
    it('総合その1', () => {
        const result = convert(i1);
        expect(result).to.equal(o1);
    }),
    it('総合その2', () => {
        const result = convert(i2);
        expect(result).to.equal(o2);
    })
})
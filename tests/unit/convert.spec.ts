
import {
    convert,
    space2Tab
} from '@/components/convert'
import { expect } from 'chai'

//---------------------------------------------
// テストパターンのインポート
import {
    i1, o1,
    i2, o2,
    i_st01, o_st01,
    i_st02, o_st02,
    i_st03, o_st03
} from './i'

describe('convert.ts:', () => {
    it('総合その1', () => {
        const result = convert(i1);
        expect(result).to.equal(o1);
    }),
    it('総合その2', () => {
        const result = convert(i2);
        expect(result).to.equal(o2);
    }),
    it(`/**
    * 項目01
    * PATTERN : 1行に1つソフトタブ
    * RESULT : タブに置換
    */`, () => {
            const result = space2Tab(i_st01);
            expect(result).to.equal(o_st01);
    }),
    it(`/**
    * 項目02
    * PATTERN : 1行に1つ、3スペースや2スペースのソフトタブ
    * RESULT : タブに置換されない
    */`, () => {
            const result = space2Tab(i_st02);
            expect(result).to.equal(o_st02);
    }),
    it(`/**
    * 項目03
    * PATTERN : 離れていたり、連続している複数タブ
    * RESULT : 置換できる。また、複数行でもOK
    */`, () => {
            const result = space2Tab(i_st03);
            expect(result).to.equal(o_st03);
    })
})
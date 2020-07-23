import { Rulelist } from '@/components/_Rulelist'
import { expect } from 'chai'

const fn01 = (a: string) => { return a + a };
const fn02 = (a: string) => { return a + "z" };

describe('Rulelist.ts:', () => {
    it('ルールなし', () => {
        const rl = new Rulelist();
        expect(rl.doAll("a")).equal("a");
    }),
    it('ルール1つ', () => {
        const rl = new Rulelist();
        rl.setRule({
            primary: 0,
            func: fn01
        });
        expect(rl.doAll("a")).equal("aa");
    }),
    it('ルール2つ優先度同じ', () => {
        const rl = new Rulelist();
        rl.setRule({
            primary: 0,
            func: fn01
        });
        rl.setRule({
            primary: 0,
            func: fn01
        });
        expect(rl.doAll("a")).equal("aaaa");
    }),
    it('ルール2つ、無限と逆無限', () => {
        const rl = new Rulelist();
        rl.setRule({
            primary: Infinity,
            func: fn01
        });
        rl.setRule({
            primary: -Infinity,
            func: fn02
        });
        expect(rl.doAll("a")).equal("azaz");
    }),
    it('ルール10', () => {
        const rl = new Rulelist();
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        rl.setRule({
            primary: 0,
            func: fn02
        });
        expect(rl.doAll("a")).equal("azzzzzzzzzz");
    })
})



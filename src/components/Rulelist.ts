
/**
 * @interface Rule ルールインターフェース
 * @description ルール管理クラスが格納するルールの持つ内容
 */
interface Rule {
    // primaryは小さいほど先に実行される
    primary: number;
    func: Function;
}

/**
 * @class Rulelist
 * @description ルール管理クラス
 * @member rules ルール配列
 * @constructor
 * @method setRule ルールを追加
 * @method doAll 管理しているルールを全て実行
 */
class Rulelist{
    /**
     * @member rules
     * ルール管理クラスの管理するルールArray
     */
    private rules: Array<Rule>;

    /**
     * @constructor ルール配列を初期化
     */
    constructor() {
        // ルールインスタンス作成時に初期化
        this.rules = new Array;
    }
    
    /**
     * @method setRule
     * @description ルールを新たに追加する
     * @param {Rule} param ルール
     */
    public setRule(param: Rule) {
        this.rules.push(param);
        this.sortRules();
    }

    /**
     * @method doAll
     * @param {String} longText 変換対象テキスト
     * @returns {String} 変換後のテキスト
     */
    public doAll(longText: string) : string {
        this.rules.forEach(rule => {
            longText = rule.func(longText)
        });
        console.log(longText);
        return longText;
    }
    /**
     * @method sortRules
     * @description Rulelistの管理するルールを並べ替える。
     * 引数、戻り値なし
     */
    private sortRules() {
        this.rules.sort((a, b) => {
            return a.primary - b.primary;
        });
    }
}

export {
    Rulelist
}
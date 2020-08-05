
// ルール管理クラスのインポート
import { Rulelist } from './Rulelist'

/**
 * リスト番号をフォーマット化する
 * @param longtext textarea内の文字列
 */
const listNumFormat = (longText: string) => {
    const oldLines = nSplit(longText);
    let count = new Array<number>(1).fill(0);
    // その行にリスト番号がある:カウントに基づき置換
    // その行にリスト番号はない:何もしない
    // その行の文字列は0:カウントをリセット
    // タブが上がる、または改行があればリストをリセット
    // タブがいくつあるか→その数分拡張
    const newLines = oldLines.map(line => {
        let l = "";

        // リスト番号にマッチする正規表現オブジェクト
        const listNumMatch = new RegExp(/\d\./);

        // 左側のTAB数を取得
        const nest = getNest(line);

        // 深さに対応するcountがあるか確認
        if (count.length <= nest) {
            // 無ければネスト差分の要素を追加(0)
            const luck = nest - count.length +1;
            const addArr = new Array<number>(luck).fill(0);
            // 深さに対応した新しいカウント配列を用意
            count = count.concat(addArr);
        }
        //---------------------------------------------
        if (listNumMatch.test(line)) {
            // その行にリスト番号がある場合
            // 対応するカウント+1
            count[nest] += 1;

            // それより深いネストは初期化
            count = count.fill(0, nest+1);

            // 表示するリスト番号文字列
            const c = count[nest].toString();

            // リスト番号を置換し新たな行へ
            l = line.replace(listNumMatch, c + ".");
        } else if (line.trimStart().length > 0) {
            // リスト番号はないが、
            // 空文字ではない場合(有効文字数が0以上)
            // 何も置換しない、カウントも保持
            // ただし、このケースだと、改行しなければ、同じネストはずっと連番となる
            l = line;
        } else {
            // 空文字の場合(おそらく改行)
            // 何も置換しない
            // この行のネスト「以上」のネストについて、カウントを初期化する
            // リスト番号ありとは条件が異なる
            count = count.fill(0, nest);
            l = line;
        }
        return l;
    });
    const newLongText = nConcat(newLines);
    return newLongText;
}

/**
 * TABによるネストの深さを返す
 * @param line 行のテキスト
 */
const getNest = (line: string) => {
    // len : 行内の有効な文字数
    const len = line.trimStart().length;

    // nest : ネストの深さ
    const nest = line.length - len;

    return nest;
}

/**
 * h1,h2,h3に該当する`#`を削除し、それに見合うTabを補正する
 * @param longText textarea内の文字列
 * @return 新しいテキスト
 */
const sharpFormat = (longText: string) => {
    const oldlines = nSplit(longText);
    // 1行ごとに確認
    // もし###がある→該当行とそれ以降はh3グループ(見出しtab2+本文tab3)
    // もし##がある→該当行とそれ以降はh2グループ(見出しtab1+本文tab1)
    // もし#がある→該当行とそれ以降はh1グループ(見出しtab0+本文tab1)
    // #が無い→前行の状態を継続
    let headerNumber = 0;

    // 新たに追加、h1は必ず番号付きにする
    let h1count = 0;
    const newlines = oldlines.map(line => {
        let l :string;
        if (line.indexOf("\#\#\# ") >= 0) {
            // h3グループ
            headerNumber = 2;
            l = line.replace("### ", "\n\t\t");
        } else if (line.indexOf("\#\#") >= 0) {
            // h2グループ
            headerNumber = 1;
            l = line.replace("## ", "\n\t◇");
        } else if (line.indexOf("\#") >= 0) {
            // h1グループ
            headerNumber = 0;

            // h1の番号を+1
            h1count += 1;
            // h1フォーマットに変換
            l = line.replace("# ", h1count + "）");
        } else {
            // 前行の状態を継続
            // headerNumberは変更しない
            // headNumber分のTabをlineの前に付ける
            l = "\t".repeat(headerNumber) + line;
        }
        return l;
    });
    const newLongText = nConcat(newlines);
    return newLongText;
}

/**
 * []を●●に変更する
 * @param longText
 * @return 新しいテキスト
 */
const tag2maru = (longText: string) => {
    const oldlines = nSplit(longText);
    const newlines = oldlines.map(line => {
        // この時点で# [TAG]TEXTまたは# TEXT
        const reg = new RegExp(/\[(.*)\]/);
        const tagText = pipetteTag(line);
        if (tagText!==null) {
            line = `●${tagText}●\n` + line.replace(reg, "");
        }
        return line;
    });
    const newLongText = nConcat(newlines);
    return newLongText
}

/**
 * ヘッダーからTAGを抽出する。無ければnullを返す
 * @param h1 headerText
 */
const pipetteTag = (headerText: string) => {
    // TAG前後の[]位置を算出
    const startCount = headerText.indexOf("[");
    const endCount = headerText.indexOf("]", startCount);

    if (startCount > 0 && endCount > 0 && startCount < endCount) {
        // []位置が算出される場合
        // TAGの内容を抽出する
        const tag = headerText.slice(startCount + 1, endCount)
        return tag;
    } else {
        // []位置がマイナス(=そもそも無い)か、endのほうが小さければ無効
        // TAG置換を行わない
        return null;
    }
}

/**
 * @summary "- " を "・"に置換する
 * @param longText textarea内の文字列
 * @returns 新しいテキスト
 */
const hyphen2Circle = (longText: string) => {
    const oldlines = nSplit(longText);
    const newlines = oldlines.map(line => {
        return line.replace("- ", "・");
    });
    const newLongText = nConcat(newlines);
    return newLongText;
}


/**
 * @summary 半角スペース4つをTABに変換する。
 * @param longText textarea内の長文
 * @returns 新しいテキスト
 * @description 最初に出てきたスペースのみ置換する
 */
const space2Tab = (longText: string) => {
    const oldlines = nSplit(longText);
    const newlines = oldlines.map(line => {
        const spans = spaceSplit(line);
        const newline = tConcat(spans);
        return newline;
    });
    const newLongText = nConcat(newlines);
    return newLongText;
};

/**
 * 
 * @param lineText 1行
 * @returns 分割された行の断片配列
 */
const spaceSplit = (lineText: string) => {
    return lineText.split("    ");
};

/**
 * @summary 文字列配列の全要素をタブで結合する
 * @param spans 文字列配列
 * @returns 結合された行文字列
 */
const tConcat = (spans: string[]) => {
    const longText = spans.join('\t');
    return longText;
};


/**
 * @summary 共通処理、入力文字列を改行コードでばらす
 * @param longText 長い文字列
 * @returns 1行ごとに分かれた文字列
 */
const nSplit = (longText: string) => {
    return longText.split("\n");
};

/**
 * @summary 共通処理、入力文字列配列を改行コードで連結する
 * @param lines 1行ごとの文字列配列
 * @returns 1行にまとめられた文字列
 */
const nConcat = (lines: string[]) => {
    let longText = lines.join("\n");
    return longText;
};



/**
 * @summary ルールに従いテキストを変換する
 * @param longText
 * @returns 置換後のテキスト
 */
const convert = (longText: string) => {

    // ルールリストの作成
    const rl = new Rulelist;

    // 各種ルールの適用
    rl.setRule({
        primary: 5,
        func: space2Tab
    });
    rl.setRule({
        primary: 10,
        func: hyphen2Circle
    });
    rl.setRule({
        primary: 10,
        func: tag2maru
    });
    rl.setRule({
        primary: 20,
        func: sharpFormat
    });
    rl.setRule({
        primary: 25,
        func:listNumFormat
    })

    // ルールに基づき実行
    const result = rl.doAll(longText);
    return result;
};

export {
    convert,
    space2Tab,
    hyphen2Circle,
    tag2maru,
    sharpFormat,
    listNumFormat,
    spaceSplit,
    tConcat,
    nSplit,
    nConcat,
    pipetteTag
};
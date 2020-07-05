
// /**
//  * h1,h2,h3に該当する`#`を削除する(未完成)
//  * @param longText textarea内の文字列
//  * @return 新しいテキスト
//  */
// const sharpFormat = (longText: string) => {
//     const oldlines = nSplit(longText);
//     // 1行ごとに確認
//     // もし###がある→該当行とそれ以降はh3グループ(tab2)
//     // もし##がある→該当行とそれ以降はh2グループ(tab1)
//     // もし#がある→該当行とそれ以降はh1グループ(tab0)
//     // #が無い→前行の状態を継続
//     let headerNumber = 0;
//     const linesh3repalced = oldlines.map(line => {
//         let l = line;
//         if (line.indexOf("### ") > 0) {
//             // h3グループ
//             headerNumber = 2;
//             l = l.replace("### ", "");
//         } else if (line.indexOf("##") > 0) {
//             // h2グループ
//             headerNumber = 1;
//             l = l.replace("## ", "");
//         } else if (line.indexOf("#") > 0) {
//             // h1グループ
//             headerNumber = 0;
//             l = l.replace("# ", "");
//         } else {
//             // 前行の状態を継続
//             // headerNumberは変更しない
//         }
//         return l;
//     });
//     const linesh2replaced = linesh3repalced.map(line => {
//         return line.replace("## ", "");
//     });
//     const linesh1replaced = linesh2replaced.map(line => {
//         return line.replace("# ", "");
//     })
//     const newLongText = nConcat(linesh1replaced);
//     return newLongText;
// }

// const tag2maru = (longText: string) => {
//     const oldlines = nSplit(longText);
//     const newlines:string[] = [];
//     // oldlines.forEach(line => {
//     //     const  line.replace("[\(\*\)]", "●\$1●");
//     // });
//     const newLongText = nConcat(newlines);
//     return newlines
// }

/**
 * @summary "- " を "・\t"に置換する
 * @param longText textarea内の文字列
 * @returns 新しいテキスト
 */
const hyphen2Circle = (longText: string) => {
    const oldlines = nSplit(longText);
    const newlines = oldlines.map(line => {
        return line.replace("- ", "・\t");
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
    let longText = "";
    lines.forEach(line => {
        longText += line + "\n";
    });
    return longText;
};



/**
 * @summary ルールに従いテキストを変換する
 * @param longText
 * @returns 置換後のテキスト
 */
const convert = (longText: string) => {
    const rule1Text = space2Tab(longText);
    const rule2Text = hyphen2Circle(rule1Text);
    const newText = rule2Text;
    return newText;
};

export { convert };

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
 * 
 * @param spans 
 * @returns 結合された行文字列
 */
const tConcat = (spans: string[]) => {
    let longText = "";
    spans.forEach(span => {
        longText += span + "\t";
    });
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
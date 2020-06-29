
/**
 * @summary 入力文字列を改行コードでばらす
 * @param longText 長い文字列
 * @returns 1行ごとに分かれた文字列
 */
const nsplit = (longText: string) => {
    return longText.split("\n");
};

/**
 * @summary 入力文字列配列を改行コードで連結する
 * @param lines 1行ごとの文字列配列
 * @returns 1行にまとめられた文字列
 */
const concatLines = (lines: string[]) => {
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
    const lines = nsplit(longText);
    const newLines = lines.map(line => {
        return line.replace("    ", "\t");
    });
    const newText = concatLines(newLines);
    return newText;
};

export { convert };
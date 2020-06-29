
/**
 * @summary ルールに従いテキストを変換する
 * @param longText
 * @returns 置換後のテキスト
 */
const convert = (longText: string) => {
    const newText = longText.replace("    ", "\t");
    return newText;
};

export { convert };
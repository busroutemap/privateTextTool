
interface Rule {
    primary: number;
    func: Function;
}

class Rulelist{
    private rules: Array<Rule>;
    constructor(){
        this.rules = new Array;
    }
    public setRule(param: Rule) {
        this.rules.push(param);
        this.sortRules();
    }
    public doAll(longText: string) : string {
        this.rules.forEach(rule => {
            longText = rule.func(longText)
        });
        console.log(longText);
        return longText;
    }
    private sortRules() {
        this.rules.sort((a, b) => {
            return a.primary - b.primary;
        });
    }
}

export {
    Rule,
    Rulelist
}
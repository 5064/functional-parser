class Source {
    private str: string
    public pos: number

    constructor(str: string) {
        this.str = str
        this.pos = 0
    }

    public peek(): string {
        if (this.pos < this.str.length) {
            return this.str.charAt(this.pos)
        }
        return null
    }

    public next(): void {
        ++this.pos;
    }
}

class Parser extends Source {
    constructor(str: string) {
        super(str)
    }

    public number(): number {
        let token: string = ""
        let char: string
        while ((char = this.peek()) != null && this.isDigit(char)) {
            token += parseInt(char)
            this.next()
        }
        return parseInt(token)
    }

    public expr(): number {
        let x: number = this.number()
        while (true) {  // 構文解析と計算を分離せずにexprで処理しているのがポイント
            switch (this.peek()) {
                case "+":
                    this.next()
                    x += this.number()
                    continue
                case "-":
                    this.next()
                    x -= this.number()
                    continue
            }
            break
        }
        return x
    }

    private isDigit(char: string): boolean {
        return /^\d+$/.test(char)
    }
}

export class Main {
    public static test(args: string) {
        console.log(`${args} = ${this.parse(args)}`)
    }
    public static parse(args: string) {
        return new Parser(args).expr()
    }
}

Main.test("12+3-5")
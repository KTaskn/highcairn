export default class TabFunction {
    private num_spaces: number
    
    constructor(num_spaces: number) {
        this.num_spaces = num_spaces
    }

    public shiftTab = (input: string, start: number, end?: number): string => {
        if (!end) {
            end = start
        }
        // 選択範囲の行の先頭にスペースを追加する
        // 行を抽出する
        let textset: string[] = input.split("\n").map((text, idx): string => { return text + "\n" })

        // 選択範囲の行と選択範囲外の行を分ける
        const cumsum = (input) => {
            let result = [input[0]];

            for (let i = 1; i < input.length; i++) {
                result[i] = result[i - 1] + input[i]
            }

            return result
        }
        let textset_length: number[] = textset.map((text) => { return text.length })
        let textset_tailnum: number[] = cumsum(textset_length)
        let textset_headnum: number[] = textset_tailnum.map((val, idx) => { return val - textset_length[idx] })

        return textset.map((val, idx) => {
            // 行末尾がstart以上、行先頭がend以下の行
            if (textset_tailnum[idx] >= start && textset_headnum[idx] <= end) {
                return ' '.repeat(this.num_spaces) + val
            } else {
                return val
            }
        }).join('').replace(/\n$/, '')
    }

    public unshiftTab = (input: string, start: number, end?: number): string => {
        if (!end) {
            end = start
        }
        // 選択範囲の行のスペースを削除
        // 行を抽出する
        let textset: string[] = input.split("\n").map((text, idx): string => { return text + "\n" })

        // 選択範囲の行と選択範囲外の行を分ける
        const cumsum = (input) => {
            let result = [input[0]];

            for (let i = 1; i < input.length; i++) {
                result[i] = result[i - 1] + input[i]
            }

            return result
        }
        let textset_length: number[] = textset.map((text) => { return text.length })
        let textset_tailnum: number[] = cumsum(textset_length)
        let textset_headnum: number[] = textset_tailnum.map((val, idx) => { return val - textset_length[idx] })

        return textset.map((val, idx) => {
            // 行末尾がstart以上、行先頭がend以下の行
            if (textset_tailnum[idx] >= start && textset_headnum[idx] <= end) {
                return val.replace(/^\s\s\s\s/, '')
            } else {
                return val
            }
        }).join('').replace(/\n$/, '')
    }
}
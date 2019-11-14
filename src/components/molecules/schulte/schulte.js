import React from "react";
import random from "random";
import styles from "./shulte.module.scss";
import Timer from "../timer";

class Schulte extends React.Component {
  constructor(props) {
    super(props);

    const {
      symbols = ["a"],
      rows = 1,
      cols = 1,
      withDot = false,
      matrix = [],
      solution = symbols,
      answer = []
    } = props;
    this.state = {
      symbols,
      rows,
      cols,
      withDot,
      answer,
      matrix,
      solution
    };
    const { length: symbolsLength } = symbols;
    const symbolsNeeds = withDot ? rows * cols - 1 : rows * cols;
    const isNotEnoughSymbols = symbolsNeeds > symbolsLength;
    if (isNotEnoughSymbols)
      throw new Error(
        `not enough characters. needed - ${symbolsNeeds}, but have - ${symbolsLength}`
      );
    const isTooManySymbols = symbolsNeeds < symbolsLength;
    if (isTooManySymbols)
      throw new Error(
        `too many characters. needed - ${symbolsNeeds}, but have - ${symbolsLength}`
      );
  }

  getRandomSymbol = symbols => {
    const randomSymbolNumber = random.int(0, symbols.length - 1);
    const { [randomSymbolNumber]: randomSymbol, ...rest } = symbols;

    return [randomSymbol, Object.values(rest)];
  };

  getSymbolsRow = ({
    randomSymbolsFunc,
    symbolsArray,
    colsNum,
    withDot,
    dotRowsPosition
  }) => {
    const [row, rest] = [...Array(colsNum)].reduce(
      (acc, _, i) => {
        if (withDot && dotRowsPosition === i)
          return [[...acc[0], "dot"], acc[1]];
        const [randomSymbol, symbolsArrayRest] = randomSymbolsFunc(acc[1]);
        return [[...acc[0], randomSymbol], symbolsArrayRest];
      },
      [[], symbolsArray]
    );

    return [row, rest];
  };

  getSymbolsMatrix = ({
    randomSymbolsFunc,
    symbolsRowFunc,
    symbolsArray,
    rowsNum,
    colsNum,
    withDot,
    dotRowsPosition,
    dotColsPosition
  }) => {
    const [matrix] = [...Array(rowsNum)].reduce(
      (acc, _, i) => {
        const [row, symbolsArrayRest] = symbolsRowFunc({
          randomSymbolsFunc,
          symbolsArray: acc[1],
          colsNum,
          withDot: withDot && dotColsPosition === i,
          dotRowsPosition
        });
        return [[...acc[0], row], symbolsArrayRest];
      },
      [[], symbolsArray]
    );

    return matrix;
  };

  startTraining = () => {
    const { symbols, rows, cols, withDot } = this.state;
    const symbolsMatrix = this.getSymbolsMatrix({
      randomSymbolsFunc: this.getRandomSymbol,
      symbolsRowFunc: this.getSymbolsRow,
      symbolsArray: symbols,
      rowsNum: rows,
      colsNum: cols,
      withDot: withDot,
      dotRowsPosition: Math.floor(cols / 2),
      dotColsPosition: Math.floor(rows / 2)
    });

    this.setState({
      matrix: symbolsMatrix,
      answer: []
    });
  };

  isTrainingFinish = () => {
    const { answer, solution } = this.state;

    return answer.length === solution.length;
  };

  onClickHandler = symbol => {
    const { answer, solution } = this.state;
    const { length: answerLength } = answer;
    if (solution[answerLength] === symbol) {
      this.setState(({ answer }) => ({ answer: [...answer, symbol] }));
    }
  };

  setFinishTime = time => {
    this.setState(({ finishTime }) => ({ finishTime: [...finishTime, time] }));
  };

  componentDidMount = () => {
    this.startTraining();
  };

  componentDidUpdate = () => {
    if (this.isTrainingFinish()) {
      this.props.changeComponentIndex(index => index + 1);
    }
  };

  render = () => {
    const { matrix, solution, answer } = this.state;
    const nextLetter = solution[answer.length] || "";
    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div className={styles.time}>
              Время:{" "}
              <span className={styles.bold}>
                <Timer getTime={this.props.changeSchulteTime} isStart />
              </span>
            </div>

            <div className={styles.hint}>
              Найдите букву:{" "}
              <span className={styles.bold}>{nextLetter.toUpperCase()}</span>
            </div>
          </div>

          <div className={styles.table}>
            {matrix.map((row, i) => (
              <div key={i} className={styles.row}>
                {row.map((symbol, j) =>
                  symbol !== "dot" ? (
                    <div
                      key={`${i}${j}`}
                      className={styles.symbol}
                      onClick={() => this.onClickHandler(symbol)}
                    >
                      {symbol.toUpperCase()}
                    </div>
                  ) : (
                    <div
                      key={`${i}${j}`}
                      className={`${styles.symbol} ${styles.dotSymbol}`}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
}

export default Schulte;

import * as React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(data) {
    this.props.increment(data);
  }
  decrement(data) {
    this.props.decrement(data);
  }

  render() {
    let numIncress = 5;
    return (
      <div className="App">
        {
          this.props.stock.map((res, index) =>
            <h1 key={index}>{res}</h1>
          )
        }
        <button onClick={(e) => this.increment(numIncress)}>ADD</button>
        <button onClick={(e) => this.decrement(10)}>CLEAR</button>
        <button onClick={(e) => this.props.history.push('/page')}>Next Path</button>
        <button onClick={(e) => this.props.history.push('/schoolXuser')}>Next School X User</button>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    stock: state.stock
  }
}
let mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increment(data) {
      dispatch({ type: "INCREMENT", value: data })
    },
    decrement(data) {
      dispatch({ type: "DECREMENT", value: data })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
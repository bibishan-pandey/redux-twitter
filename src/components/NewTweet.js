import React, { Component } from "react";

class NewTweet extends Component {
  state = {
    text: "",
  };

  handleChange = (e) => {
    const text = e.currentTarget.value;
    this.setState(() => ({ text }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;

    // TODO: Add tweet to store
    console.log("New Tweet: ", text);
    this.setState(() => ({ text: "" }));

    // TODO: Redirect to home view after submitted
  };

  render() {
    const { text } = this.state;
    const charactersLeft = 280 - text.length;

    return (
      <div>
        <h3 className={"center"}>Compose new tweet</h3>
        <form className={"new-tweet"} onSubmit={this.handleSubmit}>
          <textarea
            placeholder={"What's happening?"}
            value={text}
            onChange={this.handleChange}
            className={"textarea"}
            maxLength={280}
          />
          {charactersLeft <= 100 && (
            <div className={"tweet-length"}>{charactersLeft}</div>
          )}
          <button type={"submit"} className={"btn"} disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewTweet;

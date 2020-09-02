import React from "react";
import "./HashtagInput.css";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

const HashtagInput = props => {
  return (
    <div>
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">#</InputGroupAddon>
        <Input
          className="sizeInput"
          value={props.title}
          placeholder="Your Tag !"
          onChange={props.onInputContent}
          type="text"
        />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={props.onXClick}>
            X
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <div className="buttonPosition">
        <Button
          href="#titleHashtag"
          className="w-25 mt-5"
          color="primary"
          onClick={() => props.getTweet(props.title)}
        >
          <p className="buttonText">#Start</p>
        </Button>
      </div>
    </div>
  );
};

export default HashtagInput;

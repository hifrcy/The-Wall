import React, { Component } from "react";
import "./App.css";
import ModalHelp from "./ModalHelp";
import HashtagInput from "./HashtagInput";
import Footer from "./Footer";
import Header from "./Header";
import TweetCard from "./TweetCard";
import classnames from "classnames";
import {
  Container,
  Row,
  Col,
  CardColumns,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const tweetToPost = tweets => {
  return tweets.statuses.map(tweet => {
    const pictureMedia = tweet.entities.media
      ? tweet.entities.media[0].media_url
      : "N/A";
    return {
      picture: pictureMedia,
      message: tweet.full_text,
      author: tweet.user.name,
      logo: tweet.user.profile_image_url,
      likeNb: tweet.favorite_count,
      rtNb: tweet.retweet_count,
      id: `@${tweet.user.screen_name}`
    };
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postlike: [],
      title: "",
      isTweetPageDisplayed: false,
      activeTab: "1"
    };
    this.handleClickNewButton = this.handleClickNewButton.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  getTweet = hashtag => {
    fetch(`https://safe-savannah-17783.herokuapp.com/?tag=${hashtag}`)
      .then(results => results.json()) // conversion du résultat en JSON
      .then(data => {
        this.setState({
          posts: tweetToPost(data),
          postlike: tweetToPost(data),
          isTweetPageDisplayed: true
        });
      });
  };

  handleClickNewButton() {
    this.setState({ isTweetPageDisplayed: false });
  }

  handleXClick = event => {
    this.setState({
      title: event.target.value.replace(/""/)
    });
  };

  handleInputContent = event => {
    this.setState({
      title: event.target.value.replace(
        /[^A-Za-z0-9\u00E8\u00E9\u00EA\u00EB\u00E0\u00E1\u00E2\u00E3\u00E4\u00EF\u00EE\u00FB\u00FC\u00F4\u00F6]/gi,
        ""
      )
    });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.isTweetPageDisplayed ? (
          <Container fluid style={{ height: "100vh" }}>
            <Row className="justify-content-center">
              <Header />
            </Row>
            <Row className="justify-content-center hashtagRow">
              <Col sm="6">
                <HashtagInput
                  title={this.state.title}
                  onInputContent={this.handleInputContent}
                  getTweet={this.getTweet}
                  onXClick={this.handleXClick}
                />
              </Col>
            </Row>

            <Row className="footerPosition w-100">
              <ModalHelp />

              <Footer />
            </Row>
          </Container>
        ) : (
          <Container fluid className="tweet" style={{ height: "100vh" }}>
            <Row id="wallHeader" style={{ color: "white" }}>
              <h1 id="titleHashtag" className="mt-2">
                #{this.state.title}
              </h1>

              <Button onClick={this.handleClickNewButton} color="primary">
                <p className="textButton ">#New</p>
              </Button>
            </Row>
            <Nav tabs className="navTabs d-flex justify-content-center">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Tweets
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Top tweets
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <CardColumns>
                  {this.state.posts.map(post => (
                    <TweetCard {...post} />
                  ))}
                </CardColumns>
              </TabPane>
              <TabPane tabId="2">
                <Row className="justify-content-center">
                  <Col xs={{ size: 4 }}>
                    {/* <CardDeck style={{ width: "50rem" }}> */}
                    {this.state.postlike
                      .sort(function(a, b) {
                        return a.likeNb - b.likeNb;
                      })
                      .reverse()
                      .map(postTopTweet => <TweetCard {...postTopTweet} />)
                      .slice(0, 10)}
                    {/* </CardDeck> */}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        )}
      </div>
    );
  }
}

export default App;

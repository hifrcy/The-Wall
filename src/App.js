import React, { Component } from "react";
import "./App.css";
import ModalHelp from "./ModalHelp";
import HashtagInput from "./HashtagInput";
import Footer from "./Footer";
import Header from "./Header";
import TweetCard from "./TweetCard";
import TweetModal from "./TweetModal";
import classnames from "classnames";
import Scrollchor from "react-scrollchor";
import openSocket from "socket.io-client";
import {
  Container,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import Masonry from "react-masonry-component";

const createPost = tweet => {
  const pictureMedia = tweet.entities.media
    ? tweet.entities.media[0].media_url
    : "N/A";
  return {
    picture: pictureMedia,
    message: tweet.text ? tweet.text : tweet.full_text,
    author: tweet.user.name,
    logo: tweet.user.profile_image_url,
    likeNb: tweet.favorite_count,
    rtNb: tweet.retweet_count,
    userName: `@${tweet.user.screen_name}`,
    date: tweet.created_at
      .split(" ")
      .splice(0, 4)
      .join(" ")
  };
};

const tweetToPost = tweets => {
  return tweets.statuses.map(createPost);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postlike: [],
      postPics: [],
      title: "",
      isTweetPageDisplayed: false,
      isLoading: false,
      activeTab: "1",
      selectedTweet: null,
      modal: false
    };
    this.newTweets = [];
    this.handleClickNewButton = this.handleClickNewButton.bind(this);
    this.handleTweetToModal = this.handleTweetToModal.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getTweet = hashtag => {
    this.setState({
      isLoading: true
    });
    fetch(`http://localhost:5000?tag=${hashtag}`)
      .then(results => results.json()) // conversion du résultat en JSON
      .then(data => {
        this.setState({
          posts: tweetToPost(data),
          postlike: tweetToPost(data),
          postPics: tweetToPost(data),
          isTweetPageDisplayed: true,
          isLoading: false
        });
        this.socket = openSocket("http://localhost:5050");

        console.log("hashtag" + hashtag);
        this.socket.on(`#${hashtag}`, data => {
          console.log("data", data);
          this.newTweets = [createPost(data), ...this.newTweets];
          console.log("socket", this.newTweets);
          // this.setState({ posts: newList });
        });
      });
  };
  componentDidMount() {
    setInterval(() => {
      if (this.newTweets.length > 0) {
        this.newTweets = [...this.newTweets, ...this.state.posts];
        this.setState({ posts: this.newTweets });
        console.log("newTweets", this.newTweets);
      }

      this.newTweets = [];

      //parcourire le tableau newtweets si il a des tweets ajouter newtweets a posts puis vider newtweets
    }, 3000);
  }
  handleClickNewButton() {
    this.socket = null;
    this.setState({ isTweetPageDisplayed: false, title: "", activeTab: "1" });
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

  handleTweetToModal(tweet) {
    this.setState({
      selectedTweet: tweet,
      modal: !this.state.modal
    });
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  closeModal() {
    this.setState({
      modal: false
    });
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
              <Col sm={{ size: 6 }}>
                <HashtagInput
                  title={this.state.title}
                  onInputContent={this.handleInputContent}
                  getTweet={this.getTweet}
                  onXClick={this.handleXClick}
                  startLoad={this.state.isLoading}
                />
              </Col>
            </Row>
            <Row />
            <Row className="footerPosition w-100">
              <ModalHelp />

              <Footer />
            </Row>
          </Container>
        ) : (
          <Container fluid className="tweet" style={{ height: "100vh" }}>
            {this.state.selectedTweet !== null && (
              <TweetModal
                picture={this.state.selectedTweet.picture}
                author={this.state.selectedTweet.author}
                userName={this.state.selectedTweet.userName}
                logo={this.state.selectedTweet.logo}
                likeNb={this.state.selectedTweet.likeNb}
                rtNb={this.state.selectedTweet.rtNb}
                date={this.state.selectedTweet.date}
                message={this.state.selectedTweet.message}
                modal={this.state.modal}
                closeModal={this.closeModal}
              />
            )}

            <Row id="wallHeader" style={{ color: "white" }}>
              <h1 className="mt-2">#{this.state.title}</h1>

              <Button onClick={this.handleClickNewButton} color="primary">
                <p className="textButton">#New</p>
              </Button>
            </Row>

            <Nav tabs className="navTabs d-flex justify-content-center">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames("navlink", {
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                >
                  Tweets
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames("navlink", {
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                >
                  Top tweets
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames("navlink", {
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => {
                    this.toggleTab("3");
                  }}
                >
                  Pictures
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Masonry
                  options={{ fitWidth: true }}
                  style={{ margin: "auto" }}
                >
                  {this.state.posts.map((post, index) => (
                    <TweetCard
                      {...post}
                      tweetToModal={this.handleTweetToModal}
                      key={index}
                    />
                  ))}
                </Masonry>

                <Scrollchor to="#wallHeader" className="toTheTopLayout">
                  <img
                    src="images/arrow-alt-circle-up-regular.svg"
                    alt="toTheTopp"
                    className="buttonToTheTop"
                  />
                </Scrollchor>
              </TabPane>
              <TabPane tabId="2">
                <Masonry
                  options={{ fitWidth: true }}
                  style={{ margin: "auto" }}
                >
                  {this.state.postlike
                    .sort(function(a, b) {
                      return b.likeNb - a.likeNb;
                    })
                    .slice(0, 10)
                    .map((postTopTweet, index) => (
                      <TweetCard
                        {...postTopTweet}
                        tweetToModal={this.handleTweetToModal}
                        key={index}
                      />
                    ))}
                </Masonry>

                <Scrollchor to="#wallHeader" className="toTheTopLayout">
                  <img
                    src="images/arrow-alt-circle-up-regular.svg"
                    alt="toTheTopp"
                    className="buttonToTheTop"
                  />
                </Scrollchor>
              </TabPane>
              <TabPane tabId="3">
                <Masonry
                  options={{ fitWidth: true }}
                  style={{ margin: "auto" }}
                >
                  {this.state.postPics.map(
                    (postPicsTweet, index) =>
                      postPicsTweet.picture !== "N/A" && (
                        <TweetCard
                          picture={postPicsTweet.picture}
                          author={postPicsTweet.author}
                          logo={postPicsTweet.logo}
                          likeNb={postPicsTweet.likeNb}
                          rtNb={postPicsTweet.rtNb}
                          date={postPicsTweet.date}
                          userName={postPicsTweet.userName}
                          message={postPicsTweet.message}
                          tweetToModal={this.handleTweetToModal}
                          hideText //écris tel quel vaut "true"
                          key={index}
                        />
                      )
                  )}
                </Masonry>

                <Scrollchor to="#wallHeader" className="toTheTopLayout">
                  <img
                    src="images/arrow-alt-circle-up-regular.svg"
                    alt="toTheTopp"
                    className="buttonToTheTop"
                  />
                </Scrollchor>
              </TabPane>
            </TabContent>
            <Footer />
          </Container>
        )}
      </div>
    );
  }
}

export default App;

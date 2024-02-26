import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import 'reactjs-popup/dist/index.css'

import {
  Container,
  CardContainer,
  Card,
  Text,
  ScoreCard,
  ScoreText,
  Score,
  PlayingGameContainer,
  ImageCard,
  Image,
  Button,
  ResultViewContainer,
  Heading,
  ResultText,
  PlayAgainButton,
  RulesButton,
  RulesImage,
  CloseButton,
  RulesCon,
  ResultCardContainer,
  PopupContainer,
  // eslint-disable-next-lines
} from './styledcomponent'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class RockPaperScissorGame extends Component {
  state = {
    score: 0,
    myChoice: '',
    opponentChoice: '',
    initialState: 'playingView',
    gameResult: '',
  }

  onClickScissorButton = () => {
    console.log('Ra')
    const opponentChoice = choicesList[Math.floor(Math.random() * 2)].id
    console.log(opponentChoice)
    this.setState(
      {
        opponentChoice,
        myChoice: 'SCISSORS',
      },
      this.getGameResult,
    )
  }

  onClickRockButton = () => {
    const opponentChoice = choicesList[Math.floor(Math.random() * 2)].id
    console.log(opponentChoice)
    this.setState(
      {
        opponentChoice,
        myChoice: 'ROCK',
      },
      this.getGameResult,
    )
  }

  onClickPaperButton = () => {
    const opponentChoice = choicesList[Math.floor(Math.random() * 2)].id
    console.log(opponentChoice)
    this.setState(
      {
        opponentChoice,
        myChoice: 'PAPER',
      },
      this.getGameResult,
    )
  }

  onClickPlayAgainButton = () => {
    this.setState({
      score: 0,
      myChoice: '',
      opponentChoice: '',
      initialState: 'playingView',
      gameResult: '',
    })
  }

  getGameResult = () => {
    console.log('BBBBBBBBBBBB')
    const {myChoice, opponentChoice} = this.state
    console.log(myChoice)
    console.log(opponentChoice)
    if (myChoice === 'ROCK' && opponentChoice === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameResult: 'YOU WON',
        initialState: 'resultView',
      }))
    } else if (myChoice === 'SCISSORS' && opponentChoice === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameResult: 'YOU WON',
        initialState: 'resultView',
      }))
    } else if (myChoice === 'PAPER' && opponentChoice === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameResult: 'YOU WON',
        initialState: 'resultView',
      }))
    } else if (myChoice === opponentChoice) {
      this.setState({
        score: 0,
        gameResult: 'IT IS DRAW',
        initialState: 'resultView',
      })
    } else {
      this.setState(prevState => ({
        score: prevState.score - 1,
        gameResult: 'YOU LOSS',
        initialState: 'resultView',
      }))
    }
  }

  renderPlayingView = () => (
    <PlayingGameContainer>
      <ImageCard>
        <Button data-testid="rockButton" onClick={this.onClickRockButton}>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png"
            alt="ROCK"
          />
        </Button>
        <Button
          data-testid="scissorsButton"
          onClick={this.onClickScissorButton}
        >
          <Image
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png"
            alt="SCISSORS"
          />
        </Button>
      </ImageCard>
      <Button data-testid="paperButton" onClick={this.onClickPaperButton}>
        <Image
          src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png"
          alt="PAPER"
        />
      </Button>
    </PlayingGameContainer>
  )

  renderResultView = () => {
    const {myChoice, opponentChoice, gameResult} = this.state
    console.log('NNNNNNNNNN')
    console.log(myChoice)
    console.log('RRRRRRRRRR')
    console.log(opponentChoice)
    const myChoiceImageList = choicesList.filter(each => {
      if (each.id === myChoice) {
        console.log(each.id)
        return each
      }
      return null
    })
    console.log(myChoiceImageList)
    const myChoiceImageUrl = myChoiceImageList[0].imageUrl
    const opponentChoiceImageList = choicesList.filter(
      each => each.id === opponentChoice,
    )
    const opponentChoiceImageUrl = opponentChoiceImageList[0].imageUrl
    return (
      <ResultViewContainer>
        <ResultCardContainer>
          <Card>
            <Heading> You </Heading>
            <Image src={myChoiceImageUrl} alt="your choice" />
          </Card>
          <Card>
            <Heading> Opponent Choice </Heading>
            <Image src={opponentChoiceImageUrl} alt="opponent choice" />
          </Card>
        </ResultCardContainer>
        <ResultText>{gameResult}</ResultText>
        <PlayAgainButton onClick={this.onClickPlayAgainButton}>
          Play Again
        </PlayAgainButton>
      </ResultViewContainer>
    )
  }

  renderGame = () => {
    const {initialState} = this.state
    switch (initialState) {
      case 'playingView':
        return this.renderPlayingView()
      case 'resultView':
        return this.renderResultView()
      default:
        return null
    }
  }

  render() {
    const {initialState, score} = this.state
    console.log(initialState)
    return (
      <Container>
        <CardContainer>
          <Card>
            <Text>
              Rock
              <br />
              Rock Paper Scissors
              <br />
              Scissors
            </Text>
          </Card>
          <ScoreCard>
            <ScoreText> Score </ScoreText>
            <Score> {score} </Score>
          </ScoreCard>
        </CardContainer>
        {this.renderGame()}
        <PopupContainer>
          <Popup trigger={<RulesButton type="button">Rules</RulesButton>}>
            {close => (
              <RulesCon>
                <CloseButton type="button" onClick={() => close()}>
                  <RiCloseLine color="black" />
                </CloseButton>
                <RulesImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </RulesCon>
            )}
          </Popup>
        </PopupContainer>
      </Container>
    )
  }
}

export default RockPaperScissorGame

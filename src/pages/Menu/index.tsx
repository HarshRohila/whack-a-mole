import { styled } from "@app/libs/style"
import { GamePageService } from "@app/services/GamePageService"
import { FC } from "react"
import { Button } from "@app/components/Button"
import { Play } from "@app/components/Icons"
import mole from "@app/assets/mole-head.png"
import whack from "@app/assets/whack.png"

interface MenuProps {}

const StyledMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  li {
    padding: 10px 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  img {
    width: 100%;
  }
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px;
  img {
    width: 300px;
  }
  .mole-img {
    width: 50%;
  }
`

const Menu: FC<MenuProps> = () => {
  return (
    <Container>
      <LogoContainer>
        <img src={whack} alt="whack" />
        <img src={mole} className="mole-img" alt="mole" />
      </LogoContainer>
      <h1>Whack a Mole!</h1>
      <StyledMenu>
        <li>
          <StartBtn />
        </li>
      </StyledMenu>
    </Container>
  )
}

function StartBtn() {
  const handleClick = () => {
    GamePageService.startGame()
  }

  return (
    <Button onClick={handleClick} icon={Play}>
      Play Game
    </Button>
  )
}

export { Menu }

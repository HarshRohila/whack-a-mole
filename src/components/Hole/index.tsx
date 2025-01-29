import { css, styled } from "@app/libs/style"
import { GamePageService } from "@app/services/GamePageService"
import React, { FC } from "react"
import dirt from "@app/assets/mole-hill.png"
import mole from "@app/assets/mole-head.png"
import whack from "@app/assets/whack.png"
import moleWhackSound from "@app/assets/whack.mp3"
import Config from "@app/config"
import { desktopCss } from "@app/utils/desktop-css"
interface HoleProps {
  showMole: boolean
}

const StyledHole = styled.div<{ $showMole: boolean }>`
  width: 120px;
  ${desktopCss(css`
    width: 300px;
  `)}

  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  overflow: hidden;
  .mole {
    width: 59%;
    overflow: hidden;

    position: relative;

    top: 19px;
    left: -4px;
    ${desktopCss(css`
      top: 47px;
      left: -11px;
    `)}

    img.mole-img {
      width: 100%;
      // apppy transition based on transform
      transition: transform 0.1s;

      transform: ${(props) =>
        props.$showMole ? "translateY(0)" : "translateY(50px)"};
      @media (min-width: 1025px) {
        transform: ${(props) =>
          props.$showMole ? "translateY(0)" : "translateY(130px)"};
      }
    }
  }
  .dirt {
    position: relative;
    width: 100%;
  }
`

const WhackImg = styled.img<{ $isWhacked: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: none;
  display: ${(props) => (props.$isWhacked ? "block" : "none")};
  z-index: 1;
`
const MoleContainer = styled.div`
  position: relative;
`

const Hole: FC<HoleProps> = (props) => {
  const [isWhacked, setIsWhacked] = React.useState(false)
  const [showMole, setShowMole] = React.useState(false)
  const whackSound = new Audio(moleWhackSound)

  React.useEffect(() => {
    setShowMole(props.showMole)
  }, [props.showMole])

  React.useEffect(() => {
    if (showMole) {
      setTimeout(() => {
        setShowMole(false)
      }, Config.MOLE_LIFE_TIME_IN_MS)
    }
  }, [showMole])

  const handleClick = () => {
    if (showMole) {
      GamePageService.setScore((prev) => prev + 1)
      setIsWhacked(true)
      setShowMole(false)
      whackSound.play()
      setTimeout(() => setIsWhacked(false), 500)
    }
  }

  return (
    <StyledHole onClick={handleClick} $showMole={showMole}>
      <MoleContainer className="mole">
        <WhackImg $isWhacked={isWhacked} src={whack} alt="whack" />
        <img src={mole} className="mole-img" alt="mole" />
      </MoleContainer>
      <img src={dirt} className="dirt" alt="dirt" />
    </StyledHole>
  )
}

export { Hole }

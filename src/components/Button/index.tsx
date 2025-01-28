import { styled } from "@app/libs/style"
import React, { FC } from "react"
import Button from "react-bootstrap/Button"

interface ButtonProps {
  variant?: "primary" | "secondary"
  onClick?: () => void
  children: React.ReactNode
  icon?: React.FC
}

const StyledButton = styled(Button)`
  display: flex;
  > svg {
    padding-left: 5px;
  }
`

const ButtonComponent: FC<ButtonProps> = (props) => {
  const Icon = props.icon

  return (
    <StyledButton onClick={props.onClick} variant={props.variant}>
      {props.children}
      {!!Icon && <Icon />}
    </StyledButton>
  )
}

export { ButtonComponent as Button }

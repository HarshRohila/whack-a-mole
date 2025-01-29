import { css, RuleSet } from "@app/libs/style"

function desktopCss(styles: RuleSet): RuleSet {
  return css`
    @media (min-width: 1025px) {
      ${styles}
    }
  `
}

export { desktopCss }

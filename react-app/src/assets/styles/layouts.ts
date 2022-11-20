import styled from "styled-components"
import { colors } from "./styles"

const MainLayout = {
  Container: styled.div`
    display: table;
    table-layout: fixed;
    width: 100%;
    height: 770px;
    color: rgb(242, 245, 247);
    background-color: rgb(42, 63, 84);
  `,
  LeftSide: styled.div`
    display: table-cell;
    width: 300px;
    min-width: 300px;
    max-width: 500px;
    height: 100%;
  `,
  RightSide: styled.div`
    display: table-cell;
    height: 100%;
    background: rgb(247, 247, 247);
    color: ${colors.$textColor}
  `
}

const RightFloat = styled.div`
  float: right
`

export {
  MainLayout,
  RightFloat
}

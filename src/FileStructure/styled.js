import styled from 'styled-components'


export const Wrapper = styled.div`
  position: relative;
  padding-top: 15px;
  height: calc(100% - 15px);
`

export const Inner = styled.div`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: linear-gradient(
      0deg,
      #2a2a2a 25%, #323232 25%,
      #323232 50%, #2a2a2a 50%,
      #2a2a2a 75%, #323232 75%,
      #323232 100%
    );
    background-size: 160.00px 160.00px;
  }
`

export const TreeWrapper = styled.div`
  position: relative;
  left: -17px;

  > * > *:before {
    display: none;
  }
`

export const Node = styled.div`
  padding-left: 20px;
  position: relative;
  overflow: hidden;
  height: ${({ isExpanded }) => !isExpanded ? '40px' : 'auto'};

  /* Vertical tree line */
  &:before {
    position: absolute;
    content: ${({ hasVerticalLine }) => hasVerticalLine ? '""' : 'none'};
    background-color: #4A4A4A;
    z-index: -1;
    width: 1px;
    height: calc(100% - 44px);
    top: 25px;
    left: 35px;
  }
`

export const NodeRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
  cursor: pointer;
  position: relative;
  background-color: ${({ isReadyToDrop }) => isReadyToDrop ? '#FF820E55' : 'transparent'};

  /* Horizontal tree line */
  &:before {
    position: absolute;
    content: '';
    height: 1px;
    width: 26px;
    background-color: #4A4A4A;
    top: 15px;
    left: -5px;
    z-index: -1;
  }
`

export const Arrow = styled.div`
  width: 30px;
  height: 39px;
  display: flex;
  align-items: center;

  > * {
    margin-left: 1px;
  }
`

export const ArrowFiller = styled.div`
  width: 20px;
  height: 30px;
`

export const ArrowFillerRealtime = styled.div`
  width: 1px;
`

export const CheckboxWrapper = styled.div`
  margin-left: 4px;
`

export const NodeName = styled.div`
  width: 100%;

  input {
    cursor: ${({ disabled }) => disabled ? 'pointer' : 'text'};
    background-color: ${({ disabled }) => disabled ? 'transparent' : '#fff'};
    border: 0;
    color: ${({ disabled }) => disabled ? '#aaa' : '#333'};
    font-size: inherit;
    padding-top: 0;
    padding-bottom: 0;
    outline: 0;
    width: calc(100% - 10px);
  }
`

export const NoData = styled.div`
  margin-left: 20px;
`

export const IconWrapper = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
`

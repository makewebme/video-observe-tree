import styled from 'styled-components'

import check from './img/check.svg'


export const Wrapper = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: #5d6484;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
`

export const Box = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid #727272;
  border-radius: 3px;
  margin-right: ${({ hasNoChildren }) => hasNoChildren ? '' : '10px'};
  transition: border 0.2s ease-out;
  flex-shrink: 0;
  background-color: #2a2a2a;
`

export const NativeCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  position: absolute;
  appearance: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  background-color: #fff;
  margin: 0;

  & ~ div {
    transition: filter 0.2s ease-out, background-color 0.2s ease-out;
  }

  &:checked ~ div {
    background-image: url(${check});
    background-color: #FF9F15;
    background-position: 1px 2px;
    background-repeat: no-repeat;
  }

  &:checked + ${Box} {
    border: 2px solid #FF9F15;
  }
`

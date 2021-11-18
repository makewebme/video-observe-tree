import styled from 'styled-components'


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
`

export const FileStructureOuter = styled.div`
  position: relative;
`

export const FileStructureWrapper = styled.div`
  height: 300px;
  overflow-y: overlay;
  border: 1px solid #3f3f3f;

  &::-webkit-scrollbar {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 17px;
  }
`

export const Label = styled.div`
  position: absolute;
  background-color: #2a2a2a;
  top: -10px;
  left: 30px;
  padding: 0 10px;
`

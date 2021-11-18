import FileStructure from './FileStructure'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { get } from './request'
import { Container, FileStructureWrapper, FileStructureOuter, Label } from './App.styled'


const App = () => {
  const showAlert = (message) => toast.info(message)

  const resetTree = () => {
    get('/tree/reset')
      .then((res) => {
        if (res.status === 'ok') {
          window.location.reload()
        } else {
          showAlert('Tree not reset')
        }
      })
  }


  return (
    <Container>
      <br/><br/><br/>

      <button onClick={resetTree}>
        Reset tree to initial
      </button>

      <br/><br/><br/>

      <FileStructureOuter>
        <Label>Камеры</Label>

        <FileStructureWrapper>
          <FileStructure showAlert={showAlert} />
        </FileStructureWrapper>
      </FileStructureOuter>

      <ToastContainer />
    </Container>
  )
}

export default App

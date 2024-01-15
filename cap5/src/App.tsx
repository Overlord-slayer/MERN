import { Routes, Route } from 'react-router-dom'

import Layout from '@components/layout'
import Public from '@components/public'
import LogIn from '@features/auth/login'
import DashLayout from '@components/dashLayout'
import Welcome from '@features/auth/welcome'
import NoteList from '@features/notes/noteList'
import UsersList from '@features/users/usersList'

function App() {

  return (
    <Routes>
       {/* Ruta principal '/' con el componente Layout */}
      <Route path="/" element={<Layout />}>
         {/* Ruta por defecto dentro de '/' con el componente Public */}
        <Route index element={<Public />} />

         {/* Ruta '/login' con el componente LogIn */}
        <Route path='login' element={<LogIn />}/>

        {/* Ruta '/dash' con el componente DashLayout */}
        <Route path='dash' element={<DashLayout />}>

           {/* Ruta por defecto dentro de '/dash' con el componente Welcome */}
          <Route index element={<Welcome />} />

          {/* Ruta '/dash/notes' con el componente NoteList */}
          <Route path='notes'>
            <Route index element={<NoteList />}></Route>
          </Route>

           {/* Ruta '/dash/users' con el componente UsersList */}
          <Route path='users'>
            <Route index element={<UsersList />}></Route>
          </Route>

        </Route> {/* Fin del Dash */}

      </Route>
    </Routes>
  )
}

export default App

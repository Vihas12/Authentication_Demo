import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth';
import {redirect} from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

const App = async () => {
  const sessions = await getServerSession(authOptions);

  if (sessions) {
    redirect('/dashboard');
  }
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default App

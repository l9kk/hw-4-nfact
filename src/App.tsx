import { useEffect } from 'react'
import './App.css'
import { useThemeStore } from './store/themeStore'
import Header from './components/Header'
import FeedbackForm from './components/FeedbackForm'
import Controls from './components/Controls'
import FeedbackList from './components/FeedbackList'
import WeeklyStats from './components/WeeklyStats'

function App() {
  const theme = useThemeStore((state) => state.theme);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <FeedbackForm />
        <Controls />
        <WeeklyStats />
        <FeedbackList />
      </main>
    </div>
  )
}

export default App

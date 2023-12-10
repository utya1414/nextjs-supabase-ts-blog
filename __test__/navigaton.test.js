import { render, screen } from '@testing-library/react'
import Navigation from '@/app/components/navigation'
import '@testing-library/jest-dom'
 
describe('ナビゲーションのテスト', () => {
  it('Jitumuがレンダリングされているか', () => {
    render(<Navigation session={null} user={null} profile={null}/>)
    expect(screen.getByText('Jitumu')).toBeInTheDocument()
  })
})
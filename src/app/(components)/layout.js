const Layout = ({ children }) => {
  return (
    <aside className='bg-black/40 w-[400px] flex flex-col relative overflow-y-auto'>
      {children}
    </aside>
  )
}

export default Layout

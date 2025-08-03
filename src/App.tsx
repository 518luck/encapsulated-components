import CopyToClipboadrd from './CopyToClipboadrd'

export default function App() {
  return (
    <div>
      <CopyToClipboadrd
        text='这个是APP复制的内容'
        onCopy={(e, result) => {
          console.log('🚀 ~ App ~ e:', e)
          console.log('🚀 ~ App ~ result:', result)
        }}
        options={{
          debug: true,
          message: 'Press #{key} to copy',
        }}>
        <p onClick={() => alert(1)}>测试</p>
      </CopyToClipboadrd>
    </div>
  )
}

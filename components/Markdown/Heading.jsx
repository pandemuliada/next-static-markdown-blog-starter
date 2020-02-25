export default (props) => {
  if (props.level == 1) return <h1 {...props} className='mt-6 mb-4 font-medium text-gray-800 text-5xl'>{props.children}</h1> 
  if (props.level == 2) return <h2 {...props} className='mt-6 mb-4 font-medium text-gray-800 text-4xl'>{props.children}</h2> 
  if (props.level == 3) return <h3 {...props} className='mt-6 mb-4 font-medium text-gray-800 text-2xl'>{props.children}</h3>
}
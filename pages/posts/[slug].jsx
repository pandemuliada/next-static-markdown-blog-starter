import Head from 'next/head'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

const Paragraph = ({ children }) => <p>{children}</p>

const Heading = (props) => {
  if (props.level == 1) return <h1 className='mt-6 mb-4 font-medium text-gray-800 text-5xl'>{props.children}</h1> 
  if (props.level == 2) return <h2 className='mt-6 mb-4 font-medium text-gray-800 text-4xl'>{props.children}</h2> 
  if (props.level == 3) return <h3 className='mt-6 mb-4 font-medium text-gray-800 text-2xl'>{props.children}</h3>

  const CustomHeading = ReactMarkdown.renderers.heading
  return <CustomHeading {...props}/>
}

const BlockCode = (props) => {
  const CustomPre = ReactMarkdown.renderers.code
  
  return <div className='bg-gray-200 p-4 overflow-y-auto my-6 text-gray-700'>
    <CustomPre {...props}/>
  </div>
}

const InlineCode = (props) => <code className='bg-gray-200 px-1 text-gray-700'>{props.children}</code>

const styles = {
  title: 'text-4xl md:text-5xl font-medium text-gray-800 my-5',
  container: 'w-10/12 mx-auto md:w-1/4'
}

const PostDetail = (props) => {
  const { 
    content, 
    data
  } = props
  
  return (<div>
    <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.description}/>
      <meta property="og:url" content={`/posts/${data.slug}`}/>
      <meta property="og:title" content={data.title}/>
      <meta property="og:description" content={data.description}/>
      <meta property="og:type" content="article"/>
      {data.heroImage && <meta property="og:image" content={data.heroImage}/>}
    </Head>

    <div className={styles.container + ' mb-5'}>
      <h2 className={styles.title}>{data.title}</h2>
      {data.heroImage && <img src={data.heroImage} alt={data.title}/>}
    </div>

    <div className={styles.container}>

      <ReactMarkdown 
        source={content}
        parserOptions={{ commonmark: true }}
        renderers={{
          paragraph: Paragraph,
          heading: Heading,
          code: BlockCode,
          inlineCode: InlineCode
        }}
        />
    </div>

    {!!data.categories && <div className={styles.container + ' mt-12'}>
      {data.categories.map((category, index) => <span key={index} className='bg-gray-200 text-gray-700 py-2 px-3 mr-3 inline-block text-sm'>{category}</span>)}
    </div>}
    

    {!!data.author && <div className={styles.container + ' mb-8'}>
      <hr className='my-6'/>
      <span className='text-gray-600'>Written by</span>
      <h3 className='text-2xl font-bold mb-2 text-gray-700'>{data.author.name}</h3>
      <p>{data.author.bio}</p>
    </div>}


  </div>)
}

export default PostDetail

PostDetail.getInitialProps = async (context) => {
  const { slug } = context.query

  const content = await import(`../../posts/${slug}.md`)
  const data = matter(content.default)

  return {
    ...data // it returns { content: "string", data: { title, date, ... } }
  }
}
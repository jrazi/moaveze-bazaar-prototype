import Page from '@/components/page'
import PostCard from '@/components/post-card'
import Section from '@/components/section'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const imageUrls = [
  'https://s100.divarcdn.com/static/photo/afra/post/mtZDUgEd0x_HKHO1xgh4ig/0f80d6ea-1b4d-486c-82d1-ae7abbf2f143.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/rD3SUjBqv4x3fQNC1Lhmag/2f7f7c4f-7593-4af4-89ed-3230d3f4cf35.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/Z4qTiLTDhH7l78fIxBLnIg/28a3ea49-d193-4093-ae9a-fc1ccb2da099.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/V2MN6CeAlb-sENzBP61mbA/3a1cab43-ef58-4446-a499-4f76335b9529.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/Z8CiEpxWrIGk6BgBL5EtKw/9244bfc9-5f6a-42c5-b029-c2e92f71cdf7.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/clI9WX9KFtHNDaiY8EUypg/1d6e5f8f-6662-4a00-bd48-065565f4c0e8.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/2bsAF5lYxyMpY8xGdkAoNQ/ebe6f1b0-f01d-4636-87b9-0987fad1dda1.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/Cff_n6V0ag7YOQKiEWDVtQ/acf39960-bbb3-40ce-9d50-3f377f7c1e9b.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/O-yuVdsjQAsox80yQ0YPlQ/2eb77237-d8bf-4d66-9b2e-a8044294937b.jpg',
  'https://s100.divarcdn.com/static/photo/afra/post/S9SHtUh8hg1955dsOZF2Fg/97adf8f2-f5bf-4835-b88e-e51ac18f17cf.jpg'
]

const Results = () => {
  const router = useRouter()

  const handleBackButtonClick = () => {
    router.back()
  }

  const [numPosts, setNumPosts] = useState(0)

  useEffect(() => {
    // Generate a random number with normal distribution between 15 and 250
    const mean = 132.5
    const stdDev = 30
    const randomNormal = () => {
      let u = 0, v = 0
      while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random()
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    }
    const randomNum = Math.round(mean + stdDev * randomNormal())
    const boundedRandomNum = Math.max(15, Math.min(250, randomNum))
    setNumPosts(boundedRandomNum)
  }, [])

  // Mock data for posts
  const posts = Array.from({ length: numPosts }, (_, index) => ({
    id: index + 1,
    title: `عنوان پست ${index + 1}`,
    description: `این یک توضیحات برای پست ${index + 1} است. این بخش شامل توضیحات مختصری از پست می‌باشد.`,
    price: Math.round(Math.random() * 10000000),
    imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
  }))

  return (
    <Page>
      <Section>
        <button
          className='mb-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full'
          onClick={handleBackButtonClick}>
          بازگشت
        </button>

        <h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
          نتایج معاملات
        </h2>

        <p className='mt-4 text-zinc-600 dark:text-zinc-400'>
          {numPosts} پست برای مبادله باز است و آیتم‌های دلخواه شما به طور متقابل مطابقت نزدیک دارند. آیا می‌خواهید این پست‌ها را باز کنید؟
        </p>

        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.slice(0, 10).map(post => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              price={post.price}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </Section>
    </Page>
  )
}

export default Results

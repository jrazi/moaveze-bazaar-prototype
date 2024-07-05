import Page from '@/components/page'
import PostCard from '@/components/post-card'
import Section from '@/components/section'
import { data } from '@/components/staticData'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

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
	'https://s100.divarcdn.com/static/photo/afra/post/S9SHtUh8hg1955dsOZF2Fg/97adf8f2-f5bf-4835-b88e-e51ac18f17cf.jpg',
]

const Results = () => {
	const router = useRouter()
	const [isPaid, setIsPaid] = useState(false)

	useEffect(() => {
		const res = router.query['isPaid']?.toString()
		setIsPaid(res === 'true')
	}, [router])

	const handleBackButtonClick = () => {
		router.push({
			pathname: '/',
		})
	}

	const handlePaymentClick = () => {
		const query = router.query
		router.push({
			pathname: '/payment',
			query: { ...query },
		})
	}

	const [numPosts, setNumPosts] = useState(0)

	useEffect(() => {
		// Generate a random number with normal distribution between 15 and 250
		const mean = 132.5
		const stdDev = 30
		const randomNormal = () => {
			let u = 0,
				v = 0
			while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
			while (v === 0) v = Math.random()
			return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
		}
		const randomNum = Math.round(mean + stdDev * randomNormal())
		const boundedRandomNum = Math.max(15, Math.min(250, randomNum))
		setNumPosts(boundedRandomNum)
	}, [])

	// Mock data for posts
	// const posts = Array.from({ length: numPosts }, (_, index) => ({
	// 	id: index + 1,
	// 	title: `عنوان پست ${index + 1}`,
	// 	description: `این یک توضیحات برای پست ${index + 1} است. این بخش شامل توضیحات مختصری از پست می‌باشد.`,
	// 	price: Math.round(Math.random() * 10000000),
	// 	imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
	// }))

	const posts = useMemo(() => {
		const categories = router.query['categories']?.toString().split(',')
		const fromPrice = +(router.query['fromPrice']?.toString() ?? 0)
		const toPrice = +(router.query['toPrice']?.toString() ?? 0)

		let temp = data.filter((item) =>
			categories?.includes(item.category_id.toString()),
		)

		temp = temp.filter(
			(item) => +item.price >= fromPrice && +item.price <= toPrice,
		)

		const posts = temp.map((item) => ({
			id: item.id,
			title: item.title,
			price: +item.price,
			imageUrl: item.image_url,
			link: item.link,
			categoryId: item.category_id,
		}))

		return posts
	}, [router])

	return (
		<Page>
			<Section>
				<button
					className='mb-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full'
					onClick={handleBackButtonClick}
				>
					بازگشت
				</button>

				<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
					نتایج معاملات
				</h2>

				{posts && (
					<p className='mt-4 text-zinc-600 dark:text-zinc-400'>
						{posts.length} پست برای مبادله باز است و آیتم‌های دلخواه شما به طور
						متقابل مطابقت نزدیک دارند.
						{!isPaid && <span> آیا می‌خواهید این پست‌ها را باز کنید؟</span>}
					</p>
				)}

				<div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{posts.map((post) => (
						<PostCard
							key={post.id}
							title={post.title}
							description={''}
							price={post.price}
							imageUrl={post.imageUrl}
							isPaid={isPaid}
							link={post.link}
						/>
					))}
				</div>

				{!isPaid && (
					<button
						onClick={handlePaymentClick}
						className='mt-8 px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold text-lg rounded-full flex items-center justify-center'
					>
						<span className='ml-2'>۵۰۰۰ تومان</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z'
							/>
						</svg>
					</button>
				)}
			</Section>
		</Page>
	)
}

export default Results

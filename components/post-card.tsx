import { useRouter } from 'next/router'
import React from 'react'

interface PostCardProps {
	title: string
	description: string
	price: number
	imageUrl: string
	isPaid: boolean
	link: string
}

const PostCard: React.FC<PostCardProps> = ({
	title,
	description,
	price,
	imageUrl,
	isPaid,
	link,
}) => {
	const { push } = useRouter()
	const clickHandler = () => {
		if (!isPaid) {
			alert('پرداختی انجام نشده است')
			return
		}
		push(link)
	}
	return (
		<div
			className='max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-800 m-2'
			onClick={clickHandler}
		>
			<div
				className='w-full h-48 bg-cover bg-center'
				style={{
					backgroundImage: `url(${imageUrl})`,
					filter: isPaid ? 'none' : 'blur(10px)',
				}}
			/>
			<div className='px-6 py-4'>
				<div className={`font-bold text-xl mb-2 ${!isPaid && 'blur-sm'}`}>
					{title}
				</div>
				<p
					className={`text-gray-700 text-base dark:text-zinc-200 ${!isPaid && 'blur-sm'}`}
				>
					{description}
				</p>
				<div className={`text-xl font-semibold mt-2 ${!isPaid && 'blur-sm'}`}>
					{price.toLocaleString('fa-IR')} تومان
				</div>
			</div>
		</div>
	)
}

export default PostCard

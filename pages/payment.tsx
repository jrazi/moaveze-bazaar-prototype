import Page from '@/components/page'
import Section from '@/components/section'
import { useRouter } from 'next/router'

const Payment = () => {
	const router = useRouter()

	const handleBackButtonClick = () => {
		router.push({
			pathname: '/results',
			query: { isPaid: true },
		})
	}

	return (
		<Page>
			<Section>
				<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
					صفحه پرداخت
				</h2>

				<p className='mt-4 text-zinc-600 dark:text-zinc-400'>
					پرداخت شما با موفقیت ثبت شد.
				</p>

				<button
					className='mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full'
					onClick={handleBackButtonClick}
				>
					بازگشت
				</button>
			</Section>
		</Page>
	)
}

export default Payment

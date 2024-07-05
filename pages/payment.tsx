import Page from '@/components/page'
import Section from '@/components/section'
import { useRouter } from 'next/router'

const Payment = () => {
  const router = useRouter()

  const handleBackButtonClick = () => {
    router.back()
  }

  return (
    <Page>
      <Section>
        <button
          className='mb-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full'
          onClick={handleBackButtonClick}>
          بازگشت
        </button>

        <h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
          صفحه پرداخت
        </h2>

        <p className='mt-4 text-zinc-600 dark:text-zinc-400'>
          شما در حال انجام عملیات پرداخت هستید. لطفاً اطلاعات پرداخت خود را وارد کنید.
        </p>
      </Section>
    </Page>
  )
}

export default Payment

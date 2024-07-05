import Page from '@/components/page'
import Section from '@/components/section'
import Tag from '@/components/tag'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Range, getTrackBackground } from 'react-range'

type ICategory = { label: string; value: number }

const Index = () => {
	const [rangeValues, setRangeValues] = useState<[number, number]>([
		0, 1_000_000_000,
	])
	const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([])
	const router = useRouter()

	const categories: ICategory[] = [
		{ label: 'ماشین', value: 1 },
		{ label: 'تکنولوژی', value: 2 },
		{ label: 'مسکن', value: 3 },
		{ label: 'موتور سیکلت', value: 4 },
		{ label: 'مبلمان', value: 5 },
		{ label: 'پوشاک', value: 6 },
		{ label: 'کتاب', value: 7 },
		{ label: 'لوازم آشپزخانه', value: 8 },
	]

	const handleCategoryChange = (category: ICategory) => {
		setSelectedCategories((prevCategories) =>
			prevCategories.some((item) => item.value === category.value)
				? prevCategories.filter((cat) => cat.value !== category.value)
				: [...prevCategories, category],
		)
	}

	const handleButtonClick = () => {
		router.push({
			pathname: '/results',
			query: {
				fromPrice: rangeValues[0],
				toPrice: rangeValues[1],
				categories: selectedCategories.map((item) => item.value).join(','),
			},
		})
	}

	return (
		<Page>
			<Section>
				<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
					انتخاب محدوده قیمت و دسته‌بندی‌ها
				</h2>

				<div className='mt-2 text-right'>
					<p className='text-zinc-600 dark:text-zinc-400'>
						لطفاً محدوده قیمت مورد نظر خود را وارد کنید:
					</p>
					<div className='flex justify-center mt-4'>
						<Range
							values={rangeValues}
							step={1_000_000}
							min={0}
							max={1_000_000_000}
							rtl={true}
							onChange={(values: number[]) =>
								setRangeValues([values[0], values[1]] as [number, number])
							}
							renderTrack={({ props, children }) => (
								<div
									onMouseDown={props.onMouseDown}
									onTouchStart={props.onTouchStart}
									style={{
										...props.style,
										height: '36px',
										display: 'flex',
										width: '100%',
									}}
								>
									<div
										ref={props.ref}
										style={{
											height: '5px',
											width: '100%',
											borderRadius: '4px',
											background: getTrackBackground({
												values: rangeValues,
												colors: ['#ccc', '#548BF4', '#ccc'],
												min: 0,
												max: 10000000,
												rtl: true,
											}),
											alignSelf: 'center',
										}}
									>
										{children}
									</div>
								</div>
							)}
							renderThumb={({ props, isDragged }) => (
								<div
									{...props}
									style={{
										...props.style,
										height: '24px',
										width: '24px',
										borderRadius: '12px',
										backgroundColor: '#FFF',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										boxShadow: '0px 2px 6px #AAA',
									}}
								>
									<div
										style={{
											height: '16px',
											width: '5px',
											backgroundColor: isDragged ? '#548BF4' : '#CCC',
										}}
									/>
								</div>
							)}
						/>
					</div>
					<div className='flex justify-between mt-2 text-zinc-600 dark:text-zinc-400'>
						<span>{rangeValues[0].toLocaleString('fa-IR')} تومان</span>
						<span>{rangeValues[1].toLocaleString('fa-IR')} تومان</span>
					</div>

					<p className='mt-4 text-zinc-600 dark:text-zinc-400'>
						لطفاً دسته‌بندی‌های مورد نظر خود را انتخاب کنید:
					</p>
					<div className='mt-2 grid grid-cols-2 gap-2'>
						{categories.map((category) => (
							<Tag
								key={category.value}
								label={category.label}
								isSelected={selectedCategories.some(
									(cat) => cat.value === category.value,
								)}
								onClick={() => handleCategoryChange(category)}
							/>
						))}
					</div>
				</div>

				<br />

				<button
					className='mb-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full'
					onClick={handleButtonClick}
				>
					نمایش نتایج
				</button>

				<p className='text-sm text-zinc-600 dark:text-zinc-400 text-right'>
					این صفحه برای کمک به انتخاب بهترین معاملات طراحی شده است. با وارد کردن
					محدوده قیمت و انتخاب دسته‌بندی‌های دلخواه، ما به شما پیشنهادات مناسبی
					ارائه خواهیم داد.
				</p>
			</Section>
		</Page>
	)
}

export default Index

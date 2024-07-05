import Page from '@/components/page'
import Section from '@/components/section'
import { useState } from 'react'
import { Range, getTrackBackground } from 'react-range'

const Index = () => {
  const [rangeValues, setRangeValues] = useState<[number, number]>([0, 10000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories: string[] = [
    'موبایل',
    'ماشین',
    'مسکن',
    'کامپیوتر',
    'موتور سیکلت',
    'مبلمان',
    'پوشاک',
    'کتاب',
    'لوازم آشپزخانه',
    'وسایل ورزشی'
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    )
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
              step={100000}
              min={0}
              max={10000000}
              onChange={(values: number[]) => setRangeValues([values[0], values[1]] as [number, number])}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '36px',
                    display: 'flex',
                    width: '100%'
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
                        max: 10000000
                      }),
                      alignSelf: 'center'
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
                    boxShadow: '0px 2px 6px #AAA'
                  }}
                >
                  <div
                    style={{
                      height: '16px',
                      width: '5px',
                      backgroundColor: isDragged ? '#548BF4' : '#CCC'
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
              <label key={category} className='flex items-center'>
                <input
                  type='checkbox'
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className='ml-2'
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <br />

        <p className='text-sm text-zinc-600 dark:text-zinc-400 text-right'>
          این صفحه برای کمک به انتخاب بهترین معاملات طراحی شده است. با وارد کردن
          محدوده قیمت و انتخاب دسته‌بندی‌های دلخواه، ما به شما پیشنهادات
          مناسبی ارائه خواهیم داد.
        </p>
      </Section>
    </Page>
  )
}

export default Index

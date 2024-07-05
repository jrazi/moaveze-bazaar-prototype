import React from 'react'

interface PostCardProps {
  title: string
  description: string
  price: number
  imageUrl: string
}

const PostCard: React.FC<PostCardProps> = ({ title, description, price, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-800 m-2">
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: 'blur(10px)',
        }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 blur-sm">{title}</div>
        <p className="text-gray-700 text-base dark:text-zinc-200 blur-sm">
          {description}
        </p>
        <div className="text-xl font-semibold mt-2 blur-sm">{price.toLocaleString('fa-IR')} تومان</div>
      </div>
    </div>
  )
}

export default PostCard
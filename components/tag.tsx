import React from 'react'

interface TagProps {
  label: string
  isSelected: boolean
  onClick: () => void
}

const Tag: React.FC<TagProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {label}
    </button>
  )
}


export default Tag;

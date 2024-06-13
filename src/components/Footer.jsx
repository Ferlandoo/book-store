import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className='ml-2'>Copyright © {currentYear} <a href="https://ferlando.me" className="text-red-500">Ferlando.me</a>. All rights reserved.</span>
        <div className="flex space-x-4 mr-2">
          <FaCcMastercard className='size-6' />
          <FaCcVisa className='size-6' />
        </div>
      </div>
    </footer>
  );
};

export default Footer

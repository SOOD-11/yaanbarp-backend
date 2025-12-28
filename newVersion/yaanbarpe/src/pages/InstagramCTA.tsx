import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramCTA = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-2xl shadow-lg w-full max-w-xl mx-auto my-12"
    >
      <div className="bg-white dark:bg-black text-center rounded-2xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-left mb-4 sm:mb-0 sm:mr-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Follow us on Instagram
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Get behind-the-scenes, reels, and cultural moments!
          </p>
        </div>
        <a
          href="https://instagram.com/yaanbarpe/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-pink-600 border border-pink-400 hover:bg-pink-50 px-4 py-2 rounded-full font-medium shadow-sm transition-all"
        >
          <Instagram size={20} />
          Visit Page
        </a>
      </div>
    </motion.div>
  );
};

export default InstagramCTA;
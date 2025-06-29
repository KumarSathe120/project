import React from 'react';

export default function Footer() {
  return (
    <footer className=" w-full bg-gray-200 shadow-inner py-4 px-6 flex flex-col sm:flex-row justify-center sm:justify-center items-center text-center text-sm sm:text-base">
      <span className="text-gray-700">
        © {new Date().getFullYear()}&nbsp;
        <strong>
          <a
            href="http://www.laddersoftsoftwaresolution.com"
            className="text-purple-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Laddersoft Software Solution
          </a>
        </strong>. All Rights Reserved.
      </span>
    </footer>
  );
}

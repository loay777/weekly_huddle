// import React from 'react';
// import { motion } from 'framer-motion';

// const EmployeesOfTheWeekMarquee = ({ 
//   employees, 
//   speed = 50,
//   className = ""
// }) => {
//   // Create the marquee text by formatting employees
//   const marqueeText = employees.length > 0 
//     ? `Employees of the week: ${employees.map(emp => `${emp.employeeName} ${emp.emoji}`).join(' - ')} -`
//     : "No employees selected this week";

//   // Duplicate the text to create a seamless loop
//   const displayText = `${marqueeText} ${marqueeText} ${marqueeText}`;

//   return (
//     <div className={`fixed bottom-0 left-0 w-full overflow-hidden bg-[#18181b] py-2 ${className}`}>
//       <motion.div
//         initial={{ x: '0%' }}
//         animate={{ x: '-50%' }}
//         transition={{
//           repeat: Infinity,
//           duration: displayText.length / speed,
//           ease: 'linear'
//         }}
//         className="flex whitespace-nowrap"
//       >
//         <span className="text-lg text-white/80 tracking-wider">
//           {displayText}
//         </span>
//       </motion.div>
//     </div>
//   );
// };

// export default EmployeesOfTheWeekMarquee;

import React, { useRef, useEffect, useState } from 'react';

const EmployeesOfTheWeekMarquee = ({ 
  employees, 
  speed = 50,
  className = ""
}) => {
  // Create the marquee text by formatting employees
  const marqueeText = employees.length > 0 
    ? ` *Employees of the week*: ${employees.map(emp => `${emp.employeeName} ${emp.emoji}`).join(' - ')}.\u00A0\u00A0\u00A0`
    : "No employees selected this week";

  return (
    <div className="fixed bottom-0 left-0 w-full overflow-hidden bg-[#18181b] py-2">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {marqueeText}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {marqueeText}
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS or create a separate CSS file
const styles = `
  .marquee-wrapper {
    display: flex;
    overflow: hidden;
    width: 100%;
  }

  .marquee-content {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    min-width: 100%;
    white-space: nowrap;
    animation: marquee 20s linear infinite;
    color: rgba(255,255,255,0.8);
    font-size: 1.125rem; /* text-lg equivalent */
    letter-spacing: 0.025em;
  }

  .marquee-wrapper:hover .marquee-content {
    animation-play-state: marquee 50s linear infinite;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

export default EmployeesOfTheWeekMarquee;
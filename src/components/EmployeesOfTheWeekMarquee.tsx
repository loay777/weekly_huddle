import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const EmployeesOfTheWeekMarquee = ({ 
    employees = [] as Array<{employeeName: string, emoji: string}>, 
}) => {
  // Create the marquee text by formatting employees
  const marqueeText =
    employees.length > 0
      ? `${employees
          .map((emp) => `${emp.employeeName} ${emp.emoji}`)
          .join("\u00A0 \u00A0|\u00A0\u00A0")}\u00A0 \u00A0\u00A0\u00A0`
      : "No employees selected this week";

  return (
    <div className="fixed bottom-0 left-0 w-full overflow-hidden ">
      <div className=" flex justify-start font-extrabold ">
        <div className="bg-[#18181b] rounded-tr-full pl-3 pr-6  pt-5 pb-2 flex gap-2 items-center">
          <motion.div
            animate={{
              // rotate: [, 360, 0,],
              scale: [1,1.2, 1, 1, 1,,1,1,1,1],
              rotateY: [0, 0, 0, 0, ,0,0,0,0,540 ],
            }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <Trophy size={27} />
          </motion.div>
        </div>
      </div>
      <div className="marquee-wrapper bg-[#18181b] py-2">
        <div className="marquee-content">{marqueeText}</div>
        <div className="marquee-content" aria-hidden="true">
          {marqueeText}
        </div>
      </div>
    </div>
  );
};

export default EmployeesOfTheWeekMarquee;
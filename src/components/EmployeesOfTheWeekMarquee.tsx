const EmployeesOfTheWeekMarquee = ({ 
    employees = [] as Array<{employeeName: string, emoji: string}>, 
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

export default EmployeesOfTheWeekMarquee;
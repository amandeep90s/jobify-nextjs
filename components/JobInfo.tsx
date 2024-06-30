import React from "react";

const JobInfo = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex gap-x-2 items-center">
      {icon} <span className="capitalize">{text.replaceAll("-", " ")}</span>
    </div>
  );
};

export default JobInfo;

import React from "react";

export default function Ourteam() {
  // Array of team member objects
  const teamMembers = [
    {
      name: "Jade Bradley",
      title: "Title 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Jade Bradley",
      title: "Title 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Jade Bradley",
      title: "Title 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Jade Bradley",
      title: "Title 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    },
  
 
  ];

  return (
    <>
      <div className="text-gray-600 ">
        <div className="lg:container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full ">
            <h1 className="text-2xl title-font mb-4 text-[#005125] tracking-widest mont-serif font-semibold">
              OUR TEAM
            </h1>
          </div>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 fade-in-left xs:relative xs:left-[10px]">
            <div className="grid  lg:grid-cols-2 xs:grid-cols-2 gap-6 ">
              {/* Render team members */}
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="w-full bg-white rounded-lg team-card-md overflow-hidden flex flex-col md:flex-row lg:h-[88%] xs:h-[25rem] xs:w-[10rem]"
                >
                  <div className="w-full md:w-2/5 h-80">
                    <img
                      className="object-center lg:object-cover lg:w-auto h-[286px] xs:h-[117px] xs:w-[100%]"
                      src={member.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="w-full md:w-3/5 text-left lg:p-4 z space-y-2">
                    <p className="text-xl text-[#005125] text-center  mont-serif">
                      {member.name}
                    </p>
                    <p className="italic ml-4 text-[#005125] text-start  mont-serif">
                      {member.title}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 mont-serif  lg:p-[26px]">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

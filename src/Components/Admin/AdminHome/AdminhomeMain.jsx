
import { MonthlyCBRChart, Activitychart } from "./Activitychart";
import AdminList from "./AdminList";
import AdminCount from "./AdminCount";

function AdminhomeMain() {
  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow p-4">
        <AdminList />
        <div className="flex lg:flex-row xs:flex-col gap-3 lg:mb-[3rem]">
          <div className="flex flex-col gap-3 lg:w-[54%]">
            <MonthlyCBRChart />
            <Activitychart />
          </div>
          <div className="w-[43%] flex-col gap-3 shadow-md drop-shadow xs:mt-[4rem] xs:p-[3px]">
            <AdminCount />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminhomeMain;

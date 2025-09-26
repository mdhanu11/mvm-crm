import { MdOutlineCalendarMonth, MdOutlinePerson, } from "react-icons/md";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { BsPersonAdd } from "react-icons/bs";
import { TbBuildings, TbFileInvoice } from "react-icons/tb";
import ActionCard from "./components/ActionCard";
import QuickAction from "./components/QuickActionCard";
import DashboardNoticeSection from "./components/DashboardNoticeSection";
import { AiOutlineTool } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate=useNavigate();

  
  return (
    <div className="space-y-8">
      {/* Pending Actions */}
      
      <section>
        <h2 className="font-semibold mb-4">Pending Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ActionCard
            icon={<MdOutlinePerson size={24} />}
            title="Employee review"
            description="5 profiles awaiting your review"
            buttonLabel="Review now"
          />
          <ActionCard
            icon={<MdOutlineCalendarMonth size={24} />}
            title="Leave Approval"
            description="3 leave requests pending approval"
            buttonLabel="Review now"
          />
          <ActionCard
            icon={<AiOutlineTool size={24} />}
            title="System Maintenance"
            description="Scheduled for 5th May, 2AM–4AM"
            buttonLabel="View details"
            buttonType="outline"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <QuickAction
            icon={<div className="bg-indigo-100 p-2 rounded-default w-fit mx-auto"><BsPersonAdd className="text-xl text-indigo-700" /></div>}
            title="Add employee"
            subtitle="Onboard new team members"
            onClick={()=> navigate('/dashboard/add-employee')}
          />

          <QuickAction
            icon={<div className="bg-red-100 p-2 rounded-default w-fit mx-auto"><TbBuildings className="text-xl text-red-700" /></div>}
            title="Add Client"
            subtitle="Register New Clients"
            onClick={()=> navigate('/dashboard/add-client')}
          />


          <QuickAction
            icon={<div className="bg-yellow-100 p-2 rounded-default w-fit mx-auto"><LiaMoneyBillSolid className="text-xl text-yellow-700" /></div>}
            title="Generate Pay Slip"
            subtitle="Process monthly payslips"
          />

          <QuickAction
            icon={<div className="bg-green-100 p-2 rounded-default w-fit mx-auto"><TbFileInvoice className="text-xl text-green-700" /></div>}
            title="Create Invoice"
            subtitle="Generate client invoice"
          />

        </div>
      </section>

      <section>
        <DashboardNoticeSection />
      </section>
    </div>
  );
};

export default Home;

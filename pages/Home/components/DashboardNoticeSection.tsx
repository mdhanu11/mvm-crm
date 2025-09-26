import AnnouncementItem from "./AnnouncementItem";
import LeaveReviewCard from "./LeaveReviewCard";

const DashboardNoticeSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Announcements */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Announcements</h3>
          <a href="#" className="text-sm text-indigo-600 hover:underline">View all</a>
        </div>
        <div className="space-y-2">
          <AnnouncementItem label="New Version of Leave Policy Effective from..." tag={{ text: "Upcoming", color: "blue" }} />
          <AnnouncementItem label="5 New Staff Profiles Pending Review" tag={{ text: "Critical", color: "red" }} />
          <AnnouncementItem label="Salary Disbursement Process Starts on 30th April" tag={{ text: "Info", color: "green" }} />
          <AnnouncementItem label="Salary Disbursement Process Starts on 30th April" tag={{ text: "Urgent", color: "yellow" }} />
        </div>
      </div>

      {/* Leave Review */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Leave Review</h3>
          <a href="#" className="text-sm text-indigo-600 hover:underline">View all</a>
        </div>
        <div className="space-y-3">
          <LeaveReviewCard name="Gagan Chawla" dateRange="01/05/2025 - 15/05/2025" />
          <LeaveReviewCard name="Pawan Singh" dateRange="11/05/2025" />
          <LeaveReviewCard name="Sahil Sharma" dateRange="07/05/2025 - 12/05/2025" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNoticeSection;

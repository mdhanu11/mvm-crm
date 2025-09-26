import { CiLinkedin } from "react-icons/ci";
import {
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlinePencil,
} from "react-icons/hi2";
import DetailsTab from "./components/DetailsTab";
import Tabs from "../../components/ui/Tabs";
import { useState } from "react";
import TabContent from "../../components/ui/TabContent";
import DocumentSection from "./components/DocumentsTab";
import AttendanceTab from "./components/AttendanceTab";
import PayslipTab from "./components/PaySlipTab";
import AdditionalQuestions from "./components/AdditionalQuestions";

function DetailPage() {
    const tabItems = [
        { label: 'Details', value: 'details' },
        { label: 'Documents', value: 'documents' },
        { label: 'Attendance', value: 'attendance' },
        { label: 'Payslips', value: 'payslips' },
        { label: 'Additional Questions', value: 'additionalQuestions' },
    ];
    const [active, setActive] = useState('details');
    return (
        <div className="">
            <div className="bg-white shadow rounded-lg p-6 flex items-start gap-6">
                <img
                    src="/images/employee.png"
                    alt="Jerome Bell"
                    className="w-50 h-50 object-cover"
                />
                <div className="flex-1">
                    <div className="">
                        <div className="flex items-center">
                            <h2 className="text-xl font-semibold">Jerome Bell</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                                <HiOutlinePencil className="text-gray-500 cursor-pointer hover:text-gray-700" />
                            </div>
                        </div>
                        <span className="text-blue-600 text-sm block">Senior Software Developer</span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <CiLinkedin className="text-gray-600" />
                            <a target="_blank" href="https://www.linkedin.com/in/jerome.bell/" className="text-gray-600">
                                linkedin.com/in/jerome.bell
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineEnvelope className="text-gray-600" />
                            <span>jerome.bell@invision.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlinePhone className="text-gray-600" />
                            <span>629.555.0129</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineMapPin className="text-gray-600" />
                            <span>232, 4th Street, Melbourne, Australia</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs below */}

            <Tabs
                tabs={tabItems}
                activeTab={active}
                onTabChange={setActive}
                className="mt-5"
                activeTabClassName="font-semibold"
            />

            <div className="mt-2">
                <TabContent value="details" active={active}>
                    <DetailsTab />
                </TabContent>
                <TabContent value="documents" active={active}>
                    <>
                    <DocumentSection />
                    </>
                </TabContent>
                <TabContent value="attendance" active={active}>
                    <AttendanceTab />
                </TabContent>
                <TabContent value="payslips" active={active}>
                    <PayslipTab />
                </TabContent>
                <TabContent value="additionalQuestions" active={active}>
                    <AdditionalQuestions />
                </TabContent>
            </div>


        </div>
    );
}

export default DetailPage;
